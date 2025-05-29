// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * Checks whether a network connection is detected.
 * @internal
 */
export function checkNetworkConnection() {
    return Promise.resolve(self.navigator.onLine);
}
//# sourceMappingURL=checkNetworkConnection.common.js.map