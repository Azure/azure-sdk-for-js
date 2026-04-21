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
        var sawCorruptionAfterObject = false;

        await foreach (var chunk in chunks.WithCancellation(cancellationToken))
        {
            var byteCount = Encoding.UTF8.GetByteCount(chunk);
            var span = buffer.GetSpan(byteCount);
            var written = Encoding.UTF8.GetBytes(chunk, span);
            buffer.Advance(written);

            foreach (var item in ExtractObjects(buffer, deserialize, ref seenAnyItem,
                ignoreNonJsonLinesBeforeFirstObject, ref sawCorruptionAfterObject, isFinalBlock: false))
            {
                yield return item;
            }
        }

        // Final pass to handle any remaining complete object at end of stream
        foreach (var item in ExtractObjects(buffer, deserialize, ref seenAnyItem,
            ignoreNonJsonLinesBeforeFirstObject, ref sawCorruptionAfterObject, isFinalBlock: true))
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
        ref bool sawCorruptionAfterObject,
        bool isFinalBlock)
    {
        var results = new List<T>();
        var data = buffer.WrittenSpan;
        var totalConsumed = 0;
        var isStrictMode = !ignoreNonJsonLinesBeforeFirstObject;

        // If previous chunk ended with corruption detected, and we're in strict mode, throw now
        if (sawCorruptionAfterObject && isStrictMode)
        {
            throw new JsonException(
                "Corrupted data detected between JSON objects across chunk boundary. " +
                "Non-JSON content was found after a valid object in a previous chunk.");
        }

        while (totalConsumed < data.Length)
        {
            var remaining = data[totalConsumed..];

            // Skip non-JSON prefix (whitespace, code fences, preamble text)
            // Only allow skipping non-JSON lines before the first object when the flag is set
            var allowSkipNonJson = !seenAnyItem && ignoreNonJsonLinesBeforeFirstObject;
            var objectStart = FindJsonObjectStart(remaining, allowSkipNonJson);
            if (objectStart < 0)
            {
                // In strict mode, after seeing at least one object, check if
                // the remaining buffer contains non-whitespace characters.
                // If so, this is corruption that may span into the next chunk.
                if (isStrictMode && seenAnyItem && ContainsNonWhitespace(remaining))
                {
                    sawCorruptionAfterObject = true;
                }

                totalConsumed = data.Length;
                break;
            }

            // A valid object start was found; reset the corruption flag
            sawCorruptionAfterObject = false;

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

                // On the final block, a truncated JSON object starting with '{' is an error
                if (isFinalBlock && remaining.Length > 0 && remaining[0] == (byte)'{')
                {
                    throw new JsonException("Truncated JSON object at end of NDJSON stream");
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

        if (isFinalBlock && sawCorruptionAfterObject && isStrictMode)
        {
            throw new JsonException("Corrupt data detected after final JSON object in strict mode.");
        }

        CompactBuffer(buffer, totalConsumed);
        return results;
    }

    /// <summary>
    /// Returns true if the span contains any non-whitespace bytes.
    /// </summary>
    private static bool ContainsNonWhitespace(ReadOnlySpan<byte> data)
    {
        foreach (var b in data)
        {
            if (b != (byte)' ' && b != (byte)'\t' && b != (byte)'\r' && b != (byte)'\n')
            {
                return true;
            }
        }

        return false;
    }

    /// <summary>
    /// Finds the byte offset of the first '{' in the data, skipping whitespace
    /// and optionally skipping non-JSON text lines (code fences, preamble text).
    /// When <paramref name="allowSkipNonJson"/> is false, encountering non-whitespace,
    /// non-'{' content throws a <see cref="JsonException"/>.
    /// </summary>
    private static int FindJsonObjectStart(ReadOnlySpan<byte> data, bool allowSkipNonJson)
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

            // Non-JSON character found
            if (!allowSkipNonJson)
            {
                // Check if there's another JSON object later in the data.
                // If so, this is corrupted text between objects — throw.
                // If not, this is trailing noise after the last object — stop scanning.
                if (data[i..].IndexOf((byte)'{') >= 0)
                {
                    throw new JsonException(
                        $"Unexpected non-JSON content at byte offset {i}: '{(char)b}'. " +
                        "This may indicate corrupted data between JSON objects.");
                }

                return -1;
            }

            // Skip to end of line (handles code fences and preamble text)
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
