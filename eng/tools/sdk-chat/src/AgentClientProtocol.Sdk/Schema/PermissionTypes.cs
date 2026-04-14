// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Request permission from user.
/// </summary>
public record RequestPermissionRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("toolCall")]
    public required ToolCallUpdate ToolCall { get; init; }

    [JsonPropertyName("options")]
    public required PermissionOption[] Options { get; init; }
}

/// <summary>
/// Permission option.
/// </summary>
public record PermissionOption
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("optionId")]
    public required string OptionId { get; init; }

    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("kind")]
    public required string Kind { get; init; }
}

/// <summary>
/// Response to permission request.
/// </summary>
public record RequestPermissionResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("outcome")]
    public required RequestPermissionOutcome Outcome { get; init; }
}

/// <summary>
/// Permission outcome.
/// </summary>
[JsonPolymorphic(TypeDiscriminatorPropertyName = "outcome")]
[JsonDerivedType(typeof(SelectedPermissionOutcome), "selected")]
[JsonDerivedType(typeof(CancelledPermissionOutcome), "cancelled")]
public abstract record RequestPermissionOutcome;

public record SelectedPermissionOutcome : RequestPermissionOutcome
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("optionId")]
    public required string OptionId { get; init; }
}

public record CancelledPermissionOutcome : RequestPermissionOutcome
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Permission option kinds.
/// </summary>
public static class PermissionOptionKind
{
    public const string AllowOnce = "allow_once";
    public const string AllowAlways = "allow_always";
    public const string RejectOnce = "reject_once";
    public const string RejectAlways = "reject_always";
}
