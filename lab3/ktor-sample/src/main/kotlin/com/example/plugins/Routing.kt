package com.example.plugins

import com.example.sendMessage
import io.ktor.server.application.*
import io.ktor.server.request.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Application.configureRouting() {
    routing {
        post("/") {
            val content = call.receive<String>()
            sendMessage(content)
            call.respondText("Message sent")
        }
    }
}
