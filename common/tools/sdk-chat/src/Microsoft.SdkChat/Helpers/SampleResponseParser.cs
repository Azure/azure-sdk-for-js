// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;

namespace Microsoft.SdkChat.Helpers;

/// <summary>
/// Shared helpers for parsing AI-generated sample responses and building
/// structured output instructions. Used by MCP, CLI, and ACP paths.
/// </summary>
public static class SampleResponseParser
{
    /// <summary>
    /// Correction prompt sent to the AI when its response cannot be parsed.
    /// </summary>
    public const string CorrectionPrompt =
        "Your response was not valid JSON. " +
        "Return ONLY a raw JSON array of sample objects, " +
        "with no markdown, no code fences, and no extra text.";

    /// <summary>
    /// Maximum retry attempts for parsing AI responses.
    /// </summary>
    public const int MaxRetryAttempts = 2;

    /// <summary>
    /// Returns format instructions to append to a system prompt for JSON array output
    /// (used by MCP sampling and ACP, where the full response is received at once).
    /// For NDJSON streaming (CLI), see <see cref="Services.AiService"/> which generates
    /// format instructions generically based on the streamed item type.
    /// </summary>
    public static string GetJsonArrayFormatInstructions()
    {
        var schema = AiService.GenerateJsonSchema(typeof(GeneratedSample));
        return
            "Output MUST be a JSON array:\n" +
            "- Return a single JSON array of sample objects\n" +
            "- Do NOT use markdown or code fences\n" +
            "- Do NOT output any extra text\n\n" +
            $"Each element MUST match this schema:\n{schema}";
    }

    /// <summary>
    /// Parse a complete AI response as a JSON array of <see cref="GeneratedSample"/>.
    /// Throws <see cref="JsonException"/> if the response is not valid JSON.
    /// </summary>
    public static List<GeneratedSample> ParseJsonArray(string responseText)
    {
        return JsonSerializer.Deserialize(responseText, AiStreamingJsonContext.CaseInsensitive.ListGeneratedSample)
            ?? throw new JsonException("Null result from JSON deserialization");
    }
}
