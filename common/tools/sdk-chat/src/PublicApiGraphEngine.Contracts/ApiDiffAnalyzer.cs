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
    /// One of: TypeAdded, TypeRemoved, MemberAdded, MemberRemoved, SignatureChanged.
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
    }

    private static Dictionary<string, HashSet<string>> BuildCallableMap(
        IEnumerable<DiagnosticCallableInfo> callables)
    {
        var map = new Dictionary<string, HashSet<string>>(StringComparer.OrdinalIgnoreCase);
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
