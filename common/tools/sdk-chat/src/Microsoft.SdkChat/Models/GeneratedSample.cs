// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics.CodeAnalysis;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Microsoft.SdkChat.Models;

public sealed record GeneratedSample
{
    [JsonPropertyName("name")]
    public required string Name { get; init; }

    [JsonPropertyName("description")]
    public required string Description { get; init; }

    [JsonPropertyName("code")]
    public required string Code { get; init; }

    [JsonPropertyName("filePath")]
    public string? FilePath { get; init; }

    [MemberNotNullWhen(true, nameof(Name), nameof(Code))]
    public bool IsValid => !string.IsNullOrWhiteSpace(Name) && !string.IsNullOrWhiteSpace(Code);
}

/// <summary>
/// Source-generated JSON serialization context for SDK Chat models.
/// Enables AOT-compatible deserialization while preserving type safety.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNameCaseInsensitive = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(GeneratedSample))]
[JsonSerializable(typeof(SdkChatConfig))]
public partial class SdkChatJsonContext : JsonSerializerContext
{
}

/// <summary>
/// Source-generated JSON serialization context for AI streaming models.
/// Enables AOT-compatible deserialization while preserving type safety.
/// </summary>
[JsonSourceGenerationOptions(
    PropertyNameCaseInsensitive = true,
    DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull)]
[JsonSerializable(typeof(GeneratedSample))]
[JsonSerializable(typeof(List<GeneratedSample>))]
public partial class AiStreamingJsonContext : JsonSerializerContext
{
    private static AiStreamingJsonContext? _caseInsensitive;

    /// <summary>Context with case-insensitive property matching.</summary>
    public static AiStreamingJsonContext CaseInsensitive => _caseInsensitive ??= new AiStreamingJsonContext(
        new JsonSerializerOptions(Default.Options) { PropertyNameCaseInsensitive = true });
}
