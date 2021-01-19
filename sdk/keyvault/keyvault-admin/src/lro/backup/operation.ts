// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { RequestOptionsBase } from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientFullBackupOptionalParams,
  KeyVaultClientFullBackupResponse,
  KeyVaultClientFullBackupStatusResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../../../keyvault-common/src";
import { BeginBackupOptions } from "../../backupClientModels";
import {
  KeyVaultAdminPollOperation,
  KeyVaultAdminPollOperationState
} from "../keyVaultAdminPoller";

/**
 * An interface representing the publicly available properties of the state of a backup Key Vault's poll operation.
 */
export type BackupOperationState = KeyVaultAdminPollOperationState<string>;

/**
 * An internal interface representing the state of a backup Key Vault's poll operation.
 */
export interface BackupPollOperationState extends KeyVaultAdminPollOperationState<string> {
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
  private async fullBackup(
    options: KeyVaultClientFullBackupOptionalParams
  ): Promise<KeyVaultClientFullBackupResponse> {
    const span = createSpan("generatedClient.fullBackup", options);
    try {
      return await this.client.fullBackup(this.vaultUrl, setParentSpan(span, options));
    } finally {
      span.end();
    }
  }

  /**
   * Tracing the fullBackupStatus operation
   */
  private async fullBackupStatus(
    jobId: string,
    options: BeginBackupOptions
  ): Promise<KeyVaultClientFullBackupStatusResponse> {
    const span = createSpan("generatedClient.fullBackupStatus", options);
    try {
      return await this.client.fullBackupStatus(this.vaultUrl, jobId, setParentSpan(span, options));
    } finally {
      span.end();
    }
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
        state.error = new Error(`Missing "startTime" from the full backup operation.`);
        state.isCompleted = true;
        return this;
      }

      state.isStarted = true;
      state.jobId = jobId;
      state.endTime = endTime;
      state.startTime = startTime;
      state.status = status;
      state.statusDetails = statusDetails;
      state.result = azureStorageBlobContainerUri;

      state.isCompleted = !!(state.endTime || state.error?.message);

      if (error?.message || statusDetails) {
        state.error = new Error(error?.message || statusDetails);
      }
    }

    if (!state.jobId) {
      state.error = new Error(`Missing "jobId" from the full backup operation.`);
      state.isCompleted = true;
      return this;
    }

    if (!state.isCompleted) {
      const serviceOperation = await this.fullBackupStatus(state.jobId, this.requestOptions);
      const {
        azureStorageBlobContainerUri,
        endTime,
        status,
        statusDetails,
        error
      } = serviceOperation;

      state.endTime = endTime;
      state.status = status;
      state.statusDetails = statusDetails;
      state.result = azureStorageBlobContainerUri;

      state.isCompleted = !!(state.endTime || state.error?.message);

      if (error?.message || statusDetails) {
        state.error = new Error(error?.message || statusDetails);
      }
    }

    return this;
  }
}
