// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Go;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services.Languages.Samples;

public sealed class GoSampleLanguageContext : SampleLanguageContext, IDisposable
{
    private readonly GoUsageAnalyzer _usageAnalyzer = new();
    private readonly EngineCache<ApiIndex> _cache = new(
        async (path, ct) => (ApiIndex?)await new GoPublicApiGraphEngine().GraphAsync(path, ct: ct), [".go"]);

    public GoSampleLanguageContext(FileHelper fileHelper) : base(fileHelper) { }

    /// <inheritdoc />
    public void Dispose() => _cache.Dispose();

    public override SdkLanguage Language => SdkLanguage.Go;

    protected override string[] DefaultIncludeExtensions => new[] { ".go" };

    protected override string[] DefaultExcludePatterns => new[]
    {
        "**/vendor/**",
        "**/*_test.go"
    };

    protected override int GetPriority(FileMetadata file)
    {
        var path = file.RelativePath.Replace('\\', '/').ToLowerInvariant();
        var name = Path.GetFileName(file.FilePath).ToLowerInvariant();

        // Deprioritize generated code - load human-written code first
        // Go SDKs commonly use zz_ prefix for generated files
        var isGenerated = path.Contains("/generated/", StringComparison.Ordinal) ||
                          name.StartsWith("zz_", StringComparison.Ordinal) ||
                          name.Contains("_autorest", StringComparison.Ordinal);
        var basePriority = isGenerated ? 100 : 0;

        // Within each category, prioritize key files
        if (name.Contains("client", StringComparison.Ordinal)) return basePriority + 1;
        if (name.Contains("models", StringComparison.Ordinal)) return basePriority + 2;
        return basePriority + 10;
    }

    public override string GetInstructions() =>
        "Go: package main, explicit error handling, defer cleanup, context.Context, idiomatic.";

    /// <summary>
    /// Analyzes existing code to graph API usage patterns.
    /// </summary>
    public override async Task<UsageIndex?> AnalyzeUsageAsync(
        string sourcePath,
        string codePath,
        CancellationToken ct = default)
    {
        if (!Directory.Exists(codePath))
            return null;

        var apiIndex = await GetOrGraphApiIndexAsync(sourcePath, ct);
        if (apiIndex == null)
            return null;

        return await _usageAnalyzer.AnalyzeAsync(codePath, apiIndex, ct);
    }

    public override string FormatUsage(UsageIndex usage) => _usageAnalyzer.Format(usage);

    /// <summary>
    /// Streams API surface with coverage analysis merged for ~70% token savings.
    /// Shows compact summary of covered operations and full signatures only for uncovered APIs.
    /// </summary>
    public override async IAsyncEnumerable<string> StreamContextAsync(
        string sourcePath,
        string? samplesPath,
        SdkChatConfig? config = null,
        int totalBudget = SampleConstants.DefaultContextCharacters,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        var apiIndex = await GetOrGraphApiIndexAsync(sourcePath, ct);

        if (apiIndex == null)
        {
            throw new InvalidOperationException(
                $"Failed to graph API surface from '{sourcePath}'. " +
                "Ensure Go is installed and the path contains valid Go source files.");
        }

        // Validate that we graphed meaningful API surface
        var structCount = apiIndex.Packages.Sum(p => p.Structs?.Count ?? 0);
        var interfaceCount = apiIndex.Packages.Sum(p => p.Interfaces?.Count ?? 0);
        var functionCount = apiIndex.Packages.Sum(p => p.Functions?.Count ?? 0);
        if (structCount == 0 && interfaceCount == 0 && functionCount == 0)
        {
            throw new InvalidOperationException(
                $"No public API surface found in '{sourcePath}'. " +
                "Ensure the path contains Go source files with exported types or functions.");
        }

        UsageIndex? coverage = null;
        if (!string.IsNullOrEmpty(samplesPath) && Directory.Exists(samplesPath))
        {
            coverage = await _usageAnalyzer.AnalyzeAsync(samplesPath, apiIndex, ct);
        }

        var maxLength = totalBudget - 100;
        string apiSurface;

        if (coverage != null && (coverage.CoveredOperations.Count > 0 || coverage.UncoveredOperations.Count > 0))
        {
            // Use coverage-aware formatting - merged and compact
            apiSurface = GoFormatter.FormatWithCoverage(apiIndex, coverage, maxLength);
        }
        else
        {
            apiSurface = GoFormatter.Format(apiIndex, maxLength);
        }

        yield return $"<api-surface package=\"{apiIndex.Package}\">\n";
        yield return apiSurface;
        yield return "</api-surface>\n";
    }

    private async Task<ApiIndex?> GetOrGraphApiIndexAsync(string sourcePath, CancellationToken ct)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartGraphing("go", sourcePath);
        try
        {
            return await _cache.GraphAsync(sourcePath, ct);
        }
        catch (Exception ex)
        {
            Telemetry.SdkChatTelemetry.RecordError(activity, ex);
            return null;
        }
    }
}
