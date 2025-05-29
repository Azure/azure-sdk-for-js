"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomName = getRandomName;
const core_util_1 = require("@azure/core-util");
/**
 * Returns a random name by appending a guid to the input string as follows:
 * `{name}-{uuid}`.
 * @internal
 */
function getRandomName(prefix) {
    const str = (0, core_util_1.randomUUID)();
    return prefix ? `${prefix}-${str}` : str;
}
//# sourceMappingURL=utils.js.map