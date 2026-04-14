// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Java;

/// <summary>
/// Formats graphed Java API as Java stub syntax.
/// Supports smart truncation that prioritizes clients and their dependencies.
/// </summary>
public static class JavaFormatter
{
    /// <summary>Formats the full API surface.</summary>
    public static string Format(ApiIndex api) => Format(api, int.MaxValue);

    /// <summary>
    /// Formats with coverage awareness: compact summary of covered ops, full signatures for uncovered.
    /// This provides ~70% token savings while maintaining complete context for generation.
    /// </summary>
    public static string FormatWithCoverage(ApiIndex index, UsageIndex coverage, int maxLength)
    {
        var sb = new StringBuilder();

        var deprecatedOperations = index.GetAllTypes()
            .SelectMany(c => (c.Methods ?? [])
                .Where(m => m.IsDeprecated == true)
                .Select(m => (Client: c.Name, Method: m.Name)))
            .ToHashSet();

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

        var allClasses = index.GetAllTypes().ToList();
        var classesWithUncovered = allClasses.Where(c => uncoveredByClient.ContainsKey(c.Name)).ToList();

        // Build set of all type names for dependency tracking
        var allTypeNames = allClasses.Select(c => IApiIndex.NormalizeTypeName(c.Name)).ToHashSet();
        var allClassesByName = new Dictionary<string, ClassInfo>();
        foreach (var c in allClasses)
            allClassesByName.TryAdd(IApiIndex.NormalizeTypeName(c.Name), c);

        HashSet<string> includedClasses = [];
        HashSet<string> reusableDeps = [];

        foreach (var cls in classesWithUncovered)
        {
            if (includedClasses.Contains(cls.Name))
                continue;

            // Filter to show only uncovered methods for client classes
            var filteredClass = cls;
            if (uncoveredByClient.TryGetValue(cls.Name, out var uncoveredOps))
            {
                filteredClass = cls with
                {
                    Methods = cls.Methods?
                        .Where(m => uncoveredOps.Contains(m.Name))
                        .ToList() ?? []
                };
            }

            var classContent = FormatClassToString(filteredClass);

            if (sb.Length + classContent.Length > maxLength - 100 && includedClasses.Count > 0)
            {
                sb.AppendLine($"// ... truncated ({classesWithUncovered.Count - includedClasses.Count} classes omitted)");
                break;
            }

            sb.Append(classContent);
            includedClasses.Add(cls.Name);

            // Include supporting model/option types referenced by uncovered operations
            filteredClass.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var depName in reusableDeps)
            {
                if (!includedClasses.Contains(depName) && allClassesByName.TryGetValue(depName, out var depClass))
                {
                    var depContent = FormatClassToString(depClass);
                    if (sb.Length + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    includedClasses.Add(depName);
                }
            }
        }

        // Include dependency types from external packages if space permits
        if (index.Dependencies?.Count > 0)
        {
            foreach (var dep in index.Dependencies)
            {
                foreach (var cls in dep.Classes ?? [])
                {
                    if (includedClasses.Contains(cls.Name))
                        continue;

                    var depContent = FormatClassToString(cls);
                    if (sb.Length + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    includedClasses.Add(cls.Name);
                }

                foreach (var iface in dep.Interfaces ?? [])
                {
                    if (includedClasses.Contains(iface.Name))
                        continue;

                    var depContent = FormatClassToString(iface);
                    if (sb.Length + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    includedClasses.Add(iface.Name);
                }
            }
        }

        return sb.ToString();
    }

    private static string FormatClassToString(ClassInfo cls)
    {
        var sb = new StringBuilder();
        FormatType(sb, cls, GetKeyword(cls));
        return sb.ToString();
    }

    /// <summary>Returns the Java keyword for the type based on its Kind property.</summary>
    private static string GetKeyword(ClassInfo type, bool isInterface = false) =>
        type.Kind switch
        {
            "record" => "record",
            "annotation" => "@interface",
            "interface" => "interface",
            _ => isInterface ? "interface" : "class"
        };

    /// <summary>
    /// Formats with smart truncation to fit within budget.
    /// Prioritizes: Clients → Their dependencies → Builders → Options → Models → Rest
    /// </summary>
    public static string Format(ApiIndex api, int maxLength)
    {
        var sb = new StringBuilder();
        sb.AppendLine($"// {api.Package} - Public API Surface");
        sb.AppendLine();

        // Build type lookup
        var allClasses = api.GetAllTypes().ToList();
        var allTypeNames = allClasses.Select(c => IApiIndex.NormalizeTypeName(c.Name)).ToHashSet();

        // Pre-build dictionary for O(1) lookups — first-wins for duplicate names
        var classesByName = new Dictionary<string, ClassInfo>();
        foreach (var c in allClasses)
            classesByName.TryAdd(IApiIndex.NormalizeTypeName(c.Name), c);

        // Get client dependencies first
        var clients = allClasses.Where(c => c.IsClientType).ToList();
        HashSet<string> clientDeps = [];
        HashSet<string> reusableDeps2 = [];
        foreach (var client in clients)
        {
            client.CollectReferencedTypes(allTypeNames, reusableDeps2);
            foreach (var dep in reusableDeps2)
                clientDeps.Add(dep);
        }

        // Prioritize classes
        var orderedClasses = allClasses
            .OrderBy(c =>
            {
                if (c.IsClientType) return 0;
                if (clientDeps.Contains(c.Name)) return 1;
                return c.TruncationPriority + 2;
            })
            .ThenBy(c => c.Name)
            .ToList();

        HashSet<string> includedClasses2 = [];
        HashSet<string> reusableDeps3 = [];

        foreach (var pkg in api.Packages)
        {
            var pkgClasses = orderedClasses
                .Where(c => (pkg.Classes?.Contains(c) == true) || (pkg.Interfaces?.Contains(c) == true) || (pkg.Annotations?.Contains(c) == true))
                .ToList();

            if (pkgClasses.Count is 0 && (pkg.Enums?.Count ?? 0) is 0)
                continue;

            sb.AppendLine($"package {pkg.Name};");
            sb.AppendLine();

            // Enums first (usually small)
            if (pkg.Enums is not null)
                FormatEnums(sb, pkg.Enums);

            foreach (var cls in pkgClasses)
            {
                if (includedClasses2.Contains(cls.Name))
                    continue;

                // Include class + dependencies
                List<ClassInfo> classesToAdd = [cls];
                cls.CollectReferencedTypes(allTypeNames, reusableDeps3);
                foreach (var depName in reusableDeps3)
                {
                    if (!includedClasses2.Contains(depName) && classesByName.TryGetValue(depName, out var depClass))
                    {
                        classesToAdd.Add(depClass);
                    }
                }

                var classContent = FormatTypesToString(classesToAdd, pkg.Interfaces?.Any(i => classesToAdd.Contains(i)) == true, pkg.Interfaces);

                if (sb.Length + classContent.Length > maxLength - 100 && includedClasses2.Count > 0)
                {
                    sb.AppendLine($"// ... truncated ({allClasses.Count - includedClasses2.Count} classes omitted)");
                    return sb.ToString();
                }

                sb.Append(classContent);

                foreach (var c in classesToAdd)
                    includedClasses2.Add(c.Name);
            }
        }

        // Add dependency types section
        if (api.Dependencies?.Count > 0)
        {
            sb.AppendLine();
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine("// Dependency Types (from external packages)");
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine();

            foreach (var dep in api.Dependencies)
            {
                if (sb.Length >= maxLength) break;
                if (dep.IsStdlib) continue;

                sb.AppendLine($"// From: {dep.Package}");
                sb.AppendLine();

                foreach (var iface in dep.Interfaces ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    FormatType(sb, iface, "interface");
                }

                foreach (var cls in dep.Classes ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    FormatType(sb, cls, GetKeyword(cls));
                }

                foreach (var t in dep.Types ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    FormatType(sb, t, "type");
                }
            }
        }

        return sb.ToString();
    }

    private static string FormatTypesToString(List<ClassInfo> types, bool isInterface, IReadOnlyList<ClassInfo>? pkgInterfaces = null)
    {
        var sb = new StringBuilder();
        // Use a HashSet for O(1) interface membership checks instead of O(n) IReadOnlyList.Contains
        var ifaceSet = pkgInterfaces is not null ? new HashSet<ClassInfo>(pkgInterfaces) : null;
        foreach (var type in types)
        {
            var keyword = GetKeyword(type, ifaceSet?.Contains(type) == true);
            FormatType(sb, type, keyword);
        }
        return sb.ToString();
    }

    private static void FormatType(StringBuilder sb, ClassInfo type, string keyword)
    {
        if (type.IsDeprecated == true)
            sb.AppendLine("@Deprecated");
        if (!string.IsNullOrEmpty(type.Doc))
            sb.AppendLine($"/** {type.Doc} */");

        var mods = type.Modifiers is not null ? string.Join(" ", type.Modifiers) + " " : "";
        var typeParams = !string.IsNullOrEmpty(type.TypeParams) ? $"<{type.TypeParams}>" : "";
        var ext = !string.IsNullOrEmpty(type.Extends) ? $" extends {type.Extends}" : "";
        var impl = type.Implements?.Count > 0 ? $" implements {string.Join(", ", type.Implements)}" : "";

        sb.AppendLine($"{mods}{keyword} {type.Name}{typeParams}{ext}{impl} {{");

        // Fields
        if (type.Fields is not null)
        {
            foreach (var f in type.Fields)
            {
                if (f.IsDeprecated == true)
                    sb.AppendLine("    @Deprecated");
                var fm = f.Modifiers is not null ? string.Join(" ", f.Modifiers) + " " : "";
                var val = !string.IsNullOrEmpty(f.Value) ? $" = {f.Value}" : "";
                sb.AppendLine($"    {fm}{f.Type} {f.Name}{val};");
            }
        }

        // Constructors
        if (type.Constructors is not null)
        {
            foreach (var c in type.Constructors)
                FormatMethod(sb, type.Name, c, isCtor: true);
        }

        // Methods
        if (type.Methods is not null)
        {
            foreach (var m in type.Methods)
                FormatMethod(sb, m.Name, m, isCtor: false);
        }

        sb.AppendLine("}");
        sb.AppendLine();
    }

    private static void FormatEnums(StringBuilder sb, IReadOnlyList<EnumInfo> enums)
    {
        foreach (var e in enums)
        {
            if (e.IsDeprecated == true)
                sb.AppendLine("@Deprecated");
            if (!string.IsNullOrEmpty(e.Doc))
                sb.AppendLine($"/** {e.Doc} */");

            sb.AppendLine($"public enum {e.Name} {{");

            if (e.Values?.Count > 0)
                sb.AppendLine($"    {string.Join(", ", e.Values)};");

            if (e.Methods is not null)
            {
                foreach (var m in e.Methods)
                    FormatMethod(sb, m.Name, m, isCtor: false);
            }

            sb.AppendLine("}");
            sb.AppendLine();
        }
    }

    private static void FormatMethod(StringBuilder sb, string name, MethodInfo m, bool isCtor)
    {
        if (m.IsDeprecated == true)
            sb.AppendLine("    @Deprecated");
        if (!string.IsNullOrEmpty(m.Doc))
            sb.AppendLine($"    /** {m.Doc} */");

        var mods = m.Modifiers is not null ? string.Join(" ", m.Modifiers) + " " : "";
        var typeParams = !string.IsNullOrEmpty(m.TypeParams) ? $"<{m.TypeParams}> " : "";
        var ret = !isCtor && !string.IsNullOrEmpty(m.Ret) ? $"{m.Ret} " : "";
        var throws = m.Throws?.Count > 0 ? $" throws {string.Join(", ", m.Throws)}" : "";

        sb.AppendLine($"    {mods}{typeParams}{ret}{name}({m.Sig}){throws};");
    }
}
