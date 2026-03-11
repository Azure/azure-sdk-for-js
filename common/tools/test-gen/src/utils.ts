// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { access, readFile } from "node:fs/promises";

/** Check whether a file or directory exists at the given path. */
export async function fileExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

/** Read a file if it exists, otherwise return undefined. */
export async function tryReadFile(path: string): Promise<string | undefined> {
  try {
    return await readFile(path, "utf8");
  } catch {
    return undefined;
  }
}

/** Add line numbers to source code. */
export function numberLines(source: string): string {
  return source
    .split("\n")
    .map((line, i) => `${String(i + 1).padStart(4)} | ${line}`)
    .join("\n");
}
