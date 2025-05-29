"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNonEmptyString = isNonEmptyString;
function isNonEmptyString(variable) {
    return typeof variable === "string" && variable.trim().length > 0;
}
//# sourceMappingURL=strings.js.map