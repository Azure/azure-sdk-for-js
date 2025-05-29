"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashV2PartitionKey = hashV2PartitionKey;
exports.reverse = reverse;
const tslib_1 = require("tslib");
const number_js_1 = require("./encoding/number.js");
const prefix_js_1 = require("./encoding/prefix.js");
const murmurHash_js_1 = tslib_1.__importDefault(require("./murmurHash.js"));
const uint8_js_1 = require("../uint8.js");
function hashV2PartitionKey(partitionKey) {
    // Create a single Uint8Array from the concatenated prefixes for each partition key value.
    const toHash = (0, uint8_js_1.concatUint8Arrays)(partitionKey.map(prefixKeyByType));
    // Compute the 128-bit hash. This returns a hex string.
    const hash = murmurHash_js_1.default.x64.hash128(toHash);
    // Convert the hex string hash to a Uint8Array and reverse it.
    const reverseBuff = reverse((0, uint8_js_1.hexStringToUint8Array)(hash));
    // Mask the first byte as required.
    reverseBuff[0] &= 0x3f;
    // Convert the reversed buffer back to a hex string, uppercase it, and return.
    return (0, uint8_js_1.uint8ArrayToHex)(reverseBuff).toUpperCase();
}
function prefixKeyByType(key) {
    let bytes;
    switch (typeof key) {
        case "string": {
            // For strings, concatenate:
            // - The hex prefix for String
            // - The UTF-8 bytes for the key (using Uint8Array.from should work for string iterables; alternatively use an encoder)
            // - The hex prefix for Infinity
            bytes = (0, uint8_js_1.concatUint8Arrays)([
                (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.String),
                new TextEncoder().encode(key),
                (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Infinity),
            ]);
            return bytes;
        }
        case "number": {
            const numberBytes = (0, number_js_1.doubleToByteArrayBigInt)(key);
            bytes = (0, uint8_js_1.concatUint8Arrays)([(0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Number), numberBytes]);
            return bytes;
        }
        case "boolean": {
            const prefix = key ? prefix_js_1.BytePrefix.True : prefix_js_1.BytePrefix.False;
            return (0, uint8_js_1.hexStringToUint8Array)(prefix);
        }
        case "object": {
            if (key === null) {
                return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Null);
            }
            return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined);
        }
        case "undefined": {
            return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined);
        }
        default:
            throw new Error(`Unexpected type: ${typeof key}`);
    }
}
function reverse(buff) {
    // Replace Uint8Array.allocUnsafe(buff.length) with new Uint8Array(buff.length)
    const uint8array = new Uint8Array(buff.length);
    for (let i = 0, j = buff.length - 1; i <= j; ++i, --j) {
        uint8array[i] = buff[j];
        uint8array[j] = buff[i];
    }
    return uint8array;
}
//# sourceMappingURL=v2.js.map