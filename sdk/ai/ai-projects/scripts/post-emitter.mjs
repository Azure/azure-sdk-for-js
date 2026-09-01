// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Post-emitter script to fix known issues in newly emitted code under src/.
 *
 * Corrections applied:
 * 1. Removes "azsdk-js-client" and "azsdk-js-api" additions to userAgentPrefix
 * 2. Makes the RealtimeFunctionToolParameters serializer pass through its input
 *    instead of discarding it (see fixRealtimeFunctionToolParametersSerializer)
 * 3. Removes duplicate public type re-exports introduced by overlapping TypeSpec views
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
 * Remove "azsdk-js-client" and "azsdk-js-api" from userAgentPrefix construction.
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
 * Fix 3: Make the RealtimeFunctionToolParameters serializer pass through its input.
 *
 * RealtimeFunctionToolParameters is an intentionally-open, empty-bodied model (the
 * function tool's JSON Schema, whose shape isn't known ahead of time), but the emitter
 * generates a serializer that unconditionally returns `{}` instead of the object being
 * serialized, silently dropping every function tool's `parameters` (used by both
 * VoiceAgentFunctionTool and RealtimeFunctionTool) before it reaches the service. The
 * matching deserializer already does the correct passthrough (`return item;`).
 */
function fixRealtimeFunctionToolParametersSerializer(content) {
  return content.replace(
    'export function realtimeFunctionToolParametersSerializer(\n  _item: RealtimeFunctionToolParameters,\n): any {\n  return {};\n}',
    'export function realtimeFunctionToolParametersSerializer(\n  item: RealtimeFunctionToolParameters,\n): any {\n  return item;\n}',
  );
}

/**
 * Process a single file, applying all fixes. Returns true if the file was modified.
 */
function processFile(filePath) {
  const original = readFileSync(filePath, "utf-8");
  let modified = original;

  modified = fixUserAgentPrefix(modified);
  modified = fixRealtimeFunctionToolParametersSerializer(modified);

  if (modified !== original) {
    writeFileSync(filePath, modified, "utf-8");
    return true;
  }
  return false;
}

/** Remove duplicate public type re-exports introduced by overlapping TypeSpec views. */
function deduplicateTypeExports(content) {
  const seen = new Set();
  return content.replace(/export type \{([\s\S]*?)\} from ("[^"\n]+";)/g, (_match, body, source) => {
    const entries = body
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .filter((entry) => {
        const normalized = entry.replace(/\/\*[\s\S]*?\*\//g, "").trim();
        const exportedName = normalized.split(/\s+as\s+/).at(-1);
        if (!exportedName || seen.has(exportedName)) {
          return false;
        }
        seen.add(exportedName);
        return true;
      });
    return entries.length
      ? `export type {\n  ${entries.join(",\n  ")},\n} from ${source}`
      : "";
  });
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

  for (const relativePath of ["index.ts", "models/index.ts"]) {
    const filePath = join(srcDir, relativePath);
    const original = readFileSync(filePath, "utf8");
    const modified = deduplicateTypeExports(original);
    if (modified !== original) {
      writeFileSync(filePath, modified, "utf8");
      console.log(`  Deduplicated exports: ${relativePath}`);
      modifiedCount++;
    }
  }

  console.log(`\nDone. Modified ${modifiedCount} of ${files.length} file(s).`);
}

main();
