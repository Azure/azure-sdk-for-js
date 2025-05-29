// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { KeyClient } from "@azure/keyvault-keys";
import { ErrorResponse } from "../../request/index.js";
import { EncryptionKeyResolverName } from "../enums/index.js";
/**
 * Implementation of EncryptionKeyResolver that uses Azure Key Vault for customer managed keys.
 */
export class AzureKeyVaultEncryptionKeyResolver {
    constructor(credentials) {
        /**
         * Name of the resolver to use for client side encryption.
         * Currently only AzureKeyVault implementation is supported.
         */
        this.encryptionKeyResolverName = EncryptionKeyResolverName.AzureKeyVault;
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
            const keyClient = new KeyClient(origin, this.credentials);
            const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
            const cryptographyClient = keyClient.getCryptographyClient(keyName, {
                keyVersion: keyVersion,
            });
            const res = await cryptographyClient.wrapKey(algorithm, unwrappedKey);
            if (!res || !res.result) {
                throw new ErrorResponse(`Failed to wrap key: ${res}`);
            }
            return res.result;
        }
        catch (e) {
            throw new ErrorResponse(`Failed to wrap key: ${e.message}`);
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
            const keyClient = new KeyClient(origin, this.credentials);
            const [keyName, keyVersion] = this.getKeyDetails(encryptionKeyId);
            const cryptographyClient = keyClient.getCryptographyClient(keyName, {
                keyVersion: keyVersion,
            });
            const res = await cryptographyClient.unwrapKey(algorithm, wrappedKey);
            if (!res || !res.result) {
                throw new ErrorResponse(`Failed to wrap key: ${res}`);
            }
            return res.result;
        }
        catch (e) {
            throw new ErrorResponse(`Failed to unwrap key: ${e.message}`);
        }
    }
    // TODO: improve this method to extract key name and version from the url
    getKeyDetails(encryptionKeyId) {
        let url;
        try {
            url = new URL(encryptionKeyId);
            const parts = url.pathname.split("/");
            if (parts.length < 4 || parts.length > 5) {
                throw new ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>`);
            }
            if (parts.length === 4 || parts.length === 5) {
                return [parts[2], parts[3]];
            }
        }
        catch (e) {
            throw new ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>. Error: ${e.message}`);
        }
    }
    getOrigin(encryptionKeyId) {
        try {
            const url = new URL(encryptionKeyId);
            return url.origin;
        }
        catch (e) {
            throw new ErrorResponse(`Invalid key url: ${encryptionKeyId}. Key url must be in the format https://<vault>.vault.azure.net/keys/<key-name>/<key-version>. Error: ${e.message}`);
        }
    }
}
//# sourceMappingURL=AzureKeyVaultEncryptionKeyResolver.js.map