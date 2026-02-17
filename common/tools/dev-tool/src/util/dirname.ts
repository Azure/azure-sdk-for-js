// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Get the directory name of a module using import.meta.url.
 * This is the ESM equivalent of __dirname.
 *
 * @param importMetaUrl - The import.meta.url of the calling module
 * @returns The directory path of the module
 *
 * @example
 * ```typescript
 * import { getDirname } from "./util/dirname.ts";
 * const __dirname = getDirname(import.meta.url);
 * ```
 */
export function getDirname(importMetaUrl: string): string {
  return dirname(fileURLToPath(importMetaUrl));
}

/**
 * Get the file name of a module using import.meta.url.
 * This is the ESM equivalent of __filename.
 *
 * @param importMetaUrl - The import.meta.url of the calling module
 * @returns The file path of the module
 *
 * @example
 * ```typescript
 * import { getFilename } from "./util/dirname.ts";
 * const __filename = getFilename(import.meta.url);
 * ```
 */
export function getFilename(importMetaUrl: string): string {
  return fileURLToPath(importMetaUrl);
}
