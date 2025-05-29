// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
const MAPS_CLIENT_ID_HEADER_NAME = "x-ms-client-id";
/**
 * The programmatic identifier of the mapsTokenCredentialPolicy.
 */
const mapsClientIdPolicyName = "mapsClientIdPolicy";
/**
 * Create an HTTP pipeline policy to add x-ms-client-id header
 * for `TokenCredential` based authentication for Azure Maps
 */
export function createMapsClientIdPolicy(mapsClientId) {
    return {
        name: mapsClientIdPolicyName,
        async sendRequest(request, next) {
            if (!request.headers.has(MAPS_CLIENT_ID_HEADER_NAME)) {
                request.headers.set(MAPS_CLIENT_ID_HEADER_NAME, mapsClientId);
            }
            return next(request);
        },
    };
}
//# sourceMappingURL=createMapsClientIdPolicy.js.map