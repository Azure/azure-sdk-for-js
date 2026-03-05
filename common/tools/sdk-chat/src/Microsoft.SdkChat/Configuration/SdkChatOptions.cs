// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.ComponentModel.DataAnnotations;

namespace Microsoft.SdkChat.Configuration;

/// <summary>
/// Centralized, validated configuration for SDK Chat.
/// Bind this at startup using the Options pattern - never read Environment variables in services.
/// </summary>
public sealed class SdkChatOptions : IValidatableObject
{
    /// <summary>
    /// Configuration section name for binding.
    /// </summary>
    public const string SectionName = "SdkChat";

    /// <summary>
    /// Default model for GitHub Copilot provider.
    /// </summary>
    public const string DefaultCopilotModel = "claude-sonnet-4.5";

    /// <summary>
    /// Default model for OpenAI-compatible provider.
    /// </summary>
    public const string DefaultOpenAiModel = "gpt-5.2";

    /// <summary>
    /// Default request timeout in seconds.
    /// </summary>
    public const int DefaultTimeoutSeconds = 300;

    /// <summary>
    /// Default maximum concurrent ACP sessions.
    /// </summary>
    public const int DefaultMaxAcpSessions = 100;

    /// <summary>
    /// Use custom OpenAI-compatible endpoint instead of GitHub Copilot.
    /// Environment: SDK_CLI_USE_OPENAI
    /// </summary>
    public bool UseOpenAi { get; set; }

    /// <summary>
    /// Custom OpenAI-compatible API endpoint.
    /// Environment: OPENAI_ENDPOINT
    /// </summary>
    public string? Endpoint { get; set; }

    /// <summary>
    /// API key for OpenAI-compatible endpoint.
    /// Environment: OPENAI_API_KEY
    /// Note: Consumers should read this value once and avoid long-lived references.
    /// The value is cleared after initial consumption via <see cref="ConsumeApiKey"/>.
    /// </summary>
    public string? ApiKey { get; set; }

    /// <summary>
    /// Model override.
    /// Environment: SDK_CLI_MODEL
    /// </summary>
    public string? Model { get; set; }

    /// <summary>
    /// Enable debug logging.
    /// Environment: SDK_CLI_DEBUG
    /// </summary>
    public bool DebugEnabled { get; set; }

    /// <summary>
    /// Debug log directory.
    /// Environment: SDK_CLI_DEBUG_DIR
    /// </summary>
    public string? DebugDirectory { get; set; }

    /// <summary>
    /// Request timeout in seconds.
    /// Environment: SDK_CLI_TIMEOUT
    /// </summary>
    public int TimeoutSeconds { get; set; } = DefaultTimeoutSeconds;

    /// <summary>
    /// Maximum concurrent ACP sessions.
    /// Environment: SDK_CLI_ACP_MAX_SESSIONS
    /// </summary>
    public int MaxAcpSessions { get; set; } = DefaultMaxAcpSessions;

    /// <summary>
    /// Path to Copilot CLI executable.
    /// Environment: COPILOT_CLI_PATH
    /// </summary>
    public string CopilotCliPath { get; set; } = "copilot";

    /// <summary>
    /// GitHub token for authentication.
    /// Environment: GH_TOKEN or GITHUB_TOKEN
    /// Note: Consumers should read this value once and avoid long-lived references.
    /// The value is cleared after initial consumption via <see cref="ConsumeGitHubToken"/>.
    /// </summary>
    public string? GitHubToken { get; set; }

    /// <summary>
    /// Reads and clears <see cref="ApiKey"/> so it does not persist on the managed heap.
    /// This is a one-shot read; subsequent calls return null.
    /// </summary>
    public string? ConsumeApiKey()
    {
        var key = ApiKey;
        ApiKey = null;
        return key;
    }

    /// <summary>
    /// Reads and clears <see cref="GitHubToken"/> so it does not persist on the managed heap.
    /// This is a one-shot read; subsequent calls return null.
    /// </summary>
    public string? ConsumeGitHubToken()
    {
        var token = GitHubToken;
        GitHubToken = null;
        return token;
    }

    /// <summary>
    /// Get the default model for the current provider.
    /// </summary>
    public string DefaultModel => UseOpenAi ? DefaultOpenAiModel : DefaultCopilotModel;

    /// <summary>
    /// Get the effective model name.
    /// </summary>
    public string GetEffectiveModel(string? overrideModel = null)
    {
        if (!string.IsNullOrEmpty(overrideModel)) return overrideModel;
        if (!string.IsNullOrEmpty(Model)) return Model;
        return DefaultModel;
    }

    /// <summary>
    /// Get the request timeout as TimeSpan.
    /// </summary>
    public TimeSpan RequestTimeout => TimeSpan.FromSeconds(TimeoutSeconds);

    /// <summary>
    /// Load options from environment variables.
    /// Call this at startup before binding to DI.
    /// </summary>
    public static SdkChatOptions FromEnvironment()
    {
        var useOpenAi = Environment.GetEnvironmentVariable("SDK_CLI_USE_OPENAI");
        var debug = Environment.GetEnvironmentVariable("SDK_CLI_DEBUG");
        var timeoutStr = Environment.GetEnvironmentVariable("SDK_CLI_TIMEOUT");

        return new SdkChatOptions
        {
            UseOpenAi = string.Equals(useOpenAi, "true", StringComparison.OrdinalIgnoreCase) ||
                        string.Equals(useOpenAi, "1", StringComparison.OrdinalIgnoreCase),
            Endpoint = Environment.GetEnvironmentVariable("OPENAI_ENDPOINT"),
            ApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY"),
            Model = Environment.GetEnvironmentVariable("SDK_CLI_MODEL"),
            DebugEnabled = string.Equals(debug, "true", StringComparison.OrdinalIgnoreCase) ||
                           string.Equals(debug, "1", StringComparison.OrdinalIgnoreCase),
            DebugDirectory = Environment.GetEnvironmentVariable("SDK_CLI_DEBUG_DIR"),
            TimeoutSeconds = int.TryParse(timeoutStr, out var timeout) ? timeout : DefaultTimeoutSeconds,
            MaxAcpSessions = int.TryParse(Environment.GetEnvironmentVariable("SDK_CLI_ACP_MAX_SESSIONS"), out var maxSessions) ? maxSessions : DefaultMaxAcpSessions,
            CopilotCliPath = Environment.GetEnvironmentVariable("COPILOT_CLI_PATH") ?? "copilot",
            GitHubToken = Environment.GetEnvironmentVariable("GH_TOKEN")
                       ?? Environment.GetEnvironmentVariable("GITHUB_TOKEN")
        };
    }

    /// <inheritdoc />
    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (UseOpenAi && string.IsNullOrWhiteSpace(ApiKey))
        {
            yield return new ValidationResult(
                "OPENAI_API_KEY is required when UseOpenAi is enabled.",
                [nameof(ApiKey)]);
        }

        if (TimeoutSeconds <= 0)
        {
            yield return new ValidationResult(
                "TimeoutSeconds must be greater than 0.",
                [nameof(TimeoutSeconds)]);
        }

        if (TimeoutSeconds > 3600)
        {
            yield return new ValidationResult(
                "TimeoutSeconds cannot exceed 3600 (1 hour).",
                [nameof(TimeoutSeconds)]);
        }

        if (MaxAcpSessions <= 0)
        {
            yield return new ValidationResult(
                "MaxAcpSessions must be greater than 0.",
                [nameof(MaxAcpSessions)]);
        }
    }
}
