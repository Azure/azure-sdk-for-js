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

    const needsModuleBlocks = sortedKeys.length > 1;

    for (const key of sortedKeys) {
        const [exportPath, condition] = key.split("\0");
        const modules = moduleGroups.get(key)!;

        if (needsModuleBlocks) {
            const moduleName = exportPath && exportPath !== "."
                ? `${api.package}/${exportPath.replace(/^\.\//, "")}`
                : api.package;
            lines.push(`// Condition: ${condition}`);
            lines.push(`declare module "${moduleName}" {`);
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

            for (const key of depSortedKeys) {
                const [exportPath, condition] = key.split("\0");
                const modules = depModuleGroups.get(key)!;

                const depModuleSpecifier = exportPath && exportPath !== "."
                    ? `${depApi.package}/${exportPath.replace(/^\.\//, "")}`
                    : depApi.package;

                const bodyLines = formatGroupBody(modules, "    ");
                if (bodyLines.length > 0) {
                    lines.push("");
                    if (depSortedKeys.length > 1) {
                        lines.push(`// Condition: ${condition}`);
                    }
                    lines.push(`declare module "${depModuleSpecifier}" {`);
                    lines.push("");
                    lines.push(...bodyLines);
                    lines.push("}");
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
                if (iface.doc) lines.push(`${indent}/** ${iface.doc} */`);
                const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
                const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
                lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

                for (const prop of iface.properties || []) {
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
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${m.name}(${m.sig})${ret};`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Classes
            for (const cls of dep.classes || []) {
                if (cls.doc) lines.push(`${indent}/** ${cls.doc} */`);
                const ext = cls.extends ? ` extends ${cls.extends}` : "";
                const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
                lines.push(`${indent}export class ${cls.name}${typeParams}${ext} {`);

                for (const prop of cls.properties || []) {
                    const opt = prop.optional ? "?" : "";
                    const ro = prop.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
                }

                for (const sig of cls.indexSignatures || []) {
                    const ro = sig.readonly ? "readonly " : "";
                    lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
                }

                for (const m of cls.methods || []) {
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${m.name}(${m.sig})${ret};`);
                }

                if (!cls.properties?.length && !cls.methods?.length) {
                    lines.push(`${indent}    // empty`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }

            // Enums
            for (const e of dep.enums || []) {
                if (e.doc) lines.push(`${indent}/** ${e.doc} */`);
                lines.push(`${indent}export enum ${e.name} {`);
                lines.push(`${indent}    ${e.values.join(", ")}`);
                lines.push(`${indent}}`);
                lines.push("");
            }

            // Type aliases
            for (const t of dep.types || []) {
                if (t.doc) lines.push(`${indent}/** ${t.doc} */`);
                const typeParams = t.typeParams ? `<${t.typeParams}>` : "";
                lines.push(`${indent}export type ${t.name}${typeParams} = ${t.type};`);
                lines.push("");
            }

            // Functions
            for (const fn of dep.functions || []) {
                if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
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
            if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
            const ret = fn.ret ? `: ${fn.ret}` : "";
            const typeParams = fn.typeParams ? `<${fn.typeParams}>` : "";
            lines.push(`${indent}export function ${fn.name}${typeParams}(${fn.sig})${ret};`);
            lines.push("");
        }

        // Type aliases
        for (const t of module.types || []) {
            if (t.doc) lines.push(`${indent}/** ${t.doc} */`);
            const typeParams = t.typeParams ? `<${t.typeParams}>` : "";
            lines.push(`${indent}export type ${t.name}${typeParams} = ${t.type};`);
            lines.push("");
        }

        // Enums
        for (const e of module.enums || []) {
            if (e.doc) lines.push(`${indent}/** ${e.doc} */`);
            lines.push(`${indent}export enum ${e.name} {`);
            lines.push(`${indent}    ${e.values.join(", ")}`);
            lines.push(`${indent}}`);
            lines.push("");
        }

        // Interfaces
        for (const iface of module.interfaces || []) {
            if (iface.doc) lines.push(`${indent}/** ${iface.doc} */`);
            const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
            const typeParams = iface.typeParams ? `<${iface.typeParams}>` : "";
            lines.push(`${indent}export interface ${iface.name}${typeParams}${ext} {`);

            for (const prop of iface.properties || []) {
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
                const ret = m.ret ? `: ${m.ret}` : "";
                lines.push(`${indent}    ${m.name}(${m.sig})${ret};`);
            }

            lines.push(`${indent}}`);
            lines.push("");
        }

        // Classes
        for (const cls of module.classes || []) {
            if (cls.doc) lines.push(`${indent}/** ${cls.doc} */`);
            const ext = cls.extends ? ` extends ${cls.extends}` : "";
            const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
            const typeParams = cls.typeParams ? `<${cls.typeParams}>` : "";
            lines.push(`${indent}export class ${cls.name}${typeParams}${ext}${impl} {`);

            for (const prop of cls.properties || []) {
                const opt = prop.optional ? "?" : "";
                const ro = prop.readonly ? "readonly " : "";
                lines.push(`${indent}    ${ro}${prop.name}${opt}: ${prop.type};`);
            }

            for (const sig of cls.indexSignatures || []) {
                const ro = sig.readonly ? "readonly " : "";
                lines.push(`${indent}    ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
            }

            for (const ctor of cls.constructors || []) {
                lines.push(`${indent}    constructor(${ctor.sig});`);
            }

            for (const m of cls.methods || []) {
                const stat = m.static ? "static " : "";
                const ret = m.ret ? `: ${m.ret}` : "";
                lines.push(`${indent}    ${stat}${m.name}(${m.sig})${ret};`);
            }

            if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length) {
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
        const ext = cls.extends ? ` extends ${cls.extends}` : "";
        const impl = cls.implements?.length ? ` implements ${cls.implements.join(", ")}` : "";
        const tp = cls.typeParams ? `<${cls.typeParams}>` : "";
        lines.push(`${indent}    export class ${cls.name}${tp}${ext}${impl} {`);

        for (const p of cls.properties || []) {
            const opt = p.optional ? "?" : "";
            const ro = p.readonly ? "readonly " : "";
            lines.push(`${indent}        ${ro}${p.name}${opt}: ${p.type};`);
        }

        for (const sig of cls.indexSignatures || []) {
            const ro = sig.readonly ? "readonly " : "";
            lines.push(`${indent}        ${ro}[${sig.keyName}: ${sig.keyType}]: ${sig.valueType};`);
        }

        for (const ctor of cls.constructors || []) {
            lines.push(`${indent}        constructor(${ctor.sig});`);
        }

        for (const m of cls.methods || []) {
            const stat = m.static ? "static " : "";
            const ret = m.ret ? `: ${m.ret}` : "";
            lines.push(`${indent}        ${stat}${m.name}(${m.sig})${ret};`);
        }

        if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length) {
            lines.push(`${indent}        // empty`);
        }

        lines.push(`${indent}    }`);
    }
    for (const iface of ns.interfaces || []) {
        const ext = iface.extends?.length ? ` extends ${iface.extends.join(", ")}` : "";
        const tp = iface.typeParams ? `<${iface.typeParams}>` : "";
        lines.push(`${indent}    export interface ${iface.name}${tp}${ext} {`);
        for (const p of iface.properties || []) {
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
            const ret = m.ret ? `: ${m.ret}` : "";
            lines.push(`${indent}        ${m.name}(${m.sig})${ret};`);
        }
        lines.push(`${indent}    }`);
    }
    for (const e of ns.enums || []) {
        lines.push(`${indent}    export enum ${e.name} {`);
        lines.push(`${indent}        ${e.values.join(", ")}`);
        lines.push(`${indent}    }`);
    }
    for (const t of ns.types || []) {
        const tp = t.typeParams ? `<${t.typeParams}>` : "";
        lines.push(`${indent}    export type ${t.name}${tp} = ${t.type};`);
    }
    for (const f of ns.functions || []) {
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

