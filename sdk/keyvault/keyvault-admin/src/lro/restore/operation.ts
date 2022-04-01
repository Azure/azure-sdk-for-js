// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FullRestoreOperationOptionalParams,
  FullRestoreOperationResponse,
  RestoreOperation,
  RestoreStatusResponse,
} from "../../generated/models";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState,
} from "../keyVaultAdminPoller";
import { KeyVaultBeginRestoreOptions, KeyVaultRestoreResult } from "../../backupClientModels";

import { AbortSignalLike } from "@azure/abort-controller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { OperationOptions } from "@azure/core-client";
import { tracingClient } from "../../tracing";

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
  sasToken: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored
   */
  folderName: string;
}

/**
 * An interface representing a restore Key Vault's poll operation.
 */
export class KeyVaultRestorePollOperation extends KeyVaultAdminPollOperation<
  KeyVaultRestorePollOperationState,
  KeyVaultRestoreResult
> {
  constructor(
    public state: KeyVaultRestorePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: KeyVaultBeginRestoreOptions = {}
  ) {
    super(state, {
      cancelMessage: "Cancelling the restoration full Key Vault backup is not supported.",
    });
  }

  /**
   * Tracing the fullRestore operation
   */
  private fullRestore(
    options: FullRestoreOperationOptionalParams
  ): Promise<FullRestoreOperationResponse> {
    return tracingClient.withSpan("KeyVaultRestorePoller.fullRestore", options, (updatedOptions) =>
      this.client.fullRestoreOperation(this.vaultUrl, updatedOptions)
    );
  }

  /**
   * Tracing the restoreStatus operation.
   */
  private async restoreStatus(
    jobId: string,
    options: OperationOptions
  ): Promise<RestoreStatusResponse> {
    return tracingClient.withSpan(
      "KeyVaultRestorePoller.restoreStatus",
      options,
      (updatedOptions) => this.client.restoreStatus(this.vaultUrl, jobId, updatedOptions)
    );
  }

  /**
   * Reaches to the service and updates the restore poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: KeyVaultRestorePollOperationState) => void;
    } = {}
  ): Promise<KeyVaultRestorePollOperation> {
    const state = this.state;
    const { folderUri, sasToken, folderName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const serviceOperation = await this.fullRestore({
        ...this.requestOptions,
        restoreBlobDetails: {
          folderToRestore: folderName,
          sasTokenParameters: {
            storageResourceUri: folderUri,
            token: sasToken,
          },
        },
      });

      this.mapState(serviceOperation);
    } else if (!state.isCompleted) {
      if (!state.jobId) {
        throw new Error(`Missing "jobId" from the full restore operation.`);
      }
      const serviceOperation = await this.restoreStatus(state.jobId, this.requestOptions);
      this.mapState(serviceOperation);
    }

    return this;
  }

  private mapState(serviceOperation: RestoreOperation): void {
    const state = this.state;
    const { startTime, jobId, endTime, error, status, statusDetails } = serviceOperation;

    if (!startTime) {
      throw new Error(
        `Missing "startTime" from the full restore operation. Restore did not start successfully.`
      );
    }

    state.isStarted = true;
    state.jobId = jobId;
    state.endTime = endTime;
    state.startTime = startTime;
    state.status = status;
    state.statusDetails = statusDetails;

    state.isCompleted = !!endTime;

    if (state.isCompleted && error?.code) {
      throw new Error(error?.message || statusDetails);
    }

    if (state.isCompleted) {
      state.result = {
        startTime,
        endTime,
      };
    }
  }
}
