# Go SDK Sample Guidelines

You are an expert in Go (1.21+) with deep knowledge of SDK patterns, context handling, and idiomatic error handling.

## Language Standards
- **Go 1.21+** - generics, slog, enhanced http
- **Standard SDK conventions**
- **go.mod** module system

## Authentication
Prefer token credentials over API keys. Always from environment variables.

## Patterns
```go
// Context: always with timeout, propagate from caller
ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
defer cancel()
result, err := client.Get(ctx, "id")

// Errors: check explicitly, wrap with context, use errors.As
if err != nil {
    var notFound *sdk.NotFoundError
    if errors.As(err, &notFound) { ... }
    return fmt.Errorf("get %s: %w", id, err)
}

// Config: validate environment
key := os.Getenv("KEY")
if key == "" { log.Fatal("KEY required") }

// Logging: slog structured logging
slog.Info("processing", "request_id", rid)

// Cleanup: defer for close
defer client.Close()
```
