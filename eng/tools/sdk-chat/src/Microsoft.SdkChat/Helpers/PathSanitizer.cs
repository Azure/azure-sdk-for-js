// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Buffers;

namespace Microsoft.SdkChat.Helpers;

/// <summary>Span-based path sanitization for cross-platform safety.</summary>
public static class PathSanitizer
{
    // Pre-computed lookup table for invalid filename characters
    private static readonly SearchValues<char> InvalidFileNameChars =
        SearchValues.Create(Path.GetInvalidFileNameChars());

    // Additional characters to sanitize for cross-platform compatibility
    private static readonly SearchValues<char> AdditionalInvalidChars =
        SearchValues.Create([':', ' ']);

    public static string SanitizeFileName(string? name)
    {
        if (string.IsNullOrEmpty(name)) return "Sample";

        // Fast path: if no invalid characters, return original
        if (!ContainsInvalidChar(name.AsSpan()))
            return name;

        // Slow path: replace invalid characters
        return string.Create(name.Length, name, static (span, src) =>
        {
            for (var i = 0; i < src.Length; i++)
            {
                var c = src[i];
                span[i] = IsInvalidFileNameChar(c) ? '_' : c;
            }
        });
    }

    /// <summary>Sanitizes a relative path, blocking traversal attacks.</summary>
    public static string SanitizeFilePath(string? path, string expectedExtension)
    {
        if (string.IsNullOrEmpty(path)) return $"Sample{expectedExtension}";

        var normalized = path.Replace('\\', '/');
        var parts = normalized.Split('/', StringSplitOptions.RemoveEmptyEntries);

        if (parts.Length is 0) return $"Sample{expectedExtension}";

        var sanitizedParts = new string[parts.Length];
        var validPartCount = 0;

        for (var i = 0; i < parts.Length; i++)
        {
            var part = parts[i];

            // Explicitly block path traversal attempts - ".." could escape output directory
            if (part == ".." || part == ".")
                continue;

            sanitizedParts[validPartCount++] = SanitizeFileName(part);
        }

        if (validPartCount == 0) return $"Sample{expectedExtension}";

        var finalParts = sanitizedParts[..validPartCount];
        var result = string.Join(Path.DirectorySeparatorChar, finalParts);

        if (!result.EndsWith(expectedExtension, StringComparison.OrdinalIgnoreCase))
        {
            var lastPart = finalParts[^1];
            var dotIndex = lastPart.LastIndexOf('.');
            if (dotIndex > 0)
            {
                finalParts[^1] = lastPart[..dotIndex] + expectedExtension;
                result = string.Join(Path.DirectorySeparatorChar, finalParts);
            }
            else
            {
                result += expectedExtension;
            }
        }

        return result;
    }

    private static bool ContainsInvalidChar(ReadOnlySpan<char> span)
    {
        return span.ContainsAny(InvalidFileNameChars) || span.ContainsAny(AdditionalInvalidChars);
    }

    private static bool IsInvalidFileNameChar(char c)
    {
        return InvalidFileNameChars.Contains(c) || c == ':' || c == ' ';
    }
}
