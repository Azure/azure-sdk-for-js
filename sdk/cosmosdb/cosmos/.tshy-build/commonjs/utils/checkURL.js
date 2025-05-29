"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkURL = checkURL;
exports.sanitizeEndpoint = sanitizeEndpoint;
function checkURL(testString) {
    return new URL(testString);
}
function sanitizeEndpoint(url) {
    return new URL(url).href.replace(/\/$/, "");
}
//# sourceMappingURL=checkURL.js.map