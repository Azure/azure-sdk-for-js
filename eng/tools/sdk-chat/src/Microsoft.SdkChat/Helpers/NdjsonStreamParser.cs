// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Buffers;
using System.Runtime.CompilerServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization.Metadata;

namespace Microsoft.SdkChat.Helpers;

/// <summary>
/// NDJSON stream parser that uses <see cref="Utf8JsonReader"/> for JSON boundary detection.
/// </summary>
public static class NdjsonStreamParser
{
    /// <summary>
    /// Maximum size of a single JSON object in bytes (1MB).
    /// Prevents memory exhaustion from malformed AI responses or attacks.
    /// </summary>
    private const int MaxObjectSizeBytes = 1024 * 1024;

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
        var buffer = new ArrayBufferWriter<byte>();
        var seenAnyItem = false;

        await foreach (var chunk in chunks.WithCancellation(cancellationToken))
        {
            var byteCount = Encoding.UTF8.GetByteCount(chunk);
            var span = buffer.GetSpan(byteCount);
            var written = Encoding.UTF8.GetBytes(chunk, span);
            buffer.Advance(written);

            foreach (var item in ExtractObjects(buffer, deserialize, ref seenAnyItem,
                ignoreNonJsonLinesBeforeFirstObject, isFinalBlock: false))
            {
                yield return item;
            }
        }

        // Final pass to handle any remaining complete object at end of stream
        foreach (var item in ExtractObjects(buffer, deserialize, ref seenAnyItem,
            ignoreNonJsonLinesBeforeFirstObject, isFinalBlock: true))
        {
            yield return item;
        }
    }

    /// <summary>
    /// Extracts zero or more complete JSON objects from the buffer, compacting consumed data.
    /// </summary>
    private static List<T> ExtractObjects<T>(
        ArrayBufferWriter<byte> buffer,
        Func<string, T?> deserialize,
        ref bool seenAnyItem,
        bool ignoreNonJsonLinesBeforeFirstObject,
        bool isFinalBlock)
    {
        var results = new List<T>();
        var data = buffer.WrittenSpan;
        var totalConsumed = 0;

        while (totalConsumed < data.Length)
        {
            var remaining = data[totalConsumed..];

            // Skip non-JSON prefix (whitespace, code fences, preamble text)
            var objectStart = FindJsonObjectStart(remaining);
            if (objectStart < 0)
            {
                totalConsumed = data.Length;
                break;
            }

            totalConsumed += objectStart;
            remaining = data[totalConsumed..];

            // Use Utf8JsonReader to find the boundary of a complete JSON object
            var consumed = TryReadCompleteObject(remaining, isFinalBlock);
            if (consumed < 0)
            {
                // No complete object yet; check if the incomplete object exceeds the size limit
                if (remaining.Length > MaxObjectSizeBytes)
                {
                    throw new InvalidOperationException(
                        $"JSON object exceeded maximum size of {MaxObjectSizeBytes / 1024}KB. " +
                        "This may indicate a malformed AI response or malicious input.");
                }

                break; // need more data
            }

            var jsonText = Encoding.UTF8.GetString(remaining[..consumed]);
            totalConsumed += consumed;

            if (TryDeserialize(jsonText, deserialize, out var item))
            {
                seenAnyItem = true;
                results.Add(item);
            }
        }

        CompactBuffer(buffer, totalConsumed);
        return results;
    }

    /// <summary>
    /// Finds the byte offset of the first '{' in the data, skipping whitespace,
    /// code fence lines, and other non-JSON text lines.
    /// </summary>
    private static int FindJsonObjectStart(ReadOnlySpan<byte> data)
    {
        var i = 0;
        while (i < data.Length)
        {
            var b = data[i];

            if (b == (byte)'{')
            {
                return i;
            }

            // Skip whitespace
            if (b == (byte)' ' || b == (byte)'\t' || b == (byte)'\r' || b == (byte)'\n')
            {
                i++;
                continue;
            }

            // Non-JSON character: skip to end of line (handles code fences and preamble text)
            while (i < data.Length && data[i] != (byte)'\n')
            {
                i++;
            }

            if (i < data.Length)
            {
                i++; // skip the newline
            }
        }

        return -1;
    }

    /// <summary>
    /// Uses <see cref="Utf8JsonReader"/> to determine if <paramref name="data"/> starts
    /// with a complete JSON object. Returns the number of bytes consumed, or -1 if
    /// the object is incomplete.
    /// </summary>
    private static int TryReadCompleteObject(ReadOnlySpan<byte> data, bool isFinalBlock)
    {
        var reader = new Utf8JsonReader(data, isFinalBlock, default);
        try
        {
            if (!reader.Read() || reader.TokenType != JsonTokenType.StartObject)
            {
                return -1;
            }

            if (!reader.TrySkip())
            {
                return -1;
            }

            return (int)reader.BytesConsumed;
        }
        catch (JsonException)
        {
            return -1;
        }
    }

    /// <summary>
    /// Removes the first <paramref name="consumed"/> bytes from the buffer by
    /// shifting remaining data to the front.
    /// </summary>
    private static void CompactBuffer(ArrayBufferWriter<byte> buffer, int consumed)
    {
        if (consumed <= 0)
        {
            return;
        }

        var remaining = buffer.WrittenCount - consumed;
        if (remaining > 0)
        {
            var data = buffer.WrittenSpan;
            var leftover = data[consumed..].ToArray();
            buffer.Clear();
            var span = buffer.GetSpan(leftover.Length);
            leftover.CopyTo(span);
            buffer.Advance(leftover.Length);
        }
        else
        {
            buffer.Clear();
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
