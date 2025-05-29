// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { shaHMAC, shaHash } from "./cryptoUtils.js";
import { isNode } from "@azure/core-util";
const callAutomationAccessKeyCredentialPolicy = "CallAutomationAccessKeyCredentialPolicy";
/**
 * Creates an HTTP pipeline policy to authenticate a request using a `KeyCredential`.
 * @hidden
 *
 * @param credential - The key credential.
 */
export function createCallAutomationAccessKeyCredentialPolicy(credential, acsUrl) {
    return {
        name: callAutomationAccessKeyCredentialPolicy,
        async sendRequest(request, next) {
            var _a;
            const verb = request.method.toUpperCase();
            const utcNow = new Date().toUTCString();
            const contentHash = await shaHash(((_a = request.body) === null || _a === void 0 ? void 0 : _a.toString()) || "");
            const dateHeader = "x-ms-date";
            const signedHeaders = `${dateHeader};host;x-ms-content-sha256`;
            const acsUrlCast = new URL(acsUrl);
            request.headers.set("x-ms-host", acsUrlCast.host);
            const url = new URL(request.url);
            const query = url.searchParams.toString();
            const urlPathAndQuery = query ? `${url.pathname}?${query}` : url.pathname;
            const stringToSign = `${verb}\n${urlPathAndQuery}\n${utcNow};${acsUrlCast.host};${contentHash}`;
            const signature = await shaHMAC(credential.key, stringToSign);
            if (isNode) {
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