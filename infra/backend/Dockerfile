FROM eclipse-temurin:21-jre-focal AS builder
WORKDIR /app
COPY mvnw .
RUN chmod +x mvnw
COPY pom.xml .
RUN ./mvnw -B dependency:go-offline

COPY src ./src
RUN ./mvnw -B package -DskipTests

FROM eclipse-temurin:21-jre-focal AS runner
WORKDIR /app
COPY --from=builder /app/target/taskmanager-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENV SPRING_PROFILES_ACTIVE=docker
CMD ["java", "-jar", "app.jar"]
