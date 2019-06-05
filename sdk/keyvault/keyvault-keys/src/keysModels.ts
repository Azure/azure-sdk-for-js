import * as msRest from "@azure/ms-rest-js";
import { ParsedKeyVaultEntityIdentifier } from "./core/keyVaultBase";
import { JsonWebKey, JsonWebKeyOperation, JsonWebKeyCurveName } from "./core/models";
import { DeletionRecoveryLevel } from "./core/models";

export interface Key extends KeyAttributes {
  /**
   * @member {string} [value] The key value.
   */
  keyMaterial?: JsonWebKey;
}

export interface KeyAttributes extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [id] The key id.
   */
  id?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expires] Expiry date in UTC.
   */
  expires?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {Date} [created] Creation time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly created?: Date;
  /**
   * @member {Date} [updated] Last updated time in UTC.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly updated?: Date;
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

export interface DeletedKey extends Key {
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
   * @member {Date} [deletedDate] The time when the key was deleted, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly deletedDate?: Date;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to createKey
 */
export interface CreateKeyOptions {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {JsonWebKeyOperation[]} [keyOps]
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
   * @member {Date} [expires] Expiry date in UTC.
   */
  expires?: Date;
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to createEcKey
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
 * passed to createEcKey
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
 * passed to createKey
 */
export interface ImportKeyOptions {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {boolean} [hsm] Whether to import as a hardware key (HSM) or
   * software key.
   */
  hsm?: boolean;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * @member {Date} [expires] Expiry date in UTC.
   */
  expires?: Date;
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing KeyVaultClientUpdateKeyOptionalParams.
 * Optional Parameters.
 */
export interface UpdateKeyOptions {
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
   * @member {Date} [expires] Expiry date in UTC.
   */
  expires?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing KeyClientGetKeyOptionalParams.
 * Optional Parameters.
 */
export interface GetKeyOptions {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not 
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing optional parameters for KeyClient paged operations.
 * Optional Parameters.
 */
export interface GetAllKeysOptions {
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing the most general set of request options.
 */
export interface RequestOptions {
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}
