"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAzureMapsKeyCredentialPolicy = createAzureMapsKeyCredentialPolicy;
const API_KEY_HEADER_NAME = "subscription-key";
/**
 * The programmatic identifier of the mapsAzureKeyCredentialPolicy.
 */
const azureMapsKeyCredentialPolicyName = "mapsAzureKeyCredentialPolicy";
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Maps
 */
function createAzureMapsKeyCredentialPolicy(azureKeyCredential) {
    return {
        name: azureMapsKeyCredentialPolicyName,
        async sendRequest(request, next) {
            if (!request.headers.has(API_KEY_HEADER_NAME)) {
                request.headers.set(API_KEY_HEADER_NAME, azureKeyCredential.key);
            }
            return next(request);
        },
    };
}
//# sourceMappingURL=createAzureMapsKeyCredentialPolicy.js.map