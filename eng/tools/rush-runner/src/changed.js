// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

// @ts-check

/**
 *
 * @param {string} packageInfoPath - directory that store package info json files
 * @param {string} changeInfoPath - path to the json file that store changed files (diff.json)
 * @returns {{changedPackages: Set<string>, diff: { changedFiles: string[], changedServices: string[] }}}
 */
export async function getChangedInfo(packageInfoPath, changeInfoPath) {
  const result = { packages: {}, changedPackages: new Set() };
  if (!existsSync(packageInfoPath) || !existsSync(changeInfoPath)) {
    console.warn(
      `Package info path (${packageInfoPath}) or change info path (${changeInfoPath}) is not specified or does not exist!`,
    );
    return result;
  }

  const dirPackageMap = new Map();
  const files = await readdir(packageInfoPath);
  for (const file of files) {
    const content = await readFile(join(packageInfoPath, file), "utf-8");
    const json = JSON.parse(content);
    result["packages"][json["Name"]] = json;
    dirPackageMap[json["DirectoryPath"]] = json["Name"];
  }
  const diff = JSON.parse(await readFile(changeInfoPath, "utf-8"));
  result["diff"] = {
    changedFiles: diff["ChangedFiles"],
    changedServices: diff["ChangedServices"],
  };

  const re = /^(sdk\/.*\/.*\/)/;
  for (const changedFile of diff["ChangedFiles"]) {
    const parts = changedFile.split("/");
    if (parts.length > 3) {
      if (parts[0] === "sdk" && dirPackageMap[`sdk/${parts[1]}/${parts[2]}`]) {
        result.changedPackages.add(dirPackageMap[`sdk/${parts[1]}/${parts[2]}`]);
      }
    }
  }

  console.log(`Changed packages: ${Array.from(result.changedPackages.keys())}`);

  return result;
}
