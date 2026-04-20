// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// ============================================================================
// Shared Exports Field Resolution
// ============================================================================
//
// Centralizes the recursive walking of package.json `exports` fields.
// Used by both entry-points.ts (target package) and dependencies.ts
// (dependency packages) to avoid duplicated object-walking logic.

/**
 * A terminal entry resolved from walking a package.json `exports` field.
 * Each entry represents a single string value found at the leaves of the
 * (potentially nested) exports object.
 */
export interface ResolvedExportEntry {
    /** The export subpath (e.g., "." or "./client") */
    exportPath: string;
    /** Ordered chain of condition keys traversed to reach this value, e.g. ["import", "types"] */
    conditionChain: string[];
    /** The terminal file path string from the exports field */
    filePath: string;
}

/** Default maximum recursion depth for exports field walking. */
const DEFAULT_MAX_DEPTH = 10;

/**
 * Recursively walks a package.json `exports` field and returns all terminal
 * string values along with their export subpath and full condition chain.
 *
 * Handles all valid exports shapes:
 * - **String**: `"exports": "./index.js"` → single root export
 * - **Object with subpath keys**: `{ ".": "...", "./foo": "..." }`
 * - **Object with condition keys**: `{ "import": "...", "require": "..." }`
 * - **Nested conditionals**: `{ "import": { "types": "...", "default": "..." } }`
 * - **Arrays**: `["./a.js", "./b.js"]` → each element is visited
 * - **null / excluded**: skipped (treated as "this export does not exist")
 *
 * Keys starting with `"."` are treated as subpath keys; all others are
 * treated as condition keys appended to the condition chain.
 *
 * @param exportsField - The `exports` value from package.json
 * @param maxDepth - Maximum recursion depth (default: 10)
 * @returns Array of resolved terminal entries
 */
export function resolveExports(
    exportsField: unknown,
    maxDepth: number = DEFAULT_MAX_DEPTH,
): ResolvedExportEntry[] {
    if (typeof exportsField === "string") {
        return [{ exportPath: ".", conditionChain: [], filePath: exportsField }];
    }

    if (typeof exportsField !== "object" || exportsField === null) {
        return [];
    }

    const results: ResolvedExportEntry[] = [];
    const visited = new Set<unknown>();

    function visit(value: unknown, exportPath: string, conditions: string[], depth: number): void {
        if (depth > maxDepth) return;

        // Cycle detection for object references
        if (typeof value === "object" && value !== null) {
            if (visited.has(value)) return;
            visited.add(value);
        }

        // Terminal string → record as a resolved entry
        if (typeof value === "string") {
            results.push({
                exportPath,
                conditionChain: [...conditions],
                filePath: value,
            });
            return;
        }

        // null/undefined/non-object → excluded or invalid, skip
        if (value === null || value === undefined || typeof value !== "object") return;

        // Array → visit each element (Node.js uses first match, but we collect all)
        if (Array.isArray(value)) {
            for (const item of value) {
                visit(item, exportPath, conditions, depth + 1);
            }
            return;
        }

        const obj = value as Record<string, unknown>;
        for (const [key, nested] of Object.entries(obj)) {
            if (key.startsWith(".")) {
                // Subpath key — starts a new export path
                visit(nested, key, conditions, depth + 1);
            } else {
                // Condition key — appended to the chain
                visit(nested, exportPath, [...conditions, key], depth + 1);
            }
        }
    }

    visit(exportsField, ".", [], 0);
    return results;
}

/**
 * Finds the "." (root) export from a package.json exports object.
 *
 * Handles two common layouts:
 * 1. Direct `"."` key: `{ ".": { ... }, "./foo": { ... } }` → returns value of `"."`
 * 2. Flat condition map (no subpath keys): `{ "import": "...", "require": "..." }` →
 *    the entire object IS the root export's condition map
 *
 * Returns `undefined` if the exports object has subpath keys but no `"."`.
 */
export function findDotExport(exports: Record<string, unknown>): unknown {
    if ("." in exports) return exports["."];
    const hasSubpaths = Object.keys(exports).some(k => k.startsWith("."));
    if (!hasSubpaths) return exports;
    return undefined;
}

/**
 * Finds a specific subpath export from a package.json exports object.
 * For `"."` delegates to {@link findDotExport}; otherwise looks up the
 * subpath key directly (e.g., `"./policies"` → `exports["./policies"]`).
 */
export function findSubpathExport(exports: Record<string, unknown>, subpath: string): unknown {
    if (subpath === ".") return findDotExport(exports);
    return exports[subpath];
}

/**
 * Returns `true` when the package.json `exports` field contains subpath keys
 * other than `"."` (e.g., `"./policies"`, `"./browser"`).
 */
export function hasNonRootSubpaths(exports: Record<string, unknown>): boolean {
    return Object.keys(exports).some(k => k.startsWith("./"));
}
