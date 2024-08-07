package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"time"
	"os"
	"io/ioutil"
	"net/http"
)

func CreateServerHandler(w http.ResponseWriter, r *http.Request) {
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
	fmt.Println(token)

	volumeTypeID, err := getVolumeType(token, tenantID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get volume type: %v", err), http.StatusInternalServerError)
		return
	}
	fmt.Println("volumetype")
	fmt.Println(volumeTypeID)

	imageID, err := getImageID(token)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get image ID: %v", err), http.StatusInternalServerError)
		return
	}
	fmt.Println("imageID")
	fmt.Println(imageID)

	volumeID, err := createBootStorage(token, volumeTypeID, imageID, tenantID)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create boot storage: %v", err), http.StatusInternalServerError)
		return
	}
	fmt.Println("volumeID")
	fmt.Println(volumeID)

	securityGroup := "IPv4v6-Web" //web決め打ち
	fmt.Println("securityGroup")
	fmt.Println(securityGroup)

	flavorID, err := getFlavorID(token)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to get flavor ID: %v", err), http.StatusInternalServerError)
		return
	}
	fmt.Println("flavorID")
	fmt.Println(flavorID)
	time.Sleep(10 * time.Second)

	serverID, err := createVPS(token, flavorID, volumeID, securityGroup)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create VPS: %v", err), http.StatusInternalServerError)
		return
	}
	fmt.Println("serverID")
	fmt.Println(serverID)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte(fmt.Sprintf("VPS created with ID: %s", serverID)))
}

func getToken(apiUserID, apiPassword, tenantID string) (string, error) {
	url := "https://identity.c3j1.conoha.io/v3/auth/tokens"
	payload := map[string]interface{}{
		"auth": map[string]interface{}{
			"identity": map[string]interface{}{
				"methods": []string{"password"},
				"password": map[string]interface{}{
					"user": map[string]interface{}{
						"id":       apiUserID,
						"password": apiPassword,
					},
				},
			},
			"scope": map[string]interface{}{
				"project": map[string]interface{}{
					"id": tenantID,
				},
			},
		},
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		return "", fmt.Errorf("failed to get token, status: %s", resp.Status)
	}

	token := resp.Header.Get("X-Subject-Token")
	if token == "" {
		return "", fmt.Errorf("token not found in response")
	}

	return token, nil
}

func getVolumeType(token, tenantID string) (string, error) {
	url := fmt.Sprintf("https://block-storage.c3j1.conoha.io/v3/%s/types", tenantID)
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

	var data map[string][]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	for _, v := range data["volume_types"] {
		if v["name"] == "c3j1-ds02-boot" {
			return v["id"].(string), nil
		}
	}
	return "", fmt.Errorf("volume type not found")
}

func getImageID(token string) (string, error) {
	url := "https://image-service.c3j1.conoha.io/v2/images?name=vmi-ubuntu-24.04-amd64"
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

	fmt.Println("Response Body:", string(body))

	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	images, ok := data["images"].([]interface{})
	if !ok {
		return "", fmt.Errorf("invalid images format")
	}

	for _, img := range images {
		image, ok := img.(map[string]interface{})
		if !ok {
			continue
		}
		if image["name"] == "vmi-ubuntu-24.04-amd64" {
			return image["id"].(string), nil
		}
	}
	return "", fmt.Errorf("image ID not found")
}

func createBootStorage(token, volumeTypeID, imageID, tenantID string) (string, error) {
	url := fmt.Sprintf("https://block-storage.c3j1.conoha.io/v3/%s/volumes", tenantID)
	payload := map[string]interface{}{
		"volume": map[string]interface{}{
			"size":        30,
			"description": nil,
			"name":        "boot-volume-nametag",
			"volume_type": volumeTypeID,
			"imageRef":    imageID,
		},
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Auth-Token", token)
	req.Header.Set("Content-Type", "application/json")

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

	fmt.Println("Response Body:", string(body))

	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	volume, ok := data["volume"].(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("invalid volume format")
	}

	volumeID, ok := volume["id"].(string)
	if !ok {
		return "", fmt.Errorf("invalid volume ID format")
	}

	return volumeID, nil
}

func getSecurityGroup(token string) (string, error) {
	url := "https://networking.c3j1.conoha.io/v2.0/security-groups?fields=name"
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

	var data map[string][]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	for _, group := range data["security_groups"] {
		if group["name"] == "IPv4v6-SSH" {
			return group["name"].(string), nil
		}
	}
	return "", fmt.Errorf("security group not found")
}

func getFlavorID(token string) (string, error) {
	url := "https://compute.c3j1.conoha.io/v2.1/flavors"
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

	var data map[string][]map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	for _, flavor := range data["flavors"] {
		if flavor["name"] == "g2l-t-c2m1" {
			return flavor["id"].(string), nil
		}
	}
	return "", fmt.Errorf("flavor ID not found")
}

func createVPS(token, flavorID, volumeID, securityGroup string) (string, error) {
	url := "https://compute.c3j1.conoha.io/v2.1/servers"
	payload := map[string]interface{}{
		"server": map[string]interface{}{
			"flavorRef": flavorID,
			"adminPass": "Password111",
			"block_device_mapping_v2": []map[string]interface{}{
				{
					"uuid": volumeID,
					"boot_index": 0,
					"source_type": "volume",
					"destination_type": "volume",
					"delete_on_termination": true,
				},
			},
			"metadata": map[string]interface{}{
				"instance_name_tag": "test-vps-from-mac",
			},
			"security_groups": []map[string]interface{}{
				{
					"name": securityGroup,
				},
			},
		},
	}
	payloadBytes, err := json.Marshal(payload)
	if err != nil {
		return "", err
	}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payloadBytes))
	if err != nil {
		return "", err
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("X-Auth-Token", token)
	req.Header.Set("Content-Type", "application/json")

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

	fmt.Println("Response Body:", string(body))

	var data map[string]interface{}
	if err := json.Unmarshal(body, &data); err != nil {
		return "", err
	}

	server, ok := data["server"].(map[string]interface{})
	if !ok {
		return "", fmt.Errorf("invalid server format")
	}

	serverID, ok := server["id"].(string)
	if !ok {
		return "", fmt.Errorf("invalid server ID format")
	}

	return serverID, nil
}