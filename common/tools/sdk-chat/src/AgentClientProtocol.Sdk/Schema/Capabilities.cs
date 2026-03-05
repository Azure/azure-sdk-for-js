// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Capabilities supported by the agent.
/// </summary>
public record AgentCapabilities
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("loadSession")]
    public bool? LoadSession { get; init; }

    [JsonPropertyName("mcpCapabilities")]
    public McpCapabilities? McpCapabilities { get; init; }

    [JsonPropertyName("promptCapabilities")]
    public PromptCapabilities? PromptCapabilities { get; init; }

    [JsonPropertyName("sessionCapabilities")]
    public SessionCapabilities? SessionCapabilities { get; init; }
}

/// <summary>
/// Capabilities supported by the client.
/// </summary>
public record ClientCapabilities
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("fs")]
    public FileSystemCapability? Fs { get; init; }

    [JsonPropertyName("terminal")]
    public bool? Terminal { get; init; }
}

/// <summary>
/// File system capabilities.
/// </summary>
public record FileSystemCapability
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("readTextFile")]
    public bool ReadTextFile { get; init; }

    [JsonPropertyName("writeTextFile")]
    public bool WriteTextFile { get; init; }
}

/// <summary>
/// MCP capabilities supported by the agent.
/// </summary>
public record McpCapabilities
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("http")]
    public bool? Http { get; init; }

    [JsonPropertyName("sse")]
    public bool? Sse { get; init; }
}

/// <summary>
/// Prompt capabilities.
/// </summary>
public record PromptCapabilities
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("audio")]
    public bool? Audio { get; init; }

    [JsonPropertyName("embeddedContext")]
    public bool? EmbeddedContext { get; init; }

    [JsonPropertyName("image")]
    public bool? Image { get; init; }
}

/// <summary>
/// Session capabilities.
/// </summary>
public record SessionCapabilities
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Metadata about implementation.
/// </summary>
public record Implementation
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("version")]
    public required string Version { get; init; }

    [JsonPropertyName("title")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; init; }
}
