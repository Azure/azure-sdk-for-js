// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// @ts-check

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import json5 from "json5";
import { findPackages } from "@pnpm/fs.find-packages";

/**
 * @typedef {Awaited<ReturnType<typeof findPackages>>[number]["manifest"]} PackageManifest
 * @typedef {{src: string, json: PackageManifest, versionPolicy: string, projectFolder: string, newVer: string | undefined}} RepoPackage
 */

/**
 * @param {string} filename - file to read from
 */
export async function readFileJson(filename) {
  try {
    const fileContents = await readFile(filename, { encoding: "utf8" });
    const jsonResult = json5.parse(fileContents);
    return jsonResult;
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * @param {string} filename - file to write to
 * @param {object} contentObject - The content to write to the file.
 */ export async function writePackageJson(filename, contentObject) {
  try {
    const contentString = JSON.stringify(contentObject, null, 2);
    await writeFile(filename, `${contentString}\n`);
  } catch (ex) {
    console.error(ex);
  }
}

/**
 * @param {Awaited<ReturnType<typeof findPackages>>[number]} project
 */
function getVersionPolicyName(project) {
  const packageName = project.manifest.name;
  const packageDir = project.rootDirRealPath;
  if (!packageName) {
    throw new Error(`Package at ${packageDir} does not have a name`);
  }

  if (packageName.startsWith("@azure-tests/")) {
    return "test";
  } else if (
    packageName.startsWith("@azure-tools/") ||
    packageName === "@azure/dev-tool" ||
    packageName === "@azure/eslint-plugin-azure-sdk" ||
    packageName === "@azure/mock-hub" ||
    packageName === "@azure/storage-internal-avro"
  ) {
    return "utility";
  } else if (packageName.includes("/arm-")) {
    return "management";
  } else if (packageDir.includes("sdk/core/") || packageDir.includes("sdk\\core\\")) {
    return "core";
  } else if (packageDir.includes("sdk/") || packageDir.includes("sdk\\")) {
    return "client";
  }

  return "unknown";
}

/**
 * Gets the list of packages as well as their package.json file content.
 * This is specifically used in set-dev-dependencies script.
 *
 * @param {string} repoRoot - path to the root of the repo
 * @returns {Promise<Record<string, RepoPackage>>}
 */
export async function getPackageJsons(repoRoot) {
  /** @type {Record<string, RepoPackage>} */
  const packageData = {};
  const pkgs = await findPackages(repoRoot, {
    patterns: ["sdk/*/*", "common/tools/*"],
    ignore: ["sdk/batch/batch"],
  });

  for (const proj of pkgs) {
    const packageName = proj.manifest.name;
    if (!packageName) {
      throw new Error(`Package at ${proj.rootDirRealPath} does not have a name`);
    }

    packageData[packageName] = {
      src: path.join(proj.rootDirRealPath, "package.json"),
      json: proj.manifest,
      versionPolicy: getVersionPolicyName(proj),
      projectFolder: path.relative(repoRoot, proj.rootDirRealPath).replaceAll("\\", "/"),
      newVer: undefined,
    };
  }
  return packageData;
}

/**
 * @param {string} repoRoot - path to the root of the repo
 * @returns {Promise<{ projects: {packageName: string, projectFolder: string, versionPolicyName: string}[] }>}
 */
export async function getPackageSpec(repoRoot) {
  const pkgs = await findPackages(repoRoot, {
    patterns: ["sdk/*/*", "common/tools/*"],
  });

  const projects = pkgs.map((proj) => {
    if (!proj.manifest?.name || !proj.rootDirRealPath) {
      throw new Error(`Package ${proj.manifest?.name} does not have a name or rootDirRealPath`);
    }

    return {
      packageName: proj.manifest.name,
      projectFolder: path.relative(repoRoot, proj.rootDirRealPath).replaceAll("\\", "/"),
      versionPolicyName: getVersionPolicyName(proj),
    };
  });

  return { projects };
}
