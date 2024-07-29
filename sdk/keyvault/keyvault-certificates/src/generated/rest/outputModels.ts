// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Paged } from "@azure/core-paging";

/** The certificate item containing certificate metadata. */
export interface CertificateItemOutput {
  /** Certificate identifier. */
  readonly id: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributesOutput;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x5t?: string;
}

/** The certificate management attributes. */
export interface CertificateAttributesOutput {
  /** Determines whether the object is enabled. */
  enabled?: boolean;
  /** Not before date in UTC. */
  nbf?: number;
  /** Expiry date in UTC. */
  expires?: number;
  /** Creation time in UTC. */
  readonly created?: number;
  /** Last updated time in UTC. */
  readonly updated?: number;
  /**
   * softDelete data retention days. Value should be >=7 and <=90 when softDelete
   * enabled, otherwise 0.
   */
  readonly recoverableDays?: number;
  /**
   * Reflects the deletion recovery level currently in effect for certificates in
   * the current vault. If it contains 'Purgeable', the certificate can be
   * permanently deleted by a privileged user; otherwise, only the system can purge
   * the certificate, at the end of the retention interval.
   */
  readonly recoveryLevel?: DeletionRecoveryLevelOutput;
}

/**
 * A Deleted Certificate consisting of its previous id, attributes and its tags,
 * as well as information on when it will be purged.
 */
export interface DeletedCertificateBundleOutput {
  /** The certificate id. */
  readonly id?: string;
  /** The key id. */
  readonly kid?: string;
  /** The secret id. */
  readonly sid?: string;
  /** Thumbprint of the certificate. */
  readonly x5t?: string;
  /** The management policy. */
  readonly policy?: CertificatePolicyOutput;
  /** CER contents of x509 certificate. */
  cer?: string;
  /**
   * The content type of the secret. eg. 'application/x-pem-file' or
   * 'application/x-pkcs12',
   */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributesOutput;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
  /**
   * The url of the recovery object, used to identify and recover the deleted
   * certificate.
   */
  recoveryId?: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: number;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: number;
}

/** Management policy for a certificate. */
export interface CertificatePolicyOutput {
  /** The certificate id. */
  readonly id?: string;
  /** Properties of the key backing a certificate. */
  key_props?: KeyPropertiesOutput;
  /** Properties of the secret backing a certificate. */
  secret_props?: SecretPropertiesOutput;
  /** Properties of the X509 component of a certificate. */
  x509_props?: X509CertificatePropertiesOutput;
  /** Actions that will be performed by Key Vault over the lifetime of a certificate. */
  lifetime_actions?: Array<LifetimeActionOutput>;
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuer?: IssuerParametersOutput;
  /** The certificate attributes. */
  attributes?: CertificateAttributesOutput;
}

/** Properties of the key pair backing a certificate. */
export interface KeyPropertiesOutput {
  /**
   * Indicates if the private key can be exported. Release policy must be provided
   * when creating the first version of an exportable key.
   */
  exportable?: boolean;
  /** The type of key pair to be used for the certificate. */
  kty?: JsonWebKeyTypeOutput;
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. */
  key_size?: number;
  /** Indicates if the same key pair will be used on certificate renewal. */
  reuse_key?: boolean;
  /** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
  crv?: JsonWebKeyCurveNameOutput;
}

/** Properties of the key backing a certificate. */
export interface SecretPropertiesOutput {
  /** The media type (MIME type). */
  contentType?: string;
}

/** Properties of the X509 component of a certificate. */
export interface X509CertificatePropertiesOutput {
  /** The subject name. Should be a valid X509 distinguished Name. */
  subject?: string;
  /** The enhanced key usage. */
  ekus?: string[];
  /** The subject alternative names. */
  sans?: SubjectAlternativeNamesOutput;
  /** Defines how the certificate's key may be used. */
  key_usage?: KeyUsageTypeOutput[];
  /** The duration that the certificate is valid in months. */
  validity_months?: number;
}

/** The subject alternate names of a X509 object. */
export interface SubjectAlternativeNamesOutput {
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
export interface LifetimeActionOutput {
  /** The condition that will execute the action. */
  trigger?: TriggerOutput;
  /** The action that will be executed. */
  action?: ActionOutput;
}

/** A condition to be satisfied for an action to be executed. */
export interface TriggerOutput {
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
export interface ActionOutput {
  /** The type of the action. */
  action_type?: ActionTypeOutput;
}

/** Parameters for the issuer of the X509 component of a certificate. */
export interface IssuerParametersOutput {
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
export interface ContactsOutput {
  /** Identifier for the contacts collection. */
  readonly id?: string;
  /** The contact list for the vault certificates. */
  contacts?: Array<ContactOutput>;
}

/** The contact information for the vault certificates. */
export interface ContactOutput {
  /** Email address. */
  email?: string;
  /** Name. */
  name?: string;
  /** Phone number. */
  phone?: string;
}

/** The certificate issuer item containing certificate issuer metadata. */
export interface CertificateIssuerItemOutput {
  /** Certificate Identifier. */
  readonly id: string;
  /** The issuer provider. */
  provider?: string;
}

/** The credentials to be used for the certificate issuer. */
export interface IssuerCredentialsOutput {
  /** The user name/account name/account id. */
  account_id?: string;
  /** The password/secret/account key. */
  pwd?: string;
}

/** Details of the organization of the certificate issuer. */
export interface OrganizationDetailsOutput {
  /** Id of the organization. */
  id?: string;
  /** Details of the organization administrator. */
  admin_details?: Array<AdministratorDetailsOutput>;
}

/** Details of the organization administrator of the certificate issuer. */
export interface AdministratorDetailsOutput {
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
export interface IssuerAttributesOutput {
  /** Determines whether the issuer is enabled. */
  enabled?: boolean;
  /** Creation time in UTC. */
  readonly created?: number;
  /** Last updated time in UTC. */
  readonly updated?: number;
}

/** The issuer for Key Vault certificate. */
export interface IssuerBundleOutput {
  /** Identifier for the issuer object. */
  readonly id?: string;
  /** The issuer provider. */
  provider?: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentialsOutput;
  /** Details of the organization as provided to the issuer. */
  org_details?: OrganizationDetailsOutput;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributesOutput;
}

/** A certificate operation is returned in case of asynchronous requests. */
export interface CertificateOperationOutput {
  /** The certificate id. */
  readonly id?: string;
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuer?: IssuerParametersOutput;
  /**
   * The certificate signing request (CSR) that is being used in the certificate
   * operation.
   */
  csr?: string;
  /** Indicates if cancellation was requested on the certificate operation. */
  cancellation_requested?: boolean;
  /** Status of the certificate operation. */
  status?: string;
  /** The status details of the certificate operation. */
  status_details?: string;
  /** Error encountered, if any, during the certificate operation. */
  error?: ErrorModelOutput;
  /** Location which contains the result of the certificate operation. */
  target?: string;
  /** Identifier for the certificate operation. */
  request_id?: string;
}

/** The key vault server error. */
export interface ErrorModelOutput {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The key vault server error. */
  readonly innererror?: ErrorModelOutput;
}

/** A certificate bundle consists of a certificate (X509) plus its attributes. */
export interface CertificateBundleOutput {
  /** The certificate id. */
  readonly id?: string;
  /** The key id. */
  readonly kid?: string;
  /** The secret id. */
  readonly sid?: string;
  /** Thumbprint of the certificate. */
  readonly x5t?: string;
  /** The management policy. */
  readonly policy?: CertificatePolicyOutput;
  /** CER contents of x509 certificate. */
  cer?: string;
  /**
   * The content type of the secret. eg. 'application/x-pem-file' or
   * 'application/x-pkcs12',
   */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributesOutput;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
}

/** The backup certificate result, containing the backup blob. */
export interface BackupCertificateResultOutput {
  /** The backup blob containing the backed up certificate. */
  value?: string;
}

/** The deleted certificate item containing metadata about the deleted certificate. */
export interface DeletedCertificateItemOutput {
  /** Certificate identifier. */
  readonly id: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributesOutput;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x5t?: string;
  /**
   * The url of the recovery object, used to identify and recover the deleted
   * certificate.
   */
  recoveryId: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: number;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: number;
}

/** Paged collection of CertificateItem items */
export type PagedCertificateItemOutput = Paged<CertificateItemOutput>;
/** Alias for DeletionRecoveryLevelOutput */
export type DeletionRecoveryLevelOutput = string;
/** Alias for JsonWebKeyTypeOutput */
export type JsonWebKeyTypeOutput = string;
/** Alias for JsonWebKeyCurveNameOutput */
export type JsonWebKeyCurveNameOutput = string;
/** Alias for KeyUsageTypeOutput */
export type KeyUsageTypeOutput = string;
/** Alias for ActionTypeOutput */
export type ActionTypeOutput = string;
/** Paged collection of CertificateIssuerItem items */
export type PagedCertificateIssuerItemOutput =
  Paged<CertificateIssuerItemOutput>;
/** The certificate list result. */
export type CertificateListResultOutput = Paged<CertificateItemOutput>;
/** Paged collection of DeletedCertificateItem items */
export type PagedDeletedCertificateItemOutput =
  Paged<DeletedCertificateItemOutput>;
