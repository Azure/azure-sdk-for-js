// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "node:path";
import fs from "node:fs";
import { RecorderError } from "./utils.js";

/**
 * Replace backslashes in a path with forward slashes so they are not treated as escape characters
 * in the browser tests.
 * @param filePath The path to replace
 * @returns A path without backslashes
 */
function toSafePath(filePath: string): string {
  return filePath.split(path.sep).join(path.posix.sep);
}

/**
 * Determines the path of the package being tested relative to the repository root.
 */
function relativePackagePath(): string {
  const currentPath = process.cwd(); // Gives the current working directory

  let rootPath = undefined;
  let expectedProjectPath = undefined;

  if (fs.existsSync(path.join(currentPath, "package.json"))) {
    // <root>/sdk/service/project/package.json
    if (fs.existsSync(path.join(currentPath, "package.json"))) {
      expectedProjectPath = currentPath; // <root>/sdk/service/project/
      const expectedRootPath = path.join(currentPath, "..", "..", ".."); // <root>/
      if (
        fs.existsSync(path.join(expectedRootPath, "sdk/")) && // <root>/sdk
        fs.existsSync(path.join(expectedRootPath, "rush.json")) // <root>/rush.json
      ) {
        // reached root path
        rootPath = expectedRootPath;
      }
    }
  } else {
    throw new RecorderError(`'package.json' is not found at ${currentPath}`);
  }

  if (!(rootPath === undefined || expectedProjectPath === undefined)) {
    // <root>/
    // <root>/sdk/service/project/
    // => sdk/service/project
    return path.relative(rootPath, expectedProjectPath);
  } else {
    throw new RecorderError(
      "rootPath or expectedProjectPath could not be calculated properly from process.cwd()",
    );
  }
}

/**
 * Returns the potential `recordings` folder(relative path) for the project using `process.cwd()`.
 *
 * @export
 * @returns {string} location of the relative `recordings` folder path - `sdk/storage/storage-blob/recordings/` example
 */
export function relativeRecordingsPath(): string {
  return toSafePath(path.join(relativePackagePath(), "recordings"));
}
