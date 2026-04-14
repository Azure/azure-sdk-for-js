// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using System.Text;
using PublicApiGraphEngine.Contracts;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services.Languages.Samples;

/// <summary>
/// Provides language-specific behaviors for sample generation.
/// All folder structure is config-driven, not hardcoded.
/// </summary>
public abstract class SampleLanguageContext
{
    protected readonly FileHelper FileHelper;

    protected SampleLanguageContext(FileHelper fileHelper)
    {
        FileHelper = fileHelper;
    }

    /// <summary>The language enum value.</summary>
    public abstract SdkLanguage Language { get; }

    /// <summary>The canonical file extension for samples (including leading period).</summary>
    public virtual string FileExtension => SdkLanguageHelpers.GetFileExtension(Language);

    /// <summary>
    /// Returns language-specific coding conventions for sample generation.
    /// </summary>
    public abstract string GetInstructions();

    /// <summary>
    /// Default include extensions for this language.
    /// </summary>
    protected abstract string[] DefaultIncludeExtensions { get; }

    /// <summary>
    /// Default exclude patterns for this language.
    /// </summary>
    protected abstract string[] DefaultExcludePatterns { get; }

    /// <summary>
    /// Streams context for sample generation without materializing in memory.
    /// This is the FALLBACK implementation used when API graphing is not available.
    /// Loads raw source files with budget management.
    /// Language-specific contexts should call this via base.StreamContextAsync when engine fails.
    /// </summary>
    public virtual async IAsyncEnumerable<string> StreamContextAsync(
        IEnumerable<string> paths,
        SdkChatConfig? config = null,
        int totalBudget = SampleConstants.DefaultContextCharacters,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        if (!paths.Any())
            throw new ArgumentException("At least one path must be provided", nameof(paths));

        // Build source inputs from paths
        var includeExtensions = config?.IncludePatterns is { Length: > 0 }
            ? ExtractExtensions(config.IncludePatterns)
            : DefaultIncludeExtensions;
        var excludePatterns = config?.ExcludePatterns ?? DefaultExcludePatterns;

        List<SourceInputSpec> sourceInputs = [];
        foreach (var path in paths)
        {
            var fullPath = Path.GetFullPath(path.Trim());
            if (Directory.Exists(fullPath))
            {
                sourceInputs.Add(new SourceInputSpec(fullPath, includeExtensions, excludePatterns));
            }
            else if (File.Exists(fullPath))
            {
                sourceInputs.Add(new SourceInputSpec(fullPath));
            }
        }

        if (sourceInputs is [])
            throw new ArgumentException("No valid paths found", nameof(paths));

        var basePath = Path.GetFullPath(paths.First());

        // Create a single group with per-file limit to prevent any single file from consuming the budget
        var group = new SourceInputGroup(
            SectionName: "source-code",
            Inputs: sourceInputs,
            Budget: totalBudget,
            PerFileLimit: SampleConstants.FallbackPerFileLimit,
            PriorityFunc: f => GetPriority(f)
        );

        // Stream content directly without materialization
        await foreach (var chunk in FileHelper.StreamFilesAsync([group], basePath, ct))
        {
            yield return chunk.Content;
        }
    }

    /// <summary>
    /// Priority function - override in subclass for language-specific prioritization.
    /// Lower number = higher priority.
    /// </summary>
    protected virtual int GetPriority(FileMetadata file)
    {
        // Default: all files equal priority
        return 10;
    }

    /// <summary>
    /// Analyzes existing code (samples/tests) to graph API usage patterns.
    /// Override in language-specific contexts for accurate analysis.
    /// Returns null if usage analysis is not supported.
    /// </summary>
    public virtual Task<UsageIndex?> AnalyzeUsageAsync(
        string sourcePath,
        string codePath,
        CancellationToken ct = default)
    {
        // Default: usage analysis not supported
        return Task.FromResult<UsageIndex?>(null);
    }

    /// <summary>
    /// Formats usage analysis as compact context for LLM.
    /// Override in language-specific contexts.
    /// </summary>
    public virtual string FormatUsage(UsageIndex usage)
    {
        // Default simple formatting
        var sb = new StringBuilder();
        sb.AppendLine($"Analyzed {usage.FileCount} files.");

        if (usage.CoveredOperations.Count > 0)
        {
            sb.AppendLine($"Covered: {string.Join(", ", usage.CoveredOperations.Select(o => $"{o.ClientType}.{o.Operation}"))}");
        }

        if (usage.UncoveredOperations.Count > 0)
        {
            sb.AppendLine($"Uncovered: {string.Join(", ", usage.UncoveredOperations.Select(o => $"{o.ClientType}.{o.Operation}"))}");
        }

        return sb.ToString();
    }

    /// <summary>
    /// Streams context for sample generation with optional coverage analysis.
    ///
    /// Language-specific contexts OVERRIDE this to:
    /// 1. Graph API surface using language-specific engines (~70% token savings)
    /// 2. Analyze coverage to show which APIs are already demonstrated
    /// 3. Use FormatWithCoverage for compact, merged output
    ///
    /// If API graphing fails, they call base.StreamContextAsync which falls back to
    /// streaming raw source files and samples.
    /// </summary>
    public virtual async IAsyncEnumerable<string> StreamContextAsync(
        string sourcePath,
        string? samplesPath,
        SdkChatConfig? config = null,
        int totalBudget = SampleConstants.DefaultContextCharacters,
        [EnumeratorCancellation] CancellationToken ct = default)
    {
        // FALLBACK: stream raw source code when API graphing is not available
        await foreach (var chunk in StreamContextAsync([sourcePath], config, totalBudget, ct))
        {
            yield return chunk;
        }

        // Stream existing samples if available (with usage analysis if supported)
        if (!string.IsNullOrEmpty(samplesPath) && Directory.Exists(samplesPath))
        {
            // SAFETY: Use safe enumeration to avoid scanning node_modules, .git, etc.
            var sampleFilesCount = SdkInfo.CountFilesSafely(samplesPath, $"*{FileExtension}");
            if (sampleFilesCount > 0)
            {
                // Try usage analysis first
                var usage = await AnalyzeUsageAsync(sourcePath, samplesPath, ct);

                if (usage != null && usage.CoveredOperations.Count > 0)
                {
                    yield return "\n<existing-coverage>\n";
                    yield return FormatUsage(usage);
                    yield return "</existing-coverage>\n";
                }
                else
                {
                    // Fallback: stream raw samples with smaller per-file limit (samples should be small)
                    var basePath = Path.GetDirectoryName(sourcePath) ?? sourcePath;
                    List<SourceInputGroup> groups =
                    [
                        new(
                            SectionName: "existing-samples",
                            Inputs: [new SourceInputSpec(samplesPath, [FileExtension], SampleConstants.ExistingSamplesExcludePatterns)],
                            PerFileLimit: SampleConstants.FallbackSampleFileLimit
                        )
                    ];

                    await foreach (var chunk in FileHelper.StreamFilesAsync(groups, basePath, ct))
                    {
                        yield return chunk.Content;
                    }
                }
            }
        }
    }

    private static string[] ExtractExtensions(string[] patterns)
    {
        // Extract extensions from patterns like "**/*.cs" -> ".cs"
        return patterns
            .Where(p => p.Contains("*.", StringComparison.Ordinal))
            .Select(p => $".{p.Split("*.").Last().TrimEnd('*', '/')}")
            .Distinct()
            .ToArray();
    }
}
