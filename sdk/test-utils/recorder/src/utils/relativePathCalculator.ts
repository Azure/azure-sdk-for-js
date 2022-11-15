// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";
import fs from "fs";
import { RecorderError } from "./utils";

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
function relativePackagePath() {
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
      "rootPath or expectedProjectPath could not be calculated properly from process.cwd()"
    );
  }
}

/**
 * Returns the potential `recordings` folder(relative path) for the project using `process.cwd()`.
 *
 * Note for browser tests:
 *    1. Supposed to be called from karma.conf.js in the package for which the testing is being done.
 *    2. Set this `RECORDINGS_RELATIVE_PATH` as an env variable
 *      ```js
 *        const { relativeRecordingsPathForBrowser } = require("@azure-tools/test-recorder-new");
 *        process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPathForBrowser();
 *      ```
 *    3. Add "RECORDINGS_RELATIVE_PATH" in the `envPreprocessor` array to let this be loaded in the browser environment.
 *      ```
 *        envPreprocessor: ["RECORDINGS_RELATIVE_PATH"],
 *      ```
 *
 * `RECORDINGS_RELATIVE_PATH` in the browser environment is used in the recorder to tell the proxy-tool about the location to generate the browser recordings at.
 *
 * @export
 * @returns {string} location of the relative `recordings` folder path - `sdk/storage/storage-blob/recordings/` example
 */
export function relativeRecordingsPath(): string {
  return toSafePath(path.join(relativePackagePath(), "recordings"));
}

/**
 * Returns the potential assets.json for the project using `process.cwd()`.
 *
 * Note for browser tests:
 *    1. Supposed to be called from karma.conf.js in the package for which the testing is being done.
 *    2. Set this `RECORDING_ASSETS_PATH` as an env variable
 *      ```js
 *        const { relativeRecordingsPathForBrowser } = require("@azure-tools/test-recorder-new");
 *        process.env.RECORDING_ASSETS_PATH = relativeRecordingsPathForBrowser();
 *      ```
 *    3. Add "RECORDING_ASSETS_PATH" in the `envPreprocessor` array to let this be loaded in the browser environment.
 *      ```
 *        envPreprocessor: ["RECORDING_ASSETS_PATH"],
 *      ```
 *
 * `RECORDING_ASSETS_PATH` in the browser environment is used in the recorder to tell the proxy-tool about whether or not to pass additional body argument
 * `x-recording-assets-file` to playback|record/Start. Doing so enables the proxy to auto-restore files from a remote location.
 *
 * @export
 * @returns {string} location of the relative path to discovered assets.json - `sdk/storage/storage-blob/assets.json` for example, or undefined if the path does not exist
 */
export function relativeAssetsPath(): string | undefined {
  const assetsJsonPath = path.join(relativePackagePath(), "assets.json");
  return fs.existsSync(assetsJsonPath) ? toSafePath(assetsJsonPath) : undefined;
}
