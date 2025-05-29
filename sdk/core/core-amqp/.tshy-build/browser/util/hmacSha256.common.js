// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export async function signString(key, toSign) {
    const enc = new TextEncoder();
    const algorithm = { name: "HMAC", hash: { name: "SHA-256" } };
    const extractedKey = await globalThis.crypto.subtle.importKey("raw", enc.encode(key), algorithm, false, ["sign", "verify"]);
    const signature = await globalThis.crypto.subtle.sign(algorithm, extractedKey, enc.encode(toSign));
    const digest = btoa(String.fromCharCode(...new Uint8Array(signature)));
    return encodeURIComponent(digest);
}
//# sourceMappingURL=hmacSha256.common.js.map