// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as coreHttp from "@azure/core-http";
import { ParsedKeyVaultEntityIdentifier } from "./core/keyVaultBase";
import {
  JsonWebKey,
  JsonWebKeyOperation,
  JsonWebKeyCurveName,
  JsonWebKeyType
} from "./core/models";
import { DeletionRecoveryLevel } from "./core/models";

/**
 * @interface
 * An interface representing the key client. For internal use.
 */
export interface KeyClientInterface {
  recoverDeletedKey(name: string, options?: RequestOptions): Promise<KeyVaultKey>;
  getKey(name: string, options?: GetKeyOptions): Promise<KeyVaultKey>;
  deleteKey(name: string, options?: coreHttp.RequestOptionsBase): Promise<DeletedKey>;
  getDeletedKey(name: string, options?: RequestOptions): Promise<DeletedKey>;
}

/**
 * @interface
 * An interface representing the complete key with value
 */
export interface KeyVaultKey {
  /**
   * @member {KeyProperties} [properties] The properties of the key.
   */
  properties: KeyProperties;
  /**
   * @member {string} [value] The key value.
   */
  key?: JsonWebKey;
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
}

/**
 * @interface
 * An interface representing the Properties of a key
 */
export interface KeyProperties extends ParsedKeyVaultEntityIdentifier {
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
 * An interface representing a deleted key
 */
export interface DeletedKey {
  /**
   * @member {string} [value] The key value.
   */
  key?: JsonWebKey;
  /**
   * @member {KeyProperties} [properties] The properties of the key.
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
    readonly deletedOn?: Date;
  };
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
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
  keySize?: number;
}

/**
 * @interface
 * An interface representing the optional parameters that can be
 * passed to beginDeleteKey
 */
export interface KeyPollerOptions {
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
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
 * passed to createRsaKey
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
 * passed to importKey
 */
export interface ImportKeyOptions {
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
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing optional parameters that can be passed to updateKey.
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
   * @member {Date} [expiresOn] Expiry date in UTC.
   */
  expiresOn?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing optional parameters that can be passed to getKey.
 */
export interface GetKeyOptions {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not
   * specified the latest version of the secret will be retrieved.
   */
  version?: string;
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing optional parameters for KeyClient paged operations.
 */
export interface ListKeysOptions {
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing the most general set of request options.
 */
export interface RequestOptions {
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}
