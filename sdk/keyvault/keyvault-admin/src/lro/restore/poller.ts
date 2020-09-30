// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  RestoreOperationState,
  RestorePollOperationState,
  makeRestorePollOperation
} from "./operation";

export interface RestorePollerOptions {
  client: KeyVaultClient;
  vaultUrl: string;
  blobStorageUri: string;
  sasToken: string;
  folderName: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a Key Vault ends up being restored.
 */
export class RestorePoller extends Poller<RestoreOperationState, undefined> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof RestorePoller
   */
  public intervalInMs: number;
  constructor(options: RestorePollerOptions) {
    const {
      client,
      vaultUrl,
      blobStorageUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: RestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRestorePollOperation({
      ...state,
      blobStorageUri,
      sasToken,
      folderName,
      requestOptions: requestOptions || {},
      client,
      vaultUrl
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof RestorePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): RestoreOperationState {
    const state: RestoreOperationState = this.operation.state;
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
