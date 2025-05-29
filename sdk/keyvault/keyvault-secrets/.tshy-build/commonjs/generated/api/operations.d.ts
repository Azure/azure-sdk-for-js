import { BackupSecretOptionalParams, KeyVaultContext as Client, DeleteSecretOptionalParams, GetDeletedSecretOptionalParams, GetDeletedSecretsOptionalParams, GetSecretOptionalParams, GetSecretsOptionalParams, GetSecretVersionsOptionalParams, PurgeDeletedSecretOptionalParams, RecoverDeletedSecretOptionalParams, RestoreSecretOptionalParams, SetSecretOptionalParams, UpdateSecretOptionalParams } from "./index.js";
import { SecretSetParameters, SecretBundle, DeletedSecretBundle, SecretUpdateParameters, _SecretListResult, SecretItem, _DeletedSecretListResult, DeletedSecretItem, BackupSecretResult, SecretRestoreParameters } from "../models/models.js";
import { PagedAsyncIterableIterator } from "../static-helpers/pagingHelpers.js";
import { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
export declare function _restoreSecretSend(context: Client, parameters: SecretRestoreParameters, options?: RestoreSecretOptionalParams): StreamableMethod;
export declare function _restoreSecretDeserialize(result: PathUncheckedResponse): Promise<SecretBundle>;
/** Restores a backed up secret, and all its versions, to a vault. This operation requires the secrets/restore permission. */
export declare function restoreSecret(context: Client, parameters: SecretRestoreParameters, options?: RestoreSecretOptionalParams): Promise<SecretBundle>;
export declare function _backupSecretSend(context: Client, secretName: string, options?: BackupSecretOptionalParams): StreamableMethod;
export declare function _backupSecretDeserialize(result: PathUncheckedResponse): Promise<BackupSecretResult>;
/** Requests that a backup of the specified secret be downloaded to the client. All versions of the secret will be downloaded. This operation requires the secrets/backup permission. */
export declare function backupSecret(context: Client, secretName: string, options?: BackupSecretOptionalParams): Promise<BackupSecretResult>;
export declare function _recoverDeletedSecretSend(context: Client, secretName: string, options?: RecoverDeletedSecretOptionalParams): StreamableMethod;
export declare function _recoverDeletedSecretDeserialize(result: PathUncheckedResponse): Promise<SecretBundle>;
/** Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission. */
export declare function recoverDeletedSecret(context: Client, secretName: string, options?: RecoverDeletedSecretOptionalParams): Promise<SecretBundle>;
export declare function _purgeDeletedSecretSend(context: Client, secretName: string, options?: PurgeDeletedSecretOptionalParams): StreamableMethod;
export declare function _purgeDeletedSecretDeserialize(result: PathUncheckedResponse): Promise<void>;
/** The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission. */
export declare function purgeDeletedSecret(context: Client, secretName: string, options?: PurgeDeletedSecretOptionalParams): Promise<void>;
export declare function _getDeletedSecretSend(context: Client, secretName: string, options?: GetDeletedSecretOptionalParams): StreamableMethod;
export declare function _getDeletedSecretDeserialize(result: PathUncheckedResponse): Promise<DeletedSecretBundle>;
/** The Get Deleted Secret operation returns the specified deleted secret along with its attributes. This operation requires the secrets/get permission. */
export declare function getDeletedSecret(context: Client, secretName: string, options?: GetDeletedSecretOptionalParams): Promise<DeletedSecretBundle>;
export declare function _getDeletedSecretsSend(context: Client, options?: GetDeletedSecretsOptionalParams): StreamableMethod;
export declare function _getDeletedSecretsDeserialize(result: PathUncheckedResponse): Promise<_DeletedSecretListResult>;
/** The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled for soft-delete. This operation requires the secrets/list permission. */
export declare function getDeletedSecrets(context: Client, options?: GetDeletedSecretsOptionalParams): PagedAsyncIterableIterator<DeletedSecretItem>;
export declare function _getSecretVersionsSend(context: Client, secretName: string, options?: GetSecretVersionsOptionalParams): StreamableMethod;
export declare function _getSecretVersionsDeserialize(result: PathUncheckedResponse): Promise<_SecretListResult>;
/** The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission. */
export declare function getSecretVersions(context: Client, secretName: string, options?: GetSecretVersionsOptionalParams): PagedAsyncIterableIterator<SecretItem>;
export declare function _getSecretsSend(context: Client, options?: GetSecretsOptionalParams): StreamableMethod;
export declare function _getSecretsDeserialize(result: PathUncheckedResponse): Promise<_SecretListResult>;
/** The Get Secrets operation is applicable to the entire vault. However, only the base secret identifier and its attributes are provided in the response. Individual secret versions are not listed in the response. This operation requires the secrets/list permission. */
export declare function getSecrets(context: Client, options?: GetSecretsOptionalParams): PagedAsyncIterableIterator<SecretItem>;
export declare function _getSecretSend(context: Client, secretName: string, secretVersion: string, options?: GetSecretOptionalParams): StreamableMethod;
export declare function _getSecretDeserialize(result: PathUncheckedResponse): Promise<SecretBundle>;
/** The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires the secrets/get permission. */
export declare function getSecret(context: Client, secretName: string, secretVersion: string, options?: GetSecretOptionalParams): Promise<SecretBundle>;
export declare function _updateSecretSend(context: Client, secretName: string, secretVersion: string, parameters: SecretUpdateParameters, options?: UpdateSecretOptionalParams): StreamableMethod;
export declare function _updateSecretDeserialize(result: PathUncheckedResponse): Promise<SecretBundle>;
/** The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission. */
export declare function updateSecret(context: Client, secretName: string, secretVersion: string, parameters: SecretUpdateParameters, options?: UpdateSecretOptionalParams): Promise<SecretBundle>;
export declare function _deleteSecretSend(context: Client, secretName: string, options?: DeleteSecretOptionalParams): StreamableMethod;
export declare function _deleteSecretDeserialize(result: PathUncheckedResponse): Promise<DeletedSecretBundle>;
/** The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied to an individual version of a secret. This operation requires the secrets/delete permission. */
export declare function deleteSecret(context: Client, secretName: string, options?: DeleteSecretOptionalParams): Promise<DeletedSecretBundle>;
export declare function _setSecretSend(context: Client, secretName: string, parameters: SecretSetParameters, options?: SetSecretOptionalParams): StreamableMethod;
export declare function _setSecretDeserialize(result: PathUncheckedResponse): Promise<SecretBundle>;
/** The SET operation adds a secret to the Azure Key Vault. If the named secret already exists, Azure Key Vault creates a new version of that secret. This operation requires the secrets/set permission. */
export declare function setSecret(context: Client, secretName: string, parameters: SecretSetParameters, options?: SetSecretOptionalParams): Promise<SecretBundle>;
//# sourceMappingURL=operations.d.ts.map