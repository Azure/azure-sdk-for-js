# PublicApiGraphEngine.Java

Java Public API Graph Engine using JavaParser via JBang.

## Overview

Graphs public API surface from Java packages by spawning JBang to run a JavaParser-based script.

## Features

- Parses `.java` files
- Graphs classes, interfaces, enums
- Captures method signatures, fields
- Handles generics and annotations
- Respects visibility modifiers

## Architecture

| File | Description |
|------|-------------|
| `JavaPublicApiGraphEngine.cs` | Orchestrates JBang subprocess |
| `GraphApi.java` | JBang script using JavaParser |
| `JavaFormatter.cs` | Output formatting |
| `JavaUsageAnalyzer.cs` | Analyzes imports in samples |

## How It Works

1. C# spawns `jbang GraphApi.java <path>`
2. JBang downloads JavaParser automatically
3. Script parses Java source files
4. JSON output piped back to C#

## Requirements

- `jbang` in PATH
- JDK 11+ (JBang handles this)

## Install JBang

```bash
# macOS
brew install jbang

# Linux
curl -Ls https://sh.jbang.dev | bash -s - app setup

# Windows
scoop install jbang
```

## Development

```bash
# Test engine
dotnet test tests/PublicApiGraphEngine.Tests --filter "FullyQualifiedName~Java"

# Test JBang script directly
jbang src/PublicApiGraphEngine.Java/GraphApi.java /path/to/java/package
```
