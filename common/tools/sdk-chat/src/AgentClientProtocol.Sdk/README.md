# AgentClientProtocol.Sdk

.NET SDK for the Agent Client Protocol (ACP).

## Overview

Implements the ACP specification for building interactive AI agents that communicate with host applications via JSON-RPC over stdio.

## Key Types

| Type | Description |
|------|-------------|
| `IAgent` | Interface for implementing agents |
| `IClient` | Interface for client-side operations |
| `AgentSideConnection` | Server-side connection handler |
| `ClientSideConnection` | Client-side connection handler |
| `TerminalHandle` | Terminal interaction abstraction |

## Protocol

The protocol uses newline-delimited JSON-RPC 2.0 messages:

```
Agent                          Client
  │                              │
  │◄────── initialize ──────────│
  │─────── initialized ────────►│
  │                              │
  │◄────── session/new ─────────│
  │─────── session/new (resp) ─►│
  │                              │
  │─────── session/prompt ─────►│
  │◄────── session/update ──────│
  │─────── session/request_permission ─►│
  │◄────── session/request_permission (resp) ────│
  │                              │
  │◄────── session/update ──────│
  │─────── session/set_mode ───►│
  │◄────── session/update ──────│
  │◄────── session/prompt (resp) ─────►│
```

## Usage

```csharp
// Implement IAgent
public class MyAgent : IAgent
{
    public Task<InitializeResult> InitializeAsync(InitializeParams p) { ... }
    public Task<SessionResult> StartSessionAsync(SessionParams p) { ... }
}

// Start agent server
var agent = new MyAgent();
var connection = new AgentSideConnection(agent, stdin, stdout);
await connection.RunAsync();
```

## Schema

Protocol types are defined in `Schema/`:
- `AgentMethods.cs` — Agent-side RPC methods
- `ClientMethods.cs` — Client-side RPC methods
- `SessionTypes.cs` — Session management
- `PermissionTypes.cs` — Permission system
- `ContentTypes.cs` — Content transfer
- `TerminalTypes.cs` — Terminal operations

## Development

```bash
dotnet test tests/AgentClientProtocol.Sdk.Tests
```
