// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";
import { generateTestRecordingFilePath } from "./filePathGenerator.js";
import { relativeRecordingsPath } from "./relativePathCalculator.js";
import { RecorderError } from "./utils.js";
import { TestInfo, isMochaTest, isVitestTestContext } from "../testInfo.js";

export function sessionFilePath(testContext: TestInfo): string {
  // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
  return `${relativeRecordingsPath()}/${recordingFilePath(testContext)}`;
}

/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export function recordingFilePath(testContext: TestInfo): string {
  if (isMochaTest(testContext)) {
    if (!testContext.parent) {
      throw new RecorderError(
        `Test ${testContext.title} is not inside a describe block, so a file path for its recording could not be generated. Please place the test inside a describe block.`,
      );
    }

    return generateTestRecordingFilePath(
      isNode ? "node" : "browsers",
      testContext.parent.fullTitle(),
      testContext.title,
    );
  } else if (isVitestTestContext(testContext)) {
    if (!testContext.task.suite) {
      throw new RecorderError(
        `Test ${testContext.task.name} is not inside a describe block, so a file path for its recording could not be generated. Please place the test inside a describe block.`,
      );
    }

    return generateTestRecordingFilePath(
      isNode ? "node" : "browsers",
      testContext.task.suite.name,
      testContext.task.name,
    );
  } else {
    throw new RecorderError(
      `Test ${testContext} is not a Mocha test or Vitest test context, so a file path for its recording could not be generated.`,
    );
  }
}

export function assetsJsonPath(): string {
  // Hacky solution using substring works around the fact that:
  // 1) the relativeRecordingsPath may not exist on disk (so relativeRecordingsPath()/../assets.json might not exist either, can't use ..)
  // 2) `path` (and therefore `path.dirname`) is not available in the browser.
  const recordingsPath = relativeRecordingsPath();
  const sdkDir = recordingsPath.substring(0, recordingsPath.lastIndexOf("/"));
  return `${sdkDir}/assets.json`;
}
