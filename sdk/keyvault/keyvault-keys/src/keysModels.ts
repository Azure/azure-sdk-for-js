// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { DeletionRecoveryLevel } from "./generated/models";
import { KeyCurveName } from "./cryptographyClientModels";

/**
 * Defines values for KeyOperation.
 * Possible values include: 'encrypt', 'decrypt', 'sign', 'verify', 'wrapKey', 'unwrapKey', 'import'
 * @readonly
 * @enum {string}
 */
export type KeyOperation =
  | "encrypt"
  | "decrypt"
  | "sign"
  | "verify"
  | "wrapKey"
  | "unwrapKey"
  | "import";

/**
 * Defines values for KeyType.
 * Possible values include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
 * @readonly
 * @enum {string}
 */
export type KeyType = "EC" | "EC-HSM" | "RSA" | "RSA-HSM" | "oct";

/**
 * @internal
 * @ignore
 * An interface representing the KeyClient. For internal use.
 */
export interface KeyClientInterface {
  /**
   * Recovers the deleted key in the specified vault. This operation can only be performed on a
   * soft-delete enabled vault.
   */
  recoverDeletedKey(name: string, options?: RecoverDeletedKeyOptions): Promise<KeyVaultKey>;
  /**
   * The get method gets a specified key and is applicable to any key stored in Azure Key Vault.
   * This operation requires the keys/get permission.
   */
  getKey(name: string, options?: GetKeyOptions): Promise<KeyVaultKey>;
  /**
   * The delete operation applies to any key stored in Azure Key Vault. Individual versions
   * of a key can not be deleted, only all versions of a given key at once.
   */
  deleteKey(name: string, options?: DeleteKeyOptions): Promise<DeletedKey>;
  /**
   * The getDeletedKey method returns the specified deleted key along with its properties.
   * This operation requires the keys/get permission.
   */
  getDeletedKey(name: string, options?: GetDeletedKeyOptions): Promise<DeletedKey>;
}

/**
 * The latest supported Key Vault service API version
 */
export const LATEST_API_VERSION = "7.1";

/**
 * The optional parameters accepted by the KeyVault's KeyClient
 */
export interface KeyClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the KeyVault's service API.
   */
  serviceVersion?: "7.0" | "7.1";
}

/**
 * The optional parameters accepted by the KeyVault's CryptographyClient
 */
export interface CryptographyClientOptions extends KeyClientOptions {}

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
  kty?: KeyType;
  /**
   * Json web key operations. For more
   * information on possible key operations, see KeyOperation.
   */
  keyOps?: KeyOperation[];
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
   * Elliptic curve name. For valid values, see KeyCurveName. Possible values include:
   * 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  crv?: KeyCurveName;
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
 * An interface representing a Key Vault Key, with its name, value and {@link KeyProperties}.
 */
export interface KeyVaultKey {
  /**
   * The key value.
   */
  key?: JsonWebKey;
  /**
   * The name of the key.
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
  keyType?: KeyType;
  /**
   * Operations allowed on this key
   */
  keyOperations?: KeyOperation[];
  /**
   * The properties of the key.
   */
  properties: KeyProperties;
}

/**
 * An interface representing the Properties of {@link KeyVaultKey}
 */
export interface KeyProperties {
  /**
   * Key identifier.
   */
  id?: string;
  /**
   * The name of the key.
   */
  name: string;
  /**
   * The vault URI.
   */
  vaultUrl: string;
  /**
   * The version of the key. May be undefined.
   */
  version?: string;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
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
   * Reflects the deletion recovery level currently in effect for keys in the current vault.
   * If it contains 'Purgeable' the key can be permanently deleted by a privileged
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
 * An interface representing a deleted Key Vault Key.
 */
export interface DeletedKey {
  /**
   * The key value.
   */
  key?: JsonWebKey;
  /**
   * The name of the key.
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
  keyType?: KeyType;
  /**
   * Operations allowed on this key
   */
  keyOperations?: KeyOperation[];
  /**
   * The properties of the key.
   */
  properties: KeyProperties & {
    /**
     * The url of the recovery object, used to
     * identify and recover the deleted key.
     */
    readonly recoveryId?: string;
    /**
     * The time when the key is scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * The time when the key was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    deletedOn?: Date;
  };
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createKey}
 */
export interface CreateKeyOptions extends coreHttp.OperationOptions {
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * Json web key operations. For more
   * information on possible key operations, see KeyOperation.
   */
  keyOps?: KeyOperation[];
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * Size of the key
   */
  keySize?: number;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteKey} and {@link beginRecoverDeletedKey}
 */
export interface KeyPollerOptions extends coreHttp.OperationOptions {
  /**
   * Time between each polling
   */
  intervalInMs?: number;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteKey}
 */
export interface BeginDeleteKeyOptions extends KeyPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginRecoverDeletedKey}
 */
export interface BeginRecoverDeletedKeyOptions extends KeyPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createEcKey}
 */
export interface CreateEcKeyOptions extends CreateKeyOptions {
  /**
   * Elliptic curve name. For valid values, see KeyCurveName.
   * Possible values include: 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  curve?: KeyCurveName;
  /**
   * Whether to import as a hardware key (HSM) or software key.
   */
  hsm?: boolean;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link createRsaKey}
 */
export interface CreateRsaKeyOptions extends CreateKeyOptions {
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * Whether to import as a hardware key (HSM) or software key.
   */
  hsm?: boolean;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link importKey}
 */
export interface ImportKeyOptions extends coreHttp.OperationOptions {
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * Whether to import as a hardware key (HSM) or software key.
   */
  hardwareProtected?: boolean;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  expiresOn?: Date;
}

/**
 * Options for {@link updateKeyProperties}.
 */
export interface UpdateKeyPropertiesOptions extends coreHttp.OperationOptions {
  /**
   * Json web key operations. For more
   * information on possible key operations, see KeyOperation.
   */
  keyOps?: KeyOperation[];
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * Application specific metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * Options for {@link getKey}.
 */
export interface GetKeyOptions extends coreHttp.OperationOptions {
  /**
   * The version of the secret to retrieve. If not
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
}

/**
 * An interface representing optional parameters for KeyClient paged operations passed to {@link listKeys}.
 */
export interface ListKeysOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters for KeyClient paged operations passed to {@link listPropertiesOfKeys}.
 */
export interface ListPropertiesOfKeysOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters for KeyClient paged operations passed to {@link listPropertiesOfKeyVersions}.
 */
export interface ListPropertiesOfKeyVersionsOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing optional parameters for KeyClient paged operations passed to {@link listDeletedKeys}.
 */
export interface ListDeletedKeysOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link getDeletedKey}.
 */
export interface GetDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link purgeDeletedKey}.
 */
export interface PurgeDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * @internal
 * @ignore
 * Options for {@link recoverDeletedKey}.
 */
export interface RecoverDeletedKeyOptions extends coreHttp.OperationOptions {}

/**
 * @internal
 * @ignore
 * Options for {@link deleteKey}.
 */
export interface DeleteKeyOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link backupKey}.
 */
export interface BackupKeyOptions extends coreHttp.OperationOptions {}

/**
 * Options for {@link restoreKeyBackup}.
 */
export interface RestoreKeyBackupOptions extends coreHttp.OperationOptions {}

/**
 * An interface representing the options of the cryptography API methods, go to the {@link CryptographyClient} for more information.
 */
export interface CryptographyOptions extends coreHttp.OperationOptions {}
