// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.


import { resolveAssetsJson } from "./utils";

export function relativeRecordingsPath(): never {
  throw new Error("Attempted to use the function meant for node in a browser.");
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
export function relativeAssetsPath(): string {
  let result = resolveAssetsJson("");
  return result;
}
