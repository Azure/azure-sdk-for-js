// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import path from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";

/**
 * @typedef {{path: string, prefix: string}} ConstantPath
 * @typedef {{["//metadata"]?: {constantPaths?: ConstantPath[]}}} VersionedPackageJson
 */

// This is done to update files which are only periodically generated and
// checked in. Since these files could be generated once between many versions
// we need to make sure that the versions in the generated files move up
// as well
/**
 * @param {string} packagePath
 * @param {VersionedPackageJson} packageJson
 * @param {string} newVersion
 */
export async function updatePackageConstants(packagePath, packageJson, newVersion) {
  const constantPaths = packageJson["//metadata"]?.constantPaths;
  if (!constantPaths) {
    return;
  }

  for (const constantFileSpec of constantPaths) {
    const targetPath = path.join(packagePath, constantFileSpec.path);
    const fileContents = await readFile(targetPath, { encoding: "utf8" });

    const versionExpression = buildSemverRegex(constantFileSpec.prefix);
    const updatedContents = fileContents.replace(versionExpression, `$1${newVersion}`);

    if (updatedContents == fileContents) {
      continue;
    }

    await writeFile(targetPath, updatedContents);
  }
}

/**
 * @param {string} prefix
 */
function buildSemverRegex(prefix) {
  return new RegExp(`(${prefix}.*?)(${semverRegex.toString()})`, "g");
}

/**
 * @param {string} targetPackagePath
 * @param {string} packageName
 * @param {string} repoRoot
 * @param {string} newVersion
 * @param {boolean} unreleased
 * @param {boolean | string} replaceLatestVersionTitle
 * @param {string | null} releaseDate
 * @returns {boolean}
 */
export function updateChangelog(
  targetPackagePath,
  packageName,
  repoRoot,
  newVersion,
  unreleased,
  replaceLatestVersionTitle,
  releaseDate = null,
) {
  const service = path.basename(path.dirname(targetPackagePath));
  const changelogPath = path.join(targetPackagePath, "CHANGELOG.md");
  const updateChangelogPath = path.resolve(
    path.join(repoRoot, "eng/common/scripts/Update-ChangeLog.ps1"),
  );
  let args = [
    updateChangelogPath,
    "--Version",
    newVersion,
    "--ServiceDirectory",
    service,
    "--PackageName",
    packageName,
    "--Unreleased:$" + unreleased,
    "--ReplaceLatestEntryTitle:$" + replaceLatestVersionTitle,
    "--ChangelogPath:" + changelogPath,
  ];
  if (releaseDate != null) {
    args.push("--ReleaseDate:" + releaseDate);
  }

  const child = spawnSync("pwsh", args);
  const out = child.stdout.toString();
  const err = child.stderr.toString();

  if (out != "") {
    console.log(out);
  }

  if (err != "") {
    console.log(err);
  }

  if (child.error) {
    console.error("Child process failed - ", child.error);
    return false;
  }
  if (child.status === 0) {
    return true;
  }
  return false;
}

// This regex is taken from # https://semver.org/#is-there-a-suggested-regular-expression-regex-to-check-a-semver-string
// and adapted to exclude beginning of line (^) and end of line ($) anchors.
const semverRegex = `(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?`;
