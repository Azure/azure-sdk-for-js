"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = require("../util/constants");
const HeaderConstants = constants_1.Constants.HeaderConstants;
const DEFAULT_AUTHORIZATION_SCHEME = "Bearer";
/**
 * Creates a new TokenCredentials object.
 *
 * @constructor
 * @param {string} token               The token.
 * @param {string} authorizationScheme The authorization scheme.
 */
class TokenCredentials {
    constructor(token, authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME) {
        this.authorizationScheme = DEFAULT_AUTHORIZATION_SCHEME;
        if (!token) {
            throw new Error("token cannot be null or undefined.");
        }
        this.token = token;
        this.authorizationScheme = authorizationScheme;
    }
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} The WebResource to be signed.
     * @return {Promise<WebResource>} The signed request object.
     */
    signRequest(webResource) {
        if (!webResource.headers)
            webResource.headers = {};
        webResource.headers[HeaderConstants.AUTHORIZATION] = `${this.authorizationScheme} ${this.token}`;
        return Promise.resolve(webResource);
    }
}
exports.TokenCredentials = TokenCredentials;
//# sourceMappingURL=tokenCredentials.js.map