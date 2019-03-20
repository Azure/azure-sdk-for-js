import * as Models from "./models";

import { AzureServiceClientOptions as Pipeline } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";
import { SecretAttributes } from "./models";


export { SecretAttributes };

export interface Secret extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [value] The secret value.
   */
  value?: string;
  /**
   * @member {string} [id] The secret id.
   */
  id?: string;
  /**
   * @member {string} [contentType] The content type of the secret.
   */
  contentType?: string;
  /**
   * @member {SecretAttributes} [attributes] The secret management attributes.
   */
  attributes?: SecretAttributes;
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

export interface ParsedKeyVaultEntityIdentifier {
  /** 
   * @member {string} [vaultUrl] The vault URI.
   */
  vaultUrl: string;
  /** 
   * @member {string} [version] The version of key/secret/certificate. May be undefined.
   */
  version?: string;
  /** 
   * @member {string} [name] The name of key/secret/certificate.
   */
  name: string;
}


/**
 * @interface
 * An interface representing KeyVaultClientSetSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SecretClientSetSecretOptionalParams extends msRest.RequestOptionsBase {
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
   * @member {SecretAttributes} [secretAttributes] The secret management
   * attributes.
   */
  attributes?: SecretAttributes;
}


/**
 * @interface
 * An interface representing KeyVaultClientUpdateSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SecretClientUpdateSecretOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {string} [contentType] Type of the secret value such as a
   * password.
   */
  contentType?: string;
  /**
   * @member {SecretAttributes} [secretAttributes] The secret management
   * attributes.
   */
  attributes?: SecretAttributes;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
}

/**
 * @interface
 * An interface representing SecretClientGetSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SecretClientGetSecretOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {string} [version] The version of the secret to retrieve.  If not 
   * specified the latest version of the secret will be retrieved.
   */
  version: string;
}

/**
 * @interface
 * An interface representing optional parameters for SecretClient paged operations.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SecretClientGetPagedOptionalParams extends msRest.RequestOptionsBase {
  /**
   * @member {number} [maxPageSize] Maximum number of results to return in a
   * page. If not specified, the service will return up to 25 results per page.
   */
  maxPageSize?: number;
}



