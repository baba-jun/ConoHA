package handlers

import (
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

func GetServerHandler(w http.ResponseWriter, r *http.Request) {
	apiUserID := os.Getenv("API_USER_ID")
	apiPassword := os.Getenv("API_PASSWORD")
	tenantID := os.Getenv("TENANT_ID")

	if apiUserID == "" || apiPassword == "" || tenantID == "" {
		http.Error(w, "Environment variables not set", http.StatusInternalServerError)
		return
	}

	token, err := getToken(apiUserID, apiPassword, tenantID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get token: %v", err), http.StatusInternalServerError)
		return
	}

	serverList, err := listServers(token, tenantID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to list servers: %v", err), http.StatusInternalServerError)
		return
	}

	response := ResponseServerData{
		ServerList: serverList,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)
}

func listServers(token, tenantID string) ([]ServerData, error) {
	url := "https://compute.c3j1.conoha.io/v2.1/servers/detail"
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Auth-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}

	var data map[string][]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return nil, err
	}

	var servers []ServerData
	for _, server := range data["servers"] {
		metadata := server["metadata"].(map[string]interface{})
		instanceNameTag := metadata["instance_name_tag"].(string)
		status := server["status"].(string)
		flavorID := server["flavor"].(map[string]interface{})["id"].(string)

		flavorName, err := getFlavorName(token, flavorID)
		if err != nil {
			return nil, err
		}

		volumesAttached := server["os-extended-volumes:volumes_attached"].([]interface{})
		var OSName string
		if len(volumesAttached) > 0 {
			volumeID := volumesAttached[0].(map[string]interface{})["id"].(string)
			OSName, err = getVolumeOSName(token, tenantID, volumeID)
			if err != nil {
				return nil, err
			}
		}

		ip := ""
		addresses := server["addresses"].(map[string]interface{})
		for _, addrList := range addresses {
			for _, addrData := range addrList.([]interface{}) {
				if addrData.(map[string]interface{})["version"].(float64) == 4 {
					ip = addrData.(map[string]interface{})["addr"].(string)
					break
				}
			}
			if ip != "" {
				break
			}
		}

		servers = append(servers, ServerData{
			ServerName: instanceNameTag,
			Status:     status,
			FlavorName: flavorName,
			OSName:     OSName,
			IP:         ip,
		})
	}

	return servers, nil
}

func getFlavorName(token, flavorID string) (string, error) {
	url := fmt.Sprintf("https://compute.c3j1.conoha.io/v2.1/flavors/%s", flavorID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Auth-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var data map[string]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	flavorName := data["flavor"]["name"].(string)
	return flavorName, nil
}

func getVolumeOSName(token, tenantID, volumeID string) (string, error) {
	url := fmt.Sprintf("https://block-storage.c3j1.conoha.io/v3/%s/volumes/%s", tenantID, volumeID)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Auth-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}

	var data map[string]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	volumeImageMetadata, ok := data["volume"]["volume_image_metadata"].(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("volume image metadata not found for volume ID: %s", volumeID)
	}

	osName, ok := volumeImageMetadata["image_name"].(string)
	if !ok {
		return "", fmt.Errorf("OS name not found in volume image metadata for volume ID: %s", volumeID)
	}

	return osName, nil
}
