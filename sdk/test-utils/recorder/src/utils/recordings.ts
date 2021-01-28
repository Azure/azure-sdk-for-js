// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { generateTestRecordingFilePath } from "./recordingPath";

import fs from "fs";
import path from "path";

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
 * Meant to be called during the playback for the node tests.
 * 1. Takes the test filePath as argument.
 * 2. Looks for the `recordings` folder in its hierarchical path.
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
export function findRecordingsFolderPath(filePath: string): string {
  // Stripping away the file name
  let currentPath = path.resolve(filePath, "..");
  // File/folder path of a closest child of `currentPath` in the folder hierarchy of `filePath`
  let lastPath = filePath;
  try {
    // While loop to find the `recordings` folder
    while (!fs.existsSync(path.resolve(currentPath, "recordings/"))) {
      if (
        fs.existsSync(path.resolve(currentPath, "package.json")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "sdk/")) &&
        fs.existsSync(path.resolve(currentPath, "..", "..", "..", "rush.json"))
      ) {
        // package.json of the SDK is found but not the `recordings` folder
        // which is supposed to be present at the same level as package.json
        throw new Error(`'recordings' folder is not found at ${currentPath}`);
      } else if (lastPath === currentPath) {
        throw new Error(
          `'recordings' folder is not found at ${currentPath} (reached the root directory)`
        );
      } else {
        lastPath = currentPath;
        currentPath = path.resolve(currentPath, "..");
      }
    }
    return path.resolve(currentPath, "recordings/");
  } catch (error) {
    throw new Error(
      `Unable to locate the 'recordings' folder anywhere in the hierarchy of the file path ${filePath}\n ${error}`
    );
  }
}

/**
 * Requires a file if it exists. Only works on NodeJS.
 */
export function nodeRequireRecordingIfExists(recordingPath: string, testAbsolutePath: string): any {
  const path = require("path");

  // Get the full path of the `recordings` folder by navigating through the hierarchy of the test file path.
  const recordingsFolderPath = findRecordingsFolderPath(testAbsolutePath);
  const absoluteRecordingPath = path.resolve(recordingsFolderPath, recordingPath);

  if (fs.existsSync(absoluteRecordingPath)) {
    return require(absoluteRecordingPath);
  } else {
    throw new Error(`The recording ${recordingPath} was not found in ${recordingsFolderPath}`);
  }
}

/**
 * Checks if a test hasn't changed from the last time it was recorded.
 * @param testContext
 * @param testSuiteTitle
 * @param testTitle
 * @param currentHash
 */
export function testHasChanged(
  testSuiteTitle: string,
  testTitle: string,
  testAbsolutePath: string,
  currentHash: string
): boolean {
  const recordingPath: string = generateTestRecordingFilePath("node", testSuiteTitle, testTitle);

  let previousHash: string = "";

  try {
    previousHash = nodeRequireRecordingIfExists(recordingPath, testAbsolutePath).hash;
  } catch (e) {}

  if (!previousHash) {
    return true;
  }

  return previousHash !== currentHash;
}

/**
 * ONLY WORKS IN THE NODE.JS ENVIRONMENT
 *
 * Meant to be called before saving the recording, this ensures that the folder path exists for the recording to be saved.
 *
 * Example for `dirPath` : "./recordings/node/utils/"
 * @export
 * @param {string} dirPath
 */
export function createFolderForRecording(dirPath: string) {
  let path = require("path");
  if (fs.existsSync(dirPath)) {
    // Nothing to do if the path exists
    return;
  } else {
    try {
      // Stripping the tailing slash "/"
      dirPath = dirPath.endsWith("/") ? dirPath.substr(0, dirPath.length - 1) : dirPath;

      // "fs" doesn't let creating folders recursively,
      // split the path and create folders at each level instead
      let subDirs = dirPath.split("/");
      let currentPath = subDirs[0];
      for (let index = 1; index < subDirs.length; index++) {
        currentPath = path.resolve(currentPath, subDirs[index]);
        if (!fs.existsSync(currentPath)) {
          fs.mkdirSync(currentPath);
        }
      }
    } catch (err) {
      throw new Error(`Unable to create the folder for recording \n ${err}`);
    }
  }
}
