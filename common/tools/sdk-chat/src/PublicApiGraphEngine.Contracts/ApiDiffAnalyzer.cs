// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json.Serialization;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Result of comparing two API surfaces.
/// </summary>
public sealed record ApiDiffResult
{
    public required IReadOnlyList<ApiChange> Breaking { get; init; }
    public required IReadOnlyList<ApiChange> NonBreaking { get; init; }
}

/// <summary>
/// Describes a single change between two API versions.
/// </summary>
public sealed record ApiChange
{
    /// <summary>
    /// One of: TypeAdded, TypeRemoved, MemberAdded, MemberRemoved, SignatureChanged,
    /// ReturnTypeChanged, PropertyAdded, PropertyRemoved, PropertyTypeChanged.
    /// </summary>
    public required string ChangeKind { get; init; }
    public required string TypeName { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? MemberName { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? OldSignature { get; init; }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public string? NewSignature { get; init; }
}

/// <summary>
/// Compares two <see cref="IDiagnosticsSource"/> instances and classifies changes
/// as breaking or non-breaking.
/// </summary>
public static class ApiDiffAnalyzer
{
    /// <summary>
    /// Compares <paramref name="baseline"/> against <paramref name="current"/> and
    /// returns a diff result classifying each change.
    /// </summary>
    public static ApiDiffResult Compare(IDiagnosticsSource baseline, IDiagnosticsSource current)
    {
        List<ApiChange> breaking = [];
        List<ApiChange> nonBreaking = [];

        var baselineTypes = IndexByName(baseline.GetDiagnosticTypes());
        var currentTypes = IndexByName(current.GetDiagnosticTypes());

        // Removed types — breaking
        foreach (var (name, _) in baselineTypes)
        {
            if (!currentTypes.ContainsKey(name))
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "TypeRemoved",
                    TypeName = name
                });
            }
        }

        // Added types — non-breaking
        foreach (var (name, _) in currentTypes)
        {
            if (!baselineTypes.ContainsKey(name))
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "TypeAdded",
                    TypeName = name
                });
            }
        }

        // Common types — compare members
        foreach (var (name, baselineType) in baselineTypes)
        {
            if (!currentTypes.TryGetValue(name, out var currentType))
                continue;

            CompareCallables(name, baselineType.Callables, currentType.Callables, breaking, nonBreaking);
            CompareProperties(name, baselineType.Properties, currentType.Properties, breaking, nonBreaking);
        }

        // Top-level callables (module-level functions in Go/Python/TypeScript)
        var baselineTl = baseline.GetTopLevelCallables().ToList();
        var currentTl = current.GetTopLevelCallables().ToList();
        if (baselineTl.Count > 0 || currentTl.Count > 0)
            CompareCallables("<module>", baselineTl, currentTl, breaking, nonBreaking);

        return new ApiDiffResult
        {
            Breaking = breaking,
            NonBreaking = nonBreaking
        };
    }

    /// <summary>
    /// Converts breaking changes in <paramref name="result"/> to SDK004 diagnostics.
    /// </summary>
    public static IReadOnlyList<ApiDiagnostic> ToBreakingDiagnostics(ApiDiffResult result)
    {
        var diagnostics = new List<ApiDiagnostic>(result.Breaking.Count);
        foreach (var change in result.Breaking)
        {
            var text = change.ChangeKind switch
            {
                "TypeRemoved" =>
                    $"Breaking change: type '{change.TypeName}' was removed.",
                "MemberRemoved" =>
                    $"Breaking change: member '{change.TypeName}.{change.MemberName}' was removed.",
                "SignatureChanged" =>
                    $"Breaking change: '{change.TypeName}.{change.MemberName}' signature changed (removed overload: {change.OldSignature}).",
                "ReturnTypeChanged" =>
                    $"Breaking change: '{change.TypeName}.{change.MemberName}' return type changed from '{change.OldSignature}' to '{change.NewSignature}'.",
                "PropertyRemoved" =>
                    $"Breaking change: property '{change.TypeName}.{change.MemberName}' was removed.",
                "PropertyTypeChanged" =>
                    $"Breaking change: property '{change.TypeName}.{change.MemberName}' type changed from '{change.OldSignature}' to '{change.NewSignature}'.",
                _ =>
                    $"Breaking change: {change.ChangeKind} in '{change.TypeName}'."
            };

            diagnostics.Add(new ApiDiagnostic
            {
                Id = "SDK004",
                Text = text,
                Level = DiagnosticLevel.Warning,
                TargetType = change.TypeName,
                TargetMember = change.MemberName
            });
        }

        return diagnostics;
    }

    private static void CompareCallables(
        string typeName,
        IReadOnlyList<DiagnosticCallableInfo> baseline,
        IReadOnlyList<DiagnosticCallableInfo> current,
        List<ApiChange> breaking,
        List<ApiChange> nonBreaking)
    {
        // Each entry maps callable name → set of parameter-type signatures (one per overload).
        var baselineMap = BuildCallableMap(baseline);
        var currentMap = BuildCallableMap(current);

        foreach (var (callableName, baselineSigs) in baselineMap)
        {
            if (!currentMap.TryGetValue(callableName, out var currentSigs))
            {
                // Entire callable (all overloads) removed — breaking
                breaking.Add(new ApiChange
                {
                    ChangeKind = "MemberRemoved",
                    TypeName = typeName,
                    MemberName = callableName,
                    OldSignature = string.Join(" | ", baselineSigs)
                });
                continue;
            }

            // Overloads removed from baseline (breaking) vs. only new ones added (non-breaking)
            var removedSigs = baselineSigs.Except(currentSigs).ToList();
            var addedSigs = currentSigs.Except(baselineSigs).ToList();

            if (removedSigs.Count > 0)
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "SignatureChanged",
                    TypeName = typeName,
                    MemberName = callableName,
                    OldSignature = string.Join(" | ", removedSigs),
                    NewSignature = addedSigs.Count > 0 ? string.Join(" | ", addedSigs) : null
                });
            }
            else if (addedSigs.Count > 0)
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "MemberAdded",
                    TypeName = typeName,
                    MemberName = callableName,
                    NewSignature = string.Join(" | ", addedSigs)
                });
            }
        }

        // Callable names only in current — non-breaking
        foreach (var (callableName, currentSigs) in currentMap)
        {
            if (!baselineMap.ContainsKey(callableName))
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "MemberAdded",
                    TypeName = typeName,
                    MemberName = callableName,
                    NewSignature = string.Join(" | ", currentSigs)
                });
            }
        }

        // Return type changes — compare callables that exist in both with matching signatures
        CompareReturnTypes(typeName, baseline, current, breaking);
    }

    private static void CompareReturnTypes(
        string typeName,
        IReadOnlyList<DiagnosticCallableInfo> baseline,
        IReadOnlyList<DiagnosticCallableInfo> current,
        List<ApiChange> breaking)
    {
        // Build name+signature → return type maps (case-sensitive on name)
        var baselineReturnTypes = new Dictionary<string, string?>(StringComparer.Ordinal);
        foreach (var c in baseline)
        {
            var key = $"{c.Name}({string.Join(", ", c.ParameterTypes)})";
            baselineReturnTypes.TryAdd(key, c.ReturnType);
        }

        foreach (var c in current)
        {
            var key = $"{c.Name}({string.Join(", ", c.ParameterTypes)})";
            if (!baselineReturnTypes.TryGetValue(key, out var oldRet))
                continue;

            var newRet = c.ReturnType;
            if (oldRet is null || newRet is null)
                continue;

            if (!string.Equals(oldRet, newRet, StringComparison.Ordinal))
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "ReturnTypeChanged",
                    TypeName = typeName,
                    MemberName = c.Name,
                    OldSignature = oldRet,
                    NewSignature = newRet
                });
            }
        }
    }

    private static void CompareProperties(
        string typeName,
        IReadOnlyList<DiagnosticPropertyInfo> baseline,
        IReadOnlyList<DiagnosticPropertyInfo> current,
        List<ApiChange> breaking,
        List<ApiChange> nonBreaking)
    {
        var baselineMap = BuildPropertyMap(baseline);
        var currentMap = BuildPropertyMap(current);

        // Removed properties — breaking
        foreach (var (propName, baselineProp) in baselineMap)
        {
            if (!currentMap.TryGetValue(propName, out var currentProp))
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "PropertyRemoved",
                    TypeName = typeName,
                    MemberName = propName
                });
                continue;
            }

            // Property type changed — breaking
            if (baselineProp.TypeName is not null && currentProp.TypeName is not null
                && !string.Equals(baselineProp.TypeName, currentProp.TypeName, StringComparison.Ordinal))
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "PropertyTypeChanged",
                    TypeName = typeName,
                    MemberName = propName,
                    OldSignature = baselineProp.TypeName,
                    NewSignature = currentProp.TypeName
                });
            }
        }

        // Added properties — non-breaking
        foreach (var (propName, _) in currentMap)
        {
            if (!baselineMap.ContainsKey(propName))
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "PropertyAdded",
                    TypeName = typeName,
                    MemberName = propName
                });
            }
        }
    }

    private static Dictionary<string, DiagnosticPropertyInfo> BuildPropertyMap(
        IReadOnlyList<DiagnosticPropertyInfo> properties)
    {
        var map = new Dictionary<string, DiagnosticPropertyInfo>(StringComparer.Ordinal);
        foreach (var prop in properties)
            map.TryAdd(prop.Name, prop);
        return map;
    }

    private static Dictionary<string, HashSet<string>> BuildCallableMap(
        IEnumerable<DiagnosticCallableInfo> callables)
    {
        var map = new Dictionary<string, HashSet<string>>(StringComparer.Ordinal);
        foreach (var callable in callables)
        {
            if (!map.TryGetValue(callable.Name, out var sigs))
            {
                sigs = [];
                map[callable.Name] = sigs;
            }

            sigs.Add(string.Join(", ", callable.ParameterTypes));
        }

        return map;
    }

    private static Dictionary<string, DiagnosticTypeInfo> IndexByName(
        IEnumerable<DiagnosticTypeInfo> types)
    {
        var map = new Dictionary<string, DiagnosticTypeInfo>(StringComparer.OrdinalIgnoreCase);
        foreach (var t in types)
            map[IApiIndex.NormalizeTypeName(t.Name)] = t;
        return map;
    }
}
