package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Cart struct {
	gorm.Model
	Products []Product `gorm:"many2many:cart_products"`
}

func createCart(c echo.Context) error {
	cart := &Cart{}
	if err := c.Bind(cart); err != nil {
		return err
	}
	db.Create(cart)
	return c.JSON(http.StatusCreated, cart)
}

func getCart(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var cart Cart
	db.Preload("Products").First(&cart, id)
	return c.JSON(http.StatusOK, cart)
}

func addProductToCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("cart_id"))
	productID, _ := strconv.Atoi(c.Param("product_id"))
	var cart Cart
	if err := db.First(&cart, cartID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}
	var product Product
	if err := db.First(&product, productID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}
	err := db.Model(&cart).Association("Products").Append(&product)
	if err != nil {
		return err
	}
	return c.JSON(http.StatusOK, cart)
}

func removeProductFromCart(c echo.Context) error {
	cartID, _ := strconv.Atoi(c.Param("cart_id"))
	productID, _ := strconv.Atoi(c.Param("product_id"))
	var cart Cart
	if err := db.First(&cart, cartID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Cart not found")
	}
	var product Product
	if err := db.First(&product, productID).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found in cart")
	}
	err := db.Model(&cart).Association("Products").Delete(&product)
	if err != nil {
		return err
	}
	return c.NoContent(http.StatusNoContent)
}
