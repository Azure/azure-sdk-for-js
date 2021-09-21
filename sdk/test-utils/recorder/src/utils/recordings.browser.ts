// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { windowLens } from "./windowLens";
import { generateTestRecordingFilePath } from "./recordingPath";

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
  _testAbsolutePath: string,
  currentHash: string
): boolean {
  const recordingPath: string = generateTestRecordingFilePath(
    "browsers",
    testSuiteTitle,
    testTitle
  );

  let previousHash: string = "";

  if (windowLens.get(["__json__", "recordings/" + recordingPath])) {
    previousHash = windowLens.get(["__json__", "recordings/" + recordingPath, "hash"]);
  }

  if (!previousHash) {
    return true;
  }

  return previousHash !== currentHash;
}

export function findRecordingsFolderPath() {
  throw new Error(
    "Attempted to use the method `findRecordingsFolderPath`(meant for node) in a browser"
  );
}
