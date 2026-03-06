// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
    Project,
    SourceFile,
} from "ts-morph";
import * as fs from "fs";
import * as path from "path";
import type { TypeReferenceCollector } from "./type-refs.js";
import type { ExtractionDiagnostic } from "./models.js";

// ============================================================================
// Builtin Type Detection
// ============================================================================

/**
 * Checks if a source file is from TypeScript's default library (lib.*.d.ts)
 * using the compiler's own classification rather than path-based heuristics.
 */
export function isDefaultLibFile(project: Project, sf: SourceFile): boolean {
    try {
        return project.getProgram().compilerObject.isSourceFileDefaultLibrary(sf.compilerNode);
    } catch {
        return false;
    }
}

/**
 * Primitive type names that are always builtins (not resolvable to declarations).
 */
export const PRIMITIVE_TYPES = new Set([
    "string", "number", "boolean", "symbol", "bigint",
    "undefined", "null", "void", "never", "any", "unknown", "object",
]);


export class ExtractionContext {
    /** The ts-morph Project used for this extraction. */
    readonly project: Project;
    /** Collector for external type references found during extraction. */
    typeRefs!: TypeReferenceCollector;
    /** Cache for package.json name lookups by directory. */
    readonly pkgNameCache: Map<string, string | undefined>;
    /** Structured diagnostics collected during extraction. */
    readonly diagnostics: ExtractionDiagnostic[] = [];
    /**
     * Namespace import aliases (e.g., 'coreClient' from `import * as coreClient from "@azure/core-client"`)
     * collected from source files during extraction. Used by stripImportPrefix to remove qualified
     * type references so stubs are self-contained.
     */
    namespaceAliases: Set<string> = new Set();

    /** Lazily-resolved builtin type names from TypeScript lib files. */
    private _discoveredBuiltins: Set<string> | undefined;

    constructor(project: Project) {
        this.project = project;
        this.pkgNameCache = new Map();
    }

    /** Builtin type names discovered from TypeScript lib files (lazily initialized). */
    get discoveredBuiltins(): Set<string> {
        if (!this._discoveredBuiltins) {
            this._discoveredBuiltins = discoverBuiltinTypes(this.project);
        }
        return this._discoveredBuiltins;
    }

    /**
     * Checks if a type name is a language-level builtin using dynamically discovered type names.
     * Builtins are types defined in TypeScript's lib files (Promise, Array, Map, etc.).
     * Note: @types/node types are NOT builtins — they are stdlib dependencies.
     */
    isBuiltinType(typeName: string): boolean {
        if (PRIMITIVE_TYPES.has(typeName)) return true;
        return this.discoveredBuiltins.has(typeName);
    }

    /**
     * Walks up from a file path to find the nearest package.json and reads
     * the "name" field. Results are cached per directory.
     */
    resolvePackageNameFromAncestorPkgJson(filePath: string): string | undefined {
        let dir = path.dirname(filePath);
        const root = path.parse(dir).root;

        while (dir && dir !== root) {
            if (this.pkgNameCache.has(dir)) return this.pkgNameCache.get(dir);

            const pkgPath = path.join(dir, "package.json");
            if (fs.existsSync(pkgPath)) {
                try {
                    const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf-8"));
                    const name: string | undefined = pkg.name;
                    if (name) {
                        this.pkgNameCache.set(dir, name);
                        return name;
                    }
                    // package.json without "name" (e.g. {"type":"commonjs"}) — keep walking up
                } catch {
                    // Malformed JSON — keep walking up
                }
            }
            dir = path.dirname(dir);
        }
        this.pkgNameCache.set(dir, undefined);
        return undefined;
    }

    /** Records a structured diagnostic. */
    warn(code: string, message: string, typeName?: string): void {
        this.diagnostics.push({ level: "warning", code, message, typeName });
    }
}

/**
 * Scans all source files from TypeScript lib to collect
 * every declared interface, class, type alias, enum, and variable name.
 */
function discoverBuiltinTypes(project: Project): Set<string> {
    const builtins = new Set<string>();

    // Collect source files that the TypeScript compiler considers default lib files.
    // When skipAddingFilesFromTsConfig is true, lib files may not be in
    // project.getSourceFiles() but ARE in the compiler program's source files.
    const program = project.getProgram().compilerObject;
    const builtinFiles: SourceFile[] = [];

    // First try project source files
    for (const sf of project.getSourceFiles()) {
        if (isDefaultLibFile(project, sf)) builtinFiles.push(sf);
    }

    // If none found (common when skipAddingFilesFromTsConfig: true), discover
    // from the compiler program's source file list and wrap them.
    if (builtinFiles.length === 0) {
        for (const tsFile of program.getSourceFiles()) {
            if (program.isSourceFileDefaultLibrary(tsFile)) {
                try {
                    let sf = project.getSourceFile(tsFile.fileName);
                    if (!sf) sf = project.addSourceFileAtPath(tsFile.fileName);
                    builtinFiles.push(sf);
                } catch { /* skip unresolvable lib files */ }
            }
        }
    }

    for (const sourceFile of builtinFiles) {
        try {
            for (const iface of sourceFile.getInterfaces()) {
                builtins.add(iface.getName());
            }
            for (const cls of sourceFile.getClasses()) {
                const name = cls.getName();
                if (name) builtins.add(name);
            }
            for (const alias of sourceFile.getTypeAliases()) {
                builtins.add(alias.getName());
            }
            for (const enumDecl of sourceFile.getEnums()) {
                builtins.add(enumDecl.getName());
            }
            // Also collect variable declarations (e.g., "declare var console: Console")
            // which define global objects like JSON, Math, Reflect, Atomics, Intl
            for (const varStmt of sourceFile.getVariableStatements()) {
                for (const decl of varStmt.getDeclarations()) {
                    builtins.add(decl.getName());
                }
            }
        } catch {
            // Skip files that fail to parse (non-fatal)
        }
    }

    return builtins;
}

