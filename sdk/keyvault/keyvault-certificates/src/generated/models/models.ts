// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { serializeRecord } from "../helpers/serializerHelpers.js";
import { uint8ArrayToString } from "@azure/core-util";
import {
  CertificateAttributes as CertificateAttributesRest,
  CertificatePolicy as CertificatePolicyRest,
  KeyProperties as KeyPropertiesRest,
  SecretProperties as SecretPropertiesRest,
  X509CertificateProperties as X509CertificatePropertiesRest,
  SubjectAlternativeNames as SubjectAlternativeNamesRest,
  LifetimeAction as LifetimeActionRest,
  Trigger as TriggerRest,
  Action as ActionRest,
  IssuerParameters as IssuerParametersRest,
  Contacts as ContactsRest,
  Contact as ContactRest,
  CertificateIssuerSetParameters as CertificateIssuerSetParametersRest,
  IssuerCredentials as IssuerCredentialsRest,
  OrganizationDetails as OrganizationDetailsRest,
  AdministratorDetails as AdministratorDetailsRest,
  IssuerAttributes as IssuerAttributesRest,
  CertificateIssuerUpdateParameters as CertificateIssuerUpdateParametersRest,
  CertificateCreateParameters as CertificateCreateParametersRest,
  CertificateImportParameters as CertificateImportParametersRest,
  CertificateUpdateParameters as CertificateUpdateParametersRest,
  CertificateOperationUpdateParameter as CertificateOperationUpdateParameterRest,
  CertificateMergeParameters as CertificateMergeParametersRest,
  CertificateRestoreParameters as CertificateRestoreParametersRest,
} from "../rest/index.js";

/** The certificate item containing certificate metadata. */
export interface CertificateItem {
  /** Certificate identifier. */
  readonly id: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x509Thumbprint?: Uint8Array;
}

/** The certificate management attributes. */
export interface CertificateAttributes {
  /** Determines whether the object is enabled. */
  enabled?: boolean;
  /** Not before date in UTC. */
  notBefore?: Date;
  /** Expiry date in UTC. */
  expires?: Date;
  /** Creation time in UTC. */
  readonly created?: Date;
  /** Last updated time in UTC. */
  readonly updated?: Date;
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
  readonly recoveryLevel?: DeletionRecoveryLevel;
}

export function certificateAttributesSerializer(
  item: CertificateAttributes,
): CertificateAttributesRest {
  return {
    enabled: item["enabled"],
    nbf: item["notBefore"]?.getTime(),
    expires: item["expires"]?.getTime(),
  };
}

/**
 * Reflects the deletion recovery level currently in effect for certificates in
 * the current vault. If it contains 'Purgeable', the certificate can be
 * permanently deleted by a privileged user; otherwise, only the system can purge
 * the certificate, at the end of the retention interval.
 */
export type DeletionRecoveryLevel =
  | "Purgeable"
  | "Recoverable+Purgeable"
  | "Recoverable"
  | "Recoverable+ProtectedSubscription"
  | "CustomizedRecoverable+Purgeable"
  | "CustomizedRecoverable"
  | "CustomizedRecoverable+ProtectedSubscription";

/**
 * A Deleted Certificate consisting of its previous id, attributes and its tags,
 * as well as information on when it will be purged.
 */
export interface DeletedCertificateBundle {
  /** The certificate id. */
  readonly id?: string;
  /** The key id. */
  readonly kid?: string;
  /** The secret id. */
  readonly sid?: string;
  /** Thumbprint of the certificate. */
  readonly x509Thumbprint?: Uint8Array;
  /** The management policy. */
  readonly policy?: CertificatePolicy;
  /** CER contents of x509 certificate. */
  cer?: Uint8Array;
  /**
   * The content type of the secret. eg. 'application/x-pem-file' or
   * 'application/x-pkcs12',
   */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
  /**
   * The url of the recovery object, used to identify and recover the deleted
   * certificate.
   */
  recoveryId?: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: Date;
}

/** Management policy for a certificate. */
export interface CertificatePolicy {
  /** The certificate id. */
  readonly id?: string;
  /** Properties of the key backing a certificate. */
  keyProperties?: KeyProperties;
  /** Properties of the secret backing a certificate. */
  secretProperties?: SecretProperties;
  /** Properties of the X509 component of a certificate. */
  x509CertificateProperties?: X509CertificateProperties;
  /** Actions that will be performed by Key Vault over the lifetime of a certificate. */
  lifetimeActions?: LifetimeAction[];
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuerParameters?: IssuerParameters;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
}

export function certificatePolicySerializer(
  item: CertificatePolicy,
): CertificatePolicyRest {
  return {
    key_props: !item.keyProperties
      ? item.keyProperties
      : keyPropertiesSerializer(item.keyProperties),
    secret_props: !item.secretProperties
      ? item.secretProperties
      : secretPropertiesSerializer(item.secretProperties),
    x509_props: !item.x509CertificateProperties
      ? item.x509CertificateProperties
      : x509CertificatePropertiesSerializer(item.x509CertificateProperties),
    lifetime_actions:
      item["lifetimeActions"] === undefined
        ? item["lifetimeActions"]
        : item["lifetimeActions"].map(lifetimeActionSerializer),
    issuer: !item.issuerParameters
      ? item.issuerParameters
      : issuerParametersSerializer(item.issuerParameters),
    attributes: !item.attributes
      ? item.attributes
      : certificateAttributesSerializer(item.attributes),
  };
}

/** Properties of the key pair backing a certificate. */
export interface KeyProperties {
  /**
   * Indicates if the private key can be exported. Release policy must be provided
   * when creating the first version of an exportable key.
   */
  exportable?: boolean;
  /** The type of key pair to be used for the certificate. */
  keyType?: JsonWebKeyType;
  /** The key size in bits. For example: 2048, 3072, or 4096 for RSA. */
  keySize?: number;
  /** Indicates if the same key pair will be used on certificate renewal. */
  reuseKey?: boolean;
  /** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
  curve?: JsonWebKeyCurveName;
}

export function keyPropertiesSerializer(
  item: KeyProperties,
): KeyPropertiesRest {
  return {
    exportable: item["exportable"],
    kty: item["keyType"],
    key_size: item["keySize"],
    reuse_key: item["reuseKey"],
    crv: item["curve"],
  };
}

/** The type of key pair to be used for the certificate. */
export type JsonWebKeyType =
  | "EC"
  | "EC-HSM"
  | "RSA"
  | "RSA-HSM"
  | "oct"
  | "oct-HSM";
/** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
export type JsonWebKeyCurveName = "P-256" | "P-384" | "P-521" | "P-256K";

/** Properties of the key backing a certificate. */
export interface SecretProperties {
  /** The media type (MIME type). */
  contentType?: string;
}

export function secretPropertiesSerializer(
  item: SecretProperties,
): SecretPropertiesRest {
  return {
    contentType: item["contentType"],
  };
}

/** Properties of the X509 component of a certificate. */
export interface X509CertificateProperties {
  /** The subject name. Should be a valid X509 distinguished Name. */
  subject?: string;
  /** The enhanced key usage. */
  ekus?: string[];
  /** The subject alternative names. */
  subjectAlternativeNames?: SubjectAlternativeNames;
  /** Defines how the certificate's key may be used. */
  keyUsage?: KeyUsageType[];
  /** The duration that the certificate is valid in months. */
  validityInMonths?: number;
}

export function x509CertificatePropertiesSerializer(
  item: X509CertificateProperties,
): X509CertificatePropertiesRest {
  return {
    subject: item["subject"],
    ekus: item["ekus"],
    sans: !item.subjectAlternativeNames
      ? item.subjectAlternativeNames
      : subjectAlternativeNamesSerializer(item.subjectAlternativeNames),
    key_usage: item["keyUsage"],
    validity_months: item["validityInMonths"],
  };
}

/** The subject alternate names of a X509 object. */
export interface SubjectAlternativeNames {
  /** Email addresses. */
  emails?: string[];
  /** Domain names. */
  dnsNames?: string[];
  /** User principal names. */
  upns?: string[];
}

export function subjectAlternativeNamesSerializer(
  item: SubjectAlternativeNames,
): SubjectAlternativeNamesRest {
  return {
    emails: item["emails"],
    dns_names: item["dnsNames"],
    upns: item["upns"],
  };
}

/** Supported usages of a certificate key. */
export type KeyUsageType =
  | "digitalSignature"
  | "nonRepudiation"
  | "keyEncipherment"
  | "dataEncipherment"
  | "keyAgreement"
  | "keyCertSign"
  | "cRLSign"
  | "encipherOnly"
  | "decipherOnly";

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

export function lifetimeActionSerializer(
  item: LifetimeAction,
): LifetimeActionRest {
  return {
    trigger: !item.trigger ? item.trigger : triggerSerializer(item.trigger),
    action: !item.action ? item.action : actionSerializer(item.action),
  };
}

/** A condition to be satisfied for an action to be executed. */
export interface Trigger {
  /** Percentage of lifetime at which to trigger. Value should be between 1 and 99. */
  lifetimePercentage?: number;
  /**
   * Days before expiry to attempt renewal. Value should be between 1 and
   * validity_in_months multiplied by 27. If validity_in_months is 36, then value
   * should be between 1 and 972 (36 * 27).
   */
  daysBeforeExpiry?: number;
}

export function triggerSerializer(item: Trigger): TriggerRest {
  return {
    lifetime_percentage: item["lifetimePercentage"],
    days_before_expiry: item["daysBeforeExpiry"],
  };
}

/** The action that will be executed. */
export interface Action {
  /** The type of the action. */
  actionType?: ActionType;
}

export function actionSerializer(item: Action): ActionRest {
  return {
    action_type: item["actionType"],
  };
}

/** The type of the action. */
export type ActionType = "EmailContacts" | "AutoRenew";

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
  certificateType?: string;
  /**
   * Indicates if the certificates generated under this policy should be published
   * to certificate transparency logs.
   */
  certificateTransparency?: boolean;
}

export function issuerParametersSerializer(
  item: IssuerParameters,
): IssuerParametersRest {
  return {
    name: item["name"],
    cty: item["certificateType"],
    cert_transparency: item["certificateTransparency"],
  };
}

/** The contacts for the vault certificates. */
export interface Contacts {
  /** Identifier for the contacts collection. */
  readonly id?: string;
  /** The contact list for the vault certificates. */
  contactList?: Contact[];
}

export function contactsSerializer(item: Contacts): ContactsRest {
  return {
    contacts:
      item["contactList"] === undefined
        ? item["contactList"]
        : item["contactList"].map(contactSerializer),
  };
}

/** The contact information for the vault certificates. */
export interface Contact {
  /** Email address. */
  emailAddress?: string;
  /** Name. */
  name?: string;
  /** Phone number. */
  phone?: string;
}

export function contactSerializer(item: Contact): ContactRest {
  return {
    email: item["emailAddress"],
    name: item["name"],
    phone: item["phone"],
  };
}

/** The certificate issuer item containing certificate issuer metadata. */
export interface CertificateIssuerItem {
  /** Certificate Identifier. */
  readonly id: string;
  /** The issuer provider. */
  provider?: string;
}

/** The certificate issuer set parameters. */
export interface CertificateIssuerSetParameters {
  /** The issuer provider. */
  provider: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentials;
  /** Details of the organization as provided to the issuer. */
  organizationDetails?: OrganizationDetails;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributes;
}

export function certificateIssuerSetParametersSerializer(
  item: CertificateIssuerSetParameters,
): CertificateIssuerSetParametersRest {
  return {
    provider: item["provider"],
    credentials: !item.credentials
      ? item.credentials
      : issuerCredentialsSerializer(item.credentials),
    org_details: !item.organizationDetails
      ? item.organizationDetails
      : organizationDetailsSerializer(item.organizationDetails),
    attributes: !item.attributes
      ? item.attributes
      : issuerAttributesSerializer(item.attributes),
  };
}

/** The credentials to be used for the certificate issuer. */
export interface IssuerCredentials {
  /** The user name/account name/account id. */
  accountId?: string;
  /** The password/secret/account key. */
  password?: string;
}

export function issuerCredentialsSerializer(
  item: IssuerCredentials,
): IssuerCredentialsRest {
  return {
    account_id: item["accountId"],
    pwd: item["password"],
  };
}

/** Details of the organization of the certificate issuer. */
export interface OrganizationDetails {
  /** Id of the organization. */
  id?: string;
  /** Details of the organization administrator. */
  adminDetails?: AdministratorDetails[];
}

export function organizationDetailsSerializer(
  item: OrganizationDetails,
): OrganizationDetailsRest {
  return {
    id: item["id"],
    admin_details:
      item["adminDetails"] === undefined
        ? item["adminDetails"]
        : item["adminDetails"].map(administratorDetailsSerializer),
  };
}

/** Details of the organization administrator of the certificate issuer. */
export interface AdministratorDetails {
  /** First name. */
  firstName?: string;
  /** Last name. */
  lastName?: string;
  /** Email address. */
  emailAddress?: string;
  /** Phone number. */
  phone?: string;
}

export function administratorDetailsSerializer(
  item: AdministratorDetails,
): AdministratorDetailsRest {
  return {
    first_name: item["firstName"],
    last_name: item["lastName"],
    email: item["emailAddress"],
    phone: item["phone"],
  };
}

/** The attributes of an issuer managed by the Key Vault service. */
export interface IssuerAttributes {
  /** Determines whether the issuer is enabled. */
  enabled?: boolean;
  /** Creation time in UTC. */
  readonly created?: Date;
  /** Last updated time in UTC. */
  readonly updated?: Date;
}

export function issuerAttributesSerializer(
  item: IssuerAttributes,
): IssuerAttributesRest {
  return {
    enabled: item["enabled"],
  };
}

/** The issuer for Key Vault certificate. */
export interface IssuerBundle {
  /** Identifier for the issuer object. */
  readonly id?: string;
  /** The issuer provider. */
  provider?: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentials;
  /** Details of the organization as provided to the issuer. */
  organizationDetails?: OrganizationDetails;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributes;
}

/** The certificate issuer update parameters. */
export interface CertificateIssuerUpdateParameters {
  /** The issuer provider. */
  provider?: string;
  /** The credentials to be used for the issuer. */
  credentials?: IssuerCredentials;
  /** Details of the organization as provided to the issuer. */
  organizationDetails?: OrganizationDetails;
  /** Attributes of the issuer object. */
  attributes?: IssuerAttributes;
}

export function certificateIssuerUpdateParametersSerializer(
  item: CertificateIssuerUpdateParameters,
): CertificateIssuerUpdateParametersRest {
  return {
    provider: item["provider"],
    credentials: !item.credentials
      ? item.credentials
      : issuerCredentialsSerializer(item.credentials),
    org_details: !item.organizationDetails
      ? item.organizationDetails
      : organizationDetailsSerializer(item.organizationDetails),
    attributes: !item.attributes
      ? item.attributes
      : issuerAttributesSerializer(item.attributes),
  };
}

/** The certificate create parameters. */
export interface CertificateCreateParameters {
  /** The management policy for the certificate. */
  certificatePolicy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  certificateAttributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function certificateCreateParametersSerializer(
  item: CertificateCreateParameters,
): CertificateCreateParametersRest {
  return {
    policy: !item.certificatePolicy
      ? item.certificatePolicy
      : certificatePolicySerializer(item.certificatePolicy),
    attributes: !item.certificateAttributes
      ? item.certificateAttributes
      : certificateAttributesSerializer(item.certificateAttributes),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** A certificate operation is returned in case of asynchronous requests. */
export interface CertificateOperation {
  /** The certificate id. */
  readonly id?: string;
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuerParameters?: IssuerParameters;
  /**
   * The certificate signing request (CSR) that is being used in the certificate
   * operation.
   */
  csr?: Uint8Array;
  /** Indicates if cancellation was requested on the certificate operation. */
  cancellationRequested?: boolean;
  /** Status of the certificate operation. */
  status?: string;
  /** The status details of the certificate operation. */
  statusDetails?: string;
  /** Error encountered, if any, during the certificate operation. */
  error?: ErrorModel;
  /** Location which contains the result of the certificate operation. */
  target?: string;
  /** Identifier for the certificate operation. */
  requestId?: string;
}

/** The key vault server error. */
export interface ErrorModel {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The key vault server error. */
  readonly innerError?: ErrorModel;
}

/** The certificate import parameters. */
export interface CertificateImportParameters {
  /**
   * Base64 encoded representation of the certificate object to import. This
   * certificate needs to contain the private key.
   */
  base64EncodedCertificate: string;
  /**
   * If the private key in base64EncodedCertificate is encrypted, the password used
   * for encryption.
   */
  password?: string;
  /** The management policy for the certificate. */
  certificatePolicy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  certificateAttributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function certificateImportParametersSerializer(
  item: CertificateImportParameters,
): CertificateImportParametersRest {
  return {
    value: item["base64EncodedCertificate"],
    pwd: item["password"],
    policy: !item.certificatePolicy
      ? item.certificatePolicy
      : certificatePolicySerializer(item.certificatePolicy),
    attributes: !item.certificateAttributes
      ? item.certificateAttributes
      : certificateAttributesSerializer(item.certificateAttributes),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** A certificate bundle consists of a certificate (X509) plus its attributes. */
export interface CertificateBundle {
  /** The certificate id. */
  readonly id?: string;
  /** The key id. */
  readonly kid?: string;
  /** The secret id. */
  readonly sid?: string;
  /** Thumbprint of the certificate. */
  readonly x509Thumbprint?: Uint8Array;
  /** The management policy. */
  readonly policy?: CertificatePolicy;
  /** CER contents of x509 certificate. */
  cer?: Uint8Array;
  /**
   * The content type of the secret. eg. 'application/x-pem-file' or
   * 'application/x-pkcs12',
   */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
}

/** The certificate list result. */
export interface _CertificateListResult {
  /** The CertificateItem items on this page */
  value: CertificateItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The certificate update parameters. */
export interface CertificateUpdateParameters {
  /** The management policy for the certificate. */
  certificatePolicy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  certificateAttributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function certificateUpdateParametersSerializer(
  item: CertificateUpdateParameters,
): CertificateUpdateParametersRest {
  return {
    policy: !item.certificatePolicy
      ? item.certificatePolicy
      : certificatePolicySerializer(item.certificatePolicy),
    attributes: !item.certificateAttributes
      ? item.certificateAttributes
      : certificateAttributesSerializer(item.certificateAttributes),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The certificate operation update parameters. */
export interface CertificateOperationUpdateParameter {
  /** Indicates if cancellation was requested on the certificate operation. */
  cancellationRequested: boolean;
}

export function certificateOperationUpdateParameterSerializer(
  item: CertificateOperationUpdateParameter,
): CertificateOperationUpdateParameterRest {
  return {
    cancellation_requested: item["cancellationRequested"],
  };
}

/** The certificate merge parameters */
export interface CertificateMergeParameters {
  /** The certificate or the certificate chain to merge. */
  x509Certificates: Uint8Array[];
  /** The attributes of the certificate (optional). */
  certificateAttributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function certificateMergeParametersSerializer(
  item: CertificateMergeParameters,
): CertificateMergeParametersRest {
  return {
    x5c: item["x509Certificates"].map((p) => uint8ArrayToString(p, "base64")),
    attributes: !item.certificateAttributes
      ? item.certificateAttributes
      : certificateAttributesSerializer(item.certificateAttributes),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The backup certificate result, containing the backup blob. */
export interface BackupCertificateResult {
  /** The backup blob containing the backed up certificate. */
  value?: Uint8Array;
}

/** The certificate restore parameters. */
export interface CertificateRestoreParameters {
  /** The backup blob associated with a certificate bundle. */
  certificateBundleBackup: Uint8Array;
}

export function certificateRestoreParametersSerializer(
  item: CertificateRestoreParameters,
): CertificateRestoreParametersRest {
  return {
    value: uint8ArrayToString(item["certificateBundleBackup"], "base64"),
  };
}

/** The deleted certificate item containing metadata about the deleted certificate. */
export interface DeletedCertificateItem {
  /** Certificate identifier. */
  readonly id: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x509Thumbprint?: Uint8Array;
  /**
   * The url of the recovery object, used to identify and recover the deleted
   * certificate.
   */
  recoveryId: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: Date;
}

/** The available API versions. */
export type Versions = "7.6-preview.1";

/** Paged collection of CertificateItem items */
export interface _PagedCertificateItem {
  /** The CertificateItem items on this page */
  value: CertificateItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of CertificateIssuerItem items */
export interface _PagedCertificateIssuerItem {
  /** The CertificateIssuerItem items on this page */
  value: CertificateIssuerItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of DeletedCertificateItem items */
export interface _PagedDeletedCertificateItem {
  /** The DeletedCertificateItem items on this page */
  value: DeletedCertificateItem[];
  /** The link to the next page of items */
  nextLink?: string;
}
