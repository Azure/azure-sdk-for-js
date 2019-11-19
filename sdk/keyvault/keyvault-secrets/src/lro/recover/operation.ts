// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { RequestOptionsBase } from "@azure/core-http";
import { SecretProperties, SecretClientInterface } from "../../secretsModels";

/**
 * An interface representing the state of a delete secret's poll operation
 */
export interface RecoverDeletedSecretPollOperationState
  extends PollOperationState<SecretProperties> {
  /**
   * The name of the secret.
   */
  name: string;
  /**
   * Options for the core-http requests.
   */
  requestOptions?: RequestOptionsBase;
  /**
   * An interface representing a SecretClient. For internal use.
   */
  client: SecretClientInterface;
}

/**
 * An interface representing a delete secret's poll operation
 */
export interface RecoverDeletedSecretPollOperation
  extends PollOperation<RecoverDeletedSecretPollOperationState, SecretProperties> {}

/**
 * @summary Reaches to the service and updates the delete secret's poll operation.
 * @param [options] The optional parameters, which are an abortSignal from @azure/abort-controller and a function that triggers the poller's onProgress function.
 */
async function update(
  this: RecoverDeletedSecretPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RecoverDeletedSecretPollOperationState) => void;
  } = {}
): Promise<RecoverDeletedSecretPollOperation> {
  const state = this.state;
  const { name, client } = state;

  const requestOptions = state.requestOptions || {};
  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  if (!state.isStarted) {
    try {
      state.result = (await client.getSecret(name, { requestOptions })).properties;
      state.isCompleted = true;
    } catch (_) {}
    if (!state.isCompleted) {
      state.result = await client.recoverDeletedSecret(name, { requestOptions });
      state.isStarted = true;
    }
  }

  if (!state.isCompleted) {
    try {
      state.result = (await client.getSecret(name, { requestOptions })).properties;
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

  return makeRecoverDeletedSecretPollOperation(state);
}

/**
 * @summary Reaches to the service and cancels the secret's operation, also updating the secret's poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: RecoverDeletedSecretPollOperation,
  _: { abortSignal?: AbortSignal } = {}
): Promise<RecoverDeletedSecretPollOperation> {
  throw new Error("Canceling the deletion of a secret is not supported.");
}

/**
 * @summary Serializes the create secret's poll operation
 */
function toString(this: RecoverDeletedSecretPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a create secret's poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRecoverDeletedSecretPollOperation(
  state: RecoverDeletedSecretPollOperationState
): RecoverDeletedSecretPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
