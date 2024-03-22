package models

import controllers.Product

object ProductListModel {

  private var products = List(Product(1, "mleko", "świeże mleko", 1), Product(2, "mydło", "zapach brzoskwiniowy", 2))
  private var nextId: Long = 3

  def add(name: String, description: String, categoryId: Long): Long = {
    val toAdd: Product = Product(nextId, name, description, categoryId)
    products = toAdd :: products
    nextId = nextId + 1
    nextId - 1
  }

  def getAll: List[Product] = {
    products
  }

  def getById(id: Long): Product = {
    products.find(p => p.id == id).orNull
  }

  def update(id: Long, name: String, description: String, categoryId: Long): Long = {
    val index = products.indexOf(products.find(p => p.id == id).orNull)
    if(index != -1) {
      products = products.updated(index, Product(id, name, description, categoryId))
    }
    index
  }

  def deleteById(id: Long): Boolean = {
    if(!products.exists(p => p.id == id)) {
      return false
    }
    products = products.filter(p => p.id != id)
    true
  }

}
