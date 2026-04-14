// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using System.Text.Json.Serialization.Metadata;
using Microsoft.SdkChat.Models;
using Microsoft.SdkChat.Services;
using Moq;

namespace Microsoft.SdkChat.Tests.Mocks;

/// <summary>
/// Factory for creating mock AI services using Moq.
/// Prefer using these factory methods over manual mock implementations.
/// </summary>
public static class MockAiServiceFactory
{
    /// <summary>
    /// Creates a mock that returns the specified samples when StreamItemsAsync is called.
    /// </summary>
    public static Mock<IAiService> CreateWithSamples<T>(params T[] samples)
    {
        var mock = new Mock<IAiService>();

        mock.SetupGet(x => x.IsUsingOpenAi).Returns(false);
        mock.Setup(x => x.GetEffectiveModel(It.IsAny<string?>())).Returns("mock-model");

        mock.Setup(x => x.StreamItemsAsync(
                It.IsAny<string>(),
                It.IsAny<IAsyncEnumerable<string>>(),
                It.IsAny<JsonTypeInfo<T>>(),
                It.IsAny<string?>(),
                It.IsAny<ContextInfo?>(),
                It.IsAny<AiPromptReadyCallback?>(),
                It.IsAny<AiStreamCompleteCallback?>(),
                It.IsAny<CancellationToken>()))
            .Returns(samples.ToAsyncEnumerable());

        return mock;
    }

    /// <summary>
    /// Creates a mock that throws the specified exception.
    /// </summary>
    public static Mock<IAiService> CreateThatThrows<T>(Exception exception)
    {
        var mock = new Mock<IAiService>();

        mock.SetupGet(x => x.IsUsingOpenAi).Returns(false);
        mock.Setup(x => x.GetEffectiveModel(It.IsAny<string?>())).Returns("mock-model");

        mock.Setup(x => x.StreamItemsAsync(
                It.IsAny<string>(),
                It.IsAny<IAsyncEnumerable<string>>(),
                It.IsAny<JsonTypeInfo<T>>(),
                It.IsAny<string?>(),
                It.IsAny<ContextInfo?>(),
                It.IsAny<AiPromptReadyCallback?>(),
                It.IsAny<AiStreamCompleteCallback?>(),
                It.IsAny<CancellationToken>()))
            .Throws(exception);

        return mock;
    }

    /// <summary>
    /// Creates a mock with verification capabilities.
    /// </summary>
    public static Mock<IAiService> CreateVerifiable<T>(params T[] samples)
    {
        var mock = CreateWithSamples(samples);
        mock.Setup(x => x.StreamItemsAsync(
                It.IsAny<string>(),
                It.IsAny<IAsyncEnumerable<string>>(),
                It.IsAny<JsonTypeInfo<T>>(),
                It.IsAny<string?>(),
                It.IsAny<ContextInfo?>(),
                It.IsAny<AiPromptReadyCallback?>(),
                It.IsAny<AiStreamCompleteCallback?>(),
                It.IsAny<CancellationToken>()))
            .Returns(samples.ToAsyncEnumerable())
            .Verifiable();

        return mock;
    }
}

/// <summary>
/// Simple mock AI service for testing. Returns configured samples.
/// 
/// NOTE: For new tests, prefer using <see cref="MockAiServiceFactory"/> with Moq
/// for better verification capabilities and less boilerplate.
/// 
/// This class is retained for backward compatibility with existing tests.
/// </summary>
public class MockAiService : IAiService
{
    private readonly List<object> _samplesToReturn = [];
    private Exception? _exceptionToThrow;
    private TimeSpan _delayBeforeResponse = TimeSpan.Zero;

    public bool IsUsingOpenAi => false;

    public string GetEffectiveModel(string? modelOverride = null) => modelOverride ?? "mock-model";

    public string? LastSystemPrompt { get; private set; }
    public string? LastUserPrompt { get; private set; }
    public int CallCount { get; private set; }

    /// <summary>
    /// Configure samples to return when StreamItemsAsync is called.
    /// </summary>
    public void SetSamplesToReturn<T>(params T[] samples)
    {
        _samplesToReturn.Clear();
        _samplesToReturn.AddRange(samples.Cast<object>());
    }

    /// <summary>
    /// Configure an exception to throw.
    /// </summary>
    public void SetExceptionToThrow(Exception ex)
    {
        _exceptionToThrow = ex;
    }

    /// <summary>
    /// Configure a delay before returning responses (for cancellation testing).
    /// </summary>
    public void SetDelayBeforeResponse(TimeSpan delay)
    {
        _delayBeforeResponse = delay;
    }

    public async IAsyncEnumerable<T> StreamItemsAsync<T>(
        string systemPrompt,
        IAsyncEnumerable<string> userPromptStream,
        JsonTypeInfo<T> jsonTypeInfo,
        string? model = null,
        ContextInfo? contextInfo = null,
        AiPromptReadyCallback? onPromptReady = null,
        AiStreamCompleteCallback? onStreamComplete = null,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        CallCount++;
        LastSystemPrompt = systemPrompt;

        // Materialize user prompt
        var promptBuilder = new System.Text.StringBuilder();
        await foreach (var chunk in userPromptStream.WithCancellation(cancellationToken))
        {
            promptBuilder.Append(chunk);
        }
        LastUserPrompt = promptBuilder.ToString();

        // Apply configured delay (for cancellation testing)
        if (_delayBeforeResponse > TimeSpan.Zero)
        {
            await Task.Delay(_delayBeforeResponse, cancellationToken);
        }

        // Invoke async callback for prompt ready
        var promptChars = systemPrompt.Length + LastUserPrompt.Length;
        if (onPromptReady != null)
        {
            await onPromptReady(new AiPromptReadyEventArgs(promptChars, promptChars / 4));
        }

        if (_exceptionToThrow != null)
        {
            throw _exceptionToThrow;
        }

        // Yield configured samples
        foreach (var sample in _samplesToReturn)
        {
            if (sample is T typedSample)
            {
                await Task.Yield();
                yield return typedSample;
            }
        }

        // Invoke async callback for stream complete
        if (onStreamComplete != null)
        {
            await onStreamComplete(new AiStreamCompleteEventArgs(1000, 250, TimeSpan.FromMilliseconds(1)));
        }
    }

    public ValueTask DisposeAsync() => ValueTask.CompletedTask;
}

/// <summary>
/// Extension methods for async enumerable conversion.
/// </summary>
internal static class AsyncEnumerableExtensions
{
    public static async IAsyncEnumerable<T> ToAsyncEnumerable<T>(this IEnumerable<T> source)
    {
        foreach (var item in source)
        {
            await Task.Yield();
            yield return item;
        }
    }
}

