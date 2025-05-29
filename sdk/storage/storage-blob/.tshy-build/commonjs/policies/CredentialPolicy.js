"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.CredentialPolicy = void 0;
const RequestPolicy_js_1 = require("./RequestPolicy.js");
/**
 * Credential policy used to sign HTTP(S) requests before sending. This is an
 * abstract class.
 */
class CredentialPolicy extends RequestPolicy_js_1.BaseRequestPolicy {
    /**
     * Sends out request.
     *
     * @param request -
     */
    sendRequest(request) {
        return this._nextPolicy.sendRequest(this.signRequest(request));
    }
    /**
     * Child classes must implement this method with request signing. This method
     * will be executed in {@link sendRequest}.
     *
     * @param request -
     */
    signRequest(request) {
        // Child classes must override this method with request signing. This method
        // will be executed in sendRequest().
        return request;
    }
}
exports.CredentialPolicy = CredentialPolicy;
//# sourceMappingURL=CredentialPolicy.js.map