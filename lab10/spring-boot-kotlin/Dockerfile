FROM openjdk:17

WORKDIR /app

COPY build build
EXPOSE 8080

CMD ["java", "-jar", "./build/libs/spring-boot-kotlin-0.0.1-SNAPSHOT.jar"]