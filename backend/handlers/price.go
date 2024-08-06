package handlers

import (
	"encoding/csv"
	"fmt"
	"os"
	"strconv"
)

type Price struct {
	TypeID        int
	PlanID        int
	OriginalPrice float64
	RealPrice     float64
}

func LoadPrices(filePath string) ([]Price, error) {
	file, err := os.Open("plan.csv")
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
