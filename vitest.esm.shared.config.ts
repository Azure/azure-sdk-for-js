// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  test: {
    alias: generateSrcAliases(5, resolve("./dist/esm")),
  },
});

function generateSrcAliases(maxDepth: number, targetPath: string) {
  const aliases = [];
  for (let depth = 1; depth <= maxDepth; depth++) {
    const relativePath = "../".repeat(depth) + "src";
    aliases.push({
      find: relativePath,
      replacement: targetPath,
    });
  }
  return aliases;
}
