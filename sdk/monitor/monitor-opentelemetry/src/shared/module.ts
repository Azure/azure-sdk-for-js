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
 */
export function loadAzureFunctionCore(): ReturnType<typeof require> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore ESM only output
  return createRequire(import.meta.url)("@azure/functions-core");
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
