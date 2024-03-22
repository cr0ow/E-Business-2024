package controllers

import javax.inject._
import play.api.mvc._
import models._

case class Category(id: Long, name: String)

@Singleton
class CategoryController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  def add: Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody.map { json =>
      try {
        val name = json("name").as[String]
        CategoryListModel.add(name)
        Ok(views.html.getAllCategories(CategoryListModel.getAll))
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
    Ok(views.html.getAllCategories(CategoryListModel.getAll))
  }

  def getById(categoryId: Long): Action[AnyContent] = Action {
    val category = CategoryListModel.getById(categoryId)
    if (category == null) {
      val message: String = "<h1>Category with id=" + categoryId + " not found</h1>"
      NotFound(message)
    }
    else {
      Ok(views.html.getCategoryById(category))
    }
  }

  def update(categoryId: Long): Action[AnyContent] = Action { request =>
    val jsonBody = request.body.asJson
    jsonBody.map { json =>
      try {
        val name = json("name").as[String]
        if (CategoryListModel.update(categoryId, name) == -1) {
          val message: String = "<h1>Category with id=" + categoryId + " not found</h1>"
          NotFound(message)
        }
        else {
          Ok(views.html.getAllCategories(CategoryListModel.getAll))
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

  def delete(categoryId: Long): Action[AnyContent] = Action {
    if(!CategoryListModel.deleteById(categoryId)) {
      val message: String = "<h1>Category with id=" + categoryId + " not found</h1>"
      NotFound(message)
    }
    else {
      Ok(views.html.getAllCategories(CategoryListModel.getAll))
    }
  }

}
