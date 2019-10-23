// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreHttp from "@azure/core-http";
import { DeletionRecoveryLevel } from "./core/models";

/**
 * @interface
 * An interface representing the secret client. For internal use.
 */
export interface SecretClientInterface {
  recoverDeletedSecret(
    secretName: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<SecretProperties>;
  getSecret(secretName: string, options?: GetSecretOptions): Promise<KeyVaultSecret>;
  deleteSecret(secretName: string, options?: coreHttp.RequestOptionsBase): Promise<DeletedSecret>;
  getDeletedSecret(
    secretName: string,
    options?: coreHttp.RequestOptionsBase
  ): Promise<DeletedSecret>;
}

/**
 * @interface
 * An interface representing the complete secret.
 */
export interface KeyVaultSecret {
  /**
   * @member {SecretProperties} [properties] The properties of the secret
   */
  properties: SecretProperties;
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
  /**
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}

/**
 * @interface
 * An interface representing the a secret's attributes.
 */
export interface SecretProperties {
  /**
   * @member {string} [vaultEndpoint] The vault URI.
   */
  vaultEndpoint: string;
  /**
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /**
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
  /**
   * @member {string} [id] The secret id.
   */
  id?: string;
  /**
   * @member {string} [contentType] The content type of the secret.
   */
  contentType?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {URL} [keyId] If this is a secret backing a KV certificate, then
   * this field specifies the corresponding key backing the KV certificate.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly keyId?: URL;
  /**
   * @member {boolean} [managed] True if the secret's lifetime is managed by
   * key vault. If this is a secret backing a certificate, then managed will be
   * true.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly managed?: boolean;
  /**
   * @member {Date} [created] Creation time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly createdOn?: Date;
  /**
   * @member {Date} [updated] Last updated time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly updatedOn?: Date;
  /**
   * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
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
}

/**
 * @interface
 * An interface representing a deleted secret.
 */
export interface DeletedSecret {
  /**
   * @member {SecretProperties} [properties] The properties of the secret
   */
  properties: SecretProperties & {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted secret.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the secret is scheduled
     * to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedOn] The time when the secret was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    deletedOn?: Date;
  };
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
  /**
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to beginDeleteSecret
 */
export interface SecretPollerOptions extends coreHttp.RequestOptionsBase {
  /**
   * @member {number} [intervalInMs] Time between each polling
   */
  intervalInMs?: number;
  /**
   * @member {string} [resumeFrom] A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to setSecret.
 */
export interface SetSecretOptions extends coreHttp.RequestOptionsBase {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {string} [contentType] Type of the secret value such as a
   * password.
   */
  contentType?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  readonly expiresOn?: Date;
}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to updateSecret.
 */
export interface UpdateSecretPropertiesOptions extends coreHttp.RequestOptionsBase {
  /**
   * @member {string} [contentType] Type of the secret value such as a
   * password.
   */
  contentType?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to getSecret.
 */
export interface GetSecretOptions extends coreHttp.RequestOptionsBase {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
}

/**
 * @interface
 * An interface representing optional parameters for the getDeletedSecret method
 */
export interface GetDeletedSecretOptions extends coreHttp.RequestOptionsBase {}

/**
 * @interface
 * An interface representing optional parameters for the purgeDeletedSecret method
 */
export interface PurgeDeletedSecretOptions extends coreHttp.RequestOptionsBase {}

/**
 * @interface
 * An interface representing optional parameters for the backupSecret method
 */
export interface BackupSecretOptions extends coreHttp.RequestOptionsBase {}

/**
 * @interface
 * An interface representing optional parameters for the restoreSecretBackup method
 */
export interface RestoreSecretBackupOptions extends coreHttp.RequestOptionsBase {}

/**
 * @interface
 * An interface representing optional parameters for SecretClient paged operations.
 */
export interface ListOperationOptions extends coreHttp.RequestOptionsBase {}
