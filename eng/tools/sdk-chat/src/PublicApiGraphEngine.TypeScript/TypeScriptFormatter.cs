// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

/// <summary>Structured key for grouping types by (exportPath, condition).</summary>
internal readonly record struct ModuleKey(string ExportPath, string Condition);

/// <summary>
/// Formats an ApiIndex as human-readable TypeScript stub syntax.
/// Supports smart truncation that prioritizes client classes and their dependencies.
/// </summary>
public static class TypeScriptFormatter
{
    /// <summary>Normalizes a condition string: null, empty, or whitespace becomes "default".</summary>
    private static string NormalizeCondition(string? condition)
        => string.IsNullOrWhiteSpace(condition) ? "default" : condition;

    /// <summary>Returns true for targets that lack Node.js builtins (browser, react-native).</summary>
    private static bool IsNonNodeTarget(string condition)
        => string.Equals(condition, "browser", StringComparison.OrdinalIgnoreCase)
        || string.Equals(condition, "react-native", StringComparison.OrdinalIgnoreCase);

    /// <summary>
    /// Builds a dictionary from items by key, keeping only the first item for each key
    /// to safely handle duplicate names across modules.
    /// </summary>
    private static Dictionary<string, T> SafeToDictionary<T>(IEnumerable<T> items, Func<T, string> keySelector)
    {
        var dict = new Dictionary<string, T>();
        foreach (var item in items)
            dict.TryAdd(keySelector(item), item);
        return dict;
    }

    public static string Format(ApiIndex index, string? targetCondition = null)
    {
        var result = Format(index, int.MaxValue, targetCondition);
        return ReplaceAmbientTypesPlaceholder(result, index.AmbientTypes);
    }

    /// <summary>
    /// Formats the API surface as separate files per export condition (browser, import, require, etc.).
    /// Returns a dictionary mapping target name → (dtsContent, tsconfigContent).
    /// </summary>
    public static Dictionary<string, (string Dts, string Tsconfig)> FormatPerTarget(ApiIndex index)
    {
        var result = new Dictionary<string, (string, string)>(StringComparer.Ordinal);

        var conditions = index.Modules
            .Select(m => NormalizeCondition(m.Condition))
            .Distinct(StringComparer.Ordinal)
            .OrderBy(c => c, StringComparer.Ordinal)
            .ToList();


        foreach (var condition in conditions)
        {
            // Filter modules for this condition
            var conditionModules = index.Modules
                .Where(m => NormalizeCondition(m.Condition) == condition)
                .ToList();

            // Filter resolved dependencies to those matching this condition.
            // For each dependency, prefer modules with an exact condition match;
            // fall back to "default" condition or null/whitespace if no exact match.
            var conditionResolvedDeps = index.ResolvedDependencies?
                .Select(dep =>
                {
                    var exactMatch = dep.Modules.Where(m => NormalizeCondition(m.Condition) == condition).ToList();
                    var defaultFallback = dep.Modules
                        .Where(m => NormalizeCondition(m.Condition) == "default")
                        .ToList();
                    return dep with { Modules = exactMatch.Count > 0 ? exactMatch : defaultFallback };
                })
                .Where(dep => dep.Modules.Count > 0)
                .ToList();

            // Filter out node:* dependencies for targets that don't have Node.js builtins
            bool isNonNodeTarget = IsNonNodeTarget(condition);

            // For non-node targets, also filter resolved dependencies that are node builtins
            if (isNonNodeTarget && conditionResolvedDeps is not null)
            {
                conditionResolvedDeps = conditionResolvedDeps
                    .Where(dep => !dep.Package.StartsWith("node:", StringComparison.Ordinal)
                        && !(dep.AmbientTypes?.ContainsKey("node") == true))
                    .ToList();
            }

            var filteredDeps = isNonNodeTarget && index.Dependencies is not null
                ? index.Dependencies.Where(d => !d.IsNode).ToList()
                : index.Dependencies;

            // Filter ambient types for non-node targets (browser, react-native)
            var filteredAmbientTypes = index.AmbientTypes;
            if (isNonNodeTarget && index.AmbientTypes is not null)
            {
                filteredAmbientTypes = index.AmbientTypes
                    .Where(kvp => !kvp.Key.Equals("node", StringComparison.OrdinalIgnoreCase))
                    .ToDictionary(kvp => kvp.Key, kvp => kvp.Value);
            }

            var subIndex = index with
            {
                Modules = conditionModules,
                ResolvedDependencies = conditionResolvedDeps,
                Dependencies = filteredDeps is { Count: > 0 } ? filteredDeps : null,
                AmbientTypes = filteredAmbientTypes,
            };

            var dts = Format(subIndex, condition);

            // Replace ambient types placeholder with actual list of builtins
            // found in the rendered content.
            dts = ReplaceAmbientTypesPlaceholder(dts, filteredAmbientTypes);

            var hasNodeDependency = filteredDeps?.Any(d => d.IsNode) == true;
            var tsconfig = GenerateTsconfig(hasNodeDependency, filteredAmbientTypes, condition, dts);
            result[condition] = (dts, tsconfig);
        }

        return result;
    }

    /// <summary>
    /// Collects all type names referenced by entities in a module group
    /// using the structured referencedTypes data from the TS extraction engine.
    /// </summary>
    private static HashSet<string> CollectAllReferencedTypes(
        IEnumerable<ClassInfo> classes,
        IEnumerable<InterfaceInfo> interfaces,
        IEnumerable<EnumInfo> enums,
        IEnumerable<TypeAliasInfo> types,
        IEnumerable<FunctionInfo> functions)
    {
        var refs = new HashSet<string>(StringComparer.Ordinal);
        foreach (var c in classes)
            foreach (var r in c.ReferencedTypes ?? []) refs.Add(r);
        foreach (var i in interfaces)
            foreach (var r in i.ReferencedTypes ?? []) refs.Add(r);
        foreach (var t in types)
            foreach (var r in t.ReferencedTypes ?? []) refs.Add(r);
        foreach (var f in functions)
            foreach (var r in f.ReferencedTypes ?? []) refs.Add(r);
        return refs;
    }



    /// <summary>
    /// Replaces the ambient types placeholder with a comment listing
    /// the pre-computed ambient types from the TS engine.
    /// Ambient types are those referenced in signatures but not defined
    /// in the output — they must come from the runtime environment.
    /// </summary>
    private static string ReplaceAmbientTypesPlaceholder(
        string dtsContent, Dictionary<string, List<string>>? ambientTypes)
    {
        const string placeholder = "// __AMBIENT_TYPES_PLACEHOLDER__";

        var lines = new List<string>();

        if (ambientTypes is { Count: > 0 })
        {
            foreach (var (category, types) in ambientTypes.OrderBy(kv => kv.Key))
            {
                if (types.Count == 0) continue;
                var label = category.ToUpperInvariant() switch
                {
                    "DOM" => "DOM lib",
                    "ES" => "ES lib",
                    "NODE" => "Node.js",
                    _ => category,
                };
                lines.Add($"// Ambient types from {label}: {string.Join(", ", types)}");
            }
        }

        if (lines.Count == 0)
            return dtsContent.Replace(placeholder + "\n", "").Replace(placeholder + "\r\n", "");

        var replacement = "//" + Environment.NewLine + string.Join(Environment.NewLine, lines);
        return dtsContent.Replace(placeholder, replacement);
    }

    /// <summary>
    /// Generates a tsconfig.json for a specific export condition target.
    /// Browser targets get "dom" lib; node targets get @types/node.
    /// <paramref name="hasNodeDependency"/> is derived from the dependency graph's
    /// <see cref="DependencyInfo.IsNode"/> flag rather than scanning rendered text.
    /// Uses the structured <paramref name="ambientTypes"/> data from the TS extraction
    /// engine to determine which lib files are needed.
    /// </summary>
    /// <summary>Well-known DOM global types that require the DOM lib.</summary>
    private static readonly string[] DomGlobalTypes =
    [
        "AbortSignal", "ReadableStream", "WritableStream",
        "EventTarget", "Blob", "File", "FormData", "Headers",
        "Request", "Response", "URL", "URLSearchParams",
    ];

    private static string GenerateTsconfig(bool hasNodeDependency, Dictionary<string, List<string>>? ambientTypes, string? targetCondition = null, string? dtsContent = null)
    {
        // Use graph-based IsNode flag; also check ambient types for node globals
        var needsNodeTypes = hasNodeDependency
            || (ambientTypes?.TryGetValue("node", out var nodeTypes) == true && nodeTypes.Count > 0);

        // Non-node targets never need node types
        bool isNonNode = targetCondition is not null && IsNonNodeTarget(targetCondition);
        if (isNonNode)
            needsNodeTypes = false;

        // Include DOM lib when ambient types include DOM globals.
        // Fallback: scan rendered content for common DOM type names when ambientTypes
        // doesn't include a "dom" category (older graph data).
        var needsDomLib = ambientTypes?.TryGetValue("dom", out var domTypes) == true && domTypes.Count > 0;
        if (!needsDomLib && dtsContent is not null)
        {
            foreach (var typeName in DomGlobalTypes)
            {
                if (dtsContent.Contains(typeName, StringComparison.Ordinal))
                {
                    needsDomLib = true;
                    break;
                }
            }
        }

        var libs = new List<string> { "ES2023" };
        if (needsDomLib)
        {
            libs.Add("DOM");
            libs.Add("DOM.Iterable");
        }

        var sb = new StringBuilder();
        sb.AppendLine("{");
        sb.AppendLine("  \"compilerOptions\": {");
        sb.AppendLine("    \"noEmit\": true,");

        if (needsNodeTypes)
            sb.AppendLine("    \"types\": [\"node\"],");
        else if (string.Equals(targetCondition, "react-native", StringComparison.OrdinalIgnoreCase))
            sb.AppendLine("    \"types\": [\"react-native\"],");
        else
            sb.AppendLine("    \"types\": [],");

        sb.Append("    \"composite\": true");

        sb.AppendLine(",");
        sb.AppendLine($"    \"lib\": [{string.Join(", ", libs.Select(l => $"\"{l}\""))}]");

        sb.AppendLine("  },");
        sb.AppendLine("  \"include\": [\"./*.d.ts\"]");
        sb.AppendLine("}");
        return sb.ToString();
    }

    /// <summary>
    /// Formats with coverage awareness: compact summary of covered ops, full signatures for uncovered.
    /// This provides ~70% token savings while maintaining complete context for generation.
    /// </summary>
    public static string FormatWithCoverage(ApiIndex index, UsageIndex coverage, int maxLength)
    {
        var sb = new StringBuilder();

        var deprecatedOperations = index.Modules
            .SelectMany(m => (m.Classes ?? [])
                .SelectMany(c => (c.Methods ?? [])
                    .Where(method => method.IsDeprecated == true)
                    .Select(method => (Client: c.Name, Method: method.Name))))
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

        var allClasses = index.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var classesWithUncovered = allClasses.Where(c => uncoveredByClient.ContainsKey(c.Name)).ToList();

        // Build lookups for dependency tracking
        var allInterfaces = index.Modules.SelectMany(m => m.Interfaces ?? []).ToList();
        HashSet<string> allTypeNames = [];
        foreach (var c in allClasses) allTypeNames.Add(c.Name);
        foreach (var i in allInterfaces) allTypeNames.Add(i.Name);
        var allClassesByName = SafeToDictionary(allClasses, c => c.Name);
        var allIfacesByName = SafeToDictionary(allInterfaces, i => i.Name);

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
                if (includedClasses.Contains(depName))
                    continue;

                if (allClassesByName.TryGetValue(depName, out var depClass))
                {
                    var depContent = FormatClassToString(depClass);
                    if (sb.Length + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    includedClasses.Add(depName);
                }
                else if (allIfacesByName.TryGetValue(depName, out var depIface))
                {
                    var depContent = FormatInterface(depIface);
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

                    var depContent = FormatInterface(iface);
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
        return FormatClass(cls);
    }

    /// <summary>
    /// Formats the API surface with smart truncation that prioritizes client classes.
    /// Groups exported symbols by their export subpath (e.g., ".", "./client").
    /// </summary>
    public static string Format(ApiIndex index, int maxLength, string? targetCondition = null)
    {
        var sb = new StringBuilder();

        // Emit triple-slash references — skip node reference for non-node targets
        bool isNonNode = targetCondition is not null && IsNonNodeTarget(targetCondition);
        if (!isNonNode)
            sb.AppendLine("/// <reference types=\"node\" />");
        var esLib = index.EsLib ?? "esnext";
        sb.AppendLine($"/// <reference lib=\"{esLib}\" />");
        sb.AppendLine($"// {index.Package} - Public API Surface");
        sb.AppendLine("// Graphed by PublicApiGraphEngine.TypeScript");
        // Placeholder for ambient types comment — filled after content is rendered
        const string ambientPlaceholder = "// __AMBIENT_TYPES_PLACEHOLDER__";
        sb.AppendLine(ambientPlaceholder);
        sb.AppendLine();

        // Get all classes, interfaces, and enums for prioritization
        var allClasses = index.Modules.SelectMany(m => m.Classes ?? []).ToList();
        var allInterfaces = index.Modules.SelectMany(m => m.Interfaces ?? []).ToList();
        var allEnums = index.Modules.SelectMany(m => m.Enums ?? []).ToList();
        var allTypes = index.Modules.SelectMany(m => m.Types ?? []).ToList();
        var allFunctions = index.Modules.SelectMany(m => m.Functions ?? []).ToList();

        // Build set of all type names for dependency tracking
        HashSet<string> allTypeNames = [];
        foreach (var c in allClasses) allTypeNames.Add(c.Name);
        foreach (var i in allInterfaces) allTypeNames.Add(i.Name);
        foreach (var e in allEnums) allTypeNames.Add(e.Name);
        foreach (var t in allTypes) allTypeNames.Add(t.Name);
        // Extended set includes dep types — used only for BFS reachability edges,
        // not for CollectReferencedTypes on main package types (which would cause
        // unresolved cross-module references).
        HashSet<string> allTypeNamesWithDeps = new(allTypeNames);
        if (index.Dependencies is not null)
        {
            foreach (var dep in index.Dependencies)
            {
                foreach (var c in dep.Classes ?? []) allTypeNamesWithDeps.Add(c.Name);
                foreach (var i in dep.Interfaces ?? []) allTypeNamesWithDeps.Add(i.Name);
                foreach (var e in dep.Enums ?? []) allTypeNamesWithDeps.Add(e.Name);
                foreach (var t in dep.Types ?? []) allTypeNamesWithDeps.Add(t.Name);
            }
        }

        // Detect distinct conditions and build type→conditions mapping
        var distinctConditions = index.Modules
            .Select(m => NormalizeCondition(m.Condition))
            .Distinct(StringComparer.Ordinal)
            .OrderBy(c => c, StringComparer.Ordinal)
            .ToList();
        var hasMultipleConditions = distinctConditions.Count > 1;

        // Map each type name to its set of conditions (from containing modules)
        Dictionary<string, HashSet<string>> typeConditions = [];
        if (hasMultipleConditions)
        {
            foreach (var module in index.Modules)
            {
                var cond = NormalizeCondition(module.Condition);
                void Track(string name)
                {
                    if (!typeConditions.TryGetValue(name, out var set))
                    {
                        set = [];
                        typeConditions[name] = set;
                    }
                    set.Add(cond);
                }
                foreach (var c in module.Classes ?? []) Track(c.Name);
                foreach (var i in module.Interfaces ?? []) Track(i.Name);
                foreach (var e in module.Enums ?? []) Track(e.Name);
                foreach (var t in module.Types ?? []) Track(t.Name);
                foreach (var f in module.Functions ?? []) Track(f.Name);
            }

            // Deduplicate: keep only the first instance of each type name
            allClasses = DeduplicateByName(allClasses, c => c.Name);
            allInterfaces = DeduplicateByName(allInterfaces, i => i.Name);
            allEnums = DeduplicateByName(allEnums, e => e.Name);
            allTypes = DeduplicateByName(allTypes, t => t.Name);
            allFunctions = DeduplicateByName(allFunctions, f => f.Name);
        }

        // Pre-build dictionaries for O(1) lookups instead of O(n) FirstOrDefault
        var interfacesByName = SafeToDictionary(allInterfaces, i => i.Name);
        var enumsByName = SafeToDictionary(allEnums, e => e.Name);
        var typesByName = SafeToDictionary(allTypes, t => t.Name);

        // Build dependency graph for classes, interfaces, and type aliases.
        // Use allTypeNamesWithDeps so BFS can trace from main types into dep types.
        var typeDeps = new Dictionary<string, HashSet<string>>();
        HashSet<string> reusableDeps2 = [];
        foreach (var cls in allClasses)
        {
            cls.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
            typeDeps[cls.Name] = new HashSet<string>(reusableDeps2);
        }
        foreach (var iface in allInterfaces)
        {
            iface.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
            typeDeps[iface.Name] = new HashSet<string>(reusableDeps2);
        }
        foreach (var t in allTypes)
        {
            t.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
            typeDeps[t.Name] = new HashSet<string>(reusableDeps2);
        }
        // Include dependency types in the graph so BFS can trace reachability
        // from main package entry points through into dependency modules.
        // Use allTypeNamesWithDeps so dep-to-dep edges are also discovered.
        if (index.Dependencies is not null)
        {
            foreach (var dep in index.Dependencies)
            {
                foreach (var cls in dep.Classes ?? [])
                {
                    cls.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
                    typeDeps.TryAdd(cls.Name, new HashSet<string>(reusableDeps2));
                }
                foreach (var iface in dep.Interfaces ?? [])
                {
                    iface.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
                    typeDeps.TryAdd(iface.Name, new HashSet<string>(reusableDeps2));
                }
                foreach (var t in dep.Types ?? [])
                {
                    t.CollectReferencedTypes(allTypeNamesWithDeps, reusableDeps2);
                    typeDeps.TryAdd(t.Name, new HashSet<string>(reusableDeps2));
                }
            }
        }

        // Compute reachability chains from entry points via BFS
        var entryPointNames = new HashSet<string>(StringComparer.Ordinal);
        foreach (var c in allClasses.Where(c => c.EntryPoint == true)) entryPointNames.Add(c.Name);
        foreach (var i in allInterfaces.Where(i => i.EntryPoint == true)) entryPointNames.Add(i.Name);
        foreach (var e in allEnums.Where(e => e.EntryPoint == true)) entryPointNames.Add(e.Name);
        foreach (var t in allTypes.Where(t => t.EntryPoint == true)) entryPointNames.Add(t.Name);
        foreach (var f in allFunctions.Where(f => f.EntryPoint == true)) entryPointNames.Add(f.Name);
        var reachabilityChains = ComputeReachabilityChains(entryPointNames, typeDeps);

        // Group entry points by export path
        HashSet<string> exportPaths = [];
        foreach (var cls in allClasses.Where(c => c.ExportPath is not null))
            exportPaths.Add(cls.ExportPath!);
        foreach (var iface in allInterfaces.Where(i => i.ExportPath is not null))
            exportPaths.Add(iface.ExportPath!);
        foreach (var fn in allFunctions.Where(f => f.ExportPath is not null))
            exportPaths.Add(fn.ExportPath!);
        foreach (var en in allEnums.Where(e => e.ExportPath is not null))
            exportPaths.Add(en.ExportPath!);
        foreach (var ta in allTypes.Where(t => t.ExportPath is not null))
            exportPaths.Add(ta.ExportPath!);
        foreach (var ns in index.Modules.SelectMany(m => m.Namespaces ?? []).Where(n => n.ExportPath is not null))
            exportPaths.Add(ns.ExportPath!);

        // Sort export paths: "." first, then alphabetically
        var sortedExportPaths = exportPaths
            .OrderBy(p => p == "." ? "" : p)
            .ToList();

        int totalItems = allClasses.Count + allInterfaces.Count + allEnums.Count + allTypes.Count + allFunctions.Count;
        int includedItems = 0;
        HashSet<string> includedTypeNames = [];

        // Collision alias map from the TS extraction engine (principled collision resolution).
        // Maps typeName → { packageName → aliasName }. Populated by resolveCollisions() in TS.
        var collisionAliases = index.CollisionAliases ?? new Dictionary<string, Dictionary<string, string>>();

        // Unified rendering: group types by (exportPath, condition) pair.
        // Each group becomes a `declare module` block in the output.
        // Types use their own ExportPath if set, falling back to the module's.
        bool hasSubpaths = sortedExportPaths.Count > 1;
        bool needsSections = hasSubpaths || hasMultipleConditions;

        // Pre-compute the condition-filtered dependency list so that both the
        // main-module import lines and the dependency rendering section use the
        // same set.  When ResolvedDependencies are available (per-target mode)
        // we intersect on (package, subpath) to avoid pulling in deps that
        // belong to other export conditions.
        IReadOnlyList<DependencyInfo>? depsToRender = index.Dependencies;
        if (index.Dependencies is not null && index.ResolvedDependencies is not null)
        {
            if (index.ResolvedDependencies.Count > 0)
            {
                var resolvedKeys = new HashSet<string>(
                    index.ResolvedDependencies.Select(rd => $"{rd.Package}\0{rd.Subpath ?? ""}"),
                    StringComparer.Ordinal);
                depsToRender = index.Dependencies
                    .Where(d => d.IsNode || resolvedKeys.Contains($"{d.Package}\0{d.Subpath ?? ""}"))
                    .ToList();

                // Fall back to package-level filtering when subpath matching yields
                // no non-node results (e.g. flat deps lack subpath but resolved deps have it).
                if (!depsToRender.Any(d => !d.IsNode))
                {
                    var resolvedPackages = new HashSet<string>(
                        index.ResolvedDependencies.Select(rd => rd.Package),
                        StringComparer.Ordinal);
                    depsToRender = index.Dependencies
                        .Where(d => d.IsNode || resolvedPackages.Contains(d.Package))
                        .ToList();
                }

                if (!depsToRender.Any(d => !d.IsNode))
                    depsToRender = index.Dependencies!;
            }
            else
            {
                // Empty resolved deps means no deps for this target — only keep IsNode deps
                depsToRender = index.Dependencies.Where(d => d.IsNode).ToList();
            }
        }

        // Collect Node.js type imports grouped by their specific node:* module
        // Skip for non-node targets where node types aren't available
        var nodeImports = new Dictionary<string, List<string>>();
        if (!isNonNode && depsToRender is not null)
        {
            foreach (var dep in depsToRender)
            {
                if (!dep.IsNode) continue;
                // Skip non-importable @types/node augmentation paths (e.g. node:compatibility/iterators)
                if (dep.Package.StartsWith("node:compatibility", StringComparison.Ordinal)) continue;
                var typeNames = new List<string>();
                foreach (var c in dep.Classes ?? []) typeNames.Add(c.Name);
                foreach (var i in dep.Interfaces ?? []) typeNames.Add(i.Name);
                foreach (var e in dep.Enums ?? []) typeNames.Add(e.Name);
                foreach (var t in dep.Types ?? []) typeNames.Add(t.Name);
                if (typeNames.Count > 0)
                    nodeImports[dep.Package] = typeNames;
            }
        }

        // Helper to render types inside a declare module block.
        // Defined here (outside the needsSections scope) so both the sectioned
        // and simple rendering paths can use it.
        void RenderModuleTypes(StringBuilder target, List<ClassInfo> classes, List<InterfaceInfo> interfaces,
            List<EnumInfo> enums, List<TypeAliasInfo> typeAliases, List<FunctionInfo> functions,
            List<NamespaceInfo>? namespaces = null, bool prioritize = false)
        {
            var renderClasses = prioritize ? GetPrioritizedClasses(classes, typeDeps) : classes;
            foreach (var cls in renderClasses)
            {
                if (target.Length >= maxLength) break;
                var classStr = IndentBlock(FormatReachabilityComment(cls.Name, reachabilityChains) + FormatClass(cls, insideDeclareModule: true));
                if (target.Length + classStr.Length > maxLength - 100 && includedItems > 0) break;
                target.Append(classStr);
                includedTypeNames.Add(cls.Name);
                includedItems++;
            }
            foreach (var iface in interfaces)
            {
                if (target.Length >= maxLength) break;
                var ifaceStr = IndentBlock(FormatReachabilityComment(iface.Name, reachabilityChains) + FormatInterface(iface, insideDeclareModule: true));
                if (target.Length + ifaceStr.Length <= maxLength) { target.Append(ifaceStr); includedTypeNames.Add(iface.Name); includedItems++; }
            }
            foreach (var en in enums)
            {
                if (target.Length >= maxLength) break;
                var enumStr = IndentBlock(FormatReachabilityComment(en.Name, reachabilityChains) + FormatEnum(en, insideDeclareModule: true));
                if (target.Length + enumStr.Length <= maxLength) { target.Append(enumStr); includedTypeNames.Add(en.Name); includedItems++; }
            }
            foreach (var ta in typeAliases)
            {
                if (target.Length >= maxLength) break;
                var typeStr = IndentBlock(FormatReachabilityComment(ta.Name, reachabilityChains) + FormatTypeAlias(ta, insideDeclareModule: true));
                if (target.Length + typeStr.Length <= maxLength) { target.Append(typeStr); includedTypeNames.Add(ta.Name); includedItems++; }
            }
            foreach (var fn in functions)
            {
                if (target.Length >= maxLength) break;
                var fnStr = IndentBlock(FormatReachabilityComment(fn.Name, reachabilityChains) + FormatFunction(fn, insideDeclareModule: true));
                if (target.Length + fnStr.Length <= maxLength) { target.Append(fnStr); includedItems++; }
            }
            foreach (var ns in namespaces ?? [])
            {
                if (target.Length >= maxLength) break;
                var nsStr = IndentBlock(FormatNamespace(ns, insideDeclareModule: true));
                if (target.Length + nsStr.Length <= maxLength) { target.Append(nsStr); includedItems++; }
            }
        }

        // mainSb targets the main module body. In per-target mode with simple rendering,
        // this is a separate buffer that gets wrapped in `declare module` at the end.
        // Otherwise it aliases sb directly.
        bool isPerTarget = targetCondition is not null;
        var mainSb = sb;

        if (needsSections)
        {
            // Group types by (exportPath, condition)
            var moduleGroups = new Dictionary<ModuleKey, (List<ClassInfo> Classes, List<InterfaceInfo> Interfaces,
                List<EnumInfo> Enums, List<TypeAliasInfo> Types, List<FunctionInfo> Functions, List<NamespaceInfo> Namespaces)>();

            void AddToGroup(ModuleKey groupKey, ClassInfo? cls = null, InterfaceInfo? iface = null,
                EnumInfo? en = null, TypeAliasInfo? ta = null, FunctionInfo? fn = null, NamespaceInfo? ns = null)
            {
                if (!moduleGroups.TryGetValue(groupKey, out var g))
                {
                    g = ([], [], [], [], [], []);
                    moduleGroups[groupKey] = g;
                }
                if (cls is not null && !g.Classes.Any(x => x.Name == cls.Name))
                {
                    g.Classes.Add(cls);
                    // Class already creates a type in the same name — remove any type alias
                    // to avoid TS2300 "Duplicate identifier" (type aliases don't merge)
                    g.Types.RemoveAll(x => x.Name == cls.Name);
                }
                if (iface is not null && !g.Interfaces.Any(x => x.Name == iface.Name)) g.Interfaces.Add(iface);
                if (en is not null && !g.Enums.Any(x => x.Name == en.Name)) g.Enums.Add(en);
                // Skip type aliases that collide with a class or interface in the same scope
                // (type aliases don't participate in declaration merging → TS2300)
                if (ta is not null && !g.Types.Any(x => x.Name == ta.Name)
                    && !g.Classes.Any(x => x.Name == ta.Name)
                    && !g.Interfaces.Any(x => x.Name == ta.Name)) g.Types.Add(ta);
                if (fn is not null && !g.Functions.Any(x => x.Name == fn.Name)) g.Functions.Add(fn);
                if (ns is not null && !g.Namespaces.Any(x => x.Name == ns.Name)) g.Namespaces.Add(ns);
            }

            foreach (var module in index.Modules)
            {
                var condition = NormalizeCondition(module.Condition);

                ModuleKey GroupKey(string? typeExportPath)
                {
                    var ep = typeExportPath ?? module.ExportPath ?? ".";
                    return new ModuleKey(ep, condition);
                }

                foreach (var c in module.Classes ?? []) AddToGroup(GroupKey(c.ExportPath), cls: c);
                foreach (var i in module.Interfaces ?? []) AddToGroup(GroupKey(i.ExportPath), iface: i);
                foreach (var e in module.Enums ?? []) AddToGroup(GroupKey(e.ExportPath), en: e);
                foreach (var t in module.Types ?? []) AddToGroup(GroupKey(t.ExportPath), ta: t);
                foreach (var f in module.Functions ?? []) AddToGroup(GroupKey(f.ExportPath), fn: f);
                foreach (var n in module.Namespaces ?? []) AddToGroup(GroupKey(n.ExportPath), ns: n);
            }

            // Sort groups: by exportPath first (. before subpaths), then condition alphabetically
            var sortedGroups = moduleGroups
                .OrderBy(g => g.Key.ExportPath == "." ? "" : g.Key.ExportPath)
                .ThenBy(g => g.Key.Condition)
                .ToList();

        // Pre-build dependency groups by condition for nesting inside main modules.
        // Maps condition → list of (depModuleName, types) for rendering nested declare modules.
        var depsByCondition = new Dictionary<string, List<(string ModuleName, List<ClassInfo> Classes,
            List<InterfaceInfo> Interfaces, List<EnumInfo> Enums, List<TypeAliasInfo> Types,
            List<FunctionInfo> Functions, List<NamespaceInfo> Namespaces)>>();

        if (index.ResolvedDependencies is not null)
        {
            // Collect all conditions available in each dependency
            var depConditionMap = new Dictionary<string, HashSet<string>>(); // pkg → conditions
            foreach (var dep in index.ResolvedDependencies)
            {
                var conds = new HashSet<string>(dep.Modules
                    .Select(m => NormalizeCondition(m.Condition))
                    .Distinct(StringComparer.Ordinal));
                depConditionMap[dep.Package] = conds;
            }

            // For each main condition, find the matching (or fallback) dependency condition
            var allMainConditions = new HashSet<string>();
            foreach (var module in index.Modules)
                allMainConditions.Add(NormalizeCondition(module.Condition));

            foreach (var mainCond in allMainConditions)
            {
                var depsForCond = new List<(string ModuleName, List<ClassInfo> Classes,
                    List<InterfaceInfo> Interfaces, List<EnumInfo> Enums, List<TypeAliasInfo> Types,
                    List<FunctionInfo> Functions, List<NamespaceInfo> Namespaces)>();

                foreach (var dep in index.ResolvedDependencies)
                {
                    var depConds = depConditionMap.GetValueOrDefault(dep.Package, []);
                    // Match condition: exact match first, then fall back to "default"
                    var matchedCond = depConds.Contains(mainCond) ? mainCond
                        : depConds.Contains("default") ? "default"
                        : depConds.FirstOrDefault() ?? "default";

                    // Collect types from matching condition modules
                    var classes = new List<ClassInfo>();
                    var interfaces = new List<InterfaceInfo>();
                    var enums = new List<EnumInfo>();
                    var types = new List<TypeAliasInfo>();
                    var functions = new List<FunctionInfo>();
                    var namespaces = new List<NamespaceInfo>();
                    var seenNames = new HashSet<string>();

                    foreach (var module in dep.Modules.Where(m => NormalizeCondition(m.Condition) == matchedCond))
                    {
                        foreach (var c in module.Classes ?? [])
                            if (seenNames.Add(c.Name)) classes.Add(c);
                        foreach (var i in module.Interfaces ?? [])
                            if (seenNames.Add(i.Name)) interfaces.Add(i);
                        foreach (var e in module.Enums ?? [])
                            if (seenNames.Add(e.Name)) enums.Add(e);
                        foreach (var t in module.Types ?? [])
                            if (t.Type != "unresolved" && !IsSelfReferentialAlias(t) && seenNames.Add(t.Name)) types.Add(t);
                        foreach (var f in module.Functions ?? [])
                            if (f.Name is not null && seenNames.Add(f.Name)) functions.Add(f);
                        foreach (var n in module.Namespaces ?? [])
                            if (seenNames.Add(n.Name)) namespaces.Add(n);
                    }

                    if (classes.Count + interfaces.Count + enums.Count + types.Count + functions.Count + namespaces.Count == 0)
                        continue;

                    var depHasMultipleConditions = depConds.Count > 1;
                    var depModuleName = depHasMultipleConditions && matchedCond != "default"
                        ? $"{dep.Package}/{matchedCond}"
                        : dep.Package;

                    depsForCond.Add((depModuleName, classes, interfaces, enums, types, functions, namespaces));
                }

                if (depsForCond.Count > 0)
                    depsByCondition[mainCond] = depsForCond;
            }
        }
        else if (index.Dependencies is not null && index.Dependencies.Count > 0)
        {
            // Build condition groups from flat dependencies using condition metadata.
            // Each dependency carries its export conditions (from its package.json).
            // We match main-module conditions to dep conditions: exact match first,
            // then "default", then first available. The dep module name includes
            // the matched condition suffix when the dep has multiple conditions.
            var allMainConditions = new HashSet<string>();
            foreach (var module in index.Modules)
                allMainConditions.Add(NormalizeCondition(module.Condition));

            // Pre-compute condition sets per dependency
            var depConditionSets = new Dictionary<string, HashSet<string>>();
            foreach (var dep in index.Dependencies)
            {
                if (dep.IsNode) continue;
                var conds = dep.Conditions is { Count: > 0 }
                    ? new HashSet<string>(dep.Conditions, StringComparer.Ordinal)
                    : new HashSet<string>(StringComparer.Ordinal);
                depConditionSets[dep.Package] = conds;
            }

            foreach (var mainCond in allMainConditions)
            {
                var depsForCond = new List<(string ModuleName, List<ClassInfo> Classes,
                    List<InterfaceInfo> Interfaces, List<EnumInfo> Enums, List<TypeAliasInfo> Types,
                    List<FunctionInfo> Functions, List<NamespaceInfo> Namespaces)>();

                foreach (var dep in index.Dependencies)
                {
                    if (dep.IsNode) continue;
                    var classes = dep.Classes?.ToList() ?? [];
                    var interfaces = dep.Interfaces?.ToList() ?? [];
                    var enums = dep.Enums?.ToList() ?? [];
                    var types = dep.Types?.Where(t => t.Type != "unresolved" && !IsSelfReferentialAlias(t)).ToList() ?? [];
                    var functions = dep.Functions?.ToList() ?? [];
                    var namespaces = dep.Namespaces?.ToList() ?? [];

                    if (classes.Count + interfaces.Count + enums.Count + types.Count + functions.Count + namespaces.Count == 0)
                        continue;

                    // Determine module name using condition matching.
                    // Exact match → dep/condition suffix; no match → bare package
                    // name (represents the "default" export, matching tsconfig behavior).
                    var depConds = depConditionSets.GetValueOrDefault(dep.Package, []);
                    string depModuleName;
                    if (depConds.Count > 0 && depConds.Contains(mainCond))
                    {
                        // Exact condition match — use suffix
                        depModuleName = depConds.Count > 1
                            ? $"{dep.Package}/{mainCond}"
                            : dep.Package;
                    }
                    else
                    {
                        // No match or no conditions — fall back to bare package name (default)
                        depModuleName = dep.Package;
                    }

                    depsForCond.Add((depModuleName, classes, interfaces, enums, types, functions, namespaces));
                }

                if (depsForCond.Count > 0)
                    depsByCondition[mainCond] = depsForCond;
            }
        }

        // Render modules grouped by condition: for each condition, emit dependency
        // modules first, then the main package module with import statements.
        // This keeps related modules together and ensures deps are declared before imports.

        // Pre-build main module type → module name mapping so dep modules can
        // import types defined in the main package modules (e.g., re-exports).
        var mainTypeToModule = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var (k, g) in sortedGroups)
        {
            var ep = k.ExportPath;
            var cond = k.Condition;
            string mName;
            if (ep is "." or "")
                mName = hasMultipleConditions && cond != "default" ? $"{index.Package}/{cond}" : index.Package;
            else
            {
                var sp = ep.StartsWith("./", StringComparison.Ordinal) ? ep[2..] : ep;
                mName = hasMultipleConditions && cond != "default" ? $"{index.Package}/{sp}/{cond}" : $"{index.Package}/{sp}";
            }
            foreach (var c in g.Classes) mainTypeToModule.TryAdd(c.Name, mName);
            foreach (var i in g.Interfaces) mainTypeToModule.TryAdd(i.Name, mName);
            foreach (var e in g.Enums) mainTypeToModule.TryAdd(e.Name, mName);
            foreach (var t in g.Types) mainTypeToModule.TryAdd(t.Name, mName);
        }

        var emittedDepModules = new HashSet<string>(StringComparer.Ordinal);
            foreach (var (key, group) in sortedGroups)
            {
                if (sb.Length >= maxLength) break;

                var exportPath = key.ExportPath;
                var condition = key.Condition;

                // Build module name: "pkg/condition" or "pkg/subpath/condition"
                // When condition is "default", use the bare specifier (no suffix)
                string moduleName;
                if (exportPath is "." or "")
                {
                    moduleName = hasMultipleConditions && condition != "default"
                        ? $"{index.Package}/{condition}"
                        : index.Package;
                }
                else
                {
                    var subpath = exportPath.StartsWith("./", StringComparison.Ordinal) ? exportPath[2..] : exportPath;
                    moduleName = hasMultipleConditions && condition != "default"
                        ? $"{index.Package}/{subpath}/{condition}"
                        : $"{index.Package}/{subpath}";
                }

                // Render dependency modules for this condition first.
                // Track emitted modules to avoid duplicates when flat deps are shared
                // across conditions (same module name for all conditions).
                if (depsByCondition.TryGetValue(condition, out var depsForThisCondition))
                {
                    // Build a map of typeName → depModuleName for cross-dep imports
                    var typeToDepModule = new Dictionary<string, string>(StringComparer.Ordinal);
                    foreach (var (dmn, dcs, dis, des, dts, dfs, _) in depsForThisCondition)
                    {
                        foreach (var c in dcs) typeToDepModule.TryAdd(c.Name, dmn);
                        foreach (var i in dis) typeToDepModule.TryAdd(i.Name, dmn);
                        foreach (var e in des) typeToDepModule.TryAdd(e.Name, dmn);
                        foreach (var t in dts) typeToDepModule.TryAdd(t.Name, dmn);
                        foreach (var f in dfs) if (f.Name is not null) typeToDepModule.TryAdd(f.Name, dmn);
                    }

                    // Build a reverse map from node type name → node module for efficient lookups
                    var nodeTypeToModule = new Dictionary<string, string>(StringComparer.Ordinal);
                    foreach (var (nodeModule, nodeTypes) in nodeImports)
                        foreach (var nt in nodeTypes)
                            nodeTypeToModule.TryAdd(nt, nodeModule);

                    foreach (var (depModuleName, depClasses, depInterfaces, depEnums, depTypes, depFunctions, depNamespaces) in depsForThisCondition)
                    {
                        if (sb.Length >= maxLength) break;
                        if (!emittedDepModules.Add(depModuleName)) continue;

                        // Collect type names defined in THIS dep module
                        var ownTypeNames = new HashSet<string>(StringComparer.Ordinal);
                        foreach (var c in depClasses) ownTypeNames.Add(c.Name);
                        foreach (var i in depInterfaces) ownTypeNames.Add(i.Name);
                        foreach (var e in depEnums) ownTypeNames.Add(e.Name);
                        foreach (var t in depTypes) ownTypeNames.Add(t.Name);

                        // Find cross-module imports using structured referencedTypes data
                        var moduleRefs = CollectAllReferencedTypes(depClasses, depInterfaces, depEnums, depTypes, depFunctions);
                        var crossImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                        foreach (var refType in moduleRefs)
                        {
                            if (ownTypeNames.Contains(refType)) continue;

                            // Check other dep modules
                            if (typeToDepModule.TryGetValue(refType, out var sourceModule) && sourceModule != depModuleName)
                            {
                                if (!crossImports.TryGetValue(sourceModule, out var list))
                                    crossImports[sourceModule] = list = [];
                                list.Add(refType);
                                continue;
                            }

                            // Check node type imports
                            if (nodeTypeToModule.TryGetValue(refType, out var nm))
                            {
                                if (!crossImports.TryGetValue(nm, out var list))
                                    crossImports[nm] = list = [];
                                list.Add(refType);
                                continue;
                            }

                            // Check main module types (re-exported types used in dep signatures)
                            if (mainTypeToModule.TryGetValue(refType, out var mainModule))
                            {
                                if (!crossImports.TryGetValue(mainModule, out var list))
                                    crossImports[mainModule] = list = [];
                                list.Add(refType);
                            }
                        }

                        sb.AppendLine($"declare module \"{depModuleName}\" {{");
                        sb.AppendLine();

                        // Emit cross-dep import statements
                        foreach (var (importModule, importTypes) in crossImports.OrderBy(kv => kv.Key))
                            sb.AppendLine($"    import type {{ {string.Join(", ", importTypes)} }} from \"{importModule}\";");
                        if (crossImports.Count > 0) sb.AppendLine();

                        // Render body
                        RenderModuleTypes(sb, depClasses, depInterfaces, depEnums, depTypes, depFunctions, depNamespaces);
                        sb.AppendLine("}");
                        sb.AppendLine();
                    }
                }

                // Collect own type names for this main module
                var mainOwnTypes = new HashSet<string>(StringComparer.Ordinal);
                foreach (var c in group.Classes) mainOwnTypes.Add(c.Name);
                foreach (var i in group.Interfaces) mainOwnTypes.Add(i.Name);
                foreach (var e in group.Enums) mainOwnTypes.Add(e.Name);
                foreach (var t in group.Types) mainOwnTypes.Add(t.Name);

                // Find cross-condition imports using structured referencedTypes data
                var mainModuleRefs = CollectAllReferencedTypes(
                    group.Classes, group.Interfaces, group.Enums, group.Types, group.Functions);
                var mainCrossImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                foreach (var refType in mainModuleRefs)
                {
                    if (mainOwnTypes.Contains(refType)) continue;
                    if (mainTypeToModule.TryGetValue(refType, out var mm) && mm != moduleName)
                    {
                        if (!mainCrossImports.TryGetValue(mm, out var list))
                            mainCrossImports[mm] = list = [];
                        list.Add(refType);
                    }
                }

                // Build version lookup for annotating declare module lines
                var versionLookup = new Dictionary<string, string>(StringComparer.Ordinal);
                if (index.Version != null)
                    versionLookup[index.Package] = index.Version;
                if (index.Dependencies != null)
                    foreach (var dep in index.Dependencies)
                        if (dep.Version != null)
                            versionLookup[dep.Package] = dep.Version;

                string AnnotateModule(string line, string modName)
                {
                    return AnnotateModuleLine(line, modName, versionLookup);
                }

                {
                    var declareLine = $"declare module \"{moduleName}\" {{";
                    sb.AppendLine(AnnotateModule(declareLine, moduleName));
                    sb.AppendLine();

                    // Emit Node.js import references per module
                    foreach (var (nodeModule, nodeTypes) in nodeImports)
                        sb.AppendLine($"    import type {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");

                    if (depsForThisCondition is not null)
                    {
                        // Build depModuleName → packageName mapping for collision alias lookups.
                        // depModuleName may include a condition suffix (e.g., "pkg/import"),
                        // so we need to map back to the bare package name.
                        var depModuleToPackage = new Dictionary<string, string>(StringComparer.Ordinal);
                        foreach (var (dmn, dcs, dis, des, dts, dfs, _) in depsForThisCondition)
                        {
                            // Package name is the module name without any condition suffix
                            var pkgName = dmn;
                            if (index.ResolvedDependencies is not null)
                            {
                                foreach (var rd in index.ResolvedDependencies)
                                {
                                    if (dmn == rd.Package || dmn.StartsWith(rd.Package + "/"))
                                    {
                                        pkgName = rd.Package;
                                        break;
                                    }
                                }
                            }
                            else if (index.Dependencies is not null)
                            {
                                foreach (var d in index.Dependencies)
                                {
                                    if (dmn == d.Package || dmn.StartsWith(d.Package + "/"))
                                    {
                                        pkgName = d.Package;
                                        break;
                                    }
                                }
                            }
                            depModuleToPackage.TryAdd(dmn, pkgName);
                        }

                        foreach (var (depModuleName, depClasses, depInterfaces, depEnums, depTypes, depFunctions, _) in depsForThisCondition)
                        {
                            var importNames = new List<string>();
                            var aliasedNames = new List<(string Name, string Alias)>();
                            var pkgName = depModuleToPackage.GetValueOrDefault(depModuleName, depModuleName);

                            void EmitImport(string name)
                            {
                                if (collisionAliases.TryGetValue(name, out var aliasEntry)
                                    && aliasEntry.TryGetValue(pkgName, out var alias)
                                    && alias != name)
                                {
                                    aliasedNames.Add((name, alias));
                                }
                                else
                                {
                                    importNames.Add(name);
                                }
                            }

                            foreach (var c in depClasses) EmitImport(c.Name);
                            foreach (var i in depInterfaces) EmitImport(i.Name);
                            foreach (var e in depEnums) EmitImport(e.Name);
                            foreach (var t in depTypes) EmitImport(t.Name);

                            if (importNames.Count > 0)
                                sb.AppendLine($"    import type {{ {string.Join(", ", importNames)} }} from \"{depModuleName}\";");
                            foreach (var (name, alias) in aliasedNames)
                                sb.AppendLine($"    import type {{ {name} as {alias} }} from \"{depModuleName}\";");
                        }
                    }

                    // Emit cross-condition import statements
                    foreach (var (importModule, importTypes) in mainCrossImports.OrderBy(kv => kv.Key))
                        sb.AppendLine($"    import type {{ {string.Join(", ", importTypes)} }} from \"{importModule}\";");

                    if (depsForThisCondition is not null || mainCrossImports.Count > 0 || nodeImports.Count > 0)
                        sb.AppendLine();

                    RenderModuleTypes(sb, group.Classes, group.Interfaces, group.Enums, group.Types, group.Functions, group.Namespaces, prioritize: true);

                    sb.AppendLine("}");
                    sb.AppendLine();
                }
            }
        }
        else
        {
            // Simple case: single export path, single condition.
            // When targetCondition is set (per-target mode), render main types into a
            // buffer and wrap in a declare module block. Otherwise emit at top level.
            if (isPerTarget)
                mainSb = new StringBuilder();

            // Build version lookup for annotating declare module lines (per-target mode)
            var versionLookup = new Dictionary<string, string>(StringComparer.Ordinal);
            if (index.Version != null)
                versionLookup[index.Package] = index.Version;
            if (depsToRender != null)
                foreach (var dep in depsToRender)
                    if (dep.Version != null)
                        versionLookup[dep.Package] = dep.Version;

            if (depsToRender is not null)
            {
                foreach (var dep in depsToRender)
                {
                    if (dep.IsNode) continue;
                    var importNames = new List<string>();
                    var aliasedNames = new List<(string Name, string Alias)>();

                    void EmitSimpleImport(string name)
                    {
                        if (collisionAliases.TryGetValue(name, out var aliasEntry)
                            && aliasEntry.TryGetValue(dep.Package, out var alias)
                            && alias != name)
                        {
                            aliasedNames.Add((name, alias));
                        }
                        else
                        {
                            importNames.Add(name);
                        }
                    }

                    foreach (var c in dep.Classes ?? []) EmitSimpleImport(c.Name);
                    foreach (var i in dep.Interfaces ?? []) EmitSimpleImport(i.Name);
                    foreach (var e in dep.Enums ?? []) EmitSimpleImport(e.Name);
                    foreach (var t in dep.Types ?? [])
                    {
                        if (!IsSelfReferentialAlias(t))
                            EmitSimpleImport(t.Name);
                    }
                    if (importNames.Count > 0)
                        mainSb.AppendLine($"import type {{ {string.Join(", ", importNames)} }} from \"{dep.Package}\";");
                    foreach (var (name, alias) in aliasedNames)
                        mainSb.AppendLine($"import type {{ {name} as {alias} }} from \"{dep.Package}\";");
                }

                mainSb.AppendLine();
            }

            var prioritizedClasses = GetPrioritizedClasses(allClasses, typeDeps);

            // First pass: Include client classes and their dependencies
            foreach (var cls in prioritizedClasses)
            {
                if (mainSb.Length >= maxLength) break;

                // Include this class
                var classStr = FormatReachabilityComment(cls.Name, reachabilityChains) + FormatClass(cls);
                if (mainSb.Length + classStr.Length > maxLength - 100 && includedItems > 0)
                    break;

                mainSb.Append(classStr);
                includedTypeNames.Add(cls.Name);
                includedItems++;

                // Include its dependencies (interfaces, enums, types)
                foreach (var depName in typeDeps.GetValueOrDefault(cls.Name, []))
                {
                    if (includedTypeNames.Contains(depName)) continue;
                    if (mainSb.Length >= maxLength) break;

                    // Try to find and include the dependency
                    if (interfacesByName.TryGetValue(depName, out var iface))
                    {
                        var ifaceStr = FormatReachabilityComment(iface.Name, reachabilityChains) + FormatInterface(iface);
                        if (mainSb.Length + ifaceStr.Length <= maxLength)
                        {
                            mainSb.Append(ifaceStr);
                            includedTypeNames.Add(depName);
                            includedItems++;
                        }
                        continue;
                    }

                    if (enumsByName.TryGetValue(depName, out var enumDef))
                    {
                        var enumStr = FormatReachabilityComment(enumDef.Name, reachabilityChains) + FormatEnum(enumDef);
                        if (mainSb.Length + enumStr.Length <= maxLength)
                        {
                            mainSb.Append(enumStr);
                            includedTypeNames.Add(depName);
                            includedItems++;
                        }
                        continue;
                    }

                    if (typesByName.TryGetValue(depName, out var typeDef))
                    {
                        var typeStr = FormatReachabilityComment(typeDef.Name, reachabilityChains) + FormatTypeAlias(typeDef);
                        if (mainSb.Length + typeStr.Length <= maxLength)
                        {
                            mainSb.Append(typeStr);
                            includedTypeNames.Add(depName);
                            includedItems++;
                        }
                    }
                }
            }
        }

        // Include remaining interfaces if space permits
        foreach (var iface in allInterfaces.Where(i => !includedTypeNames.Contains(i.Name)))
        {
            if (mainSb.Length >= maxLength) break;
            var ifaceStr = FormatReachabilityComment(iface.Name, reachabilityChains) + FormatInterface(iface);
            if (mainSb.Length + ifaceStr.Length <= maxLength)
            {
                mainSb.Append(ifaceStr);
                includedTypeNames.Add(iface.Name);
                includedItems++;
            }
        }

        // Include remaining enums if space permits
        foreach (var enumDef in allEnums.Where(e => !includedTypeNames.Contains(e.Name)))
        {
            if (mainSb.Length >= maxLength) break;
            var enumStr = FormatReachabilityComment(enumDef.Name, reachabilityChains) + FormatEnum(enumDef);
            if (mainSb.Length + enumStr.Length <= maxLength)
            {
                mainSb.Append(enumStr);
                includedTypeNames.Add(enumDef.Name);
                includedItems++;
            }
        }

        // Include remaining type aliases if space permits
        foreach (var typeDef in allTypes.Where(t => !includedTypeNames.Contains(t.Name)))
        {
            if (mainSb.Length >= maxLength) break;
            var typeStr = FormatReachabilityComment(typeDef.Name, reachabilityChains) + FormatTypeAlias(typeDef);
            if (mainSb.Length + typeStr.Length <= maxLength)
            {
                mainSb.Append(typeStr);
                includedTypeNames.Add(typeDef.Name);
                includedItems++;
            }
        }

        // Include remaining functions if space permits (limit to first 20)
        int funcCount = 0;
        foreach (var fn in allFunctions.Where(f => f.ExportPath is null or ".").Take(20))
        {
            if (mainSb.Length >= maxLength) break;
            var fnStr = FormatReachabilityComment(fn.Name, reachabilityChains) + FormatFunction(fn);
            if (mainSb.Length + fnStr.Length <= maxLength)
            {
                mainSb.Append(fnStr);
                includedItems++;
                funcCount++;
            }
        }

        // Include namespaces from modules if space permits
        var allNamespaces = index.Modules.SelectMany(m => m.Namespaces ?? []).ToList();
        foreach (var ns in allNamespaces)
        {
            if (mainSb.Length >= maxLength) break;
            var nsStr = FormatNamespace(ns);
            if (mainSb.Length + nsStr.Length <= maxLength)
            {
                mainSb.Append(nsStr);
                includedItems++;
            }
        }

        // For per-target simple path: save main content and emit deps first, then main module.
        // This matches the old WrapInDeclareModules ordering: dep modules precede the main module.
        string? pendingMainContent = null;
        Dictionary<string, string>? mainVersionLookup = null;
        if (mainSb != sb)
        {
            pendingMainContent = mainSb.ToString();
            mainVersionLookup = new Dictionary<string, string>(StringComparer.Ordinal);
            if (index.Version != null)
                mainVersionLookup[index.Package] = index.Version;
        }

        // Fallback for simple (non-sectioned) rendering: emit dependencies as
        // declare module blocks when they weren't already rendered inline above.
        if (depsToRender is not null && depsToRender.Count > 0 && !needsSections && sb.Length < maxLength)
        {
            // depsToRender was already condition-filtered above (near needsSections).

            // Build version lookup for dep module annotations
            var depVersionLookup = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var dep in depsToRender)
                if (dep.Version != null)
                    depVersionLookup[dep.Package] = dep.Version;

            // Build type→depPackage map for cross-dep imports using referencedTypes
            var typeToDepPackage = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var dep in depsToRender)
            {
                if (dep.IsNode) continue;
                foreach (var c in dep.Classes ?? []) typeToDepPackage.TryAdd(c.Name, dep.Package);
                foreach (var i in dep.Interfaces ?? []) typeToDepPackage.TryAdd(i.Name, dep.Package);
                foreach (var e in dep.Enums ?? []) typeToDepPackage.TryAdd(e.Name, dep.Package);
                foreach (var t in dep.Types ?? [])
                    if (!IsSelfReferentialAlias(t) && t.Name is not null) typeToDepPackage.TryAdd(t.Name, dep.Package);
                foreach (var f in dep.Functions ?? [])
                    if (f.Name is not null) typeToDepPackage.TryAdd(f.Name, dep.Package);
            }

            // Build node type→module map for cross-dep node imports
            var nodeTypeToModule = new Dictionary<string, string>(StringComparer.Ordinal);
            foreach (var (nodeModule, nodeTypes) in nodeImports)
                foreach (var nt in nodeTypes)
                    nodeTypeToModule.TryAdd(nt, nodeModule);

            // Collect own type names (main package) for filtering out self-references
            var ownTypeNames = new HashSet<string>(StringComparer.Ordinal);
            foreach (var c in allClasses) ownTypeNames.Add(c.Name);
            foreach (var i in allInterfaces) ownTypeNames.Add(i.Name);
            foreach (var e in allEnums) ownTypeNames.Add(e.Name);
            foreach (var t in allTypes) ownTypeNames.Add(t.Name);

            sb.AppendLine();
            sb.AppendLine("// ============================================================================");
            sb.AppendLine("// Dependencies");
            sb.AppendLine("// ============================================================================");

            // Only emit top-level node imports when NOT wrapping in a declare module block.
            // When wrapping, the imports are emitted inside the module block further below.
            if (mainSb == sb && nodeImports.Count > 0)
            {
                sb.AppendLine();
                foreach (var (nodeModule, nodeTypes) in nodeImports)
                    sb.AppendLine($"import type {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");
            }

            foreach (var dep in depsToRender)
            {
                if (sb.Length >= maxLength) break;
                if (dep.IsNode) continue;

                var classes = dep.Classes?.ToList() ?? [];
                var interfaces = dep.Interfaces?.ToList() ?? [];
                var enums = dep.Enums?.ToList() ?? [];
                var types = dep.Types?.Where(t => !IsSelfReferentialAlias(t)).ToList() ?? [];
                var functions = dep.Functions?.ToList() ?? [];
                var namespaces = dep.Namespaces?.ToList() ?? [];

                if (classes.Count + interfaces.Count + enums.Count + types.Count + functions.Count + namespaces.Count == 0)
                    continue;

                // Collect cross-module imports using referencedTypes
                var moduleRefs = CollectAllReferencedTypes(classes, interfaces, enums, types, functions);
                var crossImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                var depNodeImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);

                // Build set of locally-defined type names to avoid importing types already in this module
                var localTypeNames = new HashSet<string>(StringComparer.Ordinal);
                foreach (var c in classes) localTypeNames.Add(c.Name);
                foreach (var i in interfaces) localTypeNames.Add(i.Name);
                foreach (var e in enums) localTypeNames.Add(e.Name);
                foreach (var t in types) if (t.Name is not null) localTypeNames.Add(t.Name);
                foreach (var f in functions) if (f.Name is not null) localTypeNames.Add(f.Name);

                foreach (var refType in moduleRefs)
                {
                    if (ownTypeNames.Contains(refType)) continue;
                    if (localTypeNames.Contains(refType)) continue;

                    if (typeToDepPackage.TryGetValue(refType, out var sourcePackage) && sourcePackage != dep.Package)
                    {
                        if (!crossImports.TryGetValue(sourcePackage, out var list))
                            crossImports[sourcePackage] = list = [];
                        list.Add(refType);
                        continue;
                    }

                    if (nodeTypeToModule.TryGetValue(refType, out var nm))
                    {
                        if (!depNodeImports.TryGetValue(nm, out var nlist))
                            depNodeImports[nm] = nlist = [];
                        if (!nlist.Contains(refType))
                            nlist.Add(refType);
                    }
                }

                sb.AppendLine();
                sb.AppendLine(AnnotateModuleLine($"declare module \"{dep.Package}\" {{", dep.Package, depVersionLookup));

                // Emit cross-module imports
                foreach (var (importModule, importTypes) in crossImports.OrderBy(kv => kv.Key))
                    sb.AppendLine($"    import type {{ {string.Join(", ", importTypes)} }} from \"{importModule}\";");
                foreach (var (nodeModule, nodeTypes) in depNodeImports.OrderBy(kv => kv.Key))
                    sb.AppendLine($"    import type {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");
                if (crossImports.Count > 0 || depNodeImports.Count > 0)
                    sb.AppendLine();

                sb.AppendLine();
                RenderModuleTypes(sb, classes, interfaces, enums, types, functions, namespaces);
                sb.AppendLine("}");
            }
        }

        // Flush the main module content (per-target simple path) after deps
        if (pendingMainContent is not null && pendingMainContent.Length > 0 && mainVersionLookup is not null)
        {
            sb.AppendLine();
            sb.AppendLine(AnnotateModuleLine($"declare module \"{index.Package}\" {{", index.Package, mainVersionLookup));

            // Emit Node.js import references per module (mirrors the sectioned path)
            foreach (var (nodeModule, nodeTypes) in nodeImports)
                sb.AppendLine($"    import type {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");
            if (nodeImports.Count > 0)
                sb.AppendLine();

            // Indent each line, stripping redundant 'declare' modifier (TS1038)
            foreach (var line in pendingMainContent.TrimEnd('\r', '\n').Split('\n'))
            {
                var trimmed = line.TrimEnd('\r');
                if (string.IsNullOrWhiteSpace(trimmed))
                    sb.AppendLine();
                else
                {
                    if (trimmed.StartsWith("export declare ", StringComparison.Ordinal))
                        trimmed = string.Concat("export ", trimmed.AsSpan("export declare ".Length));
                    sb.AppendLine("    " + trimmed);
                }
            }

            sb.AppendLine("}");
        }

        // Add truncation notice if needed
        if (includedItems < totalItems)
        {
            sb.AppendLine($"// ... truncated ({totalItems - includedItems} items omitted)");
        }

        // No post-processing needed: collision aliases are already applied to entity
        // bodies by the TS extraction engine (resolveCollisions in collision.ts).
        // The C# formatter just emits aliased imports based on collisionAliases above.
        return sb.ToString();
    }

    /// <summary>Annotate a declare module line with a version comment if available.</summary>
    private static string AnnotateModuleLine(string line, string modName, Dictionary<string, string> versionLookup)
    {
        if (versionLookup.TryGetValue(modName, out var ver))
            return $"{line} // {ver}";
        foreach (var (pkg, v) in versionLookup)
            if (modName.StartsWith(pkg + "/", StringComparison.Ordinal))
                return $"{line} // {v}";
        return line;
    }

    private static List<ClassInfo> GetPrioritizedClasses(List<ClassInfo> classes, Dictionary<string, HashSet<string>> deps)
    {
        List<ClassInfo> result = [];
        HashSet<string> added = [];

        // Pre-build dictionary for O(1) lookups
        var classesByName = SafeToDictionary(classes, c => c.Name);

        // Add client classes first (priority 0)
        var clientClasses = classes.Where(c => c.IsClientType).OrderBy(c => c.Name).ToList();
        foreach (var client in clientClasses)
        {
            result.Add(client);
            added.Add(client.Name);
        }

        // Add classes that clients depend on
        foreach (var client in clientClasses)
        {
            foreach (var depName in deps.GetValueOrDefault(client.Name, []))
            {
                if (classesByName.TryGetValue(depName, out var depClass) && !added.Contains(depClass.Name))
                {
                    result.Add(depClass);
                    added.Add(depClass.Name);
                }
            }
        }

        // Add remaining classes sorted by priority
        foreach (var cls in classes.Where(c => !added.Contains(c.Name)).OrderBy(c => c.TruncationPriority).ThenBy(c => c.Name))
        {
            result.Add(cls);
        }

        return result;
    }

    private static string FormatClass(ClassInfo cls, bool exportKeyword = true, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        if (cls.IsDeprecated == true)
            sb.AppendLine($"/** @deprecated{(string.IsNullOrWhiteSpace(cls.DeprecatedMessage) ? "" : $" {cls.DeprecatedMessage}")} */");
        if (!string.IsNullOrEmpty(cls.Doc))
            sb.AppendLine($"/** {cls.Doc} */");
        var ext = !string.IsNullOrEmpty(cls.Extends) ? $" extends {cls.Extends}" : "";
        var impl = cls.Implements?.Count > 0 ? $" implements {string.Join(", ", cls.Implements)}" : "";
        var typeParams = !string.IsNullOrEmpty(cls.TypeParams) ? $"<{cls.TypeParams}>" : "";
        var prefix = insideDeclareModule ? "export " : exportKeyword ? "export declare " : "declare ";
        var abstractPrefix = cls.Abstract == true ? "abstract " : "";
        sb.AppendLine($"{prefix}{abstractPrefix}class {cls.Name}{typeParams}{ext}{impl} {{");

        foreach (var prop in cls.Properties ?? [])
        {
            if (prop.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(prop.DeprecatedMessage) ? "" : $" {prop.DeprecatedMessage}")} */");
            var opt = prop.Optional == true ? "?" : "";
            var ro = prop.Readonly == true ? "readonly " : "";
            var stat = prop.Static == true ? "static " : "";
            sb.AppendLine($"    {stat}{ro}{prop.Name}{opt}: {prop.Type};");
        }

        foreach (var sig in cls.IndexSignatures ?? [])
        {
            var ro = sig.Readonly == true ? "readonly " : "";
            sb.AppendLine($"    {ro}[{sig.KeyName}: {sig.KeyType}]: {sig.ValueType};");
        }

        foreach (var ctor in cls.Constructors ?? [])
        {
            if (ctor.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(ctor.DeprecatedMessage) ? "" : $" {ctor.DeprecatedMessage}")} */");
            sb.AppendLine($"    constructor({ctor.Sig});");
        }

        foreach (var m in cls.Methods ?? [])
        {
            if (m.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(m.DeprecatedMessage) ? "" : $" {m.DeprecatedMessage}")} */");
            var stat = m.Static == true ? "static " : "";
            var abs = m.Abstract == true ? "abstract " : "";
            var mTypeParams = !string.IsNullOrEmpty(m.TypeParams) ? $"<{m.TypeParams}>" : "";
            var ret = !string.IsNullOrEmpty(m.Ret) ? $": {m.Ret}" : ": void";
            sb.AppendLine($"    {abs}{stat}{m.Name}{mTypeParams}({m.Sig}){ret};");
        }

        if ((cls.Properties?.Count ?? 0) == 0 && (cls.Constructors?.Count ?? 0) == 0 && (cls.Methods?.Count ?? 0) == 0)
        {
            sb.AppendLine("    // empty");
        }

        sb.AppendLine("}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string FormatInterface(InterfaceInfo iface, bool exportKeyword = true, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        if (iface.IsDeprecated == true)
            sb.AppendLine($"/** @deprecated{(string.IsNullOrWhiteSpace(iface.DeprecatedMessage) ? "" : $" {iface.DeprecatedMessage}")} */");
        if (!string.IsNullOrEmpty(iface.Doc))
            sb.AppendLine($"/** {iface.Doc} */");
        var ext = iface.Extends?.Count > 0 ? $" extends {string.Join(", ", iface.Extends)}" : "";
        var typeParams = !string.IsNullOrEmpty(iface.TypeParams) ? $"<{iface.TypeParams}>" : "";
        var prefix = insideDeclareModule ? "export " : exportKeyword ? "export declare " : "declare ";
        sb.AppendLine($"{prefix}interface {iface.Name}{typeParams}{ext} {{");

        foreach (var prop in iface.Properties ?? [])
        {
            if (prop.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(prop.DeprecatedMessage) ? "" : $" {prop.DeprecatedMessage}")} */");
            var opt = prop.Optional == true ? "?" : "";
            var ro = prop.Readonly == true ? "readonly " : "";
            sb.AppendLine($"    {ro}{prop.Name}{opt}: {prop.Type};");
        }

        foreach (var sig in iface.IndexSignatures ?? [])
        {
            var ro = sig.Readonly == true ? "readonly " : "";
            sb.AppendLine($"    {ro}[{sig.KeyName}: {sig.KeyType}]: {sig.ValueType};");
        }

        foreach (var m in iface.Methods ?? [])
        {
            if (m.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(m.DeprecatedMessage) ? "" : $" {m.DeprecatedMessage}")} */");
            var mTypeParams = !string.IsNullOrEmpty(m.TypeParams) ? $"<{m.TypeParams}>" : "";
            var ret = !string.IsNullOrEmpty(m.Ret) ? $": {m.Ret}" : ": void";
            sb.AppendLine($"    {m.Name}{mTypeParams}({m.Sig}){ret};");
        }

        foreach (var cs in iface.CallSignatures ?? [])
        {
            var csTypeParams = !string.IsNullOrEmpty(cs.TypeParams) ? $"<{cs.TypeParams}>" : "";
            var csRet = !string.IsNullOrEmpty(cs.Ret) ? $": {cs.Ret}" : ": void";
            sb.AppendLine($"    {csTypeParams}({cs.Sig}){csRet};");
        }

        foreach (var cts in iface.ConstructSignatures ?? [])
        {
            var ctsTypeParams = !string.IsNullOrEmpty(cts.TypeParams) ? $"<{cts.TypeParams}>" : "";
            var ctsRet = !string.IsNullOrEmpty(cts.Ret) ? $": {cts.Ret}" : ": void";
            sb.AppendLine($"    new {ctsTypeParams}({cts.Sig}){ctsRet};");
        }

        sb.AppendLine("}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string FormatEnum(EnumInfo e, bool exportKeyword = true, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        if (e.IsDeprecated == true)
            sb.AppendLine($"/** @deprecated{(string.IsNullOrWhiteSpace(e.DeprecatedMessage) ? "" : $" {e.DeprecatedMessage}")} */");
        if (!string.IsNullOrEmpty(e.Doc))
            sb.AppendLine($"/** {e.Doc} */");
        var prefix = insideDeclareModule ? "export " : exportKeyword ? "export declare " : "declare ";
        var constPrefix = e.IsConst == true ? "const " : "";
        sb.AppendLine($"{prefix}{constPrefix}enum {e.Name} {{");
        if (e.Values is not null)
            sb.AppendLine($"    {string.Join(", ", e.Values)}");
        sb.AppendLine("}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string FormatTypeAlias(TypeAliasInfo t, bool exportKeyword = true, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        if (t.IsDeprecated == true)
            sb.AppendLine($"/** @deprecated{(string.IsNullOrWhiteSpace(t.DeprecatedMessage) ? "" : $" {t.DeprecatedMessage}")} */");
        if (!string.IsNullOrEmpty(t.Doc))
            sb.AppendLine($"/** {t.Doc} */");
        var prefix = insideDeclareModule ? "export " : exportKeyword ? "export declare " : "declare ";

        // `unique symbol` is only valid as a const declaration type, not in a
        // type alias.  Emit as `const x: unique symbol` instead.
        if (t.Type?.Trim() == "unique symbol")
        {
            sb.AppendLine($"{prefix}const {t.Name}: unique symbol;");
            sb.AppendLine();
            return sb.ToString();
        }

        var typeParams = !string.IsNullOrEmpty(t.TypeParams) ? $"<{t.TypeParams}>" : "";
        var typeValue = t.Type == "unresolved" || t.Type == t.Name ? "unknown" : t.Type;
        sb.AppendLine($"{prefix}type {t.Name}{typeParams} = {typeValue};");
        sb.AppendLine();
        return sb.ToString();
    }

    private static string FormatFunction(FunctionInfo fn, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        if (fn.IsDeprecated == true)
            sb.AppendLine($"/** @deprecated{(string.IsNullOrWhiteSpace(fn.DeprecatedMessage) ? "" : $" {fn.DeprecatedMessage}")} */");
        if (!string.IsNullOrEmpty(fn.Doc))
            sb.AppendLine($"/** {fn.Doc} */");
        var prefix = insideDeclareModule ? "export " : "export declare ";
        var fnTypeParams = !string.IsNullOrEmpty(fn.TypeParams) ? $"<{fn.TypeParams}>" : "";
        var ret = !string.IsNullOrEmpty(fn.Ret) ? $": {fn.Ret}" : ": void";
        sb.AppendLine($"{prefix}function {fn.Name}{fnTypeParams}({fn.Sig}){ret};");
        sb.AppendLine();
        return sb.ToString();
    }

    /// <summary>Formats a NamespaceInfo as a TypeScript namespace block.</summary>
    private static string FormatNamespace(NamespaceInfo ns, bool insideDeclareModule = false)
    {
        var sb = new StringBuilder();
        var prefix = insideDeclareModule ? "export " : "export declare ";
        sb.AppendLine($"{prefix}namespace {ns.Name} {{");
        foreach (var cls in ns.Classes ?? [])
            sb.Append(IndentBlock(FormatClass(cls, insideDeclareModule: true)));
        foreach (var iface in ns.Interfaces ?? [])
            sb.Append(IndentBlock(FormatInterface(iface, insideDeclareModule: true)));
        foreach (var e in ns.Enums ?? [])
            sb.Append(IndentBlock(FormatEnum(e, insideDeclareModule: true)));
        foreach (var t in ns.Types ?? [])
            sb.Append(IndentBlock(FormatTypeAlias(t, insideDeclareModule: true)));
        foreach (var f in ns.Functions ?? [])
            sb.Append(IndentBlock(FormatFunction(f, insideDeclareModule: true)));
        foreach (var sub in ns.Namespaces ?? [])
            sb.Append(IndentBlock(FormatNamespace(sub, insideDeclareModule: true)));
        sb.AppendLine("}");
        sb.AppendLine();
        return sb.ToString();
    }

    private static List<T> DeduplicateByName<T>(List<T> items, Func<T, string> getName)
    {
        HashSet<string> seen = [];
        List<T> result = [];
        foreach (var item in items)
        {
            if (seen.Add(getName(item)))
                result.Add(item);
        }
        return result;
    }

    /// <summary>
    /// Detects self-referential type aliases (e.g., "type X = X" or "type X = X&lt;T&gt;")
    /// produced when a dependency re-exports a type from a transitive dependency.
    /// </summary>
    private static bool IsSelfReferentialAlias(TypeAliasInfo t)
    {
        if (string.IsNullOrWhiteSpace(t.Type)) return false;
        var type = t.Type.AsSpan().Trim();
        // Exact match: type Foo = Foo
        if (type.Equals(t.Name, StringComparison.Ordinal)) return true;
        // Generic match: type Foo = Foo<T>
        if (type.StartsWith(t.Name, StringComparison.Ordinal)
            && type.Length > t.Name.Length
            && type[t.Name.Length] == '<')
            return true;
        return false;
    }

    /// <summary>
    /// Indents every non-empty line in the block by 4 spaces for declare module blocks.
    /// </summary>
    private static string IndentBlock(string block)
    {
        if (string.IsNullOrEmpty(block)) return block;
        var sb = new StringBuilder();
        foreach (var line in block.AsSpan().EnumerateLines())
        {
            if (line.IsWhiteSpace())
                sb.AppendLine();
            else
                sb.Append("    ").Append(line).AppendLine();
        }
        return sb.ToString();
    }

    /// <summary>
    /// Computes all shortest reachability chains from entry points to every reachable type
    /// using multi-source BFS over the type dependency graph.
    /// Returns a map from type name → list of chains, where each chain is a list of type
    /// names from the entry point to the target (inclusive).
    /// </summary>
    private static Dictionary<string, List<List<string>>> ComputeReachabilityChains(
        HashSet<string> entryPoints,
        Dictionary<string, HashSet<string>> typeDeps)
    {
        // result[typeName] = list of distinct shortest paths from entry points
        var result = new Dictionary<string, List<List<string>>>(StringComparer.Ordinal);

        // For each entry point, BFS and record one shortest path per target
        foreach (var entry in entryPoints.OrderBy(n => n, StringComparer.Ordinal))
        {
            // parent[node] = predecessor on the BFS tree from this entry
            var parent = new Dictionary<string, string?>(StringComparer.Ordinal) { [entry] = null };
            var queue = new Queue<string>();
            queue.Enqueue(entry);

            while (queue.Count > 0)
            {
                var current = queue.Dequeue();
                if (!typeDeps.TryGetValue(current, out var deps)) continue;
                foreach (var dep in deps)
                {
                    if (parent.ContainsKey(dep)) continue;
                    parent[dep] = current;
                    queue.Enqueue(dep);
                }
            }

            // Reconstruct paths for every reached node
            foreach (var (target, _) in parent)
            {
                if (target == entry) continue; // entry points get their own marker
                var path = new List<string>();
                string? node = target;
                while (node is not null)
                {
                    path.Add(node);
                    node = parent.GetValueOrDefault(node);
                }
                path.Reverse();

                if (!result.TryGetValue(target, out var chains))
                {
                    chains = [];
                    result[target] = chains;
                }
                // Only keep shortest paths (all BFS paths from different roots are shortest)
                if (chains.Count == 0 || chains[0].Count == path.Count)
                    chains.Add(path);
                else if (path.Count < chains[0].Count)
                {
                    chains.Clear();
                    chains.Add(path);
                }
            }
        }

        return result;
    }

    /// <summary>
    /// Formats the reachability chain comment for a type, e.g.:
    /// <code>// Reachable via: ClientA → Options → ThisType</code>
    /// Entry points get <c>// Entry point</c>.
    /// Returns empty string if no chain data is available.
    /// </summary>
    private static string FormatReachabilityComment(
        string typeName,
        Dictionary<string, List<List<string>>> chains)
    {
        if (chains.TryGetValue(typeName, out var paths) && paths.Count > 0)
        {
            var sb = new StringBuilder();
            foreach (var path in paths)
                sb.AppendLine($"// Reachable via: {string.Join(" → ", path)}");
            return sb.ToString();
        }

        return "";
    }
}
