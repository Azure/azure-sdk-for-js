"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringToBytes = stringToBytes;
exports.bytesToString = bytesToString;
const decoder = typeof Buffer === "undefined" ? new TextDecoder("ascii") : undefined;
const encoder = typeof Buffer === "undefined" ? new TextEncoder() : undefined;
const decode = decoder
    ? (buffer) => decoder.decode(buffer)
    : (buffer) => buffer.toString("ascii");
const encode = encoder
    ? (str) => encoder.encode(str)
    : (str) => Buffer.from(str, "utf8");
/**
 * Converts a string into a utf8 encoded byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
function stringToBytes(content) {
    return encode(content);
}
/**
 * Converts a utf8 string into a byte array.
 * @param content - The utf8 string to convert.
 * @internal
 */
function bytesToString(content) {
    return decode(content);
}
//# sourceMappingURL=utf8.js.map