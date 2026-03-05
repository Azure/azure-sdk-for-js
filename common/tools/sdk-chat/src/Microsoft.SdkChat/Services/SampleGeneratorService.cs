// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services.Languages.Samples;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Options for sample generation.
/// </summary>
public sealed record SampleGenerationOptions
{
    /// <summary>Absolute path to SDK root.</summary>
    public required string PackagePath { get; init; }

    /// <summary>Where to write samples. If null, auto-detected.</summary>
    public string? OutputPath { get; init; }

    /// <summary>Custom prompt to guide generation.</summary>
    public string? Prompt { get; init; }

    /// <summary>Number of samples to generate. Default: 5.</summary>
    public int Count { get; init; } = 5;

    /// <summary>Max context characters. Default: 512K.</summary>
    public int Budget { get; init; } = SampleConstants.DefaultContextCharacters;

    /// <summary>AI model override.</summary>
    public string? Model { get; init; }

    /// <summary>Force language instead of auto-detection.</summary>
    public string? Language { get; init; }

    /// <summary>If true, don't write files.</summary>
    public bool DryRun { get; init; }
}

/// <summary>
/// Result of sample generation.
/// </summary>
public sealed record SampleGenerationResult
{
    public bool Success { get; init; }
    public string? ErrorMessage { get; init; }
    public string? ErrorCode { get; init; }
    public int Count { get; init; }
    public string? OutputPath { get; init; }
    public string[] GeneratedFiles { get; init; } = [];
    public string[] FailedFiles { get; init; } = [];
    public string? Language { get; init; }
    public int PromptTokens { get; init; }
    public int ResponseTokens { get; init; }
    public TimeSpan Duration { get; init; }
}

/// <summary>
/// Progress callback for sample generation.
/// </summary>
public interface ISampleGenerationProgress
{
    /// <summary>Called when SDK is scanned.</summary>
    void OnSdkScanned(SourceFolderResult sourceInfo, SamplesFolderResult samplesInfo, int existingSampleCount);

    /// <summary>Called when prompt is ready to send.</summary>
    void OnPromptReady(int estimatedTokens);

    /// <summary>Called when a sample is generated.</summary>
    void OnSampleGenerated(GeneratedSample sample, string filePath);

    /// <summary>Called when generation completes.</summary>
    void OnComplete(int responseTokens, TimeSpan duration);
}

/// <summary>
/// Core service for generating SDK samples using AI.
/// Shared between CLI, MCP, and ACP interfaces.
/// </summary>
public class SampleGeneratorService(
    IAiService aiService,
    FileHelper fileHelper,
    IPackageInfoService? packageInfoService = null)
{
    private readonly IPackageInfoService _packageInfoService = packageInfoService ?? new PackageInfoService();

    /// <summary>
    /// Generate samples for an SDK package.
    /// </summary>
    public async Task<SampleGenerationResult> GenerateAsync(
        SampleGenerationOptions options,
        ISampleGenerationProgress? progress = null,
        CancellationToken cancellationToken = default)
    {
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();
        var promptTokens = 0;
        var responseTokens = 0;
        TimeSpan? generationDuration = null;

        try
        {
            var packagePath = Path.GetFullPath(options.PackagePath);
            if (!Directory.Exists(packagePath))
            {
                return new SampleGenerationResult
                {
                    Success = false,
                    ErrorMessage = $"SDK path does not exist: {packagePath}",
                    ErrorCode = "PATH_NOT_FOUND"
                };
            }

            // Use PackageInfoService for detection
            var sourceResult = await _packageInfoService.DetectSourceFolderAsync(packagePath, options.Language, cancellationToken).ConfigureAwait(false);
            var samplesResult = await _packageInfoService.DetectSamplesFolderAsync(packagePath, cancellationToken).ConfigureAwait(false);

            // Determine language
            SdkLanguage? effectiveLanguage = null;
            if (!string.IsNullOrEmpty(sourceResult.Language))
            {
                effectiveLanguage = SdkLanguageHelpers.Parse(sourceResult.Language);
                if (effectiveLanguage == SdkLanguage.Unknown)
                    effectiveLanguage = null;
            }

            if (effectiveLanguage == null)
            {
                return new SampleGenerationResult
                {
                    Success = false,
                    ErrorMessage = "Could not detect package language.",
                    ErrorCode = "LANGUAGE_DETECTION_FAILED"
                };
            }

            // Count existing samples
            var context = CreateLanguageContext(effectiveLanguage.Value);
            var existingSampleCount = samplesResult.SamplesFolder is not null && Directory.Exists(samplesResult.SamplesFolder)
                ? SdkInfo.CountFilesSafely(samplesResult.SamplesFolder, $"*{context.FileExtension}")
                : 0;

            progress?.OnSdkScanned(sourceResult, samplesResult, existingSampleCount);

            // Determine output path — always normalize to absolute for containment checks
            var outputPath = Path.GetFullPath(options.OutputPath ?? samplesResult.SuggestedSamplesFolder);

            // Callbacks for AI service
            ValueTask OnPromptReadyAsync(AiPromptReadyEventArgs e)
            {
                promptTokens = e.EstimatedTokens;
                progress?.OnPromptReady(e.EstimatedTokens);
                return ValueTask.CompletedTask;
            }

            ValueTask OnStreamCompleteAsync(AiStreamCompleteEventArgs e)
            {
                responseTokens = e.EstimatedResponseTokens;
                generationDuration = e.Duration;
                return ValueTask.CompletedTask;
            }

            // Build prompts
            var sdkName = sourceResult.SdkName ?? Path.GetFileName(packagePath);
            var systemPrompt = BuildSystemPrompt(context, sdkName, options.Count);
            var userPromptStream = StreamUserPromptAsync(
                options.Prompt,
                options.Count,
                existingSampleCount > 0,
                sourceResult.SourceFolder ?? packagePath,
                samplesResult.SamplesFolder,
                outputPath,
                context,
                options.Budget,
                cancellationToken);

            // Generate samples
            List<GeneratedSample> samples = [];
            List<string> generatedFiles = [];
            List<string> failedFiles = [];

            await foreach (var sample in aiService.StreamItemsAsync(
                systemPrompt,
                userPromptStream,
                AiStreamingJsonContext.CaseInsensitive.GeneratedSample,
                options.Model,
                contextInfo: null,
                onPromptReady: OnPromptReadyAsync,
                onStreamComplete: OnStreamCompleteAsync,
                cancellationToken: cancellationToken))
            {
                if (!string.IsNullOrEmpty(sample.Name) && !string.IsNullOrEmpty(sample.Code))
                {
                    samples.Add(sample);

                    // Calculate file path
                    var relativePath = !string.IsNullOrEmpty(sample.FilePath)
                        ? PathSanitizer.SanitizeFilePath(sample.FilePath, context.FileExtension)
                        : PathSanitizer.SanitizeFileName(sample.Name) + context.FileExtension;
                    var filePath = Path.GetFullPath(Path.Combine(outputPath, relativePath));

                    // Security: ensure path stays within output directory.
                    // Use normalized outputPath (already via GetFullPath above) with both
                    // separator chars to prevent bypass on Windows where / and \ are both valid.
                    var normalizedOutput = outputPath.TrimEnd(Path.DirectorySeparatorChar, Path.AltDirectorySeparatorChar);
                    var normalizedFile = filePath;
                    if (!normalizedFile.StartsWith(normalizedOutput + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase)
                        && !normalizedFile.Equals(normalizedOutput, StringComparison.OrdinalIgnoreCase))
                    {
                        continue;
                    }

                    progress?.OnSampleGenerated(sample, filePath);

                    // Write file unless dry run — isolate IO failures so one bad write
                    // doesn't destroy already-generated samples.
                    if (!options.DryRun)
                    {
                        try
                        {
                            var fileDir = Path.GetDirectoryName(filePath);
                            if (!string.IsNullOrEmpty(fileDir))
                            {
                                Directory.CreateDirectory(fileDir);
                            }
                            await File.WriteAllTextAsync(filePath, sample.Code, cancellationToken).ConfigureAwait(false);
                            generatedFiles.Add(filePath);
                        }
                        catch (OperationCanceledException)
                        {
                            throw; // Propagate cancellation
                        }
                        catch (Exception ex)
                        {
                            // Log the root cause so users get actionable info (permissions, disk full, path too long)
                            System.Diagnostics.Trace.TraceWarning(
                                "Failed to write sample file '{0}': {1}", filePath, ex.Message);
                            failedFiles.Add(filePath);
                        }
                    }
                    else
                    {
                        generatedFiles.Add(filePath);
                    }
                }
            }

            stopwatch.Stop();
            var duration = generationDuration ?? stopwatch.Elapsed;

            progress?.OnComplete(responseTokens, duration);

            return new SampleGenerationResult
            {
                Success = generatedFiles.Count > 0 || (options.DryRun && samples.Count > 0),
                ErrorMessage = failedFiles.Count > 0 ? $"Failed to write {failedFiles.Count} file(s)." : null,
                ErrorCode = failedFiles.Count > 0 ? "PARTIAL_FAILURE" : null,
                Count = samples.Count,
                OutputPath = outputPath,
                GeneratedFiles = [.. generatedFiles],
                FailedFiles = [.. failedFiles],
                Language = effectiveLanguage.Value.ToString(),
                PromptTokens = promptTokens,
                ResponseTokens = responseTokens,
                Duration = duration
            };
        }
        catch (Exception ex)
        {
            return new SampleGenerationResult
            {
                Success = false,
                ErrorMessage = ex.Message,
                ErrorCode = ex is OperationCanceledException ? "CANCELLED" : "GENERATION_FAILED"
            };
        }
    }

    private SampleLanguageContext CreateLanguageContext(SdkLanguage language) => CreateLanguageContextForLanguage(language, fileHelper);

    /// <summary>
    /// Creates a language context for the specified SDK language.
    /// Shared between SampleGeneratorService and SamplesMcpTools.
    /// </summary>
    internal static SampleLanguageContext CreateLanguageContextForLanguage(SdkLanguage language, FileHelper fileHelper) => language switch
    {
        SdkLanguage.DotNet => new DotNetSampleLanguageContext(fileHelper),
        SdkLanguage.Python => new PythonSampleLanguageContext(fileHelper),
        SdkLanguage.JavaScript => new JavaScriptSampleLanguageContext(fileHelper),
        SdkLanguage.TypeScript => new TypeScriptSampleLanguageContext(fileHelper),
        SdkLanguage.Java => new JavaSampleLanguageContext(fileHelper),
        SdkLanguage.Go => new GoSampleLanguageContext(fileHelper),
        _ => throw new NotSupportedException($"Language {language} not supported")
    };

    internal static string BuildSystemPrompt(SampleLanguageContext context, string sdkName, int count) =>
        $"Generate {count} runnable SDK samples for the '{sdkName}' SDK. {context.GetInstructions()}";

    internal static string GetUserPromptPrefix(string? customPrompt, int count, bool hasExistingSamples)
    {
        if (!string.IsNullOrEmpty(customPrompt))
        {
            var dupeWarning = hasExistingSamples ? " Avoid duplicating <existing-samples>." : "";
            return $"{customPrompt}{dupeWarning} Generate {count} samples.\n\n";
        }

        return hasExistingSamples
            ? $"Generate {count} NEW samples for uncovered APIs. Avoid duplicating <existing-samples>.\n\n"
            : $"Generate {count} samples covering: init/auth, CRUD, async, error handling, advanced features.\n\n";
    }

    private static async IAsyncEnumerable<string> StreamUserPromptAsync(
        string? customPrompt,
        int count,
        bool hasExistingSamples,
        string sourceFolder,
        string? samplesFolder,
        string outputFolder,
        SampleLanguageContext context,
        int budget,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        const int OverheadReserve = 500;
        var budgetTracker = new PromptBudgetTracker(budget, OverheadReserve);

        // Yield prefix
        var prefix = GetUserPromptPrefix(customPrompt, count, hasExistingSamples);
        budgetTracker.TryConsume(prefix.Length);
        yield return prefix;

        // Output folder context
        var outputFolderTag = $"<output-folder>{Path.GetFileName(outputFolder)}</output-folder>\n";
        var outputInstruction = "Generate filePath relative to the output folder above.\n\n";
        budgetTracker.TryConsume(outputFolderTag.Length + outputInstruction.Length);
        yield return outputFolderTag;
        yield return outputInstruction;

        // Include example sample if available
        if (!string.IsNullOrEmpty(samplesFolder) && Directory.Exists(samplesFolder) && !budgetTracker.IsExhausted)
        {
            var exampleFile = SdkInfo.EnumerateFilesSafely(samplesFolder, $"*{context.FileExtension}", maxFiles: 100)
                .FirstOrDefault();
            if (exampleFile != null)
            {
                var relativePath = Path.GetRelativePath(samplesFolder, exampleFile);
                var content = await File.ReadAllTextAsync(exampleFile, cancellationToken);

                var exampleBudget = Math.Min(5000, budgetTracker.Remaining / 2);
                if (exampleBudget > 500)
                {
                    var maxContentLength = exampleBudget - 200;
                    if (content.Length > maxContentLength)
                    {
                        content = content[..maxContentLength] + "\n// ... (truncated)";
                    }

                    var exampleXml = $"<example-sample>\n<filePath>{relativePath}</filePath>\n<code>\n{content}\n</code>\n</example-sample>\n";
                    var instruction = "Follow this exact structure and style for new samples.\n\n";

                    budgetTracker.TryConsume(exampleXml.Length + instruction.Length);
                    yield return exampleXml;
                    yield return instruction;
                }
            }
        }

        // Stream source context
        if (budgetTracker.Remaining > 0)
        {
            // Use the coverage-aware streaming that includes API graphing and samples analysis
            // This provides ~70% token reduction vs raw source
            await foreach (var chunk in context.StreamContextAsync(
                sourcePath: sourceFolder,
                samplesPath: samplesFolder,
                config: null,
                totalBudget: budgetTracker.Remaining,
                ct: cancellationToken))
            {
                yield return chunk;
            }
        }
    }
}
