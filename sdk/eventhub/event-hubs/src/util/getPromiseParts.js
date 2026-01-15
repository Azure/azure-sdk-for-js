// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 * Returns a promise and the promise's resolve and reject methods.
 */
export function getPromiseParts() {
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