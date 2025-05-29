"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAttestationPolicyToken = createAttestationPolicyToken;
const storedAttestationPolicy_js_1 = require("./storedAttestationPolicy.js");
const attestationToken_js_1 = require("./attestationToken.js");
/** Constructs an AttestationToken containing an Attestation Policy document.
 *
 * @param policy - Attestation policy to embed in the attestation token.
 * @param privateKey - optional private key used to sign the attestation token.
 * @param certificate - optional certificate used to verify the attestation token.
 *
 * @remarks Note that if the attestation instance is running in `Isolated` mode,
 *  the privateKey and certificate are required. If the attestation instance
 *  is running in `AAD` mode, they are optional.
 *
 * @throws {@link Error} when the key in the certificate provided does not match the private key.
 */
function createAttestationPolicyToken(policy, privateKey, certificate) {
    const token = attestationToken_js_1.AttestationTokenImpl.create({
        body: new storedAttestationPolicy_js_1.StoredAttestationPolicy(policy).serialize(),
        privateKey: privateKey,
        certificate: certificate,
    });
    return token;
}
//# sourceMappingURL=attestationPolicyToken.js.map