// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// Generic MCP response wrapper for package info operations.
/// </summary>
/// <typeparam name="T">The data type being returned.</typeparam>
internal sealed record McpResponse<T>
{
    public bool Success { get; init; }
    public T? Data { get; init; }
}

/// <summary>
/// Error response for MCP operations.
/// </summary>
internal sealed record McpErrorResponse
{
    public required string Error { get; init; }
    public required string ErrorCode { get; init; }
}

/// <summary>
/// Shared JSON context for all MCP tools.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNamingPolicy = JsonKnownNamingPolicy.CamelCase,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    WriteIndented = false)]
[JsonSerializable(typeof(McpToolResult))]
[JsonSerializable(typeof(ErrorDetails))]
[JsonSerializable(typeof(ResultData))]
[JsonSerializable(typeof(McpErrorResponse))]
[JsonSerializable(typeof(McpResponse<SourceFolderResult>))]
[JsonSerializable(typeof(McpResponse<SamplesFolderResult>))]
[JsonSerializable(typeof(McpResponse<ApiGraphResult>))]
[JsonSerializable(typeof(McpResponse<CoverageAnalysisResult>))]
[JsonSerializable(typeof(McpResponse<SamplesPromptResult>))]
[JsonSerializable(typeof(ValidateSamplesResult))]
[JsonSerializable(typeof(GeneratedSample))]
[JsonSerializable(typeof(List<GeneratedSample>))]
internal sealed partial class McpJsonContext : JsonSerializerContext
{
}
