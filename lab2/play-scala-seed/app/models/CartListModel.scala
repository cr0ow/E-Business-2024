package models

import scala.collection.mutable

object CartListModel {

  private var carts = mutable.Map[Long, List[Long]](1L -> List(1), 2L -> List(1, 2))
  private var nextId: Long = 3

  def add(): Long = {
    carts(nextId) = List()
    nextId = nextId + 1
    nextId - 1
  }

  def getAll: mutable.Map[Long, List[Long]] = {
    carts
  }

  def getById(id: Long): List[Long] = {
    carts.get(id).orNull
  }

  def update(id: Long, newItems: List[Long]): Long = {
    val items = carts.get(id).orNull
    if(items != null) {
      carts(id) = newItems
      id
    }
    else {
      -1L
    }
  }

  def deleteById(id: Long): Boolean = {
    if(carts.get(id).orNull == null) {
      false
    }
    else {
      carts.remove(id)
      true
    }
  }

  def addToCart(id: Long, productId: Long): Unit = {
    carts(id) = productId :: carts(id)
  }

  def removeFromCart(id: Long, productId: Long): Unit = {
    var first  = true
    carts(id) = carts(id).filter(p => {
      if(p != productId) true
      else if(first) {
        first = false
        false
      }
      else true
    })
  }

}
