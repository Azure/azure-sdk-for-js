// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { BeginBackupOptions } from "../../backupClientModels";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  BackupOperationState,
  BackupPollOperationState,
  makeBackupPollOperation
} from "./operation";

export interface BackupPollerOptions {
  client: KeyVaultClient;
  vaultUrl: string;
  blobStorageUri: string;
  sasToken: string;
  requestOptions?: BeginBackupOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until the backup of a Key Vault ends up being generated.
 */
export class BackupPoller extends Poller<BackupOperationState, string> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof BackupPoller
   */
  public intervalInMs: number;

  constructor(options: BackupPollerOptions) {
    const {
      client,
      vaultUrl,
      blobStorageUri,
      sasToken,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: BackupPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeBackupPollOperation({
      ...state,
      blobStorageUri,
      sasToken,
      requestOptions: requestOptions || {},
      client,
      vaultUrl
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof BackupPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): BackupOperationState {
    const state: BackupOperationState = this.operation.state;
    return {
      isStarted: state.isStarted,
      isCompleted: state.isCompleted,
      isCancelled: state.isCancelled,
      error: state.error,
      result: state.result,
      jobId: state.jobId,
      endTime: state.endTime,
      startTime: state.startTime,
      status: state.status,
      statusDetails: state.statusDetails
    };
  }
}
