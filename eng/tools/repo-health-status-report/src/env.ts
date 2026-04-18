// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

let cachedBaseDir = undefined;

export function getBaseDir() {
  if (cachedBaseDir === undefined) {
    // path to where this file lives
    const __dirname = dirname(fileURLToPath(import.meta.url));
    cachedBaseDir = resolve(__dirname, "../../../..");
  }
  return cachedBaseDir;
}
