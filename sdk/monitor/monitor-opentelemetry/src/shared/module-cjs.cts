// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// Provides CommonJS-specific implementation for various functions
// As per https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills
// Encapsulating the ESM / CommonJS specific implementation as needed.

/**
 * A CommonJS module loader for Azure Function Core.
 */
export function loadAzureFunctionCore(): ReturnType<typeof require> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("@azure/functions-core");
  } catch (e) {
    // Module not found, this is expected in non-Azure Functions environments
    return undefined;
  }
}

/**
 * A polyfill for __dirname in CommonJS
 * @returns The directory name of the current module.
 */
export function dirName(): string {
  return __dirname;
}

/**
 * Returns a file URL for the current module for loader registration scenarios.
 * Used by the instrumentation loader to register Node.js module hooks.
 * @internal
 */
export function getModuleParentURL(): string | undefined {
  try {
    // Convert __filename to a file URL for consistency with ESM
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { pathToFileURL }: typeof import("node:url") = require("node:url");
    return pathToFileURL(__filename).href;
  } catch {
    // node:url not available
    return undefined;
  }
}
