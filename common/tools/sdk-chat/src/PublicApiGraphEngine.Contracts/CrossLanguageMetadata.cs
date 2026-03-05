// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using System.Text.Json.Serialization;

namespace PublicApiGraphEngine.Contracts;

public sealed record CrossLanguageMap
{
    public required string PackageId { get; init; }
    public required IReadOnlyDictionary<string, string> Ids { get; init; }
}

public static class CrossLanguageMetadata
{
    public static CrossLanguageMap? Load(string filePath)
    {
        if (string.IsNullOrWhiteSpace(filePath) || !File.Exists(filePath))
        {
            return null;
        }

        var json = File.ReadAllText(filePath);
        var model = JsonSerializer.Deserialize(json, CrossLanguageJsonContext.Default.CrossLanguageMetadataFile);
        if (model?.PackageId is null || model.Ids is null)
        {
            return null;
        }

        return new CrossLanguageMap
        {
            PackageId = model.PackageId,
            Ids = model.Ids,
        };
    }

    internal sealed record CrossLanguageMetadataFile
    {
        [JsonPropertyName("packageId")]
        public string? PackageId { get; init; }

        [JsonPropertyName("ids")]
        public Dictionary<string, string>? Ids { get; init; }
    }
}

[JsonSerializable(typeof(CrossLanguageMetadata.CrossLanguageMetadataFile))]
internal sealed partial class CrossLanguageJsonContext : JsonSerializerContext;

