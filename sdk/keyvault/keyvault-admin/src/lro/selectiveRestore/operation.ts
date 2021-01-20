// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  OperationOptions,
  operationOptionsToRequestOptionsBase,
  RequestOptionsBase
} from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientRestoreStatusResponse,
  KeyVaultClientSelectiveKeyRestoreOperationOptionalParams,
  KeyVaultClientSelectiveKeyRestoreOperationResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../../../keyvault-common/src";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface SelectiveRestoreOperationState
  extends KeyVaultAdminPollOperationState<undefined> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 */
export interface SelectiveRestorePollOperationState
  extends KeyVaultAdminPollOperationState<undefined> {
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
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.selectiveRestore", requestOptions);
    try {
      return await this.client.selectiveKeyRestoreOperation(
        this.vaultUrl,
        keyName,
        setParentSpan(span, requestOptions)
      );
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
    const requestOptions = operationOptionsToRequestOptionsBase(options);
    const span = createSpan("generatedClient.restoreStatus", requestOptions);
    try {
      return await this.client.restoreStatus(this.vaultUrl, jobId, options);
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

      const { startTime, jobId, endTime, error, status, statusDetails } = selectiveRestoreOperation;

      if (!startTime) {
        state.error = new Error(`Missing "startTime" from the full restore operation.`);
        state.isCompleted = true;
        return this;
      }

      state.isStarted = true;
      state.jobId = jobId;
      state.endTime = endTime;
      state.startTime = startTime;
      state.status = status;
      state.statusDetails = statusDetails;

      if (endTime) {
        state.isCompleted = true;
      }
      if (error && error.message) {
        state.isCompleted = true;
        state.error = new Error(error.message);
      }
    }

    if (!state.jobId) {
      state.error = new Error(`Missing "jobId" from the full restore operation.`);
      state.isCompleted = true;
      return this;
    }

    if (!state.isCompleted) {
      const selectiveRestoreOperation = await this.restoreStatus(state.jobId, this.requestOptions);
      const { endTime, status, statusDetails, error } = selectiveRestoreOperation;

      state.endTime = endTime;
      state.status = status;
      state.statusDetails = statusDetails;

      if (endTime) {
        state.isCompleted = true;
      }
      if (error && error.message) {
        state.isCompleted = true;
        state.error = new Error(error.message);
      }
    }

    return this;
  }
}
