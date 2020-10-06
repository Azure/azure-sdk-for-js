// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ReleasePhoneNumbersPollOperation,
  ReleasePhoneNumbersPollOperationState,
  UpdatePollerOptions
} from "../../lroModels";
import { isComplete } from "../utils";

/**
 * @summary Reaches to the service and queries the status of the operation.
 * @param {ReleasePhoneNumbersPollOperation} this The poll operation
 * @param {UpdatePollerOptions<ReleasePhoneNumbersPollOperationState>} [options={}] Additional options for the poll operation
 */
async function update(
  this: ReleasePhoneNumbersPollOperation,
  options: UpdatePollerOptions<ReleasePhoneNumbersPollOperationState> = {}
): Promise<ReleasePhoneNumbersPollOperation> {
  const { state } = this;
  const { phoneNumbers, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      const { releaseId } = await client.releasePhoneNumbers(phoneNumbers, requestOptions);
      state.releaseId = releaseId;
      state.isStarted = true;
    }

    if (!state.isCompleted && state.releaseId) {
      state.result = await client.getRelease(state.releaseId, requestOptions);
      state.isCompleted = isComplete(state.result, "Complete");
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makeReleasePhoneNumbersPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(
  this: ReleasePhoneNumbersPollOperation
): Promise<ReleasePhoneNumbersPollOperation> {
  throw new Error("Canceling is not supported.");
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: ReleasePhoneNumbersPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeReleasePhoneNumbersPollOperation(
  state: ReleasePhoneNumbersPollOperationState
): ReleasePhoneNumbersPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
