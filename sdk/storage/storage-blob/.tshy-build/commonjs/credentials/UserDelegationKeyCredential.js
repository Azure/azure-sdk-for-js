"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDelegationKeyCredential = void 0;
const node_crypto_1 = require("node:crypto");
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * UserDelegationKeyCredential is only used for generation of user delegation SAS.
 * @see https://learn.microsoft.com/en-us/rest/api/storageservices/create-user-delegation-sas
 */
class UserDelegationKeyCredential {
    /**
     * Creates an instance of UserDelegationKeyCredential.
     * @param accountName -
     * @param userDelegationKey -
     */
    constructor(accountName, userDelegationKey) {
        this.accountName = accountName;
        this.userDelegationKey = userDelegationKey;
        this.key = Buffer.from(userDelegationKey.value, "base64");
    }
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param stringToSign -
     */
    computeHMACSHA256(stringToSign) {
        // console.log(`stringToSign: ${JSON.stringify(stringToSign)}`);
        return (0, node_crypto_1.createHmac)("sha256", this.key).update(stringToSign, "utf8").digest("base64");
    }
}
exports.UserDelegationKeyCredential = UserDelegationKeyCredential;
//# sourceMappingURL=UserDelegationKeyCredential.js.map