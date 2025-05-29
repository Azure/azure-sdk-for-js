"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommunicationAccessKeyCredentialPolicy = createCommunicationAccessKeyCredentialPolicy;
const cryptoUtils_js_1 = require("./cryptoUtils.js");
const core_util_1 = require("@azure/core-util");
/**
 * CommunicationKeyCredentialPolicy provides a means of signing requests made through
 * the SmsClient.
 */
const communicationAccessKeyCredentialPolicy = "CommunicationAccessKeyCredentialPolicy";
/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
function createCommunicationAccessKeyCredentialPolicy(credential) {
    return {
        name: communicationAccessKeyCredentialPolicy,
        async sendRequest(request, next) {
            var _a;
            const verb = request.method.toUpperCase();
            const utcNow = new Date().toUTCString();
            const contentHash = await (0, cryptoUtils_js_1.shaHash)(((_a = request.body) === null || _a === void 0 ? void 0 : _a.toString()) || "");
            const dateHeader = "x-ms-date";
            const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;
            const url = new URL(request.url);
            const query = url.searchParams.toString();
            const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;
            const port = url.port;
            const hostAndPort = port ? `${url.host}:${port}` : url.host;
            const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${hostAndPort};${contentHash}`;
            const signature = await (0, cryptoUtils_js_1.shaHMAC)(credential.key, stringToSign);
            if (core_util_1.isNodeLike) {
                request.headers.set("Host", hostAndPort || "");
            }
            request.headers.set(dateHeader, utcNow);
            request.headers.set("x-ms-content-sha256", contentHash);
            request.headers.set("Authorization", `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`);
            return next(request);
        },
    };
}
//# sourceMappingURL=communicationAccessKeyCredentialPolicy.js.map