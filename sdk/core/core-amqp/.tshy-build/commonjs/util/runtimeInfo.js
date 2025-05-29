"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlatformInfo = getPlatformInfo;
exports.getFrameworkInfo = getFrameworkInfo;
const tslib_1 = require("tslib");
const os = tslib_1.__importStar(require("node:os"));
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
function getPlatformInfo() {
    return `(${os.arch()}-${os.type()}-${os.release()})`;
}
/**
 * Returns information about Node.js this function is being run on.
 * @internal
 */
function getFrameworkInfo() {
    return `Node/${process.version}`;
}
//# sourceMappingURL=runtimeInfo.js.map