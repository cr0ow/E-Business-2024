FROM openjdk:17

WORKDIR /app

COPY gradlew .
COPY gradle gradle
COPY build.gradle.kts .
COPY settings.gradle.kts .
COPY src src
RUN chmod +x ./gradlew
RUN microdnf -y install findutils
EXPOSE 8080

RUN addgroup -S nonroot && adduser -S nonroot -G nonroot
USER nonroot

CMD ["./gradlew", "bootRun"]