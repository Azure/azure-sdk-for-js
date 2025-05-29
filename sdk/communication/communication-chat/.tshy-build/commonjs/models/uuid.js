"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUuid = generateUuid;
const core_util_1 = require("@azure/core-util");
/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 * @internal
 */
function generateUuid() {
    return (0, core_util_1.randomUUID)();
}
//# sourceMappingURL=uuid.js.map