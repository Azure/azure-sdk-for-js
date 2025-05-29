"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousCredential = void 0;
const AnonymousCredentialPolicy_js_1 = require("../policies/AnonymousCredentialPolicy.js");
const Credential_js_1 = require("./Credential.js");
/**
 * AnonymousCredential provides a credentialPolicyCreator member used to create
 * AnonymousCredentialPolicy objects. AnonymousCredentialPolicy is used with
 * HTTP(S) requests that read public resources or for use with Shared Access
 * Signatures (SAS).
 */
class AnonymousCredential extends Credential_js_1.Credential {
    /**
     * Creates an {@link AnonymousCredentialPolicy} object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy, options) {
        return new AnonymousCredentialPolicy_js_1.AnonymousCredentialPolicy(nextPolicy, options);
    }
}
exports.AnonymousCredential = AnonymousCredential;
//# sourceMappingURL=AnonymousCredential.js.map