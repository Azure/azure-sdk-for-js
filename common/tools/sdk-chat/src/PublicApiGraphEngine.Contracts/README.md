# PublicApiGraphEngine.Contracts

Shared interfaces and types for Public API Graph Engines.

## Overview

Defines the contracts that all language-specific Public API Graph Engines must implement.

## Key Interfaces

### `IPublicApiGraphEngine`

```csharp
public interface IPublicApiGraphEngine
{
    string Language { get; }
    Task<ApiSurface> GraphAsync(string sourcePath, CancellationToken ct);
}
```

### `IUsageAnalyzer`

```csharp
public interface IUsageAnalyzer
{
    Task<IReadOnlyList<string>> GetImportedTypesAsync(string samplePath, CancellationToken ct);
}
```

## Key Types

| Type | Description |
|------|-------------|
| `ApiSurface` | Graphed API surface model |
| `ApiType` | Type definition (class, interface, enum) |
| `ApiMethod` | Method signature |
| `ApiProperty` | Property definition |
| `CliOptions` | Shared CLI parsing options |
| `ToolPathResolver` | Finds external tools (python3, node, etc.) |

## Usage

Implement `IPublicApiGraphEngine` to add support for a new language:

```csharp
public class MyLanguageEngine : IPublicApiGraphEngine
{
    public string Language => "mylang";
    
    public async Task<ApiSurface> GraphAsync(string sourcePath, CancellationToken ct)
    {
        // Parse source files
        // Graph public API surface
        // Return structured model
    }
}
```

## Development

```bash
dotnet test tests/PublicApiGraphEngine.Tests
```
