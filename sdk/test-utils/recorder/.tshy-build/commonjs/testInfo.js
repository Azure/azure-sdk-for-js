"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isVitestTestContext = isVitestTestContext;
/**
 * Determines whether the given test is a Vitest Test.
 * @param test - The test to check.
 * @returns true if the given test is a Vitest Test.
 */
function isVitestTestContext(test) {
    return (typeof test === "function" &&
        "task" in test &&
        typeof test.task === "object" &&
        test.task != null &&
        "name" in test.task);
}
//# sourceMappingURL=testInfo.js.map