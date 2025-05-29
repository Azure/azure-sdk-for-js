// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { HttpHeaders as HttpHeadersV1 } from "./httpHeaders.js";
function toHttpHeaderLike(headers) {
    return new HttpHeadersV1(headers.toJSON({ preserveCase: true }));
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
export function toHttpResponse(response) {
    return {
        request: toWebResourceLike(response.request),
        status: response.status,
        headers: toHttpHeaderLike(response.headers),
    };
}
//# sourceMappingURL=compatibility.js.map