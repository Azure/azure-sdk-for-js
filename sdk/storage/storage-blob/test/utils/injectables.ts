// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";
import type { CpkInfo } from "@azure/storage-blob";

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}

export function getAccountName(): string {
  return inject(EnvVarKeys.ACCOUNT_NAME);
}

export function getAccountKey(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_KEY);
}

export function getAccountSas(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_SAS);
}

export function getAccountBlobUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_BLOB_URL);
}

export function getAccountFileUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_FILE_URL);
}

export function getAccountQueueUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_QUEUE_URL);
}

export function getStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING);
}

export function getStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getDfsAccountName(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_NAME);
}

export function getDfsAccountBlobUrl(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_BLOB_URL);
}

export function getDfsAccountFileUrl(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_FILE_URL);
}

export function getDfsAccountQueueUrl(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_QUEUE_URL);
}

export function getDfsAccountKey(): string | undefined {
  return inject(EnvVarKeys.DFS_ACCOUNT_KEY);
}

export function getDfsAccountSas(): string | undefined {
  return inject(EnvVarKeys.DFS_ACCOUNT_SAS);
}

export function getDfsStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.DFS_STORAGE_CONNECTION_STRING);
}

export function getDfsStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.DFS_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getDfsSoftDeleteAccountName(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME);
}

export function getDfsSoftDeleteAccountBlobUrl(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_BLOB_URL);
}

export function getDfsSoftDeleteAccountFileUrl(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_FILE_URL);
}

export function getDfsSoftDeleteAccountQueueUrl(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_QUEUE_URL);
}

export function getDfsSoftDeleteAccountKey(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_KEY);
}

export function getDfsSoftDeleteAccountSas(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_SAS);
}

export function getDfsSoftDeleteStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING);
}

export function getDfsSoftDeleteStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getFullAccountName(): string {
  return inject(EnvVarKeys.FULL_ACCOUNT_NAME);
}

export function getFullAccountBlobUrl(): string {
  return inject(EnvVarKeys.FULL_ACCOUNT_BLOB_URL);
}

export function getFullAccountFileUrl(): string {
  return inject(EnvVarKeys.FULL_ACCOUNT_FILE_URL);
}

export function getFullAccountQueueUrl(): string {
  return inject(EnvVarKeys.FULL_ACCOUNT_QUEUE_URL);
}

export function getFullAccountKey(): string | undefined {
  return inject(EnvVarKeys.FULL_ACCOUNT_KEY);
}

export function getFullAccountSas(): string | undefined {
  return inject(EnvVarKeys.FULL_ACCOUNT_SAS);
}

export function getFullStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.FULL_STORAGE_CONNECTION_STRING);
}

export function getFullStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.FULL_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getSoftDeleteAccountName(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME);
}

export function getSoftDeleteAccountBlobUrl(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_BLOB_URL);
}

export function getSoftDeleteAccountFileUrl(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL);
}

export function getSoftDeleteAccountQueueUrl(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_QUEUE_URL);
}

export function getSoftDeleteAccountKey(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_KEY);
}

export function getSoftDeleteAccountSas(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_SAS);
}

export function getSoftDeleteStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING);
}

export function getSoftDeleteStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getPremiumFileAccountName(): string {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME);
}

export function getPremiumFileAccountFileUrl(): string {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL);
}

export function getPremiumFileAccountKey(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_KEY);
}

export function getPremiumFileAccountSas(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_SAS);
}

export function getPremiumFileStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING);
}

export function getPremiumFileStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getGrsAccountName(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_NAME);
}

export function getGrsAccountBlobUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_BLOB_URL);
}

export function getGrsAccountFileUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_FILE_URL);
}

export function getGrsAccountQueueUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_QUEUE_URL);
}

export function getGrsAccountKey(): string | undefined {
  return inject(EnvVarKeys.GRS_ACCOUNT_KEY);
}

export function getGrsAccountSas(): string | undefined {
  return inject(EnvVarKeys.GRS_ACCOUNT_SAS);
}

export function getGrsStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.GRS_STORAGE_CONNECTION_STRING);
}

export function getGrsStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.GRS_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getGrsAccountSecondaryBlobUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_SECONDARY_BLOB_URL);
}

export function getGrsAccountSecondaryFileUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_SECONDARY_FILE_URL);
}

export function getGrsAccountSecondaryQueueUrl(): string {
  return inject(EnvVarKeys.GRS_ACCOUNT_SECONDARY_QUEUE_URL);
}

// Object Replication destination account injectables
export function getOrDestAccountName(): string {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_NAME);
}

export function getOrDestAccountBlobUrl(): string {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_BLOB_URL);
}

export function getOrDestAccountFileUrl(): string {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_FILE_URL);
}

export function getOrDestAccountQueueUrl(): string {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_QUEUE_URL);
}

export function getOrDestAccountKey(): string | undefined {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_KEY);
}

export function getOrDestAccountSas(): string | undefined {
  return inject(EnvVarKeys.OR_DEST_ACCOUNT_SAS);
}

export function getOrDestStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.OR_DEST_STORAGE_CONNECTION_STRING);
}

export function getOrDestStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.OR_DEST_STORAGE_CONNECTION_STRING_WITH_SAS);
}

// Object Replication container names
export function getOrSourceContainerName(): string | undefined {
  return inject(EnvVarKeys.OR_SOURCE_CONTAINER_NAME);
}

export function getOrDestContainerName(): string | undefined {
  return inject(EnvVarKeys.OR_DEST_CONTAINER_NAME);
}

export function getImmutableContainerName(): string {
  return inject(EnvVarKeys.IMMUTABLE_CONTAINER_NAME);
}

export function getCustomerProvidedKey(): Required<CpkInfo> {
  return inject(EnvVarKeys.CUSTOMER_PROVIDED_KEY);
}

export function getEncryptionScope1(): string {
  return inject(EnvVarKeys.ENCRYPTION_SCOPE_1);
}

export function getEncryptionScope2(): string {
  return inject(EnvVarKeys.ENCRYPTION_SCOPE_2);
}

export function getMdAccountName(): string | undefined {
  return inject(EnvVarKeys.MD_ACCOUNT_NAME);
}

export function getMdAccountKey(): string | undefined {
  return inject(EnvVarKeys.MD_ACCOUNT_KEY);
}
