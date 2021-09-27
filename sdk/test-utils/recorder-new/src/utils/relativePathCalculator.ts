// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import path from "path";
import fs from "fs";
import { RecorderError } from "./utils";

export function relativeRecordingsPathForNode(testContext: Mocha.Test) {
  const testAbsolutePath = testContext.file;
  if (!testAbsolutePath) {
    throw new RecorderError("Unable to grab the file path from the test run");
  }

  const recordingsPath = findRecordingsFolderPath(testAbsolutePath);
  const recordingsFolder = path.basename(recordingsPath);
  const projectFolder = path.basename(path.resolve(recordingsPath, ".."));
  const serviceFolder = path.basename(path.resolve(recordingsPath, "..", ".."));
  const sdk = path.basename(path.resolve(recordingsPath, "..", "..", ".."));
  if (sdk !== "sdk") {
    throw new Error("Unexpected location for recordings, please fix the location.");
  }
  return path
    .join(sdk, serviceFolder, projectFolder, recordingsFolder)
    .split(path.sep)
    .join(path.posix.sep);
}

export function relativeRecordingsPathForBrowser() {
  const pathFormatted = process.cwd();
  const projectFolder = path.basename(pathFormatted);
  const serviceFolder = path.basename(path.resolve(pathFormatted, ".."));
  const sdk = path.basename(path.resolve(pathFormatted, "..", ".."));
  if (sdk !== "sdk") {
    throw new Error("Unexpected location for recordings, please fix the location.");
  }
  return path
    .join(sdk, serviceFolder, projectFolder, "recordings")
    .split(path.sep)
    .join(path.posix.sep);
}

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
 * 1. Takes the test filePath as argument.
 * 2. Looks for the potential `recordings` folder in its hierarchical path.
 * 3. Returns the full path of the `recordings` folder
 *
 * While running the tests, `filePath` can vary depending on location of the test files, examples below
 *
 * 1. If roll-up generated bundle files are being leveraged to run the tests
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-test\index.node.js`
 * 2. If ts complied dist-esm files are being used to run the tests
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-esm\test\utils.spec.js`
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\dist-esm\test\node\utils.spec.js`
 * 3. If `.spec.ts` test files are being used directly
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\test\utils.spec.ts`
 *    filePath = `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\test\node\utils.spec.ts`
 * In the above examples, no matter where the test files are,
 *    the recordings are located at `<base path>\azure-sdk-for-js\sdk\storage\storage-blob\recordings\`.
 * In order to playback the tests, exact location of the recordings is to be found,
 *    this is done by checking the parent(s) folders until the `recordings` folder is found.
 *
 * @export
 * @param {string} filePath
 * @returns {string} location of the `recordings` folder
 */
function findRecordingsFolderPath(filePath: string): string {
  // Stripping away the file name
  let currentPath = path.resolve(filePath, "..");
  // File/folder path of a closest child of `currentPath` in the folder hierarchy of `filePath`
  let lastPath = filePath;
  try {
    console.log(currentPath, path.resolve(currentPath, "package.json"));
    // While loop to find the entry point of the SDK
    while (
      !(
        fs.existsSync(path.resolve(currentPath, "package.json")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "..", "sdk/")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "..", "rush.json"))
      )
    ) {
      lastPath = currentPath;
      currentPath = path.resolve(currentPath, "..");
      console.log(
        currentPath,
        path.resolve(currentPath, "package.json"),
        path.resolve(currentPath, "..", "..", "..", "sdk/"),
        path.resolve(currentPath, "..", "..", "..", "rush.json"),
        fs.existsSync(path.resolve(currentPath, "package.json")) &&
          fs.existsSync(path.resolve(currentPath, "..", "..", "..", "sdk/")) &&
          fs.existsSync(path.resolve(currentPath, "..", "..", "..", "rush.json"))
      );

      if (lastPath === currentPath) {
        throw new Error(
          `'package.json' is not found at ${currentPath} (reached the root directory)`
        );
      }
    }
    return path.resolve(currentPath, "recordings/");
  } catch (error) {
    throw new Error(
      `Unable to locate the 'recordings' folder anywhere in the hierarchy of the file path ${filePath}\n ${error}`
    );
  }
}
