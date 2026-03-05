// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace Microsoft.SdkChat.Models;

/// <summary>
/// Shared constants for sample generation tools.
/// </summary>
public static class SampleConstants
{
    /// <summary>
    /// Default context window limit in tokens.
    /// Most modern AI models support 128K+ tokens. User can override via --budget.
    /// </summary>
    public const int DefaultContextTokens = 128_000;

    /// <summary>
    /// Approximate characters per token for estimation.
    /// Most tokenizers average ~4 characters per token for code.
    /// </summary>
    public const int CharsPerToken = 4;

    /// <summary>
    /// Default context window limit in characters.
    /// 128K tokens * 4 chars/token = 512K characters.
    /// </summary>
    public const int DefaultContextCharacters = DefaultContextTokens * CharsPerToken;

    /// <summary>
    /// Per-file character limit for fallback mode (raw source streaming).
    /// Prevents any single large file from consuming the entire budget.
    /// 50K chars ≈ 12.5K tokens - enough for most source files.
    /// </summary>
    public const int FallbackPerFileLimit = 50_000;

    /// <summary>
    /// Per-file character limit for sample files in fallback mode.
    /// Samples should be small, focused snippets.
    /// 10K chars ≈ 2.5K tokens.
    /// </summary>
    public const int FallbackSampleFileLimit = 10_000;

    /// <summary>
    /// Default batch size for processing samples.
    /// </summary>
    public const int DefaultBatchSize = 5;

    /// <summary>
    /// Glob patterns to exclude when loading existing samples.
    /// </summary>
    public static readonly string[] ExistingSamplesExcludePatterns =
    {
        "**/obj/**",
        "**/bin/**",
        "**/*.csproj",
        "**/*.targets"
    };
}
