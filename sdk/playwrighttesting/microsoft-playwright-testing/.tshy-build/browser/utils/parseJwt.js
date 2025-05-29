// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
export const base64UrlDecode = (base64Url) => {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const buffer = Buffer.from(base64, "base64");
    return buffer.toString("utf-8");
};
export const parseJwt = (token) => {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid JWT token.");
    }
    const payload = base64UrlDecode(parts[1]);
    return JSON.parse(payload);
};
//# sourceMappingURL=parseJwt.js.map