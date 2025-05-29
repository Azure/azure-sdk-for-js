// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";
/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
export const createCommunicationTokenCredentialPolicy = (credential) => {
    const policyOptions = {
        credential: {
            getToken: (_scopes, options) => credential.getToken({ abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal }),
        },
        scopes: [],
    };
    return bearerTokenAuthenticationPolicy(policyOptions);
};
//# sourceMappingURL=communicationTokenCredentialPolicy.js.map