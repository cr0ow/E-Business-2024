package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

var db, err = gorm.Open(sqlite.Open("lab4.db"), &gorm.Config{})

func main() {
	if err != nil {
		log.Fatalf("Cannot connect to database: %v", err)
	}
	err = db.AutoMigrate(&Category{})
	if err != nil {
		log.Fatalf("Error during database migration: %v", err)
	}
	err = db.AutoMigrate(&Product{})
	if err != nil {
		log.Fatalf("Error during database migration: %v", err)
	}
	err = db.AutoMigrate(&Cart{})
	if err != nil {
		log.Fatalf("Error during database migration: %v", err)
	}

	echoInstance := echo.New()

	echoInstance.POST("/products", createProduct)
	echoInstance.GET("/products", getProducts)
	echoInstance.GET("/products/:id", getProduct)
	echoInstance.PUT("/products/:id", updateProduct)
	echoInstance.DELETE("/products/:id", deleteProduct)

	echoInstance.POST("/cart", createCart)
	echoInstance.GET("/cart/:id", getCart)
	echoInstance.POST("/cart/:cart_id/products/:product_id", addProductToCart)
	echoInstance.DELETE("/cart/:cart_id/products/:product_id", removeProductFromCart)

	echoInstance.POST("/categories", createCategory)
	echoInstance.DELETE("/categories/:id", deleteCategory)

	err := echoInstance.Start(":8000")
	if err != nil {
		return
	}
}
