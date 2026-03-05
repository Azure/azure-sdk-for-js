// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Go;

/// <summary>
/// Analyzes Go code to graph which API operations are being used.
/// Uses go/ast (via compiled binary) for accurate AST-based parsing.
/// </summary>
public class GoUsageAnalyzer : IUsageAnalyzer<ApiIndex>
{
    private readonly EngineAvailabilityProvider _availability = new(GoPublicApiGraphEngine.SharedConfig);

    /// <inheritdoc />
    public string Language => "go";

    /// <summary>
    /// Checks if Go is available to run the usage analyzer.
    /// </summary>
    public bool IsAvailable() => _availability.IsAvailable;

    /// <inheritdoc />
    public string? UnavailableReason => _availability.UnavailableReason;

    /// <inheritdoc />
    public async Task<UsageIndex> AnalyzeAsync(string codePath, ApiIndex apiIndex, CancellationToken ct = default)
    {
        var normalizedPath = Path.GetFullPath(codePath);

        if (!Directory.Exists(normalizedPath))
            return new UsageIndex { FileCount = 0 };

        using var activity = EngineTelemetry.StartUsageAnalysis(Language, normalizedPath);

        if (!HasReachableOperations(apiIndex))
            return new UsageIndex { FileCount = 0 };

        var availability = _availability.GetAvailability();
        if (!availability.IsAvailable)
            return new UsageIndex { FileCount = 0 };

        var apiJson = JsonSerializer.Serialize(apiIndex, SourceGenerationContext.Default.ApiIndex);

        // For RuntimeInterpreter mode, pre-compile the Go binary (Issue 3: avoid `go run` overhead).
        // The compiled binary is cached by content hash, so this is fast on subsequent calls.
        string? compiledBinaryPath = null;
        if (availability.Mode == EngineMode.RuntimeInterpreter)
        {
            compiledBinaryPath = await GoPublicApiGraphEngine.EnsureCompiledAsync(availability.ExecutablePath!, ct).ConfigureAwait(false);
        }

        var analysisResult = await ScriptUsageAnalyzerHelper.AnalyzeAsync(new ScriptUsageAnalyzerHelper.ScriptInvocationConfig
        {
            Language = Language,
            Availability = availability.Mode == EngineMode.RuntimeInterpreter
                ? availability with { Mode = EngineMode.NativeBinary, ExecutablePath = compiledBinaryPath }
                : availability,
            ApiJson = apiJson,
            SamplesPath = normalizedPath,
            BuildArgs = (avail, samplesPath) => new(["-usage", "-", samplesPath]),
            SignatureLookup = BuildSignatureLookup(apiIndex)
        }, ct).ConfigureAwait(false);

        if (analysisResult.Errors.Count > 0)
        {
            var errorMsg = string.Join("; ", analysisResult.Errors);
            EngineTelemetry.RecordResult(activity, false, error: errorMsg);
            return analysisResult.Index ?? new UsageIndex { FileCount = 0 };
        }

        EngineTelemetry.RecordResult(activity, true, analysisResult.Index?.CoveredOperations.Count ?? 0);
        return analysisResult.Index ?? new UsageIndex { FileCount = 0 };
    }

    /// <inheritdoc />
    public string Format(UsageIndex index) => UsageFormatter.Format(index);

    private static bool HasReachableOperations(ApiIndex apiIndex)
    {
        var reachable = GetReachableTypeNames(apiIndex, out var allStructs, out var allInterfaces);

        if (allStructs.Any(s => reachable.Contains(s.Name) && (s.Methods?.Any() ?? false)))
        {
            return true;
        }

        return allInterfaces.Any(i => reachable.Contains(i.Name) && (i.Methods?.Any() ?? false));
    }

    private static HashSet<string> GetReachableTypeNames(
        ApiIndex apiIndex,
        out List<StructApi> allStructs,
        out List<IfaceApi> allInterfaces)
    {
        allStructs = apiIndex.GetAllStructs().ToList();
        allInterfaces = apiIndex.Packages
            .SelectMany(p => p.Interfaces ?? [])
            .ToList();

        // Go is case-sensitive — use Ordinal comparison for type/method names.
        var allTypeNames = allStructs
            .Select(s => s.Name)
            .Concat(allInterfaces.Select(i => i.Name))
            .ToHashSet(StringComparer.Ordinal);

        // Structural interface matching: a struct implements an interface if it has
        // methods with matching names. This mirrors Go's structural typing model.
        var interfaceMethods = new Dictionary<string, HashSet<string>>(StringComparer.Ordinal);
        foreach (var iface in allInterfaces)
        {
            var methods = new HashSet<string>(StringComparer.Ordinal);
            foreach (var method in iface.Methods ?? [])
                methods.Add(method.Name);

            if (methods.Count > 0)
                interfaceMethods[iface.Name] = methods;
        }

        var additionalEdges = new Dictionary<string, List<string>>(StringComparer.Ordinal);
        foreach (var iface in interfaceMethods)
        {
            foreach (var strct in allStructs)
            {
                var structMethods = new HashSet<string>(StringComparer.Ordinal);
                foreach (var method in strct.Methods ?? [])
                    structMethods.Add(method.Name);

                if (iface.Value.All(structMethods.Contains))
                {
                    if (!additionalEdges.TryGetValue(iface.Key, out var list))
                    {
                        list = [];
                        additionalEdges[iface.Key] = list;
                    }
                    list.Add(strct.Name);
                }
            }
        }

        // Build type nodes: structs are root candidates, interfaces are not
        List<ReachabilityAnalyzer.TypeNode> typeNodes = [];

        foreach (var strct in allStructs)
        {
            typeNodes.Add(new ReachabilityAnalyzer.TypeNode
            {
                Name = strct.Name,
                HasOperations = strct.Methods?.Any() ?? false,
                IsExplicitEntryPoint = strct.EntryPoint == true,
                IsRootCandidate = true,
                ReferencedTypes = strct.GetReferencedTypes(allTypeNames)
            });
        }

        foreach (var iface in allInterfaces)
        {
            typeNodes.Add(new ReachabilityAnalyzer.TypeNode
            {
                Name = iface.Name,
                HasOperations = iface.Methods?.Any() ?? false,
                IsExplicitEntryPoint = iface.EntryPoint == true,
                IsRootCandidate = false,
                ReferencedTypes = GetReferencedTypes(iface, allTypeNames)
            });
        }

        return ReachabilityAnalyzer.FindReachable(typeNodes, additionalEdges, StringComparer.Ordinal);
    }

    private static HashSet<string> GetReferencedTypes(IfaceApi iface, HashSet<string> allTypeNames)
    {
        // Go is case-sensitive — use Ordinal, consistent with struct GetReferencedTypes
        HashSet<string> tokens = new(StringComparer.Ordinal);

        // Embedded interfaces are direct composition dependencies
        foreach (var embed in iface.Embeds ?? [])
        {
            if (allTypeNames.Contains(embed))
                tokens.Add(embed);
        }

        foreach (var method in iface.Methods ?? [])
        {
            SignatureTokenizer.TokenizeInto(method.Sig, tokens);
            SignatureTokenizer.TokenizeInto(method.Ret, tokens);
        }

        tokens.IntersectWith(allTypeNames);
        return tokens;
    }

    /// <summary>
    /// Builds a lookup from "TypeName.MethodName" → "MethodName(Sig) Ret" using the API index,
    /// so uncovered operations get real signatures when the script fails to provide one.
    /// </summary>
    internal static Dictionary<string, string> BuildSignatureLookup(ApiIndex apiIndex)
    {
        var lookup = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var pkg in apiIndex.Packages ?? [])
        {
            foreach (var strct in pkg.Structs ?? [])
                foreach (var method in strct.Methods ?? [])
                {
                    var ret = !string.IsNullOrEmpty(method.Ret) ? $" {method.Ret}" : "";
                    lookup.TryAdd($"{strct.Name}.{method.Name}", $"{method.Name}({method.Sig}){ret}");
                }

            foreach (var iface in pkg.Interfaces ?? [])
                foreach (var method in iface.Methods ?? [])
                {
                    var ret = !string.IsNullOrEmpty(method.Ret) ? $" {method.Ret}" : "";
                    lookup.TryAdd($"{iface.Name}.{method.Name}", $"{method.Name}({method.Sig}){ret}");
                }
        }
        return lookup;
    }
}
