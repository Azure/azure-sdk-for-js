// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

using PublicApiGraphEngine.Contracts;
using Xunit;

namespace PublicApiGraphEngine.Tests;

/// <summary>
/// Tests for the centralized <see cref="ReachabilityAnalyzer"/>.
/// Validates SCC-based root detection, BFS traversal, additional edge following,
/// entry point handling, and comparer behavior.
/// </summary>
public class ReachabilityAnalyzerTests
{
    #region Root Detection

    [Fact]
    public void FindReachable_SingleRootWithOperations_ReturnsIt()
    {
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ChatClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ChatClient", result);
    }

    [Fact]
    public void FindReachable_UnreferencedRootReferencingOps_IsRoot()
    {
        // A type with no operations but referencing one that has operations → root
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ServiceClient", hasOps: false, refs: ["ChatClient"]),
            Node("ChatClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ServiceClient", result);
        Assert.Contains("ChatClient", result);
    }

    [Fact]
    public void FindReachable_ReferencedType_NotRoot()
    {
        // ChatClient references WidgetClient → WidgetClient is not a root
        // but is still reachable via BFS
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ChatClient", hasOps: true, refs: ["WidgetClient"]),
            Node("WidgetClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ChatClient", result);
        Assert.Contains("WidgetClient", result);
    }

    [Fact]
    public void FindReachable_MutualReferenceCycle_BothReachable()
    {
        // A → B, B → A — form one SCC which is a source in the condensation
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B"]),
            Node("B", hasOps: true, refs: ["A"])
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("A", result);
        Assert.Contains("B", result);
    }

    [Fact]
    public void FindReachable_SelfReference_DoesNotPreventBeingRoot()
    {
        // A type referencing itself should still be unreferenced (by others)
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("LinkedList", hasOps: true, refs: ["LinkedList"])
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("LinkedList", result);
    }

    #endregion

    #region Entry Points

    [Fact]
    public void FindReachable_ExplicitEntryPoint_AlwaysRoot()
    {
        // Even if referenced by another type, entry points are always roots
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ServiceClient", hasOps: true, refs: ["EntryClient"]),
            Node("EntryClient", hasOps: true, isEntryPoint: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("EntryClient", result);
        Assert.Contains("ServiceClient", result);
    }

    [Fact]
    public void FindReachable_EntryPointWithNoOps_StillRoot()
    {
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("NoOpsEntry", hasOps: false, isEntryPoint: true, refs: ["Worker"]),
            Node("Worker", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("NoOpsEntry", result);
        Assert.Contains("Worker", result);
    }

    #endregion

    #region Root Candidate Filtering

    [Fact]
    public void FindReachable_NonRootCandidateNotSelectedAsRoot()
    {
        // Interfaces (IsRootCandidate=false) should not be roots even if unreferenced
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("IService", hasOps: true, isRootCandidate: false),
            Node("ServiceImpl", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        // ServiceImpl is root (unreferenced, has ops). IService is not reachable
        // unless connected via edges.
        Assert.Contains("ServiceImpl", result);
        Assert.DoesNotContain("IService", result);
    }

    [Fact]
    public void FindReachable_InterfaceReachableViaEdges()
    {
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ServiceImpl", hasOps: true, refs: ["IService"]),
            Node("IService", hasOps: true, isRootCandidate: false)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("IService", result);
    }

    [Fact]
    public void FindReachable_InterfaceOnlyRefToClient_ClientStillRoot()
    {
        // IClientFactory (interface, not a root candidate) references ChatClient.
        // ChatClient has ops but its SCC has an incoming edge from IClientFactory's SCC.
        // Without the safeguard, ChatClient would be pruned as a non-source.
        // With the safeguard, edges from non-candidate SCCs are ignored in the
        // condensation, so ChatClient's SCC remains a source.
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("IClientFactory", hasOps: false, isRootCandidate: false, refs: ["ChatClient"]),
            Node("ChatClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ChatClient", result);
        Assert.DoesNotContain("IClientFactory", result);
    }

    [Fact]
    public void FindReachable_InterfaceRefToClient_WithOtherRealRoot()
    {
        // IHelper (interface) refs ChatClient, ServiceClient refs EmbeddingClient.
        // ChatClient should still be a root despite IHelper's edge.
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("IHelper", hasOps: false, isRootCandidate: false, refs: ["ChatClient"]),
            Node("ChatClient", hasOps: true),
            Node("ServiceClient", hasOps: true, refs: ["EmbeddingClient"]),
            Node("EmbeddingClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ChatClient", result);
        Assert.Contains("ServiceClient", result);
        Assert.Contains("EmbeddingClient", result);
        Assert.DoesNotContain("IHelper", result);
    }

    [Fact]
    public void FindReachable_RealRootRefBlocksClientFromBeingSource()
    {
        // ServiceClient (root candidate) refs ChatClient → ChatClient is NOT a source.
        // This is correct: ChatClient is reachable from ServiceClient via BFS.
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ServiceClient", hasOps: true, refs: ["ChatClient"]),
            Node("ChatClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        // Both reachable, but only ServiceClient is a root
        Assert.Contains("ServiceClient", result);
        Assert.Contains("ChatClient", result);
    }

    #endregion

    #region Additional Edges (Interface→Implementer, Base→Derived)

    [Fact]
    public void FindReachable_FollowsInterfaceToImplementerEdges()
    {
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("Client", hasOps: true, refs: ["IWidget"]),
            Node("IWidget", hasOps: true, isRootCandidate: false),
            Node("WidgetImpl", hasOps: true)
        };

        var edges = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase)
        {
            ["IWidget"] = ["WidgetImpl"]
        };

        var result = ReachabilityAnalyzer.FindReachable(types, edges, StringComparer.OrdinalIgnoreCase);

        Assert.Contains("Client", result);
        Assert.Contains("IWidget", result);
        Assert.Contains("WidgetImpl", result);
    }

    [Fact]
    public void FindReachable_FollowsBaseToDerivedEdges()
    {
        // Python-style: base class → derived class
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("BaseClient", hasOps: true),
            Node("SpecializedClient", hasOps: true)
        };

        var edges = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase)
        {
            ["BaseClient"] = ["SpecializedClient"]
        };

        var result = ReachabilityAnalyzer.FindReachable(types, edges, StringComparer.OrdinalIgnoreCase);

        Assert.Contains("BaseClient", result);
        Assert.Contains("SpecializedClient", result);
    }

    [Fact]
    public void FindReachable_TransitiveReachability()
    {
        // A → B → C: C should be reachable from root A
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B"]),
            Node("B", hasOps: false, refs: ["C"]),
            Node("C", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("A", result);
        Assert.Contains("B", result);
        Assert.Contains("C", result);
    }

    #endregion

    #region Comparer Behavior

    [Fact]
    public void FindReachable_CaseInsensitive_MergesNames()
    {
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ChatClient", hasOps: true, refs: ["widgetclient"]),
            Node("WidgetClient", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        // "widgetclient" reference should match "WidgetClient"
        Assert.Contains("WidgetClient", result);
    }

    [Fact]
    public void FindReachable_CaseSensitive_TreatsDifferentCasesAsDistinct()
    {
        // Go-style: "Client" and "client" are different types
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("Client", hasOps: true, refs: ["client"]),
            Node("client", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.Ordinal);

        // Both are unreferenced by OTHER types (Client refs lowercase "client",
        // but lowercase "client" is not the same as "Client" in Ordinal mode)
        Assert.Contains("Client", result);
        Assert.Contains("client", result);
    }

    [Fact]
    public void FindReachable_CaseSensitive_SelfRefExcludesCorrectly()
    {
        // In case-sensitive mode, "A" referencing "A" is still self-ref
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("Reader", hasOps: true, refs: ["Reader"])
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.Ordinal);

        Assert.Contains("Reader", result);
    }

    #endregion

    #region Edge Cases

    [Fact]
    public void FindReachable_EmptyInput_ReturnsEmpty()
    {
        var result = ReachabilityAnalyzer.FindReachable([], EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Empty(result);
    }

    [Fact]
    public void FindReachable_NoOpsTypes_NotReachable()
    {
        // Types without operations and not referencing ops types → no roots → empty
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("Options", hasOps: false),
            Node("Config", hasOps: false)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Empty(result);
    }

    [Fact]
    public void FindReachable_UnreachableTypeNotIncluded()
    {
        // Disconnected type should not be included
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ChatClient", hasOps: true),
            Node("Unrelated", hasOps: false) // no refs to it, no ops
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ChatClient", result);
        Assert.DoesNotContain("Unrelated", result);
    }

    [Fact]
    public void FindReachable_DiamondGraph_AllReachable()
    {
        // Diamond: A → B, A → C, B → D, C → D
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B", "C"]),
            Node("B", hasOps: true, refs: ["D"]),
            Node("C", hasOps: true, refs: ["D"]),
            Node("D", hasOps: true)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Equal(4, result.Count);
    }

    [Fact]
    public void FindReachable_CycleInGraph_DoesNotLoop()
    {
        // A → B → C → A (cycle) — single SCC, source in condensation
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B"]),
            Node("B", hasOps: true, refs: ["C"]),
            Node("C", hasOps: true, refs: ["A"])
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        // {A,B,C} collapse to one SCC which is a source → all reachable
        Assert.Equal(3, result.Count);
    }

    #endregion

    #region Integration: Realistic SDK Scenarios

    [Fact]
    public void FindReachable_TypicalSdkGraph_FindsAllClients()
    {
        // Realistic scenario: ServiceClient → ChatClient, ServiceClient → WidgetClient
        // EmbeddingClient is standalone
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("ServiceClient", hasOps: true, refs: ["ChatClient", "WidgetClient"]),
            Node("ChatClient", hasOps: true),
            Node("WidgetClient", hasOps: true),
            Node("EmbeddingClient", hasOps: true),
            Node("ChatOptions", hasOps: false) // Not a root, not reachable
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("ServiceClient", result);
        Assert.Contains("ChatClient", result);
        Assert.Contains("WidgetClient", result);
        Assert.Contains("EmbeddingClient", result);
        Assert.DoesNotContain("ChatOptions", result);
    }

    [Fact]
    public void FindReachable_DotNetWithInterfacesAndEntryPoints()
    {
        // C#-style: entry point + interface→implementer
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("OpenAIClient", hasOps: true, isEntryPoint: true, refs: ["IChatClient"]),
            Node("IChatClient", hasOps: true, isRootCandidate: false),
            Node("ChatClient", hasOps: true) // implements IChatClient
        };

        var edges = new Dictionary<string, List<string>>(StringComparer.OrdinalIgnoreCase)
        {
            ["IChatClient"] = ["ChatClient"]
        };

        var result = ReachabilityAnalyzer.FindReachable(types, edges, StringComparer.OrdinalIgnoreCase);

        Assert.Equal(3, result.Count);
    }

    [Fact]
    public void FindReachable_GoStructuralTyping()
    {
        // Go-style: structs as root candidates, case-sensitive
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("Client", hasOps: true, refs: ["Reader"]),
            Node("Reader", hasOps: true, isRootCandidate: false), // interface
            Node("BlobReader", hasOps: true) // implements Reader structurally
        };

        var edges = new Dictionary<string, List<string>>(StringComparer.Ordinal)
        {
            ["Reader"] = ["BlobReader"]
        };

        var result = ReachabilityAnalyzer.FindReachable(types, edges, StringComparer.Ordinal);

        Assert.Equal(3, result.Count);
    }

    #endregion

    #region SCC Condensation: Cycle + Separate Roots

    [Fact]
    public void FindReachable_CycleAlongsideUnreferencedRoot_AllReachable()
    {
        // A → B, B → A (cycle) alongside E → D (linear).
        // The old per-node in-degree heuristic would see E as the only
        // unreferenced root and miss the {A,B} cycle entirely.
        // SCC condensation correctly identifies two source SCCs:
        //   SCC1 = {A,B} (cycle, source), SCC2 = {E} (source → D).
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B"]),
            Node("B", hasOps: true, refs: ["A"]),
            Node("D", hasOps: true),
            Node("E", hasOps: true, refs: ["D"])
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Equal(4, result.Count);
        Assert.Contains("A", result);
        Assert.Contains("B", result);
        Assert.Contains("D", result);
        Assert.Contains("E", result);
    }

    [Fact]
    public void FindReachable_CycleWithDownstreamNonSource_OnlySourceSccIsRoot()
    {
        // A → B, B → A (cycle, source SCC), A → C (linear downstream).
        // C has ops but its SCC has in-degree > 0 → not a root.
        // Disconnected D has no ops → not a root.
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B", "C"]),
            Node("B", hasOps: true, refs: ["A"]),
            Node("C", hasOps: true),
            Node("D", hasOps: false)
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("A", result);
        Assert.Contains("B", result);
        Assert.Contains("C", result);
        Assert.DoesNotContain("D", result);
    }

    #endregion

    #region Go-Style Case-Sensitive Type Resolution (Fix #7)

    [Fact]
    public void FindReachable_GoStyleCaseSensitive_DistinctTypes()
    {
        // In Go, "Client" and "client" are completely different types
        // (unexported vs exported). They should never merge.
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            new()
            {
                Name = "Client",
                HasOperations = true,
                ReferencedTypes = new HashSet<string>(StringComparer.Ordinal) { "Helper" }
            },
            new()
            {
                Name = "client",
                HasOperations = true,
                ReferencedTypes = new HashSet<string>(StringComparer.Ordinal) { "helper" }
            },
            new()
            {
                Name = "Helper",
                HasOperations = true,
                ReferencedTypes = new HashSet<string>(StringComparer.Ordinal)
            },
            new()
            {
                Name = "helper",
                HasOperations = true,
                ReferencedTypes = new HashSet<string>(StringComparer.Ordinal)
            }
        };

        var result = ReachabilityAnalyzer.FindReachable(
            types,
            new Dictionary<string, List<string>>(StringComparer.Ordinal),
            StringComparer.Ordinal);

        // All 4 are distinct types: both "Client" and "client" are roots
        // (each is unreferenced by the OTHER — "Client" refs "Helper", not "client")
        Assert.Equal(4, result.Count);
        Assert.Contains("Client", result);
        Assert.Contains("client", result);
        Assert.Contains("Helper", result);
        Assert.Contains("helper", result);
    }

    #endregion

    #region Iterative Tarjan (Stack Safety)

    [Fact]
    public void FindReachable_DeepLinearChain_DoesNotStackOverflow()
    {
        // A linear chain of 5000 types: T0 → T1 → ... → T4999
        // Recursive Tarjan would stack-overflow here; iterative must handle it.
        const int depth = 5000;
        var types = new List<ReachabilityAnalyzer.TypeNode>();
        for (var i = 0; i < depth; i++)
        {
            types.Add(Node($"T{i}", hasOps: i == 0,
                refs: i < depth - 1 ? [$"T{i + 1}"] : null));
        }

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Contains("T0", result);
        Assert.Equal(depth, result.Count);
    }

    [Fact]
    public void FindReachable_LargeSCC_HandledCorrectly()
    {
        // 500 nodes all in one SCC: T0 → T1 → ... → T499 → T0
        const int size = 500;
        var types = new List<ReachabilityAnalyzer.TypeNode>();
        for (var i = 0; i < size; i++)
        {
            types.Add(Node($"T{i}", hasOps: i == 0,
                refs: [$"T{(i + 1) % size}"]));
        }

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Equal(size, result.Count);
    }

    [Fact]
    public void FindReachable_DeepChainWithSCCs_AllReachable()
    {
        // Chain of SCCs: (A↔B) → (C↔D) → E
        var types = new List<ReachabilityAnalyzer.TypeNode>
        {
            Node("A", hasOps: true, refs: ["B", "C"]),
            Node("B", hasOps: false, refs: ["A"]),
            Node("C", hasOps: false, refs: ["D", "E"]),
            Node("D", hasOps: false, refs: ["C"]),
            Node("E", hasOps: false),
        };

        var result = ReachabilityAnalyzer.FindReachable(types, EmptyEdges(), StringComparer.OrdinalIgnoreCase);

        Assert.Equal(5, result.Count);
    }

    #endregion

    #region Helpers

    private static ReachabilityAnalyzer.TypeNode Node(
        string name,
        bool hasOps,
        bool isEntryPoint = false,
        bool isRootCandidate = true,
        string[]? refs = null)
    {
        return new ReachabilityAnalyzer.TypeNode
        {
            Name = name,
            HasOperations = hasOps,
            IsExplicitEntryPoint = isEntryPoint,
            IsRootCandidate = isRootCandidate,
            ReferencedTypes = refs is not null ? [..refs] : []
        };
    }

    private static Dictionary<string, List<string>> EmptyEdges()
        => new(StringComparer.OrdinalIgnoreCase);

    #endregion
}
