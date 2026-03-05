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

        return diagnostics;
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
}
