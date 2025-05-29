"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkNetworkConnection = checkNetworkConnection;
/**
 * Checks whether a network connection is detected.
 * @internal
 */
function checkNetworkConnection() {
    return Promise.resolve(self.navigator.onLine);
}
//# sourceMappingURL=checkNetworkConnection.common.js.map