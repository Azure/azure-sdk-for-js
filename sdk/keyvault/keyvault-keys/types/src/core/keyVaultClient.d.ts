import * as msRest from "@azure/ms-rest-js";
import * as msRestAzure from "@azure/ms-rest-azure-js";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { KeyVaultClientContext } from "./keyVaultClientContext";
declare class KeyVaultClient extends KeyVaultClientContext {
    /**
     * Initializes a new instance of the KeyVaultClient class.
     * @param credentials Credentials needed for the client to connect to Azure.
     * @param [options] The parameter options
     */
    constructor(credentials: msRest.ServiceClientCredentials, options?: msRestAzure.AzureServiceClientOptions);
    /**
     * The create key operation can be used to create any key type in Azure Key Vault. If the named key
     * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
     * permission.
     * @summary Creates a new key, stores it, then returns key parameters and attributes to the client.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name for the new key. The system will generate the version name for the new
     * key.
     * @param kty The type of key to create. For valid values, see JsonWebKeyType. Possible values
     * include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateKeyResponse>
     */
    createKey(vaultBaseUrl: string, keyName: string, kty: Models.JsonWebKeyType, options?: Models.KeyVaultClientCreateKeyOptionalParams): Promise<Models.CreateKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name for the new key. The system will generate the version name for the new
     * key.
     * @param kty The type of key to create. For valid values, see JsonWebKeyType. Possible values
     * include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
     * @param callback The callback
     */
    createKey(vaultBaseUrl: string, keyName: string, kty: Models.JsonWebKeyType, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name for the new key. The system will generate the version name for the new
     * key.
     * @param kty The type of key to create. For valid values, see JsonWebKeyType. Possible values
     * include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
     * @param options The optional parameters
     * @param callback The callback
     */
    createKey(vaultBaseUrl: string, keyName: string, kty: Models.JsonWebKeyType, options: Models.KeyVaultClientCreateKeyOptionalParams, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The import key operation may be used to import any key type into an Azure Key Vault. If the
     * named key already exists, Azure Key Vault creates a new version of the key. This operation
     * requires the keys/import permission.
     * @summary Imports an externally created key, stores it, and returns key parameters and attributes
     * to the client.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName Name for the imported key.
     * @param key The Json web key
     * @param [options] The optional parameters
     * @returns Promise<Models.ImportKeyResponse>
     */
    importKey(vaultBaseUrl: string, keyName: string, key: Models.JsonWebKey, options?: Models.KeyVaultClientImportKeyOptionalParams): Promise<Models.ImportKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName Name for the imported key.
     * @param key The Json web key
     * @param callback The callback
     */
    importKey(vaultBaseUrl: string, keyName: string, key: Models.JsonWebKey, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName Name for the imported key.
     * @param key The Json web key
     * @param options The optional parameters
     * @param callback The callback
     */
    importKey(vaultBaseUrl: string, keyName: string, key: Models.JsonWebKey, options: Models.KeyVaultClientImportKeyOptionalParams, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The delete key operation cannot be used to remove individual versions of a key. This operation
     * removes the cryptographic material associated with the key, which means the key is not usable
     * for Sign/Verify, Wrap/Unwrap or Encrypt/Decrypt operations. This operation requires the
     * keys/delete permission.
     * @summary Deletes a key of any type from storage in Azure Key Vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to delete.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteKeyResponse>
     */
    deleteKey(vaultBaseUrl: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to delete.
     * @param callback The callback
     */
    deleteKey(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<Models.DeletedKeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to delete.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteKey(vaultBaseUrl: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedKeyBundle>): void;
    /**
     * In order to perform this operation, the key must already exist in the Key Vault. Note: The
     * cryptographic material of a key itself cannot be changed. This operation requires the
     * keys/update permission.
     * @summary The update key operation changes specified attributes of a stored key and can be
     * applied to any key type and key version stored in Azure Key Vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of key to update.
     * @param keyVersion The version of the key to update.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateKeyResponse>
     */
    updateKey(vaultBaseUrl: string, keyName: string, keyVersion: string, options?: Models.KeyVaultClientUpdateKeyOptionalParams): Promise<Models.UpdateKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of key to update.
     * @param keyVersion The version of the key to update.
     * @param callback The callback
     */
    updateKey(vaultBaseUrl: string, keyName: string, keyVersion: string, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of key to update.
     * @param keyVersion The version of the key to update.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateKey(vaultBaseUrl: string, keyName: string, keyVersion: string, options: Models.KeyVaultClientUpdateKeyOptionalParams, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The get key operation is applicable to all key types. If the requested key is symmetric, then no
     * key material is released in the response. This operation requires the keys/get permission.
     * @summary Gets the public part of a stored key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to get.
     * @param keyVersion Adding the version parameter retrieves a specific version of a key.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetKeyResponse>
     */
    getKey(vaultBaseUrl: string, keyName: string, keyVersion: string, options?: msRest.RequestOptionsBase): Promise<Models.GetKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to get.
     * @param keyVersion Adding the version parameter retrieves a specific version of a key.
     * @param callback The callback
     */
    getKey(vaultBaseUrl: string, keyName: string, keyVersion: string, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key to get.
     * @param keyVersion Adding the version parameter retrieves a specific version of a key.
     * @param options The optional parameters
     * @param callback The callback
     */
    getKey(vaultBaseUrl: string, keyName: string, keyVersion: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The full key identifier, attributes, and tags are provided in the response. This operation
     * requires the keys/list permission.
     * @summary Retrieves a list of individual key versions with the same key name.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetKeyVersionsResponse>
     */
    getKeyVersions(vaultBaseUrl: string, keyName: string, options?: Models.KeyVaultClientGetKeyVersionsOptionalParams): Promise<Models.GetKeyVersionsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param callback The callback
     */
    getKeyVersions(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param options The optional parameters
     * @param callback The callback
     */
    getKeyVersions(vaultBaseUrl: string, keyName: string, options: Models.KeyVaultClientGetKeyVersionsOptionalParams, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
     * part of a stored key. The LIST operation is applicable to all key types, however only the base
     * key identifier, attributes, and tags are provided in the response. Individual versions of a key
     * are not listed in the response. This operation requires the keys/list permission.
     * @summary List keys in the specified vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetKeysResponse>
     */
    getKeys(vaultBaseUrl: string, options?: Models.KeyVaultClientGetKeysOptionalParams): Promise<Models.GetKeysResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getKeys(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getKeys(vaultBaseUrl: string, options: Models.KeyVaultClientGetKeysOptionalParams, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * The Key Backup operation exports a key from Azure Key Vault in a protected form. Note that this
     * operation does NOT return key material in a form that can be used outside the Azure Key Vault
     * system, the returned key material is either protected to a Azure Key Vault HSM or to Azure Key
     * Vault itself. The intent of this operation is to allow a client to GENERATE a key in one Azure
     * Key Vault instance, BACKUP the key, and then RESTORE it into another Azure Key Vault instance.
     * The BACKUP operation may be used to export, in protected form, any key type from Azure Key
     * Vault. Individual versions of a key cannot be backed up. BACKUP / RESTORE can be performed
     * within geographical boundaries only; meaning that a BACKUP from one geographical area cannot be
     * restored to another geographical area. For example, a backup from the US geographical area
     * cannot be restored in an EU geographical area. This operation requires the key/backup
     * permission.
     * @summary Requests that a backup of the specified key be downloaded to the client.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<Models.BackupKeyResponse>
     */
    backupKey(vaultBaseUrl: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<Models.BackupKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param callback The callback
     */
    backupKey(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<Models.BackupKeyResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param options The optional parameters
     * @param callback The callback
     */
    backupKey(vaultBaseUrl: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.BackupKeyResult>): void;
    /**
     * Imports a previously backed up key into Azure Key Vault, restoring the key, its key identifier,
     * attributes and access control policies. The RESTORE operation may be used to import a previously
     * backed up key. Individual versions of a key cannot be restored. The key is restored in its
     * entirety with the same key name as it had when it was backed up. If the key name is not
     * available in the target Key Vault, the RESTORE operation will be rejected. While the key name is
     * retained during restore, the final key identifier will change if the key is restored to a
     * different vault. Restore will restore all versions and preserve version identifiers. The RESTORE
     * operation is subject to security constraints: The target Key Vault must be owned by the same
     * Microsoft Azure Subscription as the source Key Vault The user must have RESTORE permission in
     * the target Key Vault. This operation requires the keys/restore permission.
     * @summary Restores a backed up key to a vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyBundleBackup The backup blob associated with a key bundle.
     * @param [options] The optional parameters
     * @returns Promise<Models.RestoreKeyResponse>
     */
    restoreKey(vaultBaseUrl: string, keyBundleBackup: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.RestoreKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyBundleBackup The backup blob associated with a key bundle.
     * @param callback The callback
     */
    restoreKey(vaultBaseUrl: string, keyBundleBackup: Uint8Array, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyBundleBackup The backup blob associated with a key bundle.
     * @param options The optional parameters
     * @param callback The callback
     */
    restoreKey(vaultBaseUrl: string, keyBundleBackup: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The ENCRYPT operation encrypts an arbitrary sequence of bytes using an encryption key that is
     * stored in Azure Key Vault. Note that the ENCRYPT operation only supports a single block of data,
     * the size of which is dependent on the target key and the encryption algorithm to be used. The
     * ENCRYPT operation is only strictly necessary for symmetric keys stored in Azure Key Vault since
     * protection with an asymmetric key can be performed using public portion of the key. This
     * operation is supported for asymmetric keys as a convenience for callers that have a
     * key-reference but do not have access to the public key material. This operation requires the
     * keys/encypt permission.
     * @summary Encrypts an arbitrary sequence of bytes using an encryption key that is stored in a key
     * vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param [options] The optional parameters
     * @returns Promise<Models.EncryptResponse>
     */
    encrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.EncryptResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param callback The callback
     */
    encrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param options The optional parameters
     * @param callback The callback
     */
    encrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * The DECRYPT operation decrypts a well-formed block of ciphertext using the target encryption key
     * and specified algorithm. This operation is the reverse of the ENCRYPT operation; only a single
     * block of data may be decrypted, the size of this block is dependent on the target key and the
     * algorithm to be used. The DECRYPT operation applies to asymmetric and symmetric keys stored in
     * Azure Key Vault since it uses the private portion of the key. This operation requires the
     * keys/decrypt permission.
     * @summary Decrypts a single block of encrypted data.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param [options] The optional parameters
     * @returns Promise<Models.DecryptResponse>
     */
    decrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.DecryptResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param callback The callback
     */
    decrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param options The optional parameters
     * @param callback The callback
     */
    decrypt(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * The SIGN operation is applicable to asymmetric and symmetric keys stored in Azure Key Vault
     * since this operation uses the private portion of the key. This operation requires the keys/sign
     * permission.
     * @summary Creates a signature from a digest using the specified key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm identifier. For more information on possible
     * algorithm types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384',
     * 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param value
     * @param [options] The optional parameters
     * @returns Promise<Models.SignResponse>
     */
    sign(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, value: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.SignResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm identifier. For more information on possible
     * algorithm types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384',
     * 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param value
     * @param callback The callback
     */
    sign(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, value: Uint8Array, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm identifier. For more information on possible
     * algorithm types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384',
     * 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param value
     * @param options The optional parameters
     * @param callback The callback
     */
    sign(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, value: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * The VERIFY operation is applicable to symmetric keys stored in Azure Key Vault. VERIFY is not
     * strictly necessary for asymmetric keys stored in Azure Key Vault since signature verification
     * can be performed using the public portion of the key but this operation is supported as a
     * convenience for callers that only have a key-reference and not the public portion of the key.
     * This operation requires the keys/verify permission.
     * @summary Verifies a signature using a specified key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm. For more information on possible algorithm
     * types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384', 'PS512',
     * 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param digest The digest used for signing.
     * @param signature The signature to be verified.
     * @param [options] The optional parameters
     * @returns Promise<Models.VerifyResponse>
     */
    verify(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, digest: Uint8Array, signature: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.VerifyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm. For more information on possible algorithm
     * types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384', 'PS512',
     * 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param digest The digest used for signing.
     * @param signature The signature to be verified.
     * @param callback The callback
     */
    verify(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, digest: Uint8Array, signature: Uint8Array, callback: msRest.ServiceCallback<Models.KeyVerifyResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm The signing/verification algorithm. For more information on possible algorithm
     * types, see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384', 'PS512',
     * 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512', 'ES256K'
     * @param digest The digest used for signing.
     * @param signature The signature to be verified.
     * @param options The optional parameters
     * @param callback The callback
     */
    verify(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeySignatureAlgorithm, digest: Uint8Array, signature: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyVerifyResult>): void;
    /**
     * The WRAP operation supports encryption of a symmetric key using a key encryption key that has
     * previously been stored in an Azure Key Vault. The WRAP operation is only strictly necessary for
     * symmetric keys stored in Azure Key Vault since protection with an asymmetric key can be
     * performed using the public portion of the key. This operation is supported for asymmetric keys
     * as a convenience for callers that have a key-reference but do not have access to the public key
     * material. This operation requires the keys/wrapKey permission.
     * @summary Wraps a symmetric key using a specified key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param [options] The optional parameters
     * @returns Promise<Models.WrapKeyResponse>
     */
    wrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.WrapKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param callback The callback
     */
    wrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param options The optional parameters
     * @param callback The callback
     */
    wrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * The UNWRAP operation supports decryption of a symmetric key using the target key encryption key.
     * This operation is the reverse of the WRAP operation. The UNWRAP operation applies to asymmetric
     * and symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This
     * operation requires the keys/unwrapKey permission.
     * @summary Unwraps a symmetric key using the specified key that was initially used for wrapping
     * that key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param [options] The optional parameters
     * @returns Promise<Models.UnwrapKeyResponse>
     */
    unwrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.UnwrapKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param callback The callback
     */
    unwrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param keyVersion The version of the key.
     * @param algorithm algorithm identifier. Possible values include: 'RSA-OAEP', 'RSA-OAEP-256',
     * 'RSA1_5'
     * @param value
     * @param options The optional parameters
     * @param callback The callback
     */
    unwrapKey(vaultBaseUrl: string, keyName: string, keyVersion: string, algorithm: Models.JsonWebKeyEncryptionAlgorithm, value: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyOperationResult>): void;
    /**
     * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
     * part of a deleted key. This operation includes deletion-specific information. The Get Deleted
     * Keys operation is applicable for vaults enabled for soft-delete. While the operation can be
     * invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault.
     * This operation requires the keys/list permission.
     * @summary Lists the deleted keys in the specified vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedKeysResponse>
     */
    getDeletedKeys(vaultBaseUrl: string, options?: Models.KeyVaultClientGetDeletedKeysOptionalParams): Promise<Models.GetDeletedKeysResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getDeletedKeys(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.DeletedKeyListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedKeys(vaultBaseUrl: string, options: Models.KeyVaultClientGetDeletedKeysOptionalParams, callback: msRest.ServiceCallback<Models.DeletedKeyListResult>): void;
    /**
     * The Get Deleted Key operation is applicable for soft-delete enabled vaults. While the operation
     * can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled
     * vault. This operation requires the keys/get permission.
     * @summary Gets the public part of a deleted key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedKeyResponse>
     */
    getDeletedKey(vaultBaseUrl: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param callback The callback
     */
    getDeletedKey(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<Models.DeletedKeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedKey(vaultBaseUrl: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedKeyBundle>): void;
    /**
     * The Purge Deleted Key operation is applicable for soft-delete enabled vaults. While the
     * operation can be invoked on any vault, it will return an error if invoked on a non soft-delete
     * enabled vault. This operation requires the keys/purge permission.
     * @summary Permanently deletes the specified key.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    purgeDeletedKey(vaultBaseUrl: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key
     * @param callback The callback
     */
    purgeDeletedKey(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the key
     * @param options The optional parameters
     * @param callback The callback
     */
    purgeDeletedKey(vaultBaseUrl: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * The Recover Deleted Key operation is applicable for deleted keys in soft-delete enabled vaults.
     * It recovers the deleted key back to its latest version under /keys. An attempt to recover an
     * non-deleted key will return an error. Consider this the inverse of the delete operation on
     * soft-delete enabled vaults. This operation requires the keys/recover permission.
     * @summary Recovers the deleted key to its latest version.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the deleted key.
     * @param [options] The optional parameters
     * @returns Promise<Models.RecoverDeletedKeyResponse>
     */
    recoverDeletedKey(vaultBaseUrl: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<Models.RecoverDeletedKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the deleted key.
     * @param callback The callback
     */
    recoverDeletedKey(vaultBaseUrl: string, keyName: string, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param keyName The name of the deleted key.
     * @param options The optional parameters
     * @param callback The callback
     */
    recoverDeletedKey(vaultBaseUrl: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyBundle>): void;
    /**
     * The SET operation adds a secret to the Azure Key Vault. If the named secret already exists,
     * Azure Key Vault creates a new version of that secret. This operation requires the secrets/set
     * permission.
     * @summary Sets a secret in a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param value The value of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.SetSecretResponse>
     */
    setSecret(vaultBaseUrl: string, secretName: string, value: string, options?: Models.KeyVaultClientSetSecretOptionalParams): Promise<Models.SetSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param value The value of the secret.
     * @param callback The callback
     */
    setSecret(vaultBaseUrl: string, secretName: string, value: string, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param value The value of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    setSecret(vaultBaseUrl: string, secretName: string, value: string, options: Models.KeyVaultClientSetSecretOptionalParams, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied
     * to an individual version of a secret. This operation requires the secrets/delete permission.
     * @summary Deletes a secret from a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteSecretResponse>
     */
    deleteSecret(vaultBaseUrl: string, secretName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param callback The callback
     */
    deleteSecret(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<Models.DeletedSecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteSecret(vaultBaseUrl: string, secretName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSecretBundle>): void;
    /**
     * The UPDATE operation changes specified attributes of an existing stored secret. Attributes that
     * are not specified in the request are left unchanged. The value of a secret itself cannot be
     * changed. This operation requires the secrets/set permission.
     * @summary Updates the attributes associated with a specified secret in a given key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateSecretResponse>
     */
    updateSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, options?: Models.KeyVaultClientUpdateSecretOptionalParams): Promise<Models.UpdateSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param callback The callback
     */
    updateSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, options: Models.KeyVaultClientUpdateSecretOptionalParams, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires
     * the secrets/get permission.
     * @summary Get a specified secret from a given key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSecretResponse>
     */
    getSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, options?: msRest.RequestOptionsBase): Promise<Models.GetSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param callback The callback
     */
    getSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param secretVersion The version of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSecret(vaultBaseUrl: string, secretName: string, secretVersion: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * The Get Secrets operation is applicable to the entire vault. However, only the base secret
     * identifier and its attributes are provided in the response. Individual secret versions are not
     * listed in the response. This operation requires the secrets/list permission.
     * @summary List secrets in a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSecretsResponse>
     */
    getSecrets(vaultBaseUrl: string, options?: Models.KeyVaultClientGetSecretsOptionalParams): Promise<Models.GetSecretsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getSecrets(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSecrets(vaultBaseUrl: string, options: Models.KeyVaultClientGetSecretsOptionalParams, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * The full secret identifier and attributes are provided in the response. No values are returned
     * for the secrets. This operations requires the secrets/list permission.
     * @summary List all versions of the specified secret.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSecretVersionsResponse>
     */
    getSecretVersions(vaultBaseUrl: string, secretName: string, options?: Models.KeyVaultClientGetSecretVersionsOptionalParams): Promise<Models.GetSecretVersionsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param callback The callback
     */
    getSecretVersions(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSecretVersions(vaultBaseUrl: string, secretName: string, options: Models.KeyVaultClientGetSecretVersionsOptionalParams, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled
     * for soft-delete. This operation requires the secrets/list permission.
     * @summary Lists deleted secrets for the specified vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSecretsResponse>
     */
    getDeletedSecrets(vaultBaseUrl: string, options?: Models.KeyVaultClientGetDeletedSecretsOptionalParams): Promise<Models.GetDeletedSecretsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getDeletedSecrets(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.DeletedSecretListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSecrets(vaultBaseUrl: string, options: Models.KeyVaultClientGetDeletedSecretsOptionalParams, callback: msRest.ServiceCallback<Models.DeletedSecretListResult>): void;
    /**
     * The Get Deleted Secret operation returns the specified deleted secret along with its attributes.
     * This operation requires the secrets/get permission.
     * @summary Gets the specified deleted secret.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSecretResponse>
     */
    getDeletedSecret(vaultBaseUrl: string, secretName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param callback The callback
     */
    getDeletedSecret(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<Models.DeletedSecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSecret(vaultBaseUrl: string, secretName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSecretBundle>): void;
    /**
     * The purge deleted secret operation removes the secret permanently, without the possibility of
     * recovery. This operation can only be enabled on a soft-delete enabled vault. This operation
     * requires the secrets/purge permission.
     * @summary Permanently deletes the specified secret.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    purgeDeletedSecret(vaultBaseUrl: string, secretName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param callback The callback
     */
    purgeDeletedSecret(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    purgeDeletedSecret(vaultBaseUrl: string, secretName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Recovers the deleted secret in the specified vault. This operation can only be performed on a
     * soft-delete enabled vault. This operation requires the secrets/recover permission.
     * @summary Recovers the deleted secret to the latest version.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the deleted secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.RecoverDeletedSecretResponse>
     */
    recoverDeletedSecret(vaultBaseUrl: string, secretName: string, options?: msRest.RequestOptionsBase): Promise<Models.RecoverDeletedSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the deleted secret.
     * @param callback The callback
     */
    recoverDeletedSecret(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the deleted secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    recoverDeletedSecret(vaultBaseUrl: string, secretName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * Requests that a backup of the specified secret be downloaded to the client. All versions of the
     * secret will be downloaded. This operation requires the secrets/backup permission.
     * @summary Backs up the specified secret.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param [options] The optional parameters
     * @returns Promise<Models.BackupSecretResponse>
     */
    backupSecret(vaultBaseUrl: string, secretName: string, options?: msRest.RequestOptionsBase): Promise<Models.BackupSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param callback The callback
     */
    backupSecret(vaultBaseUrl: string, secretName: string, callback: msRest.ServiceCallback<Models.BackupSecretResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretName The name of the secret.
     * @param options The optional parameters
     * @param callback The callback
     */
    backupSecret(vaultBaseUrl: string, secretName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.BackupSecretResult>): void;
    /**
     * Restores a backed up secret, and all its versions, to a vault. This operation requires the
     * secrets/restore permission.
     * @summary Restores a backed up secret to a vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretBundleBackup The backup blob associated with a secret bundle.
     * @param [options] The optional parameters
     * @returns Promise<Models.RestoreSecretResponse>
     */
    restoreSecret(vaultBaseUrl: string, secretBundleBackup: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.RestoreSecretResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretBundleBackup The backup blob associated with a secret bundle.
     * @param callback The callback
     */
    restoreSecret(vaultBaseUrl: string, secretBundleBackup: Uint8Array, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param secretBundleBackup The backup blob associated with a secret bundle.
     * @param options The optional parameters
     * @param callback The callback
     */
    restoreSecret(vaultBaseUrl: string, secretBundleBackup: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SecretBundle>): void;
    /**
     * The GetCertificates operation returns the set of certificates resources in the specified key
     * vault. This operation requires the certificates/list permission.
     * @summary List certificates in a specified key vault
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificatesResponse>
     */
    getCertificates(vaultBaseUrl: string, options?: Models.KeyVaultClientGetCertificatesOptionalParams): Promise<Models.GetCertificatesResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getCertificates(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificates(vaultBaseUrl: string, options: Models.KeyVaultClientGetCertificatesOptionalParams, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * Deletes all versions of a certificate object along with its associated policy. Delete
     * certificate cannot be used to remove individual versions of a certificate object. This operation
     * requires the certificates/delete permission.
     * @summary Deletes a certificate from a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteCertificateResponse>
     */
    deleteCertificate(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    deleteCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.DeletedCertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCertificate(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedCertificateBundle>): void;
    /**
     * Sets the certificate contacts for the specified key vault. This operation requires the
     * certificates/managecontacts permission.
     * @summary Sets the certificate contacts for the specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param contacts The contacts for the key vault certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.SetCertificateContactsResponse>
     */
    setCertificateContacts(vaultBaseUrl: string, contacts: Models.Contacts, options?: msRest.RequestOptionsBase): Promise<Models.SetCertificateContactsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param contacts The contacts for the key vault certificate.
     * @param callback The callback
     */
    setCertificateContacts(vaultBaseUrl: string, contacts: Models.Contacts, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param contacts The contacts for the key vault certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    setCertificateContacts(vaultBaseUrl: string, contacts: Models.Contacts, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * The GetCertificateContacts operation returns the set of certificate contact resources in the
     * specified key vault. This operation requires the certificates/managecontacts permission.
     * @summary Lists the certificate contacts for a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateContactsResponse>
     */
    getCertificateContacts(vaultBaseUrl: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateContactsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getCertificateContacts(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateContacts(vaultBaseUrl: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * Deletes the certificate contacts for a specified key vault certificate. This operation requires
     * the certificates/managecontacts permission.
     * @summary Deletes the certificate contacts for a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteCertificateContactsResponse>
     */
    deleteCertificateContacts(vaultBaseUrl: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteCertificateContactsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    deleteCertificateContacts(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCertificateContacts(vaultBaseUrl: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Contacts>): void;
    /**
     * The GetCertificateIssuers operation returns the set of certificate issuer resources in the
     * specified key vault. This operation requires the certificates/manageissuers/getissuers
     * permission.
     * @summary List certificate issuers for a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateIssuersResponse>
     */
    getCertificateIssuers(vaultBaseUrl: string, options?: Models.KeyVaultClientGetCertificateIssuersOptionalParams): Promise<Models.GetCertificateIssuersResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getCertificateIssuers(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.CertificateIssuerListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateIssuers(vaultBaseUrl: string, options: Models.KeyVaultClientGetCertificateIssuersOptionalParams, callback: msRest.ServiceCallback<Models.CertificateIssuerListResult>): void;
    /**
     * The SetCertificateIssuer operation adds or updates the specified certificate issuer. This
     * operation requires the certificates/setissuers permission.
     * @summary Sets the specified certificate issuer.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param provider The issuer provider.
     * @param [options] The optional parameters
     * @returns Promise<Models.SetCertificateIssuerResponse>
     */
    setCertificateIssuer(vaultBaseUrl: string, issuerName: string, provider: string, options?: Models.KeyVaultClientSetCertificateIssuerOptionalParams): Promise<Models.SetCertificateIssuerResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param provider The issuer provider.
     * @param callback The callback
     */
    setCertificateIssuer(vaultBaseUrl: string, issuerName: string, provider: string, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param provider The issuer provider.
     * @param options The optional parameters
     * @param callback The callback
     */
    setCertificateIssuer(vaultBaseUrl: string, issuerName: string, provider: string, options: Models.KeyVaultClientSetCertificateIssuerOptionalParams, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * The UpdateCertificateIssuer operation performs an update on the specified certificate issuer
     * entity. This operation requires the certificates/setissuers permission.
     * @summary Updates the specified certificate issuer.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCertificateIssuerResponse>
     */
    updateCertificateIssuer(vaultBaseUrl: string, issuerName: string, options?: Models.KeyVaultClientUpdateCertificateIssuerOptionalParams): Promise<Models.UpdateCertificateIssuerResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param callback The callback
     */
    updateCertificateIssuer(vaultBaseUrl: string, issuerName: string, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCertificateIssuer(vaultBaseUrl: string, issuerName: string, options: Models.KeyVaultClientUpdateCertificateIssuerOptionalParams, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * The GetCertificateIssuer operation returns the specified certificate issuer resources in the
     * specified key vault. This operation requires the certificates/manageissuers/getissuers
     * permission.
     * @summary Lists the specified certificate issuer.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateIssuerResponse>
     */
    getCertificateIssuer(vaultBaseUrl: string, issuerName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateIssuerResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param callback The callback
     */
    getCertificateIssuer(vaultBaseUrl: string, issuerName: string, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateIssuer(vaultBaseUrl: string, issuerName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * The DeleteCertificateIssuer operation permanently removes the specified certificate issuer from
     * the vault. This operation requires the certificates/manageissuers/deleteissuers permission.
     * @summary Deletes the specified certificate issuer.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteCertificateIssuerResponse>
     */
    deleteCertificateIssuer(vaultBaseUrl: string, issuerName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteCertificateIssuerResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param callback The callback
     */
    deleteCertificateIssuer(vaultBaseUrl: string, issuerName: string, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param issuerName The name of the issuer.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCertificateIssuer(vaultBaseUrl: string, issuerName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.IssuerBundle>): void;
    /**
     * If this is the first version, the certificate resource is created. This operation requires the
     * certificates/create permission.
     * @summary Creates a new certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.CreateCertificateResponse>
     */
    createCertificate(vaultBaseUrl: string, certificateName: string, options?: Models.KeyVaultClientCreateCertificateOptionalParams): Promise<Models.CreateCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    createCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    createCertificate(vaultBaseUrl: string, certificateName: string, options: Models.KeyVaultClientCreateCertificateOptionalParams, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * Imports an existing valid certificate, containing a private key, into Azure Key Vault. The
     * certificate to be imported can be in either PFX or PEM format. If the certificate is in PEM
     * format the PEM file must contain the key as well as x509 certificates. This operation requires
     * the certificates/import permission.
     * @summary Imports a certificate into a specified key vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param base64EncodedCertificate Base64 encoded representation of the certificate object to
     * import. This certificate needs to contain the private key.
     * @param [options] The optional parameters
     * @returns Promise<Models.ImportCertificateResponse>
     */
    importCertificate(vaultBaseUrl: string, certificateName: string, base64EncodedCertificate: string, options?: Models.KeyVaultClientImportCertificateOptionalParams): Promise<Models.ImportCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param base64EncodedCertificate Base64 encoded representation of the certificate object to
     * import. This certificate needs to contain the private key.
     * @param callback The callback
     */
    importCertificate(vaultBaseUrl: string, certificateName: string, base64EncodedCertificate: string, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param base64EncodedCertificate Base64 encoded representation of the certificate object to
     * import. This certificate needs to contain the private key.
     * @param options The optional parameters
     * @param callback The callback
     */
    importCertificate(vaultBaseUrl: string, certificateName: string, base64EncodedCertificate: string, options: Models.KeyVaultClientImportCertificateOptionalParams, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * The GetCertificateVersions operation returns the versions of a certificate in the specified key
     * vault. This operation requires the certificates/list permission.
     * @summary List the versions of a certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateVersionsResponse>
     */
    getCertificateVersions(vaultBaseUrl: string, certificateName: string, options?: Models.KeyVaultClientGetCertificateVersionsOptionalParams): Promise<Models.GetCertificateVersionsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    getCertificateVersions(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateVersions(vaultBaseUrl: string, certificateName: string, options: Models.KeyVaultClientGetCertificateVersionsOptionalParams, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * The GetCertificatePolicy operation returns the specified certificate policy resources in the
     * specified key vault. This operation requires the certificates/get permission.
     * @summary Lists the policy for a certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in a given key vault.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificatePolicyResponse>
     */
    getCertificatePolicy(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificatePolicyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in a given key vault.
     * @param callback The callback
     */
    getCertificatePolicy(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificatePolicy>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in a given key vault.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificatePolicy(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificatePolicy>): void;
    /**
     * Set specified members in the certificate policy. Leave others as null. This operation requires
     * the certificates/update permission.
     * @summary Updates the policy for a certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificatePolicy The policy for the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCertificatePolicyResponse>
     */
    updateCertificatePolicy(vaultBaseUrl: string, certificateName: string, certificatePolicy: Models.CertificatePolicy, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCertificatePolicyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificatePolicy The policy for the certificate.
     * @param callback The callback
     */
    updateCertificatePolicy(vaultBaseUrl: string, certificateName: string, certificatePolicy: Models.CertificatePolicy, callback: msRest.ServiceCallback<Models.CertificatePolicy>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificatePolicy The policy for the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCertificatePolicy(vaultBaseUrl: string, certificateName: string, certificatePolicy: Models.CertificatePolicy, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificatePolicy>): void;
    /**
     * The UpdateCertificate operation applies the specified update on the given certificate; the only
     * elements updated are the certificate's attributes. This operation requires the
     * certificates/update permission.
     * @summary Updates the specified attributes associated with the given certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given key vault.
     * @param certificateVersion The version of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCertificateResponse>
     */
    updateCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, options?: Models.KeyVaultClientUpdateCertificateOptionalParams): Promise<Models.UpdateCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given key vault.
     * @param certificateVersion The version of the certificate.
     * @param callback The callback
     */
    updateCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given key vault.
     * @param certificateVersion The version of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, options: Models.KeyVaultClientUpdateCertificateOptionalParams, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * Gets information about a specific certificate. This operation requires the certificates/get
     * permission.
     * @summary Gets information about a certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificateVersion The version of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateResponse>
     */
    getCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificateVersion The version of the certificate.
     * @param callback The callback
     */
    getCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate in the given vault.
     * @param certificateVersion The version of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificate(vaultBaseUrl: string, certificateName: string, certificateVersion: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * Updates a certificate creation operation that is already in progress. This operation requires
     * the certificates/update permission.
     * @summary Updates a certificate operation.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param cancellationRequested Indicates if cancellation was requested on the certificate
     * operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateCertificateOperationResponse>
     */
    updateCertificateOperation(vaultBaseUrl: string, certificateName: string, cancellationRequested: boolean, options?: msRest.RequestOptionsBase): Promise<Models.UpdateCertificateOperationResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param cancellationRequested Indicates if cancellation was requested on the certificate
     * operation.
     * @param callback The callback
     */
    updateCertificateOperation(vaultBaseUrl: string, certificateName: string, cancellationRequested: boolean, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param cancellationRequested Indicates if cancellation was requested on the certificate
     * operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateCertificateOperation(vaultBaseUrl: string, certificateName: string, cancellationRequested: boolean, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * Gets the creation operation associated with a specified certificate. This operation requires the
     * certificates/get permission.
     * @summary Gets the creation operation of a certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateOperationResponse>
     */
    getCertificateOperation(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateOperationResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    getCertificateOperation(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateOperation(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * Deletes the creation operation for a specified certificate that is in the process of being
     * created. The certificate is no longer created. This operation requires the certificates/update
     * permission.
     * @summary Deletes the creation operation for a specific certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteCertificateOperationResponse>
     */
    deleteCertificateOperation(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteCertificateOperationResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    deleteCertificateOperation(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteCertificateOperation(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateOperation>): void;
    /**
     * The MergeCertificate operation performs the merging of a certificate or certificate chain with a
     * key pair currently available in the service. This operation requires the certificates/create
     * permission.
     * @summary Merges a certificate or a certificate chain with a key pair existing on the server.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param x509Certificates The certificate or the certificate chain to merge.
     * @param [options] The optional parameters
     * @returns Promise<Models.MergeCertificateResponse>
     */
    mergeCertificate(vaultBaseUrl: string, certificateName: string, x509Certificates: Uint8Array[], options?: Models.KeyVaultClientMergeCertificateOptionalParams): Promise<Models.MergeCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param x509Certificates The certificate or the certificate chain to merge.
     * @param callback The callback
     */
    mergeCertificate(vaultBaseUrl: string, certificateName: string, x509Certificates: Uint8Array[], callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param x509Certificates The certificate or the certificate chain to merge.
     * @param options The optional parameters
     * @param callback The callback
     */
    mergeCertificate(vaultBaseUrl: string, certificateName: string, x509Certificates: Uint8Array[], options: Models.KeyVaultClientMergeCertificateOptionalParams, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * Requests that a backup of the specified certificate be downloaded to the client. All versions of
     * the certificate will be downloaded. This operation requires the certificates/backup permission.
     * @summary Backs up the specified certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param [options] The optional parameters
     * @returns Promise<Models.BackupCertificateResponse>
     */
    backupCertificate(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.BackupCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param callback The callback
     */
    backupCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.BackupCertificateResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate.
     * @param options The optional parameters
     * @param callback The callback
     */
    backupCertificate(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.BackupCertificateResult>): void;
    /**
     * Restores a backed up certificate, and all its versions, to a vault. This operation requires the
     * certificates/restore permission.
     * @summary Restores a backed up certificate to a vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateBundleBackup The backup blob associated with a certificate bundle.
     * @param [options] The optional parameters
     * @returns Promise<Models.RestoreCertificateResponse>
     */
    restoreCertificate(vaultBaseUrl: string, certificateBundleBackup: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.RestoreCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateBundleBackup The backup blob associated with a certificate bundle.
     * @param callback The callback
     */
    restoreCertificate(vaultBaseUrl: string, certificateBundleBackup: Uint8Array, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateBundleBackup The backup blob associated with a certificate bundle.
     * @param options The optional parameters
     * @param callback The callback
     */
    restoreCertificate(vaultBaseUrl: string, certificateBundleBackup: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * The GetDeletedCertificates operation retrieves the certificates in the current vault which are
     * in a deleted state and ready for recovery or purging. This operation includes deletion-specific
     * information. This operation requires the certificates/get/list permission. This operation can
     * only be enabled on soft-delete enabled vaults.
     * @summary Lists the deleted certificates in the specified vault currently available for recovery.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedCertificatesResponse>
     */
    getDeletedCertificates(vaultBaseUrl: string, options?: Models.KeyVaultClientGetDeletedCertificatesOptionalParams): Promise<Models.GetDeletedCertificatesResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getDeletedCertificates(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.DeletedCertificateListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedCertificates(vaultBaseUrl: string, options: Models.KeyVaultClientGetDeletedCertificatesOptionalParams, callback: msRest.ServiceCallback<Models.DeletedCertificateListResult>): void;
    /**
     * The GetDeletedCertificate operation retrieves the deleted certificate information plus its
     * attributes, such as retention interval, scheduled permanent deletion and the current deletion
     * recovery level. This operation requires the certificates/get permission.
     * @summary Retrieves information about the specified deleted certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedCertificateResponse>
     */
    getDeletedCertificate(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param callback The callback
     */
    getDeletedCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.DeletedCertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedCertificate(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedCertificateBundle>): void;
    /**
     * The PurgeDeletedCertificate operation performs an irreversible deletion of the specified
     * certificate, without possibility for recovery. The operation is not available if the recovery
     * level does not specify 'Purgeable'. This operation requires the certificate/purge permission.
     * @summary Permanently deletes the specified deleted certificate.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    purgeDeletedCertificate(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param callback The callback
     */
    purgeDeletedCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the certificate
     * @param options The optional parameters
     * @param callback The callback
     */
    purgeDeletedCertificate(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * The RecoverDeletedCertificate operation performs the reversal of the Delete operation. The
     * operation is applicable in vaults enabled for soft-delete, and must be issued during the
     * retention interval (available in the deleted certificate's attributes). This operation requires
     * the certificates/recover permission.
     * @summary Recovers the deleted certificate back to its current version under /certificates.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the deleted certificate
     * @param [options] The optional parameters
     * @returns Promise<Models.RecoverDeletedCertificateResponse>
     */
    recoverDeletedCertificate(vaultBaseUrl: string, certificateName: string, options?: msRest.RequestOptionsBase): Promise<Models.RecoverDeletedCertificateResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the deleted certificate
     * @param callback The callback
     */
    recoverDeletedCertificate(vaultBaseUrl: string, certificateName: string, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param certificateName The name of the deleted certificate
     * @param options The optional parameters
     * @param callback The callback
     */
    recoverDeletedCertificate(vaultBaseUrl: string, certificateName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateBundle>): void;
    /**
     * List storage accounts managed by the specified key vault. This operation requires the
     * storage/list permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetStorageAccountsResponse>
     */
    getStorageAccounts(vaultBaseUrl: string, options?: Models.KeyVaultClientGetStorageAccountsOptionalParams): Promise<Models.GetStorageAccountsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getStorageAccounts(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.StorageListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getStorageAccounts(vaultBaseUrl: string, options: Models.KeyVaultClientGetStorageAccountsOptionalParams, callback: msRest.ServiceCallback<Models.StorageListResult>): void;
    /**
     * The Get Deleted Storage Accounts operation returns the storage accounts that have been deleted
     * for a vault enabled for soft-delete. This operation requires the storage/list permission.
     * @summary Lists deleted storage accounts for the specified vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedStorageAccountsResponse>
     */
    getDeletedStorageAccounts(vaultBaseUrl: string, options?: Models.KeyVaultClientGetDeletedStorageAccountsOptionalParams): Promise<Models.GetDeletedStorageAccountsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param callback The callback
     */
    getDeletedStorageAccounts(vaultBaseUrl: string, callback: msRest.ServiceCallback<Models.DeletedStorageListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedStorageAccounts(vaultBaseUrl: string, options: Models.KeyVaultClientGetDeletedStorageAccountsOptionalParams, callback: msRest.ServiceCallback<Models.DeletedStorageListResult>): void;
    /**
     * The Get Deleted Storage Account operation returns the specified deleted storage account along
     * with its attributes. This operation requires the storage/get permission.
     * @summary Gets the specified deleted storage account.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedStorageAccountResponse>
     */
    getDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    getDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.DeletedStorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedStorageBundle>): void;
    /**
     * The purge deleted storage account operation removes the secret permanently, without the
     * possibility of recovery. This operation can only be performed on a soft-delete enabled vault.
     * This operation requires the storage/purge permission.
     * @summary Permanently deletes the specified storage account.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<msRest.RestResponse>
     */
    purgeDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    purgeDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<void>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    purgeDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Recovers the deleted storage account in the specified vault. This operation can only be
     * performed on a soft-delete enabled vault. This operation requires the storage/recover
     * permission.
     * @summary Recovers the deleted storage account.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.RecoverDeletedStorageAccountResponse>
     */
    recoverDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<Models.RecoverDeletedStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    recoverDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    recoverDeletedStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * Requests that a backup of the specified storage account be downloaded to the client. This
     * operation requires the storage/backup permission.
     * @summary Backs up the specified storage account.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.BackupStorageAccountResponse>
     */
    backupStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<Models.BackupStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    backupStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.BackupStorageResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    backupStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.BackupStorageResult>): void;
    /**
     * Restores a backed up storage account to a vault. This operation requires the storage/restore
     * permission.
     * @summary Restores a backed up storage account to a vault.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageBundleBackup The backup blob associated with a storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.RestoreStorageAccountResponse>
     */
    restoreStorageAccount(vaultBaseUrl: string, storageBundleBackup: Uint8Array, options?: msRest.RequestOptionsBase): Promise<Models.RestoreStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageBundleBackup The backup blob associated with a storage account.
     * @param callback The callback
     */
    restoreStorageAccount(vaultBaseUrl: string, storageBundleBackup: Uint8Array, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageBundleBackup The backup blob associated with a storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    restoreStorageAccount(vaultBaseUrl: string, storageBundleBackup: Uint8Array, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * Deletes a storage account. This operation requires the storage/delete permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteStorageAccountResponse>
     */
    deleteStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    deleteStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.DeletedStorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedStorageBundle>): void;
    /**
     * Gets information about a specified storage account. This operation requires the storage/get
     * permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetStorageAccountResponse>
     */
    getStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    getStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    getStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * Creates or updates a new storage account. This operation requires the storage/set permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param resourceId Storage account resource id.
     * @param activeKeyName Current active storage account key name.
     * @param autoRegenerateKey whether keyvault should manage the storage account for the user.
     * @param [options] The optional parameters
     * @returns Promise<Models.SetStorageAccountResponse>
     */
    setStorageAccount(vaultBaseUrl: string, storageAccountName: string, resourceId: string, activeKeyName: string, autoRegenerateKey: boolean, options?: Models.KeyVaultClientSetStorageAccountOptionalParams): Promise<Models.SetStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param resourceId Storage account resource id.
     * @param activeKeyName Current active storage account key name.
     * @param autoRegenerateKey whether keyvault should manage the storage account for the user.
     * @param callback The callback
     */
    setStorageAccount(vaultBaseUrl: string, storageAccountName: string, resourceId: string, activeKeyName: string, autoRegenerateKey: boolean, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param resourceId Storage account resource id.
     * @param activeKeyName Current active storage account key name.
     * @param autoRegenerateKey whether keyvault should manage the storage account for the user.
     * @param options The optional parameters
     * @param callback The callback
     */
    setStorageAccount(vaultBaseUrl: string, storageAccountName: string, resourceId: string, activeKeyName: string, autoRegenerateKey: boolean, options: Models.KeyVaultClientSetStorageAccountOptionalParams, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * Updates the specified attributes associated with the given storage account. This operation
     * requires the storage/set/update permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateStorageAccountResponse>
     */
    updateStorageAccount(vaultBaseUrl: string, storageAccountName: string, options?: Models.KeyVaultClientUpdateStorageAccountOptionalParams): Promise<Models.UpdateStorageAccountResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    updateStorageAccount(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateStorageAccount(vaultBaseUrl: string, storageAccountName: string, options: Models.KeyVaultClientUpdateStorageAccountOptionalParams, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * Regenerates the specified key value for the given storage account. This operation requires the
     * storage/regeneratekey permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param keyName The storage account key name.
     * @param [options] The optional parameters
     * @returns Promise<Models.RegenerateStorageAccountKeyResponse>
     */
    regenerateStorageAccountKey(vaultBaseUrl: string, storageAccountName: string, keyName: string, options?: msRest.RequestOptionsBase): Promise<Models.RegenerateStorageAccountKeyResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param keyName The storage account key name.
     * @param callback The callback
     */
    regenerateStorageAccountKey(vaultBaseUrl: string, storageAccountName: string, keyName: string, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param keyName The storage account key name.
     * @param options The optional parameters
     * @param callback The callback
     */
    regenerateStorageAccountKey(vaultBaseUrl: string, storageAccountName: string, keyName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.StorageBundle>): void;
    /**
     * List storage SAS definitions for the given storage account. This operation requires the
     * storage/listsas permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSasDefinitionsResponse>
     */
    getSasDefinitions(vaultBaseUrl: string, storageAccountName: string, options?: Models.KeyVaultClientGetSasDefinitionsOptionalParams): Promise<Models.GetSasDefinitionsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    getSasDefinitions(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.SasDefinitionListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSasDefinitions(vaultBaseUrl: string, storageAccountName: string, options: Models.KeyVaultClientGetSasDefinitionsOptionalParams, callback: msRest.ServiceCallback<Models.SasDefinitionListResult>): void;
    /**
     * The Get Deleted Sas Definitions operation returns the SAS definitions that have been deleted for
     * a vault enabled for soft-delete. This operation requires the storage/listsas permission.
     * @summary Lists deleted SAS definitions for the specified vault and storage account.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSasDefinitionsResponse>
     */
    getDeletedSasDefinitions(vaultBaseUrl: string, storageAccountName: string, options?: Models.KeyVaultClientGetDeletedSasDefinitionsOptionalParams): Promise<Models.GetDeletedSasDefinitionsResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param callback The callback
     */
    getDeletedSasDefinitions(vaultBaseUrl: string, storageAccountName: string, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionListResult>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSasDefinitions(vaultBaseUrl: string, storageAccountName: string, options: Models.KeyVaultClientGetDeletedSasDefinitionsOptionalParams, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionListResult>): void;
    /**
     * The Get Deleted SAS Definition operation returns the specified deleted SAS definition along with
     * its attributes. This operation requires the storage/getsas permission.
     * @summary Gets the specified deleted sas definition.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSasDefinitionResponse>
     */
    getDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param callback The callback
     */
    getDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionBundle>): void;
    /**
     * Recovers the deleted SAS definition for the specified storage account. This operation can only
     * be performed on a soft-delete enabled vault. This operation requires the storage/recover
     * permission.
     * @summary Recovers the deleted SAS definition.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.RecoverDeletedSasDefinitionResponse>
     */
    recoverDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options?: msRest.RequestOptionsBase): Promise<Models.RecoverDeletedSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param callback The callback
     */
    recoverDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    recoverDeletedSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * Deletes a SAS definition from a specified storage account. This operation requires the
     * storage/deletesas permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.DeleteSasDefinitionResponse>
     */
    deleteSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options?: msRest.RequestOptionsBase): Promise<Models.DeleteSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param callback The callback
     */
    deleteSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    deleteSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionBundle>): void;
    /**
     * Gets information about a SAS definition for the specified storage account. This operation
     * requires the storage/getsas permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSasDefinitionResponse>
     */
    getSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options?: msRest.RequestOptionsBase): Promise<Models.GetSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param callback The callback
     */
    getSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * Creates or updates a new SAS definition for the specified storage account. This operation
     * requires the storage/setsas permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param templateUri The SAS definition token template signed with an arbitrary key.  Tokens
     * created according to the SAS definition will have the same properties as the template.
     * @param sasType The type of SAS token the SAS definition will create. Possible values include:
     * 'account', 'service'
     * @param validityPeriod The validity period of SAS tokens created according to the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.SetSasDefinitionResponse>
     */
    setSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, templateUri: string, sasType: Models.SasTokenType, validityPeriod: string, options?: Models.KeyVaultClientSetSasDefinitionOptionalParams): Promise<Models.SetSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param templateUri The SAS definition token template signed with an arbitrary key.  Tokens
     * created according to the SAS definition will have the same properties as the template.
     * @param sasType The type of SAS token the SAS definition will create. Possible values include:
     * 'account', 'service'
     * @param validityPeriod The validity period of SAS tokens created according to the SAS definition.
     * @param callback The callback
     */
    setSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, templateUri: string, sasType: Models.SasTokenType, validityPeriod: string, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param templateUri The SAS definition token template signed with an arbitrary key.  Tokens
     * created according to the SAS definition will have the same properties as the template.
     * @param sasType The type of SAS token the SAS definition will create. Possible values include:
     * 'account', 'service'
     * @param validityPeriod The validity period of SAS tokens created according to the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    setSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, templateUri: string, sasType: Models.SasTokenType, validityPeriod: string, options: Models.KeyVaultClientSetSasDefinitionOptionalParams, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * Updates the specified attributes associated with the given SAS definition. This operation
     * requires the storage/setsas permission.
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param [options] The optional parameters
     * @returns Promise<Models.UpdateSasDefinitionResponse>
     */
    updateSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options?: Models.KeyVaultClientUpdateSasDefinitionOptionalParams): Promise<Models.UpdateSasDefinitionResponse>;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param callback The callback
     */
    updateSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
     * @param storageAccountName The name of the storage account.
     * @param sasDefinitionName The name of the SAS definition.
     * @param options The optional parameters
     * @param callback The callback
     */
    updateSasDefinition(vaultBaseUrl: string, storageAccountName: string, sasDefinitionName: string, options: Models.KeyVaultClientUpdateSasDefinitionOptionalParams, callback: msRest.ServiceCallback<Models.SasDefinitionBundle>): void;
    /**
     * The full key identifier, attributes, and tags are provided in the response. This operation
     * requires the keys/list permission.
     * @summary Retrieves a list of individual key versions with the same key name.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetKeyVersionsNextResponse>
     */
    getKeyVersionsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetKeyVersionsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getKeyVersionsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getKeyVersionsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
     * part of a stored key. The LIST operation is applicable to all key types, however only the base
     * key identifier, attributes, and tags are provided in the response. Individual versions of a key
     * are not listed in the response. This operation requires the keys/list permission.
     * @summary List keys in the specified vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetKeysNextResponse>
     */
    getKeysNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetKeysNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getKeysNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getKeysNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.KeyListResult>): void;
    /**
     * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
     * part of a deleted key. This operation includes deletion-specific information. The Get Deleted
     * Keys operation is applicable for vaults enabled for soft-delete. While the operation can be
     * invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault.
     * This operation requires the keys/list permission.
     * @summary Lists the deleted keys in the specified vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedKeysNextResponse>
     */
    getDeletedKeysNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedKeysNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getDeletedKeysNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedKeyListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedKeysNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedKeyListResult>): void;
    /**
     * The Get Secrets operation is applicable to the entire vault. However, only the base secret
     * identifier and its attributes are provided in the response. Individual secret versions are not
     * listed in the response. This operation requires the secrets/list permission.
     * @summary List secrets in a specified key vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSecretsNextResponse>
     */
    getSecretsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetSecretsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getSecretsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSecretsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * The full secret identifier and attributes are provided in the response. No values are returned
     * for the secrets. This operations requires the secrets/list permission.
     * @summary List all versions of the specified secret.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSecretVersionsNextResponse>
     */
    getSecretVersionsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetSecretVersionsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getSecretVersionsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSecretVersionsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SecretListResult>): void;
    /**
     * The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled
     * for soft-delete. This operation requires the secrets/list permission.
     * @summary Lists deleted secrets for the specified vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSecretsNextResponse>
     */
    getDeletedSecretsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedSecretsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getDeletedSecretsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedSecretListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSecretsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSecretListResult>): void;
    /**
     * The GetCertificates operation returns the set of certificates resources in the specified key
     * vault. This operation requires the certificates/list permission.
     * @summary List certificates in a specified key vault
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificatesNextResponse>
     */
    getCertificatesNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificatesNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getCertificatesNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificatesNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * The GetCertificateIssuers operation returns the set of certificate issuer resources in the
     * specified key vault. This operation requires the certificates/manageissuers/getissuers
     * permission.
     * @summary List certificate issuers for a specified key vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateIssuersNextResponse>
     */
    getCertificateIssuersNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateIssuersNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getCertificateIssuersNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.CertificateIssuerListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateIssuersNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateIssuerListResult>): void;
    /**
     * The GetCertificateVersions operation returns the versions of a certificate in the specified key
     * vault. This operation requires the certificates/list permission.
     * @summary List the versions of a certificate.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetCertificateVersionsNextResponse>
     */
    getCertificateVersionsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetCertificateVersionsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getCertificateVersionsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getCertificateVersionsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.CertificateListResult>): void;
    /**
     * The GetDeletedCertificates operation retrieves the certificates in the current vault which are
     * in a deleted state and ready for recovery or purging. This operation includes deletion-specific
     * information. This operation requires the certificates/get/list permission. This operation can
     * only be enabled on soft-delete enabled vaults.
     * @summary Lists the deleted certificates in the specified vault currently available for recovery.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedCertificatesNextResponse>
     */
    getDeletedCertificatesNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedCertificatesNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getDeletedCertificatesNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedCertificateListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedCertificatesNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedCertificateListResult>): void;
    /**
     * List storage accounts managed by the specified key vault. This operation requires the
     * storage/list permission.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetStorageAccountsNextResponse>
     */
    getStorageAccountsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetStorageAccountsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getStorageAccountsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.StorageListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getStorageAccountsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.StorageListResult>): void;
    /**
     * The Get Deleted Storage Accounts operation returns the storage accounts that have been deleted
     * for a vault enabled for soft-delete. This operation requires the storage/list permission.
     * @summary Lists deleted storage accounts for the specified vault.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedStorageAccountsNextResponse>
     */
    getDeletedStorageAccountsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedStorageAccountsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getDeletedStorageAccountsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedStorageListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedStorageAccountsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedStorageListResult>): void;
    /**
     * List storage SAS definitions for the given storage account. This operation requires the
     * storage/listsas permission.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetSasDefinitionsNextResponse>
     */
    getSasDefinitionsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetSasDefinitionsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getSasDefinitionsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.SasDefinitionListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getSasDefinitionsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SasDefinitionListResult>): void;
    /**
     * The Get Deleted Sas Definitions operation returns the SAS definitions that have been deleted for
     * a vault enabled for soft-delete. This operation requires the storage/listsas permission.
     * @summary Lists deleted SAS definitions for the specified vault and storage account.
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param [options] The optional parameters
     * @returns Promise<Models.GetDeletedSasDefinitionsNextResponse>
     */
    getDeletedSasDefinitionsNext(nextPageLink: string, options?: msRest.RequestOptionsBase): Promise<Models.GetDeletedSasDefinitionsNextResponse>;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param callback The callback
     */
    getDeletedSasDefinitionsNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionListResult>): void;
    /**
     * @param nextPageLink The NextLink from the previous successful call to List operation.
     * @param options The optional parameters
     * @param callback The callback
     */
    getDeletedSasDefinitionsNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DeletedSasDefinitionListResult>): void;
}
export { KeyVaultClient, KeyVaultClientContext, Models as KeyVaultModels, Mappers as KeyVaultMappers };
//# sourceMappingURL=keyVaultClient.d.ts.map