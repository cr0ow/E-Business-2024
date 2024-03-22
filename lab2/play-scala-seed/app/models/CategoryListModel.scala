package models

import controllers.Category

object CategoryListModel {

  private var categories = List(Category(1, "żywność"), Category(2, "artykuły przemysłowe"))
  private var nextId: Long = 3

  def add(name: String): Long = {
    val toAdd: Category = Category(nextId, name)
    categories = toAdd :: categories
    nextId = nextId + 1
    nextId - 1
  }

  def getAll: List[Category] = {
    categories
  }

  def getById(id: Long): Category = {
    categories.find(c => c.id == id).orNull
  }

  def update(id: Long, name: String): Long = {
    val index = categories.indexOf(categories.find(c => c.id == id).orNull)
    if(index != -1) {
      categories = categories.updated(index, Category(id, name))
    }
    index
  }

  def deleteById(id: Long): Boolean = {
    if(!categories.exists(c => c.id == id)) {
      return false
    }
    categories = categories.filter(c => c.id != id)
    true
  }

}
