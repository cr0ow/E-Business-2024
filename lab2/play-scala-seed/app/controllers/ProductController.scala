package controllers

import javax.inject._
import play.api._
import play.api.mvc._

@Singleton
class ProductController @Inject()(val controllerComponents: ControllerComponents) extends BaseController {

  def create() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getAll() = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def getById(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

  def update(productId: Long) = Action { implicit request: Request[AnyContent] => 
    Ok(views.html.index())
  }

  def delete(productId: Long) = Action { implicit request: Request[AnyContent] =>
    Ok(views.html.index())
  }

}
