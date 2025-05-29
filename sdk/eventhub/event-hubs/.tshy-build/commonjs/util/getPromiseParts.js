"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPromiseParts = getPromiseParts;
/**
 * @internal
 * Returns a promise and the promise's resolve and reject methods.
 */
function getPromiseParts() {
    let resolver;
    let rejector;
    const promise = new Promise((resolve, reject) => {
        resolver = resolve;
        rejector = reject;
    });
    return {
        promise,
        resolve: resolver,
        reject: rejector,
    };
}
//# sourceMappingURL=getPromiseParts.js.map