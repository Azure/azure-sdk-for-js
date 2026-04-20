// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.RegularExpressions;

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// AOT-safe diagnostics post-processor. Runs SDK001/SDK002/SDK003 rules
/// using the <see cref="IDiagnosticsSource"/> abstraction instead of reflection.
/// </summary>
public static partial class ApiDiagnosticsPostProcessor
{
    /// <summary>
    /// Prepends engine-input diagnostics to a list of existing diagnostics.
    /// Returns a new list if prepending is needed, or the original list if there is nothing to prepend.
    /// </summary>
    public static IReadOnlyList<ApiDiagnostic> PrependDiagnostics(
        IReadOnlyList<ApiDiagnostic> prefix,
        IReadOnlyList<ApiDiagnostic> diagnostics)
    {
        if (prefix.Count == 0) return diagnostics;
        return [..prefix, ..diagnostics];
    }

    public static IReadOnlyList<ApiDiagnostic> Build(
        IApiIndex index,
        IReadOnlyList<ApiDiagnostic>? upstreamDiagnostics = null)
    {
        List<ApiDiagnostic> diagnostics = [];
        if (upstreamDiagnostics is { Count: > 0 })
        {
            diagnostics.AddRange(upstreamDiagnostics);
        }

        var indexDiagnostics = index.Diagnostics;
        if (indexDiagnostics is { Count: > 0 })
        {
            diagnostics.AddRange(indexDiagnostics);
        }

        var seen = new HashSet<string>(StringComparer.Ordinal);
        foreach (var d in diagnostics)
        {
            seen.Add(BuildKey(d));
        }

        var types = index.GetDiagnosticTypes().ToList();

        // Build a lookup of all known types by name for structural checks (used by SDK006).
        var typesByName = BuildTypeNameLookup(types);

        // SDK001: undocumented public type
        foreach (var type in types)
        {
            if (string.IsNullOrWhiteSpace(type.Doc))
            {
                AddDiagnostic(
                    diagnostics,
                    seen,
                    new ApiDiagnostic
                    {
                        Id = "SDK001",
                        Text = $"Public type '{type.Name}' is missing documentation.",
                        Level = DiagnosticLevel.Info,
                        TargetType = type.Id ?? type.Name,
                    });
            }
        }

        // SDK003: callable uses deprecated parameter type
        var deprecatedTypes = CollectDeprecatedTypeNames(types);
        if (deprecatedTypes.Count > 0)
        {
            foreach (var type in types)
            {
                foreach (var callable in type.Callables)
                {
                    EmitCallableDiagnostics(diagnostics, seen, type.Id ?? type.Name, callable, deprecatedTypes);
                }
            }

            foreach (var callable in index.GetTopLevelCallables())
            {
                EmitCallableDiagnostics(diagnostics, seen, null, callable, deprecatedTypes);
            }
        }

        // SDK005: naming convention enforcement.
        // NOTE: These checks are intentionally name-based — they enforce Azure SDK naming
        // conventions (PascalCase types, camelCase members) and cannot be replaced with
        // structural checks. The Kind field is not used here because the convention applies
        // uniformly regardless of type kind.
        foreach (var type in types)
        {
            var typeName = type.Id ?? type.Name;

            // Type name must be PascalCase: first letter uppercase, no run of 3+ consecutive uppercase letters
            if (!string.IsNullOrEmpty(type.Name) &&
                (!char.IsUpper(type.Name[0]) || ThreeOrMoreConsecutiveUppercase().IsMatch(type.Name)))
            {
                AddDiagnostic(diagnostics, seen, new ApiDiagnostic
                {
                    Id = "SDK005",
                    Text = $"'{type.Name}' does not follow naming conventions (type names must be PascalCase).",
                    Level = DiagnosticLevel.Info,
                    TargetType = typeName,
                });
            }

            // Method/callable names must be camelCase (first letter lowercase), except constructors
            foreach (var callable in type.Callables)
            {
                var isConstructor = string.Equals(callable.Name, type.Name, StringComparison.Ordinal)
                    || string.Equals(callable.Name, "constructor", StringComparison.OrdinalIgnoreCase);
                if (!isConstructor && !string.IsNullOrEmpty(callable.Name) && char.IsUpper(callable.Name[0]))
                {
                    AddDiagnostic(diagnostics, seen, new ApiDiagnostic
                    {
                        Id = "SDK005",
                        Text = $"'{callable.Name}' does not follow naming conventions (method names must be camelCase).",
                        Level = DiagnosticLevel.Info,
                        TargetType = typeName,
                        TargetMember = callable.Id ?? callable.Name,
                    });
                }
            }

            // Property names must be camelCase (first letter lowercase), except ALL_CAPS constants
            foreach (var prop in type.Properties)
            {
                var isAllCaps = !string.IsNullOrEmpty(prop.Name) && AllCapsConstant().IsMatch(prop.Name);
                if (!isAllCaps && !string.IsNullOrEmpty(prop.Name) && char.IsUpper(prop.Name[0]))
                {
                    AddDiagnostic(diagnostics, seen, new ApiDiagnostic
                    {
                        Id = "SDK005",
                        Text = $"'{prop.Name}' does not follow naming conventions (property names must be camelCase).",
                        Level = DiagnosticLevel.Info,
                        TargetType = typeName,
                        TargetMember = prop.Name,
                    });
                }
            }
        }

        // SDK006: options bag pattern validation.
        // Uses structural type lookup to determine if the last parameter is an options bag
        // (i.e., an interface/type with optional properties). Falls back to suffix-based
        // naming convention check ("Options" suffix) only when the type is not found in the index.
        foreach (var type in types)
        {
            var typeName = type.Id ?? type.Name;

            foreach (var callable in type.Callables)
            {
                // Constructors are exempt
                var isConstructor = string.Equals(callable.Name, type.Name, StringComparison.Ordinal)
                    || string.Equals(callable.Name, "constructor", StringComparison.OrdinalIgnoreCase);
                if (isConstructor) continue;

                var paramCount = callable.ParameterTypes.Count;

                // Flag callables with > 2 parameters where the last param is not an options bag
                if (paramCount > 2)
                {
                    var lastParamType = callable.ParameterTypes[paramCount - 1];
                    if (!IsOptionsBag(lastParamType, typesByName))
                    {
                        AddDiagnostic(diagnostics, seen, new ApiDiagnostic
                        {
                            Id = "SDK006",
                            Text = $"Method '{callable.Name}' should use an options bag pattern for optional parameters.",
                            Level = DiagnosticLevel.Info,
                            TargetType = typeName,
                            TargetMember = callable.Id ?? callable.Name,
                        });
                        continue;
                    }
                }

                // Flag callables with multiple optional parameters not in an options bag
                if (callable.OptionalParameterCount > 1)
                {
                    var lastParamType = paramCount > 0 ? callable.ParameterTypes[paramCount - 1] : null;
                    if (!IsOptionsBag(lastParamType, typesByName))
                    {
                        AddDiagnostic(diagnostics, seen, new ApiDiagnostic
                        {
                            Id = "SDK006",
                            Text = $"Method '{callable.Name}' should use an options bag pattern for optional parameters.",
                            Level = DiagnosticLevel.Info,
                            TargetType = typeName,
                            TargetMember = callable.Id ?? callable.Name,
                        });
                    }
                }
            }
        }

        return diagnostics;
    }

    /// <summary>
    /// Builds a lookup of types by their short name and full Id for structural type resolution.
    /// When a type name appears more than once (e.g., across packages), the entry is kept
    /// so that at least one match is found.
    /// </summary>
    private static Dictionary<string, DiagnosticTypeInfo> BuildTypeNameLookup(
        IReadOnlyList<DiagnosticTypeInfo> types)
    {
        var lookup = new Dictionary<string, DiagnosticTypeInfo>(StringComparer.OrdinalIgnoreCase);
        foreach (var type in types)
        {
            lookup.TryAdd(type.Name, type);
            if (type.Id is not null && type.Id != type.Name)
            {
                lookup.TryAdd(type.Id, type);
            }
        }

        return lookup;
    }

    /// <summary>
    /// Determines whether a parameter type represents an options bag using structural checks.
    /// A type is considered an options bag if it is found in the index and has at least one
    /// optional property. When the type is not found in the index, falls back to a naming
    /// convention check ("Options" suffix) since the type may be defined externally
    /// (e.g., OperationOptions from a core package).
    /// </summary>
    private static bool IsOptionsBag(
        string? paramType,
        Dictionary<string, DiagnosticTypeInfo> typesByName)
    {
        if (string.IsNullOrEmpty(paramType))
        {
            return false;
        }

        // Try structural lookup first: resolve the parameter type from the index.
        if (typesByName.TryGetValue(paramType, out var resolvedType))
        {
            // Structural check: an options bag type has at least one optional property.
            return resolvedType.Properties.Count > 0 &&
                resolvedType.Properties.Any(p => p.IsOptional);
        }

        // Also try the short name (last segment after '.') for qualified type references.
        var lastDot = paramType.LastIndexOf('.');
        if (lastDot > 0 && lastDot < paramType.Length - 1)
        {
            var shortName = paramType[(lastDot + 1)..];
            if (typesByName.TryGetValue(shortName, out resolvedType))
            {
                return resolvedType.Properties.Count > 0 &&
                    resolvedType.Properties.Any(p => p.IsOptional);
            }
        }

        // Fallback: naming convention check for types not in the index (e.g., external types
        // like OperationOptions from core packages that aren't part of this API surface).
        return paramType.EndsWith("Options", StringComparison.OrdinalIgnoreCase);
    }

    private static void EmitCallableDiagnostics(
        List<ApiDiagnostic> diagnostics,
        HashSet<string> seen,
        string? targetType,
        DiagnosticCallableInfo callable,
        HashSet<string> deprecatedTypes)
    {
        var memberName = callable.Id ?? callable.Name;
        foreach (var paramType in callable.ParameterTypes)
        {
            if (string.IsNullOrWhiteSpace(paramType))
            {
                continue;
            }

            var matched = ExtractTypeTokens(paramType).FirstOrDefault(deprecatedTypes.Contains);
            if (matched is null)
            {
                continue;
            }

            AddDiagnostic(
                diagnostics,
                seen,
                new ApiDiagnostic
                {
                    Id = "SDK003",
                    Text = $"Method '{memberName}' uses deprecated parameter type '{matched}'.",
                    Level = DiagnosticLevel.Warning,
                    TargetType = targetType,
                    TargetMember = memberName,
                });
        }
    }

    private static HashSet<string> CollectDeprecatedTypeNames(IReadOnlyList<DiagnosticTypeInfo> types)
    {
        var result = new HashSet<string>(StringComparer.Ordinal);
        foreach (var type in types)
        {
            if (!type.IsDeprecated)
            {
                continue;
            }

            var id = type.Id ?? type.Name;
            foreach (var token in ExtractTypeTokens(id))
            {
                result.Add(token);
            }

            // Only extract name tokens separately if Id differs from Name
            if (id != type.Name)
            {
                foreach (var token in ExtractTypeTokens(type.Name))
                {
                    result.Add(token);
                }
            }
        }

        return result;
    }

    private static IEnumerable<string> ExtractTypeTokens(string type)
    {
        if (string.IsNullOrWhiteSpace(type))
        {
            yield break;
        }

        foreach (Match match in TypeTokenRegex().Matches(type))
        {
            var token = match.Value;
            if (string.IsNullOrWhiteSpace(token))
            {
                continue;
            }

            yield return token;

            var lastDot = token.LastIndexOf('.');
            if (lastDot > 0 && lastDot < token.Length - 1)
            {
                yield return token[(lastDot + 1)..];
            }
        }
    }

    private static void AddDiagnostic(List<ApiDiagnostic> diagnostics, HashSet<string> seen, ApiDiagnostic diagnostic)
    {
        var key = BuildKey(diagnostic);
        if (seen.Add(key))
        {
            diagnostics.Add(diagnostic);
        }
    }

    private static string BuildKey(ApiDiagnostic diagnostic)
        => string.Join('|', diagnostic.Id, diagnostic.Text, diagnostic.TargetType, diagnostic.TargetMember);

    [GeneratedRegex(@"[A-Za-z_][A-Za-z0-9_\.]*")]
    private static partial Regex TypeTokenRegex();

    /// <summary>Matches a sequence of 3 or more consecutive uppercase letters (e.g., "HTTP" in "HTTPClient").</summary>
    [GeneratedRegex(@"[A-Z]{3,}")]
    private static partial Regex ThreeOrMoreConsecutiveUppercase();

    /// <summary>Matches ALL_CAPS constant names (uppercase letters, digits, and underscores only, min 2 chars).</summary>
    [GeneratedRegex(@"^[A-Z][A-Z0-9_]+$")]
    private static partial Regex AllCapsConstant();
}
