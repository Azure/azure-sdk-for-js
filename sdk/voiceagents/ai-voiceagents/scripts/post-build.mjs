// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const platformImport = "#platform/webSocketTransport";
const outputs = [
  ["../dist/commonjs/package.json", "./streaming/webSocketTransport.js"],
  ["../dist/esm/package.json", "./streaming/webSocketTransport.js"],
  ["../dist/browser/package.json", "./streaming/webSocketTransport-browser.mjs"],
];

for (const [relativePath, target] of outputs) {
  const packagePath = fileURLToPath(new URL(relativePath, import.meta.url));
  const packageJson = JSON.parse(await readFile(packagePath, "utf8"));
  packageJson.imports = { ...packageJson.imports, [platformImport]: target };
  await writeFile(packagePath, `${JSON.stringify(packageJson, undefined, 2)}\n`);
}
