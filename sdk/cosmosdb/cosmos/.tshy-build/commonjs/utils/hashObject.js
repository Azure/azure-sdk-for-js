"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashObject = hashObject;
const tslib_1 = require("tslib");
const digest_js_1 = require("./digest.js");
const fast_json_stable_stringify_1 = tslib_1.__importDefault(require("fast-json-stable-stringify"));
async function hashObject(object) {
    const stringifiedObject = (0, fast_json_stable_stringify_1.default)(object);
    return (0, digest_js_1.digest)(stringifiedObject);
}
//# sourceMappingURL=hashObject.js.map