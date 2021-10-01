// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { env, generateTestRecordingFilePath } from "@azure-tools/test-recorder";
import { isNode } from "@azure/test-utils";
import { relativeRecordingsPathForNode } from "./relativePathCalculator";

export function sessionFilePath(testContext: Mocha.Test) {
  if (!isNode) {
    return `${env.RECORDINGS_RELATIVE_PATH}/${recordingFilePath(testContext)}`;
  } else {
    return `${relativeRecordingsPathForNode(testContext)}/${recordingFilePath(testContext)}`;
  }
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
