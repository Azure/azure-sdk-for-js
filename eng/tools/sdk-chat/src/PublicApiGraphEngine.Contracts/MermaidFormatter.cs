// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Formats an <see cref="IApiIndex"/> as a Mermaid <c>classDiagram</c> string.
/// Nodes represent public types; edges represent type references found in callable signatures.
/// </summary>
public static class MermaidFormatter
{
    /// <summary>
    /// Produces a Mermaid <c>classDiagram</c> for the given API index.
    /// </summary>
    public static string Format(IApiIndex index)
    {
        var types = index.GetDiagnosticTypes().ToList();
        if (types.Count is 0)
            return "```mermaid\nclassDiagram\n```\n";

        // Build a lookup of known type names (normalized — generic suffix stripped) for relationship detection.
        var knownNormalized = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var t in types)
            knownNormalized.Add(IApiIndex.NormalizeTypeName(t.Name));

        var sb = new StringBuilder();
        sb.AppendLine("```mermaid");
        sb.AppendLine("classDiagram");

        // --- Emit class blocks ---
        foreach (var type in types)
        {
            var safeName = SanitizeClassName(IApiIndex.NormalizeTypeName(type.Name));
            sb.AppendLine($"    class {safeName} {{");

            foreach (var callable in type.Callables)
            {
                var paramList = string.Join(", ", callable.ParameterTypes.Select(SanitizeTypeName));
                var returnTypeSuffix = callable.ReturnType is { Length: > 0 } rt
                    ? " " + SanitizeTypeName(rt)
                    : string.Empty;
                sb.AppendLine($"        +{SanitizeIdentifier(callable.Name)}({paramList}){returnTypeSuffix}");
            }

            if (type.Properties.Any())
            {
                foreach (var prop in type.Properties)
                {
                    sb.AppendLine($"        +{SanitizeIdentifier(prop.Name)} {SanitizeTypeName(prop.TypeName ?? "unknown")}");
                }
            }

            sb.AppendLine("    }");
        }

        // --- Emit relationships ---
        var emitted = new HashSet<string>(StringComparer.Ordinal);

        foreach (var type in types)
        {
            var fromName = IApiIndex.NormalizeTypeName(type.Name);
            var safeFrom = SanitizeClassName(fromName);

            foreach (var callable in type.Callables)
            {
                foreach (var paramType in callable.ParameterTypes)
                {
                    var normalized = IApiIndex.NormalizeTypeName(paramType);
                    if (!knownNormalized.Contains(normalized))
                        continue;
                    if (StringComparer.OrdinalIgnoreCase.Equals(normalized, fromName))
                        continue;

                    var safeTo = SanitizeClassName(normalized);
                    var edge = $"{safeFrom} --> {safeTo}";
                    if (emitted.Add(edge))
                        sb.AppendLine($"    {edge} : uses");
                }
            }

            foreach (var prop in type.Properties)
            {
                if (prop.TypeName is null) continue;
                var normalized = IApiIndex.NormalizeTypeName(prop.TypeName);
                if (!knownNormalized.Contains(normalized))
                    continue;
                if (StringComparer.OrdinalIgnoreCase.Equals(normalized, fromName))
                    continue;

                var safeTo = SanitizeClassName(normalized);
                var edge = $"{safeFrom} --> {safeTo}";
                if (emitted.Add(edge))
                    sb.AppendLine($"    {edge} : has");
            }
        }

        sb.AppendLine("```");
        return sb.ToString();
    }

    /// <summary>
    /// Sanitizes a type name for use as a Mermaid class identifier.
    /// Uses <see cref="TypeNameParser"/> to structurally strip generic parameters,
    /// then replaces non-alphanumeric characters with underscores.
    /// </summary>
    private static string SanitizeClassName(string name)
    {
        // Use structured parser to extract the base name without generic parameters
        var parsed = TypeNameParser.Parse(name);
        var baseName = parsed.BaseName;

        var sb = new StringBuilder(baseName.Length);
        var lastWasUnderscore = false;
        foreach (var c in baseName)
        {
            if (char.IsLetterOrDigit(c))
            {
                sb.Append(c);
                lastWasUnderscore = false;
            }
            else if (!lastWasUnderscore && sb.Length > 0)
            {
                sb.Append('_');
                lastWasUnderscore = true;
            }
        }

        // Trim trailing underscore
        if (sb.Length > 0 && sb[^1] == '_')
            sb.Length--;

        return sb.Length > 0 ? sb.ToString() : "Unknown";
    }

    /// <summary>
    /// Produces a human-readable type label for use inside Mermaid class boxes.
    /// Uses <see cref="TypeNameParser"/> to structurally parse arrow-function types
    /// instead of regex and string splitting.
    /// </summary>
    private static string SanitizeTypeName(string name)
    {
        // Try structured arrow-function parsing first
        var arrowFunc = TypeNameParser.TryParseArrowFunction(name);
        string result;
        if (arrowFunc is { } af)
        {
            var paramStr = string.Join("_", af.ParameterTypes
                .Select(t => SanitizeClassName(IApiIndex.NormalizeTypeName(t))));

            var retStr = SanitizeClassName(IApiIndex.NormalizeTypeName(af.ReturnType));
            result = paramStr.Length > 0
                ? $"fn_{paramStr}_to_{retStr}"
                : $"fn_to_{retStr}";
        }
        else
        {
            result = name;
        }

        // Replace characters that break Mermaid class-box syntax.
        return result
            .Replace("<", "~")
            .Replace(">", "~")
            .Replace("{", "(")
            .Replace("}", ")")
            .Replace("|", " or ")
            .Replace(":", " ")
            .Replace(";", " ")
            .Replace("\"", "'");
    }

    /// <summary>
    /// Sanitizes a method/callable name, preserving letters, digits, and underscores.
    /// </summary>
    private static string SanitizeIdentifier(string name)
    {
        var chars = new char[name.Length];
        for (var i = 0; i < name.Length; i++)
        {
            var c = name[i];
            chars[i] = char.IsLetterOrDigit(c) || c is '_' ? c : '_';
        }
        return new string(chars);
    }
}
