// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { coreLogger } from "../common/logger.js";

export const getPackageVersionFromFolder = (folder: string): string => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const version = require(path.join(__dirname, folder, "package.json")).version;
    return version;
  } catch (error) {
    coreLogger.error("Error fetching package version:", error);
    return "";
  }
};
