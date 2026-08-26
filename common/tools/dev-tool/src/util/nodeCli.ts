// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { existsSync, lstatSync, readFileSync, realpathSync, statSync } from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";

const NODE_SHEBANG = /^#!\s*(?:(?:\S*[\\/])?env(?:\s+-S)?\s+)?(?:\S*[\\/])?node(?:\.exe)?(?:\s|$)/i;

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

export function resolveNodeBinTarget(shimPath: string): string {
  let targetPath: string;
  if (lstatSync(shimPath).isSymbolicLink()) {
    targetPath = realpathSync(shimPath);
  } else {
    const shim = readFileSync(shimPath, "utf8");
    const match = /^# cmd-shim-target=(.+?)\r?$/m.exec(shim);
    if (!match?.[1]) {
      throw new Error(`The Node executable target could not be determined from ${shimPath}.`);
    }
    targetPath = path.isAbsolute(match[1])
      ? path.normalize(match[1])
      : path.resolve(path.dirname(shimPath), match[1]);
  }

  if (!statSync(targetPath).isFile()) {
    throw new Error(`The Node executable target ${targetPath} is not a file.`);
  }
  const firstLine = readFileSync(targetPath, "utf8").split(/\r?\n/, 1)[0] ?? "";
  if (!NODE_SHEBANG.test(firstLine)) {
    throw new Error(`The executable target ${targetPath} is not a Node.js CLI.`);
  }
  return targetPath;
}
