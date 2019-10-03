import * as coreHttp from "@azure/core-http";
import { ParsedKeyVaultEntityIdentifier } from "./core/keyVaultBase";
import {
  SecretProperties,
  CertificateAttributes,
  KeyVaultClientCreateCertificateOptionalParams,
  JsonWebKeyType,
  JsonWebKeyCurveName,
  LifetimeAction,
  KeyUsageType
} from "./core/models";

/**
 * Defines values for contentType.
 * Possible values include: 'application/pem', 'application/x-pkcs12'
 * @readonly
 * @enum {string}
 */
export type CertificateContentType = "application/pem" | "application/x-pkcs12" | undefined;

/**
 * @interface
 * An interface representing a certificate without the certificate's policy
 */
export interface Certificate {
  /**
   * @member {CertificateProperties} [properties] The properties of the certificate
   */
  properties: CertificateProperties;
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
  /**
   * @member {CertificatePolicy} [policy] The management policy.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly policy?: CertificatePolicy;
}

/**
 * @interface
 * An interface representing a certificate's policy
 */
export interface CertificatePolicy extends SecretProperties, CertificateAttributes {
  /**
   * The certificate id.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * Actions that will be performed by Key Vault over the lifetime of a certificate.
   */
  lifetimeActions?: LifetimeAction[];
  /**
   * Indicates if the private key can be exported.
   */
  exportable?: boolean;
  /**
   * The type of key pair to be used for the certificate. Possible values include: 'EC', 'EC-HSM',
   * 'RSA', 'RSA-HSM', 'oct'
   */
  keyType?: JsonWebKeyType;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * Indicates if the same key pair will be used on certificate renewal.
   */
  reuseKey?: boolean;
  /**
   * Elliptic curve name. For valid values, see JsonWebKeyCurveName. Possible values include:
   * 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  keyCurveType?: JsonWebKeyCurveName;
  /**
   * Name of the referenced issuer object or reserved names; for example, 'Self' or 'Unknown'.
   */
  issuerName?: string;
  /**
   * Type of certificate to be requested from the issuer provider.
   */
  certificateType?: string;
  /**
   * Indicates if the certificates generated under this policy should be published to certificate
   * transparency logs.
   */
  certificateTransparency?: boolean;
  /**
   * The subject name. Should be a valid X509 distinguished Name.
   */
  subjectName?: string;
  /**
   * The enhanced key usage.
   */
  ekus?: string[];
  /**
   * The subject alternative names.
   */
  subjectAlternativeNames?: SubjectAlternativeNames;
  /**
   * List of key usages.
   */
  keyUsage?: KeyUsageType[];
  /**
   * The duration that the certificate is valid in months.
   */
  validityInMonths?: number;
}

export interface SubjectAlternativeNames {
  /**
   * The subject type, either emails, DNS names or UPNs
   */
  subjectType: 'emails' | 'dnsNames' | 'upns';
  /**
   * The subject values
   */
  subjectValues: string[];
}

/**
 * @interface
 * An interface representing the properties of a certificate
 */
export interface CertificateProperties extends ParsedKeyVaultEntityIdentifier {
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
 * An interface representing the properties of an issuer
 */
export interface IssuerProperties {
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
