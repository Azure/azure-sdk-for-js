// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { coreLogger } from "../common/logger.js";

const getPackageVersionFromFolder = (folder: string): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const version = require(path.join(__dirname, folder, "package.json")).version;
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
