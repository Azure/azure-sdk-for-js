// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using PublicApiGraphEngine.Contracts;
using PublicApiGraphEngine.Python;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services.Languages.Samples;

public sealed class PythonSampleLanguageContext : SampleLanguageContext, IDisposable
{
    private readonly PythonUsageAnalyzer _usageAnalyzer = new();
    private readonly EngineCache<ApiIndex> _cache = new(
        async (path, ct) => (ApiIndex?)await new PythonPublicApiGraphEngine().GraphAsync(path, ct: ct), [".py"]);

    public PythonSampleLanguageContext(FileHelper fileHelper) : base(fileHelper) { }

    /// <inheritdoc />
    public void Dispose() => _cache.Dispose();

    public override SdkLanguage Language => SdkLanguage.Python;

    protected override string[] DefaultIncludeExtensions => new[] { ".py" };

    protected override string[] DefaultExcludePatterns => new[]
    {
        "**/__pycache__/**",
        "**/.*",
        "**/venv/**",
        "**/.venv/**",
        "**/*_test.py",
        "**/test_*.py"
    };

    protected override int GetPriority(FileMetadata file)
    {
        var path = file.RelativePath.Replace('\\', '/').ToLowerInvariant();
        var name = Path.GetFileName(file.FilePath).ToLowerInvariant();

        // Deprioritize generated code - load human-written code first
        var isGenerated = path.Contains("/_generated/", StringComparison.Ordinal) ||
                          path.Contains("/generated/", StringComparison.Ordinal) ||
                          name.StartsWith('_');
        var basePriority = isGenerated ? 100 : 0;

        // Within each category, prioritize key files
        if (name.Contains("client", StringComparison.Ordinal)) return basePriority + 1;
        if (name.Contains("_models", StringComparison.Ordinal)) return basePriority + 2;
        if (name.Contains("operations", StringComparison.Ordinal)) return basePriority + 3;
        return basePriority + 10;
    }

    public override string GetInstructions() =>
        "Python 3.9+: type hints, async/await, PEP 8, docstrings, context managers, f-strings.";

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
                "Ensure Python 3 is installed and the path contains valid Python source files.");
        }

        // Validate that we graphed meaningful API surface
        var classCount = apiIndex.Modules.Sum(m => m.Classes?.Count ?? 0);
        var functionCount = apiIndex.Modules.Sum(m => m.Functions?.Count ?? 0);
        if (classCount == 0 && functionCount == 0)
        {
            throw new InvalidOperationException(
                $"No public API surface found in '{sourcePath}'. " +
                "Ensure the path contains Python source files with classes or functions.");
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
            apiSurface = PythonFormatter.FormatWithCoverage(apiIndex, coverage, maxLength);
        }
        else
        {
            apiSurface = PythonFormatter.Format(apiIndex, maxLength);
        }

        yield return $"<api-surface package=\"{apiIndex.Package}\">\n";
        yield return apiSurface;
        yield return "</api-surface>\n";
    }

    private async Task<ApiIndex?> GetOrGraphApiIndexAsync(string sourcePath, CancellationToken ct)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartGraphing("python", sourcePath);
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
