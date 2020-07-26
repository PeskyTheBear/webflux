package com.pesky.webflux.messages.controller

import com.fasterxml.jackson.databind.ObjectMapper
import com.pesky.webflux.messages.Message
import com.pesky.webflux.messages.MessageReactiveRepository
import io.r2dbc.postgresql.api.PostgresqlConnection
import io.r2dbc.postgresql.api.PostgresqlResult
import io.r2dbc.spi.ConnectionFactory
import org.springframework.web.bind.annotation.*
import reactor.core.publisher.Flux
import reactor.core.publisher.Mono
import javax.annotation.PostConstruct
import javax.annotation.PreDestroy


@RestController
@RequestMapping("api/messages")
class MessageController(
        private val messageRepository: MessageReactiveRepository,
        private val connectionFactory: ConnectionFactory,
        private val objectMapper: ObjectMapper
) {

    var connection: PostgresqlConnection = Mono.from(connectionFactory.create()).cast(PostgresqlConnection::class.java).block()!!

    @PostConstruct
    private fun postConstruct() {
        val statement = connection
                .createStatement("LISTEN message_notification")
                .execute()
                .flatMap(PostgresqlResult::getRowsUpdated)
                .subscribe()
    }

    @PreDestroy
    private fun preDestroy() {
        connection.close().subscribe()
    }

    @GetMapping()
    fun getMessages(): Flux<String> {
        return connection.notifications
                .map { it.getParameter() }
                .let { this.messageRepository.findAll().map(objectMapper::writeValueAsString).mergeWith(it) }
    }

    @PostMapping
    fun addMessage(@RequestBody message: Message) {
        this.messageRepository.save(message).subscribe()
    }

}