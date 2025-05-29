"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.toBase64 = toBase64;
exports.toAscii = toAscii;
exports.stringToUint8Array = stringToUint8Array;
exports.base64ToUint8Array = base64ToUint8Array;
exports.parseCertificateBytes = parseCertificateBytes;
const core_util_1 = require("@azure/core-util");
/**
 * Decodes a Uint8Array into a Base64 string.
 * @internal
 */
function toBase64(bytes) {
    if (core_util_1.isNode) {
        return Buffer.from(bytes).toString("base64");
    }
    else {
        return btoa(String.fromCharCode.apply(null, bytes));
    }
}
/**
 * Decodes a Uint8Array into an ASCII string.
 * @internal
 */
function toAscii(bytes) {
    if (core_util_1.isNode) {
        return Buffer.from(bytes).toString("ascii");
    }
    else {
        return new TextDecoder("ascii").decode(bytes);
    }
}
/**
 * Encodes a JavaScript string into a Uint8Array.
 * @internal
 */
function stringToUint8Array(value) {
    if (core_util_1.isNode) {
        return Buffer.from(value);
    }
    else {
        return new TextEncoder().encode(value);
    }
}
/**
 * Encodes a Base64 string into a Uint8Array.
 * @internal
 */
function base64ToUint8Array(value) {
    if (core_util_1.isNode) {
        return Buffer.from(value, "base64");
    }
    else {
        return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
    }
}
/**
 * Parses the PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * into a Base64 encoded string.
 *
 * @internal
 * @param certificateBytes - The PFX or ASCII PEM formatted value of the certificate containing both the X.509 certificates and the private key
 * @param contentType - "application/x-pem-file", "application/x-pkcs12" or undefined
 */
function parseCertificateBytes(certificateBytes, contentType) {
    if (contentType === "application/x-pem-file") {
        // PEM files have the certificate bytes already Base64 formatted.
        return toAscii(certificateBytes);
    }
    else {
        return toBase64(certificateBytes);
    }
}
//# sourceMappingURL=utils.js.map