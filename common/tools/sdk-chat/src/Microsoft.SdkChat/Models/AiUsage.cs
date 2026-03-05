// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace Microsoft.SdkChat.Models;

/// <summary>
/// Event args when prompt is materialized and ready to send.
/// </summary>
public sealed class AiPromptReadyEventArgs(
    int promptCharacters,
    int estimatedTokens) : EventArgs
{
    public int PromptCharacters { get; } = promptCharacters;
    public int EstimatedTokens { get; } = estimatedTokens;
}

/// <summary>
/// Event args when AI streaming completes.
/// </summary>
public sealed class AiStreamCompleteEventArgs(
    int responseCharacters,
    int estimatedResponseTokens,
    TimeSpan duration = default) : EventArgs
{
    public int ResponseCharacters { get; } = responseCharacters;
    public int EstimatedResponseTokens { get; } = estimatedResponseTokens;
    public TimeSpan Duration { get; } = duration;
}
