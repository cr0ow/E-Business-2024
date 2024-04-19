package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type Category struct {
	gorm.Model
	Name string `gorm:"not null"`
}

func createCategory(c echo.Context) error {
	category := &Category{}
	if err := c.Bind(category); err != nil {
		return err
	}
	db.Create(category)

	return c.JSON(http.StatusCreated, category)
}

func deleteCategory(c echo.Context) error {
	id, _ := strconv.Atoi(c.Param("id"))
	var category Category
	if err := db.First(&category, id).Error; err != nil {
		return echo.NewHTTPError(http.StatusNotFound, "Category not found")
	}
	db.Delete(&category)
	return c.NoContent(http.StatusNoContent)
}
