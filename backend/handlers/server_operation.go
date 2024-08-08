package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
)

type ServerOperationRequest struct {
	ServerID string `json:"server_id"`
}

func StartServerHandler(w http.ResponseWriter, r *http.Request) {
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

	var startReq ServerOperationRequest
	if err := json.NewDecoder(r.Body).Decode(&startReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if startReq.ServerID == "" {
		http.Error(w, "Missing server ID", http.StatusBadRequest)
		return
	}

	requestBody := map[string]interface{}{
		"os-start": nil,
	}

	requestBodyBytes, err := json.Marshal(requestBody)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to marshal request body: %v", err), http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("https://compute.c3j1.conoha.io/v2.1/servers/%s/action", startReq.ServerID)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBodyBytes))
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create request: %v", err), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Auth-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to execute request: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusAccepted {
		body, _ := ioutil.ReadAll(resp.Body)
		http.Error(w, fmt.Sprintf("Failed to start server, status: %d, body: %s", resp.StatusCode, body), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}

func StopServerHandler(w http.ResponseWriter, r *http.Request) {
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

	var stopReq ServerOperationRequest
	if err := json.NewDecoder(r.Body).Decode(&stopReq); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	if stopReq.ServerID == "" {
		http.Error(w, "Missing server ID", http.StatusBadRequest)
		return
	}

	requestBody := map[string]interface{}{
		"os-stop": nil,
	}

	requestBodyBytes, err := json.Marshal(requestBody)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to marshal request body: %v", err), http.StatusInternalServerError)
		return
	}

	url := fmt.Sprintf("https://compute.c3j1.conoha.io/v2.1/servers/%s/action", stopReq.ServerID)
	req, err := http.NewRequest("POST", url, bytes.NewBuffer(requestBodyBytes))
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to create request: %v", err), http.StatusInternalServerError)
		return
	}
	req.Header.Set("Accept", "application/json")
	req.Header.Set("Content-Type", "application/json")
	req.Header.Set("X-Auth-Token", token)

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, fmt.Sprintf("Failed to execute request: %v", err), http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusAccepted {
		body, _ := ioutil.ReadAll(resp.Body)
		http.Error(w, fmt.Sprintf("Failed to stop server, status: %d, body: %s", resp.StatusCode, body), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusAccepted)
}
