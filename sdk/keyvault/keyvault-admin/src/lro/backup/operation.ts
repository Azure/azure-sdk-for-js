// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  FullBackupOperation,
  FullBackupOptionalParams,
  FullBackupResponse,
  FullBackupStatusResponse,
} from "../../generated/models";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState,
} from "../keyVaultAdminPoller";
import { KeyVaultBackupResult, KeyVaultBeginBackupOptions } from "../../backupClientModels";
import { AbortSignalLike } from "@azure/abort-controller";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import { tracingClient } from "../../tracing";

/**
 * An interface representing the publicly available properties of the state of a backup Key Vault's poll operation.
 */
export type KeyVaultBackupOperationState = KeyVaultAdminPollOperationState<KeyVaultBackupResult>;

/**
 * An internal interface representing the state of a backup Key Vault's poll operation.
 */
export interface KeyVaultBackupPollOperationState
  extends KeyVaultAdminPollOperationState<KeyVaultBackupResult> {
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
 * The backup Key Vault's poll operation.
 */
export class KeyVaultBackupPollOperation extends KeyVaultAdminPollOperation<
  KeyVaultBackupPollOperationState,
  string
> {
  constructor(
    public state: KeyVaultBackupPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: KeyVaultBeginBackupOptions = {}
  ) {
    super(state, { cancelMessage: "Cancelling a full Key Vault backup is not supported." });
  }

  /**
   * Tracing the fullBackup operation
   */
  private fullBackup(options: FullBackupOptionalParams): Promise<FullBackupResponse> {
    return tracingClient.withSpan("KeyVaultBackupPoller.fullBackup", options, (updatedOptions) =>
      this.client.fullBackup(this.vaultUrl, updatedOptions)
    );
  }

  /**
   * Tracing the fullBackupStatus operation
   */
  private fullBackupStatus(
    jobId: string,
    options: KeyVaultBeginBackupOptions
  ): Promise<FullBackupStatusResponse> {
    return tracingClient.withSpan(
      "KeyVaultBackupPoller.fullBackupStatus",
      options,
      (updatedOptions) => this.client.fullBackupStatus(this.vaultUrl, jobId, updatedOptions)
    );
  }

  /**
   * Reaches to the service and updates the backup's poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: KeyVaultBackupPollOperationState) => void;
    } = {}
  ): Promise<KeyVaultBackupPollOperation> {
    const state = this.state;
    const { blobStorageUri, sasToken } = state;

    if (options.abortSignal) {
      this.requestOptions.abortSignal = options.abortSignal;
    }

    if (!state.isStarted) {
      const serviceOperation = await this.fullBackup({
        ...this.requestOptions,
        azureStorageBlobContainerUri: {
          storageResourceUri: blobStorageUri!,
          token: sasToken!,
        },
      });

      this.mapState(serviceOperation);
    } else if (!state.isCompleted) {
      if (!state.jobId) {
        throw new Error(`Missing "jobId" from the full backup operation.`);
      }
      const serviceOperation = await this.fullBackupStatus(state.jobId, this.requestOptions);
      this.mapState(serviceOperation);
    }

    return this;
  }

  private mapState(serviceOperation: FullBackupOperation): void {
    const state = this.state;
    const {
      startTime,
      jobId,
      azureStorageBlobContainerUri,
      endTime,
      error,
      status,
      statusDetails,
    } = serviceOperation;
    if (!startTime) {
      throw new Error(
        `Missing "startTime" from the full backup operation. Full backup did not start successfully.`
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
        folderUri: azureStorageBlobContainerUri,
        startTime,
        endTime,
      };
    }
  }
}
