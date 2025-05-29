"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uuid = void 0;
const core_util_1 = require("@azure/core-util");
// This is used as a workaround to be able to stub generateUuid
// during testing.
/**
 * Generated Universally Unique Identifier
 *
 * @returns RFC4122 v4 UUID.
 * @internal
 */
class Uuid {
    static generateUuid() {
        return (0, core_util_1.randomUUID)();
    }
}
exports.Uuid = Uuid;
//# sourceMappingURL=uuid.js.map