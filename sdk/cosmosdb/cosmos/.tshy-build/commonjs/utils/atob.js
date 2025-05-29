"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = atob;
function atob(str) {
    return Buffer.from(str, "base64").toString("binary");
}
//# sourceMappingURL=atob.js.map