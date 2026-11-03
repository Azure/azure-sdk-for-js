// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createRequire } from "node:module";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// Provides ESM-specific implementation for various functions
// As per https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills
// Encapsulating the ESM / CommonJS specific implementation as needed.

/**
 * An ESM module loader for Azure Function Core.
 * @returns The Azure Functions Core module if it exists, otherwise undefined
 */
export function loadAzureFunctionCore(): ReturnType<typeof require> {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore ESM only output
    return createRequire(import.meta.url)("@azure/functions-core");
  } catch (e) {
    // Module not found, this is expected in non-Azure Functions environments
    return undefined;
  }
}

/**
 * A polyfill for __dirname in ESM.
 *
 * @returns The directory name of the current module.
 */
export function dirName(): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ESM only output
  return dirname(fileURLToPath(import.meta.url));
}

/**
 * Returns the current module URL for loader registration scenarios.
 * Used by the instrumentation loader to register Node.js module hooks.
 * @internal
 */
export function getModuleParentURL(): string {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ESM only output
  return import.meta.url;
}
