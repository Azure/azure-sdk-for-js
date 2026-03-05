// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization.Metadata;
using Microsoft.SdkChat.Models;

namespace Microsoft.SdkChat.Services;

/// <summary>
/// Async callback for prompt ready events.
/// </summary>
public delegate ValueTask AiPromptReadyCallback(AiPromptReadyEventArgs args);

/// <summary>
/// Async callback for stream complete events.
/// </summary>
public delegate ValueTask AiStreamCompleteCallback(AiStreamCompleteEventArgs args);

/// <summary>
/// Interface for AI service operations. Enables mocking for unit tests.
/// </summary>
public interface IAiService : IAsyncDisposable
{
    /// <summary>
    /// Whether using OpenAI-compatible API instead of Copilot.
    /// </summary>
    bool IsUsingOpenAi { get; }

    /// <summary>
    /// Returns the effective model name that will be used for a request, after applying
    /// environment defaults and provider-specific configuration.
    /// </summary>
    string GetEffectiveModel(string? modelOverride = null);

    /// <summary>
    /// Stream AI response and yield parsed items as they complete.
    /// Uses source-generated JSON deserialization via JsonTypeInfo for AOT compatibility.
    /// </summary>
    /// <param name="systemPrompt">The system prompt.</param>
    /// <param name="userPromptStream">Async stream of user prompt chunks.</param>
    /// <param name="jsonTypeInfo">Type info for AOT-safe deserialization.</param>
    /// <param name="model">Optional model override.</param>
    /// <param name="contextInfo">Optional context info for debugging.</param>
    /// <param name="onPromptReady">Async callback invoked when prompt is ready to send.</param>
    /// <param name="onStreamComplete">Async callback invoked when streaming completes.</param>
    /// <param name="cancellationToken">Cancellation token.</param>
    IAsyncEnumerable<T> StreamItemsAsync<T>(
        string systemPrompt,
        IAsyncEnumerable<string> userPromptStream,
        JsonTypeInfo<T> jsonTypeInfo,
        string? model = null,
        ContextInfo? contextInfo = null,
        AiPromptReadyCallback? onPromptReady = null,
        AiStreamCompleteCallback? onStreamComplete = null,
        CancellationToken cancellationToken = default);
}
