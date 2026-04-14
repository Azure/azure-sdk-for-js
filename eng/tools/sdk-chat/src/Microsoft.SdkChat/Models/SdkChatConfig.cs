// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace Microsoft.SdkChat.Models;

public class SdkChatConfig
{
    [JsonPropertyName("language")]
    public string? Language { get; set; }

    [JsonPropertyName("sourceDirectories")]
    public string[]? SourceDirectories { get; set; }

    [JsonPropertyName("excludePatterns")]
    public string[]? ExcludePatterns { get; set; }

    [JsonPropertyName("includePatterns")]
    public string[]? IncludePatterns { get; set; }

    [JsonPropertyName("maxContextBytes")]
    public int? MaxContextBytes { get; set; }

    [JsonPropertyName("model")]
    public string? Model { get; set; }

    [JsonPropertyName("outputDirectory")]
    public string? OutputDirectory { get; set; }
}
