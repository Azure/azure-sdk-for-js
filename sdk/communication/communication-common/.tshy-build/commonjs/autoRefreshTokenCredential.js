"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutoRefreshTokenCredential = void 0;
const tokenParser_js_1 = require("./tokenParser.js");
const expiredToken = { token: "", expiresOnTimestamp: -10 };
const minutesToMs = (minutes) => minutes * 1000 * 60;
const defaultExpiringSoonInterval = minutesToMs(10);
const defaultRefreshAfterLifetimePercentage = 0.5;
class AutoRefreshTokenCredential {
    constructor(refreshArgs) {
        this.expiringSoonIntervalInMs = defaultExpiringSoonInterval;
        this.refreshAfterLifetimePercentage = defaultRefreshAfterLifetimePercentage;
        this.activeTokenFetching = null;
        this.activeTokenUpdating = null;
        this.disposed = false;
        const { tokenRefresher, token, refreshProactively } = refreshArgs;
        this.refresh = tokenRefresher;
        this.currentToken = token ? (0, tokenParser_js_1.parseToken)(token) : expiredToken;
        this.refreshProactively = refreshProactively !== null && refreshProactively !== void 0 ? refreshProactively : false;
        if (this.refreshProactively) {
            this.scheduleRefresh();
        }
    }
    async getToken(options) {
        if (!this.isTokenExpiringSoon(this.currentToken)) {
            return this.currentToken;
        }
        if (!this.isTokenValid(this.currentToken)) {
            const updatePromise = this.updateTokenAndReschedule(options === null || options === void 0 ? void 0 : options.abortSignal);
            await updatePromise;
        }
        return this.currentToken;
    }
    dispose() {
        this.disposed = true;
        this.activeTokenFetching = null;
        this.activeTokenUpdating = null;
        this.currentToken = expiredToken;
        if (this.activeTimeout) {
            clearTimeout(this.activeTimeout);
        }
    }
    async updateTokenAndReschedule(abortSignal) {
        if (this.activeTokenUpdating) {
            return this.activeTokenUpdating;
        }
        this.activeTokenUpdating = this.refreshTokenAndReschedule(abortSignal);
        try {
            await this.activeTokenUpdating;
        }
        finally {
            this.activeTokenUpdating = null;
        }
    }
    async refreshTokenAndReschedule(abortSignal) {
        const newToken = await this.refreshToken(abortSignal);
        if (!this.isTokenValid(newToken)) {
            throw new Error("The token returned from the tokenRefresher is expired.");
        }
        this.currentToken = newToken;
        if (this.refreshProactively) {
            this.scheduleRefresh();
        }
    }
    async refreshToken(abortSignal) {
        try {
            if (!this.activeTokenFetching) {
                this.activeTokenFetching = this.refresh(abortSignal);
            }
            return (0, tokenParser_js_1.parseToken)(await this.activeTokenFetching);
        }
        finally {
            this.activeTokenFetching = null;
        }
    }
    scheduleRefresh() {
        if (this.disposed) {
            return;
        }
        if (this.activeTimeout) {
            clearTimeout(this.activeTimeout);
        }
        const tokenTtlInMs = this.currentToken.expiresOnTimestamp - Date.now();
        let timespanInMs = null;
        if (this.isTokenExpiringSoon(this.currentToken)) {
            // Schedule the next refresh for when it reaches a certain percentage of the remaining lifetime.
            timespanInMs = tokenTtlInMs * this.refreshAfterLifetimePercentage;
        }
        else {
            // Schedule the next refresh for when it gets in to the soon-to-expire window.
            timespanInMs = tokenTtlInMs - this.expiringSoonIntervalInMs;
        }
        this.activeTimeout = setTimeout(() => this.updateTokenAndReschedule(), timespanInMs);
    }
    isTokenValid(token) {
        return token && Date.now() < token.expiresOnTimestamp;
    }
    isTokenExpiringSoon(token) {
        return !token || Date.now() >= token.expiresOnTimestamp - this.expiringSoonIntervalInMs;
    }
}
exports.AutoRefreshTokenCredential = AutoRefreshTokenCredential;
//# sourceMappingURL=autoRefreshTokenCredential.js.map