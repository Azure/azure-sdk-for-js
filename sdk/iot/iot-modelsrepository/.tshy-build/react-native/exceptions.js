// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * A ModelError will be thrown in the even the Model in the repo is malformed in some standard way.
 */
export class ModelError extends Error {
    constructor(message) {
        super(message);
        this.name = "ModelError";
    }
}
//# sourceMappingURL=exceptions.js.map