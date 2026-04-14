# Contributing

## Quick Links

| I want to... | Go to |
|--------------|-------|
| Run tests | [Testing](#testing) |
| Add a new language engine | [Adding a Language](#adding-a-language) |
| Understand the architecture | [Architecture](#architecture) |
| Follow code style | [Coding Standards](#coding-standards) |
| Build the project | [Building](#building) |

---

## Getting Started

Use the Docker development container for all development and testing. This ensures a consistent environment with all language runtimes (Python, Node.js, Go, JBang) pre-installed.

```bash
git clone https://github.com/deyaaeldeen/sdk-chat
cd sdk-chat

# Build dev container
docker build -t sdk-chat-dev .

# Run tests (recommended)
docker run --rm -u $(id -u):$(id -g) -v "$(pwd):/workspace" sdk-chat-dev

# Interactive shell for development
docker run -it --rm -u $(id -u):$(id -g) -v "$(pwd):/workspace" sdk-chat-dev bash

# Build only
docker run --rm -u $(id -u):$(id -g) -v "$(pwd):/workspace" sdk-chat-dev dotnet build

# Run specific test
docker run --rm -u $(id -u):$(id -g) -v "$(pwd):/workspace" sdk-chat-dev dotnet test --filter "FullyQualifiedName~AiServiceTests"
```

> **Note:** The `-u $(id -u):$(id -g)` flag maps your host user into the container, ensuring files created in `/workspace` have correct ownership.

### VS Code Dev Container

For the best development experience, open the project in VS Code and use the dev container:

F1 → "Dev Containers: Reopen in Container"

The dev container includes: .NET SDK 10, Python 3, Node.js, Go, JBang, VHS, Copilot CLI.

### Docker Images

| Image | Dockerfile | Purpose |
|-------|------------|--------|
| `sdk-chat-dev` | `Dockerfile` | Development and testing |
| `sdk-chat-demo` | `demo/Dockerfile` | VHS demo recording |
| `public-api-graph-engine-{lang}` | `engines/{lang}/Dockerfile` | Per-language Public API Graph Engine fallback |

### Running Natively

The CLI and MCP server run natively on the host without Docker:

```bash
# Run CLI commands directly
dotnet run --project src/Microsoft.SdkChat -- package sample generate /path/to/sdk
```

Language engines automatically fall back to Docker when the runtime (Python, Go, Node.js, JBang) isn't installed.

---

## Project Structure

```
sdk-chat/
├── src/
│   ├── Microsoft.SdkChat/              # Main CLI tool
│   ├── AgentClientProtocol.Sdk/        # ACP protocol implementation
│   ├── AgentClientProtocol.Sdk.Generators/  # Source generator
│   ├── PublicApiGraphEngine.Contracts/         # Shared interfaces
│   ├── PublicApiGraphEngine.DotNet/            # C# engine (Roslyn)
│   ├── PublicApiGraphEngine.Python/            # Python engine (ast)
│   ├── PublicApiGraphEngine.TypeScript/        # TypeScript engine (ts-morph)
│   ├── PublicApiGraphEngine.Java/              # Java engine (JavaParser)
│   └── PublicApiGraphEngine.Go/                # Go engine (go/parser)
├── tests/
│   ├── Microsoft.SdkChat.Tests/        # CLI + service tests (270+)
│   ├── AgentClientProtocol.Sdk.Tests/  # Protocol tests (70+)
│   └── PublicApiGraphEngine.Tests/             # Engine tests (140+)
├── demo/                               # Demo recording
└── docs/                               # Documentation
```

---

## Testing

### Run All Tests

```bash
dotnet test  # 480+ tests
```

### Run by Project

```bash
# CLI and services
dotnet test tests/Microsoft.SdkChat.Tests

# Protocol
dotnet test tests/AgentClientProtocol.Sdk.Tests

# Engines
dotnet test tests/PublicApiGraphEngine.Tests
```

### Run by Filter

```bash
# By class name
dotnet test --filter "FullyQualifiedName~DotNetPublicApiGraphEngine"

# By test name
dotnet test --filter "DisplayName~streaming"

# Multiple filters
dotnet test --filter "FullyQualifiedName~Python|FullyQualifiedName~Java"
```

### Skippable Tests

Some tests require external tools (python3, node, jbang, go). They auto-skip if unavailable:

```csharp
[SkippableFact]
public async Task GraphsApi()
{
    Skip.IfNot(_engine.IsAvailable(), "python3 not installed");
    // ...
}
```

### Test Fixtures

Located in `tests/PublicApiGraphEngine.Tests/TestFixtures/<Language>/`:
- Minimal but representative code samples
- Cover classes, interfaces, enums, generics
- Used by all engine tests

### Writing Tests

```csharp
public class MyFeatureTests
{
    [Fact]
    public async Task Feature_Condition_Expected()
    {
        // Arrange
        var sut = new MyService();
        
        // Act
        var result = await sut.DoThingAsync();
        
        // Assert
        Assert.NotNull(result);
    }
}
```

---

## Architecture

### How It Works

```
SDK Source → Public API Graph Engine → Minimal Context → AI → Samples
   10MB           ↓              ~100KB        ↓     5 files
             Roslyn/ast/                   Claude/
             ts-morph/etc                 GPT/Copilot
```

1. **Detect** — Language from project files
2. **Graph** — Public API surface (~95% smaller than source)
3. **Generate** — AI creates samples with focused context
4. **Write** — Idiomatic, runnable code with proper patterns

### Component Diagram

```
+---------------------------------------------------------------+
|                       Microsoft.SdkChat                       |
|                                                               |
|   +-------+       +-------+       +-----------------------+   |
|   |  CLI  |       |  MCP  |       |          ACP          |   |
|   | Mode  |       |Server |       |   Interactive Mode    |   |
|   +---+---+       +---+---+       +-----------+-----------+   |
|       |               |                       |               |
|       +---------------+-----------+-----------+               |
|                                   |                           |
|                       +-----------v-----------+               |
|                       |   Sample Generator    |               |
|                       |    + AI Service       |               |
|                       +-----------+-----------+               |
+-----------------------+-----------+---------------------------+
                                    |
        +----------+----------+-----+-----+----------+----------+
        v          v          v           v          v          v
   +-------+  +-------+  +-------+  +-------+  +-----------+
   | .NET  |  |Python |  | Java  |  |  Go   |  |TypeScript |
   |Roslyn |  |  ast  |  |Parser |  |parser |  | ts-morph  |
   +-------+  +-------+  +-------+  +-------+  +-----------+
```

### Components

| Component | Purpose |
|-----------|---------|
| **Microsoft.SdkChat** | Main CLI with three modes (CLI, MCP, ACP) |
| **AgentClientProtocol.Sdk** | Standalone ACP protocol implementation |
| **PublicApiGraphEngine.\*** | Language-specific Public API Graph Engines |
| **PublicApiGraphEngine.Contracts** | Shared `IPublicApiGraphEngine<T>` interface |

---

## Adding a Language

### 1. Create Project

```bash
dotnet new classlib -n PublicApiGraphEngine.NewLang -o src/PublicApiGraphEngine.NewLang
dotnet sln add src/PublicApiGraphEngine.NewLang
```

Add reference to `src/PublicApiGraphEngine.NewLang/PublicApiGraphEngine.NewLang.csproj`:
```xml
<ProjectReference Include="..\PublicApiGraphEngine.Contracts\PublicApiGraphEngine.Contracts.csproj" />
```

### 2. Implement Interface

```csharp
// PublicApiGraphEngine.NewLang/NewLangPublicApiGraphEngine.cs
public class NewLangPublicApiGraphEngine : IPublicApiGraphEngine<ApiIndex>
{
    public string Language => "newlang";
    
    public bool IsAvailable()
    {
        // Check if runtime exists (e.g., `newlang --version`)
        return ProcessHelper.TryRun("newlang", "--version");
    }
    
    public string? UnavailableReason { get; private set; }
    
    public async Task<EngineResult<ApiIndex>> GraphAsync(
        string rootPath, 
        CancellationToken ct)
    {
        // Shell to language parser script or use embedded parser
    }
    
    public string ToJson(ApiIndex index, bool pretty = false) => /* ... */;
    public string ToStubs(ApiIndex index) => /* ... */;
}
```

### 3. Define Models

```csharp
// PublicApiGraphEngine.NewLang/Models.cs
public record ApiIndex
{
    [JsonPropertyName("package")]
    public string Package { get; init; } = "";
    
    [JsonPropertyName("modules")]
    public List<ModuleInfo> Modules { get; init; } = [];
}
```

Use **records** with `{ get; init; }` properties.

### 4. Create Formatter

```csharp
// PublicApiGraphEngine.NewLang/NewLangFormatter.cs
public static class NewLangFormatter
{
    public static string Format(ApiIndex index)
    {
        // Return language-native stub syntax
    }
}
```

### 5. Add CLI Entry Point

```csharp
// PublicApiGraphEngine.NewLang/Program.cs
var options = CliOptions.Parse(args);
if (options.ShowHelp || options.Path == null)
{
    Console.WriteLine(CliOptions.GetHelpText("NewLang", "PublicApiGraphEngine.NewLang"));
    return options.ShowHelp ? 0 : 1;
}
// Standard engine flow...
```

### 6. Add Tests

Create `tests/PublicApiGraphEngine.Tests/NewLangPublicApiGraphEngineTests.cs`:

```csharp
public class NewLangPublicApiGraphEngineTests
{
    [SkippableFact]
    public async Task GraphsPublicApi()
    {
        Skip.IfNot(_engine.IsAvailable(), "newlang not installed");
        // Test engine
    }
}
```

Add fixtures in `tests/PublicApiGraphEngine.Tests/TestFixtures/NewLang/`.

### 7. Register in Main Tool

Update `src/Microsoft.SdkChat/Services/Languages/LanguageDetector.cs` to detect the new language.

---

## Coding Standards

### Required

| Rule | Example |
|------|---------|
| .NET 10 | `<TargetFramework>net10.0</TargetFramework>` |
| File-scoped namespaces | `namespace Foo;` |
| Records for models | `public record Foo { get; init; }` |
| Collection expressions | `[]` not `new List<T>()` |
| Nullable enabled | `<Nullable>enable</Nullable>` |
| Copyright header | Every `.cs` file |

### JSON Serialization

```csharp
[JsonPropertyName("camelCase")]
public string Property { get; init; }

[JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
public string? OptionalProperty { get; init; }
```

### CLI Interface

All engines must support:
```
<engine> <path> [--json] [--stub] [--pretty] [-o <file>] [-h]
```

Exit codes: `0` success, `1` error.

---

## Building

```bash
# Build all
dotnet build

# Run CLI directly
dotnet run --project src/Microsoft.SdkChat -- package sample generate /path/to/sdk

# Run single engine
dotnet run --project src/PublicApiGraphEngine.DotNet -- /path --json --pretty

# Pack as tool
dotnet pack src/Microsoft.SdkChat -o ./artifacts

# Install locally
dotnet tool install --global --add-source ./artifacts Microsoft.SdkChat
```

---

## Pull Request Checklist

- [ ] `dotnet build` passes
- [ ] `dotnet test` passes (or new tests skip appropriately)
- [ ] New code has tests
- [ ] Follows coding standards below
- [ ] Updated relevant README if adding features

---

## Questions?

Open an issue or check existing discussions.
