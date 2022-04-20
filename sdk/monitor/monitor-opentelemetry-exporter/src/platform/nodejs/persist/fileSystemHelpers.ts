// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

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
  // Get the directory listing
  const files = await readdirAsync(directory);

  let totalSize = 0;

  // Query all file sizes
  for (const file of files) {
    const fileStats = await statAsync(path.join(directory, file));
    if (fileStats.isFile()) {
      totalSize += fileStats.size;
    }
  }

  return totalSize;
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
  } catch (err: unknown) {
    const strongErr = err as Record<string, unknown>;
    if (strongErr?.code === "ENOENT") {
      try {
        await mkdirAsync(directory);
      } catch (mkdirErr: unknown) {
        const strongMkdirErr = mkdirErr as Record<string, unknown>;
        if (strongMkdirErr?.code === "EEXIST") {
          // Handle race condition by ignoring EEXIST
          throw mkdirErr;
        }
      }
    }
  }
};
