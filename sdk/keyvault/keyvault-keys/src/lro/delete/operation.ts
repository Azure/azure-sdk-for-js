// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { DeletedKey, KeyClientInterface } from "../../keysModels";

/**
 * An interface representing the state of a delete key's poll operation
 */
export interface DeleteKeyPollOperationState extends PollOperationState<DeletedKey> {
  /**
   * The name of the key.
   */
  name: string;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a KeyClient. For internal use.
   */
  client: KeyClientInterface;
}

/**
 * An interface representing a delete key's poll operation
 */
export interface DeleteKeyPollOperation
  extends PollOperation<DeleteKeyPollOperationState, DeletedKey> {}

/**
 * @summary Reaches to the service and updates the delete key's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: DeleteKeyPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: DeleteKeyPollOperationState) => void;
  } = {}
): Promise<DeleteKeyPollOperation> {
  const state = this.state;
  const { name, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    const deletedKey = await client.deleteKey(name, requestOptions);
    state.isStarted = true;
    state.result = deletedKey;
    if (!deletedKey.properties.recoveryId) {
      state.isCompleted = true;
    }
  }

  if (!state.isCompleted) {
    try {
      state.result = await client.getDeletedKey(name, { requestOptions });
      state.isCompleted = true;
    } catch (error) {
      if (error.statusCode === 403) {
        // At this point, the resource exists but the user doesn't have access to it.
        state.isCompleted = true;
      } else if (error.statusCode !== 404) {
        state.error = error;
        state.isCompleted = true;
      }
    }
  }

  return makeDeleteKeyPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the key's operation, also updating the key's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: DeleteKeyPollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<DeleteKeyPollOperation> {
  throw new Error("Canceling the deletion of a key is not supported.");
}

/**
 * @summary Serializes the create key's poll operation
 */
function toString(this: DeleteKeyPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create key's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeDeleteKeyPollOperation(
  state: DeleteKeyPollOperationState
): DeleteKeyPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
