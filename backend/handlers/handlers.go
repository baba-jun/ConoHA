package handlers

import (
	"bytes"
	"encoding/json"
	"io/ioutil"
	"net/http"
	"os"
	"fmt"
)

type AuthRequest struct {
	Auth Auth `json:"auth"`
}

type Auth struct {
	Identity Identity `json:"identity"`
	Scope    Scope    `json:"scope"`
}

type Identity struct {
	Methods  []string `json:"methods"`
	Password Password `json:"password"`
}

type Password struct {
	User User `json:"user"`
}

type User struct {
	ID       string `json:"id"`
	Password string `json:"password"`
}

type Scope struct {
	Project Project `json:"project"`
}

type Project struct {
	ID string `json:"id"`
}

func CreateTokenHandler(w http.ResponseWriter, r *http.Request) {
	apiUserID := os.Getenv("API_USER_ID")
	apiPassword := os.Getenv("API_PASSWORD")
	tenantID := os.Getenv("TENANT_ID")

	fmt.Println(apiUserID)
	fmt.Println(apiPassword)
	fmt.Println(tenantID)
	if apiUserID == "" || apiPassword == "" || tenantID == "" {
		http.Error(w, "Environment variables not set", http.StatusInternalServerError)
		return
	}

	authRequest := AuthRequest{
		Auth: Auth{
			Identity: Identity{
				Methods: []string{"password"},
				Password: Password{
					User: User{
						ID:       apiUserID,
						Password: apiPassword,
					},
				},
			},
			Scope: Scope{
				Project: Project{
					ID: tenantID,
				},
			},
		},
	}

	payload, err := json.Marshal(authRequest)
	if err != nil {
		http.Error(w, "Failed to marshal request body", http.StatusInternalServerError)
		return
	}

	apiURL := "https://identity.c3j1.conoha.io/v3/auth/tokens"

	req, err := http.NewRequest("POST", apiURL, bytes.NewBuffer(payload))
	if err != nil {
		http.Error(w, "Failed to create request", http.StatusInternalServerError)
		return
	}

	req.Header.Set("Content-Type", "application/json")

	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		http.Error(w, "Failed to call external API", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(body)
}
