// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  createKeyVault,
  KeyVaultContext,
  KeyVaultClientOptionalParams,
  setSecret,
  deleteSecret,
  updateSecret,
  getSecret,
  getSecrets,
  getSecretVersions,
  getDeletedSecrets,
  getDeletedSecret,
  purgeDeletedSecret,
  recoverDeletedSecret,
  backupSecret,
  restoreSecret,
  SetSecretOptionalParams,
  DeleteSecretOptionalParams,
  UpdateSecretOptionalParams,
  GetSecretOptionalParams,
  GetSecretsOptionalParams,
  GetSecretVersionsOptionalParams,
  GetDeletedSecretsOptionalParams,
  GetDeletedSecretOptionalParams,
  PurgeDeletedSecretOptionalParams,
  RecoverDeletedSecretOptionalParams,
  BackupSecretOptionalParams,
  RestoreSecretOptionalParams,
} from "./api/index.js";
import {
  SecretSetParameters,
  SecretBundle,
  DeletedSecretBundle,
  SecretUpdateParameters,
  SecretItem,
  DeletedSecretItem,
  BackupSecretResult,
  SecretRestoreParameters,
} from "./models/models.js";
import { PagedAsyncIterableIterator } from "./static-helpers/pagingHelpers.js";
import { Pipeline } from "@azure/core-rest-pipeline";
import { TokenCredential } from "@azure/core-auth";

export { KeyVaultClientOptionalParams } from "./api/keyVaultContext.js";

export class KeyVaultClient {
  private _client: KeyVaultContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  /** The key vault client performs cryptographic key operations and vault operations against the Key Vault service. */
  constructor(
    vaultBaseUrl: string,
    credential: TokenCredential,
    options: KeyVaultClientOptionalParams = {},
  ) {
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createKeyVault(vaultBaseUrl, credential, {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
    this.pipeline = this._client.pipeline;
  }

  /** The SET operation adds a secret to the Azure Key Vault. If the named secret already exists, Azure Key Vault creates a new version of that secret. This operation requires the secrets/set permission. */
  setSecret(
    secretName: string,
    parameters: SecretSetParameters,
    options: SetSecretOptionalParams = { requestOptions: {} },
  ): Promise<SecretBundle> {
    return setSecret(this._client, secretName, parameters, options);
  }

  /** The DELETE operation applies to any secret stored in Azure Key Vault. DELETE cannot be applied to an individual version of a secret. This operation requires the secrets/delete permission. */
  deleteSecret(
    secretName: string,
    options: DeleteSecretOptionalParams = { requestOptions: {} },
  ): Promise<DeletedSecretBundle> {
    return deleteSecret(this._client, secretName, options);
  }

  /** The UPDATE operation changes specified attributes of an existing stored secret. Attributes that are not specified in the request are left unchanged. The value of a secret itself cannot be changed. This operation requires the secrets/set permission. */
  updateSecret(
    secretName: string,
    secretVersion: string,
    parameters: SecretUpdateParameters,
    options: UpdateSecretOptionalParams = { requestOptions: {} },
  ): Promise<SecretBundle> {
    return updateSecret(
      this._client,
      secretName,
      secretVersion,
      parameters,
      options,
    );
  }

  /** The GET operation is applicable to any secret stored in Azure Key Vault. This operation requires the secrets/get permission. */
  getSecret(
    secretName: string,
    secretVersion: string,
    options: GetSecretOptionalParams = { requestOptions: {} },
  ): Promise<SecretBundle> {
    return getSecret(this._client, secretName, secretVersion, options);
  }

  /** The Get Secrets operation is applicable to the entire vault. However, only the base secret identifier and its attributes are provided in the response. Individual secret versions are not listed in the response. This operation requires the secrets/list permission. */
  getSecrets(
    options: GetSecretsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SecretItem> {
    return getSecrets(this._client, options);
  }

  /** The full secret identifier and attributes are provided in the response. No values are returned for the secrets. This operations requires the secrets/list permission. */
  getSecretVersions(
    secretName: string,
    options: GetSecretVersionsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<SecretItem> {
    return getSecretVersions(this._client, secretName, options);
  }

  /** The Get Deleted Secrets operation returns the secrets that have been deleted for a vault enabled for soft-delete. This operation requires the secrets/list permission. */
  getDeletedSecrets(
    options: GetDeletedSecretsOptionalParams = { requestOptions: {} },
  ): PagedAsyncIterableIterator<DeletedSecretItem> {
    return getDeletedSecrets(this._client, options);
  }

  /** The Get Deleted Secret operation returns the specified deleted secret along with its attributes. This operation requires the secrets/get permission. */
  getDeletedSecret(
    secretName: string,
    options: GetDeletedSecretOptionalParams = { requestOptions: {} },
  ): Promise<DeletedSecretBundle> {
    return getDeletedSecret(this._client, secretName, options);
  }

  /** The purge deleted secret operation removes the secret permanently, without the possibility of recovery. This operation can only be enabled on a soft-delete enabled vault. This operation requires the secrets/purge permission. */
  purgeDeletedSecret(
    secretName: string,
    options: PurgeDeletedSecretOptionalParams = { requestOptions: {} },
  ): Promise<void> {
    return purgeDeletedSecret(this._client, secretName, options);
  }

  /** Recovers the deleted secret in the specified vault. This operation can only be performed on a soft-delete enabled vault. This operation requires the secrets/recover permission. */
  recoverDeletedSecret(
    secretName: string,
    options: RecoverDeletedSecretOptionalParams = { requestOptions: {} },
  ): Promise<SecretBundle> {
    return recoverDeletedSecret(this._client, secretName, options);
  }

  /** Requests that a backup of the specified secret be downloaded to the client. All versions of the secret will be downloaded. This operation requires the secrets/backup permission. */
  backupSecret(
    secretName: string,
    options: BackupSecretOptionalParams = { requestOptions: {} },
  ): Promise<BackupSecretResult> {
    return backupSecret(this._client, secretName, options);
  }

  /** Restores a backed up secret, and all its versions, to a vault. This operation requires the secrets/restore permission. */
  restoreSecret(
    parameters: SecretRestoreParameters,
    options: RestoreSecretOptionalParams = { requestOptions: {} },
  ): Promise<SecretBundle> {
    return restoreSecret(this._client, parameters, options);
  }
}
