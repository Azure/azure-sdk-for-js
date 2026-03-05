// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Optional artifact inputs for language-specific compiled analysis paths.
/// </summary>
public sealed record ArtifactOptions
{
    public string? CsprojPath { get; init; }
    public string? TsconfigPath { get; init; }
    public string? PackageJsonPath { get; init; }
    public string? PomPath { get; init; }
    public string? GradlePath { get; init; }
    public string? ImportName { get; init; }
}
