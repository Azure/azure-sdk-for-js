// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path, { dirname } from "node:path";
import { coreLogger } from "../common/logger.js";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ESM only output
const require = createRequire(import.meta.url);
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ESM only output
const currentDir = dirname(fileURLToPath(import.meta.url));

const getPackageVersionFromFolder = (folder: string): string => {
  try {
    const version = require(path.join(currentDir, folder, "package.json")).version;
    return version;
  } catch (error) {
    coreLogger.error("Error fetching package version:", error);
    return "";
  }
};

export const getPackageVersion = (): string => {
  // hacky way to get package version
  // try from dist folder first (customer perspective)
  const distVersion = getPackageVersionFromFolder("../../../");
  if (distVersion) {
    return distVersion;
  }
  // if not found, try from src folder (internal test suite)
  const srcVersion = getPackageVersionFromFolder("../../");
  if (srcVersion) {
    return srcVersion;
  }
  return "unknown-version";
};
