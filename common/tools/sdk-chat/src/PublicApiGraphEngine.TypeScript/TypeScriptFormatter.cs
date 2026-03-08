// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using System.Text.RegularExpressions;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

/// <summary>
/// Formats an ApiIndex as human-readable TypeScript stub syntax.
/// Supports smart truncation that prioritizes client classes and their dependencies.
/// </summary>
public static class TypeScriptFormatter
{
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

    public static string Format(ApiIndex index, string? targetCondition = null) => Format(index, int.MaxValue, targetCondition);

    /// <summary>
    /// Formats the API surface as separate files per export condition (browser, import, require, etc.).
    /// Returns a dictionary mapping target name → (dtsContent, tsconfigContent).
    /// </summary>
    public static Dictionary<string, (string Dts, string Tsconfig)> FormatPerTarget(ApiIndex index)
    {
        var result = new Dictionary<string, (string, string)>(StringComparer.Ordinal);

        var conditions = index.Modules
            .Select(m => m.Condition)
            .Where(c => !string.IsNullOrWhiteSpace(c))
            .Select(c => c!)
            .Distinct(StringComparer.Ordinal)
            .OrderBy(c => c, StringComparer.Ordinal)
            .ToList();

        if (conditions.Count == 0)
            conditions = ["default"];

        foreach (var condition in conditions)
        {
            // Filter modules for this condition
            var conditionModules = index.Modules
                .Where(m => (m.Condition ?? "default") == condition)
                .ToList();

            // Filter resolved dependencies to those matching this condition
            var conditionResolvedDeps = index.ResolvedDependencies?
                .Select(dep => dep with
                {
                    Modules = dep.Modules
                        .Where(m => (m.Condition ?? "default") == condition)
                        .ToList()
                })
                .Where(dep => dep.Modules.Count > 0)
                .ToList();

            var subIndex = index with
            {
                Modules = conditionModules,
                ResolvedDependencies = conditionResolvedDeps is { Count: > 0 } ? conditionResolvedDeps : null,
            };

            var dts = Format(subIndex, condition);
            var tsconfig = GenerateTsconfig(condition);
            result[condition] = (dts, tsconfig);
        }

        return result;
    }

    /// <summary>
    /// Generates a tsconfig.json for a specific export condition target.
    /// Browser targets get "dom" lib; node targets get @types/node.
    /// </summary>
    private static string GenerateTsconfig(string condition)
    {
        var isBrowser = condition.Equals("browser", StringComparison.OrdinalIgnoreCase);
        var sb = new StringBuilder();
        sb.AppendLine("{");
        sb.AppendLine("  \"compilerOptions\": {");
        sb.AppendLine("    \"strict\": true,");
        sb.AppendLine("    \"noEmit\": true,");
        sb.AppendLine("    \"skipLibCheck\": true,");
        sb.AppendLine("    \"target\": \"ES2020\",");
        sb.AppendLine("    \"module\": \"ES2020\",");
        sb.AppendLine("    \"moduleResolution\": \"node\",");

        if (isBrowser)
            sb.AppendLine("    \"lib\": [\"ES2020\", \"DOM\", \"DOM.Iterable\"]");
        else
            sb.AppendLine("    \"lib\": [\"ES2020\"]");

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

        // Emit triple-slash references — skip node reference for browser targets
        bool isBrowserTarget = targetCondition?.Equals("browser", StringComparison.OrdinalIgnoreCase) == true;
        if (!isBrowserTarget)
            sb.AppendLine("/// <reference types=\"node\" />");
        sb.AppendLine("/// <reference lib=\"es2020\" />");
        sb.AppendLine($"// {index.Package} - Public API Surface");
        sb.AppendLine("// Graphed by PublicApiGraphEngine.TypeScript");
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

        // Detect distinct conditions and build type→conditions mapping
        var distinctConditions = index.Modules
            .Select(m => m.Condition)
            .Where(c => !string.IsNullOrWhiteSpace(c))
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
                var cond = module.Condition ?? "default";
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

        // Build dependency graph for classes, interfaces, and type aliases
        var typeDeps = new Dictionary<string, HashSet<string>>();
        HashSet<string> reusableDeps2 = [];
        foreach (var cls in allClasses)
        {
            cls.CollectReferencedTypes(allTypeNames, reusableDeps2);
            typeDeps[cls.Name] = new HashSet<string>(reusableDeps2);
        }
        foreach (var iface in allInterfaces)
        {
            iface.CollectReferencedTypes(allTypeNames, reusableDeps2);
            typeDeps[iface.Name] = new HashSet<string>(reusableDeps2);
        }
        foreach (var t in allTypes)
        {
            t.CollectReferencedTypes(allTypeNames, reusableDeps2);
            typeDeps[t.Name] = new HashSet<string>(reusableDeps2);
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

        // Sort export paths: "." first, then alphabetically
        var sortedExportPaths = exportPaths
            .OrderBy(p => p == "." ? "" : p)
            .ToList();

        int totalItems = allClasses.Count + allInterfaces.Count + allEnums.Count + allTypes.Count + allFunctions.Count;
        int includedItems = 0;
        HashSet<string> includedTypeNames = [];

        // Unified rendering: group types by (exportPath, condition) pair.
        // Each group becomes a `declare module` block in the output.
        // Types use their own ExportPath if set, falling back to the module's.
        bool hasSubpaths = sortedExportPaths.Count > 1;
        bool needsSections = hasSubpaths || hasMultipleConditions;

        // Collect Node.js type imports grouped by their specific node:* module
        // Skip for browser targets where node types aren't available
        var nodeImports = new Dictionary<string, List<string>>();
        if (!isBrowserTarget && index.Dependencies is not null)
        {
            foreach (var dep in index.Dependencies)
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

        if (needsSections)
        {
            // Group types by (exportPath, condition)
            var moduleGroups = new Dictionary<string, (List<ClassInfo> Classes, List<InterfaceInfo> Interfaces,
                List<EnumInfo> Enums, List<TypeAliasInfo> Types, List<FunctionInfo> Functions)>();

            void AddToGroup(string groupKey, ClassInfo? cls = null, InterfaceInfo? iface = null,
                EnumInfo? en = null, TypeAliasInfo? ta = null, FunctionInfo? fn = null)
            {
                if (!moduleGroups.TryGetValue(groupKey, out var g))
                {
                    g = ([], [], [], [], []);
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
            }

            foreach (var module in index.Modules)
            {
                var condition = module.Condition ?? "default";

                string GroupKey(string? typeExportPath)
                {
                    var ep = typeExportPath ?? module.ExportPath ?? ".";
                    return $"{ep}||{condition}";
                }

                foreach (var c in module.Classes ?? []) AddToGroup(GroupKey(c.ExportPath), cls: c);
                foreach (var i in module.Interfaces ?? []) AddToGroup(GroupKey(i.ExportPath), iface: i);
                foreach (var e in module.Enums ?? []) AddToGroup(GroupKey(null), en: e);
                foreach (var t in module.Types ?? []) AddToGroup(GroupKey(null), ta: t);
                foreach (var f in module.Functions ?? []) AddToGroup(GroupKey(f.ExportPath), fn: f);
            }

            // Sort groups: by exportPath first (. before subpaths), then condition alphabetically
            var sortedGroups = moduleGroups
                .OrderBy(g =>
                {
                    var ep = g.Key.Split("||")[0];
                    return ep == "." ? "" : ep;
                })
                .ThenBy(g => g.Key.Split("||")[1])
                .ToList();

        // Pre-build dependency groups by condition for nesting inside main modules.
        // Maps condition → list of (depModuleName, types) for rendering nested declare modules.
        var depsByCondition = new Dictionary<string, List<(string ModuleName, List<ClassInfo> Classes,
            List<InterfaceInfo> Interfaces, List<EnumInfo> Enums, List<TypeAliasInfo> Types,
            List<FunctionInfo> Functions)>>();

        if (index.ResolvedDependencies is not null)
        {
            // Collect all conditions available in each dependency
            var depConditionMap = new Dictionary<string, HashSet<string>>(); // pkg → conditions
            foreach (var dep in index.ResolvedDependencies)
            {
                var conds = new HashSet<string>(dep.Modules
                    .Select(m => m.Condition ?? "default")
                    .Distinct(StringComparer.Ordinal));
                depConditionMap[dep.Package] = conds;
            }

            // For each main condition, find the matching (or fallback) dependency condition
            var allMainConditions = new HashSet<string>();
            foreach (var module in index.Modules)
                allMainConditions.Add(module.Condition ?? "default");

            foreach (var mainCond in allMainConditions)
            {
                var depsForCond = new List<(string ModuleName, List<ClassInfo> Classes,
                    List<InterfaceInfo> Interfaces, List<EnumInfo> Enums, List<TypeAliasInfo> Types,
                    List<FunctionInfo> Functions)>();

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
                    var seenNames = new HashSet<string>();

                    foreach (var module in dep.Modules.Where(m => (m.Condition ?? "default") == matchedCond))
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
                    }

                    if (classes.Count + interfaces.Count + enums.Count + types.Count + functions.Count == 0)
                        continue;

                    var depHasMultipleConditions = depConds.Count > 1;
                    var depModuleName = depHasMultipleConditions && matchedCond != "default"
                        ? $"{dep.Package}/{matchedCond}"
                        : dep.Package;

                    depsForCond.Add((depModuleName, classes, interfaces, enums, types, functions));
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
                allMainConditions.Add(module.Condition ?? "default");

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
                    List<FunctionInfo> Functions)>();

                foreach (var dep in index.Dependencies)
                {
                    if (dep.IsNode) continue;
                    var classes = dep.Classes?.ToList() ?? [];
                    var interfaces = dep.Interfaces?.ToList() ?? [];
                    var enums = dep.Enums?.ToList() ?? [];
                    var types = dep.Types?.Where(t => t.Type != "unresolved" && !IsSelfReferentialAlias(t)).ToList() ?? [];
                    List<FunctionInfo> functions = [];

                    if (classes.Count + interfaces.Count + enums.Count + types.Count == 0)
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

                    depsForCond.Add((depModuleName, classes, interfaces, enums, types, functions));
                }

                if (depsForCond.Count > 0)
                    depsByCondition[mainCond] = depsForCond;
            }
        }

        // Helper to render types inside a declare module block
        void RenderModuleTypes(StringBuilder target, List<ClassInfo> classes, List<InterfaceInfo> interfaces,
            List<EnumInfo> enums, List<TypeAliasInfo> typeAliases, List<FunctionInfo> functions,
            bool prioritize = false)
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
        }

        // Render modules grouped by condition: for each condition, emit dependency
        // modules first, then the main package module with import statements.
        // This keeps related modules together and ensures deps are declared before imports.

        // Pre-build main module type → module name mapping so dep modules can
        // import types defined in the main package modules (e.g., re-exports).
        var mainTypeToModule = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var (k, g) in sortedGroups)
        {
            var kParts = k.Split("||");
            var ep = kParts[0];
            var cond = kParts[1];
            string mName;
            if (ep is "." or "")
                mName = hasMultipleConditions ? $"{index.Package}/{cond}" : index.Package;
            else
            {
                var sp = ep.StartsWith("./", StringComparison.Ordinal) ? ep[2..] : ep;
                mName = hasMultipleConditions ? $"{index.Package}/{sp}/{cond}" : $"{index.Package}/{sp}";
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

                var keyParts = key.Split("||");
                var exportPath = keyParts[0];
                var condition = keyParts[1];

                // Build module name: "pkg/condition" or "pkg/subpath/condition"
                string moduleName;
                if (exportPath is "." or "")
                {
                    moduleName = hasMultipleConditions
                        ? $"{index.Package}/{condition}"
                        : index.Package;
                }
                else
                {
                    var subpath = exportPath.StartsWith("./", StringComparison.Ordinal) ? exportPath[2..] : exportPath;
                    moduleName = hasMultipleConditions
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
                    foreach (var (dmn, dcs, dis, des, dts, dfs) in depsForThisCondition)
                    {
                        foreach (var c in dcs) typeToDepModule.TryAdd(c.Name, dmn);
                        foreach (var i in dis) typeToDepModule.TryAdd(i.Name, dmn);
                        foreach (var e in des) typeToDepModule.TryAdd(e.Name, dmn);
                        foreach (var t in dts) typeToDepModule.TryAdd(t.Name, dmn);
                    }

                    foreach (var (depModuleName, depClasses, depInterfaces, depEnums, depTypes, depFunctions) in depsForThisCondition)
                    {
                        if (sb.Length >= maxLength) break;
                        if (!emittedDepModules.Add(depModuleName)) continue;

                        // Render body first so we can scan for cross-dep type references
                        var depBodySb = new StringBuilder();
                        RenderModuleTypes(depBodySb, depClasses, depInterfaces, depEnums, depTypes, depFunctions);
                        var depBody = depBodySb.ToString();

                        // Collect type names defined in THIS dep module
                        var ownTypeNames = new HashSet<string>(StringComparer.Ordinal);
                        foreach (var c in depClasses) ownTypeNames.Add(c.Name);
                        foreach (var i in depInterfaces) ownTypeNames.Add(i.Name);
                        foreach (var e in depEnums) ownTypeNames.Add(e.Name);
                        foreach (var t in depTypes) ownTypeNames.Add(t.Name);

                        // Find cross-dep imports: types from other dep modules referenced in body
                        var crossImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                        foreach (var (typeName, sourceModule) in typeToDepModule)
                        {
                            if (ownTypeNames.Contains(typeName)) continue;
                            if (sourceModule == depModuleName) continue;
                            if (Regex.IsMatch(depBody, @$"\b{Regex.Escape(typeName)}\b"))
                            {
                                if (!crossImports.TryGetValue(sourceModule, out var list))
                                    crossImports[sourceModule] = list = [];
                                list.Add(typeName);
                            }
                        }

                        // Find node type imports referenced in body
                        foreach (var (nodeModule, nodeTypes) in nodeImports)
                        {
                            foreach (var nt in nodeTypes)
                            {
                                if (Regex.IsMatch(depBody, @$"\b{Regex.Escape(nt)}\b"))
                                {
                                    if (!crossImports.TryGetValue(nodeModule, out var list))
                                        crossImports[nodeModule] = list = [];
                                    list.Add(nt);
                                }
                            }
                        }

                        // Find main module type imports: types from main package modules
                        // referenced in dep body (e.g., re-exported types used in dep signatures)
                        foreach (var (mainTypeName, mainModule) in mainTypeToModule)
                        {
                            if (ownTypeNames.Contains(mainTypeName)) continue;
                            if (typeToDepModule.ContainsKey(mainTypeName)) continue;
                            if (Regex.IsMatch(depBody, @$"\b{Regex.Escape(mainTypeName)}\b"))
                            {
                                if (!crossImports.TryGetValue(mainModule, out var list))
                                    crossImports[mainModule] = list = [];
                                list.Add(mainTypeName);
                            }
                        }

                        sb.AppendLine($"declare module \"{depModuleName}\" {{");
                        sb.AppendLine();

                        // Emit cross-dep import statements
                        foreach (var (importModule, importTypes) in crossImports.OrderBy(kv => kv.Key))
                            sb.AppendLine($"    import {{ {string.Join(", ", importTypes)} }} from \"{importModule}\";");
                        if (crossImports.Count > 0) sb.AppendLine();

                        sb.Append(depBody);
                        sb.AppendLine("}");
                        sb.AppendLine();
                    }
                }

                // Render the main package module body to a buffer for cross-module scanning
                var mainBodySb = new StringBuilder();
                RenderModuleTypes(mainBodySb, group.Classes, group.Interfaces, group.Enums, group.Types, group.Functions, prioritize: true);
                var mainBody = mainBodySb.ToString();

                // Collect own type names for this main module
                var mainOwnTypes = new HashSet<string>(StringComparer.Ordinal);
                foreach (var c in group.Classes) mainOwnTypes.Add(c.Name);
                foreach (var i in group.Interfaces) mainOwnTypes.Add(i.Name);
                foreach (var e in group.Enums) mainOwnTypes.Add(e.Name);
                foreach (var t in group.Types) mainOwnTypes.Add(t.Name);

                // Find cross-condition imports: types from other main modules referenced in body
                var mainCrossImports = new Dictionary<string, List<string>>(StringComparer.Ordinal);
                foreach (var (mainTypeName, mainModule) in mainTypeToModule)
                {
                    if (mainModule == moduleName) continue;
                    if (mainOwnTypes.Contains(mainTypeName)) continue;
                    if (Regex.IsMatch(mainBody, @$"\b{Regex.Escape(mainTypeName)}\b"))
                    {
                        if (!mainCrossImports.TryGetValue(mainModule, out var list))
                            mainCrossImports[mainModule] = list = [];
                        list.Add(mainTypeName);
                    }
                }

                sb.AppendLine($"declare module \"{moduleName}\" {{");
                sb.AppendLine();

                // Emit Node.js import references per module
                foreach (var (nodeModule, nodeTypes) in nodeImports)
                    sb.AppendLine($"    import {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");

                if (depsForThisCondition is not null)
                {
                    foreach (var (depModuleName, depClasses, depInterfaces, depEnums, depTypes, depFunctions) in depsForThisCondition)
                    {
                        var importNames = new List<string>();
                        foreach (var c in depClasses) importNames.Add(c.Name);
                        foreach (var i in depInterfaces) importNames.Add(i.Name);
                        foreach (var e in depEnums) importNames.Add(e.Name);
                        foreach (var t in depTypes) importNames.Add(t.Name);

                        if (importNames.Count > 0)
                            sb.AppendLine($"    import {{ {string.Join(", ", importNames)} }} from \"{depModuleName}\";");
                    }
                }

                // Emit cross-condition import statements
                foreach (var (importModule, importTypes) in mainCrossImports.OrderBy(kv => kv.Key))
                    sb.AppendLine($"    import {{ {string.Join(", ", importTypes)} }} from \"{importModule}\";");

                if (depsForThisCondition is not null || mainCrossImports.Count > 0 || nodeImports.Count > 0)
                    sb.AppendLine();

                sb.Append(mainBody);

                sb.AppendLine("}");
                sb.AppendLine();
            }
        }
        else
        {
            // Simple case: single export path, single condition
            var prioritizedClasses = GetPrioritizedClasses(allClasses, typeDeps);

            // First pass: Include client classes and their dependencies
            foreach (var cls in prioritizedClasses)
            {
                if (sb.Length >= maxLength) break;

                // Include this class
                var classStr = FormatReachabilityComment(cls.Name, reachabilityChains) + FormatClass(cls);
                if (sb.Length + classStr.Length > maxLength - 100 && includedItems > 0)
                    break;

                sb.Append(classStr);
                includedTypeNames.Add(cls.Name);
                includedItems++;

                // Include its dependencies (interfaces, enums, types)
                foreach (var depName in typeDeps.GetValueOrDefault(cls.Name, []))
                {
                    if (includedTypeNames.Contains(depName)) continue;
                    if (sb.Length >= maxLength) break;

                    // Try to find and include the dependency
                    if (interfacesByName.TryGetValue(depName, out var iface))
                    {
                        var ifaceStr = FormatReachabilityComment(iface.Name, reachabilityChains) + FormatInterface(iface);
                        if (sb.Length + ifaceStr.Length <= maxLength)
                        {
                            sb.Append(ifaceStr);
                            includedTypeNames.Add(depName);
                            includedItems++;
                        }
                        continue;
                    }

                    if (enumsByName.TryGetValue(depName, out var enumDef))
                    {
                        var enumStr = FormatReachabilityComment(enumDef.Name, reachabilityChains) + FormatEnum(enumDef);
                        if (sb.Length + enumStr.Length <= maxLength)
                        {
                            sb.Append(enumStr);
                            includedTypeNames.Add(depName);
                            includedItems++;
                        }
                        continue;
                    }

                    if (typesByName.TryGetValue(depName, out var typeDef))
                    {
                        var typeStr = FormatReachabilityComment(typeDef.Name, reachabilityChains) + FormatTypeAlias(typeDef);
                        if (sb.Length + typeStr.Length <= maxLength)
                        {
                            sb.Append(typeStr);
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
            if (sb.Length >= maxLength) break;
            var ifaceStr = FormatReachabilityComment(iface.Name, reachabilityChains) + FormatInterface(iface);
            if (sb.Length + ifaceStr.Length <= maxLength)
            {
                sb.Append(ifaceStr);
                includedTypeNames.Add(iface.Name);
                includedItems++;
            }
        }

        // Include remaining enums if space permits
        foreach (var enumDef in allEnums.Where(e => !includedTypeNames.Contains(e.Name)))
        {
            if (sb.Length >= maxLength) break;
            var enumStr = FormatReachabilityComment(enumDef.Name, reachabilityChains) + FormatEnum(enumDef);
            if (sb.Length + enumStr.Length <= maxLength)
            {
                sb.Append(enumStr);
                includedTypeNames.Add(enumDef.Name);
                includedItems++;
            }
        }

        // Include remaining functions if space permits (limit to first 20)
        int funcCount = 0;
        foreach (var fn in allFunctions.Where(f => f.ExportPath is null).Take(20))
        {
            if (sb.Length >= maxLength) break;
            var fnStr = FormatReachabilityComment(fn.Name, reachabilityChains) + FormatFunction(fn);
            if (sb.Length + fnStr.Length <= maxLength)
            {
                sb.Append(fnStr);
                includedItems++;
                funcCount++;
            }
        }

        // Fallback for simple (non-sectioned) rendering: emit dependencies as
        // declare module blocks when they weren't already rendered inline above.
        if (index.Dependencies is not null && index.Dependencies.Count > 0 && !needsSections && sb.Length < maxLength)
        {
            sb.AppendLine();
            sb.AppendLine("// ============================================================================");
            sb.AppendLine("// Dependencies");
            sb.AppendLine("// ============================================================================");

            // Emit Node.js types as per-module import references
            if (nodeImports.Count > 0)
            {
                sb.AppendLine();
                foreach (var (nodeModule, nodeTypes) in nodeImports)
                    sb.AppendLine($"import {{ {string.Join(", ", nodeTypes)} }} from \"{nodeModule}\";");
            }

            foreach (var dep in index.Dependencies)
            {
                if (sb.Length >= maxLength) break;
                if (dep.IsNode) continue;

                var hasContent = (dep.Interfaces?.Count ?? 0) + (dep.Classes?.Count ?? 0)
                    + (dep.Enums?.Count ?? 0) + (dep.Types?.Where(t => !IsSelfReferentialAlias(t)).Count() ?? 0) > 0;
                if (!hasContent) continue;

                sb.AppendLine();
                sb.AppendLine($"declare module \"{dep.Package}\" {{");
                sb.AppendLine();

                foreach (var iface in dep.Interfaces ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    var ifaceStr = IndentBlock(FormatInterface(iface, insideDeclareModule: true));
                    if (sb.Length + ifaceStr.Length <= maxLength) { sb.Append(ifaceStr); includedItems++; }
                }
                foreach (var cls in dep.Classes ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    var clsStr = IndentBlock(FormatClass(cls, insideDeclareModule: true));
                    if (sb.Length + clsStr.Length <= maxLength) { sb.Append(clsStr); includedItems++; }
                }
                foreach (var e in dep.Enums ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    var enumStr = IndentBlock(FormatEnum(e, insideDeclareModule: true));
                    if (sb.Length + enumStr.Length <= maxLength) { sb.Append(enumStr); includedItems++; }
                }
                foreach (var t in dep.Types ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    if (IsSelfReferentialAlias(t)) continue;
                    var typeStr = IndentBlock(FormatTypeAlias(t, insideDeclareModule: true));
                    if (sb.Length + typeStr.Length <= maxLength) { sb.Append(typeStr); includedItems++; }
                }

                sb.AppendLine("}");
            }
        }

        // Add truncation notice if needed
        if (includedItems < totalItems)
        {
            sb.AppendLine($"// ... truncated ({totalItems - includedItems} items omitted)");
        }

        return sb.ToString();
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
        sb.AppendLine($"{prefix}class {cls.Name}{typeParams}{ext}{impl} {{");

        foreach (var prop in cls.Properties ?? [])
        {
            if (prop.IsDeprecated == true)
                sb.AppendLine($"    /** @deprecated{(string.IsNullOrWhiteSpace(prop.DeprecatedMessage) ? "" : $" {prop.DeprecatedMessage}")} */");
            var opt = prop.Optional == true ? "?" : "";
            var ro = prop.Readonly == true ? "readonly " : "";
            sb.AppendLine($"    {ro}{prop.Name}{opt}: {prop.Type};");
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
            var mTypeParams = !string.IsNullOrEmpty(m.TypeParams) ? $"<{m.TypeParams}>" : "";
            var ret = !string.IsNullOrEmpty(m.Ret) ? $": {m.Ret}" : ": void";
            sb.AppendLine($"    {stat}{m.Name}{mTypeParams}({m.Sig}){ret};");
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
        sb.AppendLine($"{prefix}enum {e.Name} {{");
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
