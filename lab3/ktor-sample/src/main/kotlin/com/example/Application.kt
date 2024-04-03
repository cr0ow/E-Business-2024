package com.example

import com.example.plugins.configureRouting
import dev.kord.core.Kord
import dev.kord.core.event.message.MessageCreateEvent
import dev.kord.core.on
import dev.kord.gateway.Intent
import dev.kord.gateway.PrivilegedIntent
import io.ktor.server.netty.*
import io.ktor.server.engine.*
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpRequest.BodyPublishers
import java.net.http.HttpResponse.BodyHandlers
import java.time.Duration

val httpClient: HttpClient = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(5))
    .build()

const val DISCORD_WEBHOOK_URL = "DISCORD_WEBHOOK_URL"

fun sendMessage(content: String) {
    val request = HttpRequest.newBuilder()
        .uri(URI.create(DISCORD_WEBHOOK_URL))
        .header("Content-Type", "application/json")
        .POST(BodyPublishers.ofString(content))
        .build()
    httpClient.send(request, BodyHandlers.discarding())
}

suspend fun main() {
    embeddedServer(Netty, port = 8080) {
        configureRouting()
    }.start(wait = false)

    initializeData()
    val kord = Kord("DISCORD_TOKEN")

    kord.on<MessageCreateEvent> {
        if(message.author?.isBot != false) return@on
        if(message.content == "!categories") {
            message.channel.createMessage(showCategories())
        }
        else if(message.content == "!products") {
            message.channel.createMessage(showProducts())
        }
        return@on
    }

    kord.login {
        @OptIn(PrivilegedIntent::class)
        intents += Intent.MessageContent
    }
}
