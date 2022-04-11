// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState,
} from "../keyVaultAdminPoller";
import {
  KeyVaultBeginSelectiveKeyRestoreOptions,
  KeyVaultSelectiveKeyRestoreResult,
} from "../../backupClientModels";
import {
  RestoreOperation,
  RestoreStatusResponse,
  SelectiveKeyRestoreOperationOptionalParams,
  SelectiveKeyRestoreOperationResponse,
} from "../../generated/models";
import { AbortSignalLike } from "@azure/abort-controller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { OperationOptions } from "@azure/core-client";
import { tracingClient } from "../../tracing";

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
  sasToken: string;
}

/**
 * The selective restore Key Vault's poll operation.
 */
export class KeyVaultSelectiveKeyRestorePollOperation extends KeyVaultAdminPollOperation<
  KeyVaultSelectiveKeyRestorePollOperationState,
  string
> {
  constructor(
    public state: KeyVaultSelectiveKeyRestorePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: KeyVaultBeginSelectiveKeyRestoreOptions = {}
  ) {
    super(state, { cancelMessage: "Cancelling a selective Key Vault restore is not supported." });
  }

  /**
   * Tracing the selectiveRestore operation
   */
  private selectiveRestore(
    keyName: string,
    options: SelectiveKeyRestoreOperationOptionalParams
  ): Promise<SelectiveKeyRestoreOperationResponse> {
    return tracingClient.withSpan(
      "KeyVaultSelectiveKeyRestorePoller.selectiveRestore",
      options,
      (updatedOptions) =>
        this.client.selectiveKeyRestoreOperation(this.vaultUrl, keyName, updatedOptions)
    );
  }

  /**
   * Tracing the restoreStatus operation.
   */
  private restoreStatus(jobId: string, options: OperationOptions): Promise<RestoreStatusResponse> {
    return tracingClient.withSpan(
      "KeyVaultSelectiveKeyRestorePoller.restoreStatus",
      options,
      (updatedOptions) => this.client.restoreStatus(this.vaultUrl, jobId, updatedOptions)
    );
  }

  /**
   * Reaches to the service and updates the selective restore poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: KeyVaultSelectiveKeyRestorePollOperationState) => void;
    } = {}
  ): Promise<KeyVaultSelectiveKeyRestorePollOperation> {
    const state = this.state;
    const { keyName, folderUri, sasToken, folderName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const selectiveRestoreOperation = await this.selectiveRestore(keyName, {
        ...this.requestOptions,
        restoreBlobDetails: {
          folder: folderName,
          sasTokenParameters: {
            storageResourceUri: folderUri,
            token: sasToken,
          },
        },
      });
      this.mapState(selectiveRestoreOperation);
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
      throw new Error(`Missing "startTime" from the selective restore operation.`);
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
