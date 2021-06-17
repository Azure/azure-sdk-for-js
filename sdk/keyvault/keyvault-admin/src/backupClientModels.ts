// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { SUPPORTED_API_VERSIONS } from "./constants";

/**
 * The optional parameters accepted by the KeyVaultBackupClient
 */
export interface KeyVaultBackupClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginBackup}
 */
export interface KeyVaultBackupPollerOptions extends coreHttp.OperationOptions {
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
 * passed to {@link beginBackup}
 */
export interface KeyVaultBeginBackupOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginRestore}
 */
export interface KeyVaultBeginRestoreOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginSelectiveKeyRestore}
 */
export interface KeyVaultBeginSelectiveKeyRestoreOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the result of a backup operation.
 */
export interface KeyVaultBackupResult {
  /**
   * The location of the full backup.
   */
  folderUri?: string;

  /**
   * The start time of the backup operation.
   */
  startTime: Date;

  /**
   * The end time of the backup operation.
   */
  endTime?: Date;
}

/**
 * An interface representing the result of a restore operation.
 */
export interface KeyVaultRestoreResult {
  /**
   * The start time of the restore operation.
   */
  startTime: Date;

  /**
   * The end time of the restore operation.
   */
  endTime?: Date;
}

/**
 * An interface representing the result of a selective key restore operation.
 */
export interface KeyVaultSelectiveKeyRestoreResult {
  /**
   * The start time of the selective key restore operation.
   */
  startTime: Date;

  /**
   * The end time of the selective key restore operation.
   */
  endTime?: Date;
}
