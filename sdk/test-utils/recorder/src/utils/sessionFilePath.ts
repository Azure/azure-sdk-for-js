// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isNode } from "@azure/core-util";
import { env } from "./env";
import { generateTestRecordingFilePath } from "./filePathGenerator";
import { relativeRecordingsPath } from "./relativePathCalculator";
import { RecorderError } from "./utils";

export function sessionFilePath(testContext: Mocha.Test): string {
  let recordingsFolder: string;
  if (isNode) {
    recordingsFolder = relativeRecordingsPath(); // sdk/service/project/recordings
  } else if (env.RECORDINGS_RELATIVE_PATH) {
    recordingsFolder = env.RECORDINGS_RELATIVE_PATH;
  } else {
    throw new RecorderError(
      "RECORDINGS_RELATIVE_PATH was not set while in browser mode. Ensure that process.env.RELATIVE_RECORDINGS_PATH has been set properly in your Karma configuration."
    );
  }

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
