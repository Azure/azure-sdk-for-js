// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { isNode } from "@azure/core-util";
import { generateTestRecordingFilePath } from "./filePathGenerator.js";
import { relativeRecordingsPath } from "./relativePathCalculator.js";
export function sessionFilePath(testContext) {
    // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
    return `${relativeRecordingsPath()}/${recordingFilePath(testContext)}`;
}
/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
export function recordingFilePath(testContext) {
    return generateTestRecordingFilePath(isNode ? "node" : "browsers", testContext.suiteTitle, testContext.testTitle);
}
export function assetsJsonPath() {
    // Hacky solution using substring works around the fact that:
    // 1) the relativeRecordingsPath may not exist on disk (so relativeRecordingsPath()/../assets.json might not exist either, can't use ..)
    // 2) `path` (and therefore `path.dirname`) is not available in the browser.
    const recordingsPath = relativeRecordingsPath();
    const sdkDir = recordingsPath.substring(0, recordingsPath.lastIndexOf("/"));
    return `${sdkDir}/assets.json`;
}
//# sourceMappingURL=sessionFilePath.js.map