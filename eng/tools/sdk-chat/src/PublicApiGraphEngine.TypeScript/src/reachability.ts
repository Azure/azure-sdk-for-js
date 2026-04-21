// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    ApiIndex,
    NamespaceInfo,
} from "./models.js";
import type { ExtractionContext } from "./context.js";
import { PRIMITIVE_TYPES } from "./context.js";
import { emitDiagnostic } from "./diagnostics.js";

// ============================================================================
// Self-Containment Validation
// ============================================================================

/**
 * Validates that the API index is self-contained: every type name referenced
 * in method signatures, property types, extends/implements clauses, and type
 * alias bodies is either defined in the output or is a known builtin/node type.
 *
 * Emits SELF_CONTAINMENT diagnostics to stderr for each dangling reference.
 */
export function validateSelfContainment(api: ApiIndex, ctx: ExtractionContext): void {
    const { defined, referenced, declaredTypeParams } = collectDefinedAndReferenced(api);
    const dangling: string[] = [];
    for (const name of referenced) {
        if (defined.has(name)) continue;
        if (PRIMITIVE_TYPES.has(name)) continue;
        if (ctx.isBuiltinType(name)) continue;
        if (declaredTypeParams.has(name)) continue;
        // Exempt known Node.js global types and NodeJS.* prefixed types
        if (NODE_GLOBAL_TYPES.has(name)) continue;
        if (name.startsWith("NodeJS.")) continue;
        dangling.push(name);
    }

    if (dangling.length > 0) {
        const sorted = dangling.sort();
        emitDiagnostic({
            code: "SELF_CONTAINMENT",
            message: `Self-containment: ${sorted.length} type(s) referenced in signatures but not defined: ${sorted.join(", ")}`,
            severity: "warning",
        });
    }
}

/**
 * Known Node.js global type names that come from @types/node and may appear
 * in API signatures without being explicitly defined in the output.
 */
const NODE_GLOBAL_TYPES = new Set([
    "Buffer", "NodeJS", "FsReadStream", "KeyObject", "Readable", "Writable",
    "Stream", "EventEmitter", "IncomingMessage", "ServerResponse",
]);

// Types available from BOTH DOM lib and @types/node globals.
// When we have exclusive Node.js types (Buffer, NodeJS.ReadableStream, etc.),
// the output will include `/// <reference types="node" />` which already provides
// these types — so they should be listed under "node" instead of "dom".
const DOM_NODE_SHARED_TYPES = new Set([
    "AbortController", "AbortSignal",
    "Blob", "File", "FormData", "Headers", "Request", "Response",
    "ReadableStream", "WritableStream",
    "URL", "URLSearchParams",
    "TextEncoder", "TextDecoder",
    "Event", "EventTarget",
]);

/**
 * Computes the set of ambient types needed by the API surface.
 * These are type names that appear in signatures but are NOT defined in the
 * output — they must come from the runtime environment (DOM lib, ES lib, or Node.js).
 *
 * Classification:
 * - Types tracked as builtins during extraction (ctx.referencedBuiltins) that are
 *   unresolved → classified by their lib source (dom/es) using symbol declaration paths
 * - Remaining unresolved types matching known Node.js globals → "node"
 * - Other unresolved types are ignored (they're dangling references, not ambient types)
 */
export function computeAmbientTypes(
    api: ApiIndex, ctx: ExtractionContext,
): Record<string, string[]> {
    const { defined, referenced, declaredTypeParams } = collectDefinedAndReferenced(api, true);

    // Compute the set of unresolved type names — referenced but not self-contained
    const unresolved = new Set<string>();
    for (const name of referenced) {
        if (defined.has(name)) continue;
        if (PRIMITIVE_TYPES.has(name)) continue;
        if (declaredTypeParams.has(name)) continue;
        unresolved.add(name);
    }

    if (unresolved.size === 0) return {};

    const result: Record<string, Set<string>> = {};

    function addToCategory(category: string, name: string): void {
        (result[category] ??= new Set()).add(name);
    }

    // Build a map from namespace prefix to qualified references (e.g., "NodeJS" → ["NodeJS.ReadableStream"])
    // from compiler-resolved qualified type refs, so we can show full names instead of bare prefixes.
    const qualifiedByPrefix = new Map<string, string[]>();
    for (const qr of api.qualifiedReferencedTypes ?? []) {
        const dot = qr.indexOf(".");
        if (dot > 0) {
            const prefix = qr.substring(0, dot);
            let list = qualifiedByPrefix.get(prefix);
            if (!list) { list = []; qualifiedByPrefix.set(prefix, list); }
            list.push(qr);
        }
    }

    // 1. Classify builtins (DOM/ES) — use the category tracked during extraction
    //    (which was determined from symbol declaration file paths)
    for (const [category, names] of ctx.referencedBuiltins) {
        for (const name of names) {
            if (unresolved.has(name)) {
                addToCategory(category, name);
                unresolved.delete(name);
            }
        }
    }

    // 2. Remaining unresolved types: check if they're known Node.js globals
    //    For namespace prefixes (e.g., "NodeJS"), expand to full qualified names
    for (const name of unresolved) {
        if (NODE_GLOBAL_TYPES.has(name)) {
            const qualifiedNames = qualifiedByPrefix.get(name);
            if (qualifiedNames && qualifiedNames.length > 0) {
                for (const qn of qualifiedNames) addToCategory("node", qn);
            } else {
                addToCategory("node", name);
            }
        }
    }

    // 3. If we have exclusive Node.js types, move shared DOM/Node types from "dom" to "node".
    //    `/// <reference types="node" />` already provides these types, so listing them
    //    under DOM would be redundant.
    if (result["node"]?.size) {
        const dom = result["dom"];
        if (dom) {
            for (const name of [...dom]) {
                if (DOM_NODE_SHARED_TYPES.has(name)) {
                    dom.delete(name);
                    addToCategory("node", name);
                }
            }
            if (dom.size === 0) delete result["dom"];
        }
    }

    // Convert Sets to sorted arrays
    const out: Record<string, string[]> = {};
    for (const [cat, names] of Object.entries(result).sort(([a], [b]) => a.localeCompare(b))) {
        if (names.size > 0) out[cat] = [...names].sort();
    }
    return out;
}

// ============================================================================
// Shared helpers for self-containment analysis
// ============================================================================

/**
 * Collects all defined type names, all referenced type names, and all
 * declared generic type parameters from the API index.
 *
 * Uses pre-computed `referencedTypes` arrays (populated from compiler type
 * resolution during extraction) instead of regex scanning of signature strings.
 *
 * @param includeDependencyReferences - When true, also collects referenced types
 *   from dependency entities (needed for ambient type computation).
 *   When false (default), only collects from main module entities (for self-containment).
 */
function collectDefinedAndReferenced(api: ApiIndex, includeDependencyReferences = false): {
    defined: Set<string>;
    referenced: Set<string>;
    declaredTypeParams: Set<string>;
} {
    // Collect all defined type names (from main modules + dependencies)
    const defined = new Set<string>();
    for (const mod of api.modules) {
        for (const c of mod.classes || []) defined.add(c.name);
        for (const i of mod.interfaces || []) defined.add(i.name);
        for (const e of mod.enums || []) defined.add(e.name);
        for (const t of mod.types || []) defined.add(t.name);
        for (const f of mod.functions || []) { if (f.name) defined.add(f.name); }
        addNamespaceDefinedTypes(mod.namespaces, defined);
    }
    if (api.dependencies) {
        for (const dep of api.dependencies) {
            for (const c of dep.classes || []) defined.add(c.name);
            for (const i of dep.interfaces || []) defined.add(i.name);
            for (const e of dep.enums || []) defined.add(e.name);
            for (const t of dep.types || []) defined.add(t.name);
            for (const f of dep.functions || []) { if (f.name) defined.add(f.name); }
            addNamespaceDefinedTypes(dep.namespaces, defined);
        }
    }

    // Collect declared generic type parameter names to exclude from dangling check.
    // Uses pre-extracted declaredTypeParamNames from AST (no string parsing needed).
    const declaredTypeParams = new Set<string>();

    // Collect all referenced type names from pre-computed referencedTypes arrays
    const referenced = new Set<string>();

    function collectEntityRefs(source: {
        classes?: { referencedTypes?: string[]; declaredTypeParamNames?: string[] }[];
        interfaces?: { referencedTypes?: string[]; declaredTypeParamNames?: string[] }[];
        types?: { referencedTypes?: string[]; declaredTypeParamNames?: string[] }[];
        functions?: { referencedTypes?: string[]; declaredTypeParamNames?: string[] }[];
        namespaces?: NamespaceInfo[];
    }): void {
        for (const c of source.classes || []) {
            for (const name of c.declaredTypeParamNames || []) declaredTypeParams.add(name);
            for (const name of c.referencedTypes || []) referenced.add(name);
        }
        for (const i of source.interfaces || []) {
            for (const name of i.declaredTypeParamNames || []) declaredTypeParams.add(name);
            for (const name of i.referencedTypes || []) referenced.add(name);
        }
        for (const t of source.types || []) {
            for (const name of t.declaredTypeParamNames || []) declaredTypeParams.add(name);
            for (const name of t.referencedTypes || []) referenced.add(name);
        }
        for (const f of source.functions || []) {
            for (const name of f.declaredTypeParamNames || []) declaredTypeParams.add(name);
            for (const name of f.referencedTypes || []) referenced.add(name);
        }
        for (const ns of source.namespaces || []) {
            collectEntityRefs(ns);
        }
    }

    for (const mod of api.modules) {
        collectEntityRefs(mod);
    }

    if (includeDependencyReferences && api.dependencies) {
        for (const dep of api.dependencies) {
            collectEntityRefs(dep);
        }
    }

    return { defined, referenced, declaredTypeParams };
}

// ============================================================================
// Tarjan's SCC Algorithm
// ============================================================================

/**
 * Finds all strongly connected components (SCCs) in a directed graph using
 * Tarjan's algorithm. Each SCC is a maximal set of vertices where every vertex
 * is reachable from every other vertex in the set.
 *
 * This is used to condense the type reference graph: mutually-recursive types
 * (A → B → A) form a single SCC node in the condensed DAG. If any member of
 * an SCC is reachable from an entry point, all members are reachable.
 *
 * @param graph - Adjacency list: node → set of successor nodes.
 * @returns Array of SCCs, each an array of node keys. SCCs are returned in
 *          reverse topological order (dependencies before dependents).
 */
export function tarjanSCC(graph: Map<string, Set<string>>): string[][] {
    let index = 0;
    const stack: string[] = [];
    const onStack = new Set<string>();
    const indices = new Map<string, number>();
    const lowlinks = new Map<string, number>();
    const sccs: string[][] = [];

    function strongConnect(v: string): void {
        indices.set(v, index);
        lowlinks.set(v, index);
        index++;
        stack.push(v);
        onStack.add(v);

        for (const w of graph.get(v) ?? []) {
            if (!indices.has(w)) {
                strongConnect(w);
                lowlinks.set(v, Math.min(lowlinks.get(v)!, lowlinks.get(w)!));
            } else if (onStack.has(w)) {
                lowlinks.set(v, Math.min(lowlinks.get(v)!, indices.get(w)!));
            }
        }

        if (lowlinks.get(v) === indices.get(v)) {
            const scc: string[] = [];
            let w: string;
            do {
                w = stack.pop()!;
                onStack.delete(w);
                scc.push(w);
            } while (w !== v);
            sccs.push(scc);
        }
    }

    for (const v of graph.keys()) {
        if (!indices.has(v)) strongConnect(v);
    }
    return sccs;
}

// ============================================================================
// Transitive Dependency Resolution
// ============================================================================

/**
 * Gets all type names defined in the API.
 */
export function getDefinedTypes(api: ApiIndex): Set<string> {
    const defined = new Set<string>();
    for (const mod of api.modules) {
        for (const cls of mod.classes || []) defined.add(cls.name);
        for (const iface of mod.interfaces || []) defined.add(iface.name);
        for (const en of mod.enums || []) defined.add(en.name);
        for (const t of mod.types || []) defined.add(t.name);
        for (const fn of mod.functions || []) { if (fn.name) defined.add(fn.name); }
        addNamespaceDefinedTypes(mod.namespaces, defined);
    }
    return defined;
}

/**
 * Builds a qualified key for a graph node: `<moduleName>/<namespacePath>/<entityName>`.
 * Top-level entities use `<moduleName>/<entityName>`.
 */
export function makeQualifiedKey(moduleName: string, entityName: string, namespacePath?: string): string {
    return namespacePath ? `${moduleName}/${namespacePath}/${entityName}` : `${moduleName}/${entityName}`;
}

/**
 * Computes the set of type names reachable from entry points.
 *
 * Algorithm:
 * 1. Build a directed graph where nodes are qualified keys (`module/entity`)
 *    and edges represent type references (from referencedTypes arrays).
 * 2. Run Tarjan's SCC algorithm to find strongly connected components —
 *    mutually-recursive types (e.g., A → B → A) collapse into single nodes.
 * 3. Build a condensed DAG of SCC nodes and BFS from entry-point SCCs.
 * 4. If any type in an SCC is reachable, ALL types in that SCC are reachable.
 *
 * Uses qualified keys (`module/entity` or `module/nsPath/entity`) throughout
 * to prevent same-named entities in different modules from colliding.
 * The returned set contains these qualified keys.
 */
export function computeReachableTypes(api: ApiIndex): Set<string> {
    const allTypeNames = getDefinedTypes(api);

    // Map from simple name → list of qualified keys, for resolving reference edges
    const nameToQualifiedKeys = new Map<string, string[]>();
    function registerName(simpleName: string, qualifiedKey: string): void {
        let list = nameToQualifiedKeys.get(simpleName);
        if (!list) { list = []; nameToQualifiedKeys.set(simpleName, list); }
        list.push(qualifiedKey);
    }

    // Collect raw references (qualified key → simple ref names) in first pass
    const rawRefs = new Map<string, string[]>();
    // Map from qualified key → module name (avoids parsing module from key with indexOf)
    const qkToModule = new Map<string, string>();

    function collectRefsFromContainer(source: {
        classes?: { name: string; referencedTypes?: string[] }[];
        interfaces?: { name: string; referencedTypes?: string[] }[];
        enums?: { name: string; referencedTypes?: string[] }[];
        types?: { name: string; referencedTypes?: string[] }[];
        functions?: { name?: string; referencedTypes?: string[] }[];
        namespaces?: NamespaceInfo[];
    }, moduleName: string, nsPath?: string): void {
        for (const cls of source.classes || []) {
            const qk = makeQualifiedKey(moduleName, cls.name, nsPath);
            registerName(cls.name, qk);
            qkToModule.set(qk, moduleName);
            const refs = (cls.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) rawRefs.set(qk, refs);
        }
        for (const iface of source.interfaces || []) {
            const qk = makeQualifiedKey(moduleName, iface.name, nsPath);
            registerName(iface.name, qk);
            qkToModule.set(qk, moduleName);
            const refs = (iface.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) rawRefs.set(qk, refs);
        }
        for (const en of source.enums || []) {
            const qk = makeQualifiedKey(moduleName, en.name, nsPath);
            registerName(en.name, qk);
            qkToModule.set(qk, moduleName);
            const refs = (en.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) rawRefs.set(qk, refs);
        }
        for (const t of source.types || []) {
            const qk = makeQualifiedKey(moduleName, t.name, nsPath);
            registerName(t.name, qk);
            qkToModule.set(qk, moduleName);
            const refs = (t.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) rawRefs.set(qk, refs);
        }
        for (const fn of source.functions || []) {
            if (fn.name) {
                const qk = makeQualifiedKey(moduleName, fn.name, nsPath);
                registerName(fn.name, qk);
                qkToModule.set(qk, moduleName);
                const refs = (fn.referencedTypes ?? []).filter(t => allTypeNames.has(t));
                if (refs.length) rawRefs.set(qk, refs);
            }
        }
        for (const ns of source.namespaces || []) {
            const childNsPath = nsPath ? `${nsPath}.${ns.name}` : ns.name;
            const nsQk = makeQualifiedKey(moduleName, ns.name, nsPath);
            registerName(ns.name, nsQk);
            qkToModule.set(nsQk, moduleName);
            collectRefsFromContainer(ns, moduleName, childNsPath);
        }
    }

    for (const mod of api.modules) {
        collectRefsFromContainer(mod, mod.name);
    }

    // Build qualified-key graph: resolve simple ref names → qualified keys
    const graph = new Map<string, Set<string>>();
    // Ensure every registered node exists in the graph (even with no edges)
    for (const qkeys of nameToQualifiedKeys.values()) {
        for (const qk of qkeys) {
            if (!graph.has(qk)) graph.set(qk, new Set());
        }
    }
    for (const [qk, refs] of rawRefs) {
        const edges = graph.get(qk) ?? new Set();
        // Look up source module from the registration map
        const sourceModule = qkToModule.get(qk) ?? "";

        for (const refName of refs) {
            const targetQks = nameToQualifiedKeys.get(refName);
            if (targetQks) {
                // Prefer same-module targets to avoid over-retention from name collisions
                const sameModule = targetQks.filter(tqk => tqk.startsWith(sourceModule + "/"));
                const targets = sameModule.length > 0 ? sameModule : targetQks;
                for (const tqk of targets) edges.add(tqk);
            }
        }
        graph.set(qk, edges);
    }

    // Run Tarjan's SCC algorithm
    const sccs = tarjanSCC(graph);

    // Build node → SCC index mapping, and condensed DAG
    const nodeToSccIndex = new Map<string, number>();
    for (let i = 0; i < sccs.length; i++) {
        for (const node of sccs[i]) nodeToSccIndex.set(node, i);
    }

    // Build condensed DAG: SCC index → set of successor SCC indices
    const condensed = new Map<number, Set<number>>();
    for (let i = 0; i < sccs.length; i++) condensed.set(i, new Set());
    for (const [src, dsts] of graph) {
        const srcScc = nodeToSccIndex.get(src)!;
        for (const dst of dsts) {
            const dstScc = nodeToSccIndex.get(dst)!;
            if (srcScc !== dstScc) condensed.get(srcScc)!.add(dstScc);
        }
    }

    // Seed entry-point SCCs
    const reachableSccIndices = new Set<number>();
    const sccQueue: number[] = [];

    function seedScc(qk: string): void {
        const sccIdx = nodeToSccIndex.get(qk);
        if (sccIdx !== undefined && !reachableSccIndices.has(sccIdx)) {
            reachableSccIndices.add(sccIdx);
            sccQueue.push(sccIdx);
        }
    }

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            if (cls.entryPoint) seedScc(makeQualifiedKey(mod.name, cls.name));
        }
        for (const iface of mod.interfaces || []) {
            if (iface.entryPoint) seedScc(makeQualifiedKey(mod.name, iface.name));
        }
        for (const en of mod.enums || []) {
            if (en.entryPoint) seedScc(makeQualifiedKey(mod.name, en.name));
        }
        for (const t of mod.types || []) {
            if (t.entryPoint) seedScc(makeQualifiedKey(mod.name, t.name));
        }
        for (const fn of mod.functions || []) {
            if (fn.entryPoint && fn.name) seedScc(makeQualifiedKey(mod.name, fn.name));
        }
        seedNamespaceSccs(mod.namespaces, seedScc, mod.name);
    }

    // BFS on condensed DAG
    let qi = 0;
    while (qi < sccQueue.length) {
        const currentScc = sccQueue[qi++];
        for (const neighborScc of condensed.get(currentScc) ?? []) {
            if (!reachableSccIndices.has(neighborScc)) {
                reachableSccIndices.add(neighborScc);
                sccQueue.push(neighborScc);
            }
        }
    }

    // Collect qualified keys from all reachable SCCs
    const reachable = new Set<string>();
    for (const sccIdx of reachableSccIndices) {
        for (const qk of sccs[sccIdx]) {
            reachable.add(qk);
        }
    }

    return reachable;
}

/**
 * Seeds SCCs for entry-point namespaces and all their members.
 * When a namespace is an entry point (or a descendant of one), all its
 * members are seeded as reachable entry points.
 */
function seedNamespaceSccs(
    namespaces: NamespaceInfo[] | undefined,
    seedScc: (qk: string) => void,
    moduleName: string,
    nsPath?: string,
    parentIsEntryPoint?: boolean,
): void {
    for (const ns of namespaces || []) {
        if (!ns.entryPoint && !parentIsEntryPoint) continue;
        const qk = makeQualifiedKey(moduleName, ns.name, nsPath);
        seedScc(qk);
        const childNsPath = nsPath ? `${nsPath}.${ns.name}` : ns.name;
        for (const c of ns.classes || []) seedScc(makeQualifiedKey(moduleName, c.name, childNsPath));
        for (const i of ns.interfaces || []) seedScc(makeQualifiedKey(moduleName, i.name, childNsPath));
        for (const e of ns.enums || []) seedScc(makeQualifiedKey(moduleName, e.name, childNsPath));
        for (const t of ns.types || []) seedScc(makeQualifiedKey(moduleName, t.name, childNsPath));
        for (const f of ns.functions || []) { if (f.name) seedScc(makeQualifiedKey(moduleName, f.name, childNsPath)); }
        seedNamespaceSccs(ns.namespaces, seedScc, moduleName, childNsPath, true);
    }
}

function addNamespaceDefinedTypes(namespaces: NamespaceInfo[] | undefined, defined: Set<string>): void {
    if (!namespaces) return;
    for (const ns of namespaces) {
        defined.add(ns.name);
        for (const c of ns.classes || []) defined.add(c.name);
        for (const i of ns.interfaces || []) defined.add(i.name);
        for (const e of ns.enums || []) defined.add(e.name);
        for (const t of ns.types || []) defined.add(t.name);
        for (const f of ns.functions || []) { if (f.name) defined.add(f.name); }
        addNamespaceDefinedTypes(ns.namespaces, defined);
    }
}
