import * as fs from "fs";
import * as path from "path";

export const getShallowDirectorySize = (
  directory: string,
  callback: (err: Error | null, size: number) => void,
): void => {
  // Get the directory listing
  fs.readdir(directory, (err, files) => {
    if (err) {
      callback(err, -1);
      return;
    }

    if (files.length === 0) {
      callback(null, 0);
      return;
    }

    let error: Error | null = null;
    let totalSize = 0;
    let count = 0;

    // Query all file sizes
    files.forEach((file) => {
      fs.stat(path.join(directory, file), (statErr, fileStats) => {
        count += 1;

        if (statErr) {
          error = statErr;
        } else if (fileStats.isFile()) {
          totalSize += fileStats.size;
        }

        if (count === files.length) {
          // Did we get an error?
          if (error) {
            callback(error, -1);
          } else {
            callback(error, totalSize);
          }
        }
      });
    });
  });
};

/**
 * Computes the size (in bytes) of all files in a directory at the root level. Asynchronously.
 */
export const confirmDirExists = (
  directory: string,
  callback: (err: Error | null) => void,
): void => {
  fs.lstat(directory, (err, stats) => {
    if (err && err.code === "ENOENT") {
      fs.mkdir(directory, (mkdirErr) => {
        if (mkdirErr && mkdirErr.code !== "EEXIST") {
          // Handle race condition by ignoring EEXIST
          callback(mkdirErr);
        } else {
          callback(null);
        }
      });
    } else if (!err && stats.isDirectory()) {
      callback(null);
    } else {
      callback(err || new Error("Path existed but was not a directory"));
    }
  });
};
