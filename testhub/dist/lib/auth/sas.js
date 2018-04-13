"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require("crypto");
const utils_1 = require("../util/utils");
const token_1 = require("./token");
/**
 * @class SasTokenProvider
 * Defines the SasTokenProvider.
 */
class SasTokenProvider {
    /**
     * Initializes a new isntance of SasTokenProvider
     * @constructor
     * @param {string} namespace - The namespace of the EventHub instance.
     * @param {string} keyName - The name of the EventHub key.
     * @param {string} key - The secret value associated with the above EventHub key
     */
    constructor(namespace, keyName, key, tokenValidTimeInSeconds, tokenRenewalMarginInSeconds) {
        this.namespace = namespace;
        this.keyName = keyName;
        this.key = key;
        this.tokenValidTimeInSeconds = tokenValidTimeInSeconds || 3600;
        this.tokenRenewalMarginInSeconds = tokenRenewalMarginInSeconds || 900;
        if (this.tokenValidTimeInSeconds <= this.tokenRenewalMarginInSeconds) {
            throw new Error('tokenRenewalMarginInSeconds must be less than tokenValidTimeInSeconds');
        }
    }
    /**
     * Gets the sas token for the specified audience
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    getToken(audience) {
        return Promise.resolve(this._createToken(Math.floor(Date.now() / 1000) + this.tokenValidTimeInSeconds, audience));
    }
    /**
     * Creates the sas token based on the provided information
     * @param {string | number} expiry - The time period in unix time after which the token will expire.
     * @param {string} [audience] - The audience for which the token is desired. If not
     * provided then the Endpoint from the connection string will be applied.
     */
    _createToken(expiry, audience) {
        if (!audience)
            audience = this.namespace;
        audience = encodeURIComponent(audience);
        const keyName = encodeURIComponent(this.keyName);
        const stringToSign = audience + '\n' + expiry;
        const sig = encodeURIComponent(crypto.createHmac('sha256', this.key).update(stringToSign, 'utf8').digest('base64'));
        return {
            token: `SharedAccessSignature sr=${audience}&sig=${sig}&se=${expiry}&skn=${keyName}`,
            tokenType: token_1.TokenType.CbsTokenTypeSas,
            expiry: expiry
        };
    }
    /**
     *
     * @param {string} connectionString - The EventHub connection string
     */
    static fromConnectionString(connectionString) {
        let parsed = utils_1.parseConnectionString(connectionString);
        return new SasTokenProvider(parsed.Endpoint, parsed.SharedAccessKeyName, parsed.SharedAccessKey);
    }
}
exports.SasTokenProvider = SasTokenProvider;
