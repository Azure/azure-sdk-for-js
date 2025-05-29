// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
var _a;
/// <reference lib="dom" />
import { encodeBase64, encodeUTF8, encodeUTF8fromBase64 } from "./encodeUtils.browser.js";
const subtle = (_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.crypto) === null || _a === void 0 ? void 0 : _a.subtle;
export const shaHash = async (content) => {
    const data = encodeUTF8(content);
    const hash = await subtle.digest("SHA-256", data);
    return encodeBase64(hash);
};
export const shaHMAC = async (secret, content) => {
    const importParams = { name: "HMAC", hash: { name: "SHA-256" } };
    const encodedMessage = encodeUTF8(content);
    const encodedKey = encodeUTF8fromBase64(secret);
    const crypto = subtle;
    const cryptoKey = await crypto.importKey("raw", encodedKey, importParams, false, ["sign"]);
    const signature = await crypto.sign(importParams, cryptoKey, encodedMessage);
    return encodeBase64(signature);
};
//# sourceMappingURL=cryptoUtils-browser.mjs.map