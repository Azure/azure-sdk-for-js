"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageBrowserPolicy = void 0;
const RequestPolicy_js_1 = require("./RequestPolicy.js");
const core_util_1 = require("@azure/core-util");
const constants_js_1 = require("../utils/constants.js");
const utils_common_js_1 = require("../utils/utils.common.js");
/**
 * StorageBrowserPolicy will handle differences between Node.js and browser runtime, including:
 *
 * 1. Browsers cache GET/HEAD requests by adding conditional headers such as 'IF_MODIFIED_SINCE'.
 * StorageBrowserPolicy is a policy used to add a timestamp query to GET/HEAD request URL
 * thus avoid the browser cache.
 *
 * 2. Remove cookie header for security
 *
 * 3. Remove content-length header to avoid browsers warning
 */
class StorageBrowserPolicy extends RequestPolicy_js_1.BaseRequestPolicy {
    /**
     * Creates an instance of StorageBrowserPolicy.
     * @param nextPolicy -
     * @param options -
     */
    // The base class has a protected constructor. Adding a public one to enable constructing of this class.
    /* eslint-disable-next-line @typescript-eslint/no-useless-constructor*/
    constructor(nextPolicy, options) {
        super(nextPolicy, options);
    }
    /**
     * Sends out request.
     *
     * @param request -
     */
    async sendRequest(request) {
        if (core_util_1.isNodeLike) {
            return this._nextPolicy.sendRequest(request);
        }
        if (request.method.toUpperCase() === "GET" || request.method.toUpperCase() === "HEAD") {
            request.url = (0, utils_common_js_1.setURLParameter)(request.url, constants_js_1.URLConstants.Parameters.FORCE_BROWSER_NO_CACHE, new Date().getTime().toString());
        }
        request.headers.remove(constants_js_1.HeaderConstants.COOKIE);
        // According to XHR standards, content-length should be fully controlled by browsers
        request.headers.remove(constants_js_1.HeaderConstants.CONTENT_LENGTH);
        return this._nextPolicy.sendRequest(request);
    }
}
exports.StorageBrowserPolicy = StorageBrowserPolicy;
//# sourceMappingURL=StorageBrowserPolicy.js.map