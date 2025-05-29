"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAttestationSigningKey = verifyAttestationSigningKey;
exports.pemFromBase64 = pemFromBase64;
exports.hexToBase64 = hexToBase64;
const tslib_1 = require("tslib");
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../jsrsasign.d.ts"/>
const jsrsasign = tslib_1.__importStar(require("jsrsasign"));
const base64_js_1 = require("./base64.js");
/** Create an AttestationSigningKey from the provided private key and certificate.
 *
 * @param privateKey - PEM encoded DER Encoded RSA or ECDS key.
 * @param certificate - PEM encoded DER encoded X.509 certificate.
 */
function verifyAttestationSigningKey(privateKey, certificate) {
    //
    // Ensure that the key and certificate are associated with each other.
    //
    // Sign a buffer with the key, then verify the signature with the
    // certificate.
    const x509 = new jsrsasign.X509();
    x509.readCertPEM(certificate);
    const alg = x509.getSignatureAlgorithmName();
    const signer = new jsrsasign.KJUR.crypto.Signature({ alg: alg });
    // Confirm that the certificate and private key are related to each other.
    const bufferToSign = "1234";
    signer.init(privateKey);
    signer.updateString(bufferToSign);
    const sigVal = signer.sign();
    const verifier = new jsrsasign.KJUR.crypto.Signature({ alg: alg });
    verifier.init(x509.getPublicKey());
    verifier.updateString(bufferToSign);
    if (!verifier.verify(sigVal)) {
        throw new Error("verifyAttestationSigningKey: Key does not match Certificate.");
    }
    return { certificate: certificate, privateKey: privateKey };
}
/**
 *
 * @param base64 - Base64 encoded DER object to encode as PEM.
 * @param pemType - PEM object type - typically "CERTIFICATE" |
 */
function pemFromBase64(base64, pemType) {
    let pem = "-----BEGIN " + pemType + "-----\n";
    while (base64 !== "") {
        pem += base64.substr(0, 64) + "\n";
        base64 = base64.substr(64);
    }
    pem += "-----END " + pemType + "-----\n";
    return pem;
}
/**
 * Converts a hex encoded string to its base64 equivalent.
 * @param value - Hex encoded value
 */
function hexToBase64(value) {
    return (0, base64_js_1.base64EncodeByteArray)((0, base64_js_1.hexToByteArray)(value));
}
//# sourceMappingURL=helpers.js.map