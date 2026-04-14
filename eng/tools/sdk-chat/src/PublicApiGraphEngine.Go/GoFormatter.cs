// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Go;

/// <summary>
/// Formats an ApiIndex as human-readable Go stub syntax.
/// Supports smart truncation that prioritizes clients and their dependencies.
/// </summary>
public static class GoFormatter
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

        var deprecatedOperations = index.GetAllStructs()
            .SelectMany(s => (s.Methods ?? [])
                .Where(m => m.IsDeprecated == true)
                .Select(m => (Client: s.Name, Method: m.Name)))
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

        var allStructs = index.GetAllStructs().ToList();
        var structsWithUncovered = allStructs.Where(s => uncoveredByClient.ContainsKey(s.Name)).ToList();

        // Build set of all type names for dependency tracking (structs + interfaces)
        var allTypeNames = allStructs.Select(s => s.Name).ToHashSet();
        foreach (var pkg in index.Packages ?? [])
            foreach (var iface in pkg.Interfaces ?? [])
                allTypeNames.Add(iface.Name);
        var structsByName = allStructs.ToDictionary(s => s.Name);

        HashSet<string> includedStructs = [];
        HashSet<string> reusableDeps = [];
        var currentLength = sb.Length;

        foreach (var st in structsWithUncovered)
        {
            if (includedStructs.Contains(st.Name))
                continue;

            // Filter to show only uncovered methods for client structs
            var filteredStruct = st;
            if (uncoveredByClient.TryGetValue(st.Name, out var uncoveredOps))
            {
                filteredStruct = st with
                {
                    Methods = st.Methods?
                        .Where(m => uncoveredOps.Contains(m.Name))
                        .ToList() ?? []
                };
            }

            var structContent = FormatStructToString(filteredStruct);

            if (currentLength + structContent.Length > maxLength - 100 && includedStructs.Count > 0)
            {
                sb.AppendLine($"// ... truncated ({structsWithUncovered.Count - includedStructs.Count} structs omitted)");
                break;
            }

            sb.Append(structContent);
            currentLength += structContent.Length;
            includedStructs.Add(st.Name);

            // Include supporting model/option types referenced by uncovered operations
            filteredStruct.CollectReferencedTypes(allTypeNames, reusableDeps);
            foreach (var depName in reusableDeps)
            {
                if (!includedStructs.Contains(depName) && structsByName.TryGetValue(depName, out var depStruct))
                {
                    var depContent = FormatStructToString(depStruct);
                    if (currentLength + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    currentLength += depContent.Length;
                    includedStructs.Add(depName);
                }
            }
        }

        // Interfaces with uncovered operations
        foreach (var pkg in index.Packages ?? [])
        {
            foreach (var iface in pkg.Interfaces ?? [])
            {
                if (!uncoveredByClient.ContainsKey(iface.Name))
                    continue;

                var filteredIface = iface;
                if (uncoveredByClient.TryGetValue(iface.Name, out var uncoveredIfaceOps))
                {
                    filteredIface = iface with
                    {
                        Methods = iface.Methods?
                            .Where(m => uncoveredIfaceOps.Contains(m.Name))
                            .ToList() ?? []
                    };
                }

                var ifaceContent = FormatInterfaceToString(filteredIface);

                if (currentLength + ifaceContent.Length > maxLength - 100)
                    break;

                sb.Append(ifaceContent);
                currentLength += ifaceContent.Length;
            }
        }

        // Include dependency types from external packages if space permits
        if (index.Dependencies?.Count > 0)
        {
            foreach (var dep in index.Dependencies)
            {
                foreach (var st in dep.Structs ?? [])
                {
                    if (includedStructs.Contains(st.Name))
                        continue;

                    var depContent = FormatStructToString(st);
                    if (currentLength + depContent.Length > maxLength - 100)
                        break;
                    sb.Append(depContent);
                    currentLength += depContent.Length;
                    includedStructs.Add(st.Name);
                }
            }
        }

        return sb.ToString();
    }

    private static string FormatStructToString(StructApi st)
    {
        var sb = new StringBuilder();
        FormatStruct(sb, st);
        return sb.ToString();
    }

    private static string FormatInterfaceToString(IfaceApi iface)
    {
        var sb = new StringBuilder();
        if (iface.IsDeprecated == true)
            sb.AppendLine($"// Deprecated: {iface.DeprecatedMessage ?? "deprecated"}");
        if (!string.IsNullOrEmpty(iface.Doc))
            sb.AppendLine($"// {iface.Doc}");
        sb.AppendLine($"type {iface.Name} interface {{");
        foreach (var embed in iface.Embeds ?? [])
            sb.AppendLine($"    {embed}");
        foreach (var m in iface.Methods ?? [])
        {
            var ret = !string.IsNullOrEmpty(m.Ret) ? $" {m.Ret}" : "";
            sb.AppendLine($"    {m.Name}({m.Sig}){ret}");
        }
        sb.AppendLine("}");
        sb.AppendLine();
        return sb.ToString();
    }

    /// <summary>
    /// Formats with smart truncation to fit within budget.
    /// Prioritizes: Clients → Their dependencies → Options → Models → Rest
    /// </summary>
    public static string Format(ApiIndex index, int maxLength)
    {
        var sb = new StringBuilder();

        sb.AppendLine($"// {index.Package} - Public API Surface");
        sb.AppendLine();

        // Build type lookup
        var allStructs = index.GetAllStructs().ToList();
        var allTypeNames = allStructs.Select(s => s.Name).ToHashSet();

        // Pre-build dictionary for O(1) lookups instead of O(n) FirstOrDefault
        var structsByName = allStructs.ToDictionary(s => s.Name);

        // Get client dependencies first
        var clients = allStructs.Where(s => s.IsClientType).ToList();
        HashSet<string> clientDeps = [];
        HashSet<string> reusableDeps2 = [];
        foreach (var client in clients)
        {
            client.CollectReferencedTypes(allTypeNames, reusableDeps2);
            foreach (var dep in reusableDeps2)
                clientDeps.Add(dep);
        }

        // Prioritize structs
        var orderedStructs = allStructs
            .OrderBy(s =>
            {
                if (s.IsClientType) return 0;
                if (clientDeps.Contains(s.Name)) return 1;
                return s.TruncationPriority + 2;
            })
            .ThenBy(s => s.Name)
            .ToList();

        HashSet<string> includedStructs = [];
        HashSet<string> reusableDeps3 = [];
        var currentLength = sb.Length;

        foreach (var pkg in index.Packages ?? [])
        {
            var pkgStructs = orderedStructs
                .Where(s => pkg.Structs?.Contains(s) ?? false)
                .ToList();

            if (pkgStructs.Count is 0 &&
                (pkg.Functions?.Count ?? 0) == 0 &&
                (pkg.Interfaces?.Count ?? 0) == 0)
                continue;

            sb.AppendLine($"// Package: {pkg.Name}");
            if (!string.IsNullOrEmpty(pkg.Doc))
                sb.AppendLine($"// {pkg.Doc}");
            sb.AppendLine();

            // Type aliases (usually small)
            foreach (var t in pkg.Types ?? [])
            {
                if (!string.IsNullOrEmpty(t.Doc))
                    sb.AppendLine($"// {t.Doc}");
                sb.AppendLine($"type {t.Name} = {t.Type}");
                sb.AppendLine();
            }

            // Constants (usually small)
            if (pkg.Constants?.Count > 0)
            {
                sb.AppendLine("const (");
                foreach (var c in pkg.Constants.Take(20)) // Limit constants
                {
                    if (!string.IsNullOrEmpty(c.Doc))
                        sb.AppendLine($"    // {c.Doc}");
                    var value = !string.IsNullOrEmpty(c.Value) ? $" = {c.Value}" : "";
                    var type = !string.IsNullOrEmpty(c.Type) ? $" {c.Type}" : "";
                    sb.AppendLine($"    {c.Name}{type}{value}");
                }
                if (pkg.Constants.Count > 20)
                    sb.AppendLine($"    // ... {pkg.Constants.Count - 20} more constants");
                sb.AppendLine(")");
                sb.AppendLine();
            }

            // Variables (package-level exported vars)
            if (pkg.Variables?.Count > 0)
            {
                sb.AppendLine("var (");
                foreach (var v in pkg.Variables.Take(20))
                {
                    if (!string.IsNullOrEmpty(v.Doc))
                        sb.AppendLine($"    // {v.Doc}");
                    var type = !string.IsNullOrEmpty(v.Type) ? $" {v.Type}" : "";
                    sb.AppendLine($"    {v.Name}{type}");
                }
                if (pkg.Variables.Count > 20)
                    sb.AppendLine($"    // ... {pkg.Variables.Count - 20} more variables");
                sb.AppendLine(")");
                sb.AppendLine();
            }

            foreach (var iface in pkg.Interfaces ?? [])
            {
                if (!string.IsNullOrEmpty(iface.Doc))
                    sb.AppendLine($"// {iface.Doc}");
                sb.AppendLine($"type {iface.Name} interface {{");
                foreach (var embed in iface.Embeds ?? [])
                {
                    sb.AppendLine($"    {embed}");
                }
                foreach (var m in iface.Methods ?? [])
                {
                    var ret = !string.IsNullOrEmpty(m.Ret) ? $" {m.Ret}" : "";
                    sb.AppendLine($"    {m.Name}({m.Sig}){ret}");
                }
                sb.AppendLine("}");
                sb.AppendLine();
            }

            // Structs by priority
            foreach (var s in pkgStructs)
            {
                if (includedStructs.Contains(s.Name))
                    continue;

                // Include struct + dependencies
                List<StructApi> structsToAdd = [s];
                s.CollectReferencedTypes(allTypeNames, reusableDeps3);
                foreach (var depName in reusableDeps3)
                {
                    if (!includedStructs.Contains(depName) && structsByName.TryGetValue(depName, out var depStruct))
                    {
                        structsToAdd.Add(depStruct);
                    }
                }

                var structContent = FormatStructsToString(structsToAdd);

                if (currentLength + structContent.Length > maxLength - 100 && includedStructs.Count > 0)
                {
                    sb.AppendLine($"// ... truncated ({allStructs.Count - includedStructs.Count} structs omitted)");
                    return sb.ToString();
                }

                sb.Append(structContent);
                currentLength += structContent.Length;

                foreach (var st in structsToAdd)
                    includedStructs.Add(st.Name);
            }

            // Top-level functions (factory functions like NewClient)
            foreach (var f in pkg.Functions ?? [])
            {
                if (!string.IsNullOrEmpty(f.Doc))
                    sb.AppendLine($"// {f.Doc}");
                var ret = !string.IsNullOrEmpty(f.Ret) ? $" {f.Ret}" : "";
                var funcTypeParams = f.TypeParams?.Count > 0 ? $"[{string.Join(", ", f.TypeParams)}]" : "";
                sb.AppendLine($"func {f.Name}{funcTypeParams}({f.Sig}){ret}");
                sb.AppendLine();
            }
        }

        // Add dependency types section
        if (index.Dependencies?.Count > 0)
        {
            sb.AppendLine();
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine("// Dependency Types (from external modules)");
            sb.AppendLine($"// {new string('=', 77)}");
            sb.AppendLine();

            foreach (var dep in index.Dependencies)
            {
                if (sb.Length >= maxLength) break;
                if (dep.IsStdlib) continue;

                sb.AppendLine($"// From: {dep.Package}");
                sb.AppendLine();

                foreach (var iface in dep.Interfaces ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    if (!string.IsNullOrEmpty(iface.Doc))
                        sb.AppendLine($"// {iface.Doc}");
                    sb.AppendLine($"type {iface.Name} interface {{");
                    foreach (var embed in iface.Embeds ?? [])
                    {
                        sb.AppendLine($"    {embed}");
                    }
                    foreach (var m in iface.Methods ?? [])
                    {
                        var ret = !string.IsNullOrEmpty(m.Ret) ? $" {m.Ret}" : "";
                        sb.AppendLine($"    {m.Name}({m.Sig}){ret}");
                    }
                    sb.AppendLine("}");
                    sb.AppendLine();
                }

                foreach (var s in dep.Structs ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    FormatStruct(sb, s);
                }

                foreach (var t in dep.Types ?? [])
                {
                    if (sb.Length >= maxLength) break;
                    if (t.IsDeprecated == true)
                        sb.AppendLine($"// Deprecated: {t.DeprecatedMessage ?? "deprecated"}");
                    if (!string.IsNullOrEmpty(t.Doc))
                        sb.AppendLine($"// {t.Doc}");
                    sb.AppendLine($"type {t.Name} = {t.Type}");
                    sb.AppendLine();
                }
            }
        }

        return sb.ToString();
    }

    private static string FormatStructsToString(List<StructApi> structs)
    {
        var sb = new StringBuilder();
        foreach (var s in structs)
            FormatStruct(sb, s);
        return sb.ToString();
    }

    private static void FormatStruct(StringBuilder sb, StructApi s)
    {
        if (s.IsDeprecated == true)
            sb.AppendLine($"// Deprecated: {s.DeprecatedMessage ?? "deprecated"}");
        if (!string.IsNullOrEmpty(s.Doc))
            sb.AppendLine($"// {s.Doc}");
        var typeParams = s.TypeParams?.Count > 0 ? $"[{string.Join(", ", s.TypeParams)}]" : "";
        sb.AppendLine($"type {s.Name}{typeParams} struct {{");

        // Embedded types (Go composition)
        foreach (var embed in s.Embeds ?? [])
        {
            sb.AppendLine($"    {embed}");
        }

        foreach (var f in s.Fields ?? [])
        {
            if (f.IsDeprecated == true)
                sb.AppendLine($"    // Deprecated: {f.DeprecatedMessage ?? "deprecated"}");
            var tag = !string.IsNullOrEmpty(f.Tag) ? $" {f.Tag}" : "";
            sb.AppendLine($"    {f.Name} {f.Type}{tag}");
        }
        sb.AppendLine("}");

        // Methods
        foreach (var m in s.Methods ?? [])
        {
            if (m.IsDeprecated == true)
                sb.AppendLine($"// Deprecated: {m.DeprecatedMessage ?? "deprecated"}");
            var ret = !string.IsNullOrEmpty(m.Ret) ? $" {m.Ret}" : "";
            var funcTypeParams = m.TypeParams?.Count > 0 ? $"[{string.Join(", ", m.TypeParams)}]" : "";
            if (!string.IsNullOrEmpty(m.Receiver))
            {
                sb.AppendLine($"func ({m.Receiver}) {m.Name}{funcTypeParams}({m.Sig}){ret}");
            }
            else
            {
                // Constructor function — render as package-level func, not as method with fake receiver
                sb.AppendLine($"func {m.Name}{funcTypeParams}({m.Sig}){ret}");
            }
        }
        sb.AppendLine();
    }
}
