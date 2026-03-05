// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.DotNet;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services.Languages.Samples;

public sealed class DotNetSampleLanguageContext : SampleLanguageContext, IDisposable
{
    private readonly CSharpUsageAnalyzer _usageAnalyzer = new();
    private readonly EngineCache<ApiIndex> _cache = new(
        async (path, ct) => (ApiIndex?)await new CSharpPublicApiGraphEngine().GraphAsync(path, ct: ct), [".cs"]);

    public DotNetSampleLanguageContext(FileHelper fileHelper) : base(fileHelper) { }

    /// <inheritdoc />
    public void Dispose() => _cache.Dispose();

    public override SdkLanguage Language => SdkLanguage.DotNet;

    protected override string[] DefaultIncludeExtensions => [".cs"];

    protected override string[] DefaultExcludePatterns =>
    [
        "**/obj/**",
        "**/bin/**",
        "**/*.Designer.cs",
        "**/AssemblyInfo.cs"
    ];

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

        // Validate that we graphed meaningful API surface
        var typeCount = apiIndex.Namespaces.Sum(ns => ns.Types.Count);
        if (typeCount == 0)
        {
            throw new InvalidOperationException(
                $"No public API surface found in '{sourcePath}'. " +
                "Ensure the path contains C# source files with public types and the SDK is built correctly.");
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
            apiSurface = CSharpFormatter.FormatWithCoverage(apiIndex, coverage, maxLength);
        }
        else
        {
            apiSurface = CSharpFormatter.Format(apiIndex, maxLength);
        }

        yield return $"<api-surface package=\"{apiIndex.Package}\">\n";
        yield return apiSurface;
        yield return "</api-surface>\n";
    }

    /// <summary>
    /// Analyzes existing code (samples/tests) to graph API usage patterns.
    /// Returns structured coverage info instead of raw code - ~95% token reduction.
    /// </summary>
    public override async Task<UsageIndex?> AnalyzeUsageAsync(
        string sourcePath,
        string codePath,
        CancellationToken ct = default)
    {
        if (!Directory.Exists(codePath))
            return null;

        // Get API index (may be cached from StreamContextAsync)
        var apiIndex = await GetOrGraphApiIndexAsync(sourcePath, ct);

        // Analyze usage
        return await _usageAnalyzer.AnalyzeAsync(codePath, apiIndex, ct);
    }

    /// <summary>
    /// Formats usage analysis as compact context for LLM.
    /// </summary>
    public override string FormatUsage(UsageIndex usage) => _usageAnalyzer.Format(usage);

    /// <summary>
    /// Gets cached API index or graphs it.
    /// </summary>
    private async Task<ApiIndex> GetOrGraphApiIndexAsync(string sourcePath, CancellationToken ct)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartGraphing("dotnet", sourcePath);
        return await _cache.GraphAsync(sourcePath, ct)
            ?? throw new InvalidOperationException($"Failed to graph API surface from '{sourcePath}'.");
    }

    protected override int GetPriority(FileMetadata file)
    {
        var path = file.RelativePath.Replace('\\', '/').ToLowerInvariant();
        var name = Path.GetFileNameWithoutExtension(file.FilePath).ToLowerInvariant();

        // Deprioritize generated code - load human-written code first
        var isGenerated = path.Contains("/generated/", StringComparison.Ordinal) ||
                          name.EndsWith(".g", StringComparison.Ordinal) ||
                          name.Contains("generated", StringComparison.Ordinal);
        var basePriority = isGenerated ? 100 : 0;

        // Within each category, prioritize key files
        if (name.Contains("client", StringComparison.Ordinal)) return basePriority + 1;
        if (name.Contains("options", StringComparison.Ordinal)) return basePriority + 2;
        if (name.Contains("model", StringComparison.Ordinal)) return basePriority + 3;
        return basePriority + 10;
    }

    public override string GetInstructions() =>
        "C#: file-scoped namespaces, var, async/await, using statements, try/catch, .NET 8+.";
}
