# PublicApiGraphEngine.Python

Python Public API Graph Engine using the `ast` module.

## Overview

Graphs public API surface from Python packages by spawning a Python subprocess that uses the built-in `ast` module.

## Features

- Parses `.py` files
- Graphs classes, functions, methods
- Captures type hints (PEP 484)
- Handles docstrings
- Respects `_private` naming conventions

## Architecture

| File | Description |
|------|-------------|
| `PythonPublicApiGraphEngine.cs` | Orchestrates Python subprocess |
| `graph_api.py` | Python script that does the actual parsing |
| `PythonFormatter.cs` | Output formatting |
| `PythonUsageAnalyzer.cs` | Analyzes imports in samples |

## How It Works

1. C# spawns `python3 graph_api.py <path>`
2. Python script walks the AST
3. JSON output piped back to C#
4. C# formats as API surface

## Requirements

- `python3` in PATH
- No external Python packages required (uses stdlib `ast`)

## Development

```bash
# Test engine
dotnet test tests/PublicApiGraphEngine.Tests --filter "FullyQualifiedName~Python"

# Test Python script directly
python3 src/PublicApiGraphEngine.Python/graph_api.py /path/to/python/package
```
