// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { doubleToByteArrayBigInt, writeNumberForBinaryEncodingBigInt } from "./encoding/number.js";
import { writeStringForBinaryEncoding } from "./encoding/string.js";
import { BytePrefix } from "./encoding/prefix.js";
import MurmurHash from "./murmurHash.js";
import { concatUint8Arrays, hexStringToUint8Array, uint8ArrayToHex } from "../uint8.js";
const MAX_STRING_CHARS = 100;
export function hashV1PartitionKey(partitionKey) {
    const key = partitionKey[0];
    const toHash = prefixKeyByType(key);
    const hash = MurmurHash.x86.hash32(toHash);
    const encodedJSBI = writeNumberForBinaryEncodingBigInt(hash);
    const encodedValue = encodeByType(key);
    const finalHash = uint8ArrayToHex(concatUint8Arrays([encodedJSBI, encodedValue])).toUpperCase();
    return finalHash;
}
function prefixKeyByType(key) {
    let bytes;
    switch (typeof key) {
        case "string": {
            const truncated = key.substr(0, MAX_STRING_CHARS);
            bytes = concatUint8Arrays([
                hexStringToUint8Array(BytePrefix.String),
                new TextEncoder().encode(truncated),
                hexStringToUint8Array(BytePrefix.Undefined),
            ]);
            return bytes;
        }
        case "number": {
            const numberBytes = doubleToByteArrayBigInt(key);
            bytes = concatUint8Arrays([hexStringToUint8Array(BytePrefix.Number), numberBytes]);
            return bytes;
        }
        case "boolean": {
            const prefix = key ? BytePrefix.True : BytePrefix.False;
            return hexStringToUint8Array(prefix);
        }
        case "object": {
            if (key === null) {
                return hexStringToUint8Array(BytePrefix.Null);
            }
            return hexStringToUint8Array(BytePrefix.Undefined);
        }
        case "undefined": {
            return hexStringToUint8Array(BytePrefix.Undefined);
        }
        default:
            throw new Error(`Unexpected type: ${typeof key}`);
    }
}
function encodeByType(key) {
    switch (typeof key) {
        case "string": {
            const truncated = key.substring(0, MAX_STRING_CHARS);
            return writeStringForBinaryEncoding(truncated);
        }
        case "number": {
            return writeNumberForBinaryEncodingBigInt(key);
        }
        case "boolean": {
            const prefix = key ? BytePrefix.True : BytePrefix.False;
            return hexStringToUint8Array(prefix);
        }
        case "object":
            if (key === null) {
                return hexStringToUint8Array(BytePrefix.Null);
            }
            return hexStringToUint8Array(BytePrefix.Undefined);
        case "undefined":
            return hexStringToUint8Array(BytePrefix.Undefined);
        default:
            throw new Error(`Unexpected type: ${typeof key}`);
    }
}
//# sourceMappingURL=v1.js.map