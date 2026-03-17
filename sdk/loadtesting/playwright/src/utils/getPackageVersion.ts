// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path, { dirname } from "node:path";
import { coreLogger } from "../common/logger.js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const tryGetCommonJSDirname = (): string | undefined => {
  return eval("typeof __dirname !== 'undefined' ? __dirname : undefined") as string | undefined;
};

const getCurrentDir = (): string => {
  const currentDir = tryGetCommonJSDirname();
  if (currentDir) {
    return currentDir;
  }

  return dirname(fileURLToPath(import.meta.url));
};

export const getPackageVersionFromFolder = (folder: string): string => {
  try {
    const packageJsonPath = path.join(getCurrentDir(), folder, "package.json");
    const packageJsonContent = readFileSync(packageJsonPath, "utf-8");
    const version = JSON.parse(packageJsonContent).version;
    return version;
  } catch (error) {
    coreLogger.error("Error fetching package version:", error);
    return "";
  }
};
