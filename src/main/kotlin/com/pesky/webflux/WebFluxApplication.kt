package com.pesky.webflux

import com.pesky.webflux.messages.MessageReactiveRepository
import org.springframework.boot.CommandLineRunner
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean

@SpringBootApplication
class WebFluxApplication {
    @Bean
    fun init(repository: MessageReactiveRepository) = CommandLineRunner {
    }
}

fun main(args: Array<String>) {
    runApplication<WebFluxApplication>(*args)
}

