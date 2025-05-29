"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJwt = exports.base64UrlDecode = void 0;
const base64UrlDecode = (base64Url) => {
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const buffer = Buffer.from(base64, "base64");
    return buffer.toString("utf-8");
};
exports.base64UrlDecode = base64UrlDecode;
const parseJwt = (token) => {
    const parts = token.split(".");
    if (parts.length !== 3) {
        throw new Error("Invalid JWT token.");
    }
    const payload = (0, exports.base64UrlDecode)(parts[1]);
    return JSON.parse(payload);
};
exports.parseJwt = parseJwt;
//# sourceMappingURL=parseJwt.js.map