"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeUTF8 = void 0;
exports.encodeUTF8fromBase64 = encodeUTF8fromBase64;
exports.encodeBase64 = encodeBase64;
const encodeUTF8 = (str) => new TextEncoder().encode(str);
exports.encodeUTF8 = encodeUTF8;
function encodeUTF8fromBase64(str) {
    if (typeof atob !== "function") {
        throw new Error("Your browser environment is missing the global `atob` function");
    }
    const binary = atob(str);
    return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}
function encodeBase64(value) {
    if (typeof btoa !== "function") {
        throw new Error("Your browser environment is missing the global `btoa` function");
    }
    const bytes = new Uint8Array(value);
    const binary = String.fromCharCode.apply(null, [...bytes]);
    return btoa(binary);
}
//# sourceMappingURL=encodeUtils.browser.js.map