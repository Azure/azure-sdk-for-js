// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs-extra";
import path from "path";

import { createPrinter } from "./printer";

const { debug } = createPrinter("project resolution");

export interface ProjectInfo {
  name: string;
  path: string;
  version: string;
  packageJson: any;
}

async function isAzureSDKPackage(fileName: string): Promise<boolean> {
  const f = await import(fileName);

  if ((f.name as string).startsWith("@azure/")) {
    return true;
  } else {
    return false;
  }
}

async function findAzSDKPackageJson(directory: string): Promise<[string, any]> {
  const files = await fs.readdir(directory);

  if (files.includes("rush.json")) {
    throw new Error(
      "Reached monorepo root, but no matching Azure SDK package was found."
    );
  }

  for (const file of files) {
    if (file === "package.json") {
      const fullPath = path.join(directory, file);
      const packageObject = await import(fullPath);
      if (await isAzureSDKPackage(fullPath)) {
        return [directory, packageObject];
      }
      debug(
        `found package.json at ${fullPath}, but it is not an Azure SDK package`
      );
    }
  }

  return findAzSDKPackageJson(path.join(directory, ".."));
}

/**
 * Determine which Azure SDK project a given directory belongs to.
 *
 * @param workingDirectory
 */
export async function resolveProject(
  workingDirectory: string
): Promise<ProjectInfo> {
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
