"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnonymousCredentialPolicy = void 0;
const CredentialPolicy_js_1 = require("./CredentialPolicy.js");
/**
 * AnonymousCredentialPolicy is used with HTTP(S) requests that read public resources
 * or for use with Shared Access Signatures (SAS).
 */
class AnonymousCredentialPolicy extends CredentialPolicy_js_1.CredentialPolicy {
    /**
     * Creates an instance of AnonymousCredentialPolicy.
     * @param nextPolicy -
     * @param options -
     */
    // The base class has a protected constructor. Adding a public one to enable constructing of this class.
    /* eslint-disable-next-line @typescript-eslint/no-useless-constructor*/
    constructor(nextPolicy, options) {
        super(nextPolicy, options);
    }
}
exports.AnonymousCredentialPolicy = AnonymousCredentialPolicy;
//# sourceMappingURL=AnonymousCredentialPolicy.js.map