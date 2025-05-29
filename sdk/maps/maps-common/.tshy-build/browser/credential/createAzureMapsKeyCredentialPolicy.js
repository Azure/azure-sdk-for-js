// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const API_KEY_HEADER_NAME = "subscription-key";
/**
 * The programmatic identifier of the mapsAzureKeyCredentialPolicy.
 */
const azureMapsKeyCredentialPolicyName = "mapsAzureKeyCredentialPolicy";
/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Maps
 */
export function createAzureMapsKeyCredentialPolicy(azureKeyCredential) {
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