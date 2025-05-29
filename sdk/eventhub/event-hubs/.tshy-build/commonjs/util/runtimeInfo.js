"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRuntimeInfo = getRuntimeInfo;
const tslib_1 = require("tslib");
const os = tslib_1.__importStar(require("os"));
/**
 * Returns information about the platform this function is being run on.
 * @internal
 */
function getRuntimeInfo() {
    return `NODE-VERSION ${process.version}; ${os.type()} ${os.release()}`;
}
//# sourceMappingURL=runtimeInfo.js.map