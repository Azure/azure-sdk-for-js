// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { serializeRecord } from "../helpers/serializerHelpers.js";
import { uint8ArrayToString } from "@azure/core-util";

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

export function secretSetParametersSerializer(
  item: SecretSetParameters,
): Record<string, unknown> {
  return {
    value: item["value"],
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
    contentType: item["contentType"],
    attributes: !item.secretAttributes
      ? item.secretAttributes
      : secretAttributesSerializer(item.secretAttributes),
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
  /**
   * softDelete data retention days. Value should be >=7 and <=90 when softDelete
   * enabled, otherwise 0.
   */
  readonly recoverableDays?: number;
  /**
   * Reflects the deletion recovery level currently in effect for secrets in the
   * current vault. If it contains 'Purgeable', the secret can be permanently
   * deleted by a privileged user; otherwise, only the system can purge the secret,
   * at the end of the retention interval.
   */
  readonly recoveryLevel?: DeletionRecoveryLevel;
}

export function secretAttributesSerializer(
  item: SecretAttributes,
): Record<string, unknown> {
  return {
    enabled: item["enabled"],
    nbf: item["notBefore"]?.getTime(),
    exp: item["expires"]?.getTime(),
  };
}

/**
 * Reflects the deletion recovery level currently in effect for secrets in the
 * current vault. If it contains 'Purgeable', the secret can be permanently
 * deleted by a privileged user; otherwise, only the system can purge the secret,
 * at the end of the retention interval.
 */
export type DeletionRecoveryLevel =
  | "Purgeable"
  | "Recoverable+Purgeable"
  | "Recoverable"
  | "Recoverable+ProtectedSubscription"
  | "CustomizedRecoverable+Purgeable"
  | "CustomizedRecoverable"
  | "CustomizedRecoverable+ProtectedSubscription";

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
  /**
   * If this is a secret backing a KV certificate, then this field specifies the
   * corresponding key backing the KV certificate.
   */
  readonly kid?: string;
  /**
   * True if the secret's lifetime is managed by key vault. If this is a secret
   * backing a certificate, then managed will be true.
   */
  readonly managed?: boolean;
}

/**
 * A Deleted Secret consisting of its previous id, attributes and its tags, as
 * well as information on when it will be purged.
 */
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
  /**
   * If this is a secret backing a KV certificate, then this field specifies the
   * corresponding key backing the KV certificate.
   */
  readonly kid?: string;
  /**
   * True if the secret's lifetime is managed by key vault. If this is a secret
   * backing a certificate, then managed will be true.
   */
  readonly managed?: boolean;
  /** The url of the recovery object, used to identify and recover the deleted secret. */
  recoveryId?: string;
  /** The time when the secret is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the secret was deleted, in UTC */
  readonly deletedDate?: Date;
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
): Record<string, unknown> {
  return {
    contentType: item["contentType"],
    attributes: !item.secretAttributes
      ? item.secretAttributes
      : secretAttributesSerializer(item.secretAttributes),
    tags: !item.tags ? item.tags : (serializeRecord(item.tags as any) as any),
  };
}

/** The secret item containing secret metadata. */
export interface SecretItem {
  /** Secret identifier. */
  readonly id: string;
  /** The secret management attributes. */
  attributes?: SecretAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Type of the secret value such as a password. */
  contentType?: string;
  /**
   * True if the secret's lifetime is managed by key vault. If this is a key backing
   * a certificate, then managed will be true.
   */
  readonly managed?: boolean;
}

/** The secret list result. */
export interface _SecretListResult {
  /** The SecretItem items on this page */
  value: SecretItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** The deleted secret item containing metadata about the deleted secret. */
export interface DeletedSecretItem {
  /** Secret identifier. */
  readonly id: string;
  /** The secret management attributes. */
  attributes?: SecretAttributes;
  /** Application specific metadata in the form of key-value pairs. */
  tags?: Record<string, string>;
  /** Type of the secret value such as a password. */
  contentType?: string;
  /**
   * True if the secret's lifetime is managed by key vault. If this is a key backing
   * a certificate, then managed will be true.
   */
  readonly managed?: boolean;
  /** The url of the recovery object, used to identify and recover the deleted secret. */
  recoveryId?: string;
  /** The time when the secret is scheduled to be purged, in UTC */
  readonly scheduledPurgeDate?: Date;
  /** The time when the secret was deleted, in UTC */
  readonly deletedDate?: Date;
}

/** The backup secret result, containing the backup blob. */
export interface BackupSecretResult {
  /** The backup blob containing the backed up secret. */
  readonly value?: Uint8Array;
}

/** The secret restore parameters. */
export interface SecretRestoreParameters {
  /** The backup blob associated with a secret bundle. */
  secretBundleBackup: Uint8Array;
}

export function secretRestoreParametersSerializer(
  item: SecretRestoreParameters,
): Record<string, unknown> {
  return {
    value: uint8ArrayToString(item["secretBundleBackup"], "base64url"),
  };
}

/** The available API versions. */
export type Versions = "7.6-preview.1";

/** The key vault error exception. */
export interface KeyVaultError {
  /** The key vault server error. */
  readonly error?: ErrorModel;
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

/** Paged collection of SecretItem items */
export interface _PagedSecretItem {
  /** The SecretItem items on this page */
  value: SecretItem[];
  /** The link to the next page of items */
  nextLink?: string;
}

/** Paged collection of DeletedSecretItem items */
export interface _PagedDeletedSecretItem {
  /** The DeletedSecretItem items on this page */
  value: DeletedSecretItem[];
  /** The link to the next page of items */
  nextLink?: string;
}
