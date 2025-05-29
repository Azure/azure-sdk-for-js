"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFailedRequest = createFailedRequest;
/**
 * Helper function to create a files request
 * @param error - string or exception
 * @returns a valid FailedRequest object
 */
function createFailedRequest(error) {
    return {
        body: "",
        error: error instanceof Error ? error.message : String(error),
    };
}
//# sourceMappingURL=events.js.map