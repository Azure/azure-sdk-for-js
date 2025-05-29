"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttestationResponse = createAttestationResponse;
/** Create an AttestationResponse object.
 *
 * @param token - Token which was returned from the attestation service.
 * @param value - Value for the response. Usually derived from the body of the token
 *    returned by the service.
 * @returns - A newly created AttestationResponse object.
 */
function createAttestationResponse(token, value) {
    return { token: token, body: value };
}
//# sourceMappingURL=attestationResponse.js.map