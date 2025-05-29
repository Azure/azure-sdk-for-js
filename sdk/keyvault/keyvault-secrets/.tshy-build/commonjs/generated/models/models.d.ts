/** The secret set parameters. */
export interface SecretSetParameters {
    /** The value of the secret. */
    value: string;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
    /** Type of the secret value such as a password. */
    contentType?: string;
    /** The secret management attributes. */
    secretAttributes?: SecretAttributes;
}
export declare function secretSetParametersSerializer(item: SecretSetParameters): any;
/** The secret management attributes. */
export interface SecretAttributes {
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
    /** Reflects the deletion recovery level currently in effect for secrets in the current vault. If it contains 'Purgeable', the secret can be permanently deleted by a privileged user; otherwise, only the system can purge the secret, at the end of the retention interval. */
    readonly recoveryLevel?: DeletionRecoveryLevel;
}
export declare function secretAttributesSerializer(item: SecretAttributes): any;
export declare function secretAttributesDeserializer(item: any): SecretAttributes;
/** Reflects the deletion recovery level currently in effect for secrets in the current vault. If it contains 'Purgeable', the secret can be permanently deleted by a privileged user; otherwise, only the system can purge the secret, at the end of the retention interval. */
export declare enum KnownDeletionRecoveryLevel {
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
    CustomizedRecoverableProtectedSubscription = "CustomizedRecoverable+ProtectedSubscription"
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
/** A secret consisting of a value, id and its attributes. */
export interface SecretBundle {
    /** The secret value. */
    value?: string;
    /** The secret id. */
    id?: string;
    /** The content type of the secret. */
    contentType?: string;
    /** The secret management attributes. */
    attributes?: SecretAttributes;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
    /** If this is a secret backing a KV certificate, then this field specifies the corresponding key backing the KV certificate. */
    readonly kid?: string;
    /** True if the secret's lifetime is managed by key vault. If this is a secret backing a certificate, then managed will be true. */
    readonly managed?: boolean;
}
export declare function secretBundleDeserializer(item: any): SecretBundle;
/** The key vault error exception. */
export interface KeyVaultError {
    /** The key vault server error. */
    readonly error?: ErrorModel;
}
export declare function keyVaultErrorDeserializer(item: any): KeyVaultError;
/** Alias for ErrorModel */
export type ErrorModel = {
    code?: string;
    message?: string;
    innerError?: ErrorModel_1;
} | null;
/** model interface _KeyVaultErrorError */
export interface _KeyVaultErrorError {
    /** The error code. */
    readonly code?: string;
    /** The error message. */
    readonly message?: string;
    /** The key vault server error. */
    readonly innerError?: ErrorModel_1;
}
export declare function _keyVaultErrorErrorDeserializer(item: any): _KeyVaultErrorError;
/** Alias for ErrorModel */
export type ErrorModel_1 = {
    code?: string;
    message?: string;
    innerError?: ErrorModel_1;
} | null;
/** A Deleted Secret consisting of its previous id, attributes and its tags, as well as information on when it will be purged. */
export interface DeletedSecretBundle {
    /** The secret value. */
    value?: string;
    /** The secret id. */
    id?: string;
    /** The content type of the secret. */
    contentType?: string;
    /** The secret management attributes. */
    attributes?: SecretAttributes;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
    /** If this is a secret backing a KV certificate, then this field specifies the corresponding key backing the KV certificate. */
    readonly kid?: string;
    /** True if the secret's lifetime is managed by key vault. If this is a secret backing a certificate, then managed will be true. */
    readonly managed?: boolean;
    /** The url of the recovery object, used to identify and recover the deleted secret. */
    recoveryId?: string;
    /** The time when the secret is scheduled to be purged, in UTC */
    readonly scheduledPurgeDate?: Date;
    /** The time when the secret was deleted, in UTC */
    readonly deletedDate?: Date;
}
export declare function deletedSecretBundleDeserializer(item: any): DeletedSecretBundle;
/** The secret update parameters. */
export interface SecretUpdateParameters {
    /** Type of the secret value such as a password. */
    contentType?: string;
    /** The secret management attributes. */
    secretAttributes?: SecretAttributes;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
}
export declare function secretUpdateParametersSerializer(item: SecretUpdateParameters): any;
/** The secret list result. */
export interface _SecretListResult {
    /** A response message containing a list of secrets in the key vault along with a link to the next page of secrets. */
    readonly value?: SecretItem[];
    /** The URL to get the next set of secrets. */
    readonly nextLink?: string;
}
export declare function _secretListResultDeserializer(item: any): _SecretListResult;
export declare function secretItemArrayDeserializer(result: Array<SecretItem>): any[];
/** The secret item containing secret metadata. */
export interface SecretItem {
    /** Secret identifier. */
    id?: string;
    /** The secret management attributes. */
    attributes?: SecretAttributes;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
    /** Type of the secret value such as a password. */
    contentType?: string;
    /** True if the secret's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
    readonly managed?: boolean;
}
export declare function secretItemDeserializer(item: any): SecretItem;
/** The deleted secret list result */
export interface _DeletedSecretListResult {
    /** A response message containing a list of deleted secrets in the key vault along with a link to the next page of deleted secrets. */
    readonly value?: DeletedSecretItem[];
    /** The URL to get the next set of deleted secrets. */
    readonly nextLink?: string;
}
export declare function _deletedSecretListResultDeserializer(item: any): _DeletedSecretListResult;
export declare function deletedSecretItemArrayDeserializer(result: Array<DeletedSecretItem>): any[];
/** The deleted secret item containing metadata about the deleted secret. */
export interface DeletedSecretItem {
    /** Secret identifier. */
    id?: string;
    /** The secret management attributes. */
    attributes?: SecretAttributes;
    /** Application specific metadata in the form of key-value pairs. */
    tags?: Record<string, string>;
    /** Type of the secret value such as a password. */
    contentType?: string;
    /** True if the secret's lifetime is managed by key vault. If this is a key backing a certificate, then managed will be true. */
    readonly managed?: boolean;
    /** The url of the recovery object, used to identify and recover the deleted secret. */
    recoveryId?: string;
    /** The time when the secret is scheduled to be purged, in UTC */
    readonly scheduledPurgeDate?: Date;
    /** The time when the secret was deleted, in UTC */
    readonly deletedDate?: Date;
}
export declare function deletedSecretItemDeserializer(item: any): DeletedSecretItem;
/** The backup secret result, containing the backup blob. */
export interface BackupSecretResult {
    /** The backup blob containing the backed up secret. */
    readonly value?: Uint8Array;
}
export declare function backupSecretResultDeserializer(item: any): BackupSecretResult;
/** The secret restore parameters. */
export interface SecretRestoreParameters {
    /** The backup blob associated with a secret bundle. */
    secretBundleBackup: Uint8Array;
}
export declare function secretRestoreParametersSerializer(item: SecretRestoreParameters): any;
/** The available API versions. */
export declare enum KnownVersions {
    /** The 7.5 API version. */
    "v7.5" = "7.5",
    /** The 7.6-preview.2 API version. */
    "v7.6_preview.2" = "7.6-preview.2"
}
//# sourceMappingURL=models.d.ts.map