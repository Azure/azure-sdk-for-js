// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

// TODO: merge with backupClientModels

import type { KeyVaultClient } from "../keyVaultClient.js";
import type { OperationOptions } from "@azure-rest/core-client";
import type {
  KeyVaultBackupResult,
  KeyVaultRestoreResult,
  KeyVaultSelectiveKeyRestoreResult,
} from "../backupClientModels.js";
import type { OperationStatus } from "../index.js";

/**
 * Common parameters to a Key Vault Admin Poller.
 */
export interface KeyVaultAdminPollerOptions {
  vaultUrl: string;
  client: KeyVaultClient;
  requestOptions?: OperationOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * An interface representing the state of a Key Vault Admin Poller's operation.
 */
export interface KeyVaultAdminPollOperationState<TResult> {
  /**
   * Identifier for the full restore operation.
   */
  jobId?: string;
  /**
   * Status of the restore operation.
   */
  status: OperationStatus;
  /**
   * Will exist if the operation encountered any error.
   */
  error?: Error;
  /**
   * Will exist if the operation produced a result of the expected type.
   */
  result?: TResult;
  /**
   * The status details of restore operation.
   */
  statusDetails?: string;
  /**
   * The start time of the restore operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the restore operation in UTC
   */
  endTime?: Date;
  /**
   * isStarted
   */
  isStarted?: boolean;
  /**
   * isCompleted
   */
  isCompleted?: boolean;
}

export interface KeyVaultBackupPollerOptions extends KeyVaultAdminPollerOptions {
  blobStorageUri: string;
  sasToken?: string;
}

/**
 * An interface representing the publicly available properties of the state of a backup Key Vault's poll operation.
 */
export type KeyVaultBackupOperationState = KeyVaultAdminPollOperationState<KeyVaultBackupResult>;

/**
 * An internal interface representing the state of a backup Key Vault's poll operation.
 */
export interface KeyVaultBackupPollOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultBackupResult> {
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken?: string;
}

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface KeyVaultRestoreOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultRestoreResult> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 * @internal
 */
export interface KeyVaultRestorePollOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultRestoreResult> {
  /**
   * The URI of the blob storage account.
   */
  folderUri: string;
  /**
   * The SAS token.
   */
  sasToken?: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored
   */
  folderName: string;
}

export interface KeyVaultRestorePollerOptions extends KeyVaultAdminPollerOptions {
  folderUri: string;
  sasToken?: string;
  folderName: string;
}

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface KeyVaultSelectiveKeyRestoreOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultSelectiveKeyRestoreResult> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 */
export interface KeyVaultSelectiveKeyRestorePollOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultSelectiveKeyRestoreResult> {
  /**
   * The name of a Key Vault Key.
   */
  keyName: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored
   */
  folderName: string;
  /**
   * The URI of the blob storage account where the previous successful full backup was stored.
   */
  folderUri: string;
  /**
   * The SAS token.
   */
  sasToken?: string;
}

export interface KeyVaultSelectiveKeyRestorePollerOptions extends KeyVaultAdminPollerOptions {
  keyName: string;
  folderUri: string;
  sasToken?: string;
  folderName: string;
}
