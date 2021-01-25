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
  KeyVaultClientRestoreStatusResponse,
  KeyVaultClientSelectiveKeyRestoreOperationOptionalParams,
  KeyVaultClientSelectiveKeyRestoreOperationResponse
} from "../../generated/models";
import { createSpan, setParentSpan } from "../../tracing";

/**
 * An interface representing the publicly available properties of the state of a restore Key Vault's poll operation.
 */
export interface SelectiveRestoreOperationState extends PollOperationState<undefined> {
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
export interface SelectiveRestorePollOperationState extends PollOperationState<undefined> {
  /**
   * Options for the core-http requests.
   */
  requestOptions: RequestOptionsBase;
  /**
   * An interface representing the internal KeyVaultClient.
   */
  client: KeyVaultClient;
  /**
   * The base URL to the vault
   */
  vaultUrl: string;
  /**
   * The name of a Key Vault Key.
   */
  keyName: string;
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
export interface SelectiveRestorePollOperation
  extends PollOperation<SelectiveRestorePollOperationState, string> {}

/**
 * Tracing the selectiveRestore operation
 */
async function selectiveRestore(
  client: KeyVaultClient,
  vaultUrl: string,
  keyName: string,
  options: KeyVaultClientSelectiveKeyRestoreOperationOptionalParams
): Promise<KeyVaultClientSelectiveKeyRestoreOperationResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.selectiveRestore", requestOptions);
  try {
    return await client.selectiveKeyRestoreOperation(
      vaultUrl,
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
async function restoreStatus(
  client: KeyVaultClient,
  vaultUrl: string,
  jobId: string,
  options: OperationOptions
): Promise<KeyVaultClientRestoreStatusResponse> {
  const requestOptions = operationOptionsToRequestOptionsBase(options);
  const span = createSpan("generatedClient.restoreStatus", requestOptions);
  try {
    return await client.restoreStatus(vaultUrl, jobId, options);
  } finally {
    span.end();
  }
}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: SelectiveRestorePollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: SelectiveRestorePollOperationState) => void;
  } = {}
): Promise<SelectiveRestorePollOperation> {
  const state = this.state;
  const { vaultUrl, keyName, blobStorageUri, sasToken, folderName } = state;

  // Internal properties,
  // the reference is only potentially undefined in the public representation of the poller.
  const client = state.client!;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const selectiveRestoreOperation = await selectiveRestore(client, vaultUrl, keyName, {
      ...requestOptions,
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
      return makeSelectiveRestorePollOperation(state);
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
    return makeSelectiveRestorePollOperation(state);
  }

  if (!state.isCompleted) {
    const selectiveRestoreOperation = await restoreStatus(client, vaultUrl, state.jobId, {
      requestOptions
    });
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

  return makeSelectiveRestorePollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: SelectiveRestorePollOperation): Promise<SelectiveRestorePollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the SelectiveRestorePollOperation
 */
function toString(this: SelectiveRestorePollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds the SelectiveRestorePollOperation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeSelectiveRestorePollOperation(
  state: SelectiveRestorePollOperationState
): SelectiveRestorePollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
