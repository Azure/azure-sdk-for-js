// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Graphs identifier tokens from type signatures for efficient type-reference lookups.
/// </summary>
/// <remarks>
/// Replaces O(N×M) Contains-based scanning with O(total_chars) tokenization + O(min(T,N)) set intersection.
/// An identifier token is a contiguous run of letters, digits, or underscores.
/// </remarks>
public static class SignatureTokenizer
{
    /// <summary>
    /// Graphs all identifier tokens from <paramref name="signature"/> and adds them to <paramref name="tokens"/>.
    /// </summary>
    /// <param name="signature">A type signature, return type, or property type string.</param>
    /// <param name="tokens">The set to accumulate tokens into.</param>
    public static void TokenizeInto(ReadOnlySpan<char> signature, HashSet<string> tokens)
    {
        int start = -1;
        for (int i = 0; i <= signature.Length; i++)
        {
            bool isIdChar = i < signature.Length && IsIdentifierChar(signature[i]);
            if (isIdChar && start < 0)
            {
                start = i;
            }
            else if (!isIdChar && start >= 0)
            {
                // Span<char>.ToString() allocates exactly once per unique token.
                // The HashSet deduplicates, so repeated types (common in large APIs)
                // only pay allocation cost on the first occurrence.
                tokens.Add(signature[start..i].ToString());
                start = -1;
            }
        }
    }

    /// <summary>
    /// Graphs all identifier tokens from <paramref name="signature"/> and adds them to <paramref name="tokens"/>.
    /// Accepts a nullable string for convenience when processing optional fields.
    /// </summary>
    public static void TokenizeInto(string? signature, HashSet<string> tokens)
    {
        if (string.IsNullOrEmpty(signature))
            return;

        TokenizeInto(signature.AsSpan(), tokens);
    }

    private static bool IsIdentifierChar(char c) =>
        char.IsLetterOrDigit(c) || c == '_';
}
