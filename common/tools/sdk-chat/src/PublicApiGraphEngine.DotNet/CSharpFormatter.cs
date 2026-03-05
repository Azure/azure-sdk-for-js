// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;
using Microsoft.CodeAnalysis.CSharp;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Formats an ApiIndex as human-readable C# syntax.
/// Supports smart truncation that prioritizes clients and their dependencies.
/// </summary>
public static class CSharpFormatter
{
    /// <summary>
    /// Formats the full API surface.
    /// </summary>
    public static string Format(ApiIndex index) => Format(index, int.MaxValue);

    /// <summary>
    /// Formats with coverage awareness: compact summary of covered ops, full signatures for uncovered.
    /// This provides ~70% token savings while maintaining complete context for generation.
    /// </summary>
    public static string FormatWithCoverage(ApiIndex index, UsageIndex coverage, int maxLength)
    {
        var sb = new StringBuilder(Math.Min(maxLength, 8192));

        var deprecatedOperations = index.GetAllTypes()
            .SelectMany(t => (t.Members ?? [])
                .Where(m => m.Kind == "method" && m.IsDeprecated == true)
                .Select(m => (Client: t.Name, Method: m.Name)))
            .ToHashSet();

        // Partition uncovered ops in a single pass instead of two .Where() calls
        List<UncoveredOperation> deprecatedUncovered = [];
        List<UncoveredOperation> filteredUncovered = [];
        foreach (var op in coverage.UncoveredOperations)
        {
            if (deprecatedOperations.Contains((op.ClientType, op.Operation)))
                deprecatedUncovered.Add(op);
            else
                filteredUncovered.Add(op);
        }

        var filteredCoverage = coverage with { UncoveredOperations = filteredUncovered };

        var uncoveredByClient = CoverageFormatter.AppendCoverageSummary(sb, filteredCoverage);
        if (uncoveredByClient is null)
            return sb.ToString();

        if (deprecatedUncovered.Count > 0)
        {
            sb.AppendLine("// Deprecated API (intentionally excluded from uncovered generation targets):");
            foreach (var op in deprecatedUncovered.OrderBy(o => o.ClientType).ThenBy(o => o.Operation))
            {
                sb.AppendLine($"//   {op.ClientType}.{op.Operation}");
            }
            sb.AppendLine();
        }

        // Cache all types once (avoids double GetAllTypes() call)
        var allTypes = index.GetAllTypes().ToList();
        var allTypeNames = allTypes.Select(t => IApiIndex.NormalizeTypeName(t.Name)).ToHashSet();
        var nsMap = BuildNamespaceMap(index);

        // Find types with uncovered operations and their dependencies
        var typesWithUncovered = allTypes
            .Where(t => uncoveredByClient.ContainsKey(t.Name))
            .ToList();

        HashSet<string> neededTypes = [];
        HashSet<string> reusableDeps = [];
        foreach (var t in typesWithUncovered)
        {
            neededTypes.Add(t.Name);
            t.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var dep in reusableDeps)
                neededTypes.Add(dep);
        }

        // Handle potential duplicate type names (same name in different namespaces)
        var typesByName = new Dictionary<string, TypeInfo>();
        foreach (var t in allTypes)
        {
            typesByName.TryAdd(t.Name, t);
        }
        HashSet<string> includedTypes = [];
        var currentLength = sb.Length;

        // Include types with uncovered operations first, then their dependencies
        var orderedTypes = allTypes
            .Where(t => neededTypes.Contains(t.Name))
            .OrderBy(t => uncoveredByClient.ContainsKey(t.Name) ? 0 : 1)
            .ThenBy(t => t.TruncationPriority)
            .ToList();

        foreach (var type in orderedTypes)
        {
            if (includedTypes.Contains(type.Name))
                continue;

            // Filter members to show only uncovered operations for client types
            var filteredType = type;
            if (uncoveredByClient.TryGetValue(type.Name, out var uncoveredOps))
            {
                // Only include uncovered members
                filteredType = type with
                {
                    Members = type.Members?
                        .Where(m => m.Kind != "method" || uncoveredOps.Contains(m.Name))
                        .ToList() ?? []
                };
            }

            var typeContent = FormatTypesWithNamespace(new[] { filteredType }, nsMap);

            if (currentLength + typeContent.Length > maxLength - 100 && includedTypes.Count > 0)
            {
                sb.AppendLine($"// ... truncated ({orderedTypes.Count - includedTypes.Count} types omitted, budget exceeded)");
                break;
            }

            sb.Append(typeContent);
            currentLength += typeContent.Length;
            includedTypes.Add(type.Name);
        }

        return sb.ToString();
    }

    /// <summary>
    /// Formats with smart truncation to fit within budget.
    /// Prioritizes: Clients → Their dependencies → Options → Enums → Models → Rest
    /// </summary>
    public static string Format(ApiIndex index, int maxLength)
    {
        var sb = new StringBuilder(Math.Min(maxLength, 8192));

        sb.AppendLine($"// {index.Package} - Public API Surface");
        sb.AppendLine();

        // Build type lookup and dependency graph
        var allTypes = index.GetAllTypes().ToList();
        var allTypeNames = allTypes.Select(t => IApiIndex.NormalizeTypeName(t.Name)).ToHashSet();

        // Handle potential duplicate type names (same name in different namespaces)
        var typesByName = new Dictionary<string, TypeInfo>();
        foreach (var t in allTypes)
        {
            // First one wins - typically the more important one is defined first
            typesByName.TryAdd(t.Name, t);
        }

        // Pre-build type→namespace map for O(1) lookups
        var nsMap = BuildNamespaceMap(index);

        // Prioritize types for inclusion
        var orderedTypes = GetPrioritizedTypes(allTypes, allTypeNames);

        // Track what we've included
        HashSet<string> includedTypes = [];
        HashSet<string> reusableDeps = [];
        var currentLength = sb.Length;

        // Include types by priority, pulling in dependencies
        List<TypeInfo> typesToAdd = [];
        foreach (var type in orderedTypes)
        {
            if (includedTypes.Contains(type.Name))
                continue;

            // Calculate size of this type + its dependencies
            typesToAdd.Clear();
            typesToAdd.Add(type);
            type.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var depName in reusableDeps)
            {
                if (!includedTypes.Contains(depName) && typesByName.TryGetValue(depName, out var depType))
                    typesToAdd.Add(depType);
            }

            var typeContent = FormatTypes(typesToAdd, GetNamespace(type, nsMap));

            // Check if we have room
            if (currentLength + typeContent.Length > maxLength - 100 && includedTypes.Count > 0)
            {
                // No room - we're done
                sb.AppendLine($"// ... truncated ({allTypes.Count - includedTypes.Count} types omitted, budget exceeded)");
                break;
            }

            sb.Append(typeContent);
            currentLength += typeContent.Length;

            foreach (var t in typesToAdd)
                includedTypes.Add(t.Name);
        }

        // Add dependency types section
        if (index.Dependencies?.Count > 0)
        {
            sb.AppendLine();
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine("// Dependency Types (from external packages)");
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine();

            foreach (var dep in index.Dependencies)
            {
                if (sb.Length >= maxLength) break;
                if (dep.IsStdlib) continue;

                sb.AppendLine($"// From: {dep.Package}");
                sb.AppendLine();

                foreach (var type in dep.Types ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    FormatType(sb, type, "");
                }
            }
        }

        return sb.ToString();
    }

    /// <summary>
    /// Orders types for smart truncation: clients first with their deps, then options, enums, models.
    /// </summary>
    private static List<TypeInfo> GetPrioritizedTypes(List<TypeInfo> allTypes, HashSet<string> allTypeNames)
    {
        // Pre-compute client set to avoid repeated IsClientType evaluation (avoids N × LINQ .Any())
        var clientNames = new HashSet<string>();
        foreach (var t in allTypes)
        {
            if (t.IsClientType)
                clientNames.Add(t.Name);
        }

        var clients = allTypes.Where(t => clientNames.Contains(t.Name)).ToList();
        HashSet<string> clientDeps = [];
        HashSet<string> reusableDeps = [];
        foreach (var client in clients)
        {
            client.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var dep in reusableDeps)
                clientDeps.Add(dep);
        }

        // Order: Clients → Client deps → Options → Exceptions → Enums → Models → Rest
        return allTypes
            .OrderBy(t =>
            {
                if (clientNames.Contains(t.Name)) return 0;
                if (clientDeps.Contains(t.Name)) return 1;
                return t.TruncationPriority + 2;
            })
            .ThenBy(t => t.Name)
            .ToList();
    }

    /// <summary>Pre-builds a type-name → namespace lookup for O(1) access.</summary>
    private static Dictionary<string, string> BuildNamespaceMap(ApiIndex index)
    {
        var map = new Dictionary<string, string>();
        foreach (var ns in index.Namespaces)
            foreach (var t in ns.Types)
                map.TryAdd(t.Name, ns.Name);
        return map;
    }

    private static string GetNamespace(TypeInfo type, Dictionary<string, string> nsMap)
        => nsMap.TryGetValue(type.Name, out var ns) ? ns : "";

    private static string FormatTypes(List<TypeInfo> types, string namespaceName)
    {
        var sb = new StringBuilder();

        if (!string.IsNullOrEmpty(namespaceName))
        {
            sb.AppendLine($"namespace {namespaceName}");
            sb.AppendLine("{");
        }

        var indent = string.IsNullOrEmpty(namespaceName) ? "" : "    ";

        foreach (var type in types)
            FormatType(sb, type, indent);

        if (!string.IsNullOrEmpty(namespaceName))
        {
            sb.AppendLine("}");
            sb.AppendLine();
        }

        return sb.ToString();
    }

    private static void FormatType(StringBuilder sb, TypeInfo type, string indent)
    {
        if (type.IsDeprecated == true)
        {
            var message = string.IsNullOrWhiteSpace(type.DeprecatedMessage) ? "" : $"(\"{type.DeprecatedMessage}\")";
            sb.AppendLine($"{indent}[Obsolete{message}]");
        }

        // XML doc
        if (!string.IsNullOrEmpty(type.Doc))
        {
            sb.AppendLine($"{indent}/// <summary>{EscapeXml(type.Doc)}</summary>");
        }

        // Type declaration
        var inheritance = BuildInheritance(type);
        sb.Append($"{indent}public {type.Kind} {type.Name}");
        if (!string.IsNullOrEmpty(inheritance))
            sb.Append($" : {inheritance}");

        // Enum values
        if (type.Kind == "enum" && type.Values?.Count > 0)
        {
            sb.AppendLine($" {{ {string.Join(", ", type.Values)} }}");
            sb.AppendLine();
            return;
        }

        sb.AppendLine();
        sb.AppendLine($"{indent}{{");

        // Group members by kind once for efficient iteration (instead of 7x .Where() scans)
        var membersByKind = new Dictionary<string, List<MemberInfo>>();
        foreach (var m in type.Members ?? [])
        {
            var key = m.Kind ?? "other";
            if (!membersByKind.TryGetValue(key, out var list))
            {
                list = [];
                membersByKind[key] = list;
            }
            list.Add(m);
        }

        // Constants first
        if (membersByKind.TryGetValue("const", out var consts))
        {
            foreach (var m in consts)
                FormatMember(sb, m, indent + "    ");
        }

        if (membersByKind.TryGetValue("property", out var properties))
        {
            foreach (var m in properties.Where(m => m.IsStatic == true))
                FormatMember(sb, m, indent + "    ");
        }

        // Constructors
        if (membersByKind.TryGetValue("ctor", out var ctors))
        {
            foreach (var m in ctors)
                FormatMember(sb, m, indent + "    ");
        }

        // Instance properties
        if (properties is not null)
        {
            foreach (var m in properties.Where(m => m.IsStatic != true))
                FormatMember(sb, m, indent + "    ");
        }

        // Indexers
        if (membersByKind.TryGetValue("indexer", out var indexers))
        {
            foreach (var m in indexers)
                FormatMember(sb, m, indent + "    ");
        }

        // Events
        if (membersByKind.TryGetValue("event", out var events))
        {
            foreach (var m in events)
                FormatMember(sb, m, indent + "    ");
        }

        // Methods
        if (membersByKind.TryGetValue("method", out var methods))
        {
            foreach (var m in methods)
                FormatMember(sb, m, indent + "    ");
        }

        sb.AppendLine($"{indent}}}");
        sb.AppendLine();
    }

    private static void FormatMember(StringBuilder sb, MemberInfo member, string indent)
    {
        if (member.IsDeprecated == true)
        {
            var message = string.IsNullOrWhiteSpace(member.DeprecatedMessage) ? "" : $"(\"{member.DeprecatedMessage}\")";
            sb.AppendLine($"{indent}[Obsolete{message}]");
        }

        // XML doc
        if (!string.IsNullOrEmpty(member.Doc))
            sb.AppendLine($"{indent}/// <summary>{EscapeXml(member.Doc)}</summary>");

        List<string> modifiers = ["public"];
        if (member.IsStatic == true) modifiers.Add("static");
        if (member.IsAsync == true && member.Kind == "method") modifiers.Add("async");

        var mods = string.Join(" ", modifiers);

        // Properties/indexers already have { get; } in signature - don't add semicolon
        var sig = member.Signature;
        var needsSemicolon = !sig.EndsWith('}');
        var suffix = needsSemicolon ? ";" : "";

        switch (member.Kind)
        {
            case "ctor":
                sb.AppendLine($"{indent}public {member.Name}{sig};");
                break;
            case "property":
            case "indexer":
                sb.AppendLine($"{indent}{mods} {sig}{suffix}");
                break;
            case "event":
                sb.AppendLine($"{indent}{mods} {sig};");
                break;
            case "method":
                sb.AppendLine($"{indent}{mods} {sig};");
                break;
            case "const":
                sb.AppendLine($"{indent}public {sig};");
                break;
        }
    }

    private static string BuildInheritance(TypeInfo type)
    {
        if (string.IsNullOrEmpty(type.Base))
            return type.Interfaces?.Count > 0 ? string.Join(", ", type.Interfaces) : "";

        if (type.Interfaces is not { Count: > 0 })
            return type.Base;

        // Base + interfaces — rare case, allocation acceptable
        return $"{type.Base}, {string.Join(", ", type.Interfaces)}";
    }

    private static string EscapeXml(string text) =>
        text.Replace("&", "&amp;", StringComparison.Ordinal).Replace("<", "&lt;", StringComparison.Ordinal).Replace(">", "&gt;", StringComparison.Ordinal);

    /// <summary>
    /// Formats types with proper namespace wrapping.
    /// </summary>
    private static string FormatTypesWithNamespace(IEnumerable<TypeInfo> types, Dictionary<string, string> nsMap)
    {
        var sb = new StringBuilder();
        var typesByNamespace = types.GroupBy(t => GetNamespace(t, nsMap));

        foreach (var group in typesByNamespace)
        {
            var ns = group.Key;
            if (!string.IsNullOrEmpty(ns))
            {
                sb.AppendLine($"namespace {ns}");
                sb.AppendLine("{");
            }

            var indent = string.IsNullOrEmpty(ns) ? "" : "    ";
            foreach (var type in group)
                FormatType(sb, type, indent);

            if (!string.IsNullOrEmpty(ns))
            {
                sb.AppendLine("}");
                sb.AppendLine();
            }
        }

        return sb.ToString();
    }

    // =========================================================================
    // Compilation Stubs — lightweight type declarations for Roslyn semantic analysis
    // =========================================================================

    /// <summary>
    /// Builds a <see cref="Microsoft.CodeAnalysis.SyntaxTree"/> containing stub type declarations
    /// derived from an <see cref="ApiIndex"/>. The stubs use the real method signatures from the
    /// API index so Roslyn can fully resolve call sites in sample code. Properties preserve
    /// return types for subclient resolution (<c>client.Widgets</c> → <c>WidgetClient</c>).
    /// </summary>
    public static Microsoft.CodeAnalysis.SyntaxTree BuildCompilationStubs(ApiIndex apiIndex)
    {
        var sb = new StringBuilder();

        foreach (var ns in apiIndex.Namespaces ?? [])
        {
            if (!string.IsNullOrEmpty(ns.Name))
            {
                sb.AppendLine($"namespace {ns.Name}");
                sb.AppendLine("{");
            }

            foreach (var type in ns.Types ?? [])
            {
                var keyword = type.Kind switch
                {
                    "interface" => "interface",
                    "struct" => "struct",
                    "record" => "record",
                    _ => "class"
                };

                var baseClause = type.Interfaces is { Count: > 0 }
                    ? $" : {string.Join(", ", type.Interfaces)}"
                    : "";

                sb.AppendLine($"public {keyword} {type.Name}{baseClause}");
                sb.AppendLine("{");

                foreach (var member in type.Members ?? [])
                {
                    var isInterface = type.Kind == "interface";
                    var accessModifier = isInterface ? "" : "public ";

                    if (member.Kind == "method")
                    {
                        var sig = member.Signature ?? $"void {member.Name}()";
                        var staticMod = member.IsStatic == true ? "static " : "";
                        if (isInterface)
                            sb.AppendLine($"    {sig};");
                        else if (sig.StartsWith("void ", StringComparison.Ordinal))
                            sb.AppendLine($"    {accessModifier}{staticMod}{sig} {{ }}");
                        else
                            sb.AppendLine($"    {accessModifier}{staticMod}{sig} => default!;");
                    }
                    else if (member.Kind == "property")
                    {
                        var sig = member.Signature ?? $"object {member.Name} {{ get; }}";
                        sb.AppendLine($"    {accessModifier}{sig}");
                    }
                }

                sb.AppendLine("}");
                sb.AppendLine();
            }

            if (!string.IsNullOrEmpty(ns.Name))
            {
                sb.AppendLine("}");
            }
        }

        return CSharpSyntaxTree.ParseText(sb.ToString(), path: "__api_stubs__.cs");
    }
}
