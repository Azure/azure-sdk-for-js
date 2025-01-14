// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { uint8ArrayToString, stringToUint8Array } from "@azure/core-util";

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

export function secretSetParametersSerializer(item: SecretSetParameters): any {
  return {
    value: item["value"],
    tags: item["tags"],
    contentType: item["contentType"],
    attributes: !item["secretAttributes"]
      ? item["secretAttributes"]
      : secretAttributesSerializer(item["secretAttributes"]),
  };
}

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

export function secretAttributesSerializer(item: SecretAttributes): any {
  return {
    enabled: item["enabled"],
    nbf: !item["notBefore"]
      ? item["notBefore"]
      : (item["notBefore"].getTime() / 1000) | 0,
    exp: !item["expires"]
      ? item["expires"]
      : (item["expires"].getTime() / 1000) | 0,
  };
}

export function secretAttributesDeserializer(item: any): SecretAttributes {
  return {
    enabled: item["enabled"],
    notBefore: !item["nbf"] ? item["nbf"] : new Date(item["nbf"] * 1000),
    expires: !item["exp"] ? item["exp"] : new Date(item["exp"] * 1000),
    created: !item["created"]
      ? item["created"]
      : new Date(item["created"] * 1000),
    updated: !item["updated"]
      ? item["updated"]
      : new Date(item["updated"] * 1000),
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

export function secretBundleDeserializer(item: any): SecretBundle {
  return {
    value: item["value"],
    id: item["id"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    kid: item["kid"],
    managed: item["managed"],
  };
}

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

export function deletedSecretBundleDeserializer(
  item: any,
): DeletedSecretBundle {
  return {
    value: item["value"],
    id: item["id"],
    contentType: item["contentType"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    kid: item["kid"],
    managed: item["managed"],
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"]
      ? item["deletedDate"]
      : new Date(item["deletedDate"] * 1000),
  };
}

/** The secret update parameters. */
export interface SecretUpdateParameters {
  /** Type of the secret value such as a password. */
  contentType?: string;
  /** The secret management attributes. */
  secretAttributes?: SecretAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
}

export function secretUpdateParametersSerializer(
  item: SecretUpdateParameters,
): any {
  return {
    contentType: item["contentType"],
    attributes: !item["secretAttributes"]
      ? item["secretAttributes"]
      : secretAttributesSerializer(item["secretAttributes"]),
    tags: item["tags"],
  };
}

/** The secret list result. */
export interface _SecretListResult {
  /** A response message containing a list of secrets in the key vault along with a link to the next page of secrets. */
  readonly value?: SecretItem[];
  /** The URL to get the next set of secrets. */
  readonly nextLink?: string;
}

export function _secretListResultDeserializer(item: any): _SecretListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : secretItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function secretItemArrayDeserializer(result: Array<SecretItem>): any[] {
  return result.map((item) => {
    return secretItemDeserializer(item);
  });
}

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

export function secretItemDeserializer(item: any): SecretItem {
  return {
    id: item["id"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    contentType: item["contentType"],
    managed: item["managed"],
  };
}

/** The deleted secret list result */
export interface _DeletedSecretListResult {
  /** A response message containing a list of deleted secrets in the key vault along with a link to the next page of deleted secrets. */
  readonly value?: DeletedSecretItem[];
  /** The URL to get the next set of deleted secrets. */
  readonly nextLink?: string;
}

export function _deletedSecretListResultDeserializer(
  item: any,
): _DeletedSecretListResult {
  return {
    value: !item["value"]
      ? item["value"]
      : deletedSecretItemArrayDeserializer(item["value"]),
    nextLink: item["nextLink"],
  };
}

export function deletedSecretItemArrayDeserializer(
  result: Array<DeletedSecretItem>,
): any[] {
  return result.map((item) => {
    return deletedSecretItemDeserializer(item);
  });
}

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

export function deletedSecretItemDeserializer(item: any): DeletedSecretItem {
  return {
    id: item["id"],
    attributes: !item["attributes"]
      ? item["attributes"]
      : secretAttributesDeserializer(item["attributes"]),
    tags: item["tags"],
    contentType: item["contentType"],
    managed: item["managed"],
    recoveryId: item["recoveryId"],
    scheduledPurgeDate: !item["scheduledPurgeDate"]
      ? item["scheduledPurgeDate"]
      : new Date(item["scheduledPurgeDate"] * 1000),
    deletedDate: !item["deletedDate"]
      ? item["deletedDate"]
      : new Date(item["deletedDate"] * 1000),
  };
}

/** The backup secret result, containing the backup blob. */
export interface BackupSecretResult {
  /** The backup blob containing the backed up secret. */
  readonly value?: Uint8Array;
}

export function backupSecretResultDeserializer(item: any): BackupSecretResult {
  return {
    value: !item["value"]
      ? item["value"]
      : typeof item["value"] === "string"
        ? stringToUint8Array(item["value"], "base64url")
        : item["value"],
  };
}

/** The secret restore parameters. */
export interface SecretRestoreParameters {
  /** The backup blob associated with a secret bundle. */
  secretBundleBackup: Uint8Array;
}

export function secretRestoreParametersSerializer(
  item: SecretRestoreParameters,
): any {
  return { value: uint8ArrayToString(item["secretBundleBackup"], "base64url") };
}

/** The available API versions. */
export enum KnownVersions {
  /** The 7.5 API version. */
  "v7.5" = "7.5",
  /** The 7.6-preview.1 API version. */
  "v7.6_preview.1" = "7.6-preview.1",
}
