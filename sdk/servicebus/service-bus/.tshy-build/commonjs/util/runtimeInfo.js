"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRuntimeInfo = getRuntimeInfo;
const tslib_1 = require("tslib");
const os = tslib_1.__importStar(require("node:os"));
/**
 * Returns information about the platform this function is being run on.
 * @hidden
 * @internal
 */
function getRuntimeInfo() {
    const runtimeInfo = {
        key: "Node",
        value: process.version,
    };
    const osInfo = {
        key: "OS",
        value: `(${os.arch()}-${os.type()}-${os.release()})`,
    };
    return `${runtimeInfo.key}/${runtimeInfo.value} ${osInfo.key}/${osInfo.value}`;
}
//# sourceMappingURL=runtimeInfo.js.map