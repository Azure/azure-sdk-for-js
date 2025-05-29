"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimeoutError = exports.TimeoutErrorCode = void 0;
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @hidden
 */
exports.TimeoutErrorCode = "TimeoutError";
class TimeoutError extends Error {
    constructor(message = "Timeout Error") {
        super(message);
        this.code = exports.TimeoutErrorCode;
        this.name = exports.TimeoutErrorCode;
    }
}
exports.TimeoutError = TimeoutError;
//# sourceMappingURL=TimeoutError.js.map