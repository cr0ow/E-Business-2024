package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"log"
)

var db, err = gorm.Open(sqlite.Open("lab4.db"), &gorm.Config{})
var errMessage = "Error during database migration: %v"

func main() {
	if err != nil {
		log.Fatalf(errMessage, err)
	}
	err = db.AutoMigrate(&Category{})
	if err != nil {
		log.Fatalf(errMessage, err)
	}
	err = db.AutoMigrate(&Product{})
	if err != nil {
		log.Fatalf(errMessage, err)
	}
	err = db.AutoMigrate(&Cart{})
	if err != nil {
		log.Fatalf(errMessage, err)
	}

	echoInstance := echo.New()

    var product_id = "/products/:id"

	echoInstance.POST("/products", createProduct)
	echoInstance.GET("/products", getProducts)
	echoInstance.GET(product_id, getProduct)
	echoInstance.PUT(product_id, updateProduct)
	echoInstance.DELETE(product_id, deleteProduct)

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
