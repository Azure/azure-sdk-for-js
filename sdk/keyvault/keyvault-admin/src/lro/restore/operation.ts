// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientFullRestoreOperationOptionalParams,
  KeyVaultClientRestoreStatusResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../../../keyvault-common/src";
import { KeyVaultClientFullRestoreOperationResponse } from "../../generated/models";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface RestoreOperationState extends KeyVaultAdminPollOperationState<undefined> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 * @internal
 */
export interface RestorePollOperationState extends KeyVaultAdminPollOperationState<undefined> {
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
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
export class RestorePollOperation extends KeyVaultAdminPollOperation<
  RestorePollOperationState,
  string
> {
  constructor(
    public state: RestorePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, {
      cancelMessage: "Cancelling the restoration full Key Vault backup is not supported."
    });
  }

  /**
   * Tracing the fullRestore operation
   */
  private async fullRestore(
    options: KeyVaultClientFullRestoreOperationOptionalParams
  ): Promise<KeyVaultClientFullRestoreOperationResponse> {
    const span = createSpan("generatedClient.fullRestore", options);
    try {
      return await this.client.fullRestoreOperation(this.vaultUrl, setParentSpan(span, options));
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
    const span = createSpan("generatedClient.restoreStatus", options);
    try {
      return await this.client.restoreStatus(this.vaultUrl, jobId, setParentSpan(span, options));
    } finally {
      span.end();
    }
  }

  /**
   * Reaches to the service and updates the restore poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: RestorePollOperationState) => void;
    } = {}
  ): Promise<RestorePollOperation> {
    const state = this.state;
    const { blobStorageUri, sasToken, folderName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const serviceOperation = await this.fullRestore({
        ...this.requestOptions,
        restoreBlobDetails: {
          folderToRestore: folderName,
          sasTokenParameters: {
            storageResourceUri: blobStorageUri,
            token: sasToken
          }
        }
      });

      const { startTime, jobId, endTime, error, status, statusDetails } = serviceOperation;

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
      const serviceOperation = await this.restoreStatus(state.jobId, this.requestOptions);
      const { endTime, status, statusDetails, error } = serviceOperation;

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
