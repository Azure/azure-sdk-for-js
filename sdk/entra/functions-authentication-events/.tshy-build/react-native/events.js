// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Helper function to create a files request
 * @param error - string or exception
 * @returns a valid FailedRequest object
 */
export function createFailedRequest(error) {
    return {
        body: "",
        error: error instanceof Error ? error.message : String(error),
    };
}
//# sourceMappingURL=events.js.map