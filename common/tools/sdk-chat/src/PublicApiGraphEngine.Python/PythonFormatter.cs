// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Python;

/// <summary>
/// Formats an ApiIndex as human-readable Python stub syntax.
/// Supports smart truncation that prioritizes clients and their dependencies.
/// </summary>
public static class PythonFormatter
{
    /// <summary>Formats the full API surface.</summary>
    public static string Format(ApiIndex index) => Format(index, int.MaxValue);

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

        var uncoveredByClient = CoverageFormatter.AppendCoverageSummary(sb, filteredCoverage, "#");
        if (uncoveredByClient is null)
            return sb.ToString();

        if (deprecatedUncovered.Count > 0)
        {
            sb.AppendLine("# Deprecated API (intentionally excluded from uncovered generation targets):");
            foreach (var op in deprecatedUncovered.OrderBy(o => o.ClientType).ThenBy(o => o.Operation))
            {
                sb.AppendLine($"#   {op.ClientType}.{op.Operation}");
            }
            sb.AppendLine();
        }

        var allClasses = index.GetAllClasses().ToList();
        var allTypeNames = allClasses.Select(c => c.Name).ToHashSet();
        var classesByName = new Dictionary<string, ClassInfo>();
        foreach (var c in allClasses)
            classesByName.TryAdd(c.Name, c);
        var classesWithUncovered = allClasses.Where(c => uncoveredByClient.ContainsKey(c.Name)).ToList();

        HashSet<string> includedClasses = [];
        HashSet<string> reusableDeps = [];
        var currentLength = sb.Length;

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

            if (currentLength + classContent.Length > maxLength - 100 && includedClasses.Count > 0)
            {
                sb.AppendLine($"# ... truncated ({classesWithUncovered.Count - includedClasses.Count} classes omitted)");
                break;
            }

            sb.Append(classContent);
            currentLength += classContent.Length;
            includedClasses.Add(cls.Name);

            // Include supporting dependency types referenced by uncovered methods
            filteredClass.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var depName in reusableDeps)
            {
                if (includedClasses.Contains(depName))
                    continue;

                if (!classesByName.TryGetValue(depName, out var depClass))
                    continue;

                var depContent = FormatClassToString(depClass);
                if (currentLength + depContent.Length > maxLength - 100)
                    break;

                sb.Append(depContent);
                currentLength += depContent.Length;
                includedClasses.Add(depName);
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
                    if (currentLength + depContent.Length > maxLength - 100)
                        break;

                    sb.Append(depContent);
                    currentLength += depContent.Length;
                    includedClasses.Add(cls.Name);
                }
            }
        }

        return sb.ToString();
    }

    private static string FormatClassToString(ClassInfo cls)
    {
        var sb = new StringBuilder();
        FormatClass(sb, cls);
        return sb.ToString();
    }

    /// <summary>
    /// Formats with smart truncation to fit within budget.
    /// Prioritizes: Clients → Their dependencies → Options → Models → Rest
    /// </summary>
    public static string Format(ApiIndex index, int maxLength)
    {
        var sb = new StringBuilder();

        sb.AppendLine($"# {index.Package} - Public API Surface");
        sb.AppendLine();

        // Build type lookup
        var allClasses = index.GetAllClasses().ToList();
        var allTypeNames = allClasses.Select(c => c.Name).ToHashSet();
        var classesByName = new Dictionary<string, ClassInfo>();
        foreach (var c in allClasses)
            classesByName.TryAdd(c.Name, c);

        // Get client dependencies first
        var clients = allClasses.Where(c => c.IsClientType).ToList();
        HashSet<string> clientDeps = [];
        foreach (var client in clients)
            foreach (var dep in client.GetReferencedTypes(allTypeNames))
                clientDeps.Add(dep);

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

        HashSet<string> includedClasses = [];
        HashSet<string> reusableDeps = [];
        var currentLength = sb.Length;

        foreach (var module in index.Modules ?? [])
        {
            var moduleClasses = orderedClasses
                .Where(c => module.Classes?.Contains(c) ?? false)
                .ToList();

            if (moduleClasses.Count is 0 && (module.Functions?.Count ?? 0) is 0)
                continue;

            sb.AppendLine($"# Module: {module.Name}");
            sb.AppendLine();

            // Module-level functions (usually factory functions - include them)
            foreach (var func in module.Functions ?? [])
            {
                var funcContent = FormatFunctionToString(func, "");
                if (currentLength + funcContent.Length > maxLength - 100 && includedClasses.Count > 0)
                    break;
                sb.Append(funcContent);
                currentLength += funcContent.Length;
            }

            foreach (var cls in moduleClasses)
            {
                if (includedClasses.Contains(cls.Name))
                    continue;

                // Include class + dependencies
                List<ClassInfo> classesToAdd = [cls];
                cls.CollectReferencedTypes(allTypeNames, reusableDeps);
                foreach (var depName in reusableDeps)
                {
                    if (!includedClasses.Contains(depName) &&
                        classesByName.TryGetValue(depName, out var depClass))
                    {
                        classesToAdd.Add(depClass);
                    }
                }

                var classContent = FormatClassesToString(classesToAdd);

                if (currentLength + classContent.Length > maxLength - 100 && includedClasses.Count > 0)
                {
                    sb.AppendLine($"# ... truncated ({allClasses.Count - includedClasses.Count} classes omitted)");
                    return sb.ToString();
                }

                sb.Append(classContent);
                currentLength += classContent.Length;

                foreach (var c in classesToAdd)
                    includedClasses.Add(c.Name);
            }

            sb.AppendLine();
        }

        // Add dependency types section
        if (index.Dependencies?.Count > 0)
        {
            sb.AppendLine();
            sb.AppendLine($"# {new string('=', 77)}");
            sb.AppendLine("# Dependency Types (from external packages)");
            sb.AppendLine($"# {new string('=', 77)}");
            sb.AppendLine();

            foreach (var dep in index.Dependencies)
            {
                if (dep.IsStdlib) continue;

                sb.AppendLine($"# From: {dep.Package}");
                sb.AppendLine();

                foreach (var cls in dep.Classes ?? [])
                    FormatClass(sb, cls);

                foreach (var func in dep.Functions ?? [])
                    FormatFunction(sb, func, "");
            }
        }

        return sb.ToString();
    }

    private static string FormatClassesToString(List<ClassInfo> classes)
    {
        var sb = new StringBuilder();
        foreach (var cls in classes)
            FormatClass(sb, cls);
        return sb.ToString();
    }

    private static string FormatFunctionToString(FunctionInfo func, string indent)
    {
        var sb = new StringBuilder();
        FormatFunction(sb, func, indent);
        return sb.ToString();
    }

    private static void FormatClass(StringBuilder sb, ClassInfo cls)
    {
        if (cls.IsDeprecated == true)
            sb.AppendLine($"# @deprecated: {cls.DeprecatedMessage ?? "deprecated"}");
        var baseClass = !string.IsNullOrEmpty(cls.Base) ? $"({cls.Base})" : "";
        sb.AppendLine($"class {cls.Name}{baseClass}:");

        if (!string.IsNullOrEmpty(cls.Doc))
            sb.AppendLine($"    \"\"\"{cls.Doc}\"\"\"");

        var hasMembers = false;

        // Properties
        foreach (var prop in cls.Properties ?? [])
        {
            if (prop.IsDeprecated == true)
                sb.AppendLine($"    # @deprecated: {prop.DeprecatedMessage ?? "deprecated"}");
            if (!string.IsNullOrEmpty(prop.Doc))
                sb.AppendLine($"    # {prop.Doc}");

            var typeHint = !string.IsNullOrEmpty(prop.Type) ? $": {prop.Type}" : "";
            sb.AppendLine($"    {prop.Name}{typeHint}");
            hasMembers = true;
        }

        // Methods
        foreach (var method in cls.Methods ?? [])
        {
            FormatMethod(sb, method, "    ");
            hasMembers = true;
        }

        if (!hasMembers)
            sb.AppendLine("    ...");

        sb.AppendLine();
    }

    private static void FormatMethod(StringBuilder sb, MethodInfo method, string indent)
    {
        if (method.IsDeprecated == true)
            sb.AppendLine($"{indent}# @deprecated: {method.DeprecatedMessage ?? "deprecated"}");
        List<string> decorators = [];
        if (method.IsClassMethod == true) decorators.Add("@classmethod");
        if (method.IsStaticMethod == true) decorators.Add("@staticmethod");

        foreach (var dec in decorators)
            sb.AppendLine($"{indent}{dec}");

        var asyncPrefix = method.IsAsync == true ? "async " : "";
        var retAnnotation = !string.IsNullOrEmpty(method.Ret) ? $" -> {method.Ret}" : "";
        sb.AppendLine($"{indent}{asyncPrefix}def {method.Name}({method.Signature}){retAnnotation}: ...");

        if (!string.IsNullOrEmpty(method.Doc))
            sb.AppendLine($"{indent}    \"\"\"{method.Doc}\"\"\"");
    }

    private static void FormatFunction(StringBuilder sb, FunctionInfo func, string indent)
    {
        if (func.IsDeprecated == true)
            sb.AppendLine($"{indent}# @deprecated: {func.DeprecatedMessage ?? "deprecated"}");
        var asyncPrefix = func.IsAsync == true ? "async " : "";
        var retAnnotation = !string.IsNullOrEmpty(func.Ret) ? $" -> {func.Ret}" : "";
        sb.AppendLine($"{indent}{asyncPrefix}def {func.Name}({func.Signature}){retAnnotation}: ...");

        if (!string.IsNullOrEmpty(func.Doc))
            sb.AppendLine($"{indent}    \"\"\"{func.Doc}\"\"\"");
        sb.AppendLine();
    }
}
