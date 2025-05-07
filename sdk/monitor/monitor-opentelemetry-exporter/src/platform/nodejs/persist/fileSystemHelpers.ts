// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import type { MakeDirectoryOptions } from "node:fs";
import { join } from "node:path";
import { lstat, mkdir, readdir, stat } from "node:fs/promises";

/**
 * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
 * @internal
 */
export const getShallowDirectorySize = async (directory: string): Promise<number> => {
  let totalSize = 0;
  try {
    // Get the directory listing
    const files = await readdir(directory);

    // Query all file sizes
    for (const file of files) {
      const fileStats = await stat(join(directory, file));
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
    const stats = await lstat(directory);
    if (!stats.isDirectory()) {
      throw new Error("Path existed but was not a directory");
    }
  } catch (err: any) {
    if (err && err.code === "ENOENT") {
      try {
        const options: MakeDirectoryOptions = { recursive: true };
        await mkdir(directory, options);
      } catch (mkdirErr: any) {
        if (mkdirErr && mkdirErr.code !== "EEXIST") {
          // Handle race condition by ignoring EEXIST
          throw mkdirErr;
        }
      }
    }
  }
};
