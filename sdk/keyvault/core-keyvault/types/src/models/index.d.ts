import { BaseResource, CloudError } from "@azure/ms-rest-azure-js";
import * as msRest from "@azure/ms-rest-js";
export { BaseResource, CloudError };
/**
 * @interface
 * An interface representing Attributes.
 * The object attributes managed by the KeyVault service.
 *
 */
export interface Attributes {
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
     * @member {Date} [created] Creation time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly created?: Date;
    /**
     * @member {Date} [updated] Last updated time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly updated?: Date;
}
/**
 * @interface
 * An interface representing JsonWebKey.
 * As of http://tools.ietf.org/html/draft-ietf-jose-json-web-key-18
 *
 */
export interface JsonWebKey {
    /**
     * @member {string} [kid] Key identifier.
     */
    kid?: string;
    /**
     * @member {JsonWebKeyType} [kty] JsonWebKey Key Type (kty), as defined in
     * https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40.
     * Possible values include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
     */
    kty?: JsonWebKeyType;
    /**
     * @member {string[]} [keyOps]
     */
    keyOps?: string[];
    /**
     * @member {Uint8Array} [n] RSA modulus.
     */
    n?: Uint8Array;
    /**
     * @member {Uint8Array} [e] RSA public exponent.
     */
    e?: Uint8Array;
    /**
     * @member {Uint8Array} [d] RSA private exponent, or the D component of an EC
     * private key.
     */
    d?: Uint8Array;
    /**
     * @member {Uint8Array} [dp] RSA private key parameter.
     */
    dp?: Uint8Array;
    /**
     * @member {Uint8Array} [dq] RSA private key parameter.
     */
    dq?: Uint8Array;
    /**
     * @member {Uint8Array} [qi] RSA private key parameter.
     */
    qi?: Uint8Array;
    /**
     * @member {Uint8Array} [p] RSA secret prime.
     */
    p?: Uint8Array;
    /**
     * @member {Uint8Array} [q] RSA secret prime, with p < q.
     */
    q?: Uint8Array;
    /**
     * @member {Uint8Array} [k] Symmetric key.
     */
    k?: Uint8Array;
    /**
     * @member {Uint8Array} [t] HSM Token, used with 'Bring Your Own Key'.
     */
    t?: Uint8Array;
    /**
     * @member {JsonWebKeyCurveName} [crv] Elliptic curve name. For valid values,
     * see JsonWebKeyCurveName. Possible values include: 'P-256', 'P-384',
     * 'P-521', 'P-256K'
     */
    crv?: JsonWebKeyCurveName;
    /**
     * @member {Uint8Array} [x] X component of an EC public key.
     */
    x?: Uint8Array;
    /**
     * @member {Uint8Array} [y] Y component of an EC public key.
     */
    y?: Uint8Array;
}
/**
 * @interface
 * An interface representing KeyAttributes.
 * The attributes of a key managed by the key vault service.
 *
 * @extends Attributes
 */
export interface KeyAttributes extends Attributes {
    /**
     * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
     * recovery level currently in effect for keys in the current vault. If it
     * contains 'Purgeable' the key can be permanently deleted by a privileged
     * user; otherwise, only the system can purge the key, at the end of the
     * retention interval. Possible values include: 'Purgeable',
     * 'Recoverable+Purgeable', 'Recoverable',
     * 'Recoverable+ProtectedSubscription'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
/**
 * @interface
 * An interface representing KeyBundle.
 * A KeyBundle consisting of a WebKey plus its attributes.
 *
 */
export interface KeyBundle {
    /**
     * @member {JsonWebKey} [key] The Json web key.
     */
    key?: JsonWebKey;
    /**
     * @member {KeyAttributes} [attributes] The key management attributes.
     */
    attributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {boolean} [managed] True if the key's lifetime is managed by key
     * vault. If this is a key backing a certificate, then managed will be true.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly managed?: boolean;
}
/**
 * @interface
 * An interface representing KeyItem.
 * The key item containing key metadata.
 *
 */
export interface KeyItem {
    /**
     * @member {string} [kid] Key identifier.
     */
    kid?: string;
    /**
     * @member {KeyAttributes} [attributes] The key management attributes.
     */
    attributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {boolean} [managed] True if the key's lifetime is managed by key
     * vault. If this is a key backing a certificate, then managed will be true.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly managed?: boolean;
}
/**
 * @interface
 * An interface representing DeletedKeyBundle.
 * A DeletedKeyBundle consisting of a WebKey plus its Attributes and deletion
 * info
 *
 * @extends KeyBundle
 */
export interface DeletedKeyBundle extends KeyBundle {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted key.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the key is scheduled to
     * be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the key was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing DeletedKeyItem.
 * The deleted key item containing the deleted key metadata and information
 * about deletion.
 *
 * @extends KeyItem
 */
export interface DeletedKeyItem extends KeyItem {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted key.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the key is scheduled to
     * be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the key was deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing SecretManagementAttributes.
 * The secret management attributes.
 *
 * @extends Attributes
 */
export interface SecretManagementAttributes extends Attributes {
    /**
     * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
     * recovery level currently in effect for secrets in the current vault. If it
     * contains 'Purgeable', the secret can be permanently deleted by a
     * privileged user; otherwise, only the system can purge the secret, at the
     * end of the retention interval. Possible values include: 'Purgeable',
     * 'Recoverable+Purgeable', 'Recoverable',
     * 'Recoverable+ProtectedSubscription'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
/**
 * @interface
 * An interface representing SecretBundle.
 * A secret consisting of a value, id and its attributes.
 *
 */
export interface SecretBundle {
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
     * @member {SecretManagementAttributes} [attributes] The secret management attributes.
     */
    attributes?: SecretManagementAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {string} [kid] If this is a secret backing a KV certificate, then
     * this field specifies the corresponding key backing the KV certificate.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly kid?: string;
    /**
     * @member {boolean} [managed] True if the secret's lifetime is managed by
     * key vault. If this is a secret backing a certificate, then managed will be
     * true.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly managed?: boolean;
}
/**
 * @interface
 * An interface representing SecretItem.
 * The secret item containing secret metadata.
 *
 */
export interface SecretItem {
    /**
     * @member {string} [id] Secret identifier.
     */
    id?: string;
    /**
     * @member {SecretManagementAttributes} [attributes] The secret management attributes.
     */
    attributes?: SecretManagementAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {string} [contentType] Type of the secret value such as a
     * password.
     */
    contentType?: string;
    /**
     * @member {boolean} [managed] True if the secret's lifetime is managed by
     * key vault. If this is a key backing a certificate, then managed will be
     * true.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly managed?: boolean;
}
/**
 * @interface
 * An interface representing DeletedSecretBundle.
 * A Deleted Secret consisting of its previous id, attributes and its tags, as
 * well as information on when it will be purged.
 *
 * @extends SecretBundle
 */
export interface DeletedSecretBundle extends SecretBundle {
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
/**
 * @interface
 * An interface representing DeletedSecretItem.
 * The deleted secret item containing metadata about the deleted secret.
 *
 * @extends SecretItem
 */
export interface DeletedSecretItem extends SecretItem {
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
/**
 * @interface
 * An interface representing SecretRestoreParameters.
 * The secret restore parameters.
 *
 */
export interface SecretRestoreParameters {
    /**
     * @member {Uint8Array} secretBundleBackup The backup blob associated with a
     * secret bundle.
     */
    secretBundleBackup: Uint8Array;
}
/**
 * @interface
 * An interface representing StorageRestoreParameters.
 * The secret restore parameters.
 *
 */
export interface StorageRestoreParameters {
    /**
     * @member {Uint8Array} storageBundleBackup The backup blob associated with a
     * storage account.
     */
    storageBundleBackup: Uint8Array;
}
/**
 * @interface
 * An interface representing CertificateAttributes.
 * The certificate management attributes.
 *
 * @extends Attributes
 */
export interface CertificateAttributes extends Attributes {
    /**
     * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
     * recovery level currently in effect for certificates in the current vault.
     * If it contains 'Purgeable', the certificate can be permanently deleted by
     * a privileged user; otherwise, only the system can purge the certificate,
     * at the end of the retention interval. Possible values include:
     * 'Purgeable', 'Recoverable+Purgeable', 'Recoverable',
     * 'Recoverable+ProtectedSubscription'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
/**
 * @interface
 * An interface representing CertificateItem.
 * The certificate item containing certificate metadata.
 *
 */
export interface CertificateItem {
    /**
     * @member {string} [id] Certificate identifier.
     */
    id?: string;
    /**
     * @member {CertificateAttributes} [attributes] The certificate management
     * attributes.
     */
    attributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {Uint8Array} [x509Thumbprint] Thumbprint of the certificate.
     */
    x509Thumbprint?: Uint8Array;
}
/**
 * @interface
 * An interface representing CertificateIssuerItem.
 * The certificate issuer item containing certificate issuer metadata.
 *
 */
export interface CertificateIssuerItem {
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
 * An interface representing KeyProperties.
 * Properties of the key pair backing a certificate.
 *
 */
export interface KeyProperties {
    /**
     * @member {boolean} [exportable] Indicates if the private key can be
     * exported.
     */
    exportable?: boolean;
    /**
     * @member {JsonWebKeyType} [keyType] The type of key pair to be used for the
     * certificate. Possible values include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM',
     * 'oct'
     */
    keyType?: JsonWebKeyType;
    /**
     * @member {number} [keySize] The key size in bits. For example: 2048, 3072,
     * or 4096 for RSA.
     */
    keySize?: number;
    /**
     * @member {boolean} [reuseKey] Indicates if the same key pair will be used
     * on certificate renewal.
     */
    reuseKey?: boolean;
    /**
     * @member {JsonWebKeyCurveName} [curve] Elliptic curve name. For valid
     * values, see JsonWebKeyCurveName. Possible values include: 'P-256',
     * 'P-384', 'P-521', 'P-256K'
     */
    curve?: JsonWebKeyCurveName;
}
/**
 * @interface
 * An interface representing SecretProperties.
 * Properties of the key backing a certificate.
 *
 */
export interface SecretProperties {
    /**
     * @member {string} [contentType] The media type (MIME type).
     */
    contentType?: string;
}
/**
 * @interface
 * An interface representing SubjectAlternativeNames.
 * The subject alternate names of a X509 object.
 *
 */
export interface SubjectAlternativeNames {
    /**
     * @member {string[]} [emails] Email addresses.
     */
    emails?: string[];
    /**
     * @member {string[]} [dnsNames] Domain names.
     */
    dnsNames?: string[];
    /**
     * @member {string[]} [upns] User principal names.
     */
    upns?: string[];
}
/**
 * @interface
 * An interface representing X509CertificateProperties.
 * Properties of the X509 component of a certificate.
 *
 */
export interface X509CertificateProperties {
    /**
     * @member {string} [subject] The subject name. Should be a valid X509
     * distinguished Name.
     */
    subject?: string;
    /**
     * @member {string[]} [ekus] The enhanced key usage.
     */
    ekus?: string[];
    /**
     * @member {SubjectAlternativeNames} [subjectAlternativeNames] The subject
     * alternative names.
     */
    subjectAlternativeNames?: SubjectAlternativeNames;
    /**
     * @member {KeyUsageType[]} [keyUsage] List of key usages.
     */
    keyUsage?: KeyUsageType[];
    /**
     * @member {number} [validityInMonths] The duration that the ceritifcate is
     * valid in months.
     */
    validityInMonths?: number;
}
/**
 * @interface
 * An interface representing Trigger.
 * A condition to be satisfied for an action to be executed.
 *
 */
export interface Trigger {
    /**
     * @member {number} [lifetimePercentage] Percentage of lifetime at which to
     * trigger. Value should be between 1 and 99.
     */
    lifetimePercentage?: number;
    /**
     * @member {number} [daysBeforeExpiry] Days before expiry to attempt renewal.
     * Value should be between 1 and validity_in_months multiplied by 27. If
     * validity_in_months is 36, then value should be between 1 and 972 (36 *
     * 27).
     */
    daysBeforeExpiry?: number;
}
/**
 * @interface
 * An interface representing Action.
 * The action that will be executed.
 *
 */
export interface Action {
    /**
     * @member {ActionType} [actionType] The type of the action. Possible values
     * include: 'EmailContacts', 'AutoRenew'
     */
    actionType?: ActionType;
}
/**
 * @interface
 * An interface representing LifetimeAction.
 * Action and its trigger that will be performed by Key Vault over the lifetime
 * of a certificate.
 *
 */
export interface LifetimeAction {
    /**
     * @member {Trigger} [trigger] The condition that will execute the action.
     */
    trigger?: Trigger;
    /**
     * @member {Action} [action] The action that will be executed.
     */
    action?: Action;
}
/**
 * @interface
 * An interface representing IssuerParameters.
 * Parameters for the issuer of the X509 component of a certificate.
 *
 */
export interface IssuerParameters {
    /**
     * @member {string} [name] Name of the referenced issuer object or reserved
     * names; for example, 'Self' or 'Unknown'.
     */
    name?: string;
    /**
     * @member {string} [certificateType] Type of certificate to be requested
     * from the issuer provider.
     */
    certificateType?: string;
    /**
     * @member {boolean} [certificateTransparency] Indicates if the certificates
     * generated under this policy should be published to certificate
     * transparency logs.
     */
    certificateTransparency?: boolean;
}
/**
 * @interface
 * An interface representing CertificatePolicy.
 * Management policy for a certificate.
 *
 */
export interface CertificatePolicy {
    /**
     * @member {string} [id] The certificate id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {KeyProperties} [keyProperties] Properties of the key backing a
     * certificate.
     */
    keyProperties?: KeyProperties;
    /**
     * @member {SecretProperties} [secretProperties] Properties of the secret
     * backing a certificate.
     */
    secretProperties?: SecretProperties;
    /**
     * @member {X509CertificateProperties} [x509CertificateProperties] Properties
     * of the X509 component of a certificate.
     */
    x509CertificateProperties?: X509CertificateProperties;
    /**
     * @member {LifetimeAction[]} [lifetimeActions] Actions that will be
     * performed by Key Vault over the lifetime of a certificate.
     */
    lifetimeActions?: LifetimeAction[];
    /**
     * @member {IssuerParameters} [issuerParameters] Parameters for the issuer of
     * the X509 component of a certificate.
     */
    issuerParameters?: IssuerParameters;
    /**
     * @member {CertificateAttributes} [attributes] The certificate attributes.
     */
    attributes?: CertificateAttributes;
}
/**
 * @interface
 * An interface representing CertificateBundle.
 * A certificate bundle consists of a certificate (X509) plus its attributes.
 *
 */
export interface CertificateBundle {
    /**
     * @member {string} [id] The certificate id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
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
     * @member {Uint8Array} [x509Thumbprint] Thumbprint of the certificate.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly x509Thumbprint?: Uint8Array;
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
    /**
     * @member {CertificateAttributes} [attributes] The certificate attributes.
     */
    attributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing DeletedCertificateBundle.
 * A Deleted Certificate consisting of its previous id, attributes and its
 * tags, as well as information on when it will be purged.
 *
 * @extends CertificateBundle
 */
export interface DeletedCertificateBundle extends CertificateBundle {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted certificate.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the certificate is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the certificate was deleted, in
     * UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing DeletedCertificateItem.
 * The deleted certificate item containing metadata about the deleted
 * certificate.
 *
 * @extends CertificateItem
 */
export interface DeletedCertificateItem extends CertificateItem {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted certificate.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the certificate is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the certificate was deleted, in
     * UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing ErrorModel.
 * The key vault server error.
 *
 */
export interface ErrorModel {
    /**
     * @member {string} [code] The error code.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly code?: string;
    /**
     * @member {string} [message] The error message.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly message?: string;
    /**
     * @member {ErrorModel} [innerError] **NOTE: This property will not be
     * serialized. It can only be populated by the server.**
     */
    readonly innerError?: ErrorModel;
}
/**
 * @interface
 * An interface representing CertificateOperation.
 * A certificate operation is returned in case of asynchronous requests.
 *
 */
export interface CertificateOperation {
    /**
     * @member {string} [id] The certificate id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {IssuerParameters} [issuerParameters] Parameters for the issuer of
     * the X509 component of a certificate.
     */
    issuerParameters?: IssuerParameters;
    /**
     * @member {Uint8Array} [csr] The certificate signing request (CSR) that is
     * being used in the certificate operation.
     */
    csr?: Uint8Array;
    /**
     * @member {boolean} [cancellationRequested] Indicates if cancellation was
     * requested on the certificate operation.
     */
    cancellationRequested?: boolean;
    /**
     * @member {string} [status] Status of the certificate operation.
     */
    status?: string;
    /**
     * @member {string} [statusDetails] The status details of the certificate
     * operation.
     */
    statusDetails?: string;
    /**
     * @member {ErrorModel} [error] Error encountered, if any, during the
     * certificate operation.
     */
    error?: ErrorModel;
    /**
     * @member {string} [target] Location which contains the result of the
     * certificate operation.
     */
    target?: string;
    /**
     * @member {string} [requestId] Identifier for the certificate operation.
     */
    requestId?: string;
}
/**
 * @interface
 * An interface representing IssuerCredentials.
 * The credentials to be used for the certificate issuer.
 *
 */
export interface IssuerCredentials {
    /**
     * @member {string} [accountId] The user name/account name/account id.
     */
    accountId?: string;
    /**
     * @member {string} [password] The password/secret/account key.
     */
    password?: string;
}
/**
 * @interface
 * An interface representing AdministratorDetails.
 * Details of the organization administrator of the certificate issuer.
 *
 */
export interface AdministratorDetails {
    /**
     * @member {string} [firstName] First name.
     */
    firstName?: string;
    /**
     * @member {string} [lastName] Last name.
     */
    lastName?: string;
    /**
     * @member {string} [emailAddress] Email addresss.
     */
    emailAddress?: string;
    /**
     * @member {string} [phone] Phone number.
     */
    phone?: string;
}
/**
 * @interface
 * An interface representing OrganizationDetails.
 * Details of the organization of the certificate issuer.
 *
 */
export interface OrganizationDetails {
    /**
     * @member {string} [id] Id of the organization.
     */
    id?: string;
    /**
     * @member {AdministratorDetails[]} [adminDetails] Details of the
     * organization administrator.
     */
    adminDetails?: AdministratorDetails[];
}
/**
 * @interface
 * An interface representing IssuerAttributes.
 * The attributes of an issuer managed by the Key Vault service.
 *
 */
export interface IssuerAttributes {
    /**
     * @member {boolean} [enabled] Determines whether the issuer is enabled.
     */
    enabled?: boolean;
    /**
     * @member {Date} [created] Creation time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly created?: Date;
    /**
     * @member {Date} [updated] Last updated time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly updated?: Date;
}
/**
 * @interface
 * An interface representing IssuerBundle.
 * The issuer for Key Vault certificate.
 *
 */
export interface IssuerBundle {
    /**
     * @member {string} [id] Identifier for the issuer object.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {string} [provider] The issuer provider.
     */
    provider?: string;
    /**
     * @member {IssuerCredentials} [credentials] The credentials to be used for
     * the issuer.
     */
    credentials?: IssuerCredentials;
    /**
     * @member {OrganizationDetails} [organizationDetails] Details of the
     * organization as provided to the issuer.
     */
    organizationDetails?: OrganizationDetails;
    /**
     * @member {IssuerAttributes} [attributes] Attributes of the issuer object.
     */
    attributes?: IssuerAttributes;
}
/**
 * @interface
 * An interface representing Contact.
 * The contact information for the vault certificates.
 *
 */
export interface Contact {
    /**
     * @member {string} [emailAddress] Email addresss.
     */
    emailAddress?: string;
    /**
     * @member {string} [name] Name.
     */
    name?: string;
    /**
     * @member {string} [phone] Phone number.
     */
    phone?: string;
}
/**
 * @interface
 * An interface representing Contacts.
 * The contacts for the vault certificates.
 *
 */
export interface Contacts {
    /**
     * @member {string} [id] Identifier for the contacts collection.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {Contact[]} [contactList] The contact list for the vault
     * certificates.
     */
    contactList?: Contact[];
}
/**
 * @interface
 * An interface representing KeyCreateParameters.
 * The key create parameters.
 *
 */
export interface KeyCreateParameters {
    /**
     * @member {JsonWebKeyType} kty The type of key to create. For valid values,
     * see JsonWebKeyType. Possible values include: 'EC', 'EC-HSM', 'RSA',
     * 'RSA-HSM', 'oct'
     */
    kty: JsonWebKeyType;
    /**
     * @member {number} [keySize] The key size in bits. For example: 2048, 3072,
     * or 4096 for RSA.
     */
    keySize?: number;
    /**
     * @member {JsonWebKeyOperation[]} [keyOps]
     */
    keyOps?: JsonWebKeyOperation[];
    /**
     * @member {KeyAttributes} [keyAttributes]
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {JsonWebKeyCurveName} [curve] Elliptic curve name. For valid
     * values, see JsonWebKeyCurveName. Possible values include: 'P-256',
     * 'P-384', 'P-521', 'P-256K'
     */
    curve?: JsonWebKeyCurveName;
}
/**
 * @interface
 * An interface representing KeyImportParameters.
 * The key import parameters.
 *
 */
export interface KeyImportParameters {
    /**
     * @member {boolean} [hsm] Whether to import as a hardware key (HSM) or
     * software key.
     */
    hsm?: boolean;
    /**
     * @member {JsonWebKey} key The Json web key
     */
    key: JsonWebKey;
    /**
     * @member {KeyAttributes} [keyAttributes] The key management attributes.
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyOperationsParameters.
 * The key operations parameters.
 *
 */
export interface KeyOperationsParameters {
    /**
     * @member {JsonWebKeyEncryptionAlgorithm} algorithm algorithm identifier.
     * Possible values include: 'RSA-OAEP', 'RSA-OAEP-256', 'RSA1_5'
     */
    algorithm: JsonWebKeyEncryptionAlgorithm;
    /**
     * @member {Uint8Array} value
     */
    value: Uint8Array;
}
/**
 * @interface
 * An interface representing KeySignParameters.
 * The key operations parameters.
 *
 */
export interface KeySignParameters {
    /**
     * @member {JsonWebKeySignatureAlgorithm} algorithm The signing/verification
     * algorithm identifier. For more information on possible algorithm types,
     * see JsonWebKeySignatureAlgorithm. Possible values include: 'PS256',
     * 'PS384', 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384',
     * 'ES512', 'ES256K'
     */
    algorithm: JsonWebKeySignatureAlgorithm;
    /**
     * @member {Uint8Array} value
     */
    value: Uint8Array;
}
/**
 * @interface
 * An interface representing KeyVerifyParameters.
 * The key verify parameters.
 *
 */
export interface KeyVerifyParameters {
    /**
     * @member {JsonWebKeySignatureAlgorithm} algorithm The signing/verification
     * algorithm. For more information on possible algorithm types, see
     * JsonWebKeySignatureAlgorithm. Possible values include: 'PS256', 'PS384',
     * 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL', 'ES256', 'ES384', 'ES512',
     * 'ES256K'
     */
    algorithm: JsonWebKeySignatureAlgorithm;
    /**
     * @member {Uint8Array} digest The digest used for signing.
     */
    digest: Uint8Array;
    /**
     * @member {Uint8Array} signature The signature to be verified.
     */
    signature: Uint8Array;
}
/**
 * @interface
 * An interface representing KeyUpdateParameters.
 * The key update parameters.
 *
 */
export interface KeyUpdateParameters {
    /**
     * @member {JsonWebKeyOperation[]} [keyOps] Json web key operations. For more
     * information on possible key operations, see JsonWebKeyOperation.
     */
    keyOps?: JsonWebKeyOperation[];
    /**
     * @member {KeyAttributes} [keyAttributes]
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyRestoreParameters.
 * The key restore parameters.
 *
 */
export interface KeyRestoreParameters {
    /**
     * @member {Uint8Array} keyBundleBackup The backup blob associated with a key
     * bundle.
     */
    keyBundleBackup: Uint8Array;
}
/**
 * @interface
 * An interface representing SecretSetParameters.
 * The secret set parameters.
 *
 */
export interface SecretSetParameters {
    /**
     * @member {string} value The value of the secret.
     */
    value: string;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {string} [contentType] Type of the secret value such as a
     * password.
     */
    contentType?: string;
    /**
     * @member {SecretManagementAttributes} [secretAttributes] The secret management
     * attributes.
     */
    secretAttributes?: SecretManagementAttributes;
}
/**
 * @interface
 * An interface representing SecretUpdateParameters.
 * The secret update parameters.
 *
 */
export interface SecretUpdateParameters {
    /**
     * @member {string} [contentType] Type of the secret value such as a
     * password.
     */
    contentType?: string;
    /**
     * @member {SecretManagementAttributes} [secretAttributes] The secret management
     * attributes.
     */
    secretAttributes?: SecretManagementAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing CertificateCreateParameters.
 * The certificate create parameters.
 *
 */
export interface CertificateCreateParameters {
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing CertificateImportParameters.
 * The certificate import parameters.
 *
 */
export interface CertificateImportParameters {
    /**
     * @member {string} base64EncodedCertificate Base64 encoded representation of
     * the certificate object to import. This certificate needs to contain the
     * private key.
     */
    base64EncodedCertificate: string;
    /**
     * @member {string} [password] If the private key in base64EncodedCertificate
     * is encrypted, the password used for encryption.
     */
    password?: string;
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing CertificateUpdateParameters.
 * The certificate update parameters.
 *
 */
export interface CertificateUpdateParameters {
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing CertificateMergeParameters.
 * The certificate merge parameters
 *
 */
export interface CertificateMergeParameters {
    /**
     * @member {Uint8Array[]} x509Certificates The certificate or the certificate
     * chain to merge.
     */
    x509Certificates: Uint8Array[];
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing CertificateIssuerSetParameters.
 * The certificate issuer set parameters.
 *
 */
export interface CertificateIssuerSetParameters {
    /**
     * @member {string} provider The issuer provider.
     */
    provider: string;
    /**
     * @member {IssuerCredentials} [credentials] The credentials to be used for
     * the issuer.
     */
    credentials?: IssuerCredentials;
    /**
     * @member {OrganizationDetails} [organizationDetails] Details of the
     * organization as provided to the issuer.
     */
    organizationDetails?: OrganizationDetails;
    /**
     * @member {IssuerAttributes} [attributes] Attributes of the issuer object.
     */
    attributes?: IssuerAttributes;
}
/**
 * @interface
 * An interface representing CertificateIssuerUpdateParameters.
 * The certificate issuer update parameters.
 *
 */
export interface CertificateIssuerUpdateParameters {
    /**
     * @member {string} [provider] The issuer provider.
     */
    provider?: string;
    /**
     * @member {IssuerCredentials} [credentials] The credentials to be used for
     * the issuer.
     */
    credentials?: IssuerCredentials;
    /**
     * @member {OrganizationDetails} [organizationDetails] Details of the
     * organization as provided to the issuer.
     */
    organizationDetails?: OrganizationDetails;
    /**
     * @member {IssuerAttributes} [attributes] Attributes of the issuer object.
     */
    attributes?: IssuerAttributes;
}
/**
 * @interface
 * An interface representing CertificateOperationUpdateParameter.
 * The certificate operation update parameters.
 *
 */
export interface CertificateOperationUpdateParameter {
    /**
     * @member {boolean} cancellationRequested Indicates if cancellation was
     * requested on the certificate operation.
     */
    cancellationRequested: boolean;
}
/**
 * @interface
 * An interface representing KeyOperationResult.
 * The key operation result.
 *
 */
export interface KeyOperationResult {
    /**
     * @member {string} [kid] Key identifier
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly kid?: string;
    /**
     * @member {Uint8Array} [result] **NOTE: This property will not be
     * serialized. It can only be populated by the server.**
     */
    readonly result?: Uint8Array;
}
/**
 * @interface
 * An interface representing KeyVerifyResult.
 * The key verify result.
 *
 */
export interface KeyVerifyResult {
    /**
     * @member {boolean} [value] True if the signature is verified, otherwise
     * false.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: boolean;
}
/**
 * @interface
 * An interface representing BackupKeyResult.
 * The backup key result, containing the backup blob.
 *
 */
export interface BackupKeyResult {
    /**
     * @member {Uint8Array} [value] The backup blob containing the backed up key.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: Uint8Array;
}
/**
 * @interface
 * An interface representing BackupSecretResult.
 * The backup secret result, containing the backup blob.
 *
 */
export interface BackupSecretResult {
    /**
     * @member {Uint8Array} [value] The backup blob containing the backed up
     * secret.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: Uint8Array;
}
/**
 * @interface
 * An interface representing BackupStorageResult.
 * The backup storage result, containing the backup blob.
 *
 */
export interface BackupStorageResult {
    /**
     * @member {Uint8Array} [value] The backup blob containing the backed up
     * storage account.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: Uint8Array;
}
/**
 * @interface
 * An interface representing PendingCertificateSigningRequestResult.
 * The pending certificate signing request result.
 *
 */
export interface PendingCertificateSigningRequestResult {
    /**
     * @member {string} [value] The pending certificate signing request as Base64
     * encoded string.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: string;
}
/**
 * @interface
 * An interface representing StorageAccountAttributes.
 * The storage account management attributes.
 *
 */
export interface StorageAccountAttributes {
    /**
     * @member {boolean} [enabled] the enabled state of the object.
     */
    enabled?: boolean;
    /**
     * @member {Date} [created] Creation time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly created?: Date;
    /**
     * @member {Date} [updated] Last updated time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly updated?: Date;
    /**
     * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
     * recovery level currently in effect for storage accounts in the current
     * vault. If it contains 'Purgeable' the storage account can be permanently
     * deleted by a privileged user; otherwise, only the system can purge the
     * storage account, at the end of the retention interval. Possible values
     * include: 'Purgeable', 'Recoverable+Purgeable', 'Recoverable',
     * 'Recoverable+ProtectedSubscription'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
/**
 * @interface
 * An interface representing StorageBundle.
 * A Storage account bundle consists of key vault storage account details plus
 * its attributes.
 *
 */
export interface StorageBundle {
    /**
     * @member {string} [id] The storage account id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {string} [resourceId] The storage account resource id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly resourceId?: string;
    /**
     * @member {string} [activeKeyName] The current active storage account key
     * name.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly activeKeyName?: string;
    /**
     * @member {boolean} [autoRegenerateKey] whether keyvault should manage the
     * storage account for the user.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly autoRegenerateKey?: boolean;
    /**
     * @member {string} [regenerationPeriod] The key regeneration time duration
     * specified in ISO-8601 format.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly regenerationPeriod?: string;
    /**
     * @member {StorageAccountAttributes} [attributes] The storage account
     * attributes.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly attributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing DeletedStorageBundle.
 * A deleted storage account bundle consisting of its previous id, attributes
 * and its tags, as well as information on when it will be purged.
 *
 * @extends StorageBundle
 */
export interface DeletedStorageBundle extends StorageBundle {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted storage account.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the storage account is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the storage account was
     * deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing StorageAccountCreateParameters.
 * The storage account create parameters.
 *
 */
export interface StorageAccountCreateParameters {
    /**
     * @member {string} resourceId Storage account resource id.
     */
    resourceId: string;
    /**
     * @member {string} activeKeyName Current active storage account key name.
     */
    activeKeyName: string;
    /**
     * @member {boolean} autoRegenerateKey whether keyvault should manage the
     * storage account for the user.
     */
    autoRegenerateKey: boolean;
    /**
     * @member {string} [regenerationPeriod] The key regeneration time duration
     * specified in ISO-8601 format.
     */
    regenerationPeriod?: string;
    /**
     * @member {StorageAccountAttributes} [storageAccountAttributes] The
     * attributes of the storage account.
     */
    storageAccountAttributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing StorageAccountUpdateParameters.
 * The storage account update parameters.
 *
 */
export interface StorageAccountUpdateParameters {
    /**
     * @member {string} [activeKeyName] The current active storage account key
     * name.
     */
    activeKeyName?: string;
    /**
     * @member {boolean} [autoRegenerateKey] whether keyvault should manage the
     * storage account for the user.
     */
    autoRegenerateKey?: boolean;
    /**
     * @member {string} [regenerationPeriod] The key regeneration time duration
     * specified in ISO-8601 format.
     */
    regenerationPeriod?: string;
    /**
     * @member {StorageAccountAttributes} [storageAccountAttributes] The
     * attributes of the storage account.
     */
    storageAccountAttributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing StorageAccountRegenerteKeyParameters.
 * The storage account key regenerate parameters.
 *
 */
export interface StorageAccountRegenerteKeyParameters {
    /**
     * @member {string} keyName The storage account key name.
     */
    keyName: string;
}
/**
 * @interface
 * An interface representing StorageAccountItem.
 * The storage account item containing storage account metadata.
 *
 */
export interface StorageAccountItem {
    /**
     * @member {string} [id] Storage identifier.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {string} [resourceId] Storage account resource Id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly resourceId?: string;
    /**
     * @member {StorageAccountAttributes} [attributes] The storage account
     * management attributes.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly attributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing DeletedStorageAccountItem.
 * The deleted storage account item containing metadata about the deleted
 * storage account.
 *
 * @extends StorageAccountItem
 */
export interface DeletedStorageAccountItem extends StorageAccountItem {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted storage account.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the storage account is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the storage account was
     * deleted, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing SasDefinitionAttributes.
 * The SAS definition management attributes.
 *
 */
export interface SasDefinitionAttributes {
    /**
     * @member {boolean} [enabled] the enabled state of the object.
     */
    enabled?: boolean;
    /**
     * @member {Date} [created] Creation time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly created?: Date;
    /**
     * @member {Date} [updated] Last updated time in UTC.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly updated?: Date;
    /**
     * @member {DeletionRecoveryLevel} [recoveryLevel] Reflects the deletion
     * recovery level currently in effect for SAS definitions in the current
     * vault. If it contains 'Purgeable' the SAS definition can be permanently
     * deleted by a privileged user; otherwise, only the system can purge the SAS
     * definition, at the end of the retention interval. Possible values include:
     * 'Purgeable', 'Recoverable+Purgeable', 'Recoverable',
     * 'Recoverable+ProtectedSubscription'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
/**
 * @interface
 * An interface representing SasDefinitionBundle.
 * A SAS definition bundle consists of key vault SAS definition details plus
 * its attributes.
 *
 */
export interface SasDefinitionBundle {
    /**
     * @member {string} [id] The SAS definition id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {string} [secretId] Storage account SAS definition secret id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly secretId?: string;
    /**
     * @member {string} [templateUri] The SAS definition token template signed
     * with an arbitrary key.  Tokens created according to the SAS definition
     * will have the same properties as the template.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly templateUri?: string;
    /**
     * @member {SasTokenType} [sasType] The type of SAS token the SAS definition
     * will create. Possible values include: 'account', 'service'
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly sasType?: SasTokenType;
    /**
     * @member {string} [validityPeriod] The validity period of SAS tokens
     * created according to the SAS definition.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly validityPeriod?: string;
    /**
     * @member {SasDefinitionAttributes} [attributes] The SAS definition
     * attributes.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly attributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing DeletedSasDefinitionBundle.
 * A deleted SAS definition bundle consisting of its previous id, attributes
 * and its tags, as well as information on when it will be purged.
 *
 * @extends SasDefinitionBundle
 */
export interface DeletedSasDefinitionBundle extends SasDefinitionBundle {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted SAS definition.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the SAS definition is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the SAS definition was deleted,
     * in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing SasDefinitionItem.
 * The SAS definition item containing storage SAS definition metadata.
 *
 */
export interface SasDefinitionItem {
    /**
     * @member {string} [id] The storage SAS identifier.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly id?: string;
    /**
     * @member {string} [secretId] The storage account SAS definition secret id.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly secretId?: string;
    /**
     * @member {SasDefinitionAttributes} [attributes] The SAS definition
     * management attributes.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly attributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing DeletedSasDefinitionItem.
 * The deleted SAS definition item containing metadata about the deleted SAS
 * definition.
 *
 * @extends SasDefinitionItem
 */
export interface DeletedSasDefinitionItem extends SasDefinitionItem {
    /**
     * @member {string} [recoveryId] The url of the recovery object, used to
     * identify and recover the deleted SAS definition.
     */
    recoveryId?: string;
    /**
     * @member {Date} [scheduledPurgeDate] The time when the SAS definition is
     * scheduled to be purged, in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly scheduledPurgeDate?: Date;
    /**
     * @member {Date} [deletedDate] The time when the SAS definition was deleted,
     * in UTC
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly deletedDate?: Date;
}
/**
 * @interface
 * An interface representing SasDefinitionCreateParameters.
 * The SAS definition create parameters.
 *
 */
export interface SasDefinitionCreateParameters {
    /**
     * @member {string} templateUri The SAS definition token template signed with
     * an arbitrary key.  Tokens created according to the SAS definition will
     * have the same properties as the template.
     */
    templateUri: string;
    /**
     * @member {SasTokenType} sasType The type of SAS token the SAS definition
     * will create. Possible values include: 'account', 'service'
     */
    sasType: SasTokenType;
    /**
     * @member {string} validityPeriod The validity period of SAS tokens created
     * according to the SAS definition.
     */
    validityPeriod: string;
    /**
     * @member {SasDefinitionAttributes} [sasDefinitionAttributes] The attributes
     * of the SAS definition.
     */
    sasDefinitionAttributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing SasDefinitionUpdateParameters.
 * The SAS definition update parameters.
 *
 */
export interface SasDefinitionUpdateParameters {
    /**
     * @member {string} [templateUri] The SAS definition token template signed
     * with an arbitrary key.  Tokens created according to the SAS definition
     * will have the same properties as the template.
     */
    templateUri?: string;
    /**
     * @member {SasTokenType} [sasType] The type of SAS token the SAS definition
     * will create. Possible values include: 'account', 'service'
     */
    sasType?: SasTokenType;
    /**
     * @member {string} [validityPeriod] The validity period of SAS tokens
     * created according to the SAS definition.
     */
    validityPeriod?: string;
    /**
     * @member {SasDefinitionAttributes} [sasDefinitionAttributes] The attributes
     * of the SAS definition.
     */
    sasDefinitionAttributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultError.
 * The key vault error exception.
 *
 */
export interface KeyVaultError {
    /**
     * @member {ErrorModel} [error] **NOTE: This property will not be serialized.
     * It can only be populated by the server.**
     */
    readonly error?: ErrorModel;
}
/**
 * @interface
 * An interface representing CertificateRestoreParameters.
 * The certificate restore parameters.
 *
 */
export interface CertificateRestoreParameters {
    /**
     * @member {Uint8Array} certificateBundleBackup The backup blob associated
     * with a certificate bundle.
     */
    certificateBundleBackup: Uint8Array;
}
/**
 * @interface
 * An interface representing BackupCertificateResult.
 * The backup certificate result, containing the backup blob.
 *
 */
export interface BackupCertificateResult {
    /**
     * @member {Uint8Array} [value] The backup blob containing the backed up
     * certificate.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly value?: Uint8Array;
}
/**
 * @interface
 * An interface representing KeyVaultClientCreateKeyOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientCreateKeyOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [keySize] The key size in bits. For example: 2048, 3072,
     * or 4096 for RSA.
     */
    keySize?: number;
    /**
     * @member {JsonWebKeyOperation[]} [keyOps]
     */
    keyOps?: JsonWebKeyOperation[];
    /**
     * @member {KeyAttributes} [keyAttributes]
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {JsonWebKeyCurveName} [curve] Elliptic curve name. For valid
     * values, see JsonWebKeyCurveName. Possible values include: 'P-256',
     * 'P-384', 'P-521', 'P-256K'
     */
    curve?: JsonWebKeyCurveName;
}
/**
 * @interface
 * An interface representing KeyVaultClientImportKeyOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientImportKeyOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {boolean} [hsm] Whether to import as a hardware key (HSM) or
     * software key.
     */
    hsm?: boolean;
    /**
     * @member {KeyAttributes} [keyAttributes] The key management attributes.
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateKeyOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateKeyOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {JsonWebKeyOperation[]} [keyOps] Json web key operations. For more
     * information on possible key operations, see JsonWebKeyOperation.
     */
    keyOps?: JsonWebKeyOperation[];
    /**
     * @member {KeyAttributes} [keyAttributes]
     */
    keyAttributes?: KeyAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientGetKeyVersionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetKeyVersionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetKeysOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetKeysOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetDeletedKeysOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetDeletedKeysOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientSetSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientSetSecretOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
    /**
     * @member {string} [contentType] Type of the secret value such as a
     * password.
     */
    contentType?: string;
    /**
     * @member {SecretManagementAttributes} [secretAttributes] The secret management
     * attributes.
     */
    secretAttributes?: SecretManagementAttributes;
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateSecretOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateSecretOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [contentType] Type of the secret value such as a
     * password.
     */
    contentType?: string;
    /**
     * @member {SecretManagementAttributes} [secretAttributes] The secret management
     * attributes.
     */
    secretAttributes?: SecretManagementAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientGetSecretsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetSecretsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified, the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetSecretVersionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetSecretVersionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified, the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetDeletedSecretsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetDeletedSecretsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetCertificatesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetCertificatesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
    /**
     * @member {boolean} [includePending] Specifies whether to include
     * certificates which are not completely provisioned.
     */
    includePending?: boolean;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetCertificateIssuersOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetCertificateIssuersOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientSetCertificateIssuerOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientSetCertificateIssuerOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {IssuerCredentials} [credentials] The credentials to be used for
     * the issuer.
     */
    credentials?: IssuerCredentials;
    /**
     * @member {OrganizationDetails} [organizationDetails] Details of the
     * organization as provided to the issuer.
     */
    organizationDetails?: OrganizationDetails;
    /**
     * @member {IssuerAttributes} [attributes] Attributes of the issuer object.
     */
    attributes?: IssuerAttributes;
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateCertificateIssuerOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateCertificateIssuerOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [provider] The issuer provider.
     */
    provider?: string;
    /**
     * @member {IssuerCredentials} [credentials] The credentials to be used for
     * the issuer.
     */
    credentials?: IssuerCredentials;
    /**
     * @member {OrganizationDetails} [organizationDetails] Details of the
     * organization as provided to the issuer.
     */
    organizationDetails?: OrganizationDetails;
    /**
     * @member {IssuerAttributes} [attributes] Attributes of the issuer object.
     */
    attributes?: IssuerAttributes;
}
/**
 * @interface
 * An interface representing KeyVaultClientCreateCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientCreateCertificateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientImportCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientImportCertificateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [password] If the private key in base64EncodedCertificate
     * is encrypted, the password used for encryption.
     */
    password?: string;
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientGetCertificateVersionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetCertificateVersionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateCertificateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {CertificatePolicy} [certificatePolicy] The management policy for
     * the certificate.
     */
    certificatePolicy?: CertificatePolicy;
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientMergeCertificateOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientMergeCertificateOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {CertificateAttributes} [certificateAttributes] The attributes of
     * the certificate (optional).
     */
    certificateAttributes?: CertificateAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientGetDeletedCertificatesOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetDeletedCertificatesOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
    /**
     * @member {boolean} [includePending] Specifies whether to include
     * certificates which are not completely provisioned.
     */
    includePending?: boolean;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetStorageAccountsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetStorageAccountsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetDeletedStorageAccountsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetDeletedStorageAccountsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientSetStorageAccountOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientSetStorageAccountOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [regenerationPeriod] The key regeneration time duration
     * specified in ISO-8601 format.
     */
    regenerationPeriod?: string;
    /**
     * @member {StorageAccountAttributes} [storageAccountAttributes] The
     * attributes of the storage account.
     */
    storageAccountAttributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateStorageAccountOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateStorageAccountOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [activeKeyName] The current active storage account key
     * name.
     */
    activeKeyName?: string;
    /**
     * @member {boolean} [autoRegenerateKey] whether keyvault should manage the
     * storage account for the user.
     */
    autoRegenerateKey?: boolean;
    /**
     * @member {string} [regenerationPeriod] The key regeneration time duration
     * specified in ISO-8601 format.
     */
    regenerationPeriod?: string;
    /**
     * @member {StorageAccountAttributes} [storageAccountAttributes] The
     * attributes of the storage account.
     */
    storageAccountAttributes?: StorageAccountAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientGetSasDefinitionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetSasDefinitionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientGetDeletedSasDefinitionsOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientGetDeletedSasDefinitionsOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {number} [maxresults] Maximum number of results to return in a
     * page. If not specified the service will return up to 25 results.
     */
    maxresults?: number;
}
/**
 * @interface
 * An interface representing KeyVaultClientSetSasDefinitionOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientSetSasDefinitionOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {SasDefinitionAttributes} [sasDefinitionAttributes] The attributes
     * of the SAS definition.
     */
    sasDefinitionAttributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing KeyVaultClientUpdateSasDefinitionOptionalParams.
 * Optional Parameters.
 *
 * @extends RequestOptionsBase
 */
export interface KeyVaultClientUpdateSasDefinitionOptionalParams extends msRest.RequestOptionsBase {
    /**
     * @member {string} [templateUri] The SAS definition token template signed
     * with an arbitrary key.  Tokens created according to the SAS definition
     * will have the same properties as the template.
     */
    templateUri?: string;
    /**
     * @member {SasTokenType} [sasType] The type of SAS token the SAS definition
     * will create. Possible values include: 'account', 'service'
     */
    sasType?: SasTokenType;
    /**
     * @member {string} [validityPeriod] The validity period of SAS tokens
     * created according to the SAS definition.
     */
    validityPeriod?: string;
    /**
     * @member {SasDefinitionAttributes} [sasDefinitionAttributes] The attributes
     * of the SAS definition.
     */
    sasDefinitionAttributes?: SasDefinitionAttributes;
    /**
     * @member {{ [propertyName: string]: string }} [tags] Application specific
     * metadata in the form of key-value pairs.
     */
    tags?: {
        [propertyName: string]: string;
    };
}
/**
 * @interface
 * An interface representing the KeyListResult.
 * The key list result.
 *
 * @extends Array<KeyItem>
 */
export interface KeyListResult extends Array<KeyItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of keys.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the DeletedKeyListResult.
 * A list of keys that have been deleted in this vault.
 *
 * @extends Array<DeletedKeyItem>
 */
export interface DeletedKeyListResult extends Array<DeletedKeyItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of deleted keys.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the SecretListResult.
 * The secret list result.
 *
 * @extends Array<SecretItem>
 */
export interface SecretListResult extends Array<SecretItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of secrets.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the DeletedSecretListResult.
 * The deleted secret list result
 *
 * @extends Array<DeletedSecretItem>
 */
export interface DeletedSecretListResult extends Array<DeletedSecretItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of deleted
     * secrets.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the CertificateListResult.
 * The certificate list result.
 *
 * @extends Array<CertificateItem>
 */
export interface CertificateListResult extends Array<CertificateItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of certificates.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the CertificateIssuerListResult.
 * The certificate issuer list result.
 *
 * @extends Array<CertificateIssuerItem>
 */
export interface CertificateIssuerListResult extends Array<CertificateIssuerItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of certificate
     * issuers.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the DeletedCertificateListResult.
 * A list of certificates that have been deleted in this vault.
 *
 * @extends Array<DeletedCertificateItem>
 */
export interface DeletedCertificateListResult extends Array<DeletedCertificateItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of deleted
     * certificates.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the StorageListResult.
 * The storage accounts list result.
 *
 * @extends Array<StorageAccountItem>
 */
export interface StorageListResult extends Array<StorageAccountItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of storage
     * accounts.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the DeletedStorageListResult.
 * The deleted storage account list result
 *
 * @extends Array<DeletedStorageAccountItem>
 */
export interface DeletedStorageListResult extends Array<DeletedStorageAccountItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of deleted storage
     * accounts.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the SasDefinitionListResult.
 * The storage account SAS definition list result.
 *
 * @extends Array<SasDefinitionItem>
 */
export interface SasDefinitionListResult extends Array<SasDefinitionItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of SAS defintions.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * @interface
 * An interface representing the DeletedSasDefinitionListResult.
 * The deleted SAS definition list result
 *
 * @extends Array<DeletedSasDefinitionItem>
 */
export interface DeletedSasDefinitionListResult extends Array<DeletedSasDefinitionItem> {
    /**
     * @member {string} [nextLink] The URL to get the next set of deleted SAS
     * definitions.
     * **NOTE: This property will not be serialized. It can only be populated by
     * the server.**
     */
    readonly nextLink?: string;
}
/**
 * Defines values for JsonWebKeyType.
 * Possible values include: 'EC', 'EC-HSM', 'RSA', 'RSA-HSM', 'oct'
 * @readonly
 * @enum {string}
 */
export declare type JsonWebKeyType = 'EC' | 'EC-HSM' | 'RSA' | 'RSA-HSM' | 'oct';
/**
 * Defines values for JsonWebKeyCurveName.
 * Possible values include: 'P-256', 'P-384', 'P-521', 'P-256K'
 * @readonly
 * @enum {string}
 */
export declare type JsonWebKeyCurveName = 'P-256' | 'P-384' | 'P-521' | 'P-256K';
/**
 * Defines values for DeletionRecoveryLevel.
 * Possible values include: 'Purgeable', 'Recoverable+Purgeable', 'Recoverable',
 * 'Recoverable+ProtectedSubscription'
 * @readonly
 * @enum {string}
 */
export declare type DeletionRecoveryLevel = 'Purgeable' | 'Recoverable+Purgeable' | 'Recoverable' | 'Recoverable+ProtectedSubscription';
/**
 * Defines values for KeyUsageType.
 * Possible values include: 'digitalSignature', 'nonRepudiation', 'keyEncipherment',
 * 'dataEncipherment', 'keyAgreement', 'keyCertSign', 'cRLSign', 'encipherOnly', 'decipherOnly'
 * @readonly
 * @enum {string}
 */
export declare type KeyUsageType = 'digitalSignature' | 'nonRepudiation' | 'keyEncipherment' | 'dataEncipherment' | 'keyAgreement' | 'keyCertSign' | 'cRLSign' | 'encipherOnly' | 'decipherOnly';
/**
 * Defines values for ActionType.
 * Possible values include: 'EmailContacts', 'AutoRenew'
 * @readonly
 * @enum {string}
 */
export declare type ActionType = 'EmailContacts' | 'AutoRenew';
/**
 * Defines values for JsonWebKeyOperation.
 * Possible values include: 'encrypt', 'decrypt', 'sign', 'verify', 'wrapKey', 'unwrapKey'
 * @readonly
 * @enum {string}
 */
export declare type JsonWebKeyOperation = 'encrypt' | 'decrypt' | 'sign' | 'verify' | 'wrapKey' | 'unwrapKey';
/**
 * Defines values for JsonWebKeyEncryptionAlgorithm.
 * Possible values include: 'RSA-OAEP', 'RSA-OAEP-256', 'RSA1_5'
 * @readonly
 * @enum {string}
 */
export declare type JsonWebKeyEncryptionAlgorithm = 'RSA-OAEP' | 'RSA-OAEP-256' | 'RSA1_5';
/**
 * Defines values for JsonWebKeySignatureAlgorithm.
 * Possible values include: 'PS256', 'PS384', 'PS512', 'RS256', 'RS384', 'RS512', 'RSNULL',
 * 'ES256', 'ES384', 'ES512', 'ES256K'
 * @readonly
 * @enum {string}
 */
export declare type JsonWebKeySignatureAlgorithm = 'PS256' | 'PS384' | 'PS512' | 'RS256' | 'RS384' | 'RS512' | 'RSNULL' | 'ES256' | 'ES384' | 'ES512' | 'ES256K';
/**
 * Defines values for SasTokenType.
 * Possible values include: 'account', 'service'
 * @readonly
 * @enum {string}
 */
export declare type SasTokenType = 'account' | 'service';
/**
 * Contains response data for the createKey operation.
 */
export declare type CreateKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the importKey operation.
 */
export declare type ImportKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the deleteKey operation.
 */
export declare type DeleteKeyResponse = DeletedKeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedKeyBundle;
    };
};
/**
 * Contains response data for the updateKey operation.
 */
export declare type UpdateKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the getKey operation.
 */
export declare type GetKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the getKeyVersions operation.
 */
export declare type GetKeyVersionsResponse = KeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyListResult;
    };
};
/**
 * Contains response data for the getKeys operation.
 */
export declare type GetKeysResponse = KeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyListResult;
    };
};
/**
 * Contains response data for the backupKey operation.
 */
export declare type BackupKeyResponse = BackupKeyResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BackupKeyResult;
    };
};
/**
 * Contains response data for the restoreKey operation.
 */
export declare type RestoreKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the encrypt operation.
 */
export declare type EncryptResponse = KeyOperationResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyOperationResult;
    };
};
/**
 * Contains response data for the decrypt operation.
 */
export declare type DecryptResponse = KeyOperationResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyOperationResult;
    };
};
/**
 * Contains response data for the sign operation.
 */
export declare type SignResponse = KeyOperationResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyOperationResult;
    };
};
/**
 * Contains response data for the verify operation.
 */
export declare type VerifyResponse = KeyVerifyResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyVerifyResult;
    };
};
/**
 * Contains response data for the wrapKey operation.
 */
export declare type WrapKeyResponse = KeyOperationResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyOperationResult;
    };
};
/**
 * Contains response data for the unwrapKey operation.
 */
export declare type UnwrapKeyResponse = KeyOperationResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyOperationResult;
    };
};
/**
 * Contains response data for the getDeletedKeys operation.
 */
export declare type GetDeletedKeysResponse = DeletedKeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedKeyListResult;
    };
};
/**
 * Contains response data for the getDeletedKey operation.
 */
export declare type GetDeletedKeyResponse = DeletedKeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedKeyBundle;
    };
};
/**
 * Contains response data for the recoverDeletedKey operation.
 */
export declare type RecoverDeletedKeyResponse = KeyBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyBundle;
    };
};
/**
 * Contains response data for the setSecret operation.
 */
export declare type SetSecretResponse = SecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretBundle;
    };
};
/**
 * Contains response data for the deleteSecret operation.
 */
export declare type DeleteSecretResponse = DeletedSecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSecretBundle;
    };
};
/**
 * Contains response data for the updateSecret operation.
 */
export declare type UpdateSecretResponse = SecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretBundle;
    };
};
/**
 * Contains response data for the getSecret operation.
 */
export declare type GetSecretResponse = SecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretBundle;
    };
};
/**
 * Contains response data for the getSecrets operation.
 */
export declare type GetSecretsResponse = SecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretListResult;
    };
};
/**
 * Contains response data for the getSecretVersions operation.
 */
export declare type GetSecretVersionsResponse = SecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretListResult;
    };
};
/**
 * Contains response data for the getDeletedSecrets operation.
 */
export declare type GetDeletedSecretsResponse = DeletedSecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSecretListResult;
    };
};
/**
 * Contains response data for the getDeletedSecret operation.
 */
export declare type GetDeletedSecretResponse = DeletedSecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSecretBundle;
    };
};
/**
 * Contains response data for the recoverDeletedSecret operation.
 */
export declare type RecoverDeletedSecretResponse = SecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretBundle;
    };
};
/**
 * Contains response data for the backupSecret operation.
 */
export declare type BackupSecretResponse = BackupSecretResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BackupSecretResult;
    };
};
/**
 * Contains response data for the restoreSecret operation.
 */
export declare type RestoreSecretResponse = SecretBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretBundle;
    };
};
/**
 * Contains response data for the getCertificates operation.
 */
export declare type GetCertificatesResponse = CertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateListResult;
    };
};
/**
 * Contains response data for the deleteCertificate operation.
 */
export declare type DeleteCertificateResponse = DeletedCertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedCertificateBundle;
    };
};
/**
 * Contains response data for the setCertificateContacts operation.
 */
export declare type SetCertificateContactsResponse = Contacts & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Contacts;
    };
};
/**
 * Contains response data for the getCertificateContacts operation.
 */
export declare type GetCertificateContactsResponse = Contacts & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Contacts;
    };
};
/**
 * Contains response data for the deleteCertificateContacts operation.
 */
export declare type DeleteCertificateContactsResponse = Contacts & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: Contacts;
    };
};
/**
 * Contains response data for the getCertificateIssuers operation.
 */
export declare type GetCertificateIssuersResponse = CertificateIssuerListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateIssuerListResult;
    };
};
/**
 * Contains response data for the setCertificateIssuer operation.
 */
export declare type SetCertificateIssuerResponse = IssuerBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: IssuerBundle;
    };
};
/**
 * Contains response data for the updateCertificateIssuer operation.
 */
export declare type UpdateCertificateIssuerResponse = IssuerBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: IssuerBundle;
    };
};
/**
 * Contains response data for the getCertificateIssuer operation.
 */
export declare type GetCertificateIssuerResponse = IssuerBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: IssuerBundle;
    };
};
/**
 * Contains response data for the deleteCertificateIssuer operation.
 */
export declare type DeleteCertificateIssuerResponse = IssuerBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: IssuerBundle;
    };
};
/**
 * Contains response data for the createCertificate operation.
 */
export declare type CreateCertificateResponse = CertificateOperation & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateOperation;
    };
};
/**
 * Contains response data for the importCertificate operation.
 */
export declare type ImportCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the getCertificateVersions operation.
 */
export declare type GetCertificateVersionsResponse = CertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateListResult;
    };
};
/**
 * Contains response data for the getCertificatePolicy operation.
 */
export declare type GetCertificatePolicyResponse = CertificatePolicy & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificatePolicy;
    };
};
/**
 * Contains response data for the updateCertificatePolicy operation.
 */
export declare type UpdateCertificatePolicyResponse = CertificatePolicy & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificatePolicy;
    };
};
/**
 * Contains response data for the updateCertificate operation.
 */
export declare type UpdateCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the getCertificate operation.
 */
export declare type GetCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the updateCertificateOperation operation.
 */
export declare type UpdateCertificateOperationResponse = CertificateOperation & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateOperation;
    };
};
/**
 * Contains response data for the getCertificateOperation operation.
 */
export declare type GetCertificateOperationResponse = CertificateOperation & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateOperation;
    };
};
/**
 * Contains response data for the deleteCertificateOperation operation.
 */
export declare type DeleteCertificateOperationResponse = CertificateOperation & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateOperation;
    };
};
/**
 * Contains response data for the mergeCertificate operation.
 */
export declare type MergeCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the backupCertificate operation.
 */
export declare type BackupCertificateResponse = BackupCertificateResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BackupCertificateResult;
    };
};
/**
 * Contains response data for the restoreCertificate operation.
 */
export declare type RestoreCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the getDeletedCertificates operation.
 */
export declare type GetDeletedCertificatesResponse = DeletedCertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedCertificateListResult;
    };
};
/**
 * Contains response data for the getDeletedCertificate operation.
 */
export declare type GetDeletedCertificateResponse = DeletedCertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedCertificateBundle;
    };
};
/**
 * Contains response data for the recoverDeletedCertificate operation.
 */
export declare type RecoverDeletedCertificateResponse = CertificateBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateBundle;
    };
};
/**
 * Contains response data for the getStorageAccounts operation.
 */
export declare type GetStorageAccountsResponse = StorageListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageListResult;
    };
};
/**
 * Contains response data for the getDeletedStorageAccounts operation.
 */
export declare type GetDeletedStorageAccountsResponse = DeletedStorageListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedStorageListResult;
    };
};
/**
 * Contains response data for the getDeletedStorageAccount operation.
 */
export declare type GetDeletedStorageAccountResponse = DeletedStorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedStorageBundle;
    };
};
/**
 * Contains response data for the recoverDeletedStorageAccount operation.
 */
export declare type RecoverDeletedStorageAccountResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the backupStorageAccount operation.
 */
export declare type BackupStorageAccountResponse = BackupStorageResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: BackupStorageResult;
    };
};
/**
 * Contains response data for the restoreStorageAccount operation.
 */
export declare type RestoreStorageAccountResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the deleteStorageAccount operation.
 */
export declare type DeleteStorageAccountResponse = DeletedStorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedStorageBundle;
    };
};
/**
 * Contains response data for the getStorageAccount operation.
 */
export declare type GetStorageAccountResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the setStorageAccount operation.
 */
export declare type SetStorageAccountResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the updateStorageAccount operation.
 */
export declare type UpdateStorageAccountResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the regenerateStorageAccountKey operation.
 */
export declare type RegenerateStorageAccountKeyResponse = StorageBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageBundle;
    };
};
/**
 * Contains response data for the getSasDefinitions operation.
 */
export declare type GetSasDefinitionsResponse = SasDefinitionListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionListResult;
    };
};
/**
 * Contains response data for the getDeletedSasDefinitions operation.
 */
export declare type GetDeletedSasDefinitionsResponse = DeletedSasDefinitionListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSasDefinitionListResult;
    };
};
/**
 * Contains response data for the getDeletedSasDefinition operation.
 */
export declare type GetDeletedSasDefinitionResponse = DeletedSasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSasDefinitionBundle;
    };
};
/**
 * Contains response data for the recoverDeletedSasDefinition operation.
 */
export declare type RecoverDeletedSasDefinitionResponse = SasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionBundle;
    };
};
/**
 * Contains response data for the deleteSasDefinition operation.
 */
export declare type DeleteSasDefinitionResponse = DeletedSasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSasDefinitionBundle;
    };
};
/**
 * Contains response data for the getSasDefinition operation.
 */
export declare type GetSasDefinitionResponse = SasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionBundle;
    };
};
/**
 * Contains response data for the setSasDefinition operation.
 */
export declare type SetSasDefinitionResponse = SasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionBundle;
    };
};
/**
 * Contains response data for the updateSasDefinition operation.
 */
export declare type UpdateSasDefinitionResponse = SasDefinitionBundle & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionBundle;
    };
};
/**
 * Contains response data for the getKeyVersionsNext operation.
 */
export declare type GetKeyVersionsNextResponse = KeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyListResult;
    };
};
/**
 * Contains response data for the getKeysNext operation.
 */
export declare type GetKeysNextResponse = KeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: KeyListResult;
    };
};
/**
 * Contains response data for the getDeletedKeysNext operation.
 */
export declare type GetDeletedKeysNextResponse = DeletedKeyListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedKeyListResult;
    };
};
/**
 * Contains response data for the getSecretsNext operation.
 */
export declare type GetSecretsNextResponse = SecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretListResult;
    };
};
/**
 * Contains response data for the getSecretVersionsNext operation.
 */
export declare type GetSecretVersionsNextResponse = SecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SecretListResult;
    };
};
/**
 * Contains response data for the getDeletedSecretsNext operation.
 */
export declare type GetDeletedSecretsNextResponse = DeletedSecretListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSecretListResult;
    };
};
/**
 * Contains response data for the getCertificatesNext operation.
 */
export declare type GetCertificatesNextResponse = CertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateListResult;
    };
};
/**
 * Contains response data for the getCertificateIssuersNext operation.
 */
export declare type GetCertificateIssuersNextResponse = CertificateIssuerListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateIssuerListResult;
    };
};
/**
 * Contains response data for the getCertificateVersionsNext operation.
 */
export declare type GetCertificateVersionsNextResponse = CertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: CertificateListResult;
    };
};
/**
 * Contains response data for the getDeletedCertificatesNext operation.
 */
export declare type GetDeletedCertificatesNextResponse = DeletedCertificateListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedCertificateListResult;
    };
};
/**
 * Contains response data for the getStorageAccountsNext operation.
 */
export declare type GetStorageAccountsNextResponse = StorageListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: StorageListResult;
    };
};
/**
 * Contains response data for the getDeletedStorageAccountsNext operation.
 */
export declare type GetDeletedStorageAccountsNextResponse = DeletedStorageListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedStorageListResult;
    };
};
/**
 * Contains response data for the getSasDefinitionsNext operation.
 */
export declare type GetSasDefinitionsNextResponse = SasDefinitionListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: SasDefinitionListResult;
    };
};
/**
 * Contains response data for the getDeletedSasDefinitionsNext operation.
 */
export declare type GetDeletedSasDefinitionsNextResponse = DeletedSasDefinitionListResult & {
    /**
     * The underlying HTTP response.
     */
    _response: msRest.HttpResponse & {
        /**
         * The response body as text (string format)
         */
        bodyAsText: string;
        /**
         * The response body as parsed JSON or XML
         */
        parsedBody: DeletedSasDefinitionListResult;
    };
};
//# sourceMappingURL=index.d.ts.map