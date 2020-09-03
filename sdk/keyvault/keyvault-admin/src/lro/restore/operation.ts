// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import {
  OperationOptions,
  operationOptionsToRequestOptionsBase,
  RequestOptionsBase
} from "@azure/core-http";
import { KeyVaultClient } from "../../generated/keyVaultClient";
import {
  KeyVaultClientFullBackupStatusResponse,
  KeyVaultClientFullRestoreOperationOptionalParams
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../tracing";
import { KeyVaultClientFullRestoreOperationResponse } from "../../generated/models";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface RestoreOperationState extends PollOperationState<undefined> {
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
  /**
   * The URI of the blob storage account.
   */
  blobStorageUri: string;
  /**
   * The SAS token.
   */
  sasToken: string;
  /**
   * The Folder name of the blob where the previous successful full backup was stored.
   */
  folderName: string;
  /**
   * Identifier for the full restore operation.
   */
  jobId?: string;
  /**
   * Status of the restore operation.
   */
  status?: string;
  /**
   * The status details of restore operation.
   */
  statusDetails?: string;
  /**
   * The start time of the restore operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the restore operation in UTC
   */
  endTime?: Date;
}

/**
 * An internal interface representing the state of a restore Key Vault's poll operation.
 * @internal
 */
export interface RestorePollOperationState extends PollOperationState<undefined> {
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing the internal KeyVaultClient.
   */
  client?: KeyVaultClient;
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
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
  /**
   * The id returned as part of the restore request
   */
  jobId?: string;
  /**
   * Status of the restore operation.
   */
  status?: string;
  /**
   * The status details of restore operation.
   */
  statusDetails?: string;
  /**
   * The start time of the restore operation in UTC
   */
  startTime?: Date;
  /**
   * The end time of the restore operation in UTC
   */
  endTime?: Date;
}

/**
 * An interface representing a restore Key Vault's poll operation.
 */
export interface RestorePollOperation extends PollOperation<RestorePollOperationState, string> {}

/**
 * Tracing the fullRestore operation
 */
async function fullRestore(
  client: KeyVaultClient,
  vaultUrl: string,
  options: KeyVaultClientFullRestoreOperationOptionalParams
): Promise<KeyVaultClientFullRestoreOperationResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.fullRestore", requestOptions);

  let response: KeyVaultClientFullRestoreOperationResponse;
  try {
    response = await client.fullRestoreOperation(vaultUrl, setParentSpan(span, requestOptions));
  } finally {
    span.end();
  }

  return response;
}

/**
 * Tracing the fullRestoreStatus operation.
 */
async function fullRestoreStatus(
  client: KeyVaultClient,
  vaultUrl: string,
  jobId: string,
  options: OperationOptions
): Promise<KeyVaultClientFullBackupStatusResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.fullRestoreStatus", requestOptions);

  let response: KeyVaultClientFullBackupStatusResponse;
  try {
    response = await client.fullBackupStatus(vaultUrl, jobId, setParentSpan(span, requestOptions));
  } finally {
    span.end();
  }

  return response;
}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RestorePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RestorePollOperationState) => void;
  } = {}
): Promise<RestorePollOperation> {
  const state = this.state;
  const { vaultUrl, blobStorageUri, sasToken, folderName } = state;

  // Internal properties,
  // the reference is only potentially undefined in the public representation of the poller.
  const client = state.client!;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const fullRestoreOperation = await fullRestore(client, vaultUrl, {
      ...requestOptions,
      restoreBlobDetails: {
        folderToRestore: folderName,
        sasTokenParameters: {
          storageResourceUri: blobStorageUri,
          token: sasToken
        }
      }
    });

    const { startTime, jobId, endTime, error } = fullRestoreOperation;

    if (!startTime) {
      state.error = new Error(`Missing "startTime" from the full restore operation.`);
      state.isCompleted = true;
      return makeRestorePollOperation(state);
    }

    state.isStarted = true;
    state.jobId = jobId;
    state.endTime = endTime;
    state.startTime = startTime;
    state.status = fullRestoreOperation.status;
    state.statusDetails = fullRestoreOperation.statusDetails;

    if (endTime) {
      state.isCompleted = true;
    }
    if (error) {
      state.isCompleted = true;
      state.error = new Error(error.message);
    }
  }

  if (!state.jobId) {
    state.error = new Error(`Missing "jobId" from the full restore operation.`);
    state.isCompleted = true;
    return makeRestorePollOperation(state);
  }

  if (!state.isCompleted) {
    const fullRestoreOperation = await fullRestoreStatus(client, vaultUrl, state.jobId, {
      requestOptions
    });
    const { endTime, error } = fullRestoreOperation;
    if (endTime) {
      state.isCompleted = true;
    }
    if (error) {
      state.isCompleted = true;
      state.error = new Error(error.message);
    }
  }

  return makeRestorePollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: RestorePollOperation): Promise<RestorePollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: RestorePollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRestorePollOperation(state: RestorePollOperationState): RestorePollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
