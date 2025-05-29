"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeBase64 = exports.encodeBase64 = void 0;
const encodeBase64 = (data) => Buffer.from(data).toString("base64");
exports.encodeBase64 = encodeBase64;
const decodeBase64 = (data) => Buffer.from(data, "base64").toString("ascii");
exports.decodeBase64 = decodeBase64;
//# sourceMappingURL=encoding.js.map