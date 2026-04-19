// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.TypeScript.Generators;

/// <summary>
/// Lightweight parser for TypeScript interface declarations in models.ts.
/// Only handles the subset of syntax used in wire-contract model definitions.
/// </summary>
internal static class TypeScriptInterfaceParser
{
    internal sealed record TsInterface(string Name, List<TsProperty> Properties);

    internal sealed record TsProperty(string Name, string TypeText, bool IsOptional, string? DocComment);

    /// <summary>
    /// Parses all exported interface declarations from TypeScript source text.
    /// </summary>
    internal static List<TsInterface> Parse(string source)
    {
        var interfaces = new List<TsInterface>();
        var lines = source.Split('\n');
        int i = 0;

        while (i < lines.Length)
        {
            var line = lines[i].Trim();

            // Match: export interface FooInfo {
            if (line.StartsWith("export interface ", StringComparison.Ordinal) && line.EndsWith("{", StringComparison.Ordinal))
            {
                var name = line["export interface ".Length..].TrimEnd('{', ' ', '{');
                name = name.Trim();
                i++;

                var properties = new List<TsProperty>();
                string? pendingDoc = null;

                while (i < lines.Length)
                {
                    var propLine = lines[i].Trim();
                    i++;

                    // End of interface
                    if (propLine == "}" || propLine == "};")
                        break;

                    // JSDoc single-line: /** ... */
                    if (propLine.StartsWith("/**", StringComparison.Ordinal))
                    {
                        pendingDoc = ExtractDocComment(propLine, lines, ref i);
                        continue;
                    }

                    // Skip blank lines, comments, readonly keyword lines
                    if (string.IsNullOrWhiteSpace(propLine) || propLine.StartsWith("//", StringComparison.Ordinal))
                        continue;

                    var prop = ParseProperty(propLine);
                    if (prop is not null)
                    {
                        properties.Add(prop with { DocComment = pendingDoc });
                        pendingDoc = null;
                    }
                    else
                    {
                        pendingDoc = null;
                    }
                }

                interfaces.Add(new TsInterface(name, properties));
            }
            else
            {
                i++;
            }
        }

        return interfaces;
    }

    private static TsProperty? ParseProperty(string line)
    {
        // Strip inline comments: // ...
        var commentIdx = line.IndexOf("//", StringComparison.Ordinal);
        if (commentIdx >= 0) line = line[..commentIdx];

        // Remove trailing semicolons and commas
        line = line.TrimEnd(';', ',', ' ').Trim();
        if (string.IsNullOrEmpty(line)) return null;

        // Skip "readonly" prefix
        if (line.StartsWith("readonly ", StringComparison.Ordinal))
            line = line["readonly ".Length..].Trim();

        // Find the colon that separates name from type
        // Handle optional: name?: type
        int colonIndex = line.IndexOf(':');
        if (colonIndex < 0) return null;

        var namePart = line[..colonIndex].Trim();
        var typePart = line[(colonIndex + 1)..].Trim();

        bool isOptional = namePart.EndsWith("?", StringComparison.Ordinal);
        if (isOptional) namePart = namePart[..^1].Trim();

        if (string.IsNullOrEmpty(namePart) || string.IsNullOrEmpty(typePart))
            return null;

        return new TsProperty(namePart, typePart, isOptional, null);
    }

    private static string ExtractDocComment(string firstLine, string[] lines, ref int i)
    {
        var sb = new System.Text.StringBuilder();

        // Single-line: /** text */
        if (firstLine.Contains("*/", StringComparison.Ordinal))
        {
            var text = firstLine
                .Replace("/**", "", StringComparison.Ordinal)
                .Replace("*/", "", StringComparison.Ordinal)
                .Trim();
            return text;
        }

        // Multi-line
        var first = firstLine.Replace("/**", "", StringComparison.Ordinal).Trim();
        if (!string.IsNullOrEmpty(first)) sb.Append(first);

        while (i < lines.Length)
        {
            var docLine = lines[i].Trim();
            i++;

            if (docLine.Contains("*/", StringComparison.Ordinal))
            {
                var last = docLine.Replace("*/", "", StringComparison.Ordinal).TrimStart('*', ' ').Trim();
                if (!string.IsNullOrEmpty(last))
                {
                    if (sb.Length > 0) sb.Append(' ');
                    sb.Append(last);
                }
                break;
            }

            var mid = docLine.TrimStart('*', ' ').Trim();
            if (!string.IsNullOrEmpty(mid))
            {
                if (sb.Length > 0) sb.Append(' ');
                sb.Append(mid);
            }
        }

        return sb.ToString();
    }
}
