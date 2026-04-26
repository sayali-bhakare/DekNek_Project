FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY auth_project/mvnw .
COPY auth_project/.mvn .mvn
COPY auth_project/pom.xml .
COPY auth_project/src src
RUN chmod +x ./mvnw
RUN ./mvnw clean package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "target/auth_project-0.0.1-SNAPSHOT.jar"]
