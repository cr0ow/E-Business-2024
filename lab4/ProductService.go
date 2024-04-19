package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Product struct {
	gorm.Model
	Name       string `gorm:"not null"`
	Price      string `gorm:"not null"`
	CategoryId uint
	Category   Category `gorm:"foreignKey:CategoryId"`
}

func createProduct(c echo.Context) error {
	product := &Product{}
	if err := c.Bind(product); err != nil {
		return err
	}
	var category Category
	result := db.First(&category, product.CategoryId)
	if result.Error != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Category not found")
	}
	product.Category = category
	db.Create(product)
	return c.JSON(http.StatusCreated, product)
}

func getProducts(c echo.Context) error {
	var products []Product
	db.Preload("Category").Find(&products)
	return c.JSON(http.StatusOK, products)
}

func getProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	if err := db.Preload("Category").First(&product, id).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}
	return c.JSON(http.StatusOK, product)
}

func updateProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	product := &Product{}
	if err := c.Bind(product); err != nil {
		return err
	}
	var existingProduct Product
	if err := db.First(&existingProduct, id).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Product not found")
	}
	var category Category
	if err := db.First(&category, product.CategoryId).Error; err != nil {
		return echo.NewHTTPError(http.StatusBadRequest, "Category not found")
	}
	existingProduct.Name = product.Name
	existingProduct.Price = product.Price
	existingProduct.CategoryId = product.CategoryId
	existingProduct.Category = category
	db.Save(&existingProduct)
	return c.JSON(http.StatusOK, existingProduct)
}

func deleteProduct(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var product Product
	db.Delete(&product, id)
	return c.NoContent(http.StatusNoContent)
}
