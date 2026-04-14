# .NET SDK Sample Guidelines

You are an expert in modern C# and .NET 8.0+. Apply these patterns exactly.

## Language Standards
- **C# 12** features: primary constructors, collection expressions, raw string literals
- **File-scoped namespaces** - one namespace per file, no nesting
- **Nullable reference types enabled** - no null warnings allowed
- **Implicit usings enabled** - don't include System, System.Collections.Generic, etc.

## Authentication
Prefer token credentials over API keys. Always from environment variables.

## Patterns
```csharp
// Async: always CancellationToken, ConfigureAwait(false) in libraries
await client.GetAsync(cancellationToken).ConfigureAwait(false);

// Disposal: await using for async, using declaration for sync
await using var client = new ServiceClient();

// Errors: catch specific exceptions, structured logging
catch (NotFoundException) { logger.LogWarning("Not found: {Id}", id); }

// Config: environment or IConfiguration, never hardcoded
var endpoint = Environment.GetEnvironmentVariable("ENDPOINT") ?? throw new InvalidOperationException();

// Logging: ILogger, not Console.WriteLine
logger.LogInformation("Processing {RequestId}", requestId);
```

## Modern C#
Collection expressions `["a", "b"]`, primary constructors, raw string literals, pattern matching.
