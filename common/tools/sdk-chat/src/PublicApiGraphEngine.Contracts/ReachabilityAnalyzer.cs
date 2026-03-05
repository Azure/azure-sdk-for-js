// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

namespace PublicApiGraphEngine.Contracts;

/// <summary>
/// Generic reachability analysis for SDK type graphs.
/// Finds the set of types reachable from root client types via BFS,
/// following type references and additional edges (e.g., interface→implementer
/// or base→derived).
/// </summary>
public static class ReachabilityAnalyzer
{
    /// <summary>
    /// Describes a type node in the API graph for reachability analysis.
    /// </summary>
    public sealed record TypeNode
    {
        /// <summary>Type name (already normalized — e.g., generic suffix stripped).</summary>
        public required string Name { get; init; }

        /// <summary>Whether this type has methods/operations.</summary>
        public required bool HasOperations { get; init; }

        /// <summary>
        /// If true, this type is always treated as a root regardless of
        /// whether other types reference it (e.g., SDK entry-point annotation).
        /// </summary>
        public bool IsExplicitEntryPoint { get; init; }

        /// <summary>
        /// Whether this type can be selected as a root. Set to false for
        /// interfaces/abstract types that should only be reached transitively.
        /// </summary>
        public bool IsRootCandidate { get; init; } = true;

        /// <summary>Names of types referenced by this type's signatures/members.</summary>
        public required HashSet<string> ReferencedTypes { get; init; }
    }

    /// <summary>
    /// Finds all type names reachable from root types identified via SCC condensation.
    /// <para>
    /// Root detection uses Tarjan's algorithm to compute strongly connected components,
    /// then builds the condensation DAG. Source SCCs (in-degree 0 in the condensation)
    /// that contain root candidates with operations (or referencing operations) provide
    /// root types. Edges from SCCs with no root candidates (e.g., interface-only SCCs)
    /// are ignored in the condensation so they don't block downstream client SCCs from
    /// being sources. Explicit entry points are always roots regardless of graph position.
    /// </para>
    /// <para>
    /// BFS traversal follows type references and any additional edges (e.g.,
    /// interface→implementer mappings or base→derived inheritance).
    /// </para>
    /// </summary>
    /// <param name="types">All types in the API surface.</param>
    /// <param name="additionalEdges">
    /// Extra BFS edges keyed by source type name (e.g., interface→implementer names,
    /// or base class→derived class names). May be empty but not null.
    /// </param>
    /// <param name="comparer">
    /// String comparer for type name comparisons. Use <see cref="StringComparer.Ordinal"/>
    /// for case-sensitive languages (Go) and <see cref="StringComparer.OrdinalIgnoreCase"/>
    /// for case-insensitive languages (C#, Python, TypeScript, Java).
    /// </param>
    /// <returns>Set of reachable type names using the provided comparer.</returns>
    public static HashSet<string> FindReachable(
        IReadOnlyList<TypeNode> types,
        IReadOnlyDictionary<string, List<string>> additionalEdges,
        StringComparer comparer)
    {
        if (types.Count is 0)
            return new HashSet<string>(comparer);

        // Index types by name
        var typesByName = new Dictionary<string, TypeNode>(comparer);
        foreach (var t in types)
            typesByName[t.Name] = t;

        // Build adjacency list (only edges to types in our graph, excluding self-refs)
        var adj = new Dictionary<string, List<string>>(comparer);
        foreach (var t in types)
        {
            List<string> neighbors = [];
            foreach (var r in t.ReferencedTypes)
            {
                if (typesByName.ContainsKey(r) && !comparer.Equals(r, t.Name))
                    neighbors.Add(r);
            }

            adj[t.Name] = neighbors;
        }

        // --- Phase 1: Tarjan's SCC ---
        List<List<string>> sccs = [];
        var indices = new Dictionary<string, int>(comparer);
        var lowlinks = new Dictionary<string, int>(comparer);
        var onStack = new HashSet<string>(comparer);
        var stack = new Stack<string>();
        var nextIndex = 0;

        foreach (var t in types)
        {
            if (!indices.ContainsKey(t.Name))
                TarjanScc(t.Name, adj, indices, lowlinks, onStack, stack, ref nextIndex, sccs, comparer);
        }

        // Map type → SCC index
        var typeToScc = new Dictionary<string, int>(comparer);
        for (var i = 0; i < sccs.Count; i++)
        {
            foreach (var name in sccs[i])
                typeToScc[name] = i;
        }

        // Pre-compute which SCCs contain at least one root candidate.
        // Edges from non-candidate SCCs (e.g., interface-only) are ignored in
        // the condensation so they don't block downstream client SCCs from being sources.
        var sccHasRootCandidate = new bool[sccs.Count];
        for (var i = 0; i < sccs.Count; i++)
        {
            foreach (var name in sccs[i])
            {
                if (typesByName.TryGetValue(name, out var t) && t.IsRootCandidate)
                {
                    sccHasRootCandidate[i] = true;
                    break;
                }
            }
        }

        // --- Phase 2: Condensation DAG — find source SCCs (in-degree 0) ---
        var sccHasIncoming = new bool[sccs.Count];

        foreach (var t in types)
        {
            var srcScc = typeToScc[t.Name];
            if (!sccHasRootCandidate[srcScc])
                continue;

            foreach (var target in adj[t.Name])
            {
                var dstScc = typeToScc[target];
                if (srcScc != dstScc)
                    sccHasIncoming[dstScc] = true;
            }
        }

        // --- Phase 3: Select roots ---
        var operationTypes = new HashSet<string>(comparer);
        foreach (var t in types)
        {
            if (t.HasOperations)
                operationTypes.Add(t.Name);
        }

        List<string> roots = [];

        // Explicit entry points are always roots
        foreach (var t in types)
        {
            if (t.IsExplicitEntryPoint)
                roots.Add(t.Name);
        }

        // Source SCCs containing relevant root candidates
        for (var i = 0; i < sccs.Count; i++)
        {
            if (sccHasIncoming[i])
                continue;

            // Check if this source SCC has root candidates with operations or referencing operations
            var sccIsRelevant = false;
            foreach (var name in sccs[i])
            {
                if (!typesByName.TryGetValue(name, out var t) || !t.IsRootCandidate || t.IsExplicitEntryPoint)
                    continue;

                if (t.HasOperations || t.ReferencedTypes.Overlaps(operationTypes))
                {
                    sccIsRelevant = true;
                    break;
                }
            }

            if (!sccIsRelevant)
                continue;

            foreach (var name in sccs[i])
            {
                if (typesByName.TryGetValue(name, out var t) && t.IsRootCandidate && !t.IsExplicitEntryPoint)
                    roots.Add(name);
            }
        }

        // --- Phase 4: BFS from roots ---
        var reachable = new HashSet<string>(comparer);
        var queue = new Queue<string>();

        foreach (var root in roots)
        {
            if (reachable.Add(root))
                queue.Enqueue(root);
        }

        while (queue.Count > 0)
        {
            var current = queue.Dequeue();

            if (typesByName.TryGetValue(current, out var node))
            {
                foreach (var target in node.ReferencedTypes)
                {
                    if (reachable.Add(target))
                        queue.Enqueue(target);
                }
            }

            if (additionalEdges.TryGetValue(current, out var edges))
            {
                foreach (var edge in edges)
                {
                    if (reachable.Add(edge))
                        queue.Enqueue(edge);
                }
            }
        }

        return reachable;
    }

    /// <summary>
    /// Tarjan's strongly connected components algorithm (iterative).
    /// </summary>
    private static void TarjanScc(
        string startNode,
        Dictionary<string, List<string>> adj,
        Dictionary<string, int> indices,
        Dictionary<string, int> lowlinks,
        HashSet<string> onStack,
        Stack<string> stack,
        ref int nextIndex,
        List<List<string>> sccs,
        StringComparer comparer)
    {
        // Each frame represents a node being processed and the position within its neighbor list.
        // This mirrors the recursive call stack: (node, neighborIndex).
        var callStack = new Stack<(string Node, int NeighborIndex)>();

        // Initialize the start node
        indices[startNode] = nextIndex;
        lowlinks[startNode] = nextIndex;
        nextIndex++;
        stack.Push(startNode);
        onStack.Add(startNode);
        callStack.Push((startNode, 0));

        while (callStack.Count > 0)
        {
            var (v, ni) = callStack.Pop();
            var neighbors = adj.TryGetValue(v, out var n) ? n : null;
            var neighborCount = neighbors?.Count ?? 0;
            var advanced = false;

            for (var i = ni; i < neighborCount; i++)
            {
                var w = neighbors![i];
                if (!indices.TryGetValue(w, out var wIndex))
                {
                    // "Recurse" into w: push current frame (resuming at i+1), then push w
                    callStack.Push((v, i + 1));

                    indices[w] = nextIndex;
                    lowlinks[w] = nextIndex;
                    nextIndex++;
                    stack.Push(w);
                    onStack.Add(w);
                    callStack.Push((w, 0));
                    advanced = true;
                    break;
                }
                else if (onStack.Contains(w))
                {
                    lowlinks[v] = Math.Min(lowlinks[v], wIndex);
                }
            }

            if (advanced)
                continue;

            // All neighbors processed — equivalent to returning from recursive call
            if (lowlinks[v] == indices[v])
            {
                List<string> scc = [];
                string w;
                do
                {
                    w = stack.Pop();
                    onStack.Remove(w);
                    scc.Add(w);
                } while (!comparer.Equals(w, v));

                sccs.Add(scc);
            }

            // Propagate lowlink to parent (if any)
            if (callStack.Count > 0)
            {
                var parent = callStack.Peek();
                lowlinks[parent.Node] = Math.Min(lowlinks[parent.Node], lowlinks[v]);
            }
        }
    }
}
