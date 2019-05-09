import * as msRest from "@azure/ms-rest-js";
import {ParsedKeyVaultEntityIdentifier} from "./keyVaultBase";
import {KeyUsageType, JsonWebKeyType, JsonWebKeyOperation} from "./models";

export interface Key extends KeyAttributes {
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
}

export interface KeyAttributes extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [id] The key id.
   */
  id?: string;
  /**
   * @member {string} [contentType] The content type of the key.
   */
  contentType?: string;
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

}

export interface DeletedKey extends Key {
  /**
   * @member {string} [recoveryId] The url of the recovery object, used to
   * identify and recover the deleted key.
   */
  recoveryId?: string;
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
 *
 * @extends RequestOptionsBase
 */
export interface CreateKeyOptions extends msRest.RequestOptionsBase {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {number} [keySize] The key size in bits. For example: 2048, 3072,
   * or 4096 for RSA.
   */
  keySize?: number;
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
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to createKey
 *
 * @extends RequestOptionsBase
 */
export interface ImportKeyOptions extends msRest.RequestOptionsBase {
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
}

/**
 * @interface
 * An interface representing KeyVaultClientUpdateKeyOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface UpdateKeyOptions extends msRest.RequestOptionsBase {
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
}

/**
 * @interface
 * An interface representing KeyClientGetKeyOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface GetKeyOptions extends msRest.RequestOptionsBase {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not 
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
}

/**
 * @interface
 * An interface representing optional parameters for KeyClient paged operations.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface GetAllKeysOptions extends msRest.RequestOptionsBase {
  /**
   * @member {number} [maxPageSize] Maximum number of results to return in a
   * page. If not specified, the service will return up to 25 results per page.
   */
  maxPageSize?: number;
}



