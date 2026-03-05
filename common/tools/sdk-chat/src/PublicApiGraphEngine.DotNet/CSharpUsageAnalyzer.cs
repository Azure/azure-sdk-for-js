// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using System.Collections.Concurrent;
using System.Diagnostics;
using PublicApiGraphEngine.Contracts;
using Microsoft.CodeAnalysis;
using Microsoft.CodeAnalysis.CSharp;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace PublicApiGraphEngine.DotNet;

/// <summary>
/// Analyzes C# code to graph which API operations are being used.
/// Uses Roslyn for accurate semantic analysis of method invocations.
/// </summary>
public class CSharpUsageAnalyzer : IUsageAnalyzer<ApiIndex>
{
    /// <inheritdoc />
    public string Language => "csharp";

    /// <summary>
    /// C# analyzer uses Roslyn which is embedded, so it's always available.
    /// </summary>
    public bool IsAvailable() => true;

    /// <inheritdoc />
    public async Task<UsageIndex> AnalyzeAsync(string codePath, ApiIndex apiIndex, CancellationToken ct = default)
    {
        var normalizedPath = Path.GetFullPath(codePath);

        if (!Directory.Exists(normalizedPath))
            return new UsageIndex { FileCount = 0 };

        using var activity = EngineTelemetry.StartUsageAnalysis(Language, normalizedPath);

        var clientMethods = BuildClientMethodMap(apiIndex);
        if (clientMethods.Count is 0)
            return new UsageIndex { FileCount = 0 };

        var files = Directory.EnumerateFiles(normalizedPath, "*.cs", SearchOption.AllDirectories)
            .Where(f =>
            {
                var relativePath = Path.GetRelativePath(normalizedPath, f);
                return !CSharpPublicApiGraphEngine.ContainsSegment(relativePath, "obj")
                    && !CSharpPublicApiGraphEngine.ContainsSegment(relativePath, "bin")
                    && !CSharpPublicApiGraphEngine.ContainsSegment(relativePath, ".git")
                    && !CSharpPublicApiGraphEngine.ContainsSegment(relativePath, ".vs")
                    && !CSharpPublicApiGraphEngine.ContainsSegment(relativePath, "node_modules");
            })
            .ToList();

        List<SyntaxTree> syntaxTrees;
        Dictionary<SyntaxTree, string> filePathMap;

        // Parse files in parallel (mirrors the parallel parsing in the engine)
        var parsedTrees = new ConcurrentBag<(SyntaxTree Tree, string RelativePath)>();
        await Parallel.ForEachAsync(
            files,
            new ParallelOptions
            {
                MaxDegreeOfParallelism = Math.Min(Environment.ProcessorCount, 8),
                CancellationToken = ct
            },
            async (file, token) =>
            {
                var code = await File.ReadAllTextAsync(file, token).ConfigureAwait(false);
                var tree = CSharpSyntaxTree.ParseText(code, path: file, cancellationToken: token);
                parsedTrees.Add((tree, Path.GetRelativePath(normalizedPath, file)));
            }).ConfigureAwait(false);

        syntaxTrees = new List<SyntaxTree>(parsedTrees.Count);
        filePathMap = new Dictionary<SyntaxTree, string>(parsedTrees.Count);
        foreach (var (tree, relativePath) in parsedTrees)
        {
            syntaxTrees.Add(tree);
            filePathMap[tree] = relativePath;
        }

        // Create compilation for semantic analysis.
        // Include stub type declarations from the ApiIndex so Roslyn can resolve
        // SDK types that sample code references but does not define.
        var stubTree = CSharpFormatter.BuildCompilationStubs(apiIndex);
        var allTrees = syntaxTrees.Append(stubTree).ToList();

        var references = CSharpPublicApiGraphEngine.CachedMetadataReferences ?? GetBasicMetadataReferences();
        var compilation = CSharpCompilation.Create(
            "UsageAnalysis",
            allTrees,
            references,
            new CSharpCompilationOptions(OutputKind.DynamicallyLinkedLibrary)
                .WithNullableContextOptions(NullableContextOptions.Enable));

        List<OperationUsage> coveredOperations = [];
        HashSet<string> seenOperations = []; // Dedupe: "ClientType.Method"

        foreach (var tree in syntaxTrees)
        {
            ct.ThrowIfCancellationRequested();

            var root = await tree.GetRootAsync(ct);
            var relativePath = filePathMap[tree];
            var semanticModel = compilation.GetSemanticModel(tree);

            // Use Roslyn to find all method invocations
            var invocations = root.DescendantNodes().OfType<InvocationExpressionSyntax>();

            foreach (var invocation in invocations)
            {
                var (clientType, methodName) = ExtractMethodCallWithSemantics(invocation, clientMethods, semanticModel);

                if (clientType is not null && methodName is not null)
                {
                    var key = $"{clientType}.{methodName}";
                    if (seenOperations.Add(key))
                    {
                        var lineSpan = invocation.GetLocation().GetLineSpan();
                        coveredOperations.Add(new OperationUsage
                        {
                            ClientType = clientType,
                            Operation = methodName,
                            File = relativePath,
                            Line = lineSpan.StartLinePosition.Line + 1
                        });
                    }
                }
            }
        }

        var uncoveredOperations = BuildUncoveredList(clientMethods, seenOperations, apiIndex);

        var result = new UsageIndex
        {
            FileCount = files.Count,
            CoveredOperations = coveredOperations,
            UncoveredOperations = uncoveredOperations
        };

        EngineTelemetry.RecordResult(activity, true, result.CoveredOperations.Count);
        return result;
    }

    /// <summary>
    /// Gets basic metadata references for compilation.
    /// </summary>
    private static IReadOnlyList<MetadataReference> GetBasicMetadataReferences()
    {
        List<MetadataReference> references = [];
        var runtimeDir = AppContext.BaseDirectory;

        var runtimeAssemblies = new[]
        {
            "System.Runtime.dll",
            "System.Collections.dll",
            "System.Linq.dll",
            "System.Threading.Tasks.dll",
            "netstandard.dll",
        };

        foreach (var asm in runtimeAssemblies)
        {
            var path = Path.Combine(runtimeDir, asm);
            if (File.Exists(path))
            {
                try { references.Add(MetadataReference.CreateFromFile(path)); }
                catch (Exception ex) { Trace.TraceWarning("Failed to load runtime assembly '{0}': {1}", path, ex.Message); }
            }
        }

        return references;
    }

    /// <inheritdoc />
    public string Format(UsageIndex index) => UsageFormatter.Format(index);

    /// <summary>
    /// Builds a map of client type names to their method names.
    /// </summary>
    private static Dictionary<string, HashSet<string>> BuildClientMethodMap(ApiIndex apiIndex)
    {
        var map = new Dictionary<string, HashSet<string>>(StringComparer.OrdinalIgnoreCase);

        foreach (var clientType in GetClientAndSubclientTypes(apiIndex))
        {
            var methods = new HashSet<string>(StringComparer.OrdinalIgnoreCase);
            foreach (var member in clientType.Members ?? [])
            {
                if (member.Kind == "method")
                {
                    methods.Add(member.Name);
                }
            }
            if (methods.Count > 0)
            {
                map[clientType.Name] = methods;
            }
        }

        return map;
    }

    private static IEnumerable<TypeInfo> GetClientAndSubclientTypes(ApiIndex apiIndex)
    {
        var allTypes = apiIndex.GetAllTypes().ToList();
        var allTypeNames = allTypes
            .Select(t => IApiIndex.NormalizeTypeName(t.Name))
            .ToHashSet(StringComparer.OrdinalIgnoreCase);

        // Build interface→implementer edges for BFS
        var additionalEdges = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase);
        foreach (var type in allTypes)
        {
            foreach (var iface in type.Interfaces ?? [])
            {
                var ifaceName = IApiIndex.NormalizeTypeName(iface);
                if (!additionalEdges.TryGetValue(ifaceName, out var list))
                {
                    list = [];
                    additionalEdges[ifaceName] = list;
                }
                list.Add(IApiIndex.NormalizeTypeName(type.Name));
            }
        }

        // Build type nodes for reachability analysis
        var typeNodes = allTypes.Select(t => new ReachabilityAnalyzer.TypeNode
        {
            Name = IApiIndex.NormalizeTypeName(t.Name),
            HasOperations = t.Members?.Any(m => m.Kind == "method") ?? false,
            IsExplicitEntryPoint = t.EntryPoint == true,
            IsRootCandidate = t.Kind.Equals("class", StringComparison.OrdinalIgnoreCase)
                           || t.Kind.Equals("struct", StringComparison.OrdinalIgnoreCase)
                           || t.Kind.StartsWith("record", StringComparison.OrdinalIgnoreCase),
            ReferencedTypes = t.GetReferencedTypes(allTypeNames)
        }).ToList();

        var reachable = ReachabilityAnalyzer.FindReachable(typeNodes, additionalEdges, StringComparer.OrdinalIgnoreCase);

        return allTypes
            .Where(t => reachable.Contains(IApiIndex.NormalizeTypeName(t.Name)) && (t.Members?.Any(m => m.Kind == "method") ?? false))
            .GroupBy(t => IApiIndex.NormalizeTypeName(t.Name), StringComparer.OrdinalIgnoreCase)
            .Select(g => g.First());
    }

    /// <summary>
    /// Graphs client type and method name from an invocation using Roslyn semantic analysis.
    /// Uses the semantic model to resolve the actual receiver type for accurate matching.
    /// </summary>
    private static (string? ClientType, string? MethodName) ExtractMethodCallWithSemantics(
        InvocationExpressionSyntax invocation,
        Dictionary<string, HashSet<string>> clientMethods,
        SemanticModel semanticModel)
    {
        // Handle: receiver.Method()
        if (invocation.Expression is not MemberAccessExpressionSyntax memberAccess)
            return (null, null);

        var methodName = memberAccess.Name.Identifier.Text;

        var symbolInfo = semanticModel.GetSymbolInfo(memberAccess);
        if (symbolInfo.Symbol is IMethodSymbol methodSymbol)
        {
            var containingType = methodSymbol.ContainingType;
            if (containingType is not null)
            {
                var typeName = containingType.Name;

                // Check if this type is in our client methods map
                if (clientMethods.TryGetValue(typeName, out var methods) && methods.Contains(methodName))
                {
                    return (typeName, methodName);
                }

                // Also check interfaces that the type implements
                foreach (var iface in containingType.AllInterfaces)
                {
                    var ifaceName = iface.Name;
                    if (clientMethods.TryGetValue(ifaceName, out var ifaceMethods) && ifaceMethods.Contains(methodName))
                    {
                        return (ifaceName, methodName);
                    }
                }

                // Check base types
                var baseType = containingType.BaseType;
                while (baseType is not null)
                {
                    var baseName = baseType.Name;
                    if (clientMethods.TryGetValue(baseName, out var baseMethods) && baseMethods.Contains(methodName))
                    {
                        return (baseName, methodName);
                    }
                    baseType = baseType.BaseType;
                }
            }
        }

        return (null, null);
    }

    /// <summary>
    /// Builds list of operations that exist in API but have no usage.
    /// Cross-references interface/implementation relationships so that covering
    /// an interface method also covers the implementation (and vice versa).
    /// </summary>
    private static List<UncoveredOperation> BuildUncoveredList(
        Dictionary<string, HashSet<string>> clientMethods,
        HashSet<string> seenOperations,
        ApiIndex apiIndex)
    {
        // Build a quick lookup from "TypeName.MethodName" → full signature from API index
        // so uncovered operations get real parameter signatures instead of "method(...)" placeholders.
        var signatureLookup = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var ns in apiIndex.Namespaces ?? [])
            foreach (var type in ns.Types ?? [])
                foreach (var member in type.Members ?? [])
                    if (member.Kind == "method")
                        signatureLookup.TryAdd($"{type.Name}.{member.Name}", member.Signature);

        // Build bidirectional interface ↔ implementation mapping
        var interfaceToImpls = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase);
        var implToInterfaces = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase);

        foreach (var ns in apiIndex.Namespaces ?? [])
        {
            foreach (var type in ns.Types ?? [])
            {
                foreach (var iface in type.Interfaces ?? [])
                {
                    var ifaceName = IApiIndex.NormalizeTypeName(iface);

                    if (!interfaceToImpls.TryGetValue(ifaceName, out var impls))
                    {
                        impls = [];
                        interfaceToImpls[ifaceName] = impls;
                    }
                    impls.Add(type.Name);

                    if (!implToInterfaces.TryGetValue(type.Name, out var ifaces))
                    {
                        ifaces = [];
                        implToInterfaces[type.Name] = ifaces;
                    }
                    ifaces.Add(ifaceName);
                }
            }
        }

        List<UncoveredOperation> uncovered = [];

        foreach (var (clientType, methods) in clientMethods)
        {
            foreach (var method in methods)
            {
                var key = $"{clientType}.{method}";
                if (seenOperations.Contains(key))
                    continue;

                // Check if covered through an interface/implementation relationship
                bool coveredViaRelated = false;

                // If this is an implementation, check if any of its interfaces has the method covered
                if (implToInterfaces.TryGetValue(clientType, out var implementedInterfaces))
                {
                    coveredViaRelated = implementedInterfaces.Any(iface =>
                        seenOperations.Contains($"{iface}.{method}"));
                }

                // If this is an interface, check if any implementation has the method covered
                if (!coveredViaRelated && interfaceToImpls.TryGetValue(clientType, out var implementations))
                {
                    coveredViaRelated = implementations.Any(impl =>
                        seenOperations.Contains($"{impl}.{method}"));
                }

                if (!coveredViaRelated)
                {
                    var sigKey = $"{clientType}.{method}";
                    uncovered.Add(new UncoveredOperation
                    {
                        ClientType = clientType,
                        Operation = method,
                        Signature = signatureLookup.TryGetValue(sigKey, out var realSig) ? realSig : $"{method}(...)"
                    });
                }
            }
        }

        return uncovered;
    }
}
