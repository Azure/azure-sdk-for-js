// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

export function resolveNodeModuleBin(
  packageName: string,
  binName: string,
  cwd: string = process.cwd(),
): string {
  const requireFromCwd = createRequire(path.join(cwd, "package.json"));
  const packageJsonPath = requireFromCwd.resolve(`${packageName}/package.json`);
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8")) as {
    bin?: string | Record<string, string>;
  };
  const relativeBin =
    typeof packageJson.bin === "string" ? packageJson.bin : packageJson.bin?.[binName];
  if (!relativeBin) {
    throw new Error(`Package ${packageName} does not declare the ${binName} executable.`);
  }
  const executablePath = path.resolve(path.dirname(packageJsonPath), relativeBin);
  if (!existsSync(executablePath)) {
    throw new Error(`The ${binName} executable declared by ${packageName} could not be found.`);
  }
  return executablePath;
}
