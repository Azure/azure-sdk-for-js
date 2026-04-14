// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// Structured result for MCP tool responses.
/// Enables agents to programmatically parse success/failure and self-heal.
/// </summary>
public sealed record McpToolResult
{
    /// <summary>
    /// Whether the operation succeeded.
    /// </summary>
    [JsonPropertyName("success")]
    public required bool Success { get; init; }

    /// <summary>
    /// Human-readable message describing the result.
    /// </summary>
    [JsonPropertyName("message")]
    public required string Message { get; init; }

    /// <summary>
    /// Error code for programmatic handling (only present on failure).
    /// </summary>
    [JsonPropertyName("errorCode")]
    public string? ErrorCode { get; init; }

    /// <summary>
    /// Detailed error information for debugging (only present on failure).
    /// </summary>
    [JsonPropertyName("error")]
    public ErrorDetails? Error { get; init; }

    /// <summary>
    /// Result data (only present on success).
    /// </summary>
    [JsonPropertyName("data")]
    public ResultData? Data { get; init; }

    /// <summary>
    /// Creates a success result.
    /// </summary>
    public static McpToolResult CreateSuccess(string message, ResultData? data = null) => new()
    {
        Success = true,
        Message = message,
        Data = data
    };

    /// <summary>
    /// Creates a failure result from an exception.
    /// </summary>
    public static McpToolResult CreateFailure(string message, Exception ex, string? errorCode = null) => new()
    {
        Success = false,
        Message = message,
        ErrorCode = errorCode ?? MapExceptionToErrorCode(ex),
        Error = new ErrorDetails
        {
            Type = ex.GetType().Name,
            Message = ex.Message,
            Recoverable = IsRecoverable(ex),
            Suggestions = GetRecoverySuggestions(ex)
        }
    };

    /// <summary>
    /// Creates a failure result without an exception.
    /// </summary>
    public static McpToolResult CreateFailure(string message, string errorCode, string[]? suggestions = null) => new()
    {
        Success = false,
        Message = message,
        ErrorCode = errorCode,
        Error = new ErrorDetails
        {
            Type = "ToolError",
            Message = message,
            Recoverable = true,
            Suggestions = suggestions
        }
    };

    /// <summary>
    /// Serializes to JSON string for MCP response.
    /// </summary>
    public override string ToString() => JsonSerializer.Serialize(this, McpJsonContext.Default.McpToolResult);

    private static string MapExceptionToErrorCode(Exception ex) => ex switch
    {
        OperationCanceledException => "CANCELLED",
        TimeoutException => "TIMEOUT",
        DirectoryNotFoundException => "PATH_NOT_FOUND",
        FileNotFoundException => "FILE_NOT_FOUND",
        UnauthorizedAccessException => "ACCESS_DENIED",
        NotSupportedException => "NOT_SUPPORTED",
        InvalidOperationException => "INVALID_OPERATION",
        ArgumentException => "INVALID_ARGUMENT",
        _ => "INTERNAL_ERROR"
    };

    private static bool IsRecoverable(Exception ex) => ex switch
    {
        OperationCanceledException => true,
        TimeoutException => true,
        DirectoryNotFoundException => true,
        FileNotFoundException => true,
        UnauthorizedAccessException => false,
        NotSupportedException => false,
        _ => true
    };

    private static string[]? GetRecoverySuggestions(Exception ex) => ex switch
    {
        DirectoryNotFoundException => ["Verify the path exists", "Check for typos in the path", "Use absolute paths"],
        FileNotFoundException => ["Verify the file exists", "Check file permissions"],
        OperationCanceledException => ["Retry the operation", "Check if the operation timed out"],
        TimeoutException => ["Retry with a longer timeout", "Check network connectivity"],
        UnauthorizedAccessException => ["Check file/folder permissions", "Run with appropriate privileges"],
        NotSupportedException nsex when nsex.Message.Contains("Language", StringComparison.Ordinal) =>
            ["Supported languages: dotnet, python, java, typescript, javascript, go"],
        _ => null
    };
}

/// <summary>
/// Detailed error information for agent self-healing.
/// </summary>
public sealed record ErrorDetails
{
    /// <summary>
    /// Exception type name.
    /// </summary>
    [JsonPropertyName("type")]
    public required string Type { get; init; }

    /// <summary>
    /// Error message.
    /// </summary>
    [JsonPropertyName("message")]
    public required string Message { get; init; }

    /// <summary>
    /// Whether the error is recoverable by retrying or adjusting parameters.
    /// </summary>
    [JsonPropertyName("recoverable")]
    public bool Recoverable { get; init; }

    /// <summary>
    /// Suggested actions to resolve the error.
    /// </summary>
    [JsonPropertyName("suggestions")]
    public string[]? Suggestions { get; init; }
}

/// <summary>
/// Success result data.
/// </summary>
public sealed record ResultData
{
    /// <summary>
    /// Number of items generated/processed.
    /// </summary>
    [JsonPropertyName("count")]
    public int? Count { get; init; }

    /// <summary>
    /// Output path where results were written.
    /// </summary>
    [JsonPropertyName("outputPath")]
    public string? OutputPath { get; init; }

    /// <summary>
    /// List of generated file paths.
    /// </summary>
    [JsonPropertyName("files")]
    public string[]? Files { get; init; }

    /// <summary>
    /// Detected language of the SDK.
    /// </summary>
    [JsonPropertyName("language")]
    public string? Language { get; init; }
}
