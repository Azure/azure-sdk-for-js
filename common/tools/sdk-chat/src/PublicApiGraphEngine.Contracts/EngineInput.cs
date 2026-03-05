// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Typed discriminated union that describes the input to a Public API Graph Engine.
/// Each case carries exactly the information its engine needs, making invalid combinations
/// a compile-time error instead of a silent runtime mismatch.
/// </summary>
public abstract record EngineInput
{
    private EngineInput() { }

    /// <summary>A plain source directory with no specific build marker.</summary>
    public sealed record SourceDirectory(string Path) : EngineInput;

    /// <summary>.NET: an explicit .csproj file for compiled artifact analysis.</summary>
    public sealed record DotNetProject(string CsprojPath) : EngineInput;

    /// <summary>Java Maven: an explicit pom.xml for compiled artifact analysis.</summary>
    public sealed record JavaMavenProject(string PomPath) : EngineInput;

    /// <summary>Java Gradle: an explicit build.gradle or build.gradle.kts for compiled artifact analysis.</summary>
    public sealed record JavaGradleProject(string GradlePath) : EngineInput;

    /// <summary>
    /// TypeScript: an explicit tsconfig.json and/or package.json for declaration-file analysis.
    /// At least one of the paths must be non-null.
    /// </summary>
    public sealed record TypeScriptProject : EngineInput
    {
        public string? TsconfigPath { get; }
        public string? PackageJsonPath { get; }

        public TypeScriptProject(string? tsconfigPath, string? packageJsonPath = null)
        {
            if (string.IsNullOrWhiteSpace(tsconfigPath) && string.IsNullOrWhiteSpace(packageJsonPath))
                throw new ArgumentException("At least one of tsconfigPath or packageJsonPath must be non-null.");
            TsconfigPath = tsconfigPath;
            PackageJsonPath = packageJsonPath;
        }
    };

    /// <summary>
    /// Python: an importable package name (for runtime inspection), with an optional source directory fallback.
    /// When <see cref="AllowRootPathImport"/> is <see langword="true"/>, the engine also checks whether
    /// the package can be imported from the source fallback path directory itself.
    /// </summary>
    /// <param name="ImportName">Dotted Python import name (e.g. "azure.storage.blob").</param>
    /// <param name="SourceFallbackPath">Source directory for AST fallback. Required for <see cref="RootDirectory"/> access.</param>
    /// <param name="AllowRootPathImport">When true, adds SourceFallbackPath to PYTHONPATH for import probing.</param>
    public sealed record PythonPackage(
        string ImportName,
        string? SourceFallbackPath = null,
        bool AllowRootPathImport = false) : EngineInput
    {
        /// <summary>
        /// Validates that <see cref="SourceFallbackPath"/> is present when callers need a root directory.
        /// </summary>
        internal string GetSourceFallbackPathOrThrow()
            => SourceFallbackPath
               ?? throw new InvalidOperationException(
                   $"PythonPackage('{ImportName}') requires SourceFallbackPath to derive a root directory. " +
                   "Provide a source fallback path or use SourceDirectory instead.");
    }

    /// <summary>
    /// Gets the root source directory that best represents this input.
    /// Used for cache keys, telemetry, and source-fallback paths.
    /// </summary>
    public string RootDirectory => this switch
    {
        SourceDirectory d => d.Path,
        DotNetProject p => System.IO.Path.GetDirectoryName(System.IO.Path.GetFullPath(p.CsprojPath))
            ?? throw new InvalidOperationException($"Cannot determine directory for csproj: {p.CsprojPath}"),
        JavaMavenProject p => System.IO.Path.GetDirectoryName(System.IO.Path.GetFullPath(p.PomPath))
            ?? throw new InvalidOperationException($"Cannot determine directory for pom: {p.PomPath}"),
        JavaGradleProject p => System.IO.Path.GetDirectoryName(System.IO.Path.GetFullPath(p.GradlePath))
            ?? throw new InvalidOperationException($"Cannot determine directory for gradle: {p.GradlePath}"),
        TypeScriptProject p => System.IO.Path.GetDirectoryName(
            System.IO.Path.GetFullPath((p.TsconfigPath ?? p.PackageJsonPath)!))
            ?? throw new InvalidOperationException($"Cannot determine directory for TypeScript project: {p.TsconfigPath ?? p.PackageJsonPath}"),
        PythonPackage p => p.GetSourceFallbackPathOrThrow(),
        _ => throw new System.Diagnostics.UnreachableException(),
    };
}
