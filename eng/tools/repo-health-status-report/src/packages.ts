// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { glob, readFile } from "node:fs/promises";
import { join } from "node:path";
import { getBaseDir } from "./env.js";

interface PackageJson {
  name: string;
  version: string;
}

interface DataplanePackage {
  version: string;
  projectPath: string;
  serviceDir: string;
  packageDir: string;
}

export async function getDataplanePackages(): Promise<Record<string, DataplanePackage>> {
  const workspaceRoot = getBaseDir();
  const sdkPackageJsonFiles: string[] = [];
  for await (const file of glob("sdk/*/*/package.json", { cwd: workspaceRoot })) {
    const normalizedPath = file.replaceAll("\\", "/");
    if (!normalizedPath.includes("/arm-")) {
      sdkPackageJsonFiles.push(normalizedPath);
    }
  }

  const result: Record<string, DataplanePackage> = {};

  for (const path of sdkPackageJsonFiles) {
    const jsonFile = await readFile(join(workspaceRoot, path), "utf-8");
    const json = JSON.parse(jsonFile) as PackageJson;
    if (json.name.startsWith("@azure-tests/") || json.name.startsWith("@azure-tools/")) {
      continue;
    }
    const [serviceDir, packageDir] = path.replace("sdk/", "").split("/");
    result[json.name] = {
      version: json.version,
      projectPath: path,
      serviceDir,
      packageDir,
    };
  }
  return result;
}
