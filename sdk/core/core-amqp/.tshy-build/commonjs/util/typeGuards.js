"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSasTokenProvider = isSasTokenProvider;
const core_util_1 = require("@azure/core-util");
/**
 * Typeguard that checks if the input is a SasTokenProvider.
 * @param thing - Any object.
 * @hidden
 */
function isSasTokenProvider(thing) {
    return (0, core_util_1.isObjectWithProperties)(thing, ["isSasTokenProvider"]) && thing.isSasTokenProvider === true;
}
//# sourceMappingURL=typeGuards.js.map