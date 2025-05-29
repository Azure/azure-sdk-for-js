"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageBrowserPolicyName = void 0;
exports.storageBrowserPolicy = storageBrowserPolicy;
const core_util_1 = require("@azure/core-util");
const constants_js_1 = require("../utils/constants.js");
const utils_common_js_1 = require("../utils/utils.common.js");
/**
 * The programmatic identifier of the StorageBrowserPolicy.
 */
exports.storageBrowserPolicyName = "storageBrowserPolicy";
/**
 * storageBrowserPolicy is a policy used to prevent browsers from caching requests
 * and to remove cookies and explicit content-length headers.
 */
function storageBrowserPolicy() {
    return {
        name: exports.storageBrowserPolicyName,
        async sendRequest(request, next) {
            if (core_util_1.isNodeLike) {
                return next(request);
            }
            if (request.method === "GET" || request.method === "HEAD") {
                request.url = (0, utils_common_js_1.setURLParameter)(request.url, constants_js_1.URLConstants.Parameters.FORCE_BROWSER_NO_CACHE, new Date().getTime().toString());
            }
            request.headers.delete(constants_js_1.HeaderConstants.COOKIE);
            // According to XHR standards, content-length should be fully controlled by browsers
            request.headers.delete(constants_js_1.HeaderConstants.CONTENT_LENGTH);
            return next(request);
        },
    };
}
//# sourceMappingURL=StorageBrowserPolicyV2.js.map