import * as coreHttp from "@azure/core-http";
import {
  DeletionRecoveryLevel,
  KeyVaultClientGetCertificatesOptionalParams,
  KeyVaultClientGetCertificateIssuersOptionalParams,
  KeyVaultClientGetDeletedCertificatesOptionalParams,
  KeyVaultClientImportCertificateOptionalParams,
  KeyVaultClientSetCertificateIssuerOptionalParams,
  KeyVaultClientUpdateCertificateIssuerOptionalParams,
  JsonWebKeyType as KeyType,
  JsonWebKeyCurveName as KeyCurveName,
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
export interface KeyVaultCertificate {
  /**
   * CER contents of x509 certificate.
   */
  cer?: Uint8Array;
  /**
   * The content type of the secret.
   */
  certificateContentType?: CertificateContentType;
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
  name: string;
  /**
   * The properties of the certificate
   */
  properties: CertificateProperties;
}

/**
 * @interface
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
 * @interface
 * An interface representing a certificate's policy
 */
export interface CertificatePolicy {
  /**
   * Indicates if the certificates generated under this policy should be published to certificate
   * transparency logs.
   */
  certificateTransparency?: boolean;
  /**
   * The media type (MIME type).
   */
  contentType?: string;
  /**
   * Type of certificate to be requested from the issuer provider.
   */
  certificateType?: CertificateContentType;
  /**
   * When the certificate was created.
   */
  readonly createdOn?: Date;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * The enhanced key usage.
   */
  enhancedKeyUsage?: string[];
  /**
   * Name of the referenced issuer object or reserved names; for example, 'Self' or 'Unknown'.
   */
  issuerName?: string;
  /**
   * Elliptic curve name. Possible values include: 'P-256', 'P-384', 'P-521', 'P-256K'
   */
  keyCurveName?: KeyCurveName;
  /**
   * The key size in bits. For example: 2048, 3072, or 4096 for RSA.
   */
  keySize?: number;
  /**
   * The type of key pair to be used for the certificate. Possible values include: 'EC', 'EC-HSM',
   * 'RSA', 'RSA-HSM', 'oct'
   */
  keyType?: KeyType;
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
   * The subject name. Should be a valid X509 distinguished Name.
   */
  subject?: string;
  /**
   * The subject alternative names.
   */
  subjectAlternativeNames?: SubjectAlternativeNames;
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
 * @interface
 * An interface representing the alternative names of the subject of a certificate contact.
 */
export interface SubjectAlternativeNames {
  /**
   * The subject type, either emails, DNS names or UPNs
   */
  subjectType: "emails" | "dnsNames" | "upns";
  /**
   * The subject values
   */
  subjectValues: string[];
}

/**
 * @interface
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
  id?: string;
  /**
   * The name of certificate.
   */
  name?: string;
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
  updatedOn?: Date;
  /**
   * The vault URI.
   */
  vaultUrl?: string;
  /**
   * The version of certificate. May be undefined.
   */
  version?: string;
  /**
   * Thumbprint of the certificate.
   */
  readonly x509Thumbprint?: Uint8Array;
}

/**
 * @interface
 * An interface representing a deleted certificate
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
  recoveryId?: string;
  /**
   * The time when the certificate is scheduled
   * to be purged, in UTC
   * **NOTE: This property will not be serialized. It can only be populated by
   * the server.**
   */
  readonly scheduledPurgeDate?: Date;
}

/**
 * @interface
 * An interface representing options that can be passed to {@link createCertificate}.
 */
export interface CreateCertificateOptions
  extends CertificateProperties,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link cancelCertificateOperation}.
 */
export interface CancelCertificateOperationOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link backupCertificate}.
 */
export interface BackupCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link deleteCertificateOperation}.
 */
export interface DeleteCertificateOperationOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link deleteCertificate}.
 */
export interface DeleteCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link deleteContacts}.
 */
export interface DeleteContactsOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link importCertificate}.
 */
export interface ImportCertificateOptions
  extends KeyVaultClientImportCertificateOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link deleteIssuer}.
 */
export interface DeleteIssuerOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link setContacts}.
 */
export interface SetContactsOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link setIssuer}.
 */
export interface SetIssuerOptions
  extends KeyVaultClientSetCertificateIssuerOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link purgeDeletedCertificate}.
 */
export interface PurgeDeletedCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link updateIssuer}.
 */
export interface UpdateIssuerOptions
  extends KeyVaultClientUpdateCertificateIssuerOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getContacts}.
 */
export interface GetContactsOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getIssuer}.
 */
export interface GetIssuerOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getCertificateOperation}.
 */
export interface GetCertificateOperationOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getCertificateVersion}.
 */
export interface GetCertificateVersionOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getCertificatePolicy}.
 */
export interface GetCertificatePolicyOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getDeletedCertificate}.
 */
export interface GetDeletedCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link getCertificate}.
 */
export interface GetCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the shape of the Certificate Tags. The tags are just string key-value pairs.
 */
export type CertificateTags = { [propertyName: string]: string };

/**
 * @interface
 * An interface representing options that can be passed to {@link updateCertificate}.
 */
export interface UpdateCertificateOptions
  extends CertificateProperties,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing options that can be passed to {@link updateCertificatePolicy}.
 */
export interface UpdateCertificatePolicyOptions
  extends CertificateProperties,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing the issuer of a certificate
 */
export interface CertificateIssuer {
  /**
   * Certificate Identifier.
   */
  id?: string;
  /**
   * The issuer provider.
   */
  provider?: string;
}

/**
 * @interface
 * An interface representing the properties of an issuer
 */
export interface IssuerProperties {
  /**
   * Certificate Identifier.
   */
  id?: string;
  /**
   * The issuer provider.
   */
  provider?: string;
  /**
   * Determines whether the object is enabled.
   */
  enabled?: boolean;
  /**
   * When the issuer was created.
   */
  createdOn?: Date;
  /**
   * When the issuer was updated.
   */
  updatedOn?: Date;
  /**
   * Name of the issuer
   */
  name?: string;
}

/**
 * @interface
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listCertificates}.
 */
export interface ListCertificatesOptions
  extends KeyVaultClientGetCertificatesOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listCertificateVersions}.
 */
export interface ListCertificateVersionsOptions
  extends KeyVaultClientGetCertificatesOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listIssuers}.
 */
export interface ListIssuersOptions
  extends KeyVaultClientGetCertificateIssuersOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for CertificateClient paged operations passed to {@link listDeletedCertificates}.
 */
export interface ListDeletedCertificatesOptions
  extends KeyVaultClientGetDeletedCertificatesOptionalParams,
    coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for {@link mergeCertificate}.
 */
export interface MergeCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for {@link recoverDeletedCertificate}.
 */
export interface RecoverDeletedCertificateOptions extends coreHttp.OperationOptions {}

/**
 * @interface
 * An interface representing optional parameters for {@link restoreCertificateBackup}.
 */
export interface RestoreCertificateBackupOptions extends coreHttp.OperationOptions {}
