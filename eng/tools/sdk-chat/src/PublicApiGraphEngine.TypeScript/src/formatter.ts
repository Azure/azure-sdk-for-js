// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TypeNode, Type, Node } from "ts-morph";
import type {
    ApiIndex,
    ClassInfo,
    InterfaceInfo,
    EnumInfo,
    TypeAliasInfo,
    FunctionInfo,
    DependencyInfo,
    MethodInfo,
    PropertyInfo,
    IndexSignatureInfo,
    ConstructorInfo,
    ModuleInfo,
    NamespaceInfo,
} from "./models.js";

// ============================================================================
// Module merge helpers (Issue #3: union contents when deduplicating)
// ============================================================================

/**
 * Merges the contents of `incoming` into `existing` module field-by-field.
 * For each category (types, interfaces, classes, functions, enums, namespaces),
 * adds items from `incoming` that don't already exist in `existing` (by name).
 * Namespaces with the same name are merged recursively.
 */
function mergeModules(existing: ModuleInfo, incoming: ModuleInfo): void {
    existing.types = mergeByName(existing.types, incoming.types);
    existing.interfaces = mergeByName(existing.interfaces, incoming.interfaces);
    existing.classes = mergeByName(existing.classes, incoming.classes);
    existing.enums = mergeByName(existing.enums, incoming.enums);
    existing.functions = mergeFunctions(existing.functions, incoming.functions);
    existing.namespaces = mergeNamespaces(existing.namespaces, incoming.namespaces);
}

function mergeByName<T extends { name: string }>(
    existing: T[] | undefined,
    incoming: T[] | undefined,
): T[] | undefined {
    if (!incoming?.length) return existing;
    if (!existing?.length) return incoming;
    const seen = new Set(existing.map(item => item.name));
    for (const item of incoming) {
        if (!seen.has(item.name)) {
            existing.push(item);
            seen.add(item.name);
        }
    }
    return existing;
}

function mergeFunctions(
    existing: FunctionInfo[] | undefined,
    incoming: FunctionInfo[] | undefined,
): FunctionInfo[] | undefined {
    if (!incoming?.length) return existing;
    if (!existing?.length) return incoming;
    const seen = new Set(existing.map(f => `${f.name}\0${f.sig}`));
    for (const f of incoming) {
        const key = `${f.name}\0${f.sig}`;
        if (!seen.has(key)) {
            existing.push(f);
            seen.add(key);
        }
    }
    return existing;
}

function mergeNamespaces(
    existing: NamespaceInfo[] | undefined,
    incoming: NamespaceInfo[] | undefined,
): NamespaceInfo[] | undefined {
    if (!incoming?.length) return existing;
    if (!existing?.length) return incoming;
    const map = new Map<string, NamespaceInfo>();
    for (const ns of existing) map.set(ns.name, ns);
    for (const ns of incoming) {
        const target = map.get(ns.name);
        if (target) {
            target.types = mergeByName(target.types, ns.types);
            target.interfaces = mergeByName(target.interfaces, ns.interfaces);
            target.classes = mergeByName(target.classes, ns.classes);
            target.enums = mergeByName(target.enums, ns.enums);
            target.functions = mergeFunctions(target.functions, ns.functions);
            target.namespaces = mergeNamespaces(target.namespaces, ns.namespaces);
        } else {
            existing.push(ns);
            map.set(ns.name, ns);
        }
    }
    return existing;
}

/**
 * Internal: Strips compiler-generated `import("…")` qualifiers from type text.
 * Used by `displayType()` and `baseTypeName()`.
 *
 *   import("./path").TypeName         → TypeName
 *   import("./path").Foo<import("./p").Bar> → Foo<Bar>
 *   typeof import("./path")           → typeof path-last-segment
 *
 * When `baseOnly` is true, also strips generic parameters.
 *
 * Implementation uses a hand-written scanner rather than regex so the
 * transformation is provably correct for the `import(…)` grammar emitted
 * by the TypeScript compiler.
 */
export function stripImportPrefix(text: string, baseOnly = false, namespaceAliases?: Set<string>): string {
    let result = text.includes("import(") ? stripImportExpressions(text) : text;
    if (namespaceAliases && namespaceAliases.size > 0) {
        result = stripNamespaceAliases(result, namespaceAliases);
    }
    if (baseOnly) {
        const idx = result.indexOf("<");
        return (idx >= 0 ? result.slice(0, idx) : result).trim();
    }
    return result;
}

// ---------------------------------------------------------------------------
// Scanner for import("…") expressions
// ---------------------------------------------------------------------------

interface ImportExpr {
    /** The module path inside the quotes. */
    path: string;
    /** Index in the source string immediately after the closing ')'. */
    end: number;
}

/**
 * Starting at `pos` (which must point at the 'i' of `import(`), attempts to
 * parse an `import("…")` expression.  Returns `undefined` when the text
 * doesn't match the expected grammar.
 */
function parseImportExpr(text: string, pos: number): ImportExpr | undefined {
    // "import(" is 7 characters
    if (text.length < pos + 9) return undefined; // minimum: import("x")
    const quotePos = pos + 7; // character after '('
    const quote = text[quotePos];
    if (quote !== '"' && quote !== "'") return undefined;

    const closeQuote = text.indexOf(quote, quotePos + 1);
    if (closeQuote < 0) return undefined;
    if (text[closeQuote + 1] !== ")") return undefined;

    return { path: text.slice(quotePos + 1, closeQuote), end: closeQuote + 2 };
}

function lastPathSegment(path: string): string {
    const slash = path.lastIndexOf("/");
    return slash < 0 ? path : path.slice(slash + 1);
}

/**
 * Scans `text` and replaces every `import("…").` prefix and
 * `typeof import("…")` / bare `import("…")` expression.
 */
function stripImportExpressions(text: string): string {
    const parts: string[] = [];
    let i = 0;

    while (i < text.length) {
        // --- typeof import("…") ---
        if (
            text[i] === "t" &&
            text.startsWith("typeof", i)
        ) {
            let j = i + 6; // skip past "typeof"
            while (j < text.length && (text[j] === " " || text[j] === "\t")) j++;
            if (text.startsWith("import(", j)) {
                const expr = parseImportExpr(text, j);
                if (expr) {
                    parts.push("typeof ", lastPathSegment(expr.path));
                    i = expr.end;
                    continue;
                }
            }
        }

        // --- import("…"). or bare import("…") ---
        if (text[i] === "i" && text.startsWith("import(", i)) {
            const expr = parseImportExpr(text, i);
            if (expr) {
                if (expr.end < text.length && text[expr.end] === ".") {
                    // import("path").Name → skip prefix and dot
                    i = expr.end + 1;
                } else {
                    // bare import("path") → last path segment
                    parts.push(lastPathSegment(expr.path));
                    i = expr.end;
                }
                continue;
            }
        }

        parts.push(text[i]);
        i++;
    }

    return parts.join("");
}

// ---------------------------------------------------------------------------
// Namespace-alias stripping (e.g. coreClient.Foo → Foo)
// ---------------------------------------------------------------------------

function isWordChar(code: number): boolean {
    return (
        (code >= 65 && code <= 90) ||  // A-Z
        (code >= 97 && code <= 122) || // a-z
        (code >= 48 && code <= 57) ||  // 0-9
        code === 95 ||                  // _
        code === 36                     // $
    );
}

/**
 * Strips namespace import qualifiers (e.g., `coreClient.OperationOptions → OperationOptions`).
 * These come from `import * as coreClient from "@azure/core-client"` in source files.
 * The underlying types are already tracked as dependencies; we just need the unqualified name.
 *
 * Uses a linear scan with word-boundary checks instead of regex.
 */
function stripNamespaceAliases(text: string, aliases: Set<string>): string {
    let result = text;
    for (const alias of aliases) {
        const prefix = alias + ".";
        if (!result.includes(prefix)) continue;
        result = removeWordPrefixes(result, prefix);
    }
    return result;
}

/**
 * Removes every occurrence of `prefix` in `text` that sits at a word boundary
 * (i.e. the character before the occurrence is not a word character).
 */
function removeWordPrefixes(text: string, prefix: string): string {
    const parts: string[] = [];
    let i = 0;
    while (i < text.length) {
        if (
            text.startsWith(prefix, i) &&
            (i === 0 || !isWordChar(text.charCodeAt(i - 1)))
        ) {
            i += prefix.length;
        } else {
            parts.push(text[i]);
            i++;
        }
    }
    return parts.join("");
}

/**
 * Formats a type for display by stripping compiler-generated import() qualifiers.
 * Prefers the developer-written type annotation (typeNode text) when available;
 * falls back to compiler-inferred text scoped to the enclosing declaration.
 */
export function displayType(typeNode: TypeNode | undefined, type: Type, enclosing?: Node, namespaceAliases?: Set<string>): string {
    return stripImportPrefix(typeNode?.getText() || type.getText(enclosing), false, namespaceAliases);
}

/**
 * Extracts the outermost type constructor from a type string.
 * E.g., "Map<K, V>" → "Map", "Promise<Response>" → "Promise", "Foo" → "Foo".
 * For non-generic type strings, returns the input unchanged (trimmed).
 */
export function baseTypeName(typeStr: string): string {
    return stripImportPrefix(typeStr, true);
}

// ============================================================================
// JSDoc helpers
// ============================================================================

/** Escapes `*​/` inside doc text so it cannot close a JSDoc comment prematurely. */
function escapeDoc(s: string): string {
    return s.replace(/\*\//g, "*\u200B/");
}

/**
 * Builds JSDoc comment lines combining an optional description and @deprecated tag.
 * Returns an empty array when neither doc nor deprecation metadata is present.
 */
function formatJsDoc(indent: string, doc?: string, deprecated?: boolean, deprecatedMsg?: string): string[] {
    if (!doc && !deprecated) return [];
    const lines: string[] = [];
    if (doc && !deprecated) {
        lines.push(`${indent}/** ${escapeDoc(doc)} */`);
    } else if (!doc && deprecated) {
        const msg = deprecatedMsg ? ` ${escapeDoc(deprecatedMsg)}` : "";
        lines.push(`${indent}/** @deprecated${msg} */`);
    } else {
        lines.push(`${indent}/** ${escapeDoc(doc!)}`);
        const msg = deprecatedMsg ? ` ${escapeDoc(deprecatedMsg)}` : "";
        lines.push(`${indent} * @deprecated${msg} */`);
    }
    return lines;
}

// ============================================================================
// Helpers – module specifier building & deduplication
// ============================================================================

function buildModuleSpecifier(
    packageName: string,
    exportPath: string,
    conditionSuffix: string | undefined,
): string {
    // Never use "(unconditioned)" as a real suffix
    const safeSuffix = conditionSuffix && conditionSuffix !== "(unconditioned)"
        ? conditionSuffix
        : undefined;
    const subpath = exportPath && exportPath !== "."
        ? exportPath.replace(/^\.\//, "")
        : undefined;
    if (subpath) {
        return safeSuffix
            ? `${packageName}/${subpath}/${safeSuffix}`
            : `${packageName}/${subpath}`;
    }
    return safeSuffix
        ? `${packageName}/${safeSuffix}`
        : packageName;
}

function isBareSpecifierCondition(condition: string): boolean {
    return condition === "default" || condition === "types" || condition === "(unconditioned)";
}

/**
 * Given sorted keys (exportPath\0condition) and their module groups, merge
 * groups that would produce the same final module specifier so we emit at
 * most one `declare module` block per specifier.  Returns an ordered list of
 * `[specifier, modules[], firstCondition]` tuples.
 */
function deduplicateBySpecifier(
    sortedKeys: string[],
    moduleGroups: Map<string, ModuleInfo[]>,
    conditionsPerExportPath: Map<string, Set<string>>,
    packageName: string,
): Array<{ specifier: string; modules: ModuleInfo[]; condition: string }> {
    const specifierOrder: string[] = [];
    const specifierMap = new Map<string, { modules: ModuleInfo[]; condition: string }>();

    for (const key of sortedKeys) {
        const [exportPath, condition] = key.split("\0");
        const epConditions = conditionsPerExportPath.get(exportPath) ?? new Set();
        const hasMultiple = epConditions.size > 1;
        const conditionSuffix = hasMultiple && !isBareSpecifierCondition(condition)
            ? condition
            : undefined;
        const specifier = buildModuleSpecifier(packageName, exportPath, conditionSuffix);

        const existing = specifierMap.get(specifier);
        if (existing) {
            // Merge: for modules with the same name, union their contents
            // field-by-field; for new module names, append them.
            const keyModules = moduleGroups.get(key) ?? [];
            const existingByName = new Map(existing.modules.map(m => [m.name, m]));
            for (const m of keyModules) {
                const target = existingByName.get(m.name);
                if (target) {
                    mergeModules(target, m);
                } else {
                    existing.modules.push(m);
                    existingByName.set(m.name, m);
                }
            }
        } else {
            specifierOrder.push(specifier);
            specifierMap.set(specifier, {
                modules: [...(moduleGroups.get(key) ?? [])],
                condition,
            });
        }
    }

    return specifierOrder.map(s => ({ specifier: s, ...specifierMap.get(s)! }));
}

// ============================================================================
// Formatters
// ============================================================================

export function formatStubs(api: ApiIndex): string {
    const lines: string[] = [
        `// ${api.package} - Public API Surface`,
        "// Graphed by PublicApiGraphEngine.TypeScript",
        "",
    ];

    // Group modules by (exportPath, condition) pair so each unique combination
    // gets its own `declare module` block. This correctly handles packages with
    // multiple subpath exports (e.g., "." and "./models") under various conditions.
    const groupKey = (m: ModuleInfo): string => {
        const ep = m.exportPath ?? ".";
        const cond = m.condition ?? "(unconditioned)";
        return `${ep}\0${cond}`;
    };

    const moduleGroups = new Map<string, ModuleInfo[]>();
    for (const module of api.modules) {
        const key = groupKey(module);
        if (!moduleGroups.has(key)) moduleGroups.set(key, []);
        moduleGroups.get(key)!.push(module);
    }

    // Sort groups: by exportPath ("." first), then condition ("default" first, then alphabetically)
    const sortedKeys = [...moduleGroups.keys()].sort((a, b) => {
        const [epA, condA] = a.split("\0");
        const [epB, condB] = b.split("\0");
        if (epA !== epB) {
            if (epA === ".") return -1;
            if (epB === ".") return 1;
            return epA.localeCompare(epB);
        }
        if (condA === "default") return -1;
        if (condB === "default") return 1;
        return condA.localeCompare(condB);
    });

    const needsModuleBlocks = sortedKeys.length > 1 || (() => {
        if (sortedKeys.length === 0) return false;
        const [exportPath, condition] = sortedKeys[0].split("\0");
        const isRoot = !exportPath || exportPath === ".";
        const isDefaultCondition = !condition || condition === "default" || condition === "types";
        return !isRoot || !isDefaultCondition;
    })();

    const conditionsPerExportPath = new Map<string, Set<string>>();
    for (const key of sortedKeys) {
        const [ep, cond] = key.split("\0");
        if (!conditionsPerExportPath.has(ep)) conditionsPerExportPath.set(ep, new Set());
        conditionsPerExportPath.get(ep)!.add(cond);
    }

    const dedupedGroups = deduplicateBySpecifier(sortedKeys, moduleGroups, conditionsPerExportPath, api.package);

    for (const { specifier, modules, condition } of dedupedGroups) {
        if (needsModuleBlocks) {
            lines.push(`// Condition: ${condition}`);
            lines.push(`declare module "${specifier}" {`);
            lines.push("");
        }

        const indent = needsModuleBlocks ? "    " : "";

        lines.push(...formatGroupBody(modules, indent));

        if (needsModuleBlocks) {
            lines.push("}");
            lines.push("");
        }
    }

    // Add dependency types if present, each wrapped in a declare module block.
    // Prefer resolvedDependencies (full ApiIndex with condition-aware modules)
    // over the flat dependencies array when available.
    const resolvedDeps = api.resolvedDependencies;
    if (resolvedDeps && resolvedDeps.length > 0) {
        lines.push("");
        lines.push("// ============================================================================");
        lines.push("// Dependencies");
        lines.push("// ============================================================================");

        for (const depApi of resolvedDeps) {
            // Group the dependency's modules by (exportPath, condition) —
            // same logic as the main package — so each group gets exactly
            // one `declare module` wrapper produced here (never nested).
            const depGroupKey = (m: ModuleInfo): string => {
                const ep = m.exportPath ?? ".";
                const cond = m.condition ?? "(unconditioned)";
                return `${ep}\0${cond}`;
            };

            const depModuleGroups = new Map<string, ModuleInfo[]>();
            for (const module of depApi.modules) {
                const key = depGroupKey(module);
                if (!depModuleGroups.has(key)) depModuleGroups.set(key, []);
                depModuleGroups.get(key)!.push(module);
            }

            const depSortedKeys = [...depModuleGroups.keys()].sort((a, b) => {
                const [epA, condA] = a.split("\0");
                const [epB, condB] = b.split("\0");
                if (epA !== epB) {
                    if (epA === ".") return -1;
                    if (epB === ".") return 1;
                    return epA.localeCompare(epB);
                }
                if (condA === "default") return -1;
                if (condB === "default") return 1;
                return condA.localeCompare(condB);
            });

            const conditionsPerDepExportPath = new Map<string, Set<string>>();
            for (const key of depSortedKeys) {
                const [ep, cond] = key.split("\0");
                if (!conditionsPerDepExportPath.has(ep)) conditionsPerDepExportPath.set(ep, new Set());
                conditionsPerDepExportPath.get(ep)!.add(cond);
            }

            const dedupedDepGroups = deduplicateBySpecifier(
                depSortedKeys, depModuleGroups, conditionsPerDepExportPath, depApi.package,
            );

            for (const { specifier, modules, condition } of dedupedDepGroups) {
                const bodyLines = formatGroupBody(modules, "    ");
                if (bodyLines.length > 0) {
                    lines.push("");
                    if (dedupedDepGroups.length > 1) {
                        lines.push(`// Condition: ${condition}`);
                    }
                    lines.push(`declare module "${specifier}" {`);
                    lines.push("");
                    lines.push(...bodyLines);
                    lines.push("}");
                }
            }
        }

        // When using resolvedDependencies, isNode deps only exist in
        // api.dependencies — render them as import statements.
        if (api.dependencies) {
            for (const dep of api.dependencies) {
                if (!dep.isNode) continue;
                const typeNames = [
                    ...(dep.classes ?? []).map(c => c.name),
                    ...(dep.interfaces ?? []).map(i => i.name),
                    ...(dep.enums ?? []).map(e => e.name),
                    ...(dep.types ?? []).map(t => t.name),
                    ...(dep.functions ?? []).filter(f => f.name).map(f => f.name),
                ].filter(Boolean);
                if (typeNames.length > 0) {
                    lines.push("");
                    lines.push(`import { ${typeNames.join(", ")} } from "${dep.package}";`);
                }
            }
        }
    } else if (api.dependencies && api.dependencies.length > 0) {
        lines.push("");
        lines.push("// ============================================================================");
        lines.push("// Dependencies");
        lines.push("// ============================================================================");

        for (const dep of api.dependencies) {
            if (dep.isNode) {
                const typeNames = [
                    ...(dep.classes ?? []).map(c => c.name),
                    ...(dep.interfaces ?? []).map(i => i.name),
                    ...(dep.enums ?? []).map(e => e.name),
                    ...(dep.types ?? []).map(t => t.name),
                    ...(dep.functions ?? []).filter(f => f.name).map(f => f.name),
                ].filter(Boolean);
                if (typeNames.length > 0) {
                    lines.push("");
                    lines.push(`import { ${typeNames.join(", ")} } from "${dep.package}";`);
                }
                continue;
            }

            const depModuleSpecifier = dep.subpath && dep.subpath !== "."
                ? `${dep.package}/${dep.subpath.replace(/^\.\//, "")}`
                : dep.package;

            lines.push("");
            lines.push(`declare module "${depModuleSpecifier}" {`);
            lines.push("");

            const indent = "    ";

            // Interfaces
            for (const iface of dep.interfaces || []) {
                lines.push(...formatJsDoc(indent, iface.doc, iface.deprecated, iface.deprecatedMsg));
                const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
                const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
                lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

                for (const prop of iface.properties || []) {
                    lines.push(...formatJsDoc(`${indent}    `, prop.doc, prop.deprecated, prop.deprecatedMsg));
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of iface.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const cs of iface.callSignatures || []) {
                    const ret = cs.ret ? `: ${cs.ret}` : "";
                    const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
                    lines.push(`${indent}    ${tp}(${cs.sig})${ret};`);
                }

                for (const cs of iface.constructSignatures || []) {
                    const ret = cs.ret ? `: ${cs.ret}` : "";
                    const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
                    lines.push(`${indent}    new ${tp}(${cs.sig})${ret};`);
                }

                for (const m of iface.methods || []) {
                    lines.push(...formatJsDoc(`${indent}    `, m.doc, m.deprecated, m.deprecatedMsg));
                    const ret = m.ret ? `: ${m.ret}` : "";
                    const tp = m.typeParams ? `<${m.typeParams}>` : "";
                    lines.push(`${indent}    ${m.name}${tp}(${m.sig})${ret};`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Classes
            for (const cls of dep.classes || []) {
                lines.push(...formatJsDoc(indent, cls.doc, cls.deprecated, cls.deprecatedMsg));
                const ext = cls.extends ? ` extends ${cls.extends}` : "";
                const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
                const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
                const abs = cls.abstract ? "abstract " : "";
                lines.push(`${indent}export ${abs}class ${cls.name}${typeParams}${ext}${impl} {`);

                for (const prop of cls.properties || []) {
                    lines.push(...formatJsDoc(`${indent}    `, prop.doc, prop.deprecated, prop.deprecatedMsg));
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    const stat = prop.static ? "static " : "";
                    lines.push(`${indent}    ${stat}${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of cls.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const ctor of cls.constructors || []) {
                    lines.push(...formatJsDoc(`${indent}    `, undefined, ctor.deprecated, ctor.deprecatedMsg));
                    lines.push(`${indent}    constructor(${ctor.sig});`);
                }

                for (const m of cls.methods || []) {
                    lines.push(...formatJsDoc(`${indent}    `, m.doc, m.deprecated, m.deprecatedMsg));
                    const abs = m.abstract ? "abstract " : "";
                    const stat = m.static ? "static " : "";
                    const ret = m.ret ? `: ${m.ret}` : "";
                    const tp = m.typeParams ? `<${m.typeParams}>` : "";
                    lines.push(`${indent}    ${abs}${stat}${m.name}${tp}(${m.sig})${ret};`);
                }

                if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length && !cls.indexSignatures?.length) {
                    lines.push(`${indent}    // empty`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Enums
            for (const e of dep.enums || []) {
                lines.push(...formatJsDoc(indent, e.doc, e.deprecated, e.deprecatedMsg));
                const constMod = e.isConst ? "const " : "";
                lines.push(`${indent}export ${constMod}enum ${e.name} {`);
                lines.push(`${indent}    ${e.values.join(", ")}`);
                lines.push(`${indent}}`);
                lines.push("");
            }

            // Type aliases
            for (const t of dep.types || []) {
                lines.push(...formatJsDoc(indent, t.doc, t.deprecated, t.deprecatedMsg));
                const typeParams = t.typeParams ? `<${t.typeParams}>` : "";
                lines.push(`${indent}export type ${t.name}${typeParams} = ${t.type};`);
                lines.push("");
            }

            // Functions
            for (const fn of dep.functions || []) {
                lines.push(...formatJsDoc(indent, fn.doc, fn.deprecated, fn.deprecatedMsg));
                const ret = fn.ret ? `: ${fn.ret}` : "";
                const typeParams = fn.typeParams ? `<${fn.typeParams}>` : "";
                lines.push(`${indent}export function ${fn.name}${typeParams}(${fn.sig})${ret};`);
                lines.push("");
            }

            // Namespaces
            for (const ns of dep.namespaces || []) {
                lines.push(...formatNamespaceLines(ns, indent));
            }

            lines.push("}");
        }
    }

    return lines.join("\n");
}

/**
 * Renders the raw type declarations for a list of modules without any
 * `declare module` wrapping.  Used by both the main `formatStubs` loop and
 * the resolved-dependency renderer so that the caller can supply exactly one
 * ambient-module wrapper.
 */
function formatGroupBody(modules: ModuleInfo[], indent: string): string[] {
    const lines: string[] = [];

    for (const module of modules) {
        lines.push(`${indent}// Module: ${module.name}`);
        lines.push("");

        // Functions
        for (const fn of module.functions || []) {
            lines.push(...formatJsDoc(indent, fn.doc, fn.deprecated, fn.deprecatedMsg));
            const ret = fn.ret ? `: ${fn.ret}` : "";
            const typeParams = fn.typeParams ? `<${fn.typeParams}>` : "";
            lines.push(`${indent}export function ${fn.name}${typeParams}(${fn.sig})${ret};`);
            lines.push("");
        }

        // Type aliases
        for (const t of module.types || []) {
            lines.push(...formatJsDoc(indent, t.doc, t.deprecated, t.deprecatedMsg));
            const typeParams = t.typeParams ? `<${t.typeParams}>` : "";
            lines.push(`${indent}export type ${t.name}${typeParams} = ${t.type};`);
            lines.push("");
        }

        // Enums
        for (const e of module.enums || []) {
            lines.push(...formatJsDoc(indent, e.doc, e.deprecated, e.deprecatedMsg));
            const constMod = e.isConst ? "const " : "";
            lines.push(`${indent}export ${constMod}enum ${e.name} {`);
            lines.push(`${indent}    ${e.values.join(", ")}`);
            lines.push(`${indent}}`);
            lines.push("");
        }

        // Interfaces
        for (const iface of module.interfaces || []) {
            lines.push(...formatJsDoc(indent, iface.doc, iface.deprecated, iface.deprecatedMsg));
            const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
            const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
            lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

            for (const prop of iface.properties || []) {
                lines.push(...formatJsDoc(`${indent}    `, prop.doc, prop.deprecated, prop.deprecatedMsg));
                const opt = prop.optional ? "?" : "";
                const ro = prop.readonly ? "readonly " : "";
                lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
            }

            for (const sig of iface.indexSignatures || []) {
                const ro = sig.readonly ? "readonly " : "";
                lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
            }

            for (const cs of iface.callSignatures || []) {
                const ret = cs.ret ? `: ${cs.ret}` : "";
                const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
                lines.push(`${indent}    ${tp}(${cs.sig})${ret};`);
            }

            for (const cs of iface.constructSignatures || []) {
                const ret = cs.ret ? `: ${cs.ret}` : "";
                const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
                lines.push(`${indent}    new ${tp}(${cs.sig})${ret};`);
            }

            for (const m of iface.methods || []) {
                lines.push(...formatJsDoc(`${indent}    `, m.doc, m.deprecated, m.deprecatedMsg));
                const ret = m.ret ? `: ${m.ret}` : "";
                const tp = m.typeParams ? `<${m.typeParams}>` : "";
                lines.push(`${indent}    ${m.name}${tp}(${m.sig})${ret};`);
            }

            lines.push(`${indent}}`);
            lines.push("");
        }

        // Classes
        for (const cls of module.classes || []) {
            lines.push(...formatJsDoc(indent, cls.doc, cls.deprecated, cls.deprecatedMsg));
            const ext = cls.extends ? ` extends ${cls.extends}` : "";
            const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
            const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
            const abs = cls.abstract ? "abstract " : "";
            lines.push(`${indent}export ${abs}class ${cls.name}${typeParams}${ext}${impl} {`);

            for (const prop of cls.properties || []) {
                lines.push(...formatJsDoc(`${indent}    `, prop.doc, prop.deprecated, prop.deprecatedMsg));
                const opt = prop.optional ? "?" : "";
                const ro = prop.readonly ? "readonly " : "";
                const stat = prop.static ? "static " : "";
                lines.push(`${indent}    ${stat}${ro}${prop.name}${opt}: ${prop.type};`);
            }

            for (const sig of cls.indexSignatures || []) {
                const ro = sig.readonly ? "readonly " : "";
                lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
            }

            for (const ctor of cls.constructors || []) {
                lines.push(...formatJsDoc(`${indent}    `, undefined, ctor.deprecated, ctor.deprecatedMsg));
                lines.push(`${indent}    constructor(${ctor.sig});`);
            }

            for (const m of cls.methods || []) {
                lines.push(...formatJsDoc(`${indent}    `, m.doc, m.deprecated, m.deprecatedMsg));
                const abs = m.abstract ? "abstract " : "";
                const stat = m.static ? "static " : "";
                const ret = m.ret ? `: ${m.ret}` : "";
                const tp = m.typeParams ? `<${m.typeParams}>` : "";
                lines.push(`${indent}    ${abs}${stat}${m.name}${tp}(${m.sig})${ret};`);
            }

            if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length && !cls.indexSignatures?.length) {
                lines.push(`${indent}    // empty`);
            }

            lines.push(`${indent}}`);
            lines.push("");
        }

        // Namespaces
        for (const ns of module.namespaces || []) {
            lines.push(...formatNamespaceLines(ns, indent));
        }
    }

    return lines;
}

function formatNamespaceLines(ns: NamespaceInfo, indent: string): string[] {
    const lines: string[] = [];
    lines.push(`${indent}export namespace ${ns.name} {`);
    for (const cls of ns.classes || []) {
        lines.push(...formatJsDoc(indent + "    ", cls.doc, cls.deprecated, cls.deprecatedMsg));
        const ext = cls.extends ? ` extends ${cls.extends}` : "";
        const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
        const tp = cls.typeParams ? `<${cls.typeParams}>` : "";
        const abs = cls.abstract ? "abstract " : "";
        lines.push(`${indent}    export ${abs}class ${cls.name}${tp}${ext}${impl} {`);

        for (const p of cls.properties || []) {
            lines.push(...formatJsDoc(`${indent}        `, p.doc, p.deprecated, p.deprecatedMsg));
            const opt = p.optional ? "?" : "";
            const ro = p.readonly ? "readonly " : "";
            const stat = p.static ? "static " : "";
            lines.push(`${indent}        ${stat}${ro}${p.name}${opt}: ${p.type};`);
        }

        for (const sig of cls.indexSignatures || []) {
            const ro = sig.readonly ? "readonly " : "";
            lines.push(`${indent}        ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
        }

        for (const ctor of cls.constructors || []) {
            lines.push(...formatJsDoc(`${indent}        `, undefined, ctor.deprecated, ctor.deprecatedMsg));
            lines.push(`${indent}        constructor(${ctor.sig});`);
        }

        for (const m of cls.methods || []) {
            lines.push(...formatJsDoc(`${indent}        `, m.doc, m.deprecated, m.deprecatedMsg));
            const abs = m.abstract ? "abstract " : "";
            const stat = m.static ? "static " : "";
            const ret = m.ret ? `: ${m.ret}` : "";
            const tp = m.typeParams ? `<${m.typeParams}>` : "";
            lines.push(`${indent}        ${abs}${stat}${m.name}${tp}(${m.sig})${ret};`);
        }

        if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length && !cls.indexSignatures?.length) {
            lines.push(`${indent}        // empty`);
        }

        lines.push(`${indent}    }`);
    }
    for (const iface of ns.interfaces || []) {
        lines.push(...formatJsDoc(indent + "    ", iface.doc, iface.deprecated, iface.deprecatedMsg));
        const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
        const tp = iface.typeParams ? `<${iface.typeParams}>` : "";
        lines.push(`${indent}    export interface ${iface.name}${tp}${ext} {`);
        for (const p of iface.properties || []) {
            lines.push(...formatJsDoc(`${indent}        `, p.doc, p.deprecated, p.deprecatedMsg));
            const opt = p.optional ? "?" : "";
            const ro = p.readonly ? "readonly " : "";
            lines.push(`${indent}        ${ro}${p.name}${opt}: ${p.type};`);
        }
        for (const sig of iface.indexSignatures || []) {
            const ro = sig.readonly ? "readonly " : "";
            lines.push(`${indent}        ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
        }
        for (const cs of iface.callSignatures || []) {
            const ret = cs.ret ? `: ${cs.ret}` : "";
            const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
            lines.push(`${indent}        ${tp}(${cs.sig})${ret};`);
        }
        for (const cs of iface.constructSignatures || []) {
            const ret = cs.ret ? `: ${cs.ret}` : "";
            const tp = cs.typeParams ? `<${cs.typeParams}>` : "";
            lines.push(`${indent}        new ${tp}(${cs.sig})${ret};`);
        }
        for (const m of iface.methods || []) {
            lines.push(...formatJsDoc(`${indent}        `, m.doc, m.deprecated, m.deprecatedMsg));
            const ret = m.ret ? `: ${m.ret}` : "";
            const tp = m.typeParams ? `<${m.typeParams}>` : "";
            lines.push(`${indent}        ${m.name}${tp}(${m.sig})${ret};`);
        }
        lines.push(`${indent}    }`);
    }
    for (const e of ns.enums || []) {
        lines.push(...formatJsDoc(indent + "    ", e.doc, e.deprecated, e.deprecatedMsg));
        const constMod = e.isConst ? "const " : "";
        lines.push(`${indent}    export ${constMod}enum ${e.name} {`);
        lines.push(`${indent}        ${e.values.join(", ")}`);
        lines.push(`${indent}    }`);
    }
    for (const t of ns.types || []) {
        lines.push(...formatJsDoc(indent + "    ", t.doc, t.deprecated, t.deprecatedMsg));
        const tp = t.typeParams ? `<${t.typeParams}>` : "";
        lines.push(`${indent}    export type ${t.name}${tp} = ${t.type};`);
    }
    for (const f of ns.functions || []) {
        lines.push(...formatJsDoc(indent + "    ", f.doc, f.deprecated, f.deprecatedMsg));
        const ret = f.ret ? `: ${f.ret}` : "";
        const tp = f.typeParams ? `<${f.typeParams}>` : "";
        lines.push(`${indent}    export function ${f.name}${tp}(${f.sig})${ret};`);
    }
    for (const sub of ns.namespaces || []) {
        lines.push(...formatNamespaceLines(sub, indent + "    "));
    }
    lines.push(`${indent}}`);
    lines.push("");
    return lines;
}

export function toJson(api: ApiIndex, pretty: boolean = false): string {
    const replacer = (key: string, value: unknown): unknown => {
        if (key === "qualifiedReferencedTypes") return undefined;
        return value;
    };
    return pretty ? JSON.stringify(api, replacer, 2) : JSON.stringify(api, replacer);
}

