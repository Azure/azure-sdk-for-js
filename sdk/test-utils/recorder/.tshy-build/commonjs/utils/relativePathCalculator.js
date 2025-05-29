"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.relativeRecordingsPath = relativeRecordingsPath;
const tslib_1 = require("tslib");
const node_path_1 = tslib_1.__importDefault(require("node:path"));
const node_fs_1 = tslib_1.__importDefault(require("node:fs"));
const utils_js_1 = require("./utils.js");
/**
 * Replace backslashes in a path with forward slashes so they are not treated as escape characters
 * in the browser tests.
 * @param filePath The path to replace
 * @returns A path without backslashes
 */
function toSafePath(filePath) {
    return filePath.split(node_path_1.default.sep).join(node_path_1.default.posix.sep);
}
/**
 * Determines the path of the package being tested relative to the repository root.
 */
function relativePackagePath() {
    const currentPath = process.cwd(); // Gives the current working directory
    let rootPath = undefined;
    let expectedProjectPath = undefined;
    if (node_fs_1.default.existsSync(node_path_1.default.join(currentPath, "package.json"))) {
        // <root>/sdk/service/project/package.json
        if (node_fs_1.default.existsSync(node_path_1.default.join(currentPath, "package.json"))) {
            expectedProjectPath = currentPath; // <root>/sdk/service/project/
            const expectedRootPath = node_path_1.default.join(currentPath, "..", "..", ".."); // <root>/
            if (node_fs_1.default.existsSync(node_path_1.default.join(expectedRootPath, "sdk/")) && // <root>/sdk
                node_fs_1.default.existsSync(node_path_1.default.join(expectedRootPath, "rush.json")) // <root>/rush.json
            ) {
                // reached root path
                rootPath = expectedRootPath;
            }
        }
    }
    else {
        throw new utils_js_1.RecorderError(`'package.json' is not found at ${currentPath}`);
    }
    if (!(rootPath === undefined || expectedProjectPath === undefined)) {
        // <root>/
        // <root>/sdk/service/project/
        // => sdk/service/project
        return node_path_1.default.relative(rootPath, expectedProjectPath);
    }
    else {
        throw new utils_js_1.RecorderError("rootPath or expectedProjectPath could not be calculated properly from process.cwd()");
    }
}
/**
 * Returns the potential `recordings` folder(relative path) for the project using `process.cwd()`.
 *
 * Note for browser tests:
 *    1. Supposed to be called from karma.conf.js in the package for which the testing is being done.
 *    2. Set this `RECORDINGS_RELATIVE_PATH` as an env variable
 *      ```js
 *        const { relativeRecordingsPathForBrowser } = require("@azure-tools/test-recorder-new");
 *        process.env.RECORDINGS_RELATIVE_PATH = relativeRecordingsPathForBrowser();
 *      ```
 *    3. Add "RECORDINGS_RELATIVE_PATH" in the `envPreprocessor` array to let this be loaded in the browser environment.
 *      ```
 *        envPreprocessor: ["RECORDINGS_RELATIVE_PATH"],
 *      ```
 *
 * `RECORDINGS_RELATIVE_PATH` in the browser environment is used in the recorder to tell the proxy-tool about the location to generate the browser recordings at.
 *
 * @export
 * @returns {string} location of the relative `recordings` folder path - `sdk/storage/storage-blob/recordings/` example
 */
function relativeRecordingsPath() {
    return toSafePath(node_path_1.default.join(relativePackagePath(), "recordings"));
}
//# sourceMappingURL=relativePathCalculator.js.map