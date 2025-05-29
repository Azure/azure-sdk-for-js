"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserAgent = getUserAgent;
const constants_js_1 = require("./constants.js");
/**
 * @hidden
 */
function getUserAgent(suffix, hostFramework) {
    let ua = `${userAgentDetails()} ${constants_js_1.Constants.SDKName}/${constants_js_1.Constants.SDKVersion}`;
    if (hostFramework) {
        ua = ua + " " + hostFramework;
    }
    if (suffix) {
        ua = ua + " " + suffix;
    }
    return ua;
}
// TODO: Standardize across other platforms from @azure/core-util
function userAgentDetails() {
    let userAgentDetail = "<environment undetectable>";
    if (globalThis.navigator && globalThis.navigator.userAgent) {
        userAgentDetail = globalThis.navigator.userAgent;
    }
    if (globalThis.process && globalThis.process.version) {
        userAgentDetail = `Node.js/${process.version.slice(1)} (${process.platform}; ${process.arch})`;
    }
    return userAgentDetail;
}
//# sourceMappingURL=platform.js.map