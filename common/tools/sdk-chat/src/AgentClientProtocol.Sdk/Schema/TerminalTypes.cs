// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace AgentClientProtocol.Sdk.Schema;

/// <summary>
/// Request to create a terminal.
/// </summary>
public record CreateTerminalRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("command")]
    public required string Command { get; init; }

    [JsonPropertyName("args")]
    public string[]? Args { get; init; }

    [JsonPropertyName("cwd")]
    public string? Cwd { get; init; }

    [JsonPropertyName("env")]
    public EnvVariable[]? Env { get; init; }

    [JsonPropertyName("outputByteLimit")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public ulong? OutputByteLimit { get; init; }
}

/// <summary>
/// Response to create terminal request.
/// </summary>
public record CreateTerminalResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}

/// <summary>
/// Request to get terminal output.
/// </summary>
public record TerminalOutputRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}

/// <summary>
/// Response with terminal output.
/// </summary>
public record TerminalOutputResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("output")]
    public required string Output { get; init; }

    [JsonPropertyName("truncated")]
    public required bool Truncated { get; init; }

    [JsonPropertyName("exitStatus")]
    public TerminalExitStatus? ExitStatus { get; init; }
}

/// <summary>
/// Request to release a terminal.
/// </summary>
public record ReleaseTerminalRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}

/// <summary>
/// Response to release terminal request.
/// </summary>
public record ReleaseTerminalResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Request to wait for terminal exit.
/// </summary>
public record WaitForTerminalExitRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}

/// <summary>
/// Response with terminal exit status.
/// </summary>
public record WaitForTerminalExitResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("exitStatus")]
    public required TerminalExitStatus ExitStatus { get; init; }
}

/// <summary>
/// Request to kill a terminal command.
/// </summary>
public record KillTerminalCommandRequest
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("sessionId")]
    public required string SessionId { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}

/// <summary>
/// Response to kill terminal command request.
/// </summary>
public record KillTerminalCommandResponse
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }
}

/// <summary>
/// Terminal exit status.
/// </summary>
public record TerminalExitStatus
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("exitCode")]
    public int? ExitCode { get; init; }

    [JsonPropertyName("signal")]
    public string? Signal { get; init; }
}

/// <summary>
/// Terminal embed reference.
/// </summary>
public record Terminal : ToolCallContent
{
    [JsonPropertyName("_meta")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public Dictionary<string, object>? Meta { get; init; }

    [JsonPropertyName("terminalId")]
    public required string TerminalId { get; init; }
}
