// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Post-emitter script to fix known issues in newly emitted code under src/.
 *
 * Corrections applied:
 * 1. Replaces all occurrences of "api%2Dversion" with "api-version"
 * 2. Removes "azsdk-js-client" and "azsdk-js-api" additions to userAgentPrefix
 *
 * Usage: node scripts/post-emitter.mjs
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, resolve, relative } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const srcDir = resolve(__dirname, "..", "src");

/**
 * Recursively collect all TypeScript files in a directory.
 */
function getAllTsFiles(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllTsFiles(fullPath));
    } else if (entry.isFile() && /\.(ts|mts|cts)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Fix 1: Replace all occurrences of "api%2Dversion" with "api-version".
 *
 * The emitter URL-encodes the hyphen in "api-version" within URL templates
 * and object keys, producing "api%2Dversion" which breaks the API version parameter.
 */
function fixApiVersionEncoding(content) {
  return content.replaceAll("api%2Dversion", "api-version");
}

/**
 * Fix 2: Remove "azsdk-js-client" and "azsdk-js-api" from userAgentPrefix construction.
 *
 * The emitter generates patterns like:
 *   prefixFromOptions ? `${prefixFromOptions} azsdk-js-client` : `azsdk-js-client`
 *   prefixFromOptions ? `${prefixFromOptions} azsdk-js-api ${...}` : `azsdk-js-api ${...}`
 *
 * These should become:
 *   prefixFromOptions ? `${prefixFromOptions}` : ""
 *   prefixFromOptions ? `${prefixFromOptions} ${...}` : `${...}`
 */
function fixUserAgentPrefix(content) {
  // Handle: `${prefixFromOptions} azsdk-js-client` => `${prefixFromOptions}`
  //         `${prefixFromOptions} azsdk-js-api`    => `${prefixFromOptions}`
  content = content.replace(
    /(\$\{[^}]+\}) azsdk-js-(?:client|api)`/g,
    "$1`",
  );

  // Handle: `${prefixFromOptions} azsdk-js-api ${userAgentInfo}` => `${prefixFromOptions} ${userAgentInfo}`
  //         `${prefixFromOptions} azsdk-js-client ${...}`        => `${prefixFromOptions} ${...}`
  content = content.replace(
    /(\$\{[^}]+\}) azsdk-js-(?:client|api) /g,
    "$1 ",
  );

  // Handle standalone: `azsdk-js-client` or `azsdk-js-api` => ""
  content = content.replace(
    /`azsdk-js-(?:client|api)`/g,
    '""',
  );

  // Handle: `azsdk-js-api ${userAgentInfo}` => `${userAgentInfo}`
  //         `azsdk-js-client ${...}`        => `${...}`
  content = content.replace(
    /`azsdk-js-(?:client|api) /g,
    "`",
  );

  return content;
}

/**
 * Process a single file, applying all fixes. Returns true if the file was modified.
 */
function processFile(filePath) {
  const original = readFileSync(filePath, "utf-8");
  let modified = original;

  modified = fixApiVersionEncoding(modified);
  modified = fixUserAgentPrefix(modified);

  if (modified !== original) {
    writeFileSync(filePath, modified, "utf-8");
    return true;
  }
  return false;
}

function main() {
  console.log(`Running post-emitter fixes on: ${srcDir}`);
  const files = getAllTsFiles(srcDir);
  let modifiedCount = 0;

  for (const file of files) {
    const relativePath = relative(srcDir, file);
    if (processFile(file)) {
      console.log(`  Fixed: ${relativePath}`);
      modifiedCount++;
    }
  }

  console.log(`\nDone. Modified ${modifiedCount} of ${files.length} file(s).`);
}

main();
