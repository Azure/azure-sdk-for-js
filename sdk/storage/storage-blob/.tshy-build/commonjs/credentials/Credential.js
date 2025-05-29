"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Credential = void 0;
/**
 * Credential is an abstract class for Azure Storage HTTP requests signing. This
 * class will host an credentialPolicyCreator factory which generates CredentialPolicy.
 */
class Credential {
    /**
     * Creates a RequestPolicy object.
     *
     * @param _nextPolicy -
     * @param _options -
     */
    create(_nextPolicy, _options) {
        throw new Error("Method should be implemented in children classes.");
    }
}
exports.Credential = Credential;
//# sourceMappingURL=Credential.js.map