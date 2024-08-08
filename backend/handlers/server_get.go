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

	serverList, err := listServers(token)
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

func listServers(token string) ([]ServerData, error) {
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

		servers = append(servers, ServerData{
			ServerName: instanceNameTag,
			IsRun:      status,
		})
	}

	return servers, nil
}