"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionFilePath = sessionFilePath;
exports.recordingFilePath = recordingFilePath;
exports.assetsJsonPath = assetsJsonPath;
const core_util_1 = require("@azure/core-util");
const filePathGenerator_js_1 = require("./filePathGenerator.js");
const relativePathCalculator_js_1 = require("./relativePathCalculator.js");
function sessionFilePath(testContext) {
    // sdk/service/project/recordings/{node|browsers}/<describe-block-title>/recording_<test-title>.json
    return `${(0, relativePathCalculator_js_1.relativeRecordingsPath)()}/${recordingFilePath(testContext)}`;
}
/**
 * Generates a file path with the following structure:
 *
 *  `{node|browsers}/<describe-block-title>/recording_<test-title>.json`
 */
function recordingFilePath(testContext) {
    return (0, filePathGenerator_js_1.generateTestRecordingFilePath)(core_util_1.isNode ? "node" : "browsers", testContext.suiteTitle, testContext.testTitle);
}
function assetsJsonPath() {
    // Hacky solution using substring works around the fact that:
    // 1) the relativeRecordingsPath may not exist on disk (so relativeRecordingsPath()/../assets.json might not exist either, can't use ..)
    // 2) `path` (and therefore `path.dirname`) is not available in the browser.
    const recordingsPath = (0, relativePathCalculator_js_1.relativeRecordingsPath)();
    const sdkDir = recordingsPath.substring(0, recordingsPath.lastIndexOf("/"));
    return `${sdkDir}/assets.json`;
}
//# sourceMappingURL=sessionFilePath.js.map