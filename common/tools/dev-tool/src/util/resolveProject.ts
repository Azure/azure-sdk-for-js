// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

import { createPrinter } from "./printer";

const { debug } = createPrinter("resolve-project");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PackageJson = any;

/**
 * Information about an Azure SDK for JS package
 */
export interface ProjectInfo {
  /**
   * The name of the package
   */
  name: string;
  /**
   * An absolute path to the package directory
   */
  path: string;
  /**
   * The package SemVer string, e.g. 1.0.0-preview.3 or 4.0.0
   */
  version: string;
  /**
   * The package info object (result of reading/parsing package.json)
   */
  packageJson: PackageJson;
}

async function isAzureSDKPackage(fileName: string): Promise<boolean> {
  const f = await import(fileName);

  if ((f.name as string).startsWith("@azure/")) {
    return true;
  } else {
    return false;
  }
}

async function findAzSDKPackageJson(directory: string): Promise<[string, PackageJson]> {
  const files = await fs.readdir(directory);

  if (files.includes("rush.json")) {
    throw new Error("Reached monorepo root, but no matching Azure SDK package was found.");
  }

  for (const file of files) {
    if (file === "package.json") {
      const fullPath = path.join(directory, file);
      const packageObject = (await import(fullPath)).default;
      if (await isAzureSDKPackage(fullPath)) {
        return [directory, packageObject];
      }
      debug(`found package.json at ${fullPath}, but it is not an Azure SDK package`);
    }
  }

  const nextPath = path.resolve(path.join(directory, ".."));

  if (nextPath === directory) {
    throw new Error("Reached filesystem root, but no matching Azure SDK package was found.");
  }

  return findAzSDKPackageJson(nextPath);
}

/**
 * Determine which Azure SDK project a given directory belongs to.
 *
 * @param workingDirectory the directory to resolve the package from
 * @returns the package info for the SDK project that owns the given directory
 */
export async function resolveProject(workingDirectory: string): Promise<ProjectInfo> {
  if (!fs.existsSync(workingDirectory)) {
    throw new Error(`No such file or directory: ${workingDirectory}`);
  }

  const directory = await fs.stat(workingDirectory);

  if (!directory.isDirectory()) {
    throw new Error(`${workingDirectory} is not a directory`);
  }

  const [path, packageJson] = await findAzSDKPackageJson(workingDirectory);

  return {
    name: packageJson.name,
    path,
    version: packageJson.version,
    packageJson
  };
}
