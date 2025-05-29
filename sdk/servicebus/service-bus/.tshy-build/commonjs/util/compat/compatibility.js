"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toHttpResponse = toHttpResponse;
const httpHeaders_js_1 = require("./httpHeaders.js");
function toHttpHeaderLike(headers) {
    return new httpHeaders_js_1.HttpHeaders(headers.toJSON({ preserveCase: true }));
}
function toWebResourceLike(request) {
    return {
        url: request.url,
        method: request.method,
        headers: toHttpHeaderLike(request.headers),
        withCredentials: request.withCredentials,
        timeout: request.timeout,
        requestId: request.headers.get("x-ms-client-request-id") || "",
    };
}
/**
 * Helper to transform PipelineResponse to slimmed-down HttpResponse used in Service Bus.
 */
function toHttpResponse(response) {
    return {
        request: toWebResourceLike(response.request),
        status: response.status,
        headers: toHttpHeaderLike(response.headers),
    };
}
//# sourceMappingURL=compatibility.js.map