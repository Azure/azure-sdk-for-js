# PublicApiGraphEngine.TypeScript

TypeScript Public API Graph Engine using ts-morph.

## Overview

Graphs public API surface from TypeScript packages by spawning a Node.js subprocess that uses ts-morph.

## Features

- Parses `.ts` and `.tsx` files
- Graphs classes, interfaces, functions, types
- Captures JSDoc comments
- Handles generics and union types
- Respects `export` visibility

## Architecture

| File | Description |
|------|-------------|
| `TypeScriptPublicApiGraphEngine.cs` | Orchestrates Node subprocess |
| `src/graph_api.ts` | TypeScript source (compiled to `dist/graph_api.js`) |
| `TypeScriptFormatter.cs` | Output formatting |
| `TypeScriptUsageAnalyzer.cs` | Analyzes imports in samples |

## How It Works

1. C# spawns `node dist/graph_api.js <path>`
2. Script uses ts-morph to parse TypeScript
3. JSON output piped back to C#
4. C# formats as API surface

## Requirements

- `node` in PATH (v18+)
- ts-morph installed in the engine directory

## Setup

```bash
cd src/PublicApiGraphEngine.TypeScript
npm install
```

## Development

```bash
# Test engine
dotnet test tests/PublicApiGraphEngine.Tests --filter "FullyQualifiedName~TypeScript"

# Test Node script directly
node src/PublicApiGraphEngine.TypeScript/dist/graph_api.js /path/to/ts/package
```
