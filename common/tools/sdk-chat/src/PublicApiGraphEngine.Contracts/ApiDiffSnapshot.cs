// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// A serializable snapshot of an API surface used as a diff baseline.
/// Implements <see cref="IDiagnosticsSource"/> so it can be passed directly to
/// <see cref="ApiDiffAnalyzer.Compare"/>.
/// </summary>
public sealed record ApiDiffSnapshot : IDiagnosticsSource
{
    [JsonPropertyName("package")]
    public required string Package { get; init; }

    [JsonPropertyName("language")]
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? Language { get; init; }

    [JsonPropertyName("types")]
    public IReadOnlyList<DiagnosticTypeInfo> Types { get; init; } = [];

    [JsonPropertyName("topLevelCallables")]
    public IReadOnlyList<DiagnosticCallableInfo> TopLevelCallables { get; init; } = [];

    IEnumerable<DiagnosticTypeInfo> IDiagnosticsSource.GetDiagnosticTypes() => Types;
    IEnumerable<DiagnosticCallableInfo> IDiagnosticsSource.GetTopLevelCallables() => TopLevelCallables;

    /// <summary>Creates a snapshot from an <see cref="IDiagnosticsSource"/>.</summary>
    public static ApiDiffSnapshot FromSource(
        IDiagnosticsSource source,
        string package,
        string? language = null)
        => new()
        {
            Package = package,
            Language = language,
            Types = [..source.GetDiagnosticTypes()],
            TopLevelCallables = [..source.GetTopLevelCallables()]
        };
}
