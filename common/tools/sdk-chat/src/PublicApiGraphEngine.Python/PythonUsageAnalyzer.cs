// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;

namespace PublicApiGraphEngine.Python;

/// <summary>
/// Analyzes Python code to graph which API operations are being used.
/// Uses Python's AST module for accurate parsing via graph_api.py --usage mode.
/// </summary>
public class PythonUsageAnalyzer : IUsageAnalyzer<ApiIndex>
{
    private static readonly string ScriptPath = Path.Combine(
        AppContext.BaseDirectory,
        "graph_api.py");

    private readonly EngineAvailabilityProvider _availability = new(PythonPublicApiGraphEngine.SharedConfig);

    /// <inheritdoc />
    public string Language => "python";

    /// <summary>
    /// Checks if Python is available to run the usage analyzer.
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

        var clientClasses = GetClientAndSubclientClasses(apiIndex);

        // Get client classes from API - if none, no point analyzing
        if (!clientClasses.Any())
            return new UsageIndex { FileCount = 0 };

        var availability = _availability.GetAvailability();
        if (!availability.IsAvailable)
            return new UsageIndex { FileCount = 0 };

        var analysisResult = await ScriptUsageAnalyzerHelper.AnalyzeAsync(new ScriptUsageAnalyzerHelper.ScriptInvocationConfig
        {
            Language = Language,
            Availability = availability,
            ApiJson = apiIndex.ToJson(),
            SamplesPath = normalizedPath,
            BuildArgs = (avail, samplesPath) => avail.Mode switch
            {
                EngineMode.RuntimeInterpreter => new([GetScriptPath(), "--usage", "-", samplesPath]),
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

    private static string GetScriptPath()
    {
        if (File.Exists(ScriptPath))
            return ScriptPath;

        throw new FileNotFoundException(
            $"Corrupt installation: graph_api.py not found at {ScriptPath}. " +
            "Reinstall the application to resolve this issue.");
    }

    private static IReadOnlyList<ClassInfo> GetClientAndSubclientClasses(ApiIndex apiIndex)
    {
        var allClasses = apiIndex.GetAllClasses().ToList();
        var allTypeNames = allClasses
            .Select(c => IApiIndex.NormalizeTypeName(c.Name))
            .ToHashSet(StringComparer.Ordinal);

        // Build base→derived edges for BFS (Python uses inheritance, not interfaces)
        var additionalEdges = new Dictionary<string, List<string>>(StringComparer.Ordinal);
        foreach (var cls in allClasses)
        {
            if (string.IsNullOrWhiteSpace(cls.Base))
                continue;

            var baseName = IApiIndex.NormalizeTypeName(cls.Base);
            if (!additionalEdges.TryGetValue(baseName, out var list))
            {
                list = [];
                additionalEdges[baseName] = list;
            }
            list.Add(IApiIndex.NormalizeTypeName(cls.Name));
        }

        // Build type nodes for reachability analysis
        // Abstract base classes (ABC/ABCMeta) and Protocols are not root candidates,
        // mirroring how interfaces are excluded in Java/TypeScript/Go.
        var typeNodes = allClasses.Select(c => new ReachabilityAnalyzer.TypeNode
        {
            Name = IApiIndex.NormalizeTypeName(c.Name),
            HasOperations = c.Methods?.Any() ?? false,
            IsExplicitEntryPoint = c.EntryPoint == true,
            IsRootCandidate = !IsAbstractOrProtocolType(c),
            ReferencedTypes = c.GetReferencedTypes(allTypeNames)
        }).ToList();

        var reachable = ReachabilityAnalyzer.FindReachable(typeNodes, additionalEdges, StringComparer.Ordinal);

        return allClasses
            .Where(c => reachable.Contains(IApiIndex.NormalizeTypeName(c.Name)) && (c.Methods?.Any() ?? false))
            .GroupBy(c => IApiIndex.NormalizeTypeName(c.Name), StringComparer.Ordinal)
            .Select(g => g.First())
            .ToList();
    }

    /// <summary>
    /// Builds a lookup from "TypeName.MethodName" → "MethodName(Signature)" using the API index,
    /// so uncovered operations get real signatures when the script fails to provide one.
    /// </summary>
    internal static Dictionary<string, string> BuildSignatureLookup(ApiIndex apiIndex)
    {
        var lookup = new Dictionary<string, string>(StringComparer.Ordinal);
        foreach (var cls in apiIndex.GetAllClasses())
            foreach (var method in cls.Methods ?? [])
                lookup.TryAdd($"{cls.Name}.{method.Name}", $"{method.Name}({method.Signature})");
        return lookup;
    }

    /// <summary>
    /// Detects abstract base classes and protocol types that should not be root candidates
    /// in reachability analysis. Mirrors how Java/TypeScript/Go exclude interfaces.
    /// </summary>
    private static bool IsAbstractOrProtocolType(ClassInfo cls)
    {
        if (string.IsNullOrEmpty(cls.Base))
            return false;

        var baseName = IApiIndex.NormalizeTypeName(cls.Base);

        // Strip module prefix (e.g. "abc.ABC" → "ABC", "typing.Protocol" → "Protocol")
        if (baseName.Contains('.'))
            baseName = baseName[(baseName.LastIndexOf('.') + 1)..];

        return baseName is "ABC" or "ABCMeta" or "Protocol";
    }
}
