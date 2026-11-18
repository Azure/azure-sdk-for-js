// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { copyFileSync, mkdirSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageDir = dirname(fileURLToPath(import.meta.url));
const src = join(packageDir, "src", "common", "ciYamlTemplates");
const dest = join(packageDir, "dist", "common", "ciYamlTemplates");

mkdirSync(dest, { recursive: true });
for (const file of readdirSync(src)) {
  if (file.endsWith(".template.yml")) {
    copyFileSync(join(src, file), join(dest, file));
  }
}
