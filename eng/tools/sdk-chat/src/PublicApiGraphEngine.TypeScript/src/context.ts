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

/** Well-known DOM type names for heuristic classification. */
const DOM_TYPE_NAMES = new Set([
    "AbortSignal", "ReadableStream", "WritableStream",
    "EventTarget", "EventListener", "Event", "EventInit",
    "Blob", "File", "FormData", "Headers", "Request", "Response",
    "URL", "URLSearchParams", "TextEncoder", "TextDecoder",
    "ReadableStreamDefaultReader", "WritableStreamDefaultWriter",
    "Audio", "Image", "WebSocket", "Worker", "MessagePort",
    "ReadableStreamDefaultController", "TransformStream",
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

    /**
     * Package names of the main package's direct production dependencies.
     * Used by the collision detector to avoid pulling in transitive deps
     * (e.g., undici via openai) when a type name collides with a builtin.
     * Populated by `extractPackage()` after reading the main package's package.json.
     */
    directDependencies: Set<string> = new Set();

    /**
     * Builtin type names actually referenced (and skipped) during extraction,
     * keyed by category: "dom", "es", or "node".
     * Populated by type-refs.ts when a builtin type is encountered.
     */
    referencedBuiltins: Map<string, Set<string>> = new Map();

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
     * Records a builtin type name as referenced, categorized by lib source.
     * Called by type-refs when a builtin is encountered and skipped.
     */
    trackReferencedBuiltin(typeName: string, symbol?: { getDeclarations?(): { getSourceFile(): SourceFile }[] }): void {
        if (PRIMITIVE_TYPES.has(typeName)) return;
        const category = this.classifyBuiltinSource(typeName, symbol);
        let set = this.referencedBuiltins.get(category);
        if (!set) {
            set = new Set();
            this.referencedBuiltins.set(category, set);
        }
        set.add(typeName);
    }

    /**
     * Classifies a builtin type by its lib source: "dom", "es", or "node".
     */
    private classifyBuiltinSource(typeName: string, symbol?: { getDeclarations?(): { getSourceFile(): SourceFile }[] }): string {
        try {
            const decls = symbol?.getDeclarations?.();
            if (decls && decls.length > 0) {
                const filePath = decls[0].getSourceFile().getFilePath().toLowerCase();
                const fileName = filePath.split("/").pop() ?? "";
                if (fileName.includes("lib.dom") || fileName.includes("lib.webworker")) return "dom";
                if (fileName.includes("lib.es") || fileName.includes("lib.scripthost")) return "es";
            }
        } catch { /* fall through to heuristic */ }
        // Heuristic fallback based on well-known DOM type names
        if (DOM_TYPE_NAMES.has(typeName)) return "dom";
        return "es";
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
 * every declared interface, class, type alias, and enum name.
 *
 * NOTE: Variable declarations (e.g., `declare var Audio`, `declare var Image`)
 * are intentionally excluded. DOM globals like Audio and Image are declared as
 * `declare var` with constructor signatures but have NO corresponding interface
 * or class declaration. Including them causes false positives: when a package
 * exports a type with the same name (e.g., openai's `Audio` class), the type
 * reference resolver incorrectly classifies it as a builtin and skips it.
 *
 * Legitimate global objects that are also used as types (JSON, Math, Array, etc.)
 * always have matching interface declarations, so they are still captured.
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
        } catch {
            // Skip files that fail to parse (non-fatal)
        }
    }

    return builtins;
}

