// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay, RequestOptionsBase } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  SelectiveRestoreOperationState,
  SelectiveRestorePollOperationState,
  makeSelectiveRestorePollOperation
} from "./operation";

export interface SelectiveRestorePollerOptions {
  client: KeyVaultClient;
  keyName: string;
  vaultUrl: string;
  blobStorageUri: string;
  sasToken: string;
  folderName: string;
  requestOptions?: RequestOptionsBase;
  intervalInMs?: number;
  resumeFrom?: string;
}

/**
 * Class that creates a poller that waits until a key of a Key Vault backup ends up being restored.
 */
export class SelectiveRestorePoller extends Poller<SelectiveRestoreOperationState, undefined> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   * @memberof SelectiveRestorePoller
   */
  public intervalInMs: number;

  constructor(options: SelectiveRestorePollerOptions) {
    const {
      client,
      vaultUrl,
      keyName,
      blobStorageUri,
      sasToken,
      folderName,
      requestOptions,
      intervalInMs = 2000,
      resumeFrom
    } = options;

    let state: SelectiveRestorePollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeSelectiveRestorePollOperation({
      ...state,
      keyName,
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
   * @memberof SelectiveRestorePoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }

  /**
   * Gets the public state of the polling operation
   */
  public getOperationState(): SelectiveRestoreOperationState {
    const state: SelectiveRestoreOperationState = this.operation.state;
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
