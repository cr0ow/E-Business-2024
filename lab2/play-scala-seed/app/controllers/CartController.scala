package controllers

import javax.inject._
import play.api.mvc._
import models._

@Singleton
class CartController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val p1: String = "<h1>Cart with id="
  val p2: String = " not found</h1>"

  def add: Action[AnyContent] = Action {
    CartListModel.add()
    Ok(views.html.getAllCarts(CartListModel.getAll))
  }

  def getAll: Action[AnyContent] = Action {
    Ok(views.html.getAllCarts(CartListModel.getAll))
  }

  def getById(cartId: Long): Action[AnyContent] = Action {
    val cart = CartListModel.getById(cartId)
    if (cart == null) {
      val message: String = p1 + cartId + p2
      NotFound(message)
    }
    else {
      Ok(views.html.getCartById(cart))
    }
  }

  def update(cartId: Long): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody.map { json =>
      try {
        val items = json("items").as[List[Long]]
        println(items)
        if(CartListModel.update(cartId, items) == -1) {
          val message: String = p1 + cartId + p2
          NotFound(message)
        }
        else {
          Ok(views.html.getAllCarts(CartListModel.getAll))
        }
      } catch {
        case e: NoSuchElementException =>
          val message: String = "<h1>Field not found: " + e.getMessage + "</h1>"
          BadRequest(message)
      }
    }.getOrElse {
      BadRequest("Invalid JSON format")
    }
  }

  def delete(cartId: Long): Action[AnyContent] = Action {
    if(!CartListModel.deleteById(cartId)) {
      val message: String = p1 + cartId + p2
      NotFound(message)
    }
    else {
      Ok(views.html.getAllCarts(CartListModel.getAll))
    }
  }

  def addToCart(cartId: Long, productId: Long): Action[AnyContent] = Action {
    if(CartListModel.getById(cartId) == null) {
      val message: String = p1 + cartId + p2
      NotFound(message)
    }
    else if (ProductListModel.getById(productId) == null) {
      val message: String = "<h1>Product with id=" + productId + " not found</h1>"
      NotFound(message)
    }
    else {
      CartListModel.addToCart(cartId, productId)
      Ok(views.html.getAllCarts(CartListModel.getAll))
    }
  }

  def removeFromCart(cartId: Long, productId: Long): Action[AnyContent] = Action {
    if (CartListModel.getById(cartId) == null) {
      val message: String = p1 + cartId + p2
      NotFound(message)
    }
    else if (ProductListModel.getById(productId) == null) {
      val message: String = p1 + productId + p2
      NotFound(message)
    }
    else {
      CartListModel.removeFromCart(cartId, productId)
      Ok(views.html.getAllCarts(CartListModel.getAll))
    }
  }

}
