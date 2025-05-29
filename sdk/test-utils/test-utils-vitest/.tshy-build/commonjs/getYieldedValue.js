"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getYieldedValue = getYieldedValue;
const vitest_1 = require("vitest");
/**
 * Returns the currently yielded value from an iterator if it exists, otherwise, it throws an assertion failure.
 * @param iteratorResult - The result of the current iteration
 * @returns the currently yielded value
 */
function getYieldedValue(iteratorResult) {
    if (iteratorResult.done) {
        vitest_1.assert.fail(`Expected an item but did not get any`);
    }
    return iteratorResult.value;
}
//# sourceMappingURL=getYieldedValue.js.map