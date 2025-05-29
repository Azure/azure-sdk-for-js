"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCallAutomationAccessKeyCredentialPolicy = createCallAutomationAccessKeyCredentialPolicy;
const cryptoUtils_js_1 = require("./cryptoUtils.js");
const core_util_1 = require("@azure/core-util");
const callAutomationAccessKeyCredentialPolicy = "CallAutomationAccessKeyCredentialPolicy";
/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
function createCallAutomationAccessKeyCredentialPolicy(credential, acsUrl) {
    return {
        name: callAutomationAccessKeyCredentialPolicy,
        async sendRequest(request, next) {
            var _a;
            const verb = request.method.toUpperCase();
            const utcNow = new Date().toUTCString();
            const contentHash = await (0, cryptoUtils_js_1.shaHash)(((_a = request.body) === null || _a === void 0 ? void 0 : _a.toString()) || "");
            const dateHeader = "x-ms-date";
            const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;
            const acsUrlCast = new URL(acsUrl);
            request.headers.set("x-ms-host", acsUrlCast.host);
            const url = new URL(request.url);
            const query = url.searchParams.toString();
            const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;
            const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${acsUrlCast.host};${contentHash}`;
            const signature = await (0, cryptoUtils_js_1.shaHMAC)(credential.key, stringToSign);
            if (core_util_1.isNode) {
                request.headers.set("Host", url.host || "");
            }
            request.headers.set(dateHeader, utcNow);
            request.headers.set("x-ms-content-sha256", contentHash);
            request.headers.set("Authorization", `HMAC-SHA256 SignedHeaders=${signedHeaders}&Signature=${signature}`);
            return next(request);
        },
    };
}
//# sourceMappingURL=callAutomationAccessKeyCredentialPolicy.js.map