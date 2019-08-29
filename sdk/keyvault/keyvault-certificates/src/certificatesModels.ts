import * as coreHttp from "@azure/core-http";
import { ParsedKeyVaultEntityIdentifier } from "./core/keyVaultBase";
import {
  CertificatePolicy,
  KeyVaultClientCreateCertificateOptionalParams,
} from "./core/models";

/**
 * Defines values for contentType.
 * Possible values include: 'application/pem', 'application/x-pkcs12'
 * @readonly
 * @enum {string}
 */
export type CertificateContentType = 'application/pem' | 'application/x-pkcs12' | undefined;

/**
 * @interface
 * An interface representing a certificate without the certificate's policy
 */
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
   * @member {Uint8Array} [cer] CER contents of x509 certificate.
   */
  cer?: Uint8Array;
  /**
   * @member {CertificateContentType} [contentType] The content type of the secret.
   */
  contentType?: CertificateContentType;
}

/**
 * @interface
 * An interface representing a full certificate
 */
export interface CertificateWithPolicy extends Certificate { 
  /**
   * @member {CertificatePolicy} [policy] The management policy.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly policy?: CertificatePolicy;
}

/**
 * @interface
 * An interface representing the attributes of a certificate
 */
export interface CertificateAttributes extends ParsedKeyVaultEntityIdentifier {
  /**
   * @member {string} [id] The certificate id.
   */
  readonly id?: string;
  /**
   * @member {boolean} [enabled] Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * @member {Date} [notBefore] Not before date in UTC.
   */
  readonly notBefore?: Date;
  /**
   * @member {Date} [created] When the certificate was created.
   */
  readonly created?: Date;
  /**
   * @member {Date} [updated] When the object was updated.
   */
  readonly updated?: Date;
  /**
   * @member {Date} [expires] Expiry date in UTC.
   */
  readonly expires?: Date;
  /**
   * @member {{ [propertyName: string]: string }} [tags] Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: CertificateTags;
  /**
   * @member {Uint8Array} [x509Thumbprint] Thumbprint of the certificate.
   */
  readonly x509Thumbprint?: Uint8Array;
}

/**
 * @interface
 * An interface representing a deleted certificate
 */
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
 * An interface representing options for creating a certificate.
 * Optional Parameters.
 */
export interface CreateCertificateOptions extends KeyVaultClientCreateCertificateOptionalParams {}

export type CertificateTags = { [propertyName: string]: string };

/**
 * @interface
 * An interface representing KeyVaultClientUpdateCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface UpdateCertificateOptions {
  /**
   * @member {CertificateContentType} [contentType] Type of the certificate value such as a
   * password.
   */
  contentType?: CertificateContentType;
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
  tags?: CertificateTags;
  /**
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
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
   * @member {coreHttp.RequestOptionsBase} [requestOptions] Options for this request
   */
  requestOptions?: coreHttp.RequestOptionsBase;
}

/**
 * @interface
 * An interface representing the issuer of a certificate
 */
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

/**
 * @interface
 * An interface representing the attributes of an issuer
 */
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
   * @member {Date} [created] When the issuer was created.
   */
  created?: Date;
  /**
   * @member {Date} [updated] When the issuer was updated.
   */
  updated?: Date;
  /**
   * @member {string} [name] Name of the issuer
   */
  name?: string;
}
