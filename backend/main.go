package main

import (
	"log"
	"my-app/handlers"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func Env_load() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	Env_load()
	r := chi.NewRouter()

	r.Use(middleware.RealIP)
	r.Use(middleware.Logger)
	r.Use(middleware.Recoverer)

	corsHandler := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	}).Handler

	r.Use(corsHandler)

	r.Route("/api", func(r chi.Router) {
		r.Route("/server", func(r chi.Router) {
			r.Get("/list", handlers.GetServerHandler)
			r.Post("/create", handlers.CreateServerHandler)
			r.Route("/operation", func(r chi.Router) {
				r.Post("/start", handlers.StartServerHandler)
				r.Post("/stop", handlers.StopServerHandler)
			})
		})
		r.Get("/price", handlers.GetPriceHandler)
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	log.Printf("Listening on port %s", port)
	log.Fatal(http.ListenAndServe(":"+port, r))
}
