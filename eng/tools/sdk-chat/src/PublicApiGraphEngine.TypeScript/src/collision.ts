// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
    ApiIndex,
    ClassInfo,
    InterfaceInfo,
    TypeAliasInfo,
    FunctionInfo,
    NamespaceInfo,
    MethodInfo,
    PropertyInfo,
    ConstructorInfo,
    IndexSignatureInfo,
    ParameterInfo,
} from "./models.js";

/**
 * Collision alias map: typeName → Map<packageName, aliasName>.
 * For each colliding type name, records the alias to use when importing
 * from each package. The "winner" (bare-name keeper) maps to the original name.
 */
export type CollisionAliasMap = Record<string, Record<string, string>>;

/**
 * Detects type name collisions between the main package and its dependencies,
 * builds a deterministic alias map, and rewrites all entity body text in the
 * main modules to use the aliases.
 *
 * Collision rule:
 * - The main package's type always keeps the bare name.
 * - Among deps, sorted lexicographically by package name, the first dep
 *   keeps the bare name if main doesn't own it. All others get aliased.
 *
 * Alias format: `_<pkgSuffix>_<TypeName>` where pkgSuffix is the last
 * segment of the package name with hyphens removed.
 */
export function resolveCollisions(
    api: ApiIndex,
    contextRefPackages: Map<string, Map<string, string>>,
): CollisionAliasMap {
    // Collect all type names defined in the main package
    const mainTypeNames = new Set<string>();
    for (const mod of api.modules) {
        collectTypeNames(mod, mainTypeNames);
    }

    // Collect all dep type names grouped by package
    const depTypesByName = new Map<string, Set<string>>(); // typeName → set of packageNames
    for (const dep of api.dependencies ?? []) {
        if (dep.isNode) continue;
        for (const name of getAllDepTypeNames(dep)) {
            if (!depTypesByName.has(name)) depTypesByName.set(name, new Set());
            depTypesByName.get(name)!.add(dep.package);
        }
    }

    // Find collisions: names that appear in main + any dep, or in 2+ deps
    const collisionAliases: CollisionAliasMap = {};

    for (const [typeName, depPackages] of depTypesByName) {
        const mainOwns = mainTypeNames.has(typeName);
        const packages = Array.from(depPackages).sort(); // deterministic order

        if (mainOwns && packages.length >= 1) {
            // Main owns the name → all deps get aliased
            const entry: Record<string, string> = {};
            entry[api.package] = typeName; // main keeps bare name
            for (const pkg of packages) {
                entry[pkg] = makeAlias(pkg, typeName);
            }
            collisionAliases[typeName] = entry;
        } else if (!mainOwns && packages.length >= 2) {
            // Cross-dep collision: first dep (lexicographic) keeps bare name
            const entry: Record<string, string> = {};
            entry[packages[0]] = typeName; // first dep keeps bare name
            for (let i = 1; i < packages.length; i++) {
                entry[packages[i]] = makeAlias(packages[i], typeName);
            }
            collisionAliases[typeName] = entry;
        }
        // If only 1 dep has the name and main doesn't → no collision
    }

    if (Object.keys(collisionAliases).length === 0) {
        return collisionAliases;
    }

    // Apply aliases to main entity bodies
    for (const mod of api.modules) {
        applyAliasesToModule(mod, collisionAliases, contextRefPackages, "");
    }

    return collisionAliases;
}

function makeAlias(packageName: string, typeName: string): string {
    // Use last segment of package name with hyphens removed
    const parts = packageName.split("/");
    const suffix = parts[parts.length - 1].replace(/-/g, "");
    return `_${suffix}_${typeName}`;
}

function getAllDepTypeNames(dep: { classes?: { name: string }[]; interfaces?: { name: string }[]; enums?: { name: string }[]; types?: { name: string }[]; functions?: { name: string }[]; namespaces?: { name: string }[] }): string[] {
    const names: string[] = [];
    for (const c of dep.classes ?? []) names.push(c.name);
    for (const i of dep.interfaces ?? []) names.push(i.name);
    for (const e of dep.enums ?? []) names.push(e.name);
    for (const t of dep.types ?? []) names.push(t.name);
    for (const f of dep.functions ?? []) if (f.name) names.push(f.name);
    // Namespace names that are companion namespaces (declaration merging)
    // are not independent types — they merge with the class/interface.
    // Only collect top-level namespace names that aren't already collected.
    for (const ns of dep.namespaces ?? []) {
        if (!names.includes(ns.name)) names.push(ns.name);
    }
    return names;
}

function collectTypeNames(source: { classes?: { name: string }[]; interfaces?: { name: string }[]; enums?: { name: string }[]; types?: { name: string }[]; functions?: { name?: string }[]; namespaces?: NamespaceInfo[] }, out: Set<string>): void {
    for (const c of source.classes ?? []) out.add(c.name);
    for (const i of source.interfaces ?? []) out.add(i.name);
    for (const e of source.enums ?? []) out.add(e.name);
    for (const t of source.types ?? []) out.add(t.name);
    for (const f of source.functions ?? []) if (f.name) out.add(f.name);
    for (const ns of source.namespaces ?? []) {
        out.add(ns.name);
        collectTypeNames(ns, out);
    }
}

/**
 * Apply collision aliases to all entities in a module.
 * Uses per-entity package provenance to determine which alias to apply.
 */
function applyAliasesToModule(
    mod: { classes?: ClassInfo[]; interfaces?: InterfaceInfo[]; types?: TypeAliasInfo[]; functions?: FunctionInfo[]; namespaces?: NamespaceInfo[] },
    aliases: CollisionAliasMap,
    contextRefPackages: Map<string, Map<string, string>>,
    prefix: string,
): void {
    for (const cls of mod.classes ?? []) {
        const key = prefix ? `${prefix}.${cls.name}` : cls.name;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToClass(cls, replacements);
    }
    for (const iface of mod.interfaces ?? []) {
        const key = prefix ? `${prefix}.${iface.name}` : iface.name;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToInterface(iface, replacements);
    }
    for (const t of mod.types ?? []) {
        const key = prefix ? `${prefix}.${t.name}` : t.name;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToTypeAlias(t, replacements);
    }
    for (const fn of mod.functions ?? []) {
        if (!fn.name) continue;
        const key = prefix ? `${prefix}.${fn.name}` : fn.name;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToFunction(fn, replacements);
    }
    for (const ns of mod.namespaces ?? []) {
        const nsPrefix = prefix ? `${prefix}.${ns.name}` : ns.name;
        applyAliasesToModule(ns, aliases, contextRefPackages, nsPrefix);
    }
}

/**
 * For a single entity, build the map of bare name → alias by looking up
 * which colliding types it references and from which package.
 */
function buildReplacementsForEntity(
    entityKey: string,
    aliases: CollisionAliasMap,
    contextRefPackages: Map<string, Map<string, string>>,
): Map<string, string> {
    const replacements = new Map<string, string>();
    const entityRefs = contextRefPackages.get(entityKey);
    if (!entityRefs) return replacements;

    for (const [typeName, packageName] of entityRefs) {
        const aliasEntry = aliases[typeName];
        if (!aliasEntry) continue;
        const alias = aliasEntry[packageName];
        if (alias && alias !== typeName) {
            replacements.set(typeName, alias);
        }
    }
    return replacements;
}

/**
 * Apply word-boundary replacements to a string.
 * Uses a regex that matches the bare type name at a word boundary.
 */
function replaceInText(text: string, replacements: Map<string, string>): string {
    let result = text;
    for (const [from, to] of replacements) {
        result = result.replace(new RegExp(`\\b${escapeRegExp(from)}\\b`, "g"), to);
    }
    return result;
}

function escapeRegExp(s: string): string {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// --- Apply replacements to each entity type ---

function applyToClass(cls: ClassInfo, r: Map<string, string>): void {
    if (cls.extends) cls.extends = replaceInText(cls.extends, r);
    if (cls.implements) cls.implements = cls.implements.map(i => replaceInText(i, r));
    if (cls.typeParams) cls.typeParams = replaceInText(cls.typeParams, r);
    applyToConstructors(cls.constructors, r);
    applyToMethods(cls.methods, r);
    applyToProperties(cls.properties, r);
    applyToIndexSignatures(cls.indexSignatures, r);
}

function applyToInterface(iface: InterfaceInfo, r: Map<string, string>): void {
    if (iface.extends) iface.extends = iface.extends.map(e => replaceInText(e, r));
    if (iface.typeParams) iface.typeParams = replaceInText(iface.typeParams, r);
    applyToMethods(iface.methods, r);
    applyToProperties(iface.properties, r);
    applyToIndexSignatures(iface.indexSignatures, r);
}

function applyToTypeAlias(t: TypeAliasInfo, r: Map<string, string>): void {
    t.type = replaceInText(t.type, r);
    if (t.typeParams) t.typeParams = replaceInText(t.typeParams, r);
}

function applyToFunction(fn: FunctionInfo, r: Map<string, string>): void {
    fn.sig = replaceInText(fn.sig, r);
    if (fn.ret) fn.ret = replaceInText(fn.ret, r);
    if (fn.typeParams) fn.typeParams = replaceInText(fn.typeParams, r);
    applyToParams(fn.params, r);
}

function applyToMethods(methods: MethodInfo[] | undefined, r: Map<string, string>): void {
    if (!methods) return;
    for (const m of methods) {
        m.sig = replaceInText(m.sig, r);
        if (m.ret) m.ret = replaceInText(m.ret, r);
        if (m.typeParams) m.typeParams = replaceInText(m.typeParams, r);
        applyToParams(m.params, r);
    }
}

function applyToProperties(props: PropertyInfo[] | undefined, r: Map<string, string>): void {
    if (!props) return;
    for (const p of props) {
        p.type = replaceInText(p.type, r);
    }
}

function applyToConstructors(ctors: ConstructorInfo[] | undefined, r: Map<string, string>): void {
    if (!ctors) return;
    for (const c of ctors) {
        c.sig = replaceInText(c.sig, r);
        applyToParams(c.params, r);
    }
}

function applyToParams(params: ParameterInfo[] | undefined, r: Map<string, string>): void {
    if (!params) return;
    for (const p of params) {
        p.type = replaceInText(p.type, r);
    }
}

function applyToIndexSignatures(sigs: IndexSignatureInfo[] | undefined, r: Map<string, string>): void {
    if (!sigs) return;
    for (const s of sigs) {
        s.keyType = replaceInText(s.keyType, r);
        s.valueType = replaceInText(s.valueType, r);
    }
}
