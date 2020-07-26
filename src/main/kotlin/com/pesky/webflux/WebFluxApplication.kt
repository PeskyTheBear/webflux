package com.pesky.webflux

import org.springframework.beans.factory.annotation.Value
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.core.io.ClassPathResource
import org.springframework.core.io.Resource
import org.springframework.http.MediaType.TEXT_HTML
import org.springframework.web.reactive.function.server.RouterFunctions.resources
import org.springframework.web.reactive.function.server.router


@SpringBootApplication
class WebFluxApplication {

}

fun main(args: Array<String>) {
    runApplication<WebFluxApplication>(*args)
}

@Configuration
class StaticContextConfig {
    @Bean
    fun resRouter() = resources("/**", ClassPathResource("static/"))

    @Bean
    fun indexRouter(@Value("classpath:/static/index.html") html:
                    Resource) = router {
        GET("/*") {
            ok().contentType(TEXT_HTML).bodyValue(html)
        }
    }
}
