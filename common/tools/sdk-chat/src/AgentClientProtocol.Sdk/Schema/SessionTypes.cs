// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

[assembly: SuppressMessage("Performance", "CA1819:Properties should not return arrays",
    Scope = "namespaceanddescendants", Target = "~N:AgentClientProtocol.Sdk.Schema",
    Justification = "Protocol DTOs must match JSON schema; arrays are serialized directly")]
[assembly: SuppressMessage("Design", "CA1056:URI-like properties should not be strings",
    Scope = "namespaceanddescendants", Target = "~N:AgentClientProtocol.Sdk.Schema",
    Justification = "Protocol DTOs must match JSON schema; URIs are serialized as strings")]

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Request to initialize connection.
/// </summary>
public sealed record InitializeRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("protocolVersion")]
    public required ushort ProtocolVersion { get; init; }

    [JsonPropertyName("clientCapabilities")]
    public ClientCapabilities? ClientCapabilities { get; init; }

    [JsonPropertyName("clientInfo")]
    public Implementation? ClientInfo { get; init; }
}

/// <summary>
/// Response to initialize request.
/// </summary>
public sealed record InitializeResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("protocolVersion")]
    public required ushort ProtocolVersion { get; init; }

    [JsonPropertyName("agentCapabilities")]
    public AgentCapabilities? AgentCapabilities { get; init; }

    [JsonPropertyName("agentInfo")]
    public Implementation? AgentInfo { get; init; }

    [JsonPropertyName("authMethods")]
    public AuthMethod[]? AuthMethods { get; init; }
}

/// <summary>
/// Authentication method.
/// </summary>
public record AuthMethod
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }
}

/// <summary>
/// Request to authenticate.
/// </summary>
public record AuthenticateRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("methodId")]
    public required string MethodId { get; init; }
}

/// <summary>
/// Response to authenticate request.
/// </summary>
public record AuthenticateResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Request to create a new session.
/// </summary>
public sealed record NewSessionRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("cwd")]
    public required string Cwd { get; init; }

    [JsonPropertyName("mcpServers")]
    public required McpServer[] McpServers { get; init; }
}

/// <summary>
/// Response to new session request.
/// </summary>
public sealed record NewSessionResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("modes")]
    public SessionModeState? Modes { get; init; }
}

/// <summary>
/// Request to load an existing session.
/// </summary>
public record LoadSessionRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("cwd")]
    public required string Cwd { get; init; }

    [JsonPropertyName("mcpServers")]
    public required McpServer[] McpServers { get; init; }
}

/// <summary>
/// Response to load session request.
/// </summary>
public record LoadSessionResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("modes")]
    public SessionModeState? Modes { get; init; }
}

/// <summary>
/// Request to prompt in a session.
/// </summary>
public sealed record PromptRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("prompt")]
    public required ContentBlock[] Prompt { get; init; }
}

/// <summary>
/// Response to prompt request.
/// </summary>
public sealed record PromptResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("stopReason")]
    public required string StopReason { get; init; }
}

/// <summary>
/// Cancel notification.
/// </summary>
public record CancelNotification
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }
}

/// <summary>
/// Request to set the session mode.
/// </summary>
public sealed record SetSessionModeRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("modeId")]
    public required string ModeId { get; init; }
}

/// <summary>
/// Response to set session mode request.
/// </summary>
public sealed record SetSessionModeResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// MCP server configuration.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(McpServerStdio), "stdio")]
[JsonDerivedType(typeof(McpServerHttp), "http")]
[JsonDerivedType(typeof(McpServerSse), "sse")]
public abstract record McpServer
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }
}

public record McpServerStdio : McpServer
{
    [JsonPropertyName("command")]
    public required string Command { get; init; }

    [JsonPropertyName("args")]
    public required string[] Args { get; init; }

    [JsonPropertyName("env")]
    public required EnvVariable[] Env { get; init; }
}

public record McpServerHttp : McpServer
{
    [JsonPropertyName("url")]
    public required string Url { get; init; }

    [JsonPropertyName("headers")]
    public required HttpHeader[] Headers { get; init; }
}

public record McpServerSse : McpServer
{
    [JsonPropertyName("url")]
    public required string Url { get; init; }

    [JsonPropertyName("headers")]
    public required HttpHeader[] Headers { get; init; }
}

public record EnvVariable
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("value")]
    public required string Value { get; init; }
}

public record HttpHeader
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("value")]
    public required string Value { get; init; }
}

/// <summary>
/// Session mode state.
/// </summary>
public record SessionModeState
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("availableModes")]
    public required SessionMode[] AvailableModes { get; init; }

    [JsonPropertyName("currentModeId")]
    public required string CurrentModeId { get; init; }
}

/// <summary>
/// Session mode.
/// </summary>
public record SessionMode
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("id")]
    public required string Id { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("description")]
    public string? Description { get; init; }
}

/// <summary>
/// Stop reasons for prompt responses.
/// </summary>
public static class StopReason
{
    public const string EndTurn = "end_turn";
    public const string MaxTokens = "max_tokens";
    public const string MaxTurnRequests = "max_turn_requests";
    public const string Refusal = "refusal";
    public const string Cancelled = "cancelled";
    public const string StopSequence = "stop_sequence";
}
