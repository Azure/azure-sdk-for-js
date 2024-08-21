// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/** The certificate management attributes. */
export interface CertificateAttributes {
  /** Determines whether the object is enabled. */
  enabled?: boolean;
  /** Not before date in UTC. */
  nbf?: number;
  /** Expiry date in UTC. */
  expires?: number;
}

/** Management policy for a certificate. */
export interface CertificatePolicy {
  /** Properties of the key backing a certificate. */
  key_props?: KeyProperties;
  /** Properties of the secret backing a certificate. */
  secret_props?: SecretProperties;
  /** Properties of the X509 component of a certificate. */
  x509_props?: X509CertificateProperties;
  /** Actions that will be performed by Key Vault over the lifetime of a certificate. */
  lifetime_actions?: Array<LifetimeAction>;
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuer?: IssuerParameters;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
}

/** Properties of the key pair backing a certificate. */
export interface KeyProperties {
  /**
   * Indicates if the private key can be exported. Release policy must be provided
   * when creating the first version of an exportable key.
   */
  exportable?: boolean;
  /** The type of key pair to be used for the certificate. */
  kty?: JsonWebKeyType;
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. */
  key_size?: number;
  /** Indicates if the same key pair will be used on certificate renewal. */
  reuse_key?: boolean;
  /** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
  crv?: JsonWebKeyCurveName;
}

/** Properties of the key backing a certificate. */
export interface SecretProperties {
  /** The media type (MIME type). */
  contentType?: string;
}

/** Properties of the X509 component of a certificate. */
export interface X509CertificateProperties {
  /** The subject name. Should be a valid X509 distinguished Name. */
  subject?: string;
  /** The enhanced key usage. */
  ekus?: string[];
  /** The subject alternative names. */
  sans?: SubjectAlternativeNames;
  /** Defines how the certificate's key may be used. */
  key_usage?: KeyUsageType[];
  /** The duration that the certificate is valid in months. */
  validity_months?: number;
}

/** The subject alternate names of a X509 object. */
export interface SubjectAlternativeNames {
  /** Email addresses. */
  emails?: string[];
  /** Domain names. */
  dns_names?: string[];
  /** User principal names. */
  upns?: string[];
}

/**
 * Action and its trigger that will be performed by Key Vault over the lifetime of
 * a certificate.
 */
export interface LifetimeAction {
  /** The condition that will execute the action. */
  trigger?: Trigger;
  /** The action that will be executed. */
  action?: Action;
}

/** A condition to be satisfied for an action to be executed. */
export interface Trigger {
  /** Percentage of lifetime at which to trigger. Value should be between 1 and 99. */
  lifetime_percentage?: number;
  /**
   * Days before expiry to attempt renewal. Value should be between 1 and
   * validity_in_months multiplied by 27. If validity_in_months is 36, then value
   * should be between 1 and 972 (36 * 27).
   */
  days_before_expiry?: number;
}

/** The action that will be executed. */
export interface Action {
  /** The type of the action. */
  action_type?: ActionType;
}

/** Parameters for the issuer of the X509 component of a certificate. */
export interface IssuerParameters {
  /**
   * Name of the referenced issuer object or reserved names; for example, 'Self' or
   * 'Unknown'.
   */
  name?: string;
  /**
   * Certificate type as supported by the provider (optional); for example 'OV-SSL',
   * 'EV-SSL'
   */
  cty?: string;
  /**
   * Indicates if the certificates generated under this policy should be published
   * to certificate transparency logs.
   */
  cert_transparency?: boolean;
}

/** The contacts for the vault certificates. */
export interface Contacts {
  /** The contact list for the vault certificates. */
  contacts?: Array<Contact>;
}

/** The contact information for the vault certificates. */
export interface Contact {
  /** Email address. */
  email?: string;
  /** Name. */
  name?: string;
  /** Phone number. */
  phone?: string;
}

/** The certificate issuer set parameters. */
export interface CertificateIssuerSetParameters {
  /** The issuer provider. */
  provider: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentials;
  /** Details of the organization as provided to the issuer. */
  org_details?: OrganizationDetails;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributes;
}

/** The credentials to be used for the certificate issuer. */
export interface IssuerCredentials {
  /** The user name/account name/account id. */
  account_id?: string;
  /** The password/secret/account key. */
  pwd?: string;
}

/** Details of the organization of the certificate issuer. */
export interface OrganizationDetails {
  /** Id of the organization. */
  id?: string;
  /** Details of the organization administrator. */
  admin_details?: Array<AdministratorDetails>;
}

/** Details of the organization administrator of the certificate issuer. */
export interface AdministratorDetails {
  /** First name. */
  first_name?: string;
  /** Last name. */
  last_name?: string;
  /** Email address. */
  email?: string;
  /** Phone number. */
  phone?: string;
}

/** The attributes of an issuer managed by the Key Vault service. */
export interface IssuerAttributes {
  /** Determines whether the issuer is enabled. */
  enabled?: boolean;
}

/** The certificate issuer update parameters. */
export interface CertificateIssuerUpdateParameters {
  /** The issuer provider. */
  provider?: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentials;
  /** Details of the organization as provided to the issuer. */
  org_details?: OrganizationDetails;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributes;
}

/** The certificate create parameters. */
export interface CertificateCreateParameters {
  /** The management policy for the certificate. */
  policy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

/** The certificate import parameters. */
export interface CertificateImportParameters {
  /**
   * Base64 encoded representation of the certificate object to import. This
   * certificate needs to contain the private key.
   */
  value: string;
  /**
   * If the private key in base64EncodedCertificate is encrypted, the password used
   * for encryption.
   */
  pwd?: string;
  /** The management policy for the certificate. */
  policy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

/** The certificate update parameters. */
export interface CertificateUpdateParameters {
  /** The management policy for the certificate. */
  policy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

/** The certificate operation update parameters. */
export interface CertificateOperationUpdateParameter {
  /** Indicates if cancellation was requested on the certificate operation. */
  cancellation_requested: boolean;
}

/** The certificate merge parameters */
export interface CertificateMergeParameters {
  /** The certificate or the certificate chain to merge. */
  x5c: string[];
  /** The attributes of the certificate (optional). */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

/** The certificate restore parameters. */
export interface CertificateRestoreParameters {
  /** The backup blob associated with a certificate bundle. */
  value: string;
}

/** Alias for DeletionRecoveryLevel */
export type DeletionRecoveryLevel = string;
/** Alias for JsonWebKeyType */
export type JsonWebKeyType = string;
/** Alias for JsonWebKeyCurveName */
export type JsonWebKeyCurveName = string;
/** Alias for KeyUsageType */
export type KeyUsageType = string;
/** Alias for ActionType */
export type ActionType = string;
