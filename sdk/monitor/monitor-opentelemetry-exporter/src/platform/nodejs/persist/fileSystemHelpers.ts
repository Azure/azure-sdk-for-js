// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);
const lstatAsync = promisify(fs.lstat);
const mkdirAsync = promisify(fs.mkdir);

/**
 * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
 * @internal
 */
export const getShallowDirectorySize = async (directory: string): Promise<number> => {
  let totalSize = 0;
  try {
    // Get the directory listing
    const files = await readdirAsync(directory);

    // Query all file sizes
    for (const file of files) {
      const fileStats = await statAsync(path.join(directory, file));
      if (fileStats.isFile()) {
        totalSize += fileStats.size;
      }
    }

    return totalSize;
  } catch (err) {
    diag.error(`Error getting directory size: ${err}`);
    return 0;
  }
};

/**
 * Validate directory exists.
 * @internal
 */
export const confirmDirExists = async (directory: string): Promise<void> => {
  try {
    const stats = await lstatAsync(directory);
    if (!stats.isDirectory()) {
      throw new Error("Path existed but was not a directory");
    }
  } catch (err: any) {
    if (err && err.code === "ENOENT") {
      try {
        const options: fs.MakeDirectoryOptions = { recursive: true };
        await mkdirAsync(directory, options);
      } catch (mkdirErr: any) {
        if (mkdirErr && mkdirErr.code !== "EEXIST") {
          // Handle race condition by ignoring EEXIST
          throw mkdirErr;
        }
      }
    }
  }
};
