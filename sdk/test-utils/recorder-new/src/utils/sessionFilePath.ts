// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, generateTestRecordingFilePath } from "@azure-tools/test-recorder";
import { isNode } from "@azure/test-utils";
import { relativeRecordingsPath } from "./relativePathCalculator";

export function sessionFilePath(testContext: Mocha.Test) {
  const recordingsFolder = !isNode ? env.RECORDINGS_RELATIVE_PATH : relativeRecordingsPath(); // sdk/service/project/recordings
  return `${recordingsFolder}/${recordingFilePath(testContext)}`;
  // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
}

/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export function recordingFilePath(testContext: Mocha.Test) {
  return generateTestRecordingFilePath(
    isNode ? "node" : "browsers",
    testContext.parent!.fullTitle(),
    testContext.title!,
    "json"
  );
}
