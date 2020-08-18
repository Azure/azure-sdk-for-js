// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { DeletionRecoveryLevel, KeyUsageType } from "./generated/models";

/**
 * Defines values for CertificateKeyType.
 * Possible values include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
 * @readonly
 * @enum {string}
 */
export type CertificateKeyType = "EC" | "EC-HSM" | "RSA" | "RSA-HSM" | "oct";

/**
 * Defines values for CertificateKeyCurveName.
 * Possible values include: 'P-256', 'P-384', 'P-521', 'P-256K'
 * @readonly
 * @enum {string}
 */
export type CertificateKeyCurveName = "P-256" | "P-384" | "P-521" | "P-256K";

/**
 * @internal
 * @ignore
 * An interface representing the CertificateClient. For internal use.
 */
export interface CertificateClientInterface {
  /**
   * Creates a new certificate. If this is the first version, the certificate resource is created.
   * Requires the certificates/create permission.
   */
  createCertificate(
    certificateName: string,
    certificatePolicy: CertificatePolicy,
    options: CreateCertificateOptions
  ): Promise<KeyVaultCertificate>;
  /**
   * Gets the certificate operation.
   */
  getPlainCertificateOperation(
    certificateName: string,
    options?: GetPlainCertificateOperationOptions
  ): Promise<CertificateOperation>;
  /**
   * Recovers the deleted certificate in the specified vault. This operation can only be performed on a soft-delete enabled vault.
   * Requires the certificate/recover permission.
   */
  recoverDeletedCertificate(
    certificateName: string,
    options?: RecoverDeletedCertificateOptions
  ): Promise<KeyVaultCertificateWithPolicy>;
  /**
   * Updates a certificate creation operation that is already in progress. This operation requires the certificates/update permission.
   */
  cancelCertificateOperation(
    certificateName: string,
    options?: CancelCertificateOperationOptions
  ): Promise<CertificateOperation>;
  /**
   * The get method gets a specified certificate and is applicable to any certificate stored in Azure Certificate Vault.
   * This operation requires the certificates/get permission.
   */
  getCertificate(name: string, options?: GetCertificateOptions): Promise<KeyVaultCertificate>;
  /**
   * The delete operation applies to any certificate stored in Azure Certificate Vault. Individual versions
   * of a certificate can not be deleted, only all versions of a given certificate at once.
   */
  deleteCertificate(name: string, options?: DeleteCertificateOptions): Promise<DeletedCertificate>;
  /**
   * The getDeletedCertificate method returns the specified deleted certificate along with its properties.
   * This operation requires the certificates/get permission.
   */
  getDeletedCertificate(
    name: string,
    options?: GetDeletedCertificateOptions
  ): Promise<DeletedCertificate>;
}

/**
 * The latest supported KeyVault service API version
 */
export const LATEST_API_VERSION = "7.1";

/**
 * The optional parameters accepted by the KeyVault's KeyClient
 */
export interface CertificateClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the KeyVault's service API.
   */
  serviceVersion?: "7.0" | "7.1";
}

/**
 * The key vault server error.
 */
export interface CertificateOperationError {
  /**
   * The error code.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly code?: string;
  /**
   * The error message.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly message?: string;
  /**
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly innerError?: CertificateOperationError;
}

/**
 * A certificate operation is returned in case of asynchronous requests.
 */
export interface CertificateOperation {
  /**
   * The certificate id.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly id?: string;
  /**
   * The name of certificate.
   */
  readonly name?: string;
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
   * The certificate signing request (CSR) that is being used in the certificate operation.
   */
  csr?: Uint8Array;
  /**
   * Indicates if cancellation was requested on the certificate operation.
   */
  cancellationRequested?: boolean;
  /**
   * Status of the certificate operation.
   */
  status?: string;
  /**
   * The status details of the certificate operation.
   */
  statusDetails?: string;
  /**
   * Error encountered, if any, during the certificate operation.
   */
  error?: CertificateOperationError;
  /**
   * Location which contains the result of the certificate operation.
   */
  target?: string;
  /**
   * Identifier for the certificate operation.
   */
  requestId?: string;
  /**
   * The vault URI.
   */
  readonly vaultUrl?: string;
}

/**
 * Defines values for contentType.
 * Possible values include: 'application/x-pem-file', 'application/x-pkcs12'
 * @readonly
 * @enum {string}
 */
export type CertificateContentType = "application/x-pem-file" | "application/x-pkcs12" | undefined;

/**
 * An interface representing a certificate without the certificate's policy
 */
export interface KeyVaultCertificate {
  /**
   * CER contents of x509 certificate.
   */
  cer?: Uint8Array;
  /**
   * Certificate identifier.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  id?: string;
  /**
   * The key id.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly keyId?: string;
  /**
   * The secret id.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly secretId?: string;
  /**
   * The name of certificate.
   */
  readonly name: string;
  /**
   * The properties of the certificate
   */
  properties: CertificateProperties;
}

/**
 * An interface representing a certificate with its policy
 */
export interface KeyVaultCertificateWithPolicy extends KeyVaultCertificate {
  /**
   * The management policy.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly policy?: CertificatePolicy;
}

/**
 * Well known issuers for choosing a default
 */
export enum WellKnownIssuerNames {
  /**
   * For self signed certificates
   */
  Self = "Self",
  /**
   * For certificates whose issuer will be defined later
   */
  Unknown = "Unknown"
}

/**
 * An array with one property at minimum.
 */
export type ArrayOneOrMore<T> = {
  0: T;
} & Array<T>;

/**
 * An interface representing the alternative names of the subject of a certificate policy.
 */
export interface SubjectAlternativeNamesAll {
  /**
   * Email addresses.
   */
  emails: ArrayOneOrMore<string>;
  /**
   * Domain names.
   */
  dnsNames: ArrayOneOrMore<string>;
  /**
   * User principal names.
   */
  userPrincipalNames: ArrayOneOrMore<string>;
}

/**
 * Alternatives to the subject property.
 * If present, it should at least have one of the properties of SubjectAlternativeNamesAll.
 */
export type SubjectAlternativeNames = RequireAtLeastOne<SubjectAlternativeNamesAll>;

/**
 * Details of the organization administrator of the certificate issuer.
 */
export interface AdministratorContact {
  /**
   * First name.
   */
  firstName?: string;
  /**
   * Last name.
   */
  lastName?: string;
  /**
   * Email address.
   */
  email?: string;
  /**
   * Phone number.
   */
  phone?: string;
}

/**
 * Action and its trigger that will be performed by Key Vault over the lifetime of a certificate.
 */
export interface LifetimeAction {
  /**
   * Percentage of lifetime at which to trigger. Value should be between 1 and 99.
   */
  lifetimePercentage?: number;
  /**
   * Days before expiry to attempt renewal. Value should be between 1 and validity_in_months
   * multiplied by 27. If validity_in_months is 36, then value should be between 1 and 972 (36 *
   * 27).
   */
  daysBeforeExpiry?: number;
  /**
   * The action that will be executed.
   */
  action?: CertificatePolicyAction;
}

/**
 * The action that will be executed.
 */
export type CertificatePolicyAction = "EmailContacts" | "AutoRenew";

/**
 * An interface representing a certificate's policy (without the subject properties).
 */
export interface CertificatePolicyProperties {
  /**
   * Indicates if the certificates generated under this policy should be published to certificate
   * transparency logs.
   */
  certificateTransparency?: boolean;
  /**
   * The media type (MIME type).
   */
  contentType?: CertificateContentType;
  /**
   * Type of certificate to be requested from the issuer provider.
   */
  certificateType?: string;
  /**
   * When the certificate was created.
   */
  readonly createdOn?: Date;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Whether or not the certificate can be exported
   */
  exportable?: boolean;
  /**
   * The enhanced key usage.
   */
  enhancedKeyUsage?: string[];
  /**
   * Name of the referenced issuer object or reserved names; for example, 'Self' or 'Unknown'.
   */
  issuerName?: WellKnownIssuerNames | string;
  /**
   * Elliptic curve name. Possible values include: 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  keyCurveName?: CertificateKeyCurveName;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * The type of key pair to be used for the certificate. Possible values include: 'EC', 'EC-HSM',
   * 'RSA', 'RSA-HSM', 'oct'
   */
  keyType?: CertificateKeyType;
  /**
   * List of key usages.
   */
  keyUsage?: KeyUsageType[];
  /**
   * Actions that will be performed by Key Vault over the lifetime of a certificate.
   */
  lifetimeActions?: LifetimeAction[];
  /**
   * Indicates if the same key pair will be used on certificate renewal.
   */
  reuseKey?: boolean;
  /**
   * When the object was updated.
   */
  readonly updatedOn?: Date;
  /**
   * The duration that the certificate is valid in months.
   */
  validityInMonths?: number;
}

/**
 * An interface representing the possible subject properties of a certificate's policy.
 * The final type requires at least one of these properties to exist.
 */
export interface PolicySubjectProperties {
  /**
   * The subject name. Should be a valid X509 distinguished Name.
   */
  subject: string;
  /**
   * The subject alternative names.
   */
  subjectAlternativeNames: SubjectAlternativeNames;
}

/**
 * An type representing a certificate's policy with at least one of the subject properties.
 */
export type CertificatePolicy = CertificatePolicyProperties &
  RequireAtLeastOne<PolicySubjectProperties>;

/**
 * The DefaultCertificatePolicy exports values that
 * are useful as default parameters to methods that
 * modify the certificate's policy.
 */
export const DefaultCertificatePolicy = {
  issuerName: "Self",
  subject: "cn=MyCert"
};

/**
 * An interface representing the properties of a certificate
 */
export interface CertificateProperties {
  /**
   * When the certificate was created.
   */
  readonly createdOn?: Date;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * Expiry date in UTC.
   */
  readonly expiresOn?: Date;
  /**
   * Certificate identifier.
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly id?: string;
  /**
   * The name of certificate.
   */
  readonly name?: string;
  /**
   * Not before date in UTC.
   */
  notBefore?: Date;
  /**
   * Reflects the deletion recovery level currently in effect for certificates in the current
   * vault. If it contains 'Purgeable', the certificate can be permanently deleted by a privileged
   * user; otherwise, only the system can purge the certificate, at the end of the retention
   * interval. Possible values include: 'Purgeable', 'Recoverable+Purgeable', 'Recoverable',
   * 'Recoverable+ProtectedSubscription'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly recoveryLevel?: DeletionRecoveryLevel;
  /**
   * Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: CertificateTags;
  /**
   * When the issuer was updated.
   */
  readonly updatedOn?: Date;
  /**
   * The vault URI.
   */
  readonly vaultUrl?: string;
  /**
   * The version of certificate. May be undefined.
   */
  readonly version?: string;
  /**
   * Thumbprint of the certificate.
   */
  readonly x509Thumbprint?: Uint8Array;
  /**
   * The retention dates of the softDelete data.
   * The value should be >=7 and <=90 when softDelete enabled.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  recoverableDays?: number;
}

/**
 * An interface representing a deleted certificate.
 */
export interface DeletedCertificate extends KeyVaultCertificateWithPolicy {
  /**
   * The time when the certificate was deleted, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly deletedOn?: Date;
  /**
   * The url of the recovery object, used to
   * identify and recover the deleted certificate.
   */
  readonly recoveryId?: string;
  /**
   * The time when the certificate is scheduled
   * to be purged, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly scheduledPurgeDate?: Date;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginCreateCertificate}, {@link beginDeleteCertificate} and {@link beginRecoverDeletedCertificate}
 */
export interface CertificatePollerOptions extends coreHttp.OperationOptions {
  /**
   * Time between each polling
   */
  intervalInMs?: number;
  /**
   * A serialized poller, used to resume an existing operation
   */
  resumeFrom?: string;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginCreateCertificate}
 */
export interface BeginCreateCertificateOptions
  extends CreateCertificateOptions,
    CertificatePollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginDeleteCertificate}
 */
export type BeginDeleteCertificateOptions = CertificatePollerOptions;

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginRecoverDeletedCertificate}
 */
export type BeginRecoverDeletedCertificateOptions = CertificatePollerOptions;

/**
 * Options for {@link getCertificateOperation}.
 */
export type GetCertificateOperationOptions = CertificatePollerOptions;

/**
 * Options for {@link createCertificate}.
 */
export interface CreateCertificateOptions
  extends CertificateProperties,
    coreHttp.OperationOptions {}

/**
 * Options for {@link cancelCertificateOperation}.
 * @internal
 */
export type CancelCertificateOperationOptions = coreHttp.OperationOptions;

/**
 * Options for {@link backupCertificate}.
 */
export type BackupCertificateOptions = coreHttp.OperationOptions;

/**
 * Options for {@link deleteCertificateOperation}.
 */
export type DeleteCertificateOperationOptions = coreHttp.OperationOptions;

/**
 * Options for {@link deleteCertificate}.
 * @internal
 */
export type DeleteCertificateOptions = coreHttp.OperationOptions;

/**
 * Options for {@link deleteContacts}.
 */
export type DeleteContactsOptions = coreHttp.OperationOptions;

/**
 * Options for {@link importCertificate}.
 */
export interface ImportCertificateOptions extends coreHttp.OperationOptions {
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * If the private key in base64EncodedCertificate is encrypted, the password used for encryption.
   */
  password?: string;
  /**
   * The management policy.
   */
  policy?: CertificatePolicy;
  /**
   * Application specific
   * metadata in the form of key-value pairs.
   */
  tags?: CertificateTags;
}

/**
 * Options for {@link deleteIssuer}.
 */
export type DeleteIssuerOptions = coreHttp.OperationOptions;

/**
 * Options for {@link setContacts}.
 */
export type SetContactsOptions = coreHttp.OperationOptions;

/**
 * Options for {@link createIssuer}.
 */
export interface CreateIssuerOptions extends coreHttp.OperationOptions {
  /**
   * The user name/account name/account id.
   */
  accountId?: string;
  /**
   * The password/secret/account key.
   */
  password?: string;
  /**
   * Id of the organization.
   */
  organizationId?: string;
  /**
   * Details of the organization's administrator contacts, as provided to the issuer.
   */
  administratorContacts?: AdministratorContact[];
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
}

/**
 * Options for {@link purgeDeletedCertificate}.
 */
export type PurgeDeletedCertificateOptions = coreHttp.OperationOptions;

/**
 * Options for {@link updateIssuer}.
 */
export interface UpdateIssuerOptions extends CreateIssuerOptions {
  /**
   * The issuer provider.
   */
  provider?: string;
}

/**
 * Options for {@link getContacts}.
 */
export type GetContactsOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getIssuer}.
 */
export type GetIssuerOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getPlainCertificateOperation}.
 */
export type GetPlainCertificateOperationOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getCertificateVersion}.
 */
export type GetCertificateVersionOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getCertificatePolicy}.
 */
export type GetCertificatePolicyOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getDeletedCertificate}.
 */
export type GetDeletedCertificateOptions = coreHttp.OperationOptions;

/**
 * Options for {@link getCertificate}.
 */
export type GetCertificateOptions = coreHttp.OperationOptions;

/**
 * An interface representing the shape of the Certificate Tags. The tags are just string key-value pairs.
 */
export type CertificateTags = { [propertyName: string]: string };

/**
 * Options for {@link updateCertificate}.
 */
export interface UpdateCertificatePropertiesOptions
  extends CertificateProperties,
    coreHttp.OperationOptions {}

/**
 * Options for {@link updateCertificatePolicy}.
 */
export type UpdateCertificatePolicyOptions = coreHttp.OperationOptions;

/**
 * An interface representing the properties of a certificate issuer
 */
export interface IssuerProperties {
  /**
   * Certificate Identifier.
   */
  id?: string;
  /**
   * Name of the issuer.
   */
  readonly name?: string;
  /**
   * The issuer provider.
   */
  provider?: string;
}

/**
 * An interface representing the properties of an issuer.
 */
export interface CertificateIssuer extends IssuerProperties {
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * When the issuer was created.
   */
  readonly createdOn?: Date;
  /**
   * When the issuer was updated.
   */
  readonly updatedOn?: Date;
  /**
   * The user name/account name/account id.
   */
  accountId?: string;
  /**
   * The password/secret/account key.
   */
  password?: string;
  /**
   * Id of the organization.
   */
  organizationId?: string;
  /**
   * Details of the organization's administrator contacts, as provided to the issuer.
   */
  administratorContacts?: AdministratorContact[];
}

/**
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listPropertiesOfCertificates}.
 */
export interface ListPropertiesOfCertificatesOptions extends coreHttp.OperationOptions {
  /**
   * Specifies whether to include certificates which are not completely provisioned.
   */
  includePending?: boolean;
}

/**
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listPropertiesOfCertificateVersions}.
 */
export type ListPropertiesOfCertificateVersionsOptions = coreHttp.OperationOptions;

/**
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listPropertiesOfIssuers}.
 */
export type ListPropertiesOfIssuersOptions = coreHttp.OperationOptions;

/**
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listDeletedCertificates}.
 */
export interface ListDeletedCertificatesOptions extends coreHttp.OperationOptions {
  /**
   * Specifies whether to include certificates which are not completely provisioned.
   */
  includePending?: boolean;
}

/**
 * An interface representing optional parameters for {@link mergeCertificate}.
 */
export type MergeCertificateOptions = coreHttp.OperationOptions;

/**
 * An interface representing optional parameters for {@link recoverDeletedCertificate}.
 * @internal
 */
export type RecoverDeletedCertificateOptions = coreHttp.OperationOptions;

/**
 * An interface representing optional parameters for {@link restoreCertificateBackup}.
 */
export type RestoreCertificateBackupOptions = coreHttp.OperationOptions;

/**
 * The shape of the contact information for the vault certificates.
 */
export interface CertificateContactAll {
  /**
   * Email address of the contact
   */
  email: string;
  /**
   * Name of the contact
   */
  name: string;
  /**
   * Phone number of the contact
   */
  phone: string;
}

/**
 * RequireAtLeastOne helps create a type where at least one of the properties of an interface (can be any property) is required to exist.
 *
 * This works because of TypeScript's utility types: https://www.typescriptlang.org/docs/handbook/utility-types.html
 * Let's examine it:
 * - `[K in keyof T]-?` this property (K) is valid only if it has the same name as any property of T.
 * - `Required<Pick<T, K>>` makes a new type from T with just the current property in the iteration, and marks it as required
 * - `Partial<Pick<T, Exclude<keyof T, K>>>` makes a new type with all the properties of T, except from the property K.
 * - `&` is what unites the type with only one required property from `Required<...>` with all the optional properties from `Partial<...>`.
 * - `[keyof T]` ensures that only properties of T are allowed.
 */
export type RequireAtLeastOne<T> = {
  [K in keyof T]-?: Required<Pick<T, K>> & Partial<Pick<T, Exclude<keyof T, K>>>;
}[keyof T];

/**
 * The contact information for the vault certificates.
 * Each contact will have at least just one of the properties of CertificateContactAll,
 * which are: emailAddress, name or phone.
 */
export type CertificateContact = RequireAtLeastOne<CertificateContactAll> | undefined;
