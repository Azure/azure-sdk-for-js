"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashV1PartitionKey = hashV1PartitionKey;
const tslib_1 = require("tslib");
const number_js_1 = require("./encoding/number.js");
const string_js_1 = require("./encoding/string.js");
const prefix_js_1 = require("./encoding/prefix.js");
const murmurHash_js_1 = tslib_1.__importDefault(require("./murmurHash.js"));
const uint8_js_1 = require("../uint8.js");
const MAX_STRING_CHARS = 100;
function hashV1PartitionKey(partitionKey) {
    const key = partitionKey[0];
    const toHash = prefixKeyByType(key);
    const hash = murmurHash_js_1.default.x86.hash32(toHash);
    const encodedJSBI = (0, number_js_1.writeNumberForBinaryEncodingBigInt)(hash);
    const encodedValue = encodeByType(key);
    const finalHash = (0, uint8_js_1.uint8ArrayToHex)((0, uint8_js_1.concatUint8Arrays)([encodedJSBI, encodedValue])).toUpperCase();
    return finalHash;
}
function prefixKeyByType(key) {
    let bytes;
    switch (typeof key) {
        case "string": {
            const truncated = key.substr(0, MAX_STRING_CHARS);
            bytes = (0, uint8_js_1.concatUint8Arrays)([
                (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.String),
                new TextEncoder().encode(truncated),
                (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined),
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
function encodeByType(key) {
    switch (typeof key) {
        case "string": {
            const truncated = key.substring(0, MAX_STRING_CHARS);
            return (0, string_js_1.writeStringForBinaryEncoding)(truncated);
        }
        case "number": {
            return (0, number_js_1.writeNumberForBinaryEncodingBigInt)(key);
        }
        case "boolean": {
            const prefix = key ? prefix_js_1.BytePrefix.True : prefix_js_1.BytePrefix.False;
            return (0, uint8_js_1.hexStringToUint8Array)(prefix);
        }
        case "object":
            if (key === null) {
                return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Null);
            }
            return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined);
        case "undefined":
            return (0, uint8_js_1.hexStringToUint8Array)(prefix_js_1.BytePrefix.Undefined);
        default:
            throw new Error(`Unexpected type: ${typeof key}`);
    }
}
//# sourceMappingURL=v1.js.map