// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Centralized source-generated JSON serializer context for all Public API Graph Engines.
/// Provides AOT-compatible, reflection-free JSON serialization with improved performance.
///
/// This context consolidates all engine DTOs to:
/// - Eliminate duplicate source generator passes across engine projects
/// - Provide consistent JSON handling across all languages
/// - Enable zero-suppression AOT compliance
///
/// Usage:
///   JsonSerializer.Serialize(index, EngineJsonContext.Default.UsageResult);
///   JsonSerializer.Deserialize(json, EngineJsonContext.Default.UsageResult);
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNameCaseInsensitive = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    WriteIndented = false)]

// Usage analyzer DTOs - shared across all language engines
[JsonSerializable(typeof(UsageResult))]
[JsonSerializable(typeof(CoveredOp))]
[JsonSerializable(typeof(UncoveredOp))]
[JsonSerializable(typeof(List<CoveredOp>))]
[JsonSerializable(typeof(List<UncoveredOp>))]
[JsonSerializable(typeof(List<string>))]

public partial class EngineJsonContext : JsonSerializerContext
{
    private static EngineJsonContext? _indented;

    /// <summary>Context configured for indented (pretty) output.</summary>
    public static EngineJsonContext Indented => _indented ??= new EngineJsonContext(
        new JsonSerializerOptions(Default.Options) { WriteIndented = true });
}

#region Usage Analyzer DTOs

/// <summary>
/// Result from usage analysis scripts (Python/Go/Java/TypeScript).
/// Matches JSON output from graph_api.py, graph_api.go, etc.
/// </summary>
public sealed record UsageResult(
    [property: JsonPropertyName("fileCount")] int FileCount,
    [property: JsonPropertyName("covered")] List<CoveredOp>? Covered,
    [property: JsonPropertyName("uncovered")] List<UncoveredOp>? Uncovered,
    [property: JsonPropertyName("patterns")] List<string>? Patterns
);

/// <summary>
/// A covered (used) API operation found in analyzed code.
/// </summary>
public sealed record CoveredOp(
    [property: JsonPropertyName("client")] string? Client,
    [property: JsonPropertyName("method")] string? Method,
    [property: JsonPropertyName("file")] string? File,
    [property: JsonPropertyName("line")] int Line
);

/// <summary>
/// An uncovered (unused) API operation from the SDK.
/// </summary>
public sealed record UncoveredOp(
    [property: JsonPropertyName("client")] string? Client,
    [property: JsonPropertyName("method")] string? Method,
    [property: JsonPropertyName("sig")] string? Sig
);

#endregion
