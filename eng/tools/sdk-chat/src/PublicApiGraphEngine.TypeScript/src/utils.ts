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
