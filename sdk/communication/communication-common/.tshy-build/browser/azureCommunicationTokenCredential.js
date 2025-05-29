// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { AutoRefreshTokenCredential, } from "./autoRefreshTokenCredential.js";
import { StaticTokenCredential } from "./staticTokenCredential.js";
import { parseToken } from "./tokenParser.js";
import { EntraTokenCredential, } from "./entraTokenCredential.js";
/**
 * The CommunicationTokenCredential implementation with support for proactive token refresh.
 */
export class AzureCommunicationTokenCredential {
    constructor(tokenOrRefreshOptionsOrEntraOptions) {
        this.disposed = false;
        if (typeof tokenOrRefreshOptionsOrEntraOptions === "string") {
            this.tokenCredential = new StaticTokenCredential(parseToken(tokenOrRefreshOptionsOrEntraOptions));
        }
        else if ("tokenRefresher" in tokenOrRefreshOptionsOrEntraOptions) {
            this.tokenCredential = new AutoRefreshTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
        }
        else {
            this.tokenCredential = new EntraTokenCredential(tokenOrRefreshOptionsOrEntraOptions);
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
//# sourceMappingURL=azureCommunicationTokenCredential.js.map