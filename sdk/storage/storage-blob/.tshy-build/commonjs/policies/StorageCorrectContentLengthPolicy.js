"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.storageCorrectContentLengthPolicyName = void 0;
exports.storageCorrectContentLengthPolicy = storageCorrectContentLengthPolicy;
const constants_js_1 = require("../utils/constants.js");
/**
 * The programmatic identifier of the storageCorrectContentLengthPolicy.
 */
exports.storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";
/**
 * storageCorrectContentLengthPolicy to correctly set Content-Length header with request body length.
 */
function storageCorrectContentLengthPolicy() {
    function correctContentLength(request) {
        if (request.body &&
            (typeof request.body === "string" || Buffer.isBuffer(request.body)) &&
            request.body.length > 0) {
            request.headers.set(constants_js_1.HeaderConstants.CONTENT_LENGTH, Buffer.byteLength(request.body));
        }
    }
    return {
        name: exports.storageCorrectContentLengthPolicyName,
        async sendRequest(request, next) {
            correctContentLength(request);
            return next(request);
        },
    };
}
//# sourceMappingURL=StorageCorrectContentLengthPolicy.js.map