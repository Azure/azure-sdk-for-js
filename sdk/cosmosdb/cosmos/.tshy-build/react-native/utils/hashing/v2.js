// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { doubleToByteArrayBigInt } from "./encoding/number.js";
import { BytePrefix } from "./encoding/prefix.js";
import MurmurHash from "./murmurHash.js";
import { concatUint8Arrays, hexStringToUint8Array, uint8ArrayToHex } from "../uint8.js";
export function hashV2PartitionKey(partitionKey) {
    // Create a single Uint8Array from the concatenated prefixes for each partition key value.
    const toHash = concatUint8Arrays(partitionKey.map(prefixKeyByType));
    // Compute the 128-bit hash. This returns a hex string.
    const hash = MurmurHash.x64.hash128(toHash);
    // Convert the hex string hash to a Uint8Array and reverse it.
    const reverseBuff = reverse(hexStringToUint8Array(hash));
    // Mask the first byte as required.
    reverseBuff[0] &= 0x3f;
    // Convert the reversed buffer back to a hex string, uppercase it, and return.
    return uint8ArrayToHex(reverseBuff).toUpperCase();
}
function prefixKeyByType(key) {
    let bytes;
    switch (typeof key) {
        case "string": {
            // For strings, concatenate:
            // - The hex prefix for String
            // - The UTF-8 bytes for the key (using Uint8Array.from should work for string iterables; alternatively use an encoder)
            // - The hex prefix for Infinity
            bytes = concatUint8Arrays([
                hexStringToUint8Array(BytePrefix.String),
                new TextEncoder().encode(key),
                hexStringToUint8Array(BytePrefix.Infinity),
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
export function reverse(buff) {
    // Replace Uint8Array.allocUnsafe(buff.length) with new Uint8Array(buff.length)
    const uint8array = new Uint8Array(buff.length);
    for (let i = 0, j = buff.length - 1; i <= j; ++i, --j) {
        uint8array[i] = buff[j];
        uint8array[j] = buff[i];
    }
    return uint8array;
}
//# sourceMappingURL=v2.js.map