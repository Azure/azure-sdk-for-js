// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";
import { generateTestRecordingFilePath } from "./filePathGenerator.js";
import { relativeRecordingsPath } from "./relativePathCalculator.js";

export interface TestContext {
  suiteTitle: string; // describe(suiteTitle, () => {})
  testTitle: string; // it(testTitle, () => {})
}

export function sessionFilePath(testContext: TestContext): string {
  // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
  return `${relativeRecordingsPath()}/${recordingFilePath(testContext)}`;
}

/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export function recordingFilePath(testContext: TestContext): string {
  return generateTestRecordingFilePath(
    isNode ? "node" : "browsers",
    testContext.suiteTitle,
    testContext.testTitle,
  );
}

export function assetsJsonPath(): string {
  // Hacky solution using substring works around the fact that:
  // 1) the relativeRecordingsPath may not exist on disk (so relativeRecordingsPath()/../assets.json might not exist either, can't use ..)
  // 2) `path` (and therefore `path.dirname`) is not available in the browser.
  const recordingsPath = relativeRecordingsPath();
  const sdkDir = recordingsPath.substring(0, recordingsPath.lastIndexOf("/"));
  return `${sdkDir}/assets.json`;
}
