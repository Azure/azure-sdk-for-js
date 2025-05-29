// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { BytePrefix } from "./prefix.js";
import { hexStringToUint8Array, concatUint8Arrays } from "../../uint8.js";
export function writeStringForBinaryEncoding(payload) {
    // Convert the BytePrefix.String hex into a Uint8Array.
    const outputStream = hexStringToUint8Array(BytePrefix.String);
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
        finalStream = concatUint8Arrays([finalStream, hexStringToUint8Array(hexRep)]);
    }
    if (isShortString) {
        finalStream = concatUint8Arrays([finalStream, hexStringToUint8Array(BytePrefix.Undefined)]);
    }
    return finalStream;
}
//# sourceMappingURL=string.js.map