"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageSharedKeyCredential = void 0;
const node_crypto_1 = require("node:crypto");
const StorageSharedKeyCredentialPolicy_js_1 = require("../policies/StorageSharedKeyCredentialPolicy.js");
const Credential_js_1 = require("./Credential.js");
/**
 * ONLY AVAILABLE IN NODE.JS RUNTIME.
 *
 * StorageSharedKeyCredential for account key authorization of Azure Storage service.
 */
class StorageSharedKeyCredential extends Credential_js_1.Credential {
    /**
     * Creates an instance of StorageSharedKeyCredential.
     * @param accountName -
     * @param accountKey -
     */
    constructor(accountName, accountKey) {
        super();
        this.accountName = accountName;
        this.accountKey = Buffer.from(accountKey, "base64");
    }
    /**
     * Creates a StorageSharedKeyCredentialPolicy object.
     *
     * @param nextPolicy -
     * @param options -
     */
    create(nextPolicy, options) {
        return new StorageSharedKeyCredentialPolicy_js_1.StorageSharedKeyCredentialPolicy(nextPolicy, options, this);
    }
    /**
     * Generates a hash signature for an HTTP request or for a SAS.
     *
     * @param stringToSign -
     */
    computeHMACSHA256(stringToSign) {
        return (0, node_crypto_1.createHmac)("sha256", this.accountKey).update(stringToSign, "utf8").digest("base64");
    }
}
exports.StorageSharedKeyCredential = StorageSharedKeyCredential;
//# sourceMappingURL=StorageSharedKeyCredential.js.map