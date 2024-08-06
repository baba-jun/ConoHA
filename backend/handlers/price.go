package handlers

import (
	"encoding/csv"
	"os"
	"strconv"
	"net/http"
	"encoding/json"
)

type Price struct {
	TypeID        int
	PlanID        int
	OriginalPrice float64
	RealPrice     float64
}

func LoadPrices(filePath string) ([]Price, error) {
	file, err := os.Open(filePath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	reader := csv.NewReader(file)
	records, err := reader.ReadAll()
	if err != nil {
		return nil, err
	}

	var prices []Price
	for _, record := range records[1:] {
		typeID, _ := strconv.Atoi(record[0])
		planID, _ := strconv.Atoi(record[1])
		originalPrice, _ := strconv.ParseFloat(record[2], 64)
		realPrice, _ := strconv.ParseFloat(record[3], 64)
		prices = append(prices, Price{
			TypeID:        typeID,
			PlanID:        planID,
			OriginalPrice: originalPrice,
			RealPrice:     realPrice,
		})
	}

	return prices, nil
}

func FindPrice(prices []Price, typeID int, planID int) *Price {
	for _, price := range prices {
		if price.TypeID == typeID && price.PlanID == planID {
			return &price
		}
	}
	return nil
}

var prices []Price

func init() {
	var err error
	prices, err = LoadPrices("plan.csv")
	if err != nil {
		panic("Failed to load prices: " + err.Error())
	}
}

func GetPriceHandler(w http.ResponseWriter, r *http.Request) {
	typeIDStr := r.URL.Query().Get("type_id")
	planIDStr := r.URL.Query().Get("plan_id")

	if typeIDStr == "" || planIDStr == "" {
		http.Error(w, "Missing type_id or plan_id", http.StatusBadRequest)
		return
	}

	typeID, err := strconv.Atoi(typeIDStr)
	if err != nil {
		http.Error(w, "Invalid type_id", http.StatusBadRequest)
		return
	}

	planID, err := strconv.Atoi(planIDStr)
	if err != nil {
		http.Error(w, "Invalid plan_id", http.StatusBadRequest)
		return
	}

	price := FindPrice(prices, typeID, planID)
	if price == nil {
		http.Error(w, "Price not found", http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(price)
}
