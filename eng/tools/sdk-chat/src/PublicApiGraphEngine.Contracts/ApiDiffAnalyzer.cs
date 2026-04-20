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
    /// ReturnTypeChanged, PropertyAdded, PropertyRemoved, PropertyTypeChanged,
    /// ParameterCountChanged, ParameterOptionalityChanged, DeprecationAdded,
    /// DeprecationRemoved, TypeKindChanged, PropertyOptionalityChanged, PropertyReadOnlyChanged.
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

        // Common types — compare members and type-level metadata
        foreach (var (name, baselineType) in baselineTypes)
        {
            if (!currentTypes.TryGetValue(name, out var currentType))
                continue;

            // Type kind change (e.g., class → interface) — breaking
            if (baselineType.Kind is not null && currentType.Kind is not null
                && !string.Equals(baselineType.Kind, currentType.Kind, StringComparison.Ordinal))
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "TypeKindChanged",
                    TypeName = name,
                    OldSignature = baselineType.Kind,
                    NewSignature = currentType.Kind
                });
            }

            // Type-level deprecation
            if (!baselineType.IsDeprecated && currentType.IsDeprecated)
            {
                nonBreaking.Add(new ApiChange { ChangeKind = "DeprecationAdded", TypeName = name });
            }
            else if (baselineType.IsDeprecated && !currentType.IsDeprecated)
            {
                nonBreaking.Add(new ApiChange { ChangeKind = "DeprecationRemoved", TypeName = name });
            }

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
                "ParameterOptionalityChanged" =>
                    $"Breaking change: '{change.TypeName}.{change.MemberName}' parameter optionality changed from ({change.OldSignature}) to ({change.NewSignature}).",
                "ParameterCountChanged" =>
                    $"Breaking change: '{change.TypeName}.{change.MemberName}' required parameters removed (was ({change.OldSignature}), now ({change.NewSignature})).",
                "TypeKindChanged" =>
                    $"Breaking change: type '{change.TypeName}' kind changed from '{change.OldSignature}' to '{change.NewSignature}'.",
                "PropertyOptionalityChanged" =>
                    $"Breaking change: property '{change.TypeName}.{change.MemberName}' changed from {change.OldSignature} to {change.NewSignature}.",
                "PropertyReadOnlyChanged" =>
                    $"Breaking change: property '{change.TypeName}.{change.MemberName}' changed from {change.OldSignature} to {change.NewSignature}.",
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
        var baselineMap = GroupCallablesByName(baseline);
        var currentMap = GroupCallablesByName(current);

        foreach (var (callableName, baselineOverloads) in baselineMap)
        {
            if (!currentMap.TryGetValue(callableName, out var currentOverloads))
            {
                // Entire callable (all overloads) removed — breaking
                breaking.Add(new ApiChange
                {
                    ChangeKind = "MemberRemoved",
                    TypeName = typeName,
                    MemberName = callableName,
                    OldSignature = string.Join(" | ", baselineOverloads.Select(GetFullSignature))
                });
                continue;
            }

            MatchAndCompareOverloads(typeName, callableName, baselineOverloads, currentOverloads, breaking, nonBreaking);
        }

        // Callable names only in current — non-breaking
        foreach (var (callableName, currentOverloads) in currentMap)
        {
            if (!baselineMap.ContainsKey(callableName))
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "MemberAdded",
                    TypeName = typeName,
                    MemberName = callableName,
                    NewSignature = string.Join(" | ", currentOverloads.Select(GetFullSignature))
                });
            }
        }
    }

    private static void MatchAndCompareOverloads(
        string typeName,
        string callableName,
        List<DiagnosticCallableInfo> baselineOverloads,
        List<DiagnosticCallableInfo> currentOverloads,
        List<ApiChange> breaking,
        List<ApiChange> nonBreaking)
    {
        var unmatchedBaseline = new List<DiagnosticCallableInfo>(baselineOverloads);
        var unmatchedCurrent = new List<DiagnosticCallableInfo>(currentOverloads);

        // Pass 1: Exact full-signature match
        MatchBySignature(unmatchedBaseline, unmatchedCurrent, GetFullSignature, out var exactMatched);

        // Pass 2: Match remaining by required-parameter prefix
        MatchBySignature(unmatchedBaseline, unmatchedCurrent, GetRequiredSignature, out var requiredMatched);

        // Compare all matched pairs for semantic changes
        foreach (var (b, c) in exactMatched.Concat(requiredMatched))
        {
            CompareMatchedCallables(typeName, callableName, b, c, breaking, nonBreaking);
        }

        // Unmatched baseline overloads → removed (breaking)
        var removedSigs = unmatchedBaseline.Select(GetFullSignature).ToList();
        var addedSigs = unmatchedCurrent.Select(GetFullSignature).ToList();

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

    private static void MatchBySignature(
        List<DiagnosticCallableInfo> baselinePool,
        List<DiagnosticCallableInfo> currentPool,
        Func<DiagnosticCallableInfo, string> sigFunc,
        out List<(DiagnosticCallableInfo Baseline, DiagnosticCallableInfo Current)> matched)
    {
        matched = [];
        for (int i = baselinePool.Count - 1; i >= 0; i--)
        {
            var bSig = sigFunc(baselinePool[i]);
            for (int j = currentPool.Count - 1; j >= 0; j--)
            {
                if (string.Equals(bSig, sigFunc(currentPool[j]), StringComparison.Ordinal))
                {
                    matched.Add((baselinePool[i], currentPool[j]));
                    baselinePool.RemoveAt(i);
                    currentPool.RemoveAt(j);
                    break;
                }
            }
        }
    }

    private static void CompareMatchedCallables(
        string typeName,
        string callableName,
        DiagnosticCallableInfo baseline,
        DiagnosticCallableInfo current,
        List<ApiChange> breaking,
        List<ApiChange> nonBreaking)
    {
        int bRequired = baseline.ParameterTypes.Count - baseline.OptionalParameterCount;
        int cRequired = current.ParameterTypes.Count - current.OptionalParameterCount;

        // Optionality transition: optional params became required or vice-versa
        if (cRequired != bRequired)
        {
            var change = new ApiChange
            {
                ChangeKind = "ParameterOptionalityChanged",
                TypeName = typeName,
                MemberName = callableName,
                OldSignature = FormatSignatureWithOptionality(baseline),
                NewSignature = FormatSignatureWithOptionality(current)
            };

            if (cRequired > bRequired)
                breaking.Add(change);   // optional → required: breaking
            else
                nonBreaking.Add(change); // required → optional: non-breaking
        }

        // Parameter count change (different total number of params)
        if (current.ParameterTypes.Count != baseline.ParameterTypes.Count)
        {
            bool isBreaking = current.ParameterTypes.Count < baseline.ParameterTypes.Count;
            var change = new ApiChange
            {
                ChangeKind = "ParameterCountChanged",
                TypeName = typeName,
                MemberName = callableName,
                OldSignature = GetFullSignature(baseline),
                NewSignature = GetFullSignature(current)
            };

            if (isBreaking)
                breaking.Add(change);
            else
                nonBreaking.Add(change);
        }

        // Return type change
        if (baseline.ReturnType is not null && current.ReturnType is not null
            && !string.Equals(baseline.ReturnType, current.ReturnType, StringComparison.Ordinal))
        {
            breaking.Add(new ApiChange
            {
                ChangeKind = "ReturnTypeChanged",
                TypeName = typeName,
                MemberName = callableName,
                OldSignature = baseline.ReturnType,
                NewSignature = current.ReturnType
            });
        }

        // Deprecation
        if (!baseline.IsDeprecated && current.IsDeprecated)
        {
            nonBreaking.Add(new ApiChange
            {
                ChangeKind = "DeprecationAdded",
                TypeName = typeName,
                MemberName = callableName
            });
        }
        else if (baseline.IsDeprecated && !current.IsDeprecated)
        {
            nonBreaking.Add(new ApiChange
            {
                ChangeKind = "DeprecationRemoved",
                TypeName = typeName,
                MemberName = callableName
            });
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

            // Optionality change
            if (baselineProp.IsOptional && !currentProp.IsOptional)
            {
                breaking.Add(new ApiChange
                {
                    ChangeKind = "PropertyOptionalityChanged",
                    TypeName = typeName,
                    MemberName = propName,
                    OldSignature = "optional",
                    NewSignature = "required"
                });
            }
            else if (!baselineProp.IsOptional && currentProp.IsOptional)
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "PropertyOptionalityChanged",
                    TypeName = typeName,
                    MemberName = propName,
                    OldSignature = "required",
                    NewSignature = "optional"
                });
            }

            // Readonly change
            if (baselineProp.IsReadOnly != currentProp.IsReadOnly)
            {
                var change = new ApiChange
                {
                    ChangeKind = "PropertyReadOnlyChanged",
                    TypeName = typeName,
                    MemberName = propName,
                    OldSignature = baselineProp.IsReadOnly ? "readonly" : "mutable",
                    NewSignature = currentProp.IsReadOnly ? "readonly" : "mutable"
                };

                if (currentProp.IsReadOnly)
                    breaking.Add(change);    // writable → readonly: breaking
                else
                    nonBreaking.Add(change); // readonly → writable: non-breaking
            }

            // Deprecation
            if (!baselineProp.IsDeprecated && currentProp.IsDeprecated)
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "DeprecationAdded",
                    TypeName = typeName,
                    MemberName = propName
                });
            }
            else if (baselineProp.IsDeprecated && !currentProp.IsDeprecated)
            {
                nonBreaking.Add(new ApiChange
                {
                    ChangeKind = "DeprecationRemoved",
                    TypeName = typeName,
                    MemberName = propName
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

    private static string GetFullSignature(DiagnosticCallableInfo callable) =>
        string.Join(", ", callable.ParameterTypes);

    private static string GetRequiredSignature(DiagnosticCallableInfo callable)
    {
        int requiredCount = callable.ParameterTypes.Count - callable.OptionalParameterCount;
        return string.Join(", ", callable.ParameterTypes.Take(requiredCount));
    }

    private static string FormatSignatureWithOptionality(DiagnosticCallableInfo callable)
    {
        int requiredCount = callable.ParameterTypes.Count - callable.OptionalParameterCount;
        var parts = new string[callable.ParameterTypes.Count];
        for (int i = 0; i < callable.ParameterTypes.Count; i++)
        {
            parts[i] = i >= requiredCount ? $"{callable.ParameterTypes[i]}?" : callable.ParameterTypes[i];
        }
        return string.Join(", ", parts);
    }

    private static Dictionary<string, DiagnosticPropertyInfo> BuildPropertyMap(
        IReadOnlyList<DiagnosticPropertyInfo> properties)
    {
        var map = new Dictionary<string, DiagnosticPropertyInfo>(StringComparer.Ordinal);
        foreach (var prop in properties)
            map.TryAdd(prop.Name, prop);
        return map;
    }

    private static Dictionary<string, List<DiagnosticCallableInfo>> GroupCallablesByName(
        IEnumerable<DiagnosticCallableInfo> callables)
    {
        var map = new Dictionary<string, List<DiagnosticCallableInfo>>(StringComparer.Ordinal);
        foreach (var callable in callables)
        {
            if (!map.TryGetValue(callable.Name, out var list))
            {
                list = [];
                map[callable.Name] = list;
            }
            list.Add(callable);
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
