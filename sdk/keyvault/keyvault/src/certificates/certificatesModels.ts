import * as msRest from "@azure/ms-rest-js";
import { ParsedKeyVaultEntityIdentifier } from "../keyVaultBase";

export interface Certificate extends CertificateAttributes {
  /**
   * @member {string} [kid] The key id.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly kid?: string;
  /**
   * @member {string} [sid] The secret id.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly sid?: string;
  /**
   * @member {CertificatePolicy} [policy] The management policy.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly policy?: CertificatePolicy;
  /**
   * @member {Uint8Array} [cer] CER contents of x509 certificate.
   */
  cer?: Uint8Array;
  /**
   * @member {string} [contentType] The content type of the secret.
   */
  contentType?: string;
}

export interface CertificateAttributes extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [id] The certificate id.
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
   * @member {boolean} [created] Determines whether the object is created.
   */
  created?: boolean;
  /**
   * @member {boolean} [updated] Determines whether the object is updated.
   */
  updated?: boolean;
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
   * @member {Uint8Array} [x509Thumbprint] Thumbprint of the certificate.
   */
  x509Thumbprint?: Uint8Array;
}

export interface DeletedCertificate extends Certificate {
  /**
   * @member {string} [recoveryId] The url of the recovery object, used to
   * identify and recover the deleted certificate.
   */
  recoveryId?: string;
  /**
   * @member {Date} [scheduledPurgeDate] The time when the certificate is scheduled
   * to be purged, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly scheduledPurgeDate?: Date;
  /**
   * @member {Date} [deletedDate] The time when the certificate was deleted, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly deletedDate?: Date;
}

/**
 * @interface
 * An interface representing KeyVaultClientSetCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface SetCertificateOptions {
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: { [propertyName: string]: string };
  /**
   * @member {string} [contentType] Type of the certificate value such as a
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
 * An interface representing KeyVaultClientUpdateCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface UpdateCertificateOptions {
  /**
   * @member {string} [contentType] Type of the certificate value such as a
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
 * An interface representing CertificateClientGetCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface GetCertificateOptions {
  /**
   * @member {string} [version] The version of the certificate to retrieve.  If not 
   * specified the latest version of the certificate will be retrieved.
   */
  version?: string;
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing optional parameters for CertificateClient paged operations.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface RequestOptions {
  /**
   * @member {msRest.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: msRest.RequestOptionsBase;
}

export interface CertificateIssuer {
  /**
   * @member {string} [id] Certificate Identifier.
   */
  id?: string;
  /**
   * @member {string} [provider] The issuer provider.
   */
  provider?: string;
}

export interface IssuerAttributes {
  /**
   * @member {string} [id] Certificate Identifier.
   */
  id?: string;
  /**
   * @member {string} [provider] The issuer provider.
   */
  provider?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {boolean} [created] Determines whether the object is created.
   */
  created?: boolean;
  /**
   * @member {boolean} [updated] Determines whether the object is updated.
   */
  updated?: boolean;
  /**
   * @member {string} [name] Name of the issuer
   */
  name?: string;
}

export interface Issuer extends IssuerAttributes {
  accountId?: string;
  password?: string;
  organizationId?: string;
  adminDetails?: string;
}
