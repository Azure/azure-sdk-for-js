// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as fs from "fs";
import * as path from "path";
import { promisify } from "util";

export const statAsync = promisify(fs.stat);
export const lstatAsync = promisify(fs.lstat);
export const mkdirAsync = promisify(fs.mkdir);
export const accessAsync = promisify(fs.access);
export const appendFileAsync = promisify(fs.appendFile);
export const writeFileAsync = promisify(fs.writeFile);
export const readFileAsync = promisify(fs.readFile);
export const readdirAsync = promisify(fs.readdir);
export const unlinkAsync = promisify(fs.unlink);

/**
 * Validate directory exists.
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
        await mkdirAsync(directory);
      } catch (mkdirErr: any) {
        if (mkdirErr && mkdirErr.code !== "EEXIST") {
          // Handle race condition by ignoring EEXIST
          throw mkdirErr;
        }
      }
    }
  }
};

/**
 * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
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
 * Computes the size (in bytes) of all files in a directory at the root level. Synchronously.
 */
export const getShallowDirectorySizeSync = (directory: string): number => {
  const files = fs.readdirSync(directory);
  let totalSize = 0;
  for (let i = 0; i < files.length; i++) {
    totalSize += fs.statSync(path.join(directory, files[i])).size;
  }
  return totalSize;
};

/**
 * Computes the size (in bytes) of a file asynchronously.
 */
export const getShallowFileSize = async (filePath: string): Promise<number | null> => {
  const fileStats = await statAsync(filePath);
  if (fileStats.isFile()) {
    return fileStats.size;
  }
  return null;
};
