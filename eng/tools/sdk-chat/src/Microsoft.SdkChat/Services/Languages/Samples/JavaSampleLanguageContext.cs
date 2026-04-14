// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Java;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services.Languages.Samples;

public sealed class JavaSampleLanguageContext : SampleLanguageContext, IDisposable
{
    private readonly JavaUsageAnalyzer _usageAnalyzer = new();
    private readonly EngineCache<ApiIndex> _cache = new(
        async (path, ct) => (ApiIndex?)await new JavaPublicApiGraphEngine().GraphAsync(path, ct: ct), [".java"]);

    public JavaSampleLanguageContext(FileHelper fileHelper) : base(fileHelper) { }

    /// <inheritdoc />
    public void Dispose() => _cache.Dispose();

    public override SdkLanguage Language => SdkLanguage.Java;

    protected override string[] DefaultIncludeExtensions => new[] { ".java" };

    protected override string[] DefaultExcludePatterns => new[]
    {
        "**/target/**",
        "**/build/**",
        "**/*Test.java",
        "**/*Tests.java"
    };

    protected override int GetPriority(FileMetadata file)
    {
        var path = file.RelativePath.Replace('\\', '/').ToLowerInvariant();
        var name = Path.GetFileName(file.FilePath).ToLowerInvariant();

        // Deprioritize generated code - load human-written code first
        var isGenerated = path.Contains("/generated/", StringComparison.Ordinal) ||
                          path.Contains("/implementation/", StringComparison.Ordinal) ||
                          name.Contains("generated", StringComparison.Ordinal);
        var basePriority = isGenerated ? 100 : 0;

        // Within each category, prioritize key files
        if (name.Contains("client", StringComparison.Ordinal)) return basePriority + 1;
        if (name.Contains("builder", StringComparison.Ordinal)) return basePriority + 2;
        if (name.Contains("model", StringComparison.Ordinal)) return basePriority + 3;
        return basePriority + 10;
    }

    public override string GetInstructions() =>
        "Java 17+: try-with-resources, Javadoc, proper exceptions, var where obvious.";

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
                "Ensure JBang is installed and the path contains valid Java source files.");
        }

        // Validate that we graphed meaningful API surface
        var classCount = apiIndex.Packages.Sum(p => p.Classes?.Count ?? 0);
        var interfaceCount = apiIndex.Packages.Sum(p => p.Interfaces?.Count ?? 0);
        var enumCount = apiIndex.Packages.Sum(p => p.Enums?.Count ?? 0);
        if (classCount == 0 && interfaceCount == 0 && enumCount == 0)
        {
            throw new InvalidOperationException(
                $"No public API surface found in '{sourcePath}'. " +
                "Ensure the path contains Java source files with public classes or interfaces.");
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
            apiSurface = JavaFormatter.FormatWithCoverage(apiIndex, coverage, maxLength);
        }
        else
        {
            apiSurface = JavaFormatter.Format(apiIndex, maxLength);
        }

        yield return $"<api-surface package=\"{apiIndex.Package}\">\n";
        yield return apiSurface;
        yield return "</api-surface>\n";
    }

    private async Task<ApiIndex?> GetOrGraphApiIndexAsync(string sourcePath, CancellationToken ct)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartGraphing("java", sourcePath);
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
