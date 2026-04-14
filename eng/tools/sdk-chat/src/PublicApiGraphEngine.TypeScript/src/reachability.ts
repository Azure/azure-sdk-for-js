// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    ApiIndex,
    MethodInfo,
    PropertyInfo,
    IndexSignatureInfo,
} from "./models.js";
import type { ExtractionContext } from "./context.js";
import { PRIMITIVE_TYPES } from "./context.js";

// ============================================================================
// Self-Containment Validation
// ============================================================================

/**
 * Tokenizes type strings to extract type-position identifiers.
 * Skips keywords, primitives, literals, and punctuation to yield only
 * names that must be resolvable in the output.
 */
const TYPE_TOKEN_RE = /\b([A-Z][A-Za-z0-9_$]*)\b/g;
const TYPE_KEYWORDS = new Set([
    "extends", "implements", "readonly", "static", "async", "new",
    "void", "null", "undefined", "true", "false", "keyof", "typeof",
    "infer", "in", "out", "const", "declare", "export", "import",
    "type", "interface", "class", "enum", "function", "namespace",
]);
// Matches identifiers that are ALL_CAPS with underscores — these are constants, not types.
const ALL_CAPS_RE = /^[A-Z][A-Z0-9_]*$/;
// Strip JSDoc/block comments, line comments, and string literals from type strings
// before tokenizing to avoid matching words inside documentation.
const COMMENT_AND_STRING_RE = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g;

export function extractTypeNamesFromSignature(sig: string): Set<string> {
    // Remove comments and string literals to avoid matching prose words
    const cleaned = sig.replace(COMMENT_AND_STRING_RE, " ");
    const names = new Set<string>();
    let m: RegExpExecArray | null;
    TYPE_TOKEN_RE.lastIndex = 0;
    while ((m = TYPE_TOKEN_RE.exec(cleaned)) !== null) {
        const name = m[1];
        if (!PRIMITIVE_TYPES.has(name) && !TYPE_KEYWORDS.has(name) && !ALL_CAPS_RE.test(name)) {
            names.add(name);
        }
    }
    return names;
}

/**
 * Extracts declared type parameter names from a typeParams string.
 * E.g., "<T, K extends string, V = number>" → {"T", "K", "V"}
 */
export function extractDeclaredTypeParamNames(typeParamStr: string | undefined): Set<string> {
    if (!typeParamStr) return new Set();
    const params = new Set<string>();
    // Split by comma, then take the first identifier in each segment
    for (const segment of typeParamStr.split(",")) {
        const match = segment.trim().match(/^([A-Z_$][A-Za-z0-9_$]*)/);
        if (match) params.add(match[1]);
    }
    return params;
}

/**
 * Validates that the API index is self-contained: every type name referenced
 * in method signatures, property types, extends/implements clauses, and type
 * alias bodies is either defined in the output or is a known builtin/node type.
 *
 * Emits SELF_CONTAINMENT diagnostics to stderr for each dangling reference.
 */
export function validateSelfContainment(api: ApiIndex, ctx: ExtractionContext): void {
    // Collect all defined type names (from main modules + dependencies)
    const defined = new Set<string>();
    for (const mod of api.modules) {
        for (const c of mod.classes || []) defined.add(c.name);
        for (const i of mod.interfaces || []) defined.add(i.name);
        for (const e of mod.enums || []) defined.add(e.name);
        for (const t of mod.types || []) defined.add(t.name);
        for (const f of mod.functions || []) { if (f.name) defined.add(f.name); }
    }
    if (api.dependencies) {
        for (const dep of api.dependencies) {
            for (const c of dep.classes || []) defined.add(c.name);
            for (const i of dep.interfaces || []) defined.add(i.name);
            for (const e of dep.enums || []) defined.add(e.name);
            for (const t of dep.types || []) defined.add(t.name);
            for (const f of dep.functions || []) { if (f.name) defined.add(f.name); }
        }
    }

    // Collect declared generic type parameter names to exclude from dangling check.
    // These are declaration-site names (T, K, V, TResult, etc.) that appear in
    // signatures but are not standalone types — they are bound by the enclosing
    // generic declaration.
    const declaredTypeParams = new Set<string>();

    function collectTypeParams(typeParamStr: string | undefined): void {
        for (const name of extractDeclaredTypeParamNames(typeParamStr)) {
            declaredTypeParams.add(name);
        }
    }

    // Collect all type names referenced in signatures
    const referenced = new Set<string>();

    function scanType(typeStr: string | undefined): void {
        if (!typeStr) return;
        for (const name of extractTypeNamesFromSignature(typeStr)) {
            referenced.add(name);
        }
    }

    function scanMethodSigs(methods: MethodInfo[] | undefined): void {
        for (const m of methods || []) {
            collectTypeParams(m.typeParams);
            scanType(m.sig);
            scanType(m.ret);
            scanType(m.typeParams);
            for (const p of m.params || []) scanType(p.type);
        }
    }

    function scanProperties(props: PropertyInfo[] | undefined): void {
        for (const p of props || []) scanType(p.type);
    }

    function scanIndexSigs(sigs: IndexSignatureInfo[] | undefined): void {
        for (const s of sigs || []) {
            scanType(s.keyType);
            scanType(s.valueType);
        }
    }

    for (const mod of api.modules) {
        for (const c of mod.classes || []) {
            collectTypeParams(c.typeParams);
            scanType(c.extends);
            for (const impl of c.implements || []) scanType(impl);
            scanType(c.typeParams);
            scanMethodSigs(c.methods);
            scanProperties(c.properties);
            scanIndexSigs(c.indexSignatures);
            for (const ctor of c.constructors || []) {
                scanType(ctor.sig);
                for (const p of ctor.params || []) scanType(p.type);
            }
        }
        for (const i of mod.interfaces || []) {
            collectTypeParams(i.typeParams);
            for (const ext of i.extends || []) scanType(ext);
            scanType(i.typeParams);
            scanMethodSigs(i.methods);
            scanProperties(i.properties);
            scanIndexSigs(i.indexSignatures);
        }
        for (const t of mod.types || []) {
            collectTypeParams(t.typeParams);
            scanType(t.type);
            scanType(t.typeParams);
        }
        for (const f of mod.functions || []) {
            collectTypeParams(f.typeParams);
            scanType(f.sig);
            scanType(f.ret);
            scanType(f.typeParams);
            for (const p of f.params || []) scanType(p.type);
        }
    }

    // Check each referenced name: is it defined, builtin, or node/web?
    const dangling: string[] = [];
    for (const name of referenced) {
        if (defined.has(name)) continue;
        if (PRIMITIVE_TYPES.has(name)) continue;
        if (ctx.isBuiltinType(name)) continue;
        if (declaredTypeParams.has(name)) continue;
        dangling.push(name);
    }

    if (dangling.length > 0) {
        const sorted = dangling.sort();
        console.error(`Self-containment: ${sorted.length} type(s) referenced in signatures but not defined: ${sorted.join(", ")}`);
    }
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
    }
    return defined;
}

/**
 * Computes the set of type names reachable from entry points.
 * Walks the type reference graph starting from entry-point types,
 * using pre-computed referencedTypes from compiler type resolution.
 */
export function computeReachableTypes(api: ApiIndex): Set<string> {
    const allTypeNames = getDefinedTypes(api);

    // Build reference graph from pre-computed referencedTypes fields.
    // These were populated from TypeReferenceCollector's compiler-resolved refs.
    const references = new Map<string, Set<string>>();
    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            const refs = (cls.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) {
                const existing = references.get(cls.name);
                if (existing) { for (const r of refs) existing.add(r); }
                else { references.set(cls.name, new Set(refs)); }
            }
        }
        for (const iface of mod.interfaces || []) {
            const refs = (iface.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) {
                const existing = references.get(iface.name);
                if (existing) { for (const r of refs) existing.add(r); }
                else { references.set(iface.name, new Set(refs)); }
            }
        }
        for (const t of mod.types || []) {
            const refs = (t.referencedTypes ?? []).filter(t2 => allTypeNames.has(t2));
            if (refs.length) {
                const existing = references.get(t.name);
                if (existing) { for (const r of refs) existing.add(r); }
                else { references.set(t.name, new Set(refs)); }
            }
        }
        for (const fn of mod.functions || []) {
            if (!fn.name) continue;
            const refs = (fn.referencedTypes ?? []).filter(t => allTypeNames.has(t));
            if (refs.length) {
                const existing = references.get(fn.name);
                if (existing) { for (const r of refs) existing.add(r); }
                else { references.set(fn.name, new Set(refs)); }
            }
        }
    }

    // BFS from entry points
    const reachable = new Set<string>();
    const queue: string[] = [];

    for (const mod of api.modules) {
        for (const cls of mod.classes || []) {
            if (cls.entryPoint) { reachable.add(cls.name); queue.push(cls.name); }
        }
        for (const iface of mod.interfaces || []) {
            if (iface.entryPoint) { reachable.add(iface.name); queue.push(iface.name); }
        }
        for (const en of mod.enums || []) {
            if (en.entryPoint) { reachable.add(en.name); queue.push(en.name); }
        }
        for (const t of mod.types || []) {
            if (t.entryPoint) { reachable.add(t.name); queue.push(t.name); }
        }
        for (const fn of mod.functions || []) {
            if (fn.entryPoint && fn.name) { reachable.add(fn.name); queue.push(fn.name); }
        }
    }

    let qi = 0;
    while (qi < queue.length) {
        const current = queue[qi++];
        const refs = references.get(current);
        if (refs) {
            for (const ref of refs) {
                if (!reachable.has(ref)) {
                    reachable.add(ref);
                    queue.push(ref);
                }
            }
        }
    }

    return reachable;
}

