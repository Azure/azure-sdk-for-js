// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace Microsoft.SdkChat.Models;

public enum SdkLanguage
{
    [JsonPropertyName("")]
    Unknown,
    [JsonPropertyName(".NET")]
    DotNet,
    [JsonPropertyName("Java")]
    Java,
    [JsonPropertyName("JavaScript")]
    JavaScript,
    [JsonPropertyName("TypeScript")]
    TypeScript,
    [JsonPropertyName("Python")]
    Python,
    [JsonPropertyName("Go")]
    Go
}

public static class SdkLanguageHelpers
{
    /// <summary>
    /// Parse language from string input (CLI args, config files, etc.)
    /// </summary>
    public static SdkLanguage Parse(string? language)
    {
        if (string.IsNullOrWhiteSpace(language))
            return SdkLanguage.Unknown;

        return language.ToLowerInvariant() switch
        {
            ".net" or "dotnet" or "c#" or "csharp" => SdkLanguage.DotNet,
            "java" => SdkLanguage.Java,
            "javascript" or "js" or "node" => SdkLanguage.JavaScript,
            "typescript" or "ts" => SdkLanguage.TypeScript,
            "python" or "py" => SdkLanguage.Python,
            "go" or "golang" => SdkLanguage.Go,
            _ => SdkLanguage.Unknown
        };
    }

    /// <summary>
    /// Get file extension for language.
    /// </summary>
    public static string GetFileExtension(SdkLanguage language) => language switch
    {
        SdkLanguage.DotNet => ".cs",
        SdkLanguage.Python => ".py",
        SdkLanguage.JavaScript => ".js",
        SdkLanguage.TypeScript => ".ts",
        SdkLanguage.Java => ".java",
        SdkLanguage.Go => ".go",
        _ => ".txt"
    };

    /// <summary>
    /// Get language ID for code blocks.
    /// </summary>
    public static string GetLanguageId(SdkLanguage language) => language switch
    {
        SdkLanguage.DotNet => "csharp",
        SdkLanguage.Python => "python",
        SdkLanguage.JavaScript => "javascript",
        SdkLanguage.TypeScript => "typescript",
        SdkLanguage.Java => "java",
        SdkLanguage.Go => "go",
        _ => "text"
    };
}
