// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { diag } from "@opentelemetry/api";
import { constants } from "node:fs";
import { join } from "node:path";
import { lstat, mkdir, open, readdir, stat } from "node:fs/promises";
import { FileAccessControl } from "./fileAccessControl.js";

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
 * Protect one exporter-owned directory before using it for offline storage.
 * @internal
 */
export const confirmDirExists = async (directory: string, create = true): Promise<void> => {
  if (create) {
    await mkdir(directory, { recursive: true, mode: 0o700 });
  }

  if (process.platform === "win32") {
    const stats = await lstat(directory, { bigint: true });
    if (!stats.isDirectory()) {
      throw new Error("Path existed but was not a directory");
    }
    await FileAccessControl.applyACLRules(directory, stats);
    return;
  }

  // Check ownership and change permissions on the same directory, without following a symlink.
  const handle = await open(
    directory,
    constants.O_RDONLY | constants.O_DIRECTORY | constants.O_NOFOLLOW,
  );
  try {
    const { uid, mode } = await handle.stat();
    const currentUid = process.getuid?.();
    if (currentUid === undefined || (uid !== currentUid && uid !== 0)) {
      throw new Error(
        `Directory ${directory} is owned by uid ${uid}, not the current user (${currentUid}) or admin (uid 0).`,
      );
    }
    if ((mode & 0o7777) !== 0o700) {
      await handle.chmod(0o700);
    }
  } finally {
    await handle.close();
  }
};
