// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FullRestoreOperationResponse,
  PreFullRestoreOperationOptionalParams,
  RestoreOperation,
  RestoreStatusResponse,
} from "../../generated/models";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState,
} from "../keyVaultAdminPoller";
import { KeyVaultBeginPreRestoreOptions, KeyVaultRestoreResult } from "../../backupClientModels";

import { AbortSignalLike } from "@azure/abort-controller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { OperationOptions } from "@azure/core-client";
import { tracingClient } from "../../tracing";

/**
 * An interface representing the publicly available properties of the state of a Key Vault's pre-restore poll operation.
 */
export interface KeyVaultPreRestoreOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultRestoreResult> {}

/**
 * An internal interface representing the state of a Key Vault's poll operation.
 * @internal
 */
export interface KeyVaultPreRestorePollOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultRestoreResult> {
  /**
   * The URI of the blob storage account.
   */
  folderUri: string;
  /**
   * The SAS token.
   */
  sasToken?: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored
   */
  folderName?: string;
}

/**
 * An interface representing a Key Vault's pre-restore poll operation.
 */
export class KeyVaultPreRestorePollOperation extends KeyVaultAdminPollOperation<
  KeyVaultPreRestorePollOperationState,
  KeyVaultRestoreResult
> {
  constructor(
    public state: KeyVaultPreRestorePollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: KeyVaultBeginPreRestoreOptions = {},
  ) {
    super(state, {
      cancelMessage: "Cancelling the restoration full Key Vault backup is not supported.",
    });
  }

  /**
   * Tracing the preFullRestore operation
   */
  private preFullRestore(
    options: PreFullRestoreOperationOptionalParams,
  ): Promise<FullRestoreOperationResponse> {
    return tracingClient.withSpan(
      "KeyVaultPreRestorePoller.fullRestore",
      options,
      (updatedOptions) => this.client.preFullRestoreOperation(this.vaultUrl, updatedOptions),
    );
  }

  /**
   * Tracing the restoreStatus operation.
   */
  private async restoreStatus(
    jobId: string,
    options: OperationOptions,
  ): Promise<RestoreStatusResponse> {
    return tracingClient.withSpan(
      "KeyVaultPreRestorePoller.restoreStatus",
      options,
      (updatedOptions) => this.client.restoreStatus(this.vaultUrl, jobId, updatedOptions),
    );
  }

  /**
   * Reaches to the service and updates the pre-restore poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: KeyVaultPreRestorePollOperationState) => void;
    } = {},
  ): Promise<KeyVaultPreRestorePollOperation> {
    const state = this.state;
    const { folderUri, sasToken, folderName } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const serviceOperation = await this.preFullRestore({
        ...this.requestOptions,
        preRestoreOperationParameters: {
          folderToRestore: folderName,
          sasTokenParameters: {
            storageResourceUri: folderUri,
            token: sasToken,
            useManagedIdentity: sasToken === undefined,
          },
        },
      });

      this.mapState(serviceOperation);
    } else if (!state.isCompleted) {
      if (!state.jobId) {
        throw new Error(`Missing "jobId" from the pre-restore operation.`);
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
        `Missing "startTime" from the pre-full-restore operation. Pre-restore did not start successfully.`,
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
