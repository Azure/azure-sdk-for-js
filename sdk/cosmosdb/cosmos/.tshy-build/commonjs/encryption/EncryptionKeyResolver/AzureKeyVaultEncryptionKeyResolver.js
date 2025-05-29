"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.AzureKeyVaultEncryptionKeyResolver = void 0;
const keyvault_keys_1 = require("@azure/keyvault-keys");
const index_js_1 = require("../../request/index.js");
const index_js_2 = require("../enums/index.js");
/**
 * Implementation of EncryptionKeyResolver that uses Azure Key Vault for customer managed keys.
 */
class AzureKeyVaultEncryptionKeyResolver {
    constructor(credentials) {
        /**
         * Name of the resolver to use for client side encryption.
         * Currently only AzureKeyVault implementation is supported.
         */
        this.encryptionKeyResolverName = index_js_2.EncryptionKeyResolverName.AzureKeyVault;
        this.credentials = credentials;
    }
    /**
     * wraps the given key using the specified key encryption key path and algorithm.
     * @param encryptionKeyId - path to the customer managed key to be used for wrapping. For Azure Key Vault, this is url of the key in the vault.
     * @param algorithm - algorithm to be used for wrapping.
     * @param unwrappedKey - dek to be wrapped.
     * @returns wrapped DEK.
     */
    async wrapKey(encryptionKeyId, algorithm, unwrappedKey) {
        try {
            const origin = this.getOrigin(encryptionKeyId);
            const keyClient = new keyvault_keys_1.KeyClient(origin, this.credentials);
            const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
            const cryptographyClient = keyClient.getCryptographyClient(keyName, {
                keyVersion: keyVersion,
            });
            const res = await cryptographyClient.wrapKey(algorithm, unwrappedKey);
            if (!res || !res.result) {
                throw new index_js_1.ErrorResponse(`Failed to wrap key: ${res}`);
            }
            return res.result;
        }
        catch (e) {
            throw new index_js_1.ErrorResponse(`Failed to wrap key: ${e.message}`);
        }
    }
    /**
     * Unwraps the given wrapped key using the specified key encryption key path and algorithm.
     * @param encryptionKeyId - path to the customer managed key to be used for unwrapping. For Azure Key Vault, this is url of the key in the vault.
     * @param algorithm - algorithm to be used for unwrapping.
     * @param wrappedKey - wrapped DEK.
     * @returns unwrapped DEK.
     */
    async unwrapKey(encryptionKeyId, algorithm, wrappedKey) {
        try {
            const origin = this.getOrigin(encryptionKeyId);
            const keyClient = new keyvault_keys_1.KeyClient(origin, this.credentials);
            const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
            const cryptographyClient = keyClient.getCryptographyClient(keyName, {
                keyVersion: keyVersion,
            });
            const res = await cryptographyClient.unwrapKey(algorithm, wrappedKey);
            if (!res || !res.result) {
                throw new index_js_1.ErrorResponse(`Failed to wrap key: ${res}`);
            }
            return res.result;
        }
        catch (e) {
            throw new index_js_1.ErrorResponse(`Failed to unwrap key: ${e.message}`);
        }
    }
    // TODO: improve this method to extract key name and version from the url
    getKeyDetails(encryptionKeyId) {
        let url;
        try {
            url = new URL(encryptionKeyId);
            const parts = url.pathname.split("/");
            if (parts.length < 4 || parts.length > 5) {
                throw new index_js_1.ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>`);
            }
            if (parts.length === 4 || parts.length === 5) {
                return [parts[2], parts[3]];
            }
        }
        catch (e) {
            throw new index_js_1.ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>. Error: ${e.message}`);
        }
    }
    getOrigin(encryptionKeyId) {
        try {
            const url = new URL(encryptionKeyId);
            return url.origin;
        }
        catch (e) {
            throw new index_js_1.ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>. Error: ${e.message}`);
        }
    }
}
exports.AzureKeyVaultEncryptionKeyResolver = AzureKeyVaultEncryptionKeyResolver;
//# sourceMappingURL=AzureKeyVaultEncryptionKeyResolver.js.map