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
} from "./models.js";

const _nsAliasRegexCache = new Map<string, RegExp>();

/**
 * Internal: Strips compiler-generated `import("…")` qualifiers from type text.
 * Used by `displayType()` and `baseTypeName()`.
 *
 *   import("./path").TypeName         → TypeName
 *   import("./path").Foo<import("./p").Bar> → Foo<Bar>
 *   typeof import("./path")           → typeof path-last-segment
 *
 * When `baseOnly` is true, also strips generic parameters.
 */
export function stripImportPrefix(text: string, baseOnly = false, namespaceAliases?: Set<string>): string {
    let result = text;
    if (result.includes("import(")) {
        // Strip import("..."). (with trailing dot) leaving what follows
        result = result.replace(/import\([^)]+\)\./g, "");
        // typeof import("path") → typeof <last-segment>
        result = result.replace(/typeof\s+import\(["']([^"']+)["']\)/g, (_, p: string) => {
            const seg = p.split("/");
            return `typeof ${seg[seg.length - 1]}`;
        });
        // Bare import("path") → last-segment
        result = result.replace(/import\(["']([^"']+)["']\)/g, (_, p: string) => {
            const seg = p.split("/");
            return seg[seg.length - 1];
        });
    }
    // Strip namespace import qualifiers (e.g., coreClient.OperationOptions → OperationOptions).
    // These come from `import * as coreClient from "@azure/core-client"` in source files.
    // The underlying types are already tracked as dependencies; we just need the unqualified name.
    if (namespaceAliases && namespaceAliases.size > 0) {
        for (const alias of namespaceAliases) {
            if (result.includes(`${alias}.`)) {
                let re = _nsAliasRegexCache.get(alias);
                if (!re) {
                    re = new RegExp(`\\b${alias}\\.`, "g");
                    _nsAliasRegexCache.set(alias, re);
                }
                re.lastIndex = 0;
                result = result.replace(re, "");
            }
        }
    }
    if (baseOnly) {
        const idx = result.indexOf("<");
        return (idx >= 0 ? result.slice(0, idx) : result).trim();
    }
    return result;
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

    // Group modules by condition to emit each as a separate declare module block.
    // This prevents type collisions when multiple conditions declare the same name
    // (e.g., AzureCliCredential in both default and browser conditions).
    const conditionGroups = new Map<string, ModuleInfo[]>();
    for (const module of api.modules) {
        const cond = module.condition ?? "(unconditioned)";
        if (!conditionGroups.has(cond)) conditionGroups.set(cond, []);
        conditionGroups.get(cond)!.push(module);
    }

    // Sort conditions: "default" first, then alphabetically
    const sortedConditions = [...conditionGroups.keys()].sort((a, b) => {
        if (a === "default") return -1;
        if (b === "default") return 1;
        return a.localeCompare(b);
    });

    const needsModuleBlocks = sortedConditions.length > 1;

    for (const condition of sortedConditions) {
        const modules = conditionGroups.get(condition)!;

        if (needsModuleBlocks) {
            lines.push(`declare module "${api.package}/${condition}" {`);
            lines.push("");
        }

        const indent = needsModuleBlocks ? "    " : "";

        for (const module of modules) {
            lines.push(`${indent}// Module: ${module.name}`);
            lines.push("");

            // Functions
            for (const fn of module.functions || []) {
                if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
                const async = fn.async ? "async " : "";
                const ret = fn.ret ? `: ${fn.ret}` : "";
                lines.push(`${indent}export ${async}function ${fn.name}(${fn.sig})${ret};`);
                lines.push("");
            }

            // Type aliases
            for (const t of module.types || []) {
                if (t.doc) lines.push(`${indent}/** ${t.doc} */`);
                lines.push(`${indent}export type ${t.name} = ${t.type};`);
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

                for (const m of iface.methods || []) {
                    const async = m.async ? "async " : "";
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${async}${m.name}(${m.sig})${ret};`);
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
                    const async = m.async ? "async " : "";
                    const stat = m.static ? "static " : "";
                    const ret = m.ret ? `: ${m.ret}` : "";
                    lines.push(`${indent}    ${stat}${async}${m.name}(${m.sig})${ret};`);
                }

                if (!cls.properties?.length && !cls.constructors?.length && !cls.methods?.length) {
                    lines.push(`${indent}    // empty`);
                }

                lines.push(`${indent}}`);
                lines.push("");
            }
        }

        if (needsModuleBlocks) {
            lines.push("}");
            lines.push("");
        }
    }

    // Add dependency types if present, each wrapped in a declare module block
    if (api.dependencies && api.dependencies.length > 0) {
        lines.push("");
        lines.push("// ============================================================================");
        lines.push("// Dependencies");
        lines.push("// ============================================================================");

        for (const dep of api.dependencies) {
            if (dep.isNode) {
                // Emit @types/node types as simple import references
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
            lines.push("");
            lines.push(`declare module "${dep.package}" {`);
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
                lines.push(`${indent}export type ${t.name} = ${t.type};`);
                lines.push("");
            }

            // Functions
            for (const fn of dep.functions || []) {
                if (fn.doc) lines.push(`${indent}/** ${fn.doc} */`);
                const async = fn.async ? "async " : "";
                const ret = fn.ret ? `: ${fn.ret}` : "";
                const typeParams = fn.typeParams ? `<${fn.typeParams}>` : "";
                lines.push(`${indent}export ${async}function ${fn.name}${typeParams}(${fn.sig})${ret};`);
                lines.push("");
            }

            lines.push("}");
        }
    }

    return lines.join("\n");
}

export function toJson(api: ApiIndex, pretty: boolean = false): string {
    return pretty ? JSON.stringify(api, null, 2) : JSON.stringify(api);
}

