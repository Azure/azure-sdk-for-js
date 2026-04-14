// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Microsoft.SdkChat.Helpers;

/// <summary>
/// NDJSON stream parser with brace-depth tracking.
/// </summary>
public static class NdjsonStreamParser
{
    /// <summary>
    /// Maximum size of a single JSON object in characters (1MB).
    /// Prevents memory exhaustion from malformed AI responses or attacks.
    /// </summary>
    private const int MaxObjectSizeChars = 1024 * 1024;

    /// <summary>
    /// Parse NDJSON stream using source-generated JSON type info (AOT-compatible).
    /// </summary>
    public static async IAsyncEnumerable<T> ParseAsync<T>(
        IAsyncEnumerable<string> chunks,
        JsonTypeInfo<T> jsonTypeInfo,
        bool ignoreNonJsonLinesBeforeFirstObject = true,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
        await foreach (var item in ParseCoreAsync(chunks, json => JsonSerializer.Deserialize(json, jsonTypeInfo),
            ignoreNonJsonLinesBeforeFirstObject, cancellationToken))
        {
            yield return item;
        }
    }

    /// <summary>
    /// Parse NDJSON stream using JsonSerializerOptions (reflection-based fallback).
    /// </summary>
    public static async IAsyncEnumerable<T> ParseAsync<T>(
        IAsyncEnumerable<string> chunks,
        JsonSerializerOptions jsonOptions,
        bool ignoreNonJsonLinesBeforeFirstObject = true,
        [EnumeratorCancellation] CancellationToken cancellationToken = default)
    {
#pragma warning disable IL2026, IL3050 // Reflection fallback for non-AOT scenarios
        await foreach (var item in ParseCoreAsync(chunks, json => JsonSerializer.Deserialize<T>(json, jsonOptions),
            ignoreNonJsonLinesBeforeFirstObject, cancellationToken))
        {
            yield return item;
        }
#pragma warning restore IL2026, IL3050
    }

    private static async IAsyncEnumerable<T> ParseCoreAsync<T>(
        IAsyncEnumerable<string> chunks,
        Func<string, T?> deserialize,
        bool ignoreNonJsonLinesBeforeFirstObject,
        [EnumeratorCancellation] CancellationToken cancellationToken)
    {
        var objectBuilder = new StringBuilder();
        var seenAnyItem = false;
        var braceDepth = 0;
        var inString = false;
        var escapeNext = false;
        var inCodeFence = false;

        await foreach (var chunk in chunks.WithCancellation(cancellationToken))
        {
            foreach (var ch in chunk)
            {
                if (ch == '\r')
                {
                    continue; // normalize CRLF to LF
                }

                if (braceDepth == 0 && objectBuilder.Length is 0)
                {
                    // Handle code fence toggling (```json ... ```)
                    if (ch == '`')
                    {
                        inCodeFence = !inCodeFence;
                        continue;
                    }

                    // While inside a code fence line or consuming fence chars, skip
                    if (inCodeFence && ch != '\n')
                    {
                        continue;
                    }

                    // Newline resets code fence state (fences are line-scoped)
                    if (ch == '\n')
                    {
                        inCodeFence = false;
                        continue;
                    }

                    if (char.IsWhiteSpace(ch))
                    {
                        continue;
                    }

                    if (ch != '{')
                    {
                        if (ignoreNonJsonLinesBeforeFirstObject && !seenAnyItem)
                        {
                            continue;
                        }
                        // After we've seen objects, non-JSON is an error
                        // But be lenient - just skip it
                        continue;
                    }
                }

                objectBuilder.Append(ch);

                // Guard against memory exhaustion from malformed responses
                if (objectBuilder.Length > MaxObjectSizeChars)
                {
                    throw new InvalidOperationException(
                        $"JSON object exceeded maximum size of {MaxObjectSizeChars / 1024}KB. " +
                        "This may indicate a malformed AI response or malicious input.");
                }

                // Track brace depth and string state for proper JSON boundary detection
                if (escapeNext)
                {
                    escapeNext = false;
                    continue;
                }

                if (ch == '\\' && inString)
                {
                    escapeNext = true;
                    continue;
                }

                if (ch == '"' && !escapeNext)
                {
                    inString = !inString;
                    continue;
                }

                if (!inString)
                {
                    if (ch == '{')
                    {
                        braceDepth++;
                    }
                    else if (ch == '}')
                    {
                        braceDepth--;

                        if (braceDepth == 0)
                        {
                            var jsonText = objectBuilder.ToString().Trim();
                            objectBuilder.Clear();

                            if (TryDeserialize(jsonText, deserialize, out var item))
                            {
                                seenAnyItem = true;
                                yield return item;
                            }
                        }
                    }
                }
            }
        }

        if (objectBuilder.Length > 0)
        {
            var remaining = objectBuilder.ToString().Trim();
            if (remaining.Length > 0 && remaining.StartsWith('{'))
            {
                if (TryDeserialize(remaining, deserialize, out var item))
                {
                    yield return item;
                }
            }
        }
    }

    private static bool TryDeserialize<T>(string json, Func<string, T?> deserialize, out T item)
    {
        if (string.IsNullOrWhiteSpace(json))
        {
            item = default!;
            return false;
        }

        try
        {
            var parsed = deserialize(json);
            if (parsed is not null)
            {
                item = parsed;
                return true;
            }
        }
        catch (JsonException)
        {
        }

        item = default!;
        return false;
    }
}
