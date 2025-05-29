"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapError = wrapError;
exports.errorWithCause = errorWithCause;
/** @internal */
function wrapError(f, message) {
    let result;
    try {
        result = f();
    }
    catch (cause) {
        throw errorWithCause(message, cause);
    }
    return result;
}
/** @internal */
function errorWithCause(message, cause) {
    return new Error(message, 
    // TS v4.6 and below do not yet recognize the cause option in the Error constructor
    // see https://medium.com/ovrsea/power-up-your-node-js-debugging-and-error-handling-with-the-new-error-cause-feature-4136c563126a
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { cause });
}
//# sourceMappingURL=errors.js.map