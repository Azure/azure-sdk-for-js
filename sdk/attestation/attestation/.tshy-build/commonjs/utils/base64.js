"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeString = encodeString;
exports.base64EncodeByteArray = base64EncodeByteArray;
exports.base64UrlEncodeByteArray = base64UrlEncodeByteArray;
exports.base64DecodeString = base64DecodeString;
exports.base64UrlDecodeString = base64UrlDecodeString;
exports.hexToByteArray = hexToByteArray;
exports.byteArrayToHex = byteArrayToHex;
/**
 * Encodes a string in base64 format.
 * @param value - the string to encode
 */
function encodeString(value) {
    return Buffer.from(value).toString("base64");
}
/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
function base64EncodeByteArray(value) {
    // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
    // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
    const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
    return bufferValue.toString("base64");
}
/**
 * Encodes a byte array in base64 format.
 * @param value - the Uint8Array to encode
 */
function base64UrlEncodeByteArray(value) {
    // Buffer.from accepts <ArrayBuffer> | <SharedArrayBuffer>-- the TypeScript definition is off here
    // https://nodejs.org/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
    const bufferValue = value instanceof Buffer ? value : Buffer.from(value.buffer);
    const base64 = bufferValue.toString("base64");
    // Convert the base64 buffer to base64url.
    return base64.replace(/\+/g, "-").replace(/\//, "_").split("=")[0];
}
/**
 * Decodes a base64 string into a byte array.
 * @param value - the base64 string to decode
 */
function base64DecodeString(value) {
    return Buffer.from(value, "base64");
}
/**
 * Adds missing padding to a Base64 encoded string
 * @param unpadded - The unpadded input string
 * @returns The padded string
 */
function fixPadding(unpadded) {
    const count = 3 - ((unpadded.length + 3) % 4);
    return unpadded + "=".repeat(count);
}
/**
 * Decodes a base64url string into a byte array.
 * @param value - the base64url string to decode
 */
function base64UrlDecodeString(value) {
    const encoded = value.replace(/-/g, "+").replace(/_/g, "/");
    const paddedEncoded = fixPadding(encoded);
    return base64DecodeString(paddedEncoded);
}
function hexToByteArray(value) {
    if (value.length % 2 !== 0) {
        throw new Error("base64FromHex: Input must be a multiple of 2 characters");
    }
    const byteArray = new Array();
    for (let i = 0; i < value.length; i += 2) {
        byteArray.push(parseInt(value.substr(i, 2), 16));
    }
    return Uint8Array.from(byteArray);
}
function byteArrayToHex(value) {
    return value.reduce((str, byte) => str + byte.toString(16).padStart(2, "0"), "");
}
//# sourceMappingURL=base64.js.map