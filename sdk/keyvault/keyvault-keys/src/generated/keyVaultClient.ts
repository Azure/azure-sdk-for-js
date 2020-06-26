// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import * as Parameters from "./models/parameters";
import * as Models from "./models";
import * as Mappers from "./models/mappers";
import { KeyVaultClientContext } from "./keyVaultClientContext";
import {
  KeyVaultClientOptionalParams,
  KeyCreateParameters,
  KeyVaultClientCreateKeyResponse,
  KeyImportParameters,
  KeyVaultClientImportKeyResponse,
  KeyVaultClientDeleteKeyResponse,
  KeyUpdateParameters,
  KeyVaultClientUpdateKeyResponse,
  KeyVaultClientGetKeyResponse,
  KeyVaultClientGetKeyVersionsOptionalParams,
  KeyVaultClientGetKeyVersionsResponse,
  KeyVaultClientGetKeysOptionalParams,
  KeyVaultClientGetKeysResponse,
  KeyVaultClientBackupKeyResponse,
  KeyRestoreParameters,
  KeyVaultClientRestoreKeyResponse,
  KeyOperationsParameters,
  KeyVaultClientEncryptResponse,
  KeyVaultClientDecryptResponse,
  KeySignParameters,
  KeyVaultClientSignResponse,
  KeyVerifyParameters,
  KeyVaultClientVerifyResponse,
  KeyVaultClientWrapKeyResponse,
  KeyVaultClientUnwrapKeyResponse,
  KeyExportParameters,
  KeyVaultClientExportKeyResponse,
  KeyVaultClientGetDeletedKeysOptionalParams,
  KeyVaultClientGetDeletedKeysResponse,
  KeyVaultClientGetDeletedKeyResponse,
  KeyVaultClientRecoverDeletedKeyResponse,
  KeyVaultClientGetKeyVersionsNextOptionalParams,
  KeyVaultClientGetKeyVersionsNextResponse,
  KeyVaultClientGetKeysNextOptionalParams,
  KeyVaultClientGetKeysNextResponse,
  KeyVaultClientGetDeletedKeysNextOptionalParams,
  KeyVaultClientGetDeletedKeysNextResponse
} from "./models";

class KeyVaultClient extends KeyVaultClientContext {
  /**
   * Initializes a new instance of the KeyVaultClient class.
   * @param options The parameter options
   */
  constructor(options?: KeyVaultClientOptionalParams) {
    super(options);
  }

  /**
   * The create key operation can be used to create any key type in Azure Key Vault. If the named key
   * already exists, Azure Key Vault creates a new version of the key. It requires the keys/create
   * permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name for the new key. The system will generate the version name for the new key.
   * @param parameters The parameters to create a key.
   * @param options The options parameters.
   */
  createKey(
    vaultBaseUrl: string,
    keyName: string,
    parameters: KeyCreateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientCreateKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, parameters, options: operationOptions },
      createKeyOperationSpec
    ) as Promise<KeyVaultClientCreateKeyResponse>;
  }

  /**
   * The import key operation may be used to import any key type into an Azure Key Vault. If the named
   * key already exists, Azure Key Vault creates a new version of the key. This operation requires the
   * keys/import permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName Name for the imported key.
   * @param parameters The parameters to import a key.
   * @param options The options parameters.
   */
  importKey(
    vaultBaseUrl: string,
    keyName: string,
    parameters: KeyImportParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientImportKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, parameters, options: operationOptions },
      importKeyOperationSpec
    ) as Promise<KeyVaultClientImportKeyResponse>;
  }

  /**
   * The delete key operation cannot be used to remove individual versions of a key. This operation
   * removes the cryptographic material associated with the key, which means the key is not usable for
   * Sign/Verify, Wrap/Unwrap or Encrypt/Decrypt operations. This operation requires the keys/delete
   * permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key to delete.
   * @param options The options parameters.
   */
  deleteKey(
    vaultBaseUrl: string,
    keyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientDeleteKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      deleteKeyOperationSpec
    ) as Promise<KeyVaultClientDeleteKeyResponse>;
  }

  /**
   * In order to perform this operation, the key must already exist in the Key Vault. Note: The
   * cryptographic material of a key itself cannot be changed. This operation requires the keys/update
   * permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of key to update.
   * @param keyVersion The version of the key to update.
   * @param parameters The parameters of the key to update.
   * @param options The options parameters.
   */
  updateKey(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyUpdateParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientUpdateKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      updateKeyOperationSpec
    ) as Promise<KeyVaultClientUpdateKeyResponse>;
  }

  /**
   * The get key operation is applicable to all key types. If the requested key is symmetric, then no key
   * material is released in the response. This operation requires the keys/get permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key to get.
   * @param keyVersion Adding the version parameter retrieves a specific version of a key. This URI
   *                   fragment is optional. If not specified, the latest version of the key is returned.
   * @param options The options parameters.
   */
  getKey(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientGetKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, keyVersion, options: operationOptions },
      getKeyOperationSpec
    ) as Promise<KeyVaultClientGetKeyResponse>;
  }

  /**
   * The full key identifier, attributes, and tags are provided in the response. This operation requires
   * the keys/list permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param options The options parameters.
   */
  getKeyVersions(
    vaultBaseUrl: string,
    keyName: string,
    options?: KeyVaultClientGetKeyVersionsOptionalParams
  ): Promise<KeyVaultClientGetKeyVersionsResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      getKeyVersionsOperationSpec
    ) as Promise<KeyVaultClientGetKeyVersionsResponse>;
  }

  /**
   * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
   * part of a stored key. The LIST operation is applicable to all key types, however only the base key
   * identifier, attributes, and tags are provided in the response. Individual versions of a key are not
   * listed in the response. This operation requires the keys/list permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param options The options parameters.
   */
  getKeys(
    vaultBaseUrl: string,
    options?: KeyVaultClientGetKeysOptionalParams
  ): Promise<KeyVaultClientGetKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, options: operationOptions },
      getKeysOperationSpec
    ) as Promise<KeyVaultClientGetKeysResponse>;
  }

  /**
   * The Key Backup operation exports a key from Azure Key Vault in a protected form. Note that this
   * operation does NOT return key material in a form that can be used outside the Azure Key Vault
   * system, the returned key material is either protected to a Azure Key Vault HSM or to Azure Key Vault
   * itself. The intent of this operation is to allow a client to GENERATE a key in one Azure Key Vault
   * instance, BACKUP the key, and then RESTORE it into another Azure Key Vault instance. The BACKUP
   * operation may be used to export, in protected form, any key type from Azure Key Vault. Individual
   * versions of a key cannot be backed up. BACKUP / RESTORE can be performed within geographical
   * boundaries only; meaning that a BACKUP from one geographical area cannot be restored to another
   * geographical area. For example, a backup from the US geographical area cannot be restored in an EU
   * geographical area. This operation requires the key/backup permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param options The options parameters.
   */
  backupKey(
    vaultBaseUrl: string,
    keyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientBackupKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      backupKeyOperationSpec
    ) as Promise<KeyVaultClientBackupKeyResponse>;
  }

  /**
   * Imports a previously backed up key into Azure Key Vault, restoring the key, its key identifier,
   * attributes and access control policies. The RESTORE operation may be used to import a previously
   * backed up key. Individual versions of a key cannot be restored. The key is restored in its entirety
   * with the same key name as it had when it was backed up. If the key name is not available in the
   * target Key Vault, the RESTORE operation will be rejected. While the key name is retained during
   * restore, the final key identifier will change if the key is restored to a different vault. Restore
   * will restore all versions and preserve version identifiers. The RESTORE operation is subject to
   * security constraints: The target Key Vault must be owned by the same Microsoft Azure Subscription as
   * the source Key Vault The user must have RESTORE permission in the target Key Vault. This operation
   * requires the keys/restore permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param parameters The parameters to restore the key.
   * @param options The options parameters.
   */
  restoreKey(
    vaultBaseUrl: string,
    parameters: KeyRestoreParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientRestoreKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, parameters, options: operationOptions },
      restoreKeyOperationSpec
    ) as Promise<KeyVaultClientRestoreKeyResponse>;
  }

  /**
   * The ENCRYPT operation encrypts an arbitrary sequence of bytes using an encryption key that is stored
   * in Azure Key Vault. Note that the ENCRYPT operation only supports a single block of data, the size
   * of which is dependent on the target key and the encryption algorithm to be used. The ENCRYPT
   * operation is only strictly necessary for symmetric keys stored in Azure Key Vault since protection
   * with an asymmetric key can be performed using public portion of the key. This operation is supported
   * for asymmetric keys as a convenience for callers that have a key-reference but do not have access to
   * the public key material. This operation requires the keys/encrypt permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for the encryption operation.
   * @param options The options parameters.
   */
  encrypt(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyOperationsParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientEncryptResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      encryptOperationSpec
    ) as Promise<KeyVaultClientEncryptResponse>;
  }

  /**
   * The DECRYPT operation decrypts a well-formed block of ciphertext using the target encryption key and
   * specified algorithm. This operation is the reverse of the ENCRYPT operation; only a single block of
   * data may be decrypted, the size of this block is dependent on the target key and the algorithm to be
   * used. The DECRYPT operation applies to asymmetric and symmetric keys stored in Azure Key Vault since
   * it uses the private portion of the key. This operation requires the keys/decrypt permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for the decryption operation.
   * @param options The options parameters.
   */
  decrypt(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyOperationsParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientDecryptResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      decryptOperationSpec
    ) as Promise<KeyVaultClientDecryptResponse>;
  }

  /**
   * The SIGN operation is applicable to asymmetric and symmetric keys stored in Azure Key Vault since
   * this operation uses the private portion of the key. This operation requires the keys/sign
   * permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for the signing operation.
   * @param options The options parameters.
   */
  sign(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeySignParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientSignResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      signOperationSpec
    ) as Promise<KeyVaultClientSignResponse>;
  }

  /**
   * The VERIFY operation is applicable to symmetric keys stored in Azure Key Vault. VERIFY is not
   * strictly necessary for asymmetric keys stored in Azure Key Vault since signature verification can be
   * performed using the public portion of the key but this operation is supported as a convenience for
   * callers that only have a key-reference and not the public portion of the key. This operation
   * requires the keys/verify permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for verify operations.
   * @param options The options parameters.
   */
  verify(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyVerifyParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientVerifyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      verifyOperationSpec
    ) as Promise<KeyVaultClientVerifyResponse>;
  }

  /**
   * The WRAP operation supports encryption of a symmetric key using a key encryption key that has
   * previously been stored in an Azure Key Vault. The WRAP operation is only strictly necessary for
   * symmetric keys stored in Azure Key Vault since protection with an asymmetric key can be performed
   * using the public portion of the key. This operation is supported for asymmetric keys as a
   * convenience for callers that have a key-reference but do not have access to the public key material.
   * This operation requires the keys/wrapKey permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for wrap operation.
   * @param options The options parameters.
   */
  wrapKey(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyOperationsParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientWrapKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      wrapKeyOperationSpec
    ) as Promise<KeyVaultClientWrapKeyResponse>;
  }

  /**
   * The UNWRAP operation supports decryption of a symmetric key using the target key encryption key.
   * This operation is the reverse of the WRAP operation. The UNWRAP operation applies to asymmetric and
   * symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This
   * operation requires the keys/unwrapKey permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param keyVersion The version of the key.
   * @param parameters The parameters for the key operation.
   * @param options The options parameters.
   */
  unwrapKey(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyOperationsParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientUnwrapKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      unwrapKeyOperationSpec
    ) as Promise<KeyVaultClientUnwrapKeyResponse>;
  }

  /**
   * The export key operation is applicable to all key types. The target key must be marked exportable.
   * This operation requires the keys/export permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key to get.
   * @param keyVersion Adding the version parameter retrieves a specific version of a key.
   * @param parameters The parameters for the key export operation.
   * @param options The options parameters.
   */
  exportKey(
    vaultBaseUrl: string,
    keyName: string,
    keyVersion: string,
    parameters: KeyExportParameters,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientExportKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      {
        vaultBaseUrl,
        keyName,
        keyVersion,
        parameters,
        options: operationOptions
      },
      exportKeyOperationSpec
    ) as Promise<KeyVaultClientExportKeyResponse>;
  }

  /**
   * Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public
   * part of a deleted key. This operation includes deletion-specific information. The Get Deleted Keys
   * operation is applicable for vaults enabled for soft-delete. While the operation can be invoked on
   * any vault, it will return an error if invoked on a non soft-delete enabled vault. This operation
   * requires the keys/list permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param options The options parameters.
   */
  getDeletedKeys(
    vaultBaseUrl: string,
    options?: KeyVaultClientGetDeletedKeysOptionalParams
  ): Promise<KeyVaultClientGetDeletedKeysResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, options: operationOptions },
      getDeletedKeysOperationSpec
    ) as Promise<KeyVaultClientGetDeletedKeysResponse>;
  }

  /**
   * The Get Deleted Key operation is applicable for soft-delete enabled vaults. While the operation can
   * be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault. This
   * operation requires the keys/get permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param options The options parameters.
   */
  getDeletedKey(
    vaultBaseUrl: string,
    keyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientGetDeletedKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      getDeletedKeyOperationSpec
    ) as Promise<KeyVaultClientGetDeletedKeyResponse>;
  }

  /**
   * The Purge Deleted Key operation is applicable for soft-delete enabled vaults. While the operation
   * can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault.
   * This operation requires the keys/purge permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key
   * @param options The options parameters.
   */
  purgeDeletedKey(
    vaultBaseUrl: string,
    keyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<coreHttp.RestResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      purgeDeletedKeyOperationSpec
    ) as Promise<coreHttp.RestResponse>;
  }

  /**
   * The Recover Deleted Key operation is applicable for deleted keys in soft-delete enabled vaults. It
   * recovers the deleted key back to its latest version under /keys. An attempt to recover an
   * non-deleted key will return an error. Consider this the inverse of the delete operation on
   * soft-delete enabled vaults. This operation requires the keys/recover permission.
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the deleted key.
   * @param options The options parameters.
   */
  recoverDeletedKey(
    vaultBaseUrl: string,
    keyName: string,
    options?: coreHttp.OperationOptions
  ): Promise<KeyVaultClientRecoverDeletedKeyResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, options: operationOptions },
      recoverDeletedKeyOperationSpec
    ) as Promise<KeyVaultClientRecoverDeletedKeyResponse>;
  }

  /**
   * GetKeyVersionsNext
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param keyName The name of the key.
   * @param nextLink The nextLink from the previous successful call to the GetKeyVersions method.
   * @param options The options parameters.
   */
  getKeyVersionsNext(
    vaultBaseUrl: string,
    keyName: string,
    nextLink: string,
    options?: KeyVaultClientGetKeyVersionsNextOptionalParams
  ): Promise<KeyVaultClientGetKeyVersionsNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, keyName, nextLink, options: operationOptions },
      getKeyVersionsNextOperationSpec
    ) as Promise<KeyVaultClientGetKeyVersionsNextResponse>;
  }

  /**
   * GetKeysNext
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param nextLink The nextLink from the previous successful call to the GetKeys method.
   * @param options The options parameters.
   */
  getKeysNext(
    vaultBaseUrl: string,
    nextLink: string,
    options?: KeyVaultClientGetKeysNextOptionalParams
  ): Promise<KeyVaultClientGetKeysNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, nextLink, options: operationOptions },
      getKeysNextOperationSpec
    ) as Promise<KeyVaultClientGetKeysNextResponse>;
  }

  /**
   * GetDeletedKeysNext
   * @param vaultBaseUrl The vault name, for example https://myvault.vault.azure.net.
   * @param nextLink The nextLink from the previous successful call to the GetDeletedKeys method.
   * @param options The options parameters.
   */
  getDeletedKeysNext(
    vaultBaseUrl: string,
    nextLink: string,
    options?: KeyVaultClientGetDeletedKeysNextOptionalParams
  ): Promise<KeyVaultClientGetDeletedKeysNextResponse> {
    const operationOptions: coreHttp.RequestOptionsBase = coreHttp.operationOptionsToRequestOptionsBase(
      options || {}
    );
    return this.sendOperationRequest(
      { vaultBaseUrl, nextLink, options: operationOptions },
      getDeletedKeysNextOperationSpec
    ) as Promise<KeyVaultClientGetDeletedKeysNextResponse>;
  }
}
// Operation Specifications

const serializer = new coreHttp.Serializer(Mappers, /* isXml */ false);

const createKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/create",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const importKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}",
  httpMethod: "PUT",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters1,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const deleteKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}",
  httpMethod: "DELETE",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedKeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const updateKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}",
  httpMethod: "PATCH",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters2,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  serializer
};
const getKeyVersionsOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/versions",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.KeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const getKeysOperationSpec: coreHttp.OperationSpec = {
  path: "/keys",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.KeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [Parameters.vaultBaseUrl],
  serializer
};
const backupKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/backup",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.BackupKeyResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const restoreKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/restore",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters3,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const encryptOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/encrypt",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyOperationResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const decryptOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/decrypt",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyOperationResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const signOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/sign",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyOperationResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters5,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const verifyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/verify",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyVerifyResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters6,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const wrapKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/wrapkey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyOperationResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const unwrapKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/unwrapkey",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyOperationResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters4,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const exportKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/keys/{key-name}/{key-version}/export",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  requestBody: Parameters.parameters7,
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.keyVersion
  ],
  headerParameters: [Parameters.contentType],
  mediaType: "json",
  serializer
};
const getDeletedKeysOperationSpec: coreHttp.OperationSpec = {
  path: "/deletedkeys",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedKeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [Parameters.vaultBaseUrl],
  serializer
};
const getDeletedKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/deletedkeys/{key-name}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedKeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const purgeDeletedKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/deletedkeys/{key-name}",
  httpMethod: "DELETE",
  responses: {
    204: {},
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const recoverDeletedKeyOperationSpec: coreHttp.OperationSpec = {
  path: "/deletedkeys/{key-name}/recover",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.KeyBundle
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.keyName1],
  serializer
};
const getKeyVersionsNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.KeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [
    Parameters.vaultBaseUrl,
    Parameters.keyName1,
    Parameters.nextLink
  ],
  serializer
};
const getKeysNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.KeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.nextLink],
  serializer
};
const getDeletedKeysNextOperationSpec: coreHttp.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedKeyListResult
    },
    default: {
      bodyMapper: Mappers.KeyVaultError
    }
  },
  queryParameters: [Parameters.apiVersion, Parameters.maxresults],
  urlParameters: [Parameters.vaultBaseUrl, Parameters.nextLink],
  serializer
};

// Operation Specifications

export {
  KeyVaultClient,
  KeyVaultClientContext,
  Models as KeyVaultModels,
  Mappers as KeyVaultMappers
};
