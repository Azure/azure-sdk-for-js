"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCredential = isCredential;
const core_auth_1 = require("@azure/core-auth");
/**
 * Typeguard that checks if the input is a credential type the clients accept.
 * @param thing - Any object.
 * @internal
 */
function isCredential(thing) {
    return (0, core_auth_1.isTokenCredential)(thing) || (0, core_auth_1.isNamedKeyCredential)(thing) || (0, core_auth_1.isSASCredential)(thing);
}
//# sourceMappingURL=typeGuards.js.map