// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ClientOptions, OperationOptions } from "@azure-rest/core-client";
import type { SUPPORTED_API_VERSIONS } from "./constants.js";
import { KeyVaultBackupClient } from "./backupClient.js";

export type { PollerLike } from "./lro/shim.js";
export type { OperationStatus } from "./models/models.js";

/**
 * The optional parameters accepted by the KeyVaultBackupClient
 */
export interface KeyVaultBackupClientOptions extends ClientOptions {
  /**
   * The accepted versions of the Key Vault's service API.
   */
  serviceVersion?: SUPPORTED_API_VERSIONS;

  /**
   * Whether to disable verification that the authentication challenge resource matches the Key Vault or Managed HSM domain.
   * Defaults to false.
   */
  disableChallengeResourceVerification?: boolean;
}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link beginBackup}
 */
export interface KeyVaultBackupPollerOptions extends OperationOptions {
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
 * passed to {@link KeyVaultBackupClient.beginPreBackup}
 */
export interface KeyVaultBeginPreBackupOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link KeyVaultBackupClient.beginBackup}
 */
export interface KeyVaultBeginBackupOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link KeyVaultBackupClient.beginRestore}
 */
export interface KeyVaultBeginRestoreOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link KeyVaultBackupClient.beginPreRestore}
 */
export interface KeyVaultBeginPreRestoreOptions extends KeyVaultBackupPollerOptions {}

/**
 * An interface representing the optional parameters that can be
 * passed to {@link KeyVaultBackupClient.beginSelectiveKeyRestore}
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
  startTime?: Date;

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
  startTime?: Date;

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
  startTime?: Date;

  /**
   * The end time of the selective key restore operation.
   */
  endTime?: Date;
}
