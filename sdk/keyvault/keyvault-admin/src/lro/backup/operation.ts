// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  FullBackupOperation,
  KeyVaultClientFullBackupOptionalParams,
  KeyVaultClientFullBackupResponse,
  KeyVaultClientFullBackupStatusResponse
} from "../../generated/models";
import { BackupResult, BeginBackupOptions } from "../../backupClientModels";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";
import { withTrace } from "./poller";

/**
 * An interface representing the publicly available properties of the state of a backup Key Vault's poll operation.
 */
export type BackupOperationState = KeyVaultAdminPollOperationState<BackupResult>;

/**
 * An internal interface representing the state of a backup Key Vault's poll operation.
 */
export interface BackupPollOperationState extends KeyVaultAdminPollOperationState<BackupResult> {
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
export class BackupPollOperation extends KeyVaultAdminPollOperation<
  BackupPollOperationState,
  string
> {
  constructor(
    public state: BackupPollOperationState,
    private vaultUrl: string,
    private client: KeyVaultClient,
    private requestOptions: RequestOptionsBase = {}
  ) {
    super(state, { cancelMessage: "Cancelling a full Key Vault backup is not supported." });
  }

  /**
   * Tracing the fullBackup operation
   */
  private fullBackup(
    options: KeyVaultClientFullBackupOptionalParams
  ): Promise<KeyVaultClientFullBackupResponse> {
    return withTrace("generatedClient.fullBackup", options, (updatedOptions) =>
      this.client.fullBackup(this.vaultUrl, updatedOptions)
    );
  }

  /**
   * Tracing the fullBackupStatus operation
   */
  private fullBackupStatus(
    jobId: string,
    options: BeginBackupOptions
  ): Promise<KeyVaultClientFullBackupStatusResponse> {
    return withTrace("generatedClient.fullBackupStatus", options, (updatedOptions) =>
      this.client.fullBackupStatus(this.vaultUrl, jobId, updatedOptions)
    );
  }

  /**
   * Reaches to the service and updates the backup's poll operation.
   */
  async update(
    options: {
      abortSignal?: AbortSignalLike;
      fireProgress?: (state: BackupPollOperationState) => void;
    } = {}
  ): Promise<BackupPollOperation> {
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
          token: sasToken!
        }
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
      statusDetails
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

    if (status?.toLowerCase() === "failed") {
      throw new Error(error?.message || statusDetails);
    }

    state.isCompleted = !!endTime;

    if (state.isCompleted) {
      state.result = {
        backupFolderUri: azureStorageBlobContainerUri,
        startTime,
        endTime
      };
    }
  }
}
