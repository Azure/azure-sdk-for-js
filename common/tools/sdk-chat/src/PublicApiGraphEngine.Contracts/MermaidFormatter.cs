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
            return "classDiagram\n";

        // Build a lookup of known type names (normalized — generic suffix stripped) for relationship detection.
        var knownNormalized = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
        foreach (var t in types)
            knownNormalized.Add(IApiIndex.NormalizeTypeName(t.Name));

        var sb = new StringBuilder();
        sb.AppendLine("classDiagram");

        // --- Emit class blocks ---
        foreach (var type in types)
        {
            var safeName = SanitizeName(IApiIndex.NormalizeTypeName(type.Name));
            sb.AppendLine($"    class {safeName} {{");

            foreach (var callable in type.Callables)
            {
                var paramList = string.Join(", ", callable.ParameterTypes.Select(p => SanitizeName(IApiIndex.NormalizeTypeName(p))));
                sb.AppendLine($"        +{SanitizeIdentifier(callable.Name)}({paramList})");
            }

            sb.AppendLine("    }");
        }

        // --- Emit relationships ---
        // Track emitted edges to avoid duplicates.
        var emitted = new HashSet<string>(StringComparer.Ordinal);

        foreach (var type in types)
        {
            var fromName = IApiIndex.NormalizeTypeName(type.Name);
            var safeFrom = SanitizeName(fromName);

            foreach (var callable in type.Callables)
            {
                foreach (var paramType in callable.ParameterTypes)
                {
                    var normalized = IApiIndex.NormalizeTypeName(paramType);

                    // Only emit edges to types within this API surface (skip primitives/externals).
                    if (!knownNormalized.Contains(normalized))
                        continue;

                    // Skip self-references.
                    if (StringComparer.OrdinalIgnoreCase.Equals(normalized, fromName))
                        continue;

                    var safeTo = SanitizeName(normalized);
                    var edge = $"{safeFrom} --> {safeTo}";
                    if (emitted.Add(edge))
                        sb.AppendLine($"    {edge} : uses");
                }
            }
        }

        return sb.ToString();
    }

    /// <summary>
    /// Sanitizes a type name for use as a Mermaid class identifier (alphanumeric + underscore).
    /// </summary>
    private static string SanitizeName(string name)
    {
        var chars = new char[name.Length];
        for (var i = 0; i < name.Length; i++)
        {
            var c = name[i];
            chars[i] = char.IsLetterOrDigit(c) ? c : '_';
        }
        return new string(chars);
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
