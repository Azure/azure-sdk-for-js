// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Diagnostics;
using System.Runtime.CompilerServices;
using Microsoft.Extensions.Logging;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Services.Languages.Samples;

namespace Microsoft.SdkChat.Tools.Package.Samples;

public class SampleGeneratorTool
{
    private readonly IAiService _aiService;
    private readonly FileHelper _fileHelper;

    public SampleGeneratorTool(
        IAiService aiService,
        FileHelper fileHelper,
        ILogger<SampleGeneratorTool> logger)
    {
        _aiService = aiService;
        _fileHelper = fileHelper;
        // logger available for future debugging if needed
    }

    public async Task<int> ExecuteAsync(
        string sdkPath,
        string? outputPath,
        string? language,
        string? prompt,
        int? count,
        int? budget,
        string? model,
        bool dryRun,
        CancellationToken cancellationToken = default)
    {
        using var activity = Telemetry.SdkChatTelemetry.StartSampleGeneration(sdkPath, language);
        var totalStopwatch = Stopwatch.StartNew();

        sdkPath = Path.GetFullPath(sdkPath);
        if (!Directory.Exists(sdkPath))
        {
            ConsoleUx.Error($"SDK path does not exist: {sdkPath}");
            return 1;
        }

        Console.WriteLine();

        // Auto-detect source and samples folders with spinner
        var scanStopwatch = Stopwatch.StartNew();
        var sdkInfo = await ConsoleUx.SpinnerAsync("Scanning SDK...", async () =>
        {
            await Task.Yield(); // Allow spinner to start
            return SdkInfo.Scan(sdkPath);
        }, cancellationToken);
        scanStopwatch.Stop();

        // Existing samples are always read from the SDK's detected samples folder (for context)
        // Output is written to the user-specified path or the SDK's samples folder
        var existingSamplesPath = sdkInfo.SamplesFolder;
        // SAFETY: Use safe enumeration to avoid scanning node_modules, .git, etc.
        var existingCount = existingSamplesPath is not null && Directory.Exists(existingSamplesPath)
            ? SdkInfo.CountFilesSafely(existingSamplesPath, $"*{sdkInfo.FileExtension ?? ".*"}")
            : 0;

        ConsoleUx.Info($"Detected {ConsoleUx.Bold(sdkInfo.LanguageName ?? "unknown")} SDK");
        ConsoleUx.Info($"Source: {sdkInfo.SourceFolder}");
        if (existingCount > 0)
            ConsoleUx.Info($"Existing samples: {existingCount}");

        // Detect or parse language
        SdkLanguage? detectedLanguage;
        if (!string.IsNullOrEmpty(language))
        {
            detectedLanguage = SdkLanguageHelpers.Parse(language);
            if (detectedLanguage == SdkLanguage.Unknown)
                detectedLanguage = null;
        }
        else
        {
            detectedLanguage = sdkInfo.Language;
        }

        if (detectedLanguage is null)
        {
            ConsoleUx.Error("Could not detect language. Use --language to specify.");
            return 1;
        }

        // Load config if present
        var config = await ConfigurationHelper.LoadConfigAsync(sdkPath, cancellationToken);

        // Get language context
        var context = CreateLanguageContext(detectedLanguage.Value);

        // Use specified budget or default (128K tokens = 512K chars)
        var contextBudget = budget ?? SampleConstants.DefaultContextCharacters;

        // Count existing samples
        var filesStopwatch = Stopwatch.StartNew();
        var existingSamplesCount = await ConsoleUx.SpinnerAsync(
            "Scanning files...",
            () => CountExistingSamplesAsync(existingSamplesPath, context),
            cancellationToken);
        filesStopwatch.Stop();

        // Build system prompt with SDK name for clarity
        var systemPrompt = BuildSystemPrompt(context, sdkInfo.SdkName);

        // Determine output folder
        var outputDir = outputPath ?? sdkInfo.SuggestedSamplesFolder;
        if (!dryRun)
        {
            Directory.CreateDirectory(outputDir);
        }

        // Show output folder
        ConsoleUx.Info($"Output: {outputDir}");

        // Show which AI provider is being used
        var providerName = _aiService.IsUsingOpenAi ? "OpenAI" : "GitHub Copilot";
        var effectiveModel = _aiService.GetEffectiveModel(model);

        Console.WriteLine();

        // Spinners are staged: prompt prep (materialization) then generation.
        ConsoleUx.StreamingProgress? preparingProgress = null;
        ConsoleUx.StreamingProgress? progress = null;
        string? modelName = string.IsNullOrWhiteSpace(effectiveModel) ? null : effectiveModel;

        var promptTokens = (int?)null;
        var promptPrepStopwatch = Stopwatch.StartNew();
        promptPrepStopwatch.Stop();

        int? responseTokens = null;
        TimeSpan? generationDuration = null;

        async ValueTask OnPromptReadyAsync(AiPromptReadyEventArgs args)
        {
            promptTokens = args.EstimatedTokens;

            if (promptPrepStopwatch.IsRunning)
            {
                promptPrepStopwatch.Stop();
            }

            if (preparingProgress != null)
            {
                await preparingProgress.CompleteAsync($"Prepared prompt ({FormatDuration(promptPrepStopwatch.Elapsed)})");
                await preparingProgress.DisposeAsync();
                preparingProgress = null;
            }

            // Print prompt size, then start the generation spinner
            ConsoleUx.Info($"Prompt: {FormatTokenEstimate(args.EstimatedTokens)}");

            progress = ConsoleUx.StartStreaming(
                !string.IsNullOrWhiteSpace(modelName)
                    ? $"Generating with {providerName} ({modelName})..."
                    : $"Generating with {providerName}...");
        }

        // Async callback for stream complete
        ValueTask OnStreamCompleteAsync(AiStreamCompleteEventArgs args)
        {
            responseTokens = args.EstimatedResponseTokens;
            generationDuration = args.Duration;
            return ValueTask.CompletedTask;
        }

        // Create streaming user prompt (materialization happens inside AiService)
        var userPromptStream = StreamUserPromptAsync(prompt, count ?? 5, existingSamplesCount > 0, sdkInfo.SourceFolder, existingSamplesPath, outputDir, context, config, contextBudget, cancellationToken);

        List<GeneratedSample> samples = [];

        // Start a spinner while AiService materializes the streamed user prompt.
        preparingProgress = ConsoleUx.StartStreaming("Preparing prompt...");
        promptPrepStopwatch.Restart();

        var generationStopwatch = Stopwatch.StartNew();

        try
        {
            // Stream parsed samples as they complete
            await foreach (var sample in _aiService.StreamItemsAsync(
                systemPrompt,
                userPromptStream,
                AiStreamingJsonContext.CaseInsensitive.GeneratedSample,
                model,
                contextInfo: null,
                onPromptReady: OnPromptReadyAsync,
                onStreamComplete: OnStreamCompleteAsync,
                cancellationToken: cancellationToken))
            {
                if (!string.IsNullOrEmpty(sample.Name) && !string.IsNullOrEmpty(sample.Code))
                {
                    samples.Add(sample);
                    // Use FilePath if provided, otherwise generate from Name
                    var relativePath = !string.IsNullOrEmpty(sample.FilePath)
                        ? SanitizePath(sample.FilePath, context.FileExtension)
                        : SanitizeName(sample.Name) + context.FileExtension;
                    var fullPath = Path.GetFullPath(Path.Combine(outputDir, relativePath));
                    progress?.Update(fullPath);
                }
            }
        }
        catch (OperationCanceledException)
        {
            // Propagate cancellation - use async dispose before rethrowing
            if (preparingProgress != null) await preparingProgress.DisposeAsync();
            if (progress != null) await progress.DisposeAsync();
            throw;
        }
        catch (Exception ex)
        {
            if (promptPrepStopwatch.IsRunning)
            {
                promptPrepStopwatch.Stop();
            }

            if (preparingProgress != null)
            {
                await preparingProgress.FailAsync("Preparing prompt failed");
                await preparingProgress.DisposeAsync();
                preparingProgress = null;
            }

            if (progress != null)
            {
                await progress.FailAsync("Generation failed");
                await progress.DisposeAsync();
            }
            ConsoleUx.Error(ex.Message);
            return 1;
        }

        generationStopwatch.Stop();

        // Complete the spinner
        if (samples.Count > 0)
        {
            var effectiveGenerationDuration = generationDuration;
            if (effectiveGenerationDuration is null || effectiveGenerationDuration == TimeSpan.Zero)
            {
                effectiveGenerationDuration = generationStopwatch.Elapsed;
            }

            if (progress != null)
            {
                await progress.CompleteAsync($"Generated {samples.Count} sample(s) ({FormatDuration(effectiveGenerationDuration.Value)})");
            }
        }
        else
        {
            if (progress != null)
            {
                await progress.FailAsync("No samples generated");
                await progress.DisposeAsync();
            }
            return 1;
        }

        if (progress != null)
        {
            await progress.DisposeAsync();
        }

        // Show response token usage
        if (responseTokens != null)
        {
            ConsoleUx.Info($"Response: {FormatTokenEstimate(responseTokens.Value)}");
        }

        // Write samples with visual feedback (skip tree for dry-run since we already showed during streaming)
        if (!dryRun)
        {
            Console.WriteLine();
            var outputFolder = Path.GetFullPath(outputDir);
            for (var i = 0; i < samples.Count; i++)
            {
                var sample = samples[i];
                var relativePath = !string.IsNullOrEmpty(sample.FilePath)
                    ? SanitizePath(sample.FilePath, context.FileExtension)
                    : SanitizeName(sample.Name) + context.FileExtension;
                var isLast = i == samples.Count - 1;

                var filePath = Path.GetFullPath(Path.Combine(outputDir, relativePath));

                // SECURITY: Ensure path stays within output directory (defense-in-depth)
                if (!filePath.StartsWith(outputFolder + Path.DirectorySeparatorChar, StringComparison.OrdinalIgnoreCase)
                    && !filePath.Equals(outputFolder, StringComparison.OrdinalIgnoreCase))
                {
                    Console.WriteLine($"  {ConsoleUx.Yellow("⚠")} Skipping file that would escape output directory: {relativePath}");
                    continue;
                }

                var fileDir = Path.GetDirectoryName(filePath);
                if (!string.IsNullOrEmpty(fileDir))
                {
                    Directory.CreateDirectory(fileDir);
                }
                await File.WriteAllTextAsync(filePath, sample.Code, cancellationToken);
                ConsoleUx.TreeItem($"{ConsoleUx.Green("✓")} {filePath}", isLast);
            }
        }

        Console.WriteLine();
        if (dryRun)
        {
            ConsoleUx.Info($"[DRY RUN] Would write to: {outputDir}");
        }
        else
        {
            ConsoleUx.Success($"Wrote {samples.Count} sample(s) to {outputDir}");
        }

        totalStopwatch.Stop();

        // Compact final summary
        if (promptTokens is { } pt && responseTokens is { } rt)
        {
            Console.WriteLine();
            ConsoleUx.Info($"Summary: tokens {FormatTokenCount(pt)} + {FormatTokenCount(rt)} = {FormatTokenCount(pt + rt)}");
        }

        var promptPrepDuration = promptPrepStopwatch.Elapsed;
        var genDuration = generationDuration is { } gd && gd > TimeSpan.Zero ? gd : generationStopwatch.Elapsed;
        ConsoleUx.Info(
            $"Summary: time scan {FormatDuration(scanStopwatch.Elapsed)}, files {FormatDuration(filesStopwatch.Elapsed)}, prompt {FormatDuration(promptPrepDuration)}, generate {FormatDuration(genDuration)}, total {FormatDuration(totalStopwatch.Elapsed)}");

        return 0;
    }

    private static string FormatDuration(TimeSpan duration)
    {
        if (duration < TimeSpan.Zero)
        {
            return "0ms";
        }

        if (duration < TimeSpan.FromSeconds(1))
        {
            return $"{duration.TotalMilliseconds:F0}ms";
        }

        return $"{duration.TotalSeconds:F1}s";
    }

    private static string FormatTokenCount(int tokens)
    {
        if (tokens < 1000)
        {
            return $"~{tokens}";
        }

        var k = tokens / 1000.0;
        var formatted = k < 10 ? k.ToString("0.0") : (tokens / 1000).ToString("0");
        return $"~{formatted}K";
    }

    private static string FormatTokenEstimate(int tokens)
    {
        if (tokens < 1000)
        {
            return $"~{tokens} tokens";
        }

        return $"~{tokens / 1000}K tokens";
    }

    private static string SanitizeName(string name) => PathSanitizer.SanitizeFileName(name);

    private static string SanitizePath(string path, string ext) => PathSanitizer.SanitizeFilePath(path, ext);

    private SampleLanguageContext CreateLanguageContext(SdkLanguage language) => language switch
    {
        SdkLanguage.DotNet => new DotNetSampleLanguageContext(_fileHelper),
        SdkLanguage.Python => new PythonSampleLanguageContext(_fileHelper),
        SdkLanguage.JavaScript => new JavaScriptSampleLanguageContext(_fileHelper),
        SdkLanguage.TypeScript => new TypeScriptSampleLanguageContext(_fileHelper),
        SdkLanguage.Java => new JavaSampleLanguageContext(_fileHelper),
        SdkLanguage.Go => new GoSampleLanguageContext(_fileHelper),
        _ => throw new NotSupportedException($"Language {language} not supported")
    };

    private static string BuildSystemPrompt(SampleLanguageContext context, string sdkName) =>
        $"Generate runnable SDK samples for the '{sdkName}' SDK. " +
        $"{context.GetInstructions()}";

    /// <summary>
    /// Gets the prefix part of the user prompt (before the file context).
    /// </summary>
    private static string GetUserPromptPrefix(string? customPrompt, int count, bool hasExistingSamples)
    {
        if (!string.IsNullOrEmpty(customPrompt))
        {
            var dupeWarning = hasExistingSamples ? " Avoid duplicating <existing-samples>." : "";
            return $"{customPrompt}{dupeWarning} Generate {count} samples.\n\n";
        }

        if (!hasExistingSamples)
        {
            return $"Generate {count} samples covering: init/auth, CRUD, async, error handling, advanced features.\n\n";
        }
        else
        {
            return $"Generate {count} NEW samples for uncovered APIs. Avoid duplicating <existing-samples>.\n\n";
        }
    }

    /// <summary>
    /// Gets the suffix part of the user prompt (after the file context).
    /// </summary>
    private static string GetUserPromptSuffix() => "";

    /// <summary>
    /// Streams the complete user prompt including prefix, context, and suffix.
    /// Uses budget tracking to enforce limits and prevent overflow.
    /// </summary>
    private static async IAsyncEnumerable<string> StreamUserPromptAsync(
        string? customPrompt,
        int count,
        bool hasExistingSamples,
        string sourceFolder,
        string? samplesFolder,
        string outputFolder,
        SampleLanguageContext languageContext,
        SdkChatConfig? config,
        int contextBudget,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        // Create budget tracker - reserve space for essential overhead
        // Overhead includes: prefix (~200), output folder (~100), example sample XML tags (~200)
        const int OverheadReserve = 500;
        var budgetTracker = new PromptBudgetTracker(contextBudget, OverheadReserve);

        // Yield the prompt prefix (always included, counted against budget)
        var prefix = GetUserPromptPrefix(customPrompt, count, hasExistingSamples);
        budgetTracker.TryConsume(prefix.Length);
        yield return prefix;

        // Add samples folder context so AI knows where files go
        var outputFolderTag = $"<output-folder>{Path.GetFileName(outputFolder)}</output-folder>\n";
        var outputInstruction = "Generate filePath relative to the output folder above (e.g., 'Chat/CreateCompletion.cs' not 'src/...').\n\n";
        budgetTracker.TryConsume(outputFolderTag.Length + outputInstruction.Length);
        yield return outputFolderTag;
        yield return outputInstruction;

        // Include an example existing sample with full content if available
        // Budget-aware: truncate example to fit, skip if no room
        if (!string.IsNullOrEmpty(samplesFolder) && Directory.Exists(samplesFolder) && !budgetTracker.IsExhausted)
        {
            // SAFETY: Use safe enumeration to avoid scanning node_modules, .git, etc.
            var exampleFile = SdkInfo.EnumerateFilesSafely(samplesFolder, $"*{languageContext.FileExtension}", maxFiles: 100)
                .FirstOrDefault();
            if (exampleFile != null)
            {
                var relativePath = Path.GetRelativePath(samplesFolder, exampleFile);
                var content = await File.ReadAllTextAsync(exampleFile, cancellationToken);

                // Calculate how much budget remains for example sample
                // Reserve at least 50% of remaining budget for actual source context
                var exampleBudget = Math.Min(5000, budgetTracker.Remaining / 2);

                if (exampleBudget > 500) // Only include if meaningful space available
                {
                    // Truncate content to fit within example budget (leaving room for XML tags)
                    var maxContentLength = exampleBudget - 200; // 200 chars for XML overhead
                    if (content.Length > maxContentLength)
                    {
                        content = content[..maxContentLength] + "\n// ... (truncated)";
                    }

                    var exampleHeader = "<example-sample>\n";
                    var filePathTag = $"<filePath>{relativePath}</filePath>\n";
                    var codeOpen = $"<code>\n";
                    var codeClose = "</code>\n";
                    var exampleFooter = "</example-sample>\n";
                    var followInstruction = "Follow this exact structure and style for new samples.\n\n";

                    var totalExample = exampleHeader.Length + filePathTag.Length + codeOpen.Length +
                                       content.Length + codeClose.Length + exampleFooter.Length +
                                       followInstruction.Length;

                    budgetTracker.TryConsume(totalExample);

                    yield return exampleHeader;
                    yield return filePathTag;
                    yield return codeOpen;
                    yield return content;
                    yield return "\n";
                    yield return codeClose;
                    yield return exampleFooter;
                    yield return followInstruction;
                }
            }
        }

        // Stream context (source code and samples) with remaining budget
        var remainingBudget = budgetTracker.Remaining;
        if (remainingBudget > 0)
        {
            await foreach (var chunk in StreamContextAsync(sourceFolder, samplesFolder, languageContext, config, remainingBudget, cancellationToken))
            {
                yield return chunk;
            }
        }

        // Yield the suffix (currently empty but kept for flexibility)
        var suffix = GetUserPromptSuffix();
        if (!string.IsNullOrEmpty(suffix))
        {
            yield return suffix;
        }
    }

    /// <summary>
    /// Counts existing sample files in the samples folder.
    /// Uses safe enumeration to avoid scanning dangerous folders like node_modules.
    /// </summary>
    private static async Task<int> CountExistingSamplesAsync(
        string? samplesFolder,
        SampleLanguageContext languageContext)
    {
        await Task.Yield(); // Allow spinner to start

        if (string.IsNullOrEmpty(samplesFolder) || !Directory.Exists(samplesFolder))
            return 0;

        // SAFETY: Use safe enumeration to avoid scanning node_modules, .git, etc.
        return SdkInfo.CountFilesSafely(samplesFolder, $"*{languageContext.FileExtension}");
    }

    /// <summary>
    /// Streams context from source code and samples without materializing in memory.
    /// Uses language-specific API graphing with coverage-aware formatting for ~70% token reduction.
    /// </summary>
    private static async IAsyncEnumerable<string> StreamContextAsync(
        string sourceFolder,
        string? samplesFolder,
        SampleLanguageContext languageContext,
        SdkChatConfig? config,
        int contextBudget,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        // Use unified coverage-aware streaming - merges API surface + coverage into compact output
        await foreach (var chunk in languageContext.StreamContextAsync(
            sourceFolder, samplesFolder, config, contextBudget, cancellationToken))
        {
            yield return chunk;
        }
    }
}
