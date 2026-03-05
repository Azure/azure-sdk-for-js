// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Base content block in prompts and responses.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextContent), "text")]
[JsonDerivedType(typeof(ImageContent), "image")]
[JsonDerivedType(typeof(AudioContent), "audio")]
[JsonDerivedType(typeof(ResourceLink), "resource_link")]
[JsonDerivedType(typeof(EmbeddedResource), "resource")]
public abstract record ContentBlock
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Text content.
/// </summary>
public record TextContent : ContentBlock
{
    [JsonPropertyName("text")]
    public required string Text { get; init; }

    [JsonPropertyName("annotations")]
    public Annotations? Annotations { get; init; }
}

/// <summary>
/// Image content.
/// </summary>
public record ImageContent : ContentBlock
{
    [JsonPropertyName("data")]
    public required string Data { get; init; }

    [JsonPropertyName("mimeType")]
    public required string MimeType { get; init; }

    [JsonPropertyName("uri")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Uri { get; init; }

    [JsonPropertyName("annotations")]
    public Annotations? Annotations { get; init; }
}

/// <summary>
/// Audio content.
/// </summary>
public record AudioContent : ContentBlock
{
    [JsonPropertyName("data")]
    public required string Data { get; init; }

    [JsonPropertyName("mimeType")]
    public required string MimeType { get; init; }

    [JsonPropertyName("annotations")]
    public Annotations? Annotations { get; init; }
}

/// <summary>
/// Resource link content.
/// </summary>
public record ResourceLink : ContentBlock
{
    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("uri")]
    public required string Uri { get; init; }

    [JsonPropertyName("title")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; init; }

    [JsonPropertyName("description")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Description { get; init; }

    [JsonPropertyName("mimeType")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MimeType { get; init; }

    [JsonPropertyName("size")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public long? Size { get; init; }

    [JsonPropertyName("annotations")]
    public Annotations? Annotations { get; init; }
}

/// <summary>
/// Embedded resource content.
/// </summary>
public record EmbeddedResource : ContentBlock
{
    [JsonPropertyName("resource")]
    public required EmbeddedResourceResource Resource { get; init; }

    [JsonPropertyName("annotations")]
    public Annotations? Annotations { get; init; }
}

/// <summary>
/// Embedded resource contents (text or blob).
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(TextResourceContents), "text")]
[JsonDerivedType(typeof(BlobResourceContents), "blob")]
[SuppressMessage("Design", "CA1056:URI-like properties should not be strings",
    Justification = "Protocol DTO must match JSON schema; Uri is serialized as string")]
public abstract record EmbeddedResourceResource
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("uri")]
    public required string Uri { get; init; }

    [JsonPropertyName("mimeType")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MimeType { get; init; }
}

public record TextResourceContents : EmbeddedResourceResource
{
    [JsonPropertyName("text")]
    public required string Text { get; init; }
}

public record BlobResourceContents : EmbeddedResourceResource
{
    [JsonPropertyName("blob")]
    public required string Blob { get; init; }
}

/// <summary>
/// Annotations for content.
/// </summary>
[SuppressMessage("Performance", "CA1819:Properties should not return arrays",
    Justification = "Protocol DTO must match JSON schema; Audience is serialized as JSON array")]
public record Annotations
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("audience")]
    public string[]? Audience { get; init; }

    [JsonPropertyName("priority")]
    public double? Priority { get; init; }

    [JsonPropertyName("lastModified")]
    public string? LastModified { get; init; }
}

/// <summary>
/// Wrapper for content used in tool call output.
/// </summary>
public record Content : ToolCallContent
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required ContentBlock Block { get; init; }
}

/// <summary>
/// A streamed item of content.
/// </summary>
public record ContentChunk
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required ContentBlock Content { get; init; }
}

/// <summary>
/// Session update notification.
/// </summary>
public record SessionNotification
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("update")]
    public required SessionUpdate Update { get; init; }
}

/// <summary>
/// Session update payload types.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "sessionUpdate")]
[JsonDerivedType(typeof(UserMessageChunk), "user_message_chunk")]
[JsonDerivedType(typeof(AgentMessageChunk), "agent_message_chunk")]
[JsonDerivedType(typeof(AgentThoughtChunk), "agent_thought_chunk")]
[JsonDerivedType(typeof(ToolCall), "tool_call")]
[JsonDerivedType(typeof(ToolCallUpdate), "tool_call_update")]
[JsonDerivedType(typeof(Plan), "plan")]
[JsonDerivedType(typeof(AvailableCommandsUpdate), "available_commands_update")]
[JsonDerivedType(typeof(CurrentModeUpdate), "current_mode_update")]
public abstract record SessionUpdate;

public record UserMessageChunk : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required ContentBlock Content { get; init; }
}

public record AgentMessageChunk : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required ContentBlock Content { get; init; }
}

public record AgentThoughtChunk : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required ContentBlock Content { get; init; }
}

public record ToolCall : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("toolCallId")]
    public required string ToolCallId { get; init; }

    [JsonPropertyName("title")]
    public required string Title { get; init; }

    [JsonPropertyName("status")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Status { get; init; }

    [JsonPropertyName("kind")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Kind { get; init; }

    [JsonPropertyName("content")]
    public ToolCallContent[]? Content { get; init; }

    [JsonPropertyName("locations")]
    public ToolCallLocation[]? Locations { get; init; }

    [JsonPropertyName("rawInput")]
    public JsonElement? RawInput { get; init; }

    [JsonPropertyName("rawOutput")]
    public JsonElement? RawOutput { get; init; }
}

public record ToolCallUpdate : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("toolCallId")]
    public required string ToolCallId { get; init; }

    [JsonPropertyName("title")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Title { get; init; }

    [JsonPropertyName("status")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Status { get; init; }

    [JsonPropertyName("kind")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Kind { get; init; }

    [JsonPropertyName("content")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ToolCallContent[]? Content { get; init; }

    [JsonPropertyName("locations")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ToolCallLocation[]? Locations { get; init; }

    [JsonPropertyName("rawInput")]
    public JsonElement? RawInput { get; init; }

    [JsonPropertyName("rawOutput")]
    public JsonElement? RawOutput { get; init; }
}

public record Plan : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("entries")]
    public required PlanEntry[] Entries { get; init; }
}

public record PlanEntry
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("content")]
    public required string Content { get; init; }

    [JsonPropertyName("priority")]
    public required string Priority { get; init; }

    [JsonPropertyName("status")]
    public required string Status { get; init; }
}

public record AvailableCommandsUpdate : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("availableCommands")]
    public required AvailableCommand[] AvailableCommands { get; init; }
}

public record AvailableCommand
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("description")]
    public required string Description { get; init; }

    [JsonPropertyName("input")]
    public AvailableCommandInput? Input { get; init; }
}

[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(UnstructuredCommandInput), "unstructured")]
public abstract record AvailableCommandInput
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

public record UnstructuredCommandInput : AvailableCommandInput
{
    [JsonPropertyName("hint")]
    public required string Hint { get; init; }
}

public record CurrentModeUpdate : SessionUpdate
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("currentModeId")]
    public required string CurrentModeId { get; init; }
}

/// <summary>
/// Tool call status values.
/// </summary>
public static class ToolCallStatus
{
    public const string Pending = "pending";
    public const string InProgress = "in_progress";
    public const string Completed = "completed";
    public const string Failed = "failed";
}

/// <summary>
/// Tool kinds.
/// </summary>
public static class ToolKind
{
    public const string Read = "read";
    public const string Edit = "edit";
    public const string Delete = "delete";
    public const string Move = "move";
    public const string Search = "search";
    public const string Execute = "execute";
    public const string Think = "think";
    public const string Fetch = "fetch";
    public const string SwitchMode = "switch_mode";
    public const string Other = "other";
}

/// <summary>
/// Tool call location.
/// </summary>
public record ToolCallLocation
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("path")]
    public required string Path { get; init; }

    [JsonPropertyName("line")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public uint? Line { get; init; }
}

/// <summary>
/// Plan entry priority values.
/// </summary>
public static class PlanEntryPriority
{
    public const string High = "high";
    public const string Medium = "medium";
    public const string Low = "low";
}

/// <summary>
/// Plan entry status values.
/// </summary>
public static class PlanEntryStatus
{
    public const string Pending = "pending";
    public const string InProgress = "in_progress";
    public const string Completed = "completed";
}

/// <summary>
/// Tool call content types.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "type")]
[JsonDerivedType(typeof(Content), "content")]
[JsonDerivedType(typeof(Diff), "diff")]
[JsonDerivedType(typeof(Terminal), "terminal")]
public abstract record ToolCallContent;

/// <summary>
/// Diff representing file modifications.
/// </summary>
public record Diff : ToolCallContent
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("path")]
    public required string Path { get; init; }

    [JsonPropertyName("oldText")]
    public string? OldText { get; init; }

    [JsonPropertyName("newText")]
    public required string NewText { get; init; }
}
