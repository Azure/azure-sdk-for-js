// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Text.Json;
using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.TypeScript;

/// <summary>
/// Analyzes TypeScript/JavaScript code to graph which API operations are being used.
/// Uses ts-morph for accurate AST-based parsing via graph_api.js --usage mode.
/// </summary>
public class TypeScriptUsageAnalyzer : IUsageAnalyzer<ApiIndex>
{
    private readonly EngineAvailabilityProvider _availability = new(TypeScriptPublicApiGraphEngine.SharedConfig);

    /// <inheritdoc />
    public string Language => "typescript";

    /// <summary>
    /// Checks if Node.js is available to run the usage analyzer.
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
        var scriptDir = AppContext.BaseDirectory;

        // In RuntimeInterpreter mode, ensure npm dependencies are installed
        // before invoking the script (mirrors TypeScriptPublicApiGraphEngine.RunEngineAsync).
        if (availability.Mode == EngineMode.RuntimeInterpreter)
        {
            await TypeScriptPublicApiGraphEngine.EnsureDependenciesAsync(scriptDir, ct).ConfigureAwait(false);
        }

        var analysisResult = await ScriptUsageAnalyzerHelper.AnalyzeAsync(new ScriptUsageAnalyzerHelper.ScriptInvocationConfig
        {
            Language = Language,
            Availability = availability,
            ApiJson = apiJson,
            SamplesPath = normalizedPath,
            BuildArgs = (avail, samplesPath) => avail.Mode switch
            {
                EngineMode.RuntimeInterpreter => new(
                    [Path.Combine(scriptDir, "dist", "graph_api.js"), "--usage", "-", samplesPath],
                    WorkingDirectory: scriptDir),
                _ => new(["--usage", "-", samplesPath])
            },
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
        var reachable = GetReachableTypeNames(
            apiIndex,
            out var classesByName,
            out var interfacesByName);

        if (classesByName.Values.Any(c => reachable.Contains(IApiIndex.NormalizeTypeName(c.Name)) && (c.Methods?.Any() ?? false)))
        {
            return true;
        }

        return interfacesByName.Values.Any(i => reachable.Contains(IApiIndex.NormalizeTypeName(i.Name)) && (i.Methods?.Any() ?? false));
    }

    private static HashSet<string> GetReachableTypeNames(
        ApiIndex apiIndex,
        out Dictionary<string, ClassInfo> classesByName,
        out Dictionary<string, InterfaceInfo> interfacesByName)
    {
        var allClasses = apiIndex.GetAllClasses().ToList();
        var allInterfaces = apiIndex.Modules.SelectMany(m => m.Interfaces ?? []).ToList();

        classesByName = new Dictionary<string, ClassInfo>(StringComparer.Ordinal);
        foreach (var cls in allClasses)
        {
            var name = IApiIndex.NormalizeTypeName(cls.Name);
            classesByName.TryAdd(name, cls);
        }

        interfacesByName = new Dictionary<string, InterfaceInfo>(StringComparer.Ordinal);
        foreach (var iface in allInterfaces)
        {
            var name = IApiIndex.NormalizeTypeName(iface.Name);
            interfacesByName.TryAdd(name, iface);
        }

        var allTypeNames = classesByName.Keys
            .Concat(interfacesByName.Keys)
            .ToHashSet(StringComparer.Ordinal);

        // Build interface→implementer edges for BFS
        var additionalEdges = new Dictionary<string, List<string>>(StringComparer.Ordinal);
        foreach (var cls in allClasses)
        {
            foreach (var iface in cls.Implements ?? [])
            {
                var ifaceName = IApiIndex.NormalizeTypeName(iface);
                if (!additionalEdges.TryGetValue(ifaceName, out var list))
                {
                    list = [];
                    additionalEdges[ifaceName] = list;
                }
                list.Add(IApiIndex.NormalizeTypeName(cls.Name));
            }
        }

        // Build type nodes: classes are root candidates, interfaces are not
        List<ReachabilityAnalyzer.TypeNode> typeNodes = [];

        foreach (var cls in allClasses)
        {
            var name = IApiIndex.NormalizeTypeName(cls.Name);
            typeNodes.Add(new ReachabilityAnalyzer.TypeNode
            {
                Name = name,
                HasOperations = cls.Methods?.Any() ?? false,
                IsExplicitEntryPoint = cls.EntryPoint == true,
                IsRootCandidate = true,
                ReferencedTypes = cls.GetReferencedTypes(allTypeNames)
            });
        }

        foreach (var iface in allInterfaces)
        {
            var name = IApiIndex.NormalizeTypeName(iface.Name);
            typeNodes.Add(new ReachabilityAnalyzer.TypeNode
            {
                Name = name,
                HasOperations = iface.Methods?.Any() ?? false,
                IsExplicitEntryPoint = iface.EntryPoint == true,
                IsRootCandidate = false,
                ReferencedTypes = iface.GetReferencedTypes(allTypeNames)
            });
        }

        return ReachabilityAnalyzer.FindReachable(typeNodes, additionalEdges, StringComparer.Ordinal);
    }

    /// <summary>
    /// Builds a lookup from "TypeName.MethodName" → "MethodName(Sig)" using the API index,
    /// so uncovered operations get real signatures when the script fails to provide one.
    /// </summary>
    internal static Dictionary<string, string> BuildSignatureLookup(ApiIndex apiIndex)
    {
        var lookup = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var module in apiIndex.Modules)
        {
            foreach (var cls in module.Classes ?? [])
                foreach (var method in cls.Methods ?? [])
                    lookup.TryAdd($"{cls.Name}.{method.Name}", $"{method.Name}{method.Sig}");

            foreach (var iface in module.Interfaces ?? [])
                foreach (var method in iface.Methods ?? [])
                    lookup.TryAdd($"{iface.Name}.{method.Name}", $"{method.Name}{method.Sig}");
        }
        return lookup;
    }
}
