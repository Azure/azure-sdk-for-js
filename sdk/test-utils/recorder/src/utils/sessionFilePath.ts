// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";
import { env } from "./env";
import { generateTestRecordingFilePath } from "./filePathGenerator";
import { relativeRecordingsPath } from "./relativePathCalculator";
import { RecorderError } from "./utils";

export function sessionFilePath(testContext: Mocha.Test): string {
  const recordingsFolder = !isNode ? env.RECORDINGS_RELATIVE_PATH : relativeRecordingsPath(); // sdk/service/project/recordings
  return `${recordingsFolder}/${recordingFilePath(testContext)}`;
  // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
}

/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export function recordingFilePath(testContext: Mocha.Test): string {
  if (!testContext.parent) {
    throw new RecorderError(
      `Test ${testContext.title} is not inside a describe block, so a file path for its recording could not be generated. Please place the test inside a describe block.`
    );
  }

  return generateTestRecordingFilePath(
    isNode ? "node" : "browsers",
    testContext.parent.fullTitle(),
    testContext.title
  );
}
