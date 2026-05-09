// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { glob } from "glob";
import { join } from "path";
import { readFile } from "fs/promises";
import { getBaseDir } from "./env.js";

export async function getDataplanePackages(): Promise<
  Record<string, { version: string; projectPath: string; serviceDir: string; packageDir: string }>
> {
  const workspaceRoot = getBaseDir();
  const sdkPackageJsonFiles = (
    await glob(`${workspaceRoot}/sdk/*/*/package.json`, { absolute: false })
  )
    .filter((file) => !file.includes(`/arm-`) && !file.includes(`\\arm-`))
    .map((file) => file.replaceAll("\\", "/").replaceAll("../", ""));

  const result = {};

  for (const path of sdkPackageJsonFiles) {
    const jsonFile = await readFile(join(workspaceRoot, path), "utf-8");
    const json = JSON.parse(jsonFile);
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
