// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    ApiIndex,
    NamespaceInfo,
} from "./models.js";
import type { ExtractionContext } from "./context.js";
import { PRIMITIVE_TYPES } from "./context.js";

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
        console.error(`Self-containment: ${sorted.length} type(s) referenced in signatures but not defined: ${sorted.join(", ")}`);
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
 * Walks the type reference graph starting from entry-point types,
 * using pre-computed referencedTypes from compiler type resolution.
 *
 * Uses qualified keys (`<module>/<ns>/<name>`) internally to prevent
 * same-named entities in different modules from colliding.
 * The returned set contains both qualified keys and simple names
 * for backward compatibility with pruning code.
 */
export function computeReachableTypes(api: ApiIndex): Set<string> {
    const allTypeNames = getDefinedTypes(api);

    // Build reference graph from pre-computed referencedTypes fields.
    // These were populated from TypeReferenceCollector's compiler-resolved refs.
    // Keys are qualified; values are simple names filtered against allTypeNames.
    const references = new Map<string, Set<string>>();

    function addEntityRef(qualifiedKey: string, referencedTypes: string[] | undefined): void {
        const refs = (referencedTypes ?? []).filter(t => allTypeNames.has(t));
        if (refs.length) {
            const existing = references.get(qualifiedKey);
            if (existing) { for (const r of refs) existing.add(r); }
            else { references.set(qualifiedKey, new Set(refs)); }
        }
    }

    // Map from simple name → list of qualified keys, for BFS edge traversal
    const nameToQualifiedKeys = new Map<string, string[]>();
    function registerName(simpleName: string, qualifiedKey: string): void {
        let list = nameToQualifiedKeys.get(simpleName);
        if (!list) { list = []; nameToQualifiedKeys.set(simpleName, list); }
        list.push(qualifiedKey);
    }

    function buildRefsFromContainer(source: {
        classes?: { name: string; referencedTypes?: string[] }[];
        interfaces?: { name: string; referencedTypes?: string[] }[];
        types?: { name: string; referencedTypes?: string[] }[];
        functions?: { name?: string; referencedTypes?: string[] }[];
        namespaces?: NamespaceInfo[];
    }, moduleName: string, nsPath?: string): void {
        for (const cls of source.classes || []) {
            const qk = makeQualifiedKey(moduleName, cls.name, nsPath);
            addEntityRef(qk, cls.referencedTypes);
            registerName(cls.name, qk);
        }
        for (const iface of source.interfaces || []) {
            const qk = makeQualifiedKey(moduleName, iface.name, nsPath);
            addEntityRef(qk, iface.referencedTypes);
            registerName(iface.name, qk);
        }
        for (const t of source.types || []) {
            const qk = makeQualifiedKey(moduleName, t.name, nsPath);
            addEntityRef(qk, t.referencedTypes);
            registerName(t.name, qk);
        }
        for (const fn of source.functions || []) {
            if (fn.name) {
                const qk = makeQualifiedKey(moduleName, fn.name, nsPath);
                addEntityRef(qk, fn.referencedTypes);
                registerName(fn.name, qk);
            }
        }
        for (const ns of source.namespaces || []) {
            const childNsPath = nsPath ? `${nsPath}.${ns.name}` : ns.name;
            registerName(ns.name, makeQualifiedKey(moduleName, ns.name, nsPath));
            buildRefsFromContainer(ns, moduleName, childNsPath);
        }
    }

    for (const mod of api.modules) {
        buildRefsFromContainer(mod, mod.name);
    }

    // BFS from entry points — track both qualified keys and simple names
    const reachableQualified = new Set<string>();
    const reachable = new Set<string>();
    const queue: string[] = [];

    function seedEntity(name: string, moduleName: string, nsPath?: string): void {
        const qk = makeQualifiedKey(moduleName, name, nsPath);
        if (!reachableQualified.has(qk)) {
            reachableQualified.add(qk);
            reachable.add(name);
            queue.push(name);
        }
    }

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            if (cls.entryPoint) seedEntity(cls.name, mod.name);
        }
        for (const iface of mod.interfaces || []) {
            if (iface.entryPoint) seedEntity(iface.name, mod.name);
        }
        for (const en of mod.enums || []) {
            if (en.entryPoint) seedEntity(en.name, mod.name);
        }
        for (const t of mod.types || []) {
            if (t.entryPoint) seedEntity(t.name, mod.name);
        }
        for (const fn of mod.functions || []) {
            if (fn.entryPoint && fn.name) seedEntity(fn.name, mod.name);
        }
        // Only seed namespaces that are marked as entry points
        seedNamespaces(mod.namespaces, reachable, reachableQualified, queue, mod.name);
    }

    let qi = 0;
    while (qi < queue.length) {
        const current = queue[qi++];
        // Look up all qualified keys for this simple name
        const qkeys = nameToQualifiedKeys.get(current);
        if (qkeys) {
            for (const qk of qkeys) {
                const refs = references.get(qk);
                if (refs) {
                    for (const ref of refs) {
                        if (!reachable.has(ref)) {
                            reachable.add(ref);
                            queue.push(ref);
                            // Mark all qualified instances as reachable
                            const refQks = nameToQualifiedKeys.get(ref);
                            if (refQks) { for (const rqk of refQks) reachableQualified.add(rqk); }
                        }
                    }
                }
            }
        }
    }

    return reachable;
}

function seedNamespaces(
    namespaces: NamespaceInfo[] | undefined,
    reachable: Set<string>,
    reachableQualified: Set<string>,
    queue: string[],
    moduleName: string,
    nsPath?: string,
    parentIsEntryPoint?: boolean,
): void {
    for (const ns of namespaces || []) {
        // Only seed namespaces that are entry points or descendants of entry point namespaces
        if (!ns.entryPoint && !parentIsEntryPoint) continue;
        const qk = makeQualifiedKey(moduleName, ns.name, nsPath);
        if (!reachableQualified.has(qk)) {
            reachableQualified.add(qk);
            reachable.add(ns.name);
            queue.push(ns.name);
        }
        for (const c of ns.classes || []) { reachable.add(c.name); queue.push(c.name); }
        for (const i of ns.interfaces || []) { reachable.add(i.name); queue.push(i.name); }
        for (const e of ns.enums || []) { reachable.add(e.name); queue.push(e.name); }
        for (const t of ns.types || []) { reachable.add(t.name); queue.push(t.name); }
        for (const f of ns.functions || []) { if (f.name) { reachable.add(f.name); queue.push(f.name); } }
        const childNsPath = nsPath ? `${nsPath}.${ns.name}` : ns.name;
        // Children of an entry-point namespace are also entry-point accessible
        seedNamespaces(ns.namespaces, reachable, reachableQualified, queue, moduleName, childNsPath, true);
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
