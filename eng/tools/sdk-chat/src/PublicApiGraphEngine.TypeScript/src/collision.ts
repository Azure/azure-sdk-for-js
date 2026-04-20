// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ts } from "ts-morph";
import { emitDiagnostic } from "./diagnostics.js";
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
    CallSignatureInfo,
    ConstructSignatureInfo,
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
    contextRefPackages: Map<string, Map<string, Set<string>>>,
): CollisionAliasMap {
    // Collect all names defined in main (including functions/namespaces) for the
    // usedAliases seed set — we never want a generated alias to shadow ANY main name.
    const allMainNames = new Set<string>();
    for (const mod of api.modules) {
        collectTypeNames(mod, allMainNames);
    }

    // Collect only importable type names (classes, interfaces, enums, type aliases)
    // for collision detection — functions and namespaces can't collide with type imports.
    const mainImportableTypeNames = new Set<string>();
    for (const mod of api.modules) {
        collectMainImportableTypeNames(mod, mainImportableTypeNames);
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
    // Track all generated aliases to ensure uniqueness across the entire output.
    // Seed with ALL main names (including functions/namespaces) and ALL dep type names
    // to prevent generated aliases from colliding with any importable name.
    const usedAliases = new Set<string>([...allMainNames]);
    for (const dep of api.dependencies ?? []) {
        if (dep.isNode) continue;
        for (const name of getAllDepTypeNames(dep)) usedAliases.add(name);
    }

    for (const [typeName, depPackages] of depTypesByName) {
        const mainOwns = mainImportableTypeNames.has(typeName);
        const packages = Array.from(depPackages).sort(); // deterministic order

        if (mainOwns && packages.length >= 1) {
            // Main owns the name → all deps get aliased
            const entry: Record<string, string> = {};
            entry[api.package] = typeName; // main keeps bare name
            for (const pkg of packages) {
                entry[pkg] = uniqueAlias(pkg, typeName, usedAliases);
            }
            collisionAliases[typeName] = entry;
        } else if (!mainOwns && packages.length >= 2) {
            // Cross-dep collision: first dep (lexicographic) keeps bare name
            const entry: Record<string, string> = {};
            entry[packages[0]] = typeName; // first dep keeps bare name
            usedAliases.add(typeName);
            for (let i = 1; i < packages.length; i++) {
                entry[packages[i]] = uniqueAlias(packages[i], typeName, usedAliases);
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

/**
 * Generate a unique alias for a collision.
 * Base format: `_<pkgSuffix>_<TypeName>`. If that collides with an existing
 * alias or main type name, append an incrementing counter (_2, _3, ...).
 */
function uniqueAlias(packageName: string, typeName: string, usedAliases: Set<string>): string {
    const base = makeAlias(packageName, typeName);
    if (!usedAliases.has(base)) {
        usedAliases.add(base);
        return base;
    }
    // Disambiguate with counter
    let counter = 2;
    while (usedAliases.has(`${base}_${counter}`)) counter++;
    const alias = `${base}_${counter}`;
    usedAliases.add(alias);
    return alias;
}

function makeAlias(packageName: string, typeName: string): string {
    // Use last segment of package name with hyphens removed
    const parts = packageName.split("/");
    const suffix = parts[parts.length - 1].replace(/-/g, "");
    return `_${suffix}_${typeName}`;
}

function getAllDepTypeNames(dep: { classes?: { name: string }[]; interfaces?: { name: string }[]; enums?: { name: string }[]; types?: { name: string }[] }): string[] {
    const names: string[] = [];
    for (const c of dep.classes ?? []) names.push(c.name);
    for (const i of dep.interfaces ?? []) names.push(i.name);
    for (const e of dep.enums ?? []) names.push(e.name);
    for (const t of dep.types ?? []) names.push(t.name);
    // Functions and namespaces are excluded: the C# formatter only emits
    // import statements for classes, interfaces, enums, and type aliases.
    // Including them would create aliases that are never imported.
    return names;
}

function collectTypeNames(source: { classes?: { name: string }[]; interfaces?: { name: string }[]; enums?: { name: string }[]; types?: { name: string }[]; functions?: { name?: string }[]; namespaces?: NamespaceInfo[] }, out: Set<string>): void {
    for (const c of source.classes ?? []) out.add(c.name);
    for (const i of source.interfaces ?? []) out.add(i.name);
    for (const e of source.enums ?? []) out.add(e.name);
    for (const t of source.types ?? []) out.add(t.name);
    // Include functions and namespaces so generated aliases don't shadow them.
    for (const f of source.functions ?? []) if (f.name) out.add(f.name);
    for (const ns of source.namespaces ?? []) {
        out.add(ns.name);
        collectTypeNames(ns, out);
    }
}

/**
 * Collect only importable type names (classes, interfaces, enums, type aliases)
 * from main modules. Functions and namespaces are excluded because they can't
 * collide with type imports from dependencies.
 */
function collectMainImportableTypeNames(source: { classes?: { name: string }[]; interfaces?: { name: string }[]; enums?: { name: string }[]; types?: { name: string }[]; namespaces?: NamespaceInfo[] }, out: Set<string>): void {
    for (const c of source.classes ?? []) out.add(c.name);
    for (const i of source.interfaces ?? []) out.add(i.name);
    for (const e of source.enums ?? []) out.add(e.name);
    for (const t of source.types ?? []) out.add(t.name);
    for (const ns of source.namespaces ?? []) {
        collectMainImportableTypeNames(ns, out);
    }
}

/**
 * Apply collision aliases to all entities in a module.
 * Uses per-entity package provenance to determine which alias to apply.
 * The `moduleName` parameter qualifies entity lookup keys as `moduleName/entityKey`
 * to match the module-qualified keys in `contextRefPackages`.
 */
function applyAliasesToModule(
    mod: { name?: string; classes?: ClassInfo[]; interfaces?: InterfaceInfo[]; types?: TypeAliasInfo[]; functions?: FunctionInfo[]; namespaces?: NamespaceInfo[] },
    aliases: CollisionAliasMap,
    contextRefPackages: Map<string, Map<string, Set<string>>>,
    prefix: string,
    moduleName?: string,
): void {
    // Resolve the module name from the module object if not explicitly provided
    const modName = moduleName ?? mod.name ?? "";
    for (const cls of mod.classes ?? []) {
        const entityKey = prefix ? `${prefix}.${cls.name}` : cls.name;
        const key = modName ? `${modName}/${entityKey}` : entityKey;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToClass(cls, replacements);
    }
    for (const iface of mod.interfaces ?? []) {
        const entityKey = prefix ? `${prefix}.${iface.name}` : iface.name;
        const key = modName ? `${modName}/${entityKey}` : entityKey;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToInterface(iface, replacements);
    }
    for (const t of mod.types ?? []) {
        const entityKey = prefix ? `${prefix}.${t.name}` : t.name;
        const key = modName ? `${modName}/${entityKey}` : entityKey;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToTypeAlias(t, replacements);
    }
    for (const fn of mod.functions ?? []) {
        if (!fn.name) continue;
        const entityKey = prefix ? `${prefix}.${fn.name}` : fn.name;
        const key = modName ? `${modName}/${entityKey}` : entityKey;
        const replacements = buildReplacementsForEntity(key, aliases, contextRefPackages);
        if (replacements.size > 0) applyToFunction(fn, replacements);
    }
    for (const ns of mod.namespaces ?? []) {
        const nsPrefix = prefix ? `${prefix}.${ns.name}` : ns.name;
        applyAliasesToModule(ns, aliases, contextRefPackages, nsPrefix, modName);
    }
}

/**
 * For a single entity, build the map of bare name → alias by looking up
 * which colliding types it references and from which package.
 * If a type name comes from multiple packages (ambiguous), skip replacement.
 */
function buildReplacementsForEntity(
    entityKey: string,
    aliases: CollisionAliasMap,
    contextRefPackages: Map<string, Map<string, Set<string>>>,
): Map<string, string> {
    const replacements = new Map<string, string>();
    // Try the full (module-qualified) key first; fall back to the bare entity
    // portion for backward compatibility with callers that don't qualify keys.
    let entityRefs = contextRefPackages.get(entityKey);
    if (!entityRefs && entityKey.includes("/")) {
        const bareKey = entityKey.slice(entityKey.indexOf("/") + 1);
        entityRefs = contextRefPackages.get(bareKey);
    }
    if (!entityRefs) return replacements;

    for (const [typeName, packageNames] of entityRefs) {
        const aliasEntry = aliases[typeName];
        if (!aliasEntry) continue;
        // If the type name comes from multiple packages, skip — ambiguous
        if (packageNames.size !== 1) continue;
        const packageName = packageNames.values().next().value!;
        const alias = aliasEntry[packageName];
        if (alias && alias !== typeName) {
            replacements.set(typeName, alias);
        }
    }
    return replacements;
}

/**
 * Replace standalone type identifiers in text using the TypeScript compiler AST.
 * - Correctly handles string literals, template literals, comments, and unicode identifiers
 * - Skips identifiers in qualified access (e.g., Foo.Bar, ns?.Type)
 * - Tries multiple wrapper strategies to parse any fragment shape (type expressions,
 *   parameter lists, type parameter lists, heritage clauses)
 * - Throws if no strategy can parse the input
 */
/** @internal Exported for testing */
export function replaceTypeIdentifiers(text: string, replacements: Map<string, string>): string {
    // Fast path: if no replacements, return as-is
    if (replacements.size === 0) return text;

    try {
        return replaceTypeIdentifiersAST(text, replacements);
    } catch (e) {
        // Graceful degradation: if the fragment can't be parsed by any wrapper
        // strategy, emit a diagnostic warning and return the original text unchanged.
        const message = e instanceof Error ? e.message : String(e);
        emitDiagnostic({
            code: "COLLISION_REWRITE_SKIP",
            message: `Collision rewrite skipped: ${message}`,
            severity: "warning",
            target: text.substring(0, 80),
        });
        return text;
    }
}

/**
 * Wrapper strategies for parsing TypeScript code fragments.
 * Each strategy wraps the fragment in a syntactically valid declaration
 * and records the character offset where the original text begins.
 */
const WRAPPER_STRATEGIES: ReadonlyArray<{
    wrap: (text: string) => string;
    offset: (text: string) => number;
}> = [
    // Strategy 1: Type expression — handles union, intersection, generics, mapped, conditional, etc.
    { wrap: (t) => `type __T = ${t};`, offset: () => "type __T = ".length },
    // Strategy 2: Parameter list with parens — signatures like (a: Foo, b: Bar)
    { wrap: (t) => `declare function __f${t}: void;`, offset: () => "declare function __f".length },
    // Strategy 3: Bare parameter list — signatures like x: Foo, y: Bar (no parens)
    { wrap: (t) => `declare function __f(${t}): void;`, offset: () => "declare function __f(".length },
    // Strategy 4: Type parameter list — like T extends Foo, U
    { wrap: (t) => `type __T<${t}> = any;`, offset: () => "type __T<".length },
    // Strategy 5: Type parameter list with angle brackets — like <T extends Foo>
    { wrap: (t) => `declare function __f${t}(): void;`, offset: () => "declare function __f".length },
    // Strategy 6: Heritage clause — like Base<T>, Mixin<U>
    { wrap: (t) => `interface __I extends ${t} {}`, offset: () => "interface __I extends ".length },
];

/**
 * Parse a TypeScript fragment by trying each wrapper strategy in order.
 * Returns the parsed source file and the character offset of the original text.
 * Throws if no strategy can parse the fragment without errors.
 */
function parseFragment(text: string): { sourceFile: ts.SourceFile; offset: number } {
    for (const strategy of WRAPPER_STRATEGIES) {
        const wrapped = strategy.wrap(text);
        const sf = ts.createSourceFile("__collision__.ts", wrapped, ts.ScriptTarget.Latest, true);
        const diags = (sf as unknown as { parseDiagnostics?: readonly ts.DiagnosticWithLocation[] }).parseDiagnostics;
        if (!diags || diags.length === 0) {
            return { sourceFile: sf, offset: strategy.offset(text) };
        }
    }
    throw new Error(`Cannot parse type fragment: ${text.length > 80 ? text.slice(0, 80) + "..." : text}`);
}

/**
 * Check if an identifier node is the right-hand side of a qualified/property access.
 * In such cases, the identifier is not a standalone type reference and should not be replaced.
 */
function isQualifiedAccess(node: ts.Node): boolean {
    const parent = node.parent;
    if (!parent) return false;
    // ns.Type — property access expression, identifier is the .name
    if (ts.isPropertyAccessExpression(parent) && parent.name === node) return true;
    // ns.Type in type position — qualified name, identifier is the .right
    if (ts.isQualifiedName(parent) && parent.right === node) return true;
    return false;
}

/**
 * Determines whether an identifier appears in a type-reference position
 * (as opposed to a property key, parameter name, tuple label, etc.).
 */
function isTypePositionIdentifier(node: ts.Identifier, _sourceFile: ts.SourceFile): boolean {
    const parent = node.parent;
    if (!parent) return false;

    // Direct type reference: `Foo` in `x: Foo`, `extends Foo`, `implements Foo`
    if (ts.isTypeReferenceNode(parent) && parent.typeName === node) return true;

    // Qualified name left side: `Foo` in `Foo.Bar` or `Foo.Bar.Baz` when used as type
    // Walk up the chain of QualifiedNames to reach the TypeReferenceNode root
    if (ts.isQualifiedName(parent) && parent.left === node) {
        let current: ts.Node = parent;
        while (current.parent && ts.isQualifiedName(current.parent)) {
            current = current.parent;
        }
        return current.parent ? ts.isTypeReferenceNode(current.parent) : false;
    }

    // Expression with type arguments: `Foo<T>` in heritage clauses
    if (ts.isExpressionWithTypeArguments(parent) && parent.expression === node) return true;

    // Import type: `import("pkg").Foo`
    if (ts.isImportTypeNode(parent)) return true;

    // Type query: `typeof Foo`
    if (ts.isTypeQueryNode(parent) && parent.exprName === node) return true;

    // Type parameter declaration: `T` itself is not a type reference
    if (ts.isTypeParameterDeclaration(parent)) return false;

    return false;
}

function replaceTypeIdentifiersAST(text: string, replacements: Map<string, string>): string {
    const { sourceFile, offset } = parseFragment(text);

    // Collect all identifier positions that need replacement
    const edits: Array<{ start: number; end: number; newText: string }> = [];

    function visit(node: ts.Node): void {
        if (ts.isIdentifier(node)) {
            const name = node.text;
            const replacement = replacements.get(name);
            if (replacement && !isQualifiedAccess(node) && isTypePositionIdentifier(node, sourceFile)) {
                // Adjust positions from wrapped source back to original text
                const start = node.getStart(sourceFile) - offset;
                const end = node.getEnd() - offset;
                // Only replace if the position maps back into the original text
                if (start >= 0 && end <= text.length) {
                    edits.push({ start, end, newText: replacement });
                }
            }
        }
        ts.forEachChild(node, visit);
    }

    visit(sourceFile);

    if (edits.length === 0) return text;

    // Apply edits in reverse order to preserve positions
    edits.sort((a, b) => b.start - a.start);
    let result = text;
    for (const edit of edits) {
        result = result.slice(0, edit.start) + edit.newText + result.slice(edit.end);
    }
    return result;
}

// --- Apply replacements to each entity type ---

function applyToClass(cls: ClassInfo, r: Map<string, string>): void {
    if (cls.extends) cls.extends = replaceTypeIdentifiers(cls.extends, r);
    if (cls.implements) cls.implements = cls.implements.map(i => replaceTypeIdentifiers(i, r));
    if (cls.typeParams) cls.typeParams = replaceTypeIdentifiers(cls.typeParams, r);
    applyToConstructors(cls.constructors, r);
    applyToMethods(cls.methods, r);
    applyToProperties(cls.properties, r);
    applyToIndexSignatures(cls.indexSignatures, r);
}

function applyToInterface(iface: InterfaceInfo, r: Map<string, string>): void {
    if (iface.extends) iface.extends = iface.extends.map(e => replaceTypeIdentifiers(e, r));
    if (iface.typeParams) iface.typeParams = replaceTypeIdentifiers(iface.typeParams, r);
    applyToMethods(iface.methods, r);
    applyToProperties(iface.properties, r);
    applyToIndexSignatures(iface.indexSignatures, r);
    applyToCallSignatures(iface.callSignatures, r);
    applyToConstructSignatures(iface.constructSignatures, r);
}

function applyToTypeAlias(t: TypeAliasInfo, r: Map<string, string>): void {
    t.type = replaceTypeIdentifiers(t.type, r);
    if (t.typeParams) t.typeParams = replaceTypeIdentifiers(t.typeParams, r);
}

function applyToFunction(fn: FunctionInfo, r: Map<string, string>): void {
    fn.sig = replaceTypeIdentifiers(fn.sig, r);
    if (fn.ret) fn.ret = replaceTypeIdentifiers(fn.ret, r);
    if (fn.typeParams) fn.typeParams = replaceTypeIdentifiers(fn.typeParams, r);
    applyToParams(fn.params, r);
}

function applyToMethods(methods: MethodInfo[] | undefined, r: Map<string, string>): void {
    if (!methods) return;
    for (const m of methods) {
        m.sig = replaceTypeIdentifiers(m.sig, r);
        if (m.ret) m.ret = replaceTypeIdentifiers(m.ret, r);
        if (m.typeParams) m.typeParams = replaceTypeIdentifiers(m.typeParams, r);
        applyToParams(m.params, r);
    }
}

function applyToProperties(props: PropertyInfo[] | undefined, r: Map<string, string>): void {
    if (!props) return;
    for (const p of props) {
        p.type = replaceTypeIdentifiers(p.type, r);
    }
}

function applyToConstructors(ctors: ConstructorInfo[] | undefined, r: Map<string, string>): void {
    if (!ctors) return;
    for (const c of ctors) {
        c.sig = replaceTypeIdentifiers(c.sig, r);
        applyToParams(c.params, r);
    }
}

function applyToParams(params: ParameterInfo[] | undefined, r: Map<string, string>): void {
    if (!params) return;
    for (const p of params) {
        p.type = replaceTypeIdentifiers(p.type, r);
    }
}

function applyToIndexSignatures(sigs: IndexSignatureInfo[] | undefined, r: Map<string, string>): void {
    if (!sigs) return;
    for (const s of sigs) {
        s.keyType = replaceTypeIdentifiers(s.keyType, r);
        s.valueType = replaceTypeIdentifiers(s.valueType, r);
    }
}

function applyToCallSignatures(sigs: CallSignatureInfo[] | undefined, r: Map<string, string>): void {
    if (!sigs) return;
    for (const s of sigs) {
        s.sig = replaceTypeIdentifiers(s.sig, r);
        if (s.ret) s.ret = replaceTypeIdentifiers(s.ret, r);
        if (s.typeParams) s.typeParams = replaceTypeIdentifiers(s.typeParams, r);
    }
}

function applyToConstructSignatures(sigs: ConstructSignatureInfo[] | undefined, r: Map<string, string>): void {
    if (!sigs) return;
    for (const s of sigs) {
        s.sig = replaceTypeIdentifiers(s.sig, r);
        if (s.ret) s.ret = replaceTypeIdentifiers(s.ret, r);
        if (s.typeParams) s.typeParams = replaceTypeIdentifiers(s.typeParams, r);
    }
}
