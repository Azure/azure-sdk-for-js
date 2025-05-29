"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeStringForBinaryEncoding = writeStringForBinaryEncoding;
const prefix_js_1 = require("./prefix.js");
const uint8_js_1 = require("../../uint8.js");
function writeStringForBinaryEncoding(payload) {
    // Convert the BytePrefix.String hex into a Uint8Array.
    const outputStream = (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.String);
    const MAX_STRING_BYTES_TO_APPEND = 100;
    // Use TextEncoder to get a UTF-8 byte array from the payload.
    const byteArray = new TextEncoder().encode(payload);
    const isShortString = payload.length <= MAX_STRING_BYTES_TO_APPEND;
    let finalStream = outputStream;
    for (let index = 0; index < (isShortString ? byteArray.length : MAX_STRING_BYTES_TO_APPEND + 1); index++) {
        let charByte = byteArray[index];
        if (charByte < 0xff) {
            charByte++;
        }
        // Convert the byte value to a 2-digit hex string.
        const hexRep = charByte.toString(16).padStart(2, "0");
        finalStream = (0, uint8_js_1.concatUint8Arrays)([finalStream, (0, uint8_js_1.hexStringToUint8Array)(hexRep)]);
    }
    if (isShortString) {
        finalStream = (0, uint8_js_1.concatUint8Arrays)([finalStream, (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined)]);
    }
    return finalStream;
}
//# sourceMappingURL=string.js.map