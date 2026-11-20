// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import path from "node:path";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { buildSemverRegex } from "./VersionUtils.js";

const compiledOutput = /\.(?:[cm]?js|d\.[cm]?ts)(?:\.map)?$/;

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
 * @param {string} value
 */
function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Applies `fn` to a compiled file, or to each embedded source of a source map.
 * @param {string} file
 * @param {string} contents
 * @param {(text: string) => string} fn
 */
function transform(file, contents, fn) {
  if (!file.endsWith(".map")) {
    return fn(contents);
  }
  /** @type {{ sourcesContent?: (string | null)[] }} */
  const map = JSON.parse(contents);
  if (!map.sourcesContent) {
    return contents;
  }
  const original = map.sourcesContent;
  const sourcesContent = original.map((source) => (source === null ? null : fn(source)));
  return sourcesContent.some((source, index) => source !== original[index])
    ? JSON.stringify({ ...map, sourcesContent })
    : contents;
}

/**
 * Updates only build output, never the tracked sources used to compute build hashes.
 * @param {string} packagePath
 * @param {import("./VersionUtils.js").VersionedPackageJson & {name?: string, version: string, dependencies?: Record<string, string>}} packageJson
 * @param {string} oldVersion
 */
export async function updateBuiltPackageVersion(packagePath, packageJson, oldVersion) {
  const newVersion = packageJson.version;
  if (oldVersion === newVersion) {
    return;
  }
  const constants = packageJson["//metadata"]?.constantPaths ?? [];
  const dist = path.join(packagePath, "dist");

  for (const file of await outputFiles(dist)) {
    // Build tools emit per-runtime package.json files (for example dist/esm/package.json) that
    // carry the package name and version.
    if (path.basename(file) === "package.json") {
      const contents = await readFile(file, "utf8");
      const manifest = JSON.parse(contents);
      if (manifest.name === packageJson.name && manifest.version === oldVersion) {
        await writeFile(
          file,
          contents.replace(
            new RegExp(`("version"\\s*:\\s*")${escapeRegex(oldVersion)}"`),
            `$1${newVersion}"`,
          ),
        );
      }
      continue;
    }
    if (!compiledOutput.test(file)) continue;
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
    if (prefixes.length === 0) continue;

    const contents = await readFile(file, "utf8");
    // Same replacement as updatePackageConstants for configured constants.
    const updated = transform(file, contents, (text) =>
      prefixes.reduce(
        (result, prefix) => result.replace(buildSemverRegex(prefix), `$1${newVersion}`),
        text,
      ),
    );
    if (updated !== contents) await writeFile(file, updated);
  }

  for (const file of await outputFiles(path.join(packagePath, "temp"))) {
    if (!file.endsWith(".api.json")) continue;
    const api = JSON.parse(await readFile(file, "utf8"));
    if (!api.metadata) throw new Error(`Missing API metadata in ${file}`);
    api.metadata.version = newVersion;
    api.metadata.dependencies = packageJson.dependencies ?? {};
    await writeFile(file, JSON.stringify(api, undefined, 2));
  }
}
