// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { OperationOptions, RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientFullRestoreOperationOptionalParams,
  KeyVaultClientRestoreStatusResponse,
  RestoreOperation
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../../../keyvault-common/src";
import { KeyVaultClientFullRestoreOperationResponse } from "../../generated/models";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";
import { RestoreResult } from "../../backupClientModels";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface RestoreOperationState extends KeyVaultAdminPollOperationState<RestoreResult> {}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 * @internal
 */
export interface RestorePollOperationState extends KeyVaultAdminPollOperationState<RestoreResult> {
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
  RestoreResult
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
    const currentState = this.state;
    const { blobStorageUri, sasToken, folderName } = currentState;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!currentState.isStarted) {
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

      this.state = this.mapState(currentState, serviceOperation);
    } else if (!currentState.isCompleted) {
      if (!currentState.jobId) {
        throw new Error(`Missing "jobId" from the full restore operation.`);
      }
      const serviceOperation = await this.restoreStatus(currentState.jobId, this.requestOptions);
      this.state = this.mapState(currentState, serviceOperation);
    }

    return this;
  }

  private mapState(
    currentState: RestorePollOperationState,
    serviceOperation: RestoreOperation
  ): RestorePollOperationState {
    const newState = { ...currentState };
    const { startTime, jobId, endTime, error, status, statusDetails } = serviceOperation;

    if (!startTime) {
      throw new Error(
        `Missing "startTime" from the full restore operation. Restore did not start successfully.`
      );
    }

    newState.isStarted = true;
    newState.jobId = jobId;
    newState.endTime = endTime;
    newState.startTime = startTime;
    newState.status = status;
    newState.statusDetails = statusDetails;

    newState.isCompleted = !!(endTime || error?.message);

    if (error?.message || statusDetails) {
      throw new Error(error?.message || statusDetails);
    }

    if (newState.isCompleted) {
      newState.result = {
        startTime,
        endTime
      };
    }

    return newState;
  }
}
