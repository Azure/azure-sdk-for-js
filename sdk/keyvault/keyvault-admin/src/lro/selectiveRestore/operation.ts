// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientRestoreStatusResponse,
  KeyVaultClientSelectiveKeyRestoreOperationOptionalParams,
  KeyVaultClientSelectiveKeyRestoreOperationResponse,
  RestoreOperation
} from "../../generated/models";
import { createSpan } from "../../tracing";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";
import { RestoreResult } from "../../backupClientModels";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface SelectiveRestoreOperationState
  extends KeyVaultAdminPollOperationState<RestoreResult> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 */
export interface SelectiveRestorePollOperationState
  extends KeyVaultAdminPollOperationState<RestoreResult> {
  /**
   * The name of a Key Vault Key.
   */
  keyName: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored
   */
  folderName: string;
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken: string;
}

/**
 * The selective restore Key Vault's poll operation.
 */
export class SelectiveRestorePollOperation extends KeyVaultAdminPollOperation<
  SelectiveRestorePollOperationState,
  string
> {
  constructor(
    public state: SelectiveRestorePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Cancelling a selective Key Vault restore is not supported." });
  }

  /**
   * Tracing the selectiveRestore operation
   */
  private async selectiveRestore(
    keyName: string,
    options: KeyVaultClientSelectiveKeyRestoreOperationOptionalParams
  ): Promise<KeyVaultClientSelectiveKeyRestoreOperationResponse> {
    const { span, updatedOptions } = createSpan("generatedClient.selectiveRestore", options);
    try {
      return await this.client.selectiveKeyRestoreOperation(this.vaultUrl, keyName, updatedOptions);
    } finally {
      span.end();
    }
  }

  /**
   * Tracing the restoreStatus operation.
   */
  private async restoreStatus(
    jobId: string,
    options: OperationOptions
  ): Promise<KeyVaultClientRestoreStatusResponse> {
    const { span, updatedOptions } = createSpan("generatedClient.restoreStatus", options);
    try {
      return await this.client.restoreStatus(this.vaultUrl, jobId, updatedOptions);
    } finally {
      span.end();
    }
  }

  /**
   * Reaches to the service and updates the selective restore poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: SelectiveRestorePollOperationState) => void;
    } = {}
  ): Promise<SelectiveRestorePollOperation> {
    const state = this.state;
    const { keyName, blobStorageUri, sasToken, folderName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const selectiveRestoreOperation = await this.selectiveRestore(keyName, {
        ...this.requestOptions,
        restoreBlobDetails: {
          folder: folderName,
          sasTokenParameters: {
            storageResourceUri: blobStorageUri,
            token: sasToken
          }
        }
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

    if (error?.message) {
      throw new Error(error?.message);
    }

    state.isCompleted = !!endTime;

    if (state.isCompleted) {
      state.result = {
        startTime,
        endTime
      };
    }
  }
}
