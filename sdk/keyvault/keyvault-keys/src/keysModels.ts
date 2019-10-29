// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreHttp from "@azure/core-http";
import { JsonWebKeyOperation, JsonWebKeyCurveName, JsonWebKeyType } from "./core/models";
import { DeletionRecoveryLevel } from "./core/models";

/**
 * @internal
 * @ignore
 * @interface
 * An interface representing the KeyClient. For internal use.
 */
export interface KeyClientInterface {
  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault.
   */
  recoverDeletedKey(name: string, options?: GetDeletedKeyOptions): Promise<KeyVaultKey>;
  /**
   * The get method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   */
  getKey(name: string, options?: GetKeyOptions): Promise<KeyVaultKey>;
  /**
   * The delete operation applies to any key stored in Azure Key Vault. Individual versions
   * of a key can not be deleted, only all versions of a given key at once.
   */
  deleteKey(name: string, options?: coreHttp.OperationOptions): Promise<DeletedKey>;
  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   */
  getDeletedKey(name: string, options?: GetDeletedKeyOptions): Promise<DeletedKey>;
}

/**
 * As of http://tools.ietf.org/html/draft-ietf-jose-json-web-key-18
 */
export interface JsonWebKey {
  /**
   * Key identifier.
   */
  kid?: string;
  /**
   * JsonWebKey Key Type (kty), as defined in
   * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. Possible values include:
   * 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
   */
  kty?: JsonWebKeyType;
  /**
   * @member {JsonWebKeyOperation[]} [keyOps] Json web key operations. For more
   * information on possible key operations, see JsonWebKeyOperation.
   */
  keyOps?: JsonWebKeyOperation[];
  /**
   * RSA modulus.
   */
  n?: Uint8Array;
  /**
   * RSA public exponent.
   */
  e?: Uint8Array;
  /**
   * RSA private exponent, or the D component of an EC private key.
   */
  d?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  dp?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  dq?: Uint8Array;
  /**
   * RSA private key parameter.
   */
  qi?: Uint8Array;
  /**
   * RSA secret prime.
   */
  p?: Uint8Array;
  /**
   * RSA secret prime, with p < q.
   */
  q?: Uint8Array;
  /**
   * Symmetric key.
   */
  k?: Uint8Array;
  /**
   * HSM Token, used with 'Bring Your Own Key'.
   */
  t?: Uint8Array;
  /**
   * Elliptic curve name. For valid values, see JsonWebKeyCurveName. Possible values include:
   * 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  crv?: JsonWebKeyCurveName;
  /**
   * X component of an EC public key.
   */
  x?: Uint8Array;
  /**
   * Y component of an EC public key.
   */
  y?: Uint8Array;
}

/**
 * @interface
 * An interface representing a KeyVault Key, with its name, value and {@link KeyProperties}.
 */
export interface KeyVaultKey {
  /**
   * @member {string} [key] The key value.
   */
  key?: JsonWebKey;
  /**
   * @member {string} name The name of the KeyVault Key.
   */
  name: string;
  /**
   * Key identifier.
   */
  id?: string;
  /**
   * JsonWebKey Key Type (kty), as defined in
   * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. Possible values include:
   * 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
   */
  keyType?: JsonWebKeyType;
  /**
   * Operations allowed on this key
   */
  keyOperations?: JsonWebKeyOperation[];
  /**
   * @member {KeyProperties} properties The properties of the {@link KeyVaultKey}.
   */
  properties: KeyProperties;
}

/**
 * @interface
 * An interface representing the Properties of {@link KeyVaultKey}
 */
export interface KeyProperties {
  /**
   * Key identifier.
   */
  id?: string;
  /**
   * @member {string} name The name of key.
   */
  name: string;
  /**
   * @member {string} vaultUrl The vault URI.
   */
  vaultUrl: string;
  /**
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {Date} [createdOn] Creation time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly createdOn?: Date;
  /**
   * @member {Date} [updatedOn] Last updated time in UTC.
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
 * An interface representing a deleted KeyVault Key.
 */
export interface DeletedKey {
  /**
   * @member {JsonWebKey} [key] The key value.
   */
  key?: JsonWebKey;
  /**
   * @member {string} name The name of key/secret/certificate.
   */
  name: string;
  /**
   * Key identifier.
   */
  id?: string;
  /**
   * JsonWebKey Key Type (kty), as defined in
   * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40. Possible values include:
   * 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
   */
  keyType?: JsonWebKeyType;
  /**
   * Operations allowed on this key
   */
  keyOperations?: JsonWebKeyOperation[];
  /**
   * @member {KeyProperties} properties The properties of the key.
   */
  properties: KeyProperties & {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted key.
     */
    readonly recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the key is scheduled
     * to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedOn] The time when the key was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    deletedOn?: Date;
  };
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to {@link createKey}
 */
export interface CreateKeyOptions extends coreHttp.OperationOptions {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {JsonWebKeyOperation[]} [keyOps] Json web key operations. For more
   * information on possible key operations, see JsonWebKeyOperation.
   */
  keyOps?: JsonWebKeyOperation[];
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * @member {number} [keySize] Size of the key
   */
  keySize?: number;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteKey} and {@link beginRecoverDeletedKey}
 */
export interface KeyPollerOptions extends coreHttp.OperationOptions {
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
 * An interface representing the optional parameters that can be
 * passed to {@link createEcKey}
 */
export interface CreateEcKeyOptions extends CreateKeyOptions {
  /**
   * @member {JsonWebKeyCurveName} [curve] Elliptic curve name. For valid
   * values, see JsonWebKeyCurveName. Possible values include: 'P-256',
   * 'P-384', 'P-521', 'P-256K'
   */
  curve?: JsonWebKeyCurveName;
  /**
   * @member {boolean} [hsm] Whether to import as a hardware key (HSM) or
   * software key.
   */
  hsm?: boolean;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to {@link createRsaKey}
 */
export interface CreateRsaKeyOptions extends CreateKeyOptions {
  /**
   * @member {number} [keySize] The key size in bits. For example: 2048, 3072,
   * or 4096 for RSA.
   */
  keySize?: number;
  /**
   * @member {boolean} [hsm] Whether to import as a hardware key (HSM) or
   * software key.
   */
  hsm?: boolean;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to {@link importKey}
 */
export interface ImportKeyOptions extends coreHttp.OperationOptions {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {boolean} [hardwareProtected] Whether to import as a hardware key (HSM) or
   * software key.
   */
  hardwareProtected?: boolean;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  expiresOn?: Date;
}

/**
 * @interface
 * An interface representing optional parameters that can be passed to {@link updateKeyProperties}.
 */
export interface UpdateKeyPropertiesOptions extends coreHttp.OperationOptions {
  /**
   * @member {JsonWebKeyOperation[]} [keyOps] Json web key operations. For more
   * information on possible key operations, see JsonWebKeyOperation.
   */
  keyOps?: JsonWebKeyOperation[];
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing optional parameters that can be passed to {@link getKey}.
 */
export interface GetKeyOptions extends coreHttp.OperationOptions {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
}

/**
 * @interface
 * An interface representing optional parameters for KeyClient paged operations passed to {@link listKeys}.
 */
export interface ListKeysOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to {@link getDeletedKey}.
 */
export interface GetDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to {@link purgeDeletedKey}.
 */
export interface PurgeDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * @internal
 * @ignore
 * @interface
 * An interface representing the optional parameters that can be passed to {@link recoverDeletedKey}.
 */
export interface RecoverDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to {@link backupKey}.
 */
export interface BackupKeyOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the optional parameters that can be passed to {@link restoreKeyBackup}.
 */
export interface RestoreKeyBackupOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the options of the cryptography API methods, go to the {@link CryptographyClient} for more information.
 */
export interface CryptographyOptions extends coreHttp.OperationOptions {}
