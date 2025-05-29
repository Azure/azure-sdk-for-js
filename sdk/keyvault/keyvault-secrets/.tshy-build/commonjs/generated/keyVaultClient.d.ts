import { KeyVaultClientOptionalParams, RestoreSecretOptionalParams, BackupSecretOptionalParams, RecoverDeletedSecretOptionalParams, PurgeDeletedSecretOptionalParams, GetDeletedSecretOptionalParams, GetDeletedSecretsOptionalParams, GetSecretVersionsOptionalParams, GetSecretsOptionalParams, GetSecretOptionalParams, UpdateSecretOptionalParams, DeleteSecretOptionalParams, SetSecretOptionalParams } from "./api/index.js";
import { SecretSetParameters, SecretBundle, DeletedSecretBundle, SecretUpdateParameters, SecretItem, DeletedSecretItem, BackupSecretResult, SecretRestoreParameters } from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";
export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";
export declare class KeyVaultClient {
    private _client;
    /** The pipeline used by this client to make requests */
    readonly pipeline: Pipeline;
    /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
    constructor(endpointParam: string, credential: TokenCredential, options?: KeyVaultClientOptionalParams);
    /** Restores a backed up secret, and all its versions, to a vault. This operation requires the secrets/restore permission. */
    restoreSecret(parameters: SecretRestoreParameters, options?: RestoreSecretOptionalParams): Promise<SecretBundle>;
    /** Requests that a backup of the specified secret be downloaded to the client. All versions of the secret will be downloaded. This operation requires the secrets/backup permission. */
    backupSecret(secretName: string, options?: BackupSecretOptionalParams): Promise<BackupSecretResult>;
    /** Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission. */
    recoverDeletedSecret(secretName: string, options?: RecoverDeletedSecretOptionalParams): Promise<SecretBundle>;
    /** The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission. */
    purgeDeletedSecret(secretName: string, options?: PurgeDeletedSecretOptionalParams): Promise<void>;
    /** The Get Deleted Secret operation returns the specified deleted secret along with its attributes. This operation requires the secrets/get permission. */
    getDeletedSecret(secretName: string, options?: GetDeletedSecretOptionalParams): Promise<DeletedSecretBundle>;
    /** The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled for soft-delete. This operation requires the secrets/list permission. */
    getDeletedSecrets(options?: GetDeletedSecretsOptionalParams): PagedAsyncIterableIterator<DeletedSecretItem>;
    /** The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission. */
    getSecretVersions(secretName: string, options?: GetSecretVersionsOptionalParams): PagedAsyncIterableIterator<SecretItem>;
    /** The Get Secrets operation is applicable to the entire vault. However, only the base secret identifier and its attributes are provided in the response. Individual secret versions are not listed in the response. This operation requires the secrets/list permission. */
    getSecrets(options?: GetSecretsOptionalParams): PagedAsyncIterableIterator<SecretItem>;
    /** The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires the secrets/get permission. */
    getSecret(secretName: string, secretVersion: string, options?: GetSecretOptionalParams): Promise<SecretBundle>;
    /** The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission. */
    updateSecret(secretName: string, secretVersion: string, parameters: SecretUpdateParameters, options?: UpdateSecretOptionalParams): Promise<SecretBundle>;
    /** The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied to an individual version of a secret. This operation requires the secrets/delete permission. */
    deleteSecret(secretName: string, options?: DeleteSecretOptionalParams): Promise<DeletedSecretBundle>;
    /** The SET operation adds a secret to the Azure Key Vault. If the named secret already exists, Azure Key Vault creates a new version of that secret. This operation requires the secrets/set permission. */
    setSecret(secretName: string, parameters: SecretSetParameters, options?: SetSecretOptionalParams): Promise<SecretBundle>;
}
//# sourceMappingURL=keyVaultClient.d.ts.map