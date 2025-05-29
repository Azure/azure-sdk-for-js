import type { TokenCredential } from "@azure/core-auth";
import type { EncryptionKeyResolver } from "./EncryptionKeyResolver.js";
import { EncryptionKeyResolverName } from "../enums/index.js";
/**
 * Implementation of EncryptionKeyResolver that uses Azure Key Vault for customer managed keys.
 */
export declare class AzureKeyVaultEncryptionKeyResolver implements EncryptionKeyResolver {
    private credentials;
    constructor(credentials: TokenCredential);
    /**
     * Name of the resolver to use for client side encryption.
     * Currently only AzureKeyVault implementation is supported.
     */
    encryptionKeyResolverName: EncryptionKeyResolverName;
    /**
     * wraps the given key using the specified key encryption key path and algorithm.
     * @param encryptionKeyId - path to the customer managed key to be used for wrapping. For Azure Key Vault, this is url of the key in the vault.
     * @param algorithm - algorithm to be used for wrapping.
     * @param unwrappedKey - dek to be wrapped.
     * @returns wrapped DEK.
     */
    wrapKey(encryptionKeyId: string, algorithm: string, unwrappedKey: Uint8Array): Promise<Uint8Array>;
    /**
     * Unwraps the given wrapped key using the specified key encryption key path and algorithm.
     * @param encryptionKeyId - path to the customer managed key to be used for unwrapping. For Azure Key Vault, this is url of the key in the vault.
     * @param algorithm - algorithm to be used for unwrapping.
     * @param wrappedKey - wrapped DEK.
     * @returns unwrapped DEK.
     */
    unwrapKey(encryptionKeyId: string, algorithm: string, wrappedKey: Uint8Array): Promise<Uint8Array>;
    private getKeyDetails;
    private getOrigin;
}
//# sourceMappingURL=AzureKeyVaultEncryptionKeyResolver.d.ts.map