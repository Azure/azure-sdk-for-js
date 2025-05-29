// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { concatUint8Arrays, hexStringToUint8Array } from "../../uint8.js";
import { BytePrefix } from "./prefix.js";
export function writeNumberForBinaryEncodingBigInt(hash) {
    let payload = encodeNumberAsUInt64BigInt(hash);
    // Convert the BytePrefix.Number hex string to Uint8Array.
    let outputStream = hexStringToUint8Array(BytePrefix.Number);
    const firstChunk = (payload >> BigInt(56)) & BigInt(0xff);
    outputStream = concatUint8Arrays([
        outputStream,
        hexStringToUint8Array(firstChunk.toString(16).padStart(2, "0")),
    ]);
    payload = (payload << BigInt(8)) & BigInt("0xffffffffffffffff");
    let byteToWrite = BigInt(0);
    let firstIteration = true;
    do {
        if (!firstIteration) {
            const padded = byteToWrite.toString(16).padStart(2, "0");
            if (padded !== "00") {
                outputStream = concatUint8Arrays([outputStream, hexStringToUint8Array(padded)]);
            }
        }
        else {
            firstIteration = false;
        }
        const shifted = (payload >> BigInt(56)) & BigInt(0xff);
        byteToWrite = shifted | BigInt(0x01);
        payload = (payload << BigInt(7)) & BigInt("0xffffffffffffffff");
    } while (payload !== BigInt(0));
    const lastChunk = byteToWrite & BigInt(0xfe);
    const padded = lastChunk.toString(16).padStart(2, "0");
    if (padded !== "00") {
        outputStream = concatUint8Arrays([outputStream, hexStringToUint8Array(padded)]);
    }
    return outputStream;
}
function encodeNumberAsUInt64BigInt(value) {
    const rawValueBits = getRawBitsBigInt(value);
    const mask = BigInt("0x8000000000000000");
    return mask > rawValueBits ? rawValueBits ^ mask : ~rawValueBits + BigInt(1);
}
function getRawBitsBigInt(value) {
    const buffer = new ArrayBuffer(8);
    const view = new DataView(buffer);
    view.setFloat64(0, value);
    // Convert the underlying bytes to a hex string.
    return BigInt("0x" + buf2hex(new Uint8Array(buffer)));
}
function buf2hex(arr) {
    return Array.from(arr)
        .map((x) => x.toString(16).padStart(2, "0"))
        .join("");
}
export function doubleToByteArrayBigInt(double) {
    const output = new Uint8Array(8);
    const lng = getRawBitsBigInt(double);
    for (let i = 0; i < 8; i++) {
        output[i] = Number((lng >> BigInt(i * 8)) & BigInt(0xff));
    }
    return output;
}
//# sourceMappingURL=number.js.map