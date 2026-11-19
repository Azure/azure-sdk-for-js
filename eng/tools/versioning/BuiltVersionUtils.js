// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import path from "node:path";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { buildSemverRegex } from "./VersionUtils.js";

/**
 * @param {string} directory
 * @returns {Promise<string[]>}
 */
async function outputFiles(directory) {
  try {
    const entries = await readdir(directory, { recursive: true, withFileTypes: true });
    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => path.join(entry.parentPath, entry.name));
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code === "ENOENT") {
      return [];
    }
    throw error;
  }
}

/**
 * @param {string} contents
 * @param {string[]} prefixes
 * @param {string} version
 */
function replaceConstants(contents, prefixes, version) {
  for (const prefix of prefixes) {
    contents = contents.replace(buildSemverRegex(prefix), `$1${version}`);
  }
  return contents;
}

/**
 * Updates only build output, never the tracked sources used to compute build hashes.
 * @param {string} packagePath
 * @param {import("./VersionUtils.js").VersionedPackageJson & {version: string, dependencies?: Record<string, string>}} packageJson
 * @param {string} oldVersion
 */
export async function updateBuiltPackageVersion(packagePath, packageJson, oldVersion) {
  const constants = packageJson["//metadata"]?.constantPaths ?? [];
  const dist = path.join(packagePath, "dist");
  const output = await outputFiles(dist);
  for (const file of output) {
    if (!/\.(?:js|d\.ts)(?:\.map)?$/.test(file)) continue;
    const relative = path.relative(dist, file).split(path.sep).join("/");
    const prefixes = constants
      .filter((constant) => {
        if (!constant.path.startsWith("src/")) return false;
        const stem = constant.path.slice(4).replace(/\.ts$/, "");
        return [".js", ".d.ts", ".js.map", ".d.ts.map"].some(
          (extension) =>
            relative === `${stem}${extension}` || relative.endsWith(`/${stem}${extension}`),
        );
      })
      .map((constant) => constant.prefix);
    const contents = await readFile(file, "utf8");
    let updated = contents;
    if (file.endsWith(".map")) {
      /** @type {{ sourcesContent?: (string | null)[] }} */
      const map = JSON.parse(contents);
      if (map.sourcesContent) {
        const originalSources = map.sourcesContent;
        const sourcesContent = originalSources.map((source) =>
          source === null ? null : replaceConstants(source, prefixes, packageJson.version),
        );
        if (sourcesContent.some((source, index) => source !== originalSources[index])) {
          updated = JSON.stringify({ ...map, sourcesContent });
        }
      }
    } else {
      updated = replaceConstants(contents, prefixes, packageJson.version);
    }
    if (updated !== contents) await writeFile(file, updated);

    // Check named version contexts only, not arbitrary literals that may be dependency versions.
    const guardPrefixes = new Set([
      ...prefixes,
      "\\b(?:SDK_VERSION|SDKVersion|AZURE_MONITOR_OPENTELEMETRY_VERSION)\\b",
      "\\b(?:packageVersion|userAgentInfo|packageDetails)\\s*[:=]",
    ]);
    const guardContents = file.endsWith(".map")
      ? (JSON.parse(updated).sourcesContent ?? []).join("\n")
      : updated;
    for (const prefix of guardPrefixes) {
      if (
        oldVersion !== packageJson.version &&
        [...guardContents.matchAll(buildSemverRegex(prefix))].some(
          (match) => match[2] === oldVersion,
        )
      ) {
        throw new Error(
          `Unpatched version ${oldVersion} in ${file} (${prefix}). Check constantPaths; known metadata gaps are tracked in https://github.com/Azure/azure-sdk-for-js/issues/40867.`,
        );
      }
    }
  }

  for (const file of await outputFiles(path.join(packagePath, "temp"))) {
    if (!file.endsWith(".api.json")) continue;
    const contents = await readFile(file, "utf8");
    const api = JSON.parse(contents);
    if (!api.metadata) throw new Error(`Missing API metadata in ${file}`);
    api.metadata.version = packageJson.version;
    api.metadata.dependencies = packageJson.dependencies ?? {};
    await writeFile(file, JSON.stringify(api, undefined, 2));
  }
}
