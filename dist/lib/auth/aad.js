"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const ms_rest_azure_1 = require("ms-rest-azure");
const token_1 = require("./token");
const Constants = require("../util/constants");
/**
 * Defines the AAD (Azure ActiveDirectory) TokenProvider.
 * @class AadTokenProvider
 */
class AadTokenProvider {
    constructor(credentials) {
        /**
         * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is
         * good to renew the token. A constant set to 270 seconds (4.5 minutes). Adal has a set window of 5 minutes
         * when it refreshes the token from its token cache.
         */
        this.tokenRenewalMarginInSeconds = 270;
        /**
         * @property {number} tokenValidTimeInSeconds - The number of seconds for which the
         * token is valid. A constant set to 3599 seconds (~1 hour). Adal has a set valid time of
         * 1 hour (3600 seconds) when it refreshes the access token.
         */
        this.tokenValidTimeInSeconds = 3599;
        if (!credentials ||
            (credentials &&
                !(credentials instanceof ms_rest_azure_1.ApplicationTokenCredentials ||
                    credentials instanceof ms_rest_azure_1.UserTokenCredentials ||
                    credentials instanceof ms_rest_azure_1.DeviceTokenCredentials ||
                    credentials instanceof ms_rest_azure_1.MSITokenCredentials))) {
            throw new Error("'credentials' is a required parameter and must be an instance of ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.");
        }
        if (credentials instanceof ms_rest_azure_1.MSITokenCredentials) {
            credentials.resource = Constants.aadEventHubsAudience;
        }
        this.credentials = credentials;
    }
    /**
     * Gets the jwt token for the specified audience
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    getToken(audience) {
        const self = this;
        return new Promise((resolve, reject) => {
            self.credentials.getToken((err, result) => {
                if (err) {
                    reject(err);
                }
                let expiresOn = Date.now();
                if (result.expiresOn && result.expiresOn instanceof Date) {
                    expiresOn = result.expiresOn.getTime();
                }
                const expiry = Math.floor(expiresOn / 1000) + self.tokenValidTimeInSeconds - 5;
                const tokenObj = {
                    expiry: expiry,
                    tokenType: token_1.TokenType.CbsTokenTypeJwt,
                    token: result.accessToken
                };
                resolve(tokenObj);
            });
        });
    }
}
exports.AadTokenProvider = AadTokenProvider;
//# sourceMappingURL=aad.js.map