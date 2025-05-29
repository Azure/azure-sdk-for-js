"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCommunicationTokenCredentialPolicy = void 0;
const core_rest_pipeline_1 = require("@azure/core-rest-pipeline");
/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
const createCommunicationTokenCredentialPolicy = (credential) => {
    const policyOptions = {
        credential: {
            getToken: (_scopes, options) => credential.getToken({ abortSignal: options === null || options === void 0 ? void 0 : options.abortSignal }),
        },
        scopes: [],
    };
    return (0, core_rest_pipeline_1.bearerTokenAuthenticationPolicy)(policyOptions);
};
exports.createCommunicationTokenCredentialPolicy = createCommunicationTokenCredentialPolicy;
//# sourceMappingURL=communicationTokenCredentialPolicy.js.map