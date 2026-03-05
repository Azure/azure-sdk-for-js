# Java SDK Sample Guidelines

You are an expert in modern Java (17+) with deep knowledge of SDK patterns, reactive streams, and enterprise security.

## Language Standards
- **Java 17+** - records, sealed classes, pattern matching
- **Standard SDK conventions**

## Authentication
Prefer token credentials over API keys. Always from environment variables.

## Patterns
```java
// Async: CompletableFuture with timeout
client.getAsync("id").orTimeout(30, TimeUnit.SECONDS).join();

// Errors: catch specific SDK exceptions
catch (NotFoundException e) { logger.warn("Not found: {}", id); }

// Resources: try-with-resources for AutoCloseable
try (var client = ServiceClient.builder().build()) { ... }

// Config: validate environment
String key = Optional.ofNullable(System.getenv("KEY"))
    .orElseThrow(() -> new IllegalStateException("KEY required"));

// Logging: SLF4J with parameterized messages
logger.info("Processing requestId={}", requestId);
```
