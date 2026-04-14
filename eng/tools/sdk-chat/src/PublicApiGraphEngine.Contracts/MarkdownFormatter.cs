// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Formats an <see cref="IApiIndex"/> as a Markdown API reference document.
/// </summary>
public static class MarkdownFormatter
{
    /// <summary>
    /// Produces a Markdown API reference for the given API index.
    /// Types are grouped by kind (classes, interfaces, simple types) using heuristics:
    /// a type with a callable whose name matches the type name has a constructor and is treated as a class;
    /// a type with callables but no constructor is treated as an interface;
    /// a type with no callables is treated as a simple type (enum or type alias).
    /// </summary>
    public static string Format(IApiIndex index)
    {
        var sb = new StringBuilder();
        var types = index.GetDiagnosticTypes().ToList();
        var topLevel = index.GetTopLevelCallables().ToList();

        // Build a lookup of known type names for cross-linking anchors.
        var knownTypes = new HashSet<string>(StringComparer.Ordinal);
        foreach (var t in types)
            knownTypes.Add(t.Name);

        sb.AppendLine($"# {index.Package} API Reference");
        sb.AppendLine();

        // Classify types using heuristics based on callable membership.
        var classes = new List<DiagnosticTypeInfo>();
        var interfaces = new List<DiagnosticTypeInfo>();
        var simpleTypes = new List<DiagnosticTypeInfo>();

        foreach (var type in types)
        {
            var hasConstructor = type.Callables.Any(c => c.Name == type.Name);
            if (hasConstructor)
                classes.Add(type);
            else if (type.Callables.Count > 0)
                interfaces.Add(type);
            else
                simpleTypes.Add(type);
        }

        // --- Table of Contents ---
        sb.AppendLine("## Table of Contents");
        sb.AppendLine();
        if (classes.Count > 0)
        {
            sb.AppendLine("**Classes**");
            sb.AppendLine();
            foreach (var t in classes)
                sb.AppendLine($"- [{t.Name}](#{ToAnchor(t.Name)})");
            sb.AppendLine();
        }
        if (interfaces.Count > 0)
        {
            sb.AppendLine("**Interfaces**");
            sb.AppendLine();
            foreach (var t in interfaces)
                sb.AppendLine($"- [{t.Name}](#{ToAnchor(t.Name)})");
            sb.AppendLine();
        }
        if (simpleTypes.Count > 0)
        {
            sb.AppendLine("**Types**");
            sb.AppendLine();
            foreach (var t in simpleTypes)
                sb.AppendLine($"- [{t.Name}](#{ToAnchor(t.Name)})");
            sb.AppendLine();
        }
        // ---

        if (classes.Count > 0)
        {
            sb.AppendLine("## Classes");
            sb.AppendLine();
            foreach (var type in classes)
                AppendType(sb, type, knownTypes);
        }

        if (interfaces.Count > 0)
        {
            sb.AppendLine("## Interfaces");
            sb.AppendLine();
            foreach (var type in interfaces)
                AppendType(sb, type, knownTypes);
        }

        if (simpleTypes.Count > 0)
        {
            sb.AppendLine("## Types");
            sb.AppendLine();
            foreach (var type in simpleTypes)
                AppendSimpleType(sb, type);
        }

        if (topLevel.Count > 0)
        {
            sb.AppendLine("## Functions");
            sb.AppendLine();
            AppendCallablesTable(sb, topLevel, knownTypes);
        }

        return sb.ToString();
    }

    private static void AppendType(StringBuilder sb, DiagnosticTypeInfo type, HashSet<string> knownTypes)
    {
        sb.AppendLine($"### {type.Name}");
        sb.AppendLine();

        if (type.IsDeprecated)
        {
            sb.AppendLine("> **Deprecated**");
            sb.AppendLine();
        }

        if (!string.IsNullOrWhiteSpace(type.Doc))
        {
            foreach (var line in type.Doc.Split('\n'))
                sb.AppendLine($"> {line.TrimEnd()}");
            sb.AppendLine();
        }

        var constructors = new List<DiagnosticCallableInfo>();
        var methods = new List<DiagnosticCallableInfo>();
        foreach (var c in type.Callables)
        {
            if (c.Name == type.Name)
                constructors.Add(c);
            else
                methods.Add(c);
        }

        if (constructors.Count > 0)
        {
            sb.AppendLine("#### Constructor");
            sb.AppendLine();
            // Show each overload; omit the table when the constructor takes no parameters.
            foreach (var ctor in constructors)
            {
                if (ctor.ParameterTypes.Count > 0)
                {
                    sb.AppendLine("| Parameter Type | Description |");
                    sb.AppendLine("|----------------|-------------|");
                    foreach (var pt in ctor.ParameterTypes)
                        sb.AppendLine($"| {EscapePipes(LinkType(pt, knownTypes))} | - |");
                    sb.AppendLine();
                }
                else
                {
                    sb.AppendLine("No parameters.");
                    sb.AppendLine();
                }
            }
        }

        if (methods.Count > 0)
        {
            sb.AppendLine("#### Methods");
            sb.AppendLine();
            AppendCallablesTable(sb, methods, knownTypes);
        }

        if (type.Properties.Count > 0)
        {
            sb.AppendLine("#### Properties");
            sb.AppendLine();
            sb.AppendLine("| Property | Type | Description |");
            sb.AppendLine("|----------|------|-------------|");
            foreach (var prop in type.Properties)
            {
                var typeName = prop.TypeName ?? "-";
                var linkedTypeName = EscapePipes(LinkType(typeName, knownTypes));
                sb.AppendLine($"| {EscapePipes(prop.Name)} | {linkedTypeName} | - |");
            }
            sb.AppendLine();
        }
    }

    private static void AppendSimpleType(StringBuilder sb, DiagnosticTypeInfo type)
    {
        sb.AppendLine($"### {type.Name}");
        sb.AppendLine();

        if (type.IsDeprecated)
        {
            sb.AppendLine("> **Deprecated**");
            sb.AppendLine();
        }

        if (!string.IsNullOrWhiteSpace(type.Doc))
        {
            foreach (var line in type.Doc.Split('\n'))
                sb.AppendLine($"> {line.TrimEnd()}");
            sb.AppendLine();
        }
    }

    private static void AppendCallablesTable(StringBuilder sb, IReadOnlyList<DiagnosticCallableInfo> callables, HashSet<string> knownTypes)
    {
        sb.AppendLine("| Method | Parameters | Returns |");
        sb.AppendLine("|--------|------------|---------|");
        foreach (var callable in callables)
        {
            var paramStr = callable.ParameterTypes.Count > 0
                ? string.Join(", ", callable.ParameterTypes.Select(pt => EscapePipes(LinkType(pt, knownTypes))))
                : "-";
            var returnStr = callable.ReturnType is { Length: > 0 } rt
                ? EscapePipes(LinkType(rt, knownTypes))
                : "-";
            sb.AppendLine($"| {callable.Name} | {paramStr} | {returnStr} |");
        }
        sb.AppendLine();
    }

    /// <summary>
    /// Wraps the base type name in a Markdown anchor link if it appears in the known types set.
    /// Preserves generic suffixes (e.g., <c>Array&lt;Foo&gt;</c> links only <c>Foo</c>).
    /// </summary>
    private static string LinkType(string typeName, HashSet<string> knownTypes)
    {
        var baseName = IApiIndex.NormalizeTypeName(typeName);
        if (knownTypes.Contains(baseName))
        {
            var anchor = ToAnchor(baseName);
            return typeName.Replace(baseName, $"[{baseName}](#{anchor})");
        }
        return typeName;
    }

    private static string ToAnchor(string name) =>
        name.ToLowerInvariant();

    /// <summary>Escapes pipe characters for use inside Markdown table cells.</summary>
    private static string EscapePipes(string s) => s.Replace("|", "\\|");
}
