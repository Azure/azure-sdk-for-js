// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BackupKeyOptionalParams,
  KeyVaultContext as Client,
  CreateKeyOptionalParams,
  DecryptOptionalParams,
  DeleteKeyOptionalParams,
  EncryptOptionalParams,
  GetDeletedKeyOptionalParams,
  GetDeletedKeysOptionalParams,
  GetKeyOptionalParams,
  GetKeyRotationPolicyOptionalParams,
  GetKeysOptionalParams,
  GetKeyVersionsOptionalParams,
  GetRandomBytesOptionalParams,
  ImportKeyOptionalParams,
  PurgeDeletedKeyOptionalParams,
  RecoverDeletedKeyOptionalParams,
  ReleaseOptionalParams,
  RestoreKeyOptionalParams,
  RotateKeyOptionalParams,
  SignOptionalParams,
  UnwrapKeyOptionalParams,
  UpdateKeyOptionalParams,
  UpdateKeyRotationPolicyOptionalParams,
  VerifyOptionalParams,
  WrapKeyOptionalParams,
} from "./index.js";
import {
  KeyCreateParameters,
  keyCreateParametersSerializer,
  KeyBundle,
  keyBundleDeserializer,
  KeyImportParameters,
  keyImportParametersSerializer,
  DeletedKeyBundle,
  deletedKeyBundleDeserializer,
  KeyUpdateParameters,
  keyUpdateParametersSerializer,
  _KeyListResult,
  _keyListResultDeserializer,
  KeyItem,
  BackupKeyResult,
  backupKeyResultDeserializer,
  KeyRestoreParameters,
  keyRestoreParametersSerializer,
  KeyOperationsParameters,
  keyOperationsParametersSerializer,
  KeyOperationResult,
  keyOperationResultDeserializer,
  KeySignParameters,
  keySignParametersSerializer,
  KeyVerifyParameters,
  keyVerifyParametersSerializer,
  KeyVerifyResult,
  keyVerifyResultDeserializer,
  KeyReleaseParameters,
  keyReleaseParametersSerializer,
  KeyReleaseResult,
  keyReleaseResultDeserializer,
  _DeletedKeyListResult,
  _deletedKeyListResultDeserializer,
  DeletedKeyItem,
  KeyRotationPolicy,
  keyRotationPolicySerializer,
  keyRotationPolicyDeserializer,
  GetRandomBytesRequest,
  getRandomBytesRequestSerializer,
  RandomBytes,
  randomBytesDeserializer,
} from "../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _createKeySend(
  context: Client,
  keyName: string,
  parameters: KeyCreateParameters,
  options: CreateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/create", keyName)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyCreateParametersSerializer(parameters),
    });
}

export async function _createKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** The create key operation can be used to create any key type in Azure Key Vault. If the named key already exists, Azure Key Vault creates a new version of the key. It requires the keys/create permission. */
export async function createKey(
  context: Client,
  keyName: string,
  parameters: KeyCreateParameters,
  options: CreateKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _createKeySend(context, keyName, parameters, options);
  return _createKeyDeserialize(result);
}

export function _rotateKeySend(
  context: Client,
  keyName: string,
  options: RotateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/rotate", keyName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _rotateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** The operation will rotate the key based on the key policy. It requires the keys/rotate permission. */
export async function rotateKey(
  context: Client,
  keyName: string,
  options: RotateKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _rotateKeySend(context, keyName, options);
  return _rotateKeyDeserialize(result);
}

export function _importKeySend(
  context: Client,
  keyName: string,
  parameters: KeyImportParameters,
  options: ImportKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}", keyName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: keyImportParametersSerializer(parameters),
    });
}

export async function _importKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** The import key operation may be used to import any key type into an Azure Key Vault. If the named key already exists, Azure Key Vault creates a new version of the key. This operation requires the keys/import permission. */
export async function importKey(
  context: Client,
  keyName: string,
  parameters: KeyImportParameters,
  options: ImportKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _importKeySend(context, keyName, parameters, options);
  return _importKeyDeserialize(result);
}

export function _deleteKeySend(
  context: Client,
  keyName: string,
  options: DeleteKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}", keyName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedKeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deletedKeyBundleDeserializer(result.body);
}

/** The delete key operation cannot be used to remove individual versions of a key. This operation removes the cryptographic material associated with the key, which means the key is not usable for Sign/Verify, Wrap/Unwrap or Encrypt/Decrypt operations. This operation requires the keys/delete permission. */
export async function deleteKey(
  context: Client,
  keyName: string,
  options: DeleteKeyOptionalParams = { requestOptions: {} },
): Promise<DeletedKeyBundle> {
  const result = await _deleteKeySend(context, keyName, options);
  return _deleteKeyDeserialize(result);
}

export function _updateKeySend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyUpdateParameters,
  options: UpdateKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}", keyName, keyVersion)
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: keyUpdateParametersSerializer(parameters),
    });
}

export async function _updateKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** In order to perform this operation, the key must already exist in the Key Vault. Note: The cryptographic material of a key itself cannot be changed. This operation requires the keys/update permission. */
export async function updateKey(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyUpdateParameters,
  options: UpdateKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _updateKeySend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _updateKeyDeserialize(result);
}

export function _getKeySend(
  context: Client,
  keyName: string,
  keyVersion: string,
  options: GetKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}", keyName, keyVersion)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** The get key operation is applicable to all key types. If the requested key is symmetric, then no key material is released in the response. This operation requires the keys/get permission. */
export async function getKey(
  context: Client,
  keyName: string,
  keyVersion: string,
  options: GetKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _getKeySend(context, keyName, keyVersion, options);
  return _getKeyDeserialize(result);
}

export function _getKeyVersionsSend(
  context: Client,
  keyName: string,
  options: GetKeyVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/versions", keyName)
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getKeyVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_KeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _keyListResultDeserializer(result.body);
}

/** The full key identifier, attributes, and tags are provided in the response. This operation requires the keys/list permission. */
export function getKeyVersions(
  context: Client,
  keyName: string,
  options: GetKeyVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KeyItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getKeyVersionsSend(context, keyName, options),
    _getKeyVersionsDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getKeysSend(
  context: Client,
  options: GetKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_KeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _keyListResultDeserializer(result.body);
}

/** Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public part of a stored key. The LIST operation is applicable to all key types, however only the base key identifier, attributes, and tags are provided in the response. Individual versions of a key are not listed in the response. This operation requires the keys/list permission. */
export function getKeys(
  context: Client,
  options: GetKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<KeyItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getKeysSend(context, options),
    _getKeysDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _backupKeySend(
  context: Client,
  keyName: string,
  options: BackupKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/backup", keyName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _backupKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<BackupKeyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return backupKeyResultDeserializer(result.body);
}

/** The Key Backup operation exports a key from Azure Key Vault in a protected form. Note that this operation does NOT return key material in a form that can be used outside the Azure Key Vault system, the returned key material is either protected to a Azure Key Vault HSM or to Azure Key Vault itself. The intent of this operation is to allow a client to GENERATE a key in one Azure Key Vault instance, BACKUP the key, and then RESTORE it into another Azure Key Vault instance. The BACKUP operation may be used to export, in protected form, any key type from Azure Key Vault. Individual versions of a key cannot be backed up. BACKUP / RESTORE can be performed within geographical boundaries only; meaning that a BACKUP from one geographical area cannot be restored to another geographical area. For example, a backup from the US geographical area cannot be restored in an EU geographical area. This operation requires the key/backup permission. */
export async function backupKey(
  context: Client,
  keyName: string,
  options: BackupKeyOptionalParams = { requestOptions: {} },
): Promise<BackupKeyResult> {
  const result = await _backupKeySend(context, keyName, options);
  return _backupKeyDeserialize(result);
}

export function _restoreKeySend(
  context: Client,
  parameters: KeyRestoreParameters,
  options: RestoreKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/restore")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyRestoreParametersSerializer(parameters),
    });
}

export async function _restoreKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** Imports a previously backed up key into Azure Key Vault, restoring the key, its key identifier, attributes and access control policies. The RESTORE operation may be used to import a previously backed up key. Individual versions of a key cannot be restored. The key is restored in its entirety with the same key name as it had when it was backed up. If the key name is not available in the target Key Vault, the RESTORE operation will be rejected. While the key name is retained during restore, the final key identifier will change if the key is restored to a different vault. Restore will restore all versions and preserve version identifiers. The RESTORE operation is subject to security constraints: The target Key Vault must be owned by the same Microsoft Azure Subscription as the source Key Vault The user must have RESTORE permission in the target Key Vault. This operation requires the keys/restore permission. */
export async function restoreKey(
  context: Client,
  parameters: KeyRestoreParameters,
  options: RestoreKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _restoreKeySend(context, parameters, options);
  return _restoreKeyDeserialize(result);
}

export function _encryptSend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: EncryptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/encrypt", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyOperationsParametersSerializer(parameters),
    });
}

export async function _encryptDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyOperationResultDeserializer(result.body);
}

/** The ENCRYPT operation encrypts an arbitrary sequence of bytes using an encryption key that is stored in Azure Key Vault. Note that the ENCRYPT operation only supports a single block of data, the size of which is dependent on the target key and the encryption algorithm to be used. The ENCRYPT operation is only strictly necessary for symmetric keys stored in Azure Key Vault since protection with an asymmetric key can be performed using public portion of the key. This operation is supported for asymmetric keys as a convenience for callers that have a key-reference but do not have access to the public key material. This operation requires the keys/encrypt permission. */
export async function encrypt(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: EncryptOptionalParams = { requestOptions: {} },
): Promise<KeyOperationResult> {
  const result = await _encryptSend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _encryptDeserialize(result);
}

export function _decryptSend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: DecryptOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/decrypt", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyOperationsParametersSerializer(parameters),
    });
}

export async function _decryptDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyOperationResultDeserializer(result.body);
}

/** The DECRYPT operation decrypts a well-formed block of ciphertext using the target encryption key and specified algorithm. This operation is the reverse of the ENCRYPT operation; only a single block of data may be decrypted, the size of this block is dependent on the target key and the algorithm to be used. The DECRYPT operation applies to asymmetric and symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This operation requires the keys/decrypt permission. Microsoft recommends not to use CBC algorithms for decryption without first ensuring the integrity of the ciphertext using an HMAC, for example. See https://docs.microsoft.com/dotnet/standard/security/vulnerabilities-cbc-mode for more information. */
export async function decrypt(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: DecryptOptionalParams = { requestOptions: {} },
): Promise<KeyOperationResult> {
  const result = await _decryptSend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _decryptDeserialize(result);
}

export function _signSend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeySignParameters,
  options: SignOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/sign", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keySignParametersSerializer(parameters),
    });
}

export async function _signDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyOperationResultDeserializer(result.body);
}

/** The SIGN operation is applicable to asymmetric and symmetric keys stored in Azure Key Vault since this operation uses the private portion of the key. This operation requires the keys/sign permission. */
export async function sign(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeySignParameters,
  options: SignOptionalParams = { requestOptions: {} },
): Promise<KeyOperationResult> {
  const result = await _signSend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _signDeserialize(result);
}

export function _verifySend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyVerifyParameters,
  options: VerifyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/verify", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyVerifyParametersSerializer(parameters),
    });
}

export async function _verifyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyVerifyResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyVerifyResultDeserializer(result.body);
}

/** The VERIFY operation is applicable to symmetric keys stored in Azure Key Vault. VERIFY is not strictly necessary for asymmetric keys stored in Azure Key Vault since signature verification can be performed using the public portion of the key but this operation is supported as a convenience for callers that only have a key-reference and not the public portion of the key. This operation requires the keys/verify permission. */
export async function verify(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyVerifyParameters,
  options: VerifyOptionalParams = { requestOptions: {} },
): Promise<KeyVerifyResult> {
  const result = await _verifySend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _verifyDeserialize(result);
}

export function _wrapKeySend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: WrapKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/wrapkey", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyOperationsParametersSerializer(parameters),
    });
}

export async function _wrapKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyOperationResultDeserializer(result.body);
}

/** The WRAP operation supports encryption of a symmetric key using a key encryption key that has previously been stored in an Azure Key Vault. The WRAP operation is only strictly necessary for symmetric keys stored in Azure Key Vault since protection with an asymmetric key can be performed using the public portion of the key. This operation is supported for asymmetric keys as a convenience for callers that have a key-reference but do not have access to the public key material. This operation requires the keys/wrapKey permission. */
export async function wrapKey(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: WrapKeyOptionalParams = { requestOptions: {} },
): Promise<KeyOperationResult> {
  const result = await _wrapKeySend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _wrapKeyDeserialize(result);
}

export function _unwrapKeySend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: UnwrapKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/unwrapkey", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyOperationsParametersSerializer(parameters),
    });
}

export async function _unwrapKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyOperationResultDeserializer(result.body);
}

/** The UNWRAP operation supports decryption of a symmetric key using the target key encryption key. This operation is the reverse of the WRAP operation. The UNWRAP operation applies to asymmetric and symmetric keys stored in Azure Key Vault since it uses the private portion of the key. This operation requires the keys/unwrapKey permission. */
export async function unwrapKey(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyOperationsParameters,
  options: UnwrapKeyOptionalParams = { requestOptions: {} },
): Promise<KeyOperationResult> {
  const result = await _unwrapKeySend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _unwrapKeyDeserialize(result);
}

export function _releaseSend(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyReleaseParameters,
  options: ReleaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/{key-version}/release", keyName, keyVersion)
    .post({
      ...operationOptionsToRequestParameters(options),
      body: keyReleaseParametersSerializer(parameters),
    });
}

export async function _releaseDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyReleaseResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyReleaseResultDeserializer(result.body);
}

/** The release key operation is applicable to all key types. The target key must be marked exportable. This operation requires the keys/release permission. */
export async function release(
  context: Client,
  keyName: string,
  keyVersion: string,
  parameters: KeyReleaseParameters,
  options: ReleaseOptionalParams = { requestOptions: {} },
): Promise<KeyReleaseResult> {
  const result = await _releaseSend(
    context,
    keyName,
    keyVersion,
    parameters,
    options,
  );
  return _releaseDeserialize(result);
}

export function _getDeletedKeysSend(
  context: Client,
  options: GetDeletedKeysOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedkeys")
    .get({
      ...operationOptionsToRequestParameters(options),
      queryParameters: { maxresults: options?.maxresults },
    });
}

export async function _getDeletedKeysDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeletedKeyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deletedKeyListResultDeserializer(result.body);
}

/** Retrieves a list of the keys in the Key Vault as JSON Web Key structures that contain the public part of a deleted key. This operation includes deletion-specific information. The Get Deleted Keys operation is applicable for vaults enabled for soft-delete. While the operation can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault. This operation requires the keys/list permission. */
export function getDeletedKeys(
  context: Client,
  options: GetDeletedKeysOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DeletedKeyItem> {
  return buildPagedAsyncIterator(
    context,
    () => _getDeletedKeysSend(context, options),
    _getDeletedKeysDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getDeletedKeySend(
  context: Client,
  keyName: string,
  options: GetDeletedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedkeys/{key-name}", keyName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getDeletedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<DeletedKeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deletedKeyBundleDeserializer(result.body);
}

/** The Get Deleted Key operation is applicable for soft-delete enabled vaults. While the operation can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault. This operation requires the keys/get permission. */
export async function getDeletedKey(
  context: Client,
  keyName: string,
  options: GetDeletedKeyOptionalParams = { requestOptions: {} },
): Promise<DeletedKeyBundle> {
  const result = await _getDeletedKeySend(context, keyName, options);
  return _getDeletedKeyDeserialize(result);
}

export function _purgeDeletedKeySend(
  context: Client,
  keyName: string,
  options: PurgeDeletedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedkeys/{key-name}", keyName)
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _purgeDeletedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["204"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** The Purge Deleted Key operation is applicable for soft-delete enabled vaults. While the operation can be invoked on any vault, it will return an error if invoked on a non soft-delete enabled vault. This operation requires the keys/purge permission. */
export async function purgeDeletedKey(
  context: Client,
  keyName: string,
  options: PurgeDeletedKeyOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _purgeDeletedKeySend(context, keyName, options);
  return _purgeDeletedKeyDeserialize(result);
}

export function _recoverDeletedKeySend(
  context: Client,
  keyName: string,
  options: RecoverDeletedKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/deletedkeys/{key-name}/recover", keyName)
    .post({ ...operationOptionsToRequestParameters(options) });
}

export async function _recoverDeletedKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyBundle> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyBundleDeserializer(result.body);
}

/** The Recover Deleted Key operation is applicable for deleted keys in soft-delete enabled vaults. It recovers the deleted key back to its latest version under /keys. An attempt to recover an non-deleted key will return an error. Consider this the inverse of the delete operation on soft-delete enabled vaults. This operation requires the keys/recover permission. */
export async function recoverDeletedKey(
  context: Client,
  keyName: string,
  options: RecoverDeletedKeyOptionalParams = { requestOptions: {} },
): Promise<KeyBundle> {
  const result = await _recoverDeletedKeySend(context, keyName, options);
  return _recoverDeletedKeyDeserialize(result);
}

export function _getKeyRotationPolicySend(
  context: Client,
  keyName: string,
  options: GetKeyRotationPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/rotationpolicy", keyName)
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _getKeyRotationPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyRotationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyRotationPolicyDeserializer(result.body);
}

/** The GetKeyRotationPolicy operation returns the specified key policy resources in the specified key vault. This operation requires the keys/get permission. */
export async function getKeyRotationPolicy(
  context: Client,
  keyName: string,
  options: GetKeyRotationPolicyOptionalParams = { requestOptions: {} },
): Promise<KeyRotationPolicy> {
  const result = await _getKeyRotationPolicySend(context, keyName, options);
  return _getKeyRotationPolicyDeserialize(result);
}

export function _updateKeyRotationPolicySend(
  context: Client,
  keyName: string,
  keyRotationPolicy: KeyRotationPolicy,
  options: UpdateKeyRotationPolicyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/keys/{key-name}/rotationpolicy", keyName)
    .put({
      ...operationOptionsToRequestParameters(options),
      body: keyRotationPolicySerializer(keyRotationPolicy),
    });
}

export async function _updateKeyRotationPolicyDeserialize(
  result: PathUncheckedResponse,
): Promise<KeyRotationPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return keyRotationPolicyDeserializer(result.body);
}

/** Set specified members in the key policy. Leave others as undefined. This operation requires the keys/update permission. */
export async function updateKeyRotationPolicy(
  context: Client,
  keyName: string,
  keyRotationPolicy: KeyRotationPolicy,
  options: UpdateKeyRotationPolicyOptionalParams = { requestOptions: {} },
): Promise<KeyRotationPolicy> {
  const result = await _updateKeyRotationPolicySend(
    context,
    keyName,
    keyRotationPolicy,
    options,
  );
  return _updateKeyRotationPolicyDeserialize(result);
}

export function _getRandomBytesSend(
  context: Client,
  parameters: GetRandomBytesRequest,
  options: GetRandomBytesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path("/rng")
    .post({
      ...operationOptionsToRequestParameters(options),
      body: getRandomBytesRequestSerializer(parameters),
    });
}

export async function _getRandomBytesDeserialize(
  result: PathUncheckedResponse,
): Promise<RandomBytes> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return randomBytesDeserializer(result.body);
}

/** Get the requested number of bytes containing random values from a managed HSM. */
export async function getRandomBytes(
  context: Client,
  parameters: GetRandomBytesRequest,
  options: GetRandomBytesOptionalParams = { requestOptions: {} },
): Promise<RandomBytes> {
  const result = await _getRandomBytesSend(context, parameters, options);
  return _getRandomBytesDeserialize(result);
}
