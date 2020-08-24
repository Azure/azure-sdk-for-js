// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { DeletionRecoveryLevel } from "./generated/models";

/**
 * @internal
 * @ignore
 * An interface representing the SecretClient. For internal use.
 */
export interface SecretClientInterface {
  /**
   * Recovers the deleted secret in the specified vault.
   */
  recoverDeletedSecret(
    secretName: string,
    options?: RecoverDeletedSecretOptions
  ): Promise<SecretProperties>;
  /**
   * The getSecret method is applicable to any secret stored in Azure Key Vault. This operation requires
   * the secrets/get permission.
   */
  getSecret(secretName: string, options?: GetSecretOptions): Promise<KeyVaultSecret>;
  /**
   * Deletes a secret stored in Azure Key Vault.
   */
  deleteSecret(secretName: string, options?: coreHttp.OperationOptions): Promise<DeletedSecret>;
  /**
   * The getDeletedSecret method returns the specified deleted secret along with its properties.
   * This operation requires the secrets/get permission.
   */
  getDeletedSecret(secretName: string, options?: DeleteSecretOptions): Promise<DeletedSecret>;
}

/**
 * The latest supported KeyVault service API version
 */
export const LATEST_API_VERSION = "7.1";

/**
 * The optional parameters accepted by the KeyVault's KeyClient
 */
export interface SecretClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the KeyVault's service API.
   */
  serviceVersion?: "7.0" | "7.1";
}

/**
 * An interface representing a KeyVault Secret, with its name, value and {@link SecretProperties}.
 */
export interface KeyVaultSecret {
  /**
   * The properties of the secret.
   */
  properties: SecretProperties;
  /**
   * The value of the secret.
   */
  value?: string;
  /**
   * The name of the secret.
   */
  name: string;
}

/**
 * An interface representing the properties of a {@link KeyVaultSecret}.
 */
export interface SecretProperties {
  /**
   * The base URL to the vault.
   */
  vaultUrl: string;
  /**
   * The version of the secret. May be undefined.
   */
  version?: string;
  /**
   * The name of the secret.
   */
  name: string;
  /**
   * The secret id.
   */
  id?: string;
  /**
   * The content type of the secret.
   */
  contentType?: string;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * If this is a secret backing a KV certificate, then
   * this field specifies the corresponding key backing the KV certificate.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly keyId?: URL;
  /**
   * True if the secret's lifetime is managed by
   * key vault. If this is a secret backing a certificate, then managed will be
   * true.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly managed?: boolean;
  /**
   * Creation time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly createdOn?: Date;
  /**
   * Last updated time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly updatedOn?: Date;
  /**
   * Reflects the deletion
   * recovery level currently in effect for keys in the current vault. If it
   * contains 'Purgeable' the key can be permanently deleted by a privileged
   * user; otherwise, only the system can purge the key, at the end of the
   * retention interval. Possible values include: 'Purgeable',
   * 'Recoverable+Purgeable', 'Recoverable',
   * 'Recoverable+ProtectedSubscription'
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /**
   * The retention dates of the softDelete data.
   * The value should be >=7 and <=90 when softDelete enabled.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  recoverableDays?: number;
}

/**
 * An interface representing a deleted KeyVault Secret.
 */
export interface DeletedSecret {
  /**
   * The properties of the secret
   */
  properties: SecretProperties & {
    /**
     * The url of the recovery object, used to
     * identify and recover the deleted secret.
     */
    recoveryId?: string;
    /**
     * The time when the secret is scheduled
     * to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    scheduledPurgeDate?: Date;
    /**
     * The time when the secret was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    deletedOn?: Date;
  };
  /**
   * The secret value.
   */
  value?: string;
  /**
   * The name of the secret.
   */
  name: string;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteSecret} and {@link beginRecoverDeletedKey}.
 */
export interface SecretPollerOptions extends coreHttp.OperationOptions {
  /**
   * Time between each polling in milliseconds.
   */
  intervalInMs?: number;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteSecret}
 */
export interface BeginDeleteSecretOptions extends SecretPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginRecoverDeletedSecret}
 */
export interface BeginRecoverDeletedSecretOptions extends SecretPollerOptions {}

/**
 * Options for {@link setSecret}.
 */
export interface SetSecretOptions extends coreHttp.OperationOptions {
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * Type of the secret value such as a password.
   */
  contentType?: string;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  readonly expiresOn?: Date;
}

/**
 * Options for {@link updateSecretProperties}.
 */
export interface UpdateSecretPropertiesOptions extends coreHttp.OperationOptions {
  /**
   * Type of the secret value such as a password.
   */
  contentType?: string;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * Options for {@link getSecret}.
 */
export interface GetSecretOptions extends coreHttp.OperationOptions {
  /**
   * The version of the secret to retrieve. If not
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
}

/**
 * Options for {@link getDeletedSecret}.
 */
export interface GetDeletedSecretOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link purgeDeletedSecret}.
 */
export interface PurgeDeletedSecretOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link backupSecretOptions}.
 */
export interface BackupSecretOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link restoreSecretBackup}.
 */
export interface RestoreSecretBackupOptions extends coreHttp.OperationOptions {}

/**
 * @internal
 * @ignore
 * Options for {@link recoverDeletedSecret}.
 */
export interface RecoverDeletedSecretOptions extends coreHttp.OperationOptions {}

/**
 * @internal
 * @ignore
 * Options for {@link deleteSecret}.
 */
export interface DeleteSecretOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link listPropertiesOfSecretVersions}.
 */
export interface ListPropertiesOfSecretVersionsOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link listPropertiesOfSecrets}.
 */
export interface ListPropertiesOfSecretsOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link listDeletedSecrets}.
 */
export interface ListDeletedSecretsOptions extends coreHttp.OperationOptions {}
