// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

/** The certificate list result. */
export interface _CertificateListResult {
  /** A response message containing a list of certificates in the key vault along with a link to the next page of certificates. */
  value?: CertificateItem[];
  /** The URL to get the next set of certificates. */
  readonly nextLink?: string;
}

export function _certificateListResultDeserializer(item: any): _CertificateListResult {
  return {
    value: !item["value"] ? item["value"] : certificateItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateItemArrayDeserializer(result: Array<CertificateItem>): any[] {
  return result.map((item) => {
    return certificateItemDeserializer(item);
  });
}

/** The certificate item containing certificate metadata. */
export interface CertificateItem {
  /** Certificate identifier. */
  id?: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x509Thumbprint?: Uint8Array;
}

export function certificateItemDeserializer(item: any): CertificateItem {
  return {
    id: item["id"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    x509Thumbprint: !item["x5t"]
      ? item["x5t"]
      : typeof item["x5t"] === "string"
        ? stringToUint8Array(item["x5t"], "base64url")
        : item["x5t"],
  };
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
  /** softDelete data retention days. Value should be >=7 and <=90 when softDelete enabled, otherwise 0. */
  readonly recoverableDays?: number;
  /** Reflects the deletion recovery level currently in effect for certificates in the current vault. If it contains 'Purgeable', the certificate can be permanently deleted by a privileged user; otherwise, only the system can purge the certificate, at the end of the retention interval. */
  readonly recoveryLevel?: DeletionRecoveryLevel;
}

export function certificateAttributesSerializer(item: CertificateAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: !item["notBefore"] ? item["notBefore"] : (item["notBefore"].getTime() / 1000) | 0,
    exp: !item["expires"] ? item["expires"] : (item["expires"].getTime() / 1000) | 0,
  };
}

export function certificateAttributesDeserializer(item: any): CertificateAttributes {
  return {
    enabled: item["enabled"],
    notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
    expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
    created: !item["created"] ? item["created"] : new Date(item["created"] * 1000),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"] * 1000),
    recoverableDays: item["recoverableDays"],
    recoveryLevel: item["recoveryLevel"],
  };
}

/** Reflects the deletion recovery level currently in effect for secrets in the current vault. If it contains 'Purgeable', the secret can be permanently deleted by a privileged user; otherwise, only the system can purge the secret, at the end of the retention interval. */
export enum KnownDeletionRecoveryLevel {
  /** Denotes a vault state in which deletion is an irreversible operation, without the possibility for recovery. This level corresponds to no protection being available against a Delete operation; the data is irretrievably lost upon accepting a Delete operation at the entity level or higher (vault, resource group, subscription etc.) */
  Purgeable = "Purgeable",
  /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days), unless a Purge operation is requested, or the subscription is cancelled. System wil permanently delete it after 90 days, if not recovered */
  RecoverablePurgeable = "Recoverable+Purgeable",
  /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days) and while the subscription is still available. System wil permanently delete it after 90 days, if not recovered */
  Recoverable = "Recoverable",
  /** Denotes a vault and subscription state in which deletion is recoverable within retention interval (90 days), immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself  cannot be permanently canceled. System wil permanently delete it after 90 days, if not recovered */
  RecoverableProtectedSubscription = "Recoverable+ProtectedSubscription",
  /** Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90). This level guarantees the recoverability of the deleted entity during the retention interval, unless a Purge operation is requested, or the subscription is cancelled. */
  CustomizedRecoverablePurgeable = "CustomizedRecoverable+Purgeable",
  /** Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90).This level guarantees the recoverability of the deleted entity during the retention interval and while the subscription is still available. */
  CustomizedRecoverable = "CustomizedRecoverable",
  /** Denotes a vault and subscription state in which deletion is recoverable, immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself cannot be permanently canceled when 7 <= SoftDeleteRetentionInDays < 90. This level guarantees the recoverability of the deleted entity during the retention interval, and also reflects the fact that the subscription itself cannot be cancelled. */
  CustomizedRecoverableProtectedSubscription = "CustomizedRecoverable+ProtectedSubscription",
}

/**
 * Reflects the deletion recovery level currently in effect for secrets in the current vault. If it contains 'Purgeable', the secret can be permanently deleted by a privileged user; otherwise, only the system can purge the secret, at the end of the retention interval. \
 * {@link KnownDeletionRecoveryLevel} can be used interchangeably with DeletionRecoveryLevel,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **Purgeable**: Denotes a vault state in which deletion is an irreversible operation, without the possibility for recovery. This level corresponds to no protection being available against a Delete operation; the data is irretrievably lost upon accepting a Delete operation at the entity level or higher (vault, resource group, subscription etc.) \
 * **Recoverable+Purgeable**: Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days), unless a Purge operation is requested, or the subscription is cancelled. System wil permanently delete it after 90 days, if not recovered \
 * **Recoverable**: Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge). This level guarantees the recoverability of the deleted entity during the retention interval (90 days) and while the subscription is still available. System wil permanently delete it after 90 days, if not recovered \
 * **Recoverable+ProtectedSubscription**: Denotes a vault and subscription state in which deletion is recoverable within retention interval (90 days), immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself  cannot be permanently canceled. System wil permanently delete it after 90 days, if not recovered \
 * **CustomizedRecoverable+Purgeable**: Denotes a vault state in which deletion is recoverable, and which also permits immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90). This level guarantees the recoverability of the deleted entity during the retention interval, unless a Purge operation is requested, or the subscription is cancelled. \
 * **CustomizedRecoverable**: Denotes a vault state in which deletion is recoverable without the possibility for immediate and permanent deletion (i.e. purge when 7 <= SoftDeleteRetentionInDays < 90).This level guarantees the recoverability of the deleted entity during the retention interval and while the subscription is still available. \
 * **CustomizedRecoverable+ProtectedSubscription**: Denotes a vault and subscription state in which deletion is recoverable, immediate and permanent deletion (i.e. purge) is not permitted, and in which the subscription itself cannot be permanently canceled when 7 <= SoftDeleteRetentionInDays < 90. This level guarantees the recoverability of the deleted entity during the retention interval, and also reflects the fact that the subscription itself cannot be cancelled.
 */
export type DeletionRecoveryLevel = string;

/** The key vault error exception. */
export interface KeyVaultError {
  /** The key vault server error. */
  readonly error?: ErrorModel;
}

export function keyVaultErrorDeserializer(item: any): KeyVaultError {
  return {
    error: !item["error"] ? item["error"] : _keyVaultErrorErrorDeserializer(item["error"]),
  };
}

/** Alias for ErrorModel */
export type ErrorModel = {
  code?: string;
  message?: string;
  innerError?: ErrorModel;
} | null;

/** model interface _KeyVaultErrorError */
export interface _KeyVaultErrorError {
  /** The error code. */
  readonly code?: string;
  /** The error message. */
  readonly message?: string;
  /** The key vault server error. */
  readonly innerError?: ErrorModel;
}

export function _keyVaultErrorErrorDeserializer(item: any): _KeyVaultErrorError {
  return {
    code: item["code"],
    message: item["message"],
    innerError: !item["innererror"]
      ? item["innererror"]
      : _keyVaultErrorErrorDeserializer(item["innererror"]),
  };
}

/** A Deleted Certificate consisting of its previous id, attributes and its tags, as well as information on when it will be purged. */
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
  /** The content type of the secret. eg. 'application/x-pem-file' or 'application/x-pkcs12', */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
  /** Specifies whether the certificate chain preserves its original order. The default value is false, which sets the leaf certificate at index 0. */
  preserveCertOrder?: boolean;
  /** The url of the recovery object, used to identify and recover the deleted certificate. */
  recoveryId?: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: Date;
}

export function deletedCertificateBundleDeserializer(item: any): DeletedCertificateBundle {
  return {
    id: item["id"],
    kid: item["kid"],
    sid: item["sid"],
    x509Thumbprint: !item["x5t"]
      ? item["x5t"]
      : typeof item["x5t"] === "string"
        ? stringToUint8Array(item["x5t"], "base64url")
        : item["x5t"],
    policy: !item["policy"] ? item["policy"] : certificatePolicyDeserializer(item["policy"]),
    cer: !item["cer"]
      ? item["cer"]
      : typeof item["cer"] === "string"
        ? stringToUint8Array(item["cer"], "base64")
        : item["cer"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    preserveCertOrder: item["preserveCertOrder"],
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"] ? item["deletedDate"] : new Date(item["deletedDate"] * 1000),
  };
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

export function certificatePolicySerializer(item: CertificatePolicy): any {
  return {
    key_props: !item["keyProperties"]
      ? item["keyProperties"]
      : keyPropertiesSerializer(item["keyProperties"]),
    secret_props: !item["secretProperties"]
      ? item["secretProperties"]
      : secretPropertiesSerializer(item["secretProperties"]),
    x509_props: !item["x509CertificateProperties"]
      ? item["x509CertificateProperties"]
      : x509CertificatePropertiesSerializer(item["x509CertificateProperties"]),
    lifetime_actions: !item["lifetimeActions"]
      ? item["lifetimeActions"]
      : lifetimeActionArraySerializer(item["lifetimeActions"]),
    issuer: !item["issuerParameters"]
      ? item["issuerParameters"]
      : issuerParametersSerializer(item["issuerParameters"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesSerializer(item["attributes"]),
  };
}

export function certificatePolicyDeserializer(item: any): CertificatePolicy {
  return {
    id: item["id"],
    keyProperties: !item["key_props"]
      ? item["key_props"]
      : keyPropertiesDeserializer(item["key_props"]),
    secretProperties: !item["secret_props"]
      ? item["secret_props"]
      : secretPropertiesDeserializer(item["secret_props"]),
    x509CertificateProperties: !item["x509_props"]
      ? item["x509_props"]
      : x509CertificatePropertiesDeserializer(item["x509_props"]),
    lifetimeActions: !item["lifetime_actions"]
      ? item["lifetime_actions"]
      : lifetimeActionArrayDeserializer(item["lifetime_actions"]),
    issuerParameters: !item["issuer"]
      ? item["issuer"]
      : issuerParametersDeserializer(item["issuer"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesDeserializer(item["attributes"]),
  };
}

/** Properties of the key pair backing a certificate. */
export interface KeyProperties {
  /** Indicates if the private key can be exported. Release policy must be provided when creating the first version of an exportable key. */
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

export function keyPropertiesSerializer(item: KeyProperties): any {
  return {
    exportable: item["exportable"],
    kty: item["keyType"],
    key_size: item["keySize"],
    reuse_key: item["reuseKey"],
    crv: item["curve"],
  };
}

export function keyPropertiesDeserializer(item: any): KeyProperties {
  return {
    exportable: item["exportable"],
    keyType: item["kty"],
    keySize: item["key_size"],
    reuseKey: item["reuse_key"],
    curve: item["crv"],
  };
}

/** The type of key pair to be used for the certificate. */
export enum KnownJsonWebKeyType {
  /** Elliptic Curve. */
  EC = "EC",
  /** Elliptic Curve with a private key which is not exportable from the HSM. */
  ECHSM = "EC-HSM",
  /** RSA (https://tools.ietf.org/html/rfc3447). */
  RSA = "RSA",
  /** RSA with a private key which is not exportable from the HSM. */
  RSAHSM = "RSA-HSM",
  /** Octet sequence (used to represent symmetric keys). */
  Oct = "oct",
  /** Octet sequence with a private key which is not exportable from the HSM. */
  OctHSM = "oct-HSM",
}

/**
 * The type of key pair to be used for the certificate. \
 * {@link KnownJsonWebKeyType} can be used interchangeably with JsonWebKeyType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **EC**: Elliptic Curve. \
 * **EC-HSM**: Elliptic Curve with a private key which is not exportable from the HSM. \
 * **RSA**: RSA (https:\//tools.ietf.org\/html\/rfc3447). \
 * **RSA-HSM**: RSA with a private key which is not exportable from the HSM. \
 * **oct**: Octet sequence (used to represent symmetric keys). \
 * **oct-HSM**: Octet sequence with a private key which is not exportable from the HSM.
 */
export type JsonWebKeyType = string;

/** Elliptic curve name. For valid values, see JsonWebKeyCurveName. */
export enum KnownJsonWebKeyCurveName {
  /** The NIST P-256 elliptic curve, AKA SECG curve SECP256R1. */
  P256 = "P-256",
  /** The NIST P-384 elliptic curve, AKA SECG curve SECP384R1. */
  P384 = "P-384",
  /** The NIST P-521 elliptic curve, AKA SECG curve SECP521R1. */
  P521 = "P-521",
  /** The SECG SECP256K1 elliptic curve. */
  P256K = "P-256K",
}

/**
 * Elliptic curve name. For valid values, see JsonWebKeyCurveName. \
 * {@link KnownJsonWebKeyCurveName} can be used interchangeably with JsonWebKeyCurveName,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **P-256**: The NIST P-256 elliptic curve, AKA SECG curve SECP256R1. \
 * **P-384**: The NIST P-384 elliptic curve, AKA SECG curve SECP384R1. \
 * **P-521**: The NIST P-521 elliptic curve, AKA SECG curve SECP521R1. \
 * **P-256K**: The SECG SECP256K1 elliptic curve.
 */
export type JsonWebKeyCurveName = string;

/** Properties of the key backing a certificate. */
export interface SecretProperties {
  /** The media type (MIME type). */
  contentType?: string;
}

export function secretPropertiesSerializer(item: SecretProperties): any {
  return { contentType: item["contentType"] };
}

export function secretPropertiesDeserializer(item: any): SecretProperties {
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

export function x509CertificatePropertiesSerializer(item: X509CertificateProperties): any {
  return {
    subject: item["subject"],
    ekus: !item["ekus"]
      ? item["ekus"]
      : item["ekus"].map((p: any) => {
          return p;
        }),
    sans: !item["subjectAlternativeNames"]
      ? item["subjectAlternativeNames"]
      : subjectAlternativeNamesSerializer(item["subjectAlternativeNames"]),
    key_usage: !item["keyUsage"]
      ? item["keyUsage"]
      : item["keyUsage"].map((p: any) => {
          return p;
        }),
    validity_months: item["validityInMonths"],
  };
}

export function x509CertificatePropertiesDeserializer(item: any): X509CertificateProperties {
  return {
    subject: item["subject"],
    ekus: !item["ekus"]
      ? item["ekus"]
      : item["ekus"].map((p: any) => {
          return p;
        }),
    subjectAlternativeNames: !item["sans"]
      ? item["sans"]
      : subjectAlternativeNamesDeserializer(item["sans"]),
    keyUsage: !item["key_usage"]
      ? item["key_usage"]
      : item["key_usage"].map((p: any) => {
          return p;
        }),
    validityInMonths: item["validity_months"],
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

export function subjectAlternativeNamesSerializer(item: SubjectAlternativeNames): any {
  return {
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
    dns_names: !item["dnsNames"]
      ? item["dnsNames"]
      : item["dnsNames"].map((p: any) => {
          return p;
        }),
    upns: !item["upns"]
      ? item["upns"]
      : item["upns"].map((p: any) => {
          return p;
        }),
  };
}

export function subjectAlternativeNamesDeserializer(item: any): SubjectAlternativeNames {
  return {
    emails: !item["emails"]
      ? item["emails"]
      : item["emails"].map((p: any) => {
          return p;
        }),
    dnsNames: !item["dns_names"]
      ? item["dns_names"]
      : item["dns_names"].map((p: any) => {
          return p;
        }),
    upns: !item["upns"]
      ? item["upns"]
      : item["upns"].map((p: any) => {
          return p;
        }),
  };
}

/** Supported usages of a certificate key. */
export enum KnownKeyUsageType {
  /** Indicates that the certificate key can be used as a digital signature. */
  DigitalSignature = "digitalSignature",
  /** Indicates that the certificate key can be used for authentication. */
  NonRepudiation = "nonRepudiation",
  /** Indicates that the certificate key can be used for key encryption. */
  KeyEncipherment = "keyEncipherment",
  /** Indicates that the certificate key can be used for data encryption. */
  DataEncipherment = "dataEncipherment",
  /** Indicates that the certificate key can be used to determine key agreement, such as a key created using the Diffie-Hellman key agreement algorithm. */
  KeyAgreement = "keyAgreement",
  /** Indicates that the certificate key can be used to sign certificates. */
  KeyCertSign = "keyCertSign",
  /** Indicates that the certificate key can be used to sign a certificate revocation list. */
  CRLSign = "cRLSign",
  /** Indicates that the certificate key can be used for encryption only. */
  EncipherOnly = "encipherOnly",
  /** Indicates that the certificate key can be used for decryption only. */
  DecipherOnly = "decipherOnly",
}

/**
 * Supported usages of a certificate key. \
 * {@link KnownKeyUsageType} can be used interchangeably with KeyUsageType,
 *  this enum contains the known values that the service supports.
 * ### Known values supported by the service
 * **digitalSignature**: Indicates that the certificate key can be used as a digital signature. \
 * **nonRepudiation**: Indicates that the certificate key can be used for authentication. \
 * **keyEncipherment**: Indicates that the certificate key can be used for key encryption. \
 * **dataEncipherment**: Indicates that the certificate key can be used for data encryption. \
 * **keyAgreement**: Indicates that the certificate key can be used to determine key agreement, such as a key created using the Diffie-Hellman key agreement algorithm. \
 * **keyCertSign**: Indicates that the certificate key can be used to sign certificates. \
 * **cRLSign**: Indicates that the certificate key can be used to sign a certificate revocation list. \
 * **encipherOnly**: Indicates that the certificate key can be used for encryption only. \
 * **decipherOnly**: Indicates that the certificate key can be used for decryption only.
 */
export type KeyUsageType = string;

export function lifetimeActionArraySerializer(result: Array<LifetimeAction>): any[] {
  return result.map((item) => {
    return lifetimeActionSerializer(item);
  });
}

export function lifetimeActionArrayDeserializer(result: Array<LifetimeAction>): any[] {
  return result.map((item) => {
    return lifetimeActionDeserializer(item);
  });
}

/** Action and its trigger that will be performed by Key Vault over the lifetime of a certificate. */
export interface LifetimeAction {
  /** The condition that will execute the action. */
  trigger?: Trigger;
  /** The action that will be executed. */
  action?: Action;
}

export function lifetimeActionSerializer(item: LifetimeAction): any {
  return {
    trigger: !item["trigger"] ? item["trigger"] : triggerSerializer(item["trigger"]),
    action: !item["action"] ? item["action"] : actionSerializer(item["action"]),
  };
}

export function lifetimeActionDeserializer(item: any): LifetimeAction {
  return {
    trigger: !item["trigger"] ? item["trigger"] : triggerDeserializer(item["trigger"]),
    action: !item["action"] ? item["action"] : actionDeserializer(item["action"]),
  };
}

/** A condition to be satisfied for an action to be executed. */
export interface Trigger {
  /** Percentage of lifetime at which to trigger. Value should be between 1 and 99. */
  lifetimePercentage?: number;
  /** Days before expiry to attempt renewal. Value should be between 1 and validity_in_months multiplied by 27. If validity_in_months is 36, then value should be between 1 and 972 (36 * 27). */
  daysBeforeExpiry?: number;
}

export function triggerSerializer(item: Trigger): any {
  return {
    lifetime_percentage: item["lifetimePercentage"],
    days_before_expiry: item["daysBeforeExpiry"],
  };
}

export function triggerDeserializer(item: any): Trigger {
  return {
    lifetimePercentage: item["lifetime_percentage"],
    daysBeforeExpiry: item["days_before_expiry"],
  };
}

/** The action that will be executed. */
export interface Action {
  /** The type of the action. */
  actionType?: CertificatePolicyAction;
}

export function actionSerializer(item: Action): any {
  return { action_type: item["actionType"] };
}

export function actionDeserializer(item: any): Action {
  return {
    actionType: item["action_type"],
  };
}

/** The type of the action. */
export type CertificatePolicyAction = "EmailContacts" | "AutoRenew";

/** Parameters for the issuer of the X509 component of a certificate. */
export interface IssuerParameters {
  /** Name of the referenced issuer object or reserved names; for example, 'Self' or 'Unknown'. */
  name?: string;
  /** Certificate type as supported by the provider (optional); for example 'OV-SSL', 'EV-SSL' */
  certificateType?: string;
  /** Indicates if the certificates generated under this policy should be published to certificate transparency logs. */
  certificateTransparency?: boolean;
}

export function issuerParametersSerializer(item: IssuerParameters): any {
  return {
    name: item["name"],
    cty: item["certificateType"],
    cert_transparency: item["certificateTransparency"],
  };
}

export function issuerParametersDeserializer(item: any): IssuerParameters {
  return {
    name: item["name"],
    certificateType: item["cty"],
    certificateTransparency: item["cert_transparency"],
  };
}

/** The contacts for the vault certificates. */
export interface Contacts {
  /** Identifier for the contacts collection. */
  readonly id?: string;
  /** The contact list for the vault certificates. */
  contactList?: Contact[];
}

export function contactsSerializer(item: Contacts): any {
  return {
    contacts: !item["contactList"]
      ? item["contactList"]
      : contactArraySerializer(item["contactList"]),
  };
}

export function contactsDeserializer(item: any): Contacts {
  return {
    id: item["id"],
    contactList: !item["contacts"] ? item["contacts"] : contactArrayDeserializer(item["contacts"]),
  };
}

export function contactArraySerializer(result: Array<Contact>): any[] {
  return result.map((item) => {
    return contactSerializer(item);
  });
}

export function contactArrayDeserializer(result: Array<Contact>): any[] {
  return result.map((item) => {
    return contactDeserializer(item);
  });
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

export function contactSerializer(item: Contact): any {
  return {
    email: item["emailAddress"],
    name: item["name"],
    phone: item["phone"],
  };
}

export function contactDeserializer(item: any): Contact {
  return {
    emailAddress: item["email"],
    name: item["name"],
    phone: item["phone"],
  };
}

/** The certificate issuer list result. */
export interface _CertificateIssuerListResult {
  /** A response message containing a list of certificate issuers in the key vault along with a link to the next page of certificate issuers. */
  readonly value?: CertificateIssuerItem[];
  /** The URL to get the next set of certificate issuers. */
  readonly nextLink?: string;
}

export function _certificateIssuerListResultDeserializer(item: any): _CertificateIssuerListResult {
  return {
    value: !item["value"] ? item["value"] : certificateIssuerItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function certificateIssuerItemArrayDeserializer(
  result: Array<CertificateIssuerItem>,
): any[] {
  return result.map((item) => {
    return certificateIssuerItemDeserializer(item);
  });
}

/** The certificate issuer item containing certificate issuer metadata. */
export interface CertificateIssuerItem {
  /** Certificate Identifier. */
  id?: string;
  /** The issuer provider. */
  provider?: string;
}

export function certificateIssuerItemDeserializer(item: any): CertificateIssuerItem {
  return {
    id: item["id"],
    provider: item["provider"],
  };
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
): any {
  return {
    provider: item["provider"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : issuerCredentialsSerializer(item["credentials"]),
    org_details: !item["organizationDetails"]
      ? item["organizationDetails"]
      : organizationDetailsSerializer(item["organizationDetails"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : issuerAttributesSerializer(item["attributes"]),
  };
}

/** The credentials to be used for the certificate issuer. */
export interface IssuerCredentials {
  /** The user name/account name/account id. */
  accountId?: string;
  /** The password/secret/account key. */
  password?: string;
}

export function issuerCredentialsSerializer(item: IssuerCredentials): any {
  return { account_id: item["accountId"], pwd: item["password"] };
}

export function issuerCredentialsDeserializer(item: any): IssuerCredentials {
  return {
    accountId: item["account_id"],
    password: item["pwd"],
  };
}

/** Details of the organization of the certificate issuer. */
export interface OrganizationDetails {
  /** Id of the organization. */
  id?: string;
  /** Details of the organization administrator. */
  adminDetails?: AdministratorDetails[];
}

export function organizationDetailsSerializer(item: OrganizationDetails): any {
  return {
    id: item["id"],
    admin_details: !item["adminDetails"]
      ? item["adminDetails"]
      : administratorDetailsArraySerializer(item["adminDetails"]),
  };
}

export function organizationDetailsDeserializer(item: any): OrganizationDetails {
  return {
    id: item["id"],
    adminDetails: !item["admin_details"]
      ? item["admin_details"]
      : administratorDetailsArrayDeserializer(item["admin_details"]),
  };
}

export function administratorDetailsArraySerializer(result: Array<AdministratorDetails>): any[] {
  return result.map((item) => {
    return administratorDetailsSerializer(item);
  });
}

export function administratorDetailsArrayDeserializer(result: Array<AdministratorDetails>): any[] {
  return result.map((item) => {
    return administratorDetailsDeserializer(item);
  });
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

export function administratorDetailsSerializer(item: AdministratorDetails): any {
  return {
    first_name: item["firstName"],
    last_name: item["lastName"],
    email: item["emailAddress"],
    phone: item["phone"],
  };
}

export function administratorDetailsDeserializer(item: any): AdministratorDetails {
  return {
    firstName: item["first_name"],
    lastName: item["last_name"],
    emailAddress: item["email"],
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

export function issuerAttributesSerializer(item: IssuerAttributes): any {
  return { enabled: item["enabled"] };
}

export function issuerAttributesDeserializer(item: any): IssuerAttributes {
  return {
    enabled: item["enabled"],
    created: !item["created"] ? item["created"] : new Date(item["created"] * 1000),
    updated: !item["updated"] ? item["updated"] : new Date(item["updated"] * 1000),
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

export function issuerBundleDeserializer(item: any): IssuerBundle {
  return {
    id: item["id"],
    provider: item["provider"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : issuerCredentialsDeserializer(item["credentials"]),
    organizationDetails: !item["org_details"]
      ? item["org_details"]
      : organizationDetailsDeserializer(item["org_details"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : issuerAttributesDeserializer(item["attributes"]),
  };
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
): any {
  return {
    provider: item["provider"],
    credentials: !item["credentials"]
      ? item["credentials"]
      : issuerCredentialsSerializer(item["credentials"]),
    org_details: !item["organizationDetails"]
      ? item["organizationDetails"]
      : organizationDetailsSerializer(item["organizationDetails"]),
    attributes: !item["attributes"]
      ? item["attributes"]
      : issuerAttributesSerializer(item["attributes"]),
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
  /** Specifies whether the certificate chain preserves its original order. The default value is false, which sets the leaf certificate at index 0. */
  preserveCertOrder?: boolean;
}

export function certificateCreateParametersSerializer(item: CertificateCreateParameters): any {
  return {
    policy: !item["certificatePolicy"]
      ? item["certificatePolicy"]
      : certificatePolicySerializer(item["certificatePolicy"]),
    attributes: !item["certificateAttributes"]
      ? item["certificateAttributes"]
      : certificateAttributesSerializer(item["certificateAttributes"]),
    tags: item["tags"],
    preserveCertOrder: item["preserveCertOrder"],
  };
}

/** A certificate operation is returned in case of asynchronous requests. */
export interface CertificateOperation {
  /** The certificate id. */
  readonly id?: string;
  /** Parameters for the issuer of the X509 component of a certificate. */
  issuerParameters?: IssuerParameters;
  /** The certificate signing request (CSR) that is being used in the certificate operation. */
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
  /** Specifies whether the certificate chain preserves its original order. The default value is false, which sets the leaf certificate at index 0. */
  preserveCertOrder?: boolean;
  /** Identifier for the certificate operation. */
  requestId?: string;
}

export function certificateOperationDeserializer(item: any): CertificateOperation {
  return {
    id: item["id"],
    issuerParameters: !item["issuer"]
      ? item["issuer"]
      : issuerParametersDeserializer(item["issuer"]),
    csr: !item["csr"]
      ? item["csr"]
      : typeof item["csr"] === "string"
        ? stringToUint8Array(item["csr"], "base64")
        : item["csr"],
    cancellationRequested: item["cancellation_requested"],
    status: item["status"],
    statusDetails: item["status_details"],
    error: !item["error"] ? item["error"] : _keyVaultErrorErrorDeserializer(item["error"]),
    target: item["target"],
    preserveCertOrder: item["preserveCertOrder"],
    requestId: item["request_id"],
  };
}

/** The certificate import parameters. */
export interface CertificateImportParameters {
  /** Base64 encoded representation of the certificate object to import. This certificate needs to contain the private key. */
  base64EncodedCertificate: string;
  /** If the private key in base64EncodedCertificate is encrypted, the password used for encryption. */
  password?: string;
  /** The management policy for the certificate. */
  certificatePolicy?: CertificatePolicy;
  /** The attributes of the certificate (optional). */
  certificateAttributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Specifies whether the certificate chain preserves its original order. The default value is false, which sets the leaf certificate at index 0. */
  preserveCertOrder?: boolean;
}

export function certificateImportParametersSerializer(item: CertificateImportParameters): any {
  return {
    value: item["base64EncodedCertificate"],
    pwd: item["password"],
    policy: !item["certificatePolicy"]
      ? item["certificatePolicy"]
      : certificatePolicySerializer(item["certificatePolicy"]),
    attributes: !item["certificateAttributes"]
      ? item["certificateAttributes"]
      : certificateAttributesSerializer(item["certificateAttributes"]),
    tags: item["tags"],
    preserveCertOrder: item["preserveCertOrder"],
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
  /** The content type of the secret. eg. 'application/x-pem-file' or 'application/x-pkcs12', */
  contentType?: string;
  /** The certificate attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs */
  tags?: Record<string, string>;
  /** Specifies whether the certificate chain preserves its original order. The default value is false, which sets the leaf certificate at index 0. */
  preserveCertOrder?: boolean;
}

export function certificateBundleDeserializer(item: any): CertificateBundle {
  return {
    id: item["id"],
    kid: item["kid"],
    sid: item["sid"],
    x509Thumbprint: !item["x5t"]
      ? item["x5t"]
      : typeof item["x5t"] === "string"
        ? stringToUint8Array(item["x5t"], "base64url")
        : item["x5t"],
    policy: !item["policy"] ? item["policy"] : certificatePolicyDeserializer(item["policy"]),
    cer: !item["cer"]
      ? item["cer"]
      : typeof item["cer"] === "string"
        ? stringToUint8Array(item["cer"], "base64")
        : item["cer"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    preserveCertOrder: item["preserveCertOrder"],
  };
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

export function certificateUpdateParametersSerializer(item: CertificateUpdateParameters): any {
  return {
    policy: !item["certificatePolicy"]
      ? item["certificatePolicy"]
      : certificatePolicySerializer(item["certificatePolicy"]),
    attributes: !item["certificateAttributes"]
      ? item["certificateAttributes"]
      : certificateAttributesSerializer(item["certificateAttributes"]),
    tags: item["tags"],
  };
}

/** The certificate operation update parameters. */
export interface CertificateOperationUpdateParameter {
  /** Indicates if cancellation was requested on the certificate operation. */
  cancellationRequested: boolean;
}

export function certificateOperationUpdateParameterSerializer(
  item: CertificateOperationUpdateParameter,
): any {
  return { cancellation_requested: item["cancellationRequested"] };
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

export function certificateMergeParametersSerializer(item: CertificateMergeParameters): any {
  return {
    x5c: item["x509Certificates"].map((p: any) => {
      return uint8ArrayToString(p, "base64");
    }),
    attributes: !item["certificateAttributes"]
      ? item["certificateAttributes"]
      : certificateAttributesSerializer(item["certificateAttributes"]),
    tags: item["tags"],
  };
}

/** The backup certificate result, containing the backup blob. */
export interface BackupCertificateResult {
  /** The backup blob containing the backed up certificate. */
  readonly value?: Uint8Array;
}

export function backupCertificateResultDeserializer(item: any): BackupCertificateResult {
  return {
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64url")
        : item["value"],
  };
}

/** The certificate restore parameters. */
export interface CertificateRestoreParameters {
  /** The backup blob associated with a certificate bundle. */
  certificateBundleBackup: Uint8Array;
}

export function certificateRestoreParametersSerializer(item: CertificateRestoreParameters): any {
  return {
    value: uint8ArrayToString(item["certificateBundleBackup"], "base64url"),
  };
}

/** A list of certificates that have been deleted in this vault. */
export interface _DeletedCertificateListResult {
  /** A response message containing a list of deleted certificates in the vault along with a link to the next page of deleted certificates. */
  readonly value?: DeletedCertificateItem[];
  /** The URL to get the next set of deleted certificates. */
  readonly nextLink?: string;
}

export function _deletedCertificateListResultDeserializer(
  item: any,
): _DeletedCertificateListResult {
  return {
    value: !item["value"] ? item["value"] : deletedCertificateItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedCertificateItemArrayDeserializer(
  result: Array<DeletedCertificateItem>,
): any[] {
  return result.map((item) => {
    return deletedCertificateItemDeserializer(item);
  });
}

/** The deleted certificate item containing metadata about the deleted certificate. */
export interface DeletedCertificateItem {
  /** Certificate identifier. */
  id?: string;
  /** The certificate management attributes. */
  attributes?: CertificateAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Thumbprint of the certificate. */
  x509Thumbprint?: Uint8Array;
  /** The url of the recovery object, used to identify and recover the deleted certificate. */
  recoveryId?: string;
  /** The time when the certificate is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the certificate was deleted, in UTC */
  readonly deletedDate?: Date;
}

export function deletedCertificateItemDeserializer(item: any): DeletedCertificateItem {
  return {
    id: item["id"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : certificateAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    x509Thumbprint: !item["x5t"]
      ? item["x5t"]
      : typeof item["x5t"] === "string"
        ? stringToUint8Array(item["x5t"], "base64url")
        : item["x5t"],
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"] ? item["deletedDate"] : new Date(item["deletedDate"] * 1000),
  };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 7.5 API version. */
  V75 = "7.5",
  /** The 7.6-preview.2 API version. */
  V76Preview2 = "7.6-preview.2",
  /** The 7.6 API version. */
  V76 = "7.6",
}
