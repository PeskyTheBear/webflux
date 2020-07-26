package com.pesky.webflux.messages


import org.springframework.data.annotation.Id
import javax.persistence.GeneratedValue
import javax.validation.constraints.NotNull

data class Message(
        @Id
        @GeneratedValue
        var id: Long? = null,
        @NotNull
        var content: String)