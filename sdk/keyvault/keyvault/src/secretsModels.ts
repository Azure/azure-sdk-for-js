import * as msRest from "@azure/ms-rest-js";
import {ParsedKeyVaultEntityIdentifier} from "./keyVaultBase";

export interface Secret extends SecretAttributes {
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
}

export interface SecretAttributes extends ParsedKeyVaultEntityIdentifier {
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
   * @member {string} [keyId] If this is a secret backing a KV certificate, then
   * this field specifies the corresponding key backing the KV certificate.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly keyId?: string;
  /**
   * @member {boolean} [managed] True if the secret's lifetime is managed by
   * key vault. If this is a secret backing a certificate, then managed will be
   * true.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly managed?: boolean;
}

export interface DeletedSecret extends Secret {
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
  readonly scheduledPurgeDate?: Date;
  /**
   * @member {Date} [deletedDate] The time when the secret was deleted, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly deletedDate?: Date;
}

/**
 * @interface
 * An interface representing KeyVaultClientSetSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SetSecretOptions {
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
 * An interface representing KeyVaultClientUpdateSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface UpdateSecretOptions {
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
 * An interface representing SecretClientGetSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface GetSecretOptions {
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
 * An interface representing optional parameters for SecretClient paged operations.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface GetAllSecretsOptions {
  /**
   * @member {number} [maxPageSize] Maximum number of results to return in a
   * page. If not specified, the service will return up to 25 results per page.
   */
  maxPageSize?: number;
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}



