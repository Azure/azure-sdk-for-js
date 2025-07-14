// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { readFileSync, writeFileSync } from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

const FIXES = [
  { pattern: /\/\/\s*FIX:\s*import\s+("@azure\/openai\/types");/g, replacement: "import $1;" },
];

const snippetsFile = join(__dirname, "..", "README.md");
let snippetsFileContent = readFileSync(snippetsFile, "utf-8");
for (const { pattern, replacement } of FIXES) {
  snippetsFileContent = snippetsFileContent.replace(pattern, replacement);
}
writeFileSync(snippetsFile, snippetsFileContent, "utf-8");
console.log(`\x1b[33mUpdated ${snippetsFile} with fixes.\x1b[0m`);
