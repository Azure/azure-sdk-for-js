// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";
import fs from "fs";
import { RecorderError } from "./utils";

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
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
    return path
      .join(path.relative(rootPath, expectedProjectPath), "recordings")
      .split(path.sep)
      .join(path.posix.sep); // Converting "\" to "/" (needed for windows) so that the path.sep("\") is not treated as an escape character in the browsers
    // => sdk/service/project/recordings
  } else {
    throw new RecorderError(
      "rootPath or expectedProjectPath could not be calculated properly from process.cwd()"
    );
  }
}

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
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
 * @returns {string} location of the relative path to discovered assets.json - `sdk/storage/storage-blob/assets.json` for example.
 */
export function relativeAssetsPath(): string | undefined {
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
    const assetsPath = path.join(expectedProjectPath, "assets.json")
    if (!fs.existsSync(assetsPath)) return undefined;
    // <root>/
    // <root>/sdk/service/project/
    return path
      .join(path.relative(rootPath, assetsPath))
      .split(path.sep)
      .join(path.posix.sep); // Converting "\" to "/" (needed for windows) so that the path.sep("\") is not treated as an escape character in the browsers
    // => sdk/service/project/assets.json
  } else {
    throw new RecorderError(
      "rootPath or expectedProjectPath could not be calculated properly from process.cwd()"
    );
  }
}
