"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPhoneNumbersPagingPolicy = createPhoneNumbersPagingPolicy;
/**
 * Creates a `PipelinePolicy` that converts relative URL values in the `nextLink` property to absolute URLs.
 *
 * This is necessary because the Core V2 library does not support paging with relative links at time of writing.
 *
 * @param host - The base URL of the resource.
 * @returns the `PipelinePolicy` that addresses the issue.
 */
function createPhoneNumbersPagingPolicy(host) {
    return {
        name: "phoneNumbersPagingPolicy",
        async sendRequest(request, next) {
            var _a;
            const response = await next(request);
            let nextLink = (_a = response === null || response === void 0 ? void 0 : response.parsedBody) === null || _a === void 0 ? void 0 : _a.nextLink;
            if (nextLink && !nextLink.startsWith(host)) {
                nextLink = host.endsWith("/") ? nextLink.substring(1) : nextLink;
                const absolutePath = `${host}${nextLink}`;
                response.parsedBody.nextLink = absolutePath;
            }
            return response;
        },
    };
}
//# sourceMappingURL=customPipelinePolicies.js.map