// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { BeginRefreshSearchOptions, PhoneNumberPollerClient } from "../../models";

export interface RefreshSearchPollOperationState extends PollOperationState<PhoneNumberSearch> {
  /**
   * The id of the search returned by createSearch.
   */
  searchId: string;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;
  /**
   * Options for refreshing a search.
   */
  options?: BeginRefreshSearchOptions;
}

/**
 * Represents the refresh poll operation.
 */
export interface RefreshSearchPollOperation
  extends PollOperation<RefreshSearchPollOperationState, PhoneNumberSearch> {}

async function update(
  this: RefreshSearchPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: RefreshSearchPollOperationState) => void;
  } = {}
): Promise<RefreshSearchPollOperation> {
  const state = this.state;
  const { searchId, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      await client.refreshSearch(searchId, requestOptions);
      state.isStarted = true;
      state.result = await client.getSearch(searchId, requestOptions);
      if (state.result.status === "Success") {
        state.isCompleted = true;
      }
    }

    if (!state.isCompleted) {
      state.result = await client.getSearch(searchId, requestOptions);
      if (state.result.status === "Success") {
        state.isCompleted = true;
      }
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makeRefreshSearchPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: RefreshSearchPollOperation): Promise<RefreshSearchPollOperation> {
  throw new Error("Canceling the deletion of a secret is not supported.");
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: RefreshSearchPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeRefreshSearchPollOperation(
  state: RefreshSearchPollOperationState
): RefreshSearchPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
