# PublicApiGraphEngine.DotNet

C# and .NET Public API Graph Engine using Roslyn.

## Overview

Graphs public API surface from .NET assemblies and source code using the Roslyn compiler platform.

## Features

- Parses `.cs` files and `.csproj` projects
- Graphs classes, interfaces, structs, enums
- Captures method signatures, properties, events
- Handles generics, nullability, attributes
- Respects visibility modifiers

## Architecture

| File | Description |
|------|-------------|
| `CSharpPublicApiGraphEngine.cs` | Main engine implementation |
| `CSharpFormatter.cs` | Output formatting (XML-style API surface) |
| `CSharpUsageAnalyzer.cs` | Analyzes which types are used in samples |
| `Models.cs` | Internal parse models |

## Usage

```csharp
var engine = new CSharpPublicApiGraphEngine();
var surface = await engine.GraphAsync("/path/to/sdk/src", ct);
```

## Output Format

```xml
<api-surface package="MyPackage">
  <class name="MyClient">
    <method name="SendAsync" returns="Task&lt;Response&gt;">
      <param name="request" type="Request" />
    </method>
  </class>
</api-surface>
```

## Requirements

- Built-in (uses Roslyn NuGet packages)
- No external tools required

## Development

```bash
dotnet test tests/PublicApiGraphEngine.Tests --filter "FullyQualifiedName~DotNet"
```
