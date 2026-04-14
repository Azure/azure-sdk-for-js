// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.ComponentModel;
using System.Text.Json;
using System.Text.Json.Serialization;
using Microsoft.SdkChat.Helpers;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Microsoft.SdkChat.Services.Languages.Samples;
using Microsoft.SdkChat.Telemetry;
using ModelContextProtocol.Server;

namespace Microsoft.SdkChat.Mcp;

/// <summary>
/// Result of building a samples prompt. Returned to the client so it can call its own LLM.
/// </summary>
public sealed record SamplesPromptResult
{
    /// <summary>System prompt for the LLM.</summary>
    [JsonPropertyName("systemPrompt")]
    public required string SystemPrompt { get; init; }

    /// <summary>User prompt for the LLM.</summary>
    [JsonPropertyName("userPrompt")]
    public required string UserPrompt { get; init; }

    /// <summary>Estimated token count for the prompt.</summary>
    [JsonPropertyName("estimatedTokens")]
    public int EstimatedTokens { get; init; }

    /// <summary>Detected SDK language.</summary>
    [JsonPropertyName("language")]
    public required string Language { get; init; }

    /// <summary>File extension for the detected language (e.g. ".cs", ".py").</summary>
    [JsonPropertyName("fileExtension")]
    public required string FileExtension { get; init; }

    /// <summary>Suggested output path for generated samples.</summary>
    [JsonPropertyName("suggestedOutputPath")]
    public required string SuggestedOutputPath { get; init; }
}

/// <summary>
/// Result of validating an LLM response containing generated samples.
/// </summary>
public sealed record ValidateSamplesResult
{
    /// <summary>Whether the response was successfully parsed.</summary>
    [JsonPropertyName("success")]
    public bool Success { get; init; }

    /// <summary>Parsed samples (null if parsing failed).</summary>
    [JsonPropertyName("samples")]
    public List<GeneratedSample>? Samples { get; init; }

    /// <summary>Number of valid samples.</summary>
    [JsonPropertyName("count")]
    public int Count { get; init; }

    /// <summary>Error message if parsing failed.</summary>
    [JsonPropertyName("error")]
    public string? Error { get; init; }

    /// <summary>Correction prompt to send to the LLM for retry (set when parsing fails).</summary>
    [JsonPropertyName("correctionPrompt")]
    public string? CorrectionPrompt { get; init; }

    /// <summary>Estimated response tokens.</summary>
    [JsonPropertyName("estimatedResponseTokens")]
    public int EstimatedResponseTokens { get; init; }
}

/// <summary>
/// MCP tools for SDK sample detection and generation.
/// Entity group: samples
///
/// The generation workflow uses two tools instead of one:
/// 1. build_samples_prompt — analyzes SDK, returns system + user prompt
/// 2. validate_samples — parses LLM response, returns structured samples
///
/// The client orchestrates the LLM call between steps 1 and 2,
/// giving it full control over model selection, streaming, and file writing.
/// </summary>
[McpServerToolType]
public class SamplesMcpTools(FileHelper fileHelper, IPackageInfoService packageInfoService)
{
    private readonly IPackageInfoService _infoService = packageInfoService;
    private readonly FileHelper _fileHelper = fileHelper;

    [McpServerTool(Name = "detect_samples"), Description(
        "Find existing samples/examples folder in an SDK package. " +
        "WHEN TO USE: Before generating samples to check what already exists and avoid duplicates. " +
        "WHAT IT DOES: Searches for common sample directories (samples/, examples/, demo/, quickstarts/) and counts existing files. " +
        "RETURNS: Found samples path, suggested output path, all candidate folders, and whether samples already exist. " +
        "NEXT STEPS: Use analyze_coverage to see which APIs are already covered, then build_samples_prompt to prepare for generation.")]
    public async Task<string> DetectSamplesAsync(
        [Description("Absolute path to SDK root directory.")] string packagePath,
        CancellationToken cancellationToken = default)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("detect_samples");

        try
        {
            var result = await _infoService.DetectSamplesFolderAsync(packagePath, cancellationToken).ConfigureAwait(false);

            return JsonSerializer.Serialize(
                new McpResponse<SamplesFolderResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseSamplesFolderResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error detecting samples: {ex.Message}", ex).ToString();
        }
    }

    [McpServerTool(Name = "build_samples_prompt"), Description(
        "Build an AI prompt for generating SDK code samples. " +
        "WHEN TO USE: To create documentation examples, quickstart code, or usage demonstrations for an SDK. " +
        "WHAT IT DOES: Graphs the public API, analyzes existing samples to avoid duplicates, and builds a system + user prompt optimized for code generation. " +
        "TOKEN EFFICIENCY: Uses ~70% less tokens than raw source by graphing semantic API information. " +
        "RETURNS: systemPrompt, userPrompt, estimatedTokens, language, fileExtension, and suggestedOutputPath. " +
        "SUPPORTS: .NET/C#, Python, Java, JavaScript, TypeScript, Go. " +
        "WORKFLOW: Call this tool → send the returned prompts to your LLM → call validate_samples with the LLM response → write the validated samples to disk.")]
    public async Task<string> BuildSamplesPromptAsync(
        [Description("Absolute path to SDK root. Must contain project files (.csproj, pyproject.toml, pom.xml, package.json, go.mod).")] string packagePath,
        [Description("Guide the AI: 'streaming examples', 'error handling patterns', 'authentication scenarios', 'async/await usage'.")] string? prompt = null,
        [Description("How many samples to generate. Default: 5.")] int? count = null,
        [Description("Max source context in characters. Default: 512K (128K tokens). Reduce for faster/cheaper generation.")] int? budget = null,
        [Description("Force language: dotnet, python, java, javascript, typescript, go. Default: auto-detected.")] string? language = null,
        CancellationToken cancellationToken = default)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("build_samples_prompt");

        try
        {
            var sampleCount = count ?? 5;
            var contextBudget = budget ?? SampleConstants.DefaultContextCharacters;

            // Detect SDK language and structure
            var packageFullPath = Path.GetFullPath(packagePath);
            if (!Directory.Exists(packageFullPath))
            {
                return McpToolResult.CreateFailure(
                    $"SDK path does not exist: {packageFullPath}",
                    "PATH_NOT_FOUND"
                ).ToString();
            }

            var sourceResult = await _infoService.DetectSourceFolderAsync(packageFullPath, language, cancellationToken).ConfigureAwait(false);
            var samplesResult = await _infoService.DetectSamplesFolderAsync(packageFullPath, cancellationToken).ConfigureAwait(false);

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
                return McpToolResult.CreateFailure(
                    "Could not detect package language.",
                    "LANGUAGE_DETECTION_FAILED"
                ).ToString();
            }

            // Create language context
            var context = SampleGeneratorService.CreateLanguageContextForLanguage(effectiveLanguage.Value, _fileHelper);
            var existingSampleCount = samplesResult.SamplesFolder is not null && Directory.Exists(samplesResult.SamplesFolder)
                ? SdkInfo.CountFilesSafely(samplesResult.SamplesFolder, $"*{context.FileExtension}")
                : 0;

            // Determine output path
            var suggestedOutputPath = samplesResult.SuggestedSamplesFolder;

            // Build prompts
            var sdkName = sourceResult.SdkName ?? Path.GetFileName(packageFullPath);
            var baseSystemPrompt = SampleGeneratorService.BuildSystemPrompt(context, sdkName, sampleCount);
            var systemPrompt = $"{baseSystemPrompt}\n\n{SampleResponseParser.GetJsonArrayFormatInstructions()}";

            var userPrompt = await BuildUserPromptAsync(
                prompt,
                sampleCount,
                existingSampleCount > 0,
                sourceResult.SourceFolder ?? packageFullPath,
                samplesResult.SamplesFolder,
                suggestedOutputPath,
                context,
                contextBudget,
                cancellationToken).ConfigureAwait(false);

            var estimatedTokens = (systemPrompt.Length + userPrompt.Length) / 4;

            activity?.SetTag("language", effectiveLanguage.Value.ToString());
            activity?.SetTag("estimatedTokens", estimatedTokens);

            var result = new SamplesPromptResult
            {
                SystemPrompt = systemPrompt,
                UserPrompt = userPrompt,
                EstimatedTokens = estimatedTokens,
                Language = effectiveLanguage.Value.ToString(),
                FileExtension = context.FileExtension,
                SuggestedOutputPath = suggestedOutputPath
            };

            return JsonSerializer.Serialize(
                new McpResponse<SamplesPromptResult> { Success = true, Data = result },
                McpJsonContext.Default.McpResponseSamplesPromptResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error building prompt: {ex.Message}", ex).ToString();
        }
    }

    [McpServerTool(Name = "validate_samples"), Description(
        "Validate and parse an LLM response containing generated SDK samples. " +
        "WHEN TO USE: After calling your LLM with the prompts from build_samples_prompt. " +
        "WHAT IT DOES: Parses the LLM response as a JSON array of samples, validates each sample, and records telemetry. " +
        "RETURNS: On success: parsed samples array with name, description, code, and filePath for each. " +
        "On failure: error message and a correctionPrompt to send back to the LLM for retry. " +
        "WORKFLOW: build_samples_prompt → call LLM → validate_samples → if correctionPrompt returned, retry LLM → write samples to disk.")]
    public string ValidateSamples(
        [Description("The raw text response from the LLM.")] string llmResponse,
        [Description("The SDK language (from build_samples_prompt result). Used for telemetry.")] string? language = null)
    {
        using var activity = SdkChatTelemetry.StartMcpTool("validate_samples");

        try
        {
            if (string.IsNullOrWhiteSpace(llmResponse))
            {
                return JsonSerializer.Serialize(
                    new ValidateSamplesResult
                    {
                        Success = false,
                        Error = "Empty LLM response",
                        CorrectionPrompt = SampleResponseParser.CorrectionPrompt
                    },
                    McpJsonContext.Default.ValidateSamplesResult);
            }

            List<GeneratedSample> samples;
            try
            {
                samples = SampleResponseParser.ParseJsonArray(llmResponse);
            }
            catch (JsonException ex)
            {
                return JsonSerializer.Serialize(
                    new ValidateSamplesResult
                    {
                        Success = false,
                        Error = $"Failed to parse LLM response: {ex.Message}",
                        CorrectionPrompt = SampleResponseParser.CorrectionPrompt,
                        EstimatedResponseTokens = llmResponse.Length / 4
                    },
                    McpJsonContext.Default.ValidateSamplesResult);
            }

            // Sanitize file paths to prevent traversal attacks and normalize for cross-platform use
            samples = [.. samples.Select(s => s with
            {
                FilePath = s.FilePath is not null
                    ? PathSanitizer.SanitizeFilePath(s.FilePath, Path.GetExtension(s.FilePath))
                    : null
            })];

            // Filter to valid samples only
            var validSamples = samples
                .Where(s => !string.IsNullOrWhiteSpace(s.Name) && !string.IsNullOrWhiteSpace(s.Code))
                .ToList();

            var estimatedResponseTokens = llmResponse.Length / 4;

            activity?.SetTag("language", language);
            SdkChatTelemetry.RecordSampleMetrics(activity, validSamples.Count, 0, estimatedResponseTokens);

            return JsonSerializer.Serialize(
                new ValidateSamplesResult
                {
                    Success = true,
                    Samples = validSamples,
                    Count = validSamples.Count,
                    EstimatedResponseTokens = estimatedResponseTokens
                },
                McpJsonContext.Default.ValidateSamplesResult);
        }
        catch (Exception ex)
        {
            SdkChatTelemetry.RecordError(activity, ex);
            return McpToolResult.CreateFailure($"Error validating samples: {ex.Message}", ex).ToString();
        }
    }

    private static async Task<string> BuildUserPromptAsync(
        string? customPrompt,
        int count,
        bool hasExistingSamples,
        string sourceFolder,
        string? samplesFolder,
        string outputFolder,
        SampleLanguageContext context,
        int budget,
        CancellationToken cancellationToken)
    {
        const int OverheadReserve = 500;
        var budgetTracker = new PromptBudgetTracker(budget, OverheadReserve);
        List<string> parts = [];

        // Prefix
        var prefix = SampleGeneratorService.GetUserPromptPrefix(customPrompt, count, hasExistingSamples);
        budgetTracker.TryConsume(prefix.Length);
        parts.Add(prefix);

        // Output folder context
        var outputFolderTag = $"<output-folder>{Path.GetFileName(outputFolder)}</output-folder>\n";
        var outputInstruction = "Generate filePath relative to the output folder above.\n\n";
        budgetTracker.TryConsume(outputFolderTag.Length + outputInstruction.Length);
        parts.Add(outputFolderTag);
        parts.Add(outputInstruction);

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
                    parts.Add(exampleXml);
                    parts.Add(instruction);
                }
            }
        }

        // Stream source context
        if (budgetTracker.Remaining > 0)
        {
            await foreach (var chunk in context.StreamContextAsync(
                sourcePath: sourceFolder,
                samplesPath: samplesFolder,
                config: null,
                totalBudget: budgetTracker.Remaining,
                ct: cancellationToken))
            {
                parts.Add(chunk);
            }
        }

        return string.Concat(parts);
    }
}
