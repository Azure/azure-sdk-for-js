"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticAccessTokenCredential = void 0;
class StaticAccessTokenCredential {
    // AccessToken is an object with two properties:
    // - A "token" property with a string value.
    // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.
    constructor(accessToken) {
        this.accessToken = accessToken;
    }
    async getToken() {
        return {
            expiresOnTimestamp: Date.now() + 10000,
            token: this.accessToken,
        };
    }
}
exports.StaticAccessTokenCredential = StaticAccessTokenCredential;
//# sourceMappingURL=StaticAccessTokenCredential.js.map