# PublicApiGraphEngine.Go

Go Public API Graph Engine using go/parser.

## Overview

Graphs public API surface from Go modules by spawning a Go subprocess that uses the standard library's `go/parser` and `go/ast` packages.

## Features

- Parses `.go` files
- Graphs exported types, functions, methods
- Captures struct fields and interfaces
- Handles generics (Go 1.18+)
- Respects Go visibility (exported = capitalized)

## Architecture

| File | Description |
|------|-------------|
| `GoPublicApiGraphEngine.cs` | Orchestrates Go subprocess |
| `graph_api.go` | Go script using go/parser |
| `GoFormatter.cs` | Output formatting |
| `GoUsageAnalyzer.cs` | Analyzes imports in samples |

## How It Works

1. C# spawns `go run graph_api.go <path>`
2. Go script walks the AST
3. JSON output piped back to C#
4. C# formats as API surface

## Requirements

- `go` in PATH (1.18+)
- No external Go packages required (uses stdlib)

## Development

```bash
# Test engine
dotnet test tests/PublicApiGraphEngine.Tests --filter "FullyQualifiedName~Go"

# Test Go script directly
go run src/PublicApiGraphEngine.Go/graph_api.go /path/to/go/module
```
