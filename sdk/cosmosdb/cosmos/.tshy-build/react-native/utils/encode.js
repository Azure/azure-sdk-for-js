// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/// <reference lib="dom"/>
export function encodeUTF8(str) {
    const bytes = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        bytes[i] = str.charCodeAt(i);
    }
    return bytes;
}
export function encodeBase64(value) {
    if ("function" !== typeof btoa) {
        throw new Error("Your browser environment is missing the global `btoa` function");
    }
    let binary = "";
    const bytes = new Uint8Array(value);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
}
//# sourceMappingURL=encode.js.map