// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import path from "node:path";
import process from "node:process";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { buildSemverRegex } from "./VersionUtils.js";

/**
 * Named contexts that hold a package's own version in SDK sources. These are the prefixes used by
 * `//metadata.constantPaths` across the repository (excluding the generic `version`). A match is
 * only rewritten when the version is exactly the package's own pre-rewrite version, so dependency
 * versions that happen to appear in the same line (for example in a user agent) are left alone.
 */
export const versionContexts = [
  "\\bSDK_VERSION\\b",
  "\\bSDKVersion\\b",
  "\\bAZURE_MONITOR_OPENTELEMETRY_VERSION\\b",
  "\\bpackageVersion\\b",
  "\\buserAgentInfo\\b",
  "\\bpackageDetails\\b",
];

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
 * @param {string} message
 */
function warn(message) {
  console.warn(process.env.TF_BUILD ? `##vso[task.logissue type=warning]${message}` : message);
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
 * @param {string} file
 * @param {string} contents
 * @returns {string[]}
 */
function texts(file, contents) {
  if (!file.endsWith(".map")) {
    return [contents];
  }
  return (JSON.parse(contents).sourcesContent ?? []).filter(
    /** @param {string | null} s */ (s) => s !== null,
  );
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
  const name = packageJson.name ?? packagePath;
  const constants = packageJson["//metadata"]?.constantPaths ?? [];
  const dist = path.join(packagePath, "dist");
  const oldLiteral = new RegExp(
    `(?<![0-9A-Za-z.+-])${escapeRegex(oldVersion)}(?![0-9A-Za-z.+-])`,
    "g",
  );

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

    const contents = await readFile(file, "utf8");
    // Same replacement as updatePackageConstants for configured constants.
    const configured = transform(file, contents, (text) =>
      prefixes.reduce(
        (result, prefix) => result.replace(buildSemverRegex(prefix), `$1${newVersion}`),
        text,
      ),
    );
    // Named version contexts pinned to this package's own version, including ones missing from
    // constantPaths (see https://github.com/Azure/azure-sdk-for-js/issues/40867).
    const updated = transform(file, configured, (text) =>
      versionContexts.reduce(
        (result, context) =>
          result.replace(buildSemverRegex(context), (match, before, version) =>
            version === oldVersion ? `${before}${newVersion}` : match,
          ),
        text,
      ),
    );
    if (updated !== configured && !file.endsWith(".map")) {
      warn(
        `${name}: patched version ${oldVersion} in ${relative}, which is not covered by //metadata.constantPaths. Add its source to constantPaths so increment-version keeps it in sync.`,
      );
    }
    if (updated !== contents) await writeFile(file, updated);

    // Remaining occurrences may legitimately be unrelated versions, so report rather than fail.
    for (const text of texts(file, updated)) {
      for (const line of text.split("\n")) {
        if (line.match(oldLiteral)) {
          warn(
            `${name}: ${relative} still contains ${oldVersion} outside a known version context: ${line.trim().slice(0, 200)}`,
          );
        }
      }
    }
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
