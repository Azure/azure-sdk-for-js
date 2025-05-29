"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureCommunicationTokenCredential = void 0;
const autoRefreshTokenCredential_js_1 = require("./autoRefreshTokenCredential.js");
const staticTokenCredential_js_1 = require("./staticTokenCredential.js");
const tokenParser_js_1 = require("./tokenParser.js");
const entraTokenCredential_js_1 = require("./entraTokenCredential.js");
/**
 * The CommunicationTokenCredential implementation with support for proactive token refresh.
 */
class AzureCommunicationTokenCredential {
    constructor(tokenOrRefreshOptionsOrEntraOptions) {
        this.disposed = false;
        if (typeof tokenOrRefreshOptionsOrEntraOptions === "string") {
            this.tokenCredential = new staticTokenCredential_js_1.StaticTokenCredential((0, tokenParser_js_1.parseToken)(tokenOrRefreshOptionsOrEntraOptions));
        }
        else if ("tokenRefresher" in tokenOrRefreshOptionsOrEntraOptions) {
            this.tokenCredential = new autoRefreshTokenCredential_js_1.AutoRefreshTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
        }
        else {
            this.tokenCredential = new entraTokenCredential_js_1.EntraTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
        }
    }
    /**
     * Gets an `AccessToken` for the user. Throws if already disposed.
     * @param abortSignal - An implementation of `AbortSignalLike` to cancel the operation.
     */
    async getToken(options) {
        this.throwIfDisposed();
        const token = await this.tokenCredential.getToken(options);
        this.throwIfDisposed();
        return token;
    }
    /**
     * Disposes the CommunicationTokenCredential and cancels any internal auto-refresh operation.
     */
    dispose() {
        this.disposed = true;
        this.tokenCredential.dispose();
    }
    throwIfDisposed() {
        if (this.disposed) {
            throw new Error("User credential is disposed");
        }
    }
}
exports.AzureCommunicationTokenCredential = AzureCommunicationTokenCredential;
//# sourceMappingURL=azureCommunicationTokenCredential.js.map