package controllers

import javax.inject._
import play.api.mvc._
import models._

case class Product(id: Long, name: String, description: String, categoryId: Long)

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  val p1 = "<h1>Product with id="
  val p2 = " not found</h1>"
  val p3 = "<h1>Category with id="

  def add: Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody.map { json =>
      try {
        val name = json("name").as[String]
        val description = json("description").as[String]
        val categoryId = json("categoryId").as[Long]
        if(CategoryListModel.getById(categoryId) == null) {
          val message: String = p3 + categoryId + p2
          NotFound(message)
        }
        ProductListModel.add(name, description, categoryId)
        Ok(views.html.getAllProducts(ProductListModel.getAll))
      } catch {
        case e: NoSuchElementException =>
          val message: String = "<h1>Field not found: " + e.getMessage + "</h1>"
          BadRequest(message)
      }
    }.getOrElse {
      BadRequest("Invalid JSON format")
    }
  }

  def getAll: Action[AnyContent] = Action {
    Ok(views.html.getAllProducts(ProductListModel.getAll))
  }

  def getById(productId: Long): Action[AnyContent] = Action {
    val product = ProductListModel.getById(productId)
    if (product == null) {
      val message: String = p1 + productId + p2
      NotFound(message)
    }
    else {
      Ok(views.html.getProductById(product))
    }
  }

  def update(productId: Long): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody.map { json =>
      try {
        val name = json("name").as[String]
        val description = json("description").as[String]
        val categoryId = json("categoryId").as[Long]
        if (CategoryListModel.getById(categoryId) == null) {
          val message: String = p3 + categoryId + " p2
          NotFound(message)
        }
        if (ProductListModel.update(productId, name, description, categoryId) == -1) {
          val message: String = p1 + productId + p2
          NotFound(message)
        }
        else {
          Ok(views.html.getAllProducts(ProductListModel.getAll))
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

  def delete(productId: Long): Action[AnyContent] = Action {
    if(!ProductListModel.deleteById(productId)) {
      val message: String = p1 + productId + p2
      NotFound(message)
    }
    else {
      Ok(views.html.getAllProducts(ProductListModel.getAll))
    }
  }

}
