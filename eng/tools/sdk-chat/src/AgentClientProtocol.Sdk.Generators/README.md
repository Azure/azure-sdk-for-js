# AgentClientProtocol.Sdk.Generators

Roslyn source generator for ACP protocol dispatch.

## Overview

Generates JSON-RPC method dispatch code at compile time for ACP agents and clients.

## How It Works

1. Scans for types implementing `IAgent` or `IClient`
2. Finds methods decorated with RPC attributes
3. Generates dispatch switch statements
4. Eliminates reflection at runtime

## Generated Code

```csharp
// Auto-generated dispatch
partial class MyAgent
{
    private async Task<JsonElement?> DispatchAsync(string method, JsonElement? params)
    {
        return method switch
        {
            "initialize" => await InitializeAsync(params.Deserialize<InitializeParams>()),
            "session/start" => await StartSessionAsync(params.Deserialize<SessionParams>()),
            _ => throw new MethodNotFoundException(method)
        };
    }
}
```

## Usage

Reference this project from `AgentClientProtocol.Sdk`:

```xml
<ProjectReference Include="..\AgentClientProtocol.Sdk.Generators\AgentClientProtocol.Sdk.Generators.csproj"
                  OutputItemType="Analyzer"
                  ReferenceOutputAssembly="false" />
```

## Development

Generator code is in `RpcDispatchGenerator.cs`.

```bash
dotnet build src/AgentClientProtocol.Sdk.Generators
```
