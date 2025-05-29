// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { encodeUTF8, encodeBase64 } from "./encode.js";
import atob from "./atob.js";
import { globalCrypto } from "./globalCrypto.js";
export async function hmac(key, message) {
    const importParams = { name: "HMAC", hash: { name: "SHA-256" } };
    const encodedMessage = new Uint8Array([...unescape(encodeURIComponent(message))].map((c) => c.charCodeAt(0)));
    const encodedKey = encodeUTF8(atob(key));
    const cryptoKey = await globalCrypto.subtle.importKey("raw", encodedKey, importParams, false, [
        "sign",
    ]);
    const signature = await globalCrypto.subtle.sign(importParams, cryptoKey, encodedMessage);
    return encodeBase64(signature);
}
//# sourceMappingURL=hmac-browser.mjs.map