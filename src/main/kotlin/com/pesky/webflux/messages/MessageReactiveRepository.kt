package com.pesky.webflux.messages

import org.springframework.data.r2dbc.repository.R2dbcRepository

interface MessageReactiveRepository : R2dbcRepository<Message, Long> {
}