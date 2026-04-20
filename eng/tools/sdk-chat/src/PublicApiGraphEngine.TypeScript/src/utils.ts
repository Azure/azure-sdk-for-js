// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Canonicalize a module specifier to its package root.
 * `"@azure/core-client/types"` → `"@azure/core-client"`
 * `"openai/resources"`         → `"openai"`
 * `"openai"`                   → `"openai"`
 */
export function getPackageRoot(specifier: string): string {
    if (specifier.startsWith("@")) {
        const parts = specifier.split("/");
        return parts.length >= 2 ? `${parts[0]}/${parts[1]}` : specifier;
    }
    return specifier.split("/")[0];
}

/**
 * Extract the import subpath from a module specifier relative to the package root.
 * `"@azure/core-client/types"` → `"./types"`
 * `"openai/resources"`         → `"./resources"`
 * `"openai"`                   → `"."`
 */
export function getImportSubpath(specifier: string): string {
    const root = getPackageRoot(specifier);
    if (specifier === root) return ".";
    return "." + specifier.slice(root.length);
}
