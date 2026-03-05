// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Services.Languages.Samples;

namespace Microsoft.SdkChat.Tools.Package.Samples;

/// <summary>
/// Builds prompts for sample generation with budget-aware context streaming.
/// Separated from workflow orchestration for testability and single responsibility.
/// </summary>
public class SamplePromptBuilder
{
    public SamplePromptBuilder(FileHelper fileHelper)
    {
        // FileHelper reserved for future use (e.g., custom file loading strategies)
        _ = fileHelper;
    }

    /// <summary>
    /// Builds the system prompt for sample generation.
    /// </summary>
    public static string BuildSystemPrompt(SampleLanguageContext context, string sdkName) =>
        $"Generate runnable SDK samples for the '{sdkName}' SDK. " +
        $"{context.GetInstructions()} " +
        "Do NOT use deprecated APIs. If a requested scenario only has a deprecated API path, call that out and suggest the replacement.";

    /// <summary>
    /// Gets the prefix part of the user prompt (before the file context).
    /// </summary>
    public static string GetUserPromptPrefix(string? customPrompt, int count, bool hasExistingSamples)
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
    public static string GetUserPromptSuffix() => "";

    /// <summary>
    /// Streams the complete user prompt including prefix, context, and suffix.
    /// Uses budget tracking to enforce limits and prevent overflow.
    /// </summary>
    public static async IAsyncEnumerable<string> StreamUserPromptAsync(
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
            await foreach (var chunk in languageContext.StreamContextAsync(
                sourceFolder, samplesFolder, config, remainingBudget, cancellationToken))
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
}
