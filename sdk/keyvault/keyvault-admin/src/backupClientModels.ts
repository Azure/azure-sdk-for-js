// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as coreHttp from "@azure/core-http";
import { SUPPORTED_API_VERSIONS } from "./constants";

/**
 * The optional parameters accepted by the KeyVaultBackupClient
 */
export interface BackupClientOptions extends coreHttp.PipelineOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginBackup}
 */
export interface BackupPollerOptions extends coreHttp.OperationOptions {
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
export interface BeginBackupOptions extends BackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginRestore}
 */
export interface BeginRestoreOptions extends BackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginSelectiveRestore}
 */
export interface BeginSelectiveRestoreOptions extends BackupPollerOptions {}

/**
 * An interface representing the result of a backup operation.
 */
export interface BackupResult {
  /**
   * The location of the full backup.
   */
  backupFolderUri?: string;

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
export interface RestoreResult {
  /**
   * The start time of the backup operation.
   */
  startTime: Date;

  /**
   * The end time of the backup operation.
   */
  endTime?: Date;
}
