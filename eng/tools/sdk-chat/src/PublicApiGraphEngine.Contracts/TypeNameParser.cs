// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Structured representation of a parsed type name, separating the base name
/// from any generic type parameters (e.g., <c>Response&lt;T&gt;</c> → BaseName="Response", GenericParameters=["T"]).
/// </summary>
public readonly record struct ParsedTypeName(string BaseName, IReadOnlyList<string> GenericParameters)
{
    /// <summary>Whether this type has generic parameters.</summary>
    public bool IsGeneric => GenericParameters.Count > 0;
}

/// <summary>
/// Structured representation of a parsed arrow-function type
/// (e.g., <c>(a: string, b: number) =&gt; void</c>).
/// Parameter types are extracted from <c>name: Type</c> pairs; the return type follows <c>=&gt;</c>.
/// </summary>
public readonly record struct ParsedArrowFunction(IReadOnlyList<string> ParameterTypes, string ReturnType);

/// <summary>
/// Bracket-depth-aware parser for type name strings.
/// Replaces ad-hoc <c>IndexOf</c>/<c>Split</c> patterns with structured results
/// that account for nested generics and arrow-function syntax.
/// </summary>
public static class TypeNameParser
{
    /// <summary>
    /// Parses a type name into its base name and generic parameters.
    /// Handles nested generics correctly (e.g., <c>Map&lt;string, List&lt;int&gt;&gt;</c>).
    /// Also handles bracket-style generics (e.g., <c>Dict[str, int]</c>).
    /// </summary>
    public static ParsedTypeName Parse(string name)
    {
        if (string.IsNullOrEmpty(name))
            return new ParsedTypeName(name ?? string.Empty, []);

        var (openChar, closeChar) = FindGenericDelimiters(name);
        if (openChar == '\0')
            return new ParsedTypeName(name, []);

        var openIndex = name.IndexOf(openChar);
        if (openIndex <= 0)
            return new ParsedTypeName(name, []);

        var baseName = name[..openIndex];

        // Find matching close bracket accounting for nesting
        var closeIndex = FindMatchingClose(name, openIndex, openChar, closeChar);
        if (closeIndex < 0)
            return new ParsedTypeName(baseName, []);

        var inner = name[(openIndex + 1)..closeIndex];
        var parameters = SplitAtTopLevel(inner, ',');

        return new ParsedTypeName(baseName, parameters);
    }

    /// <summary>
    /// Attempts to parse an arrow-function type string (TypeScript style).
    /// Returns <c>null</c> if the string is not an arrow function.
    /// </summary>
    /// <example><c>(a: string, b: number) =&gt; void</c> → ParameterTypes=["string","number"], ReturnType="void"</example>
    public static ParsedArrowFunction? TryParseArrowFunction(string name)
    {
        if (string.IsNullOrEmpty(name))
            return null;

        // Arrow function must start with '(' and contain '=>'
        var trimmed = name.AsSpan().Trim();
        if (trimmed.Length == 0 || trimmed[0] != '(')
            return null;

        // Find the matching close paren for the parameter list
        var closeParenIndex = FindMatchingClose(name, name.IndexOf('('), '(', ')');
        if (closeParenIndex < 0)
            return null;

        // Look for '=>' after the closing paren
        var afterParen = name[(closeParenIndex + 1)..].AsSpan();
        var arrowIndex = afterParen.IndexOf("=>".AsSpan(), StringComparison.Ordinal);
        if (arrowIndex < 0)
            return null;

        var returnType = afterParen[(arrowIndex + 2)..].Trim().ToString();
        if (returnType.Length == 0)
            return null;

        // Parse parameter types from the parenthesized section
        var paramSection = name[(name.IndexOf('(') + 1)..closeParenIndex];
        var paramTypes = new List<string>();

        if (paramSection.Trim().Length > 0)
        {
            var paramParts = SplitAtTopLevel(paramSection, ',');
            foreach (var part in paramParts)
            {
                var trimmedPart = part.Trim();
                // Extract type from "name: Type" pattern
                var colonIndex = FindTopLevelColon(trimmedPart);
                var typePart = colonIndex >= 0
                    ? trimmedPart[(colonIndex + 1)..].Trim()
                    : trimmedPart;

                if (typePart.Length > 0)
                    paramTypes.Add(typePart);
            }
        }

        return new ParsedArrowFunction(paramTypes, returnType);
    }

    /// <summary>
    /// Finds the first colon that is not inside brackets/parens (top-level only).
    /// Returns -1 if not found.
    /// </summary>
    private static int FindTopLevelColon(string text)
    {
        int depth = 0;
        for (int i = 0; i < text.Length; i++)
        {
            var c = text[i];
            if (c is '(' or '<' or '[' or '{') depth++;
            else if (c is ')' or '>' or ']' or '}') depth--;
            else if (c == ':' && depth == 0) return i;
        }
        return -1;
    }

    /// <summary>
    /// Determines which generic delimiter style is used in the name.
    /// Returns ('\0', '\0') if no generic delimiters are found.
    /// </summary>
    private static (char open, char close) FindGenericDelimiters(string name)
    {
        // Scan for the first '<' or '[' that appears after at least one identifier character
        for (int i = 0; i < name.Length; i++)
        {
            if (name[i] == '<' && i > 0) return ('<', '>');
            if (name[i] == '[' && i > 0) return ('[', ']');
        }
        return ('\0', '\0');
    }

    /// <summary>
    /// Finds the index of the matching close bracket, accounting for nested brackets.
    /// </summary>
    private static int FindMatchingClose(string text, int openIndex, char openChar, char closeChar)
    {
        int depth = 0;
        for (int i = openIndex; i < text.Length; i++)
        {
            if (text[i] == openChar) depth++;
            else if (text[i] == closeChar)
            {
                depth--;
                if (depth == 0) return i;
            }
        }
        return -1;
    }

    /// <summary>
    /// Splits a string by the given separator, but only at top-level (depth 0 with respect to
    /// brackets, angle brackets, and parentheses).
    /// </summary>
    public static IReadOnlyList<string> SplitAtTopLevel(string text, char separator)
    {
        var results = new List<string>();
        int depth = 0;
        int start = 0;

        for (int i = 0; i < text.Length; i++)
        {
            var c = text[i];
            if (c is '(' or '<' or '[' or '{') depth++;
            else if (c is ')' or '>' or ']' or '}') depth--;
            else if (c == separator && depth == 0)
            {
                results.Add(text[start..i].Trim());
                start = i + 1;
            }
        }

        results.Add(text[start..].Trim());
        return results;
    }
}
