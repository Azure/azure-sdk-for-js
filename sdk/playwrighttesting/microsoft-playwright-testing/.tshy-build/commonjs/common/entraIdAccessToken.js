"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.EntraIdAccessToken = void 0;
exports.createEntraIdAccessToken = createEntraIdAccessToken;
const identity_1 = require("@azure/identity");
const logger_js_1 = require("./logger.js");
const constants_js_1 = require("./constants.js");
const parseJwt_js_1 = require("../utils/parseJwt.js");
const messages_js_1 = require("./messages.js");
class EntraIdAccessToken {
    constructor(credential) {
        this.fetchEntraIdAccessToken = async () => {
            try {
                logger_js_1.coreLogger.info("Fetching entra id access token");
                const accessToken = await this._credential.getToken(constants_js_1.EntraIdAccessTokenConstants.SCOPE);
                if (!accessToken) {
                    throw new Error("Entra id access token is null");
                }
                if (accessToken.token === this.token) {
                    // azure identity library can fetch the same token again from cache. 10 mins before expiry, it allows token refresh
                    logger_js_1.coreLogger.info("Cached access token is returned, will be retried again.");
                    return;
                }
                this.token = accessToken.token;
                this._expiryTimestamp = accessToken.expiresOnTimestamp;
                process.env[constants_js_1.ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN] = this.token;
                logger_js_1.coreLogger.info("Entra id access token fetched and set in environment variable");
                logger_js_1.coreLogger.info("Entra id access token expiry:", new Date(this._expiryTimestamp).toISOString());
                return;
            }
            catch (err) {
                logger_js_1.coreLogger.error(err);
                process.env[constants_js_1.InternalEnvironmentVariables.MPT_SETUP_FATAL_ERROR] = "true";
                throw new Error(messages_js_1.ServiceErrorMessageConstants.NO_AUTH_ERROR.message);
            }
        };
        this.setEntraIdAccessTokenFromEnvironment = () => {
            try {
                const token = process.env[constants_js_1.ServiceEnvironmentVariable.PLAYWRIGHT_SERVICE_ACCESS_TOKEN];
                if (!token) {
                    return;
                }
                const claims = (0, parseJwt_js_1.parseJwt)(token);
                if (claims.accountId || claims.aid) {
                    return;
                } // mpt PAT
                const expiry = new Date(claims.exp * 1000);
                this.token = token;
                this._expiryTimestamp = expiry.getTime();
            }
            catch (_) {
                return;
            }
        };
        this._credential = credential !== null && credential !== void 0 ? credential : new identity_1.DefaultAzureCredential();
        this.setEntraIdAccessTokenFromEnvironment();
    }
    doesEntraIdAccessTokenNeedRotation() {
        if (!this.token) {
            logger_js_1.coreLogger.info("Entra id access token not found, needs rotation");
            return true;
        }
        const lifetimeLeft = this._expiryTimestamp - new Date().getTime();
        const doesEntraTokenRequireRotation = lifetimeLeft <
            constants_js_1.EntraIdAccessTokenConstants.LIFETIME_LEFT_THRESHOLD_IN_MINUTES_FOR_ROTATION * 60 * 1000;
        logger_js_1.coreLogger.info("Entra id access token requires rotation:", doesEntraTokenRequireRotation ? "Yes" : "No");
        return doesEntraTokenRequireRotation;
    }
}
exports.EntraIdAccessToken = EntraIdAccessToken;
function createEntraIdAccessToken(credential) {
    return new EntraIdAccessToken(credential);
}
//# sourceMappingURL=entraIdAccessToken.js.map