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
import { withTrace } from "../../tracing";
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
  private fullRestore(
    options: KeyVaultClientFullRestoreOperationOptionalParams
  ): Promise<KeyVaultClientFullRestoreOperationResponse> {
    return withTrace("generatedClient.fullRestore", options, async (updatedOptions) => {
      return await this.client.fullRestoreOperation(this.vaultUrl, updatedOptions);
    });
  }

  /**
   * Tracing the restoreStatus operation.
   */
  private async restoreStatus(
    jobId: string,
    options: OperationOptions
  ): Promise<KeyVaultClientRestoreStatusResponse> {
    return withTrace("generatedClient.restoreStatus", options, async (updatedOptions) => {
      return await this.client.restoreStatus(this.vaultUrl, jobId, updatedOptions);
    });
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

    if (status?.toLowerCase() === "failed") {
      throw new Error(error?.message || statusDetails);
    }

    if (state.isCompleted) {
      state.result = {
        startTime,
        endTime
      };
    }
  }
}
