"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelError = void 0;
/**
 * A ModelError will be thrown in the even the Model in the repo is malformed in some standard way.
 */
class ModelError extends Error {
    constructor(message) {
        super(message);
        this.name = "ModelError";
    }
}
exports.ModelError = ModelError;
//# sourceMappingURL=exceptions.js.map