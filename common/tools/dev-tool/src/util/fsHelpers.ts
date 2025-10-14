// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { access, constants } from "node:fs/promises";

/**
 * Check if a file or directory exists at the given path.
 * This is a replacement for fs-extra's pathExists method.
 *
 * @param path - The path to check
 * @returns A promise that resolves to true if the path exists, false otherwise
 */
export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}
