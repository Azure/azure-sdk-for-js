// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { CreateSearchOptions, CreateSearchRequest, PhoneNumberPollerClient } from "../../models";
import { isComplete } from "../utils";

export interface CreateSearchPollOperationState extends PollOperationState<PhoneNumberSearch> {
  /**
   * Request to create a search.
   */
  searchRequest: CreateSearchRequest;

  /**
   * Represents the poller client used internally.
   */
  client: PhoneNumberPollerClient;

  /**
   * The id of the search returned by createSearch.
   */
  searchId?: string;

  /**
   * Options for refreshing a search.
   */
  options?: CreateSearchOptions;
}

/**
 * Represents the refresh poll operation.
 */
export interface CreateSearchPollOperation
  extends PollOperation<CreateSearchPollOperationState, PhoneNumberSearch> {}

async function update(
  this: CreateSearchPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: CreateSearchPollOperationState) => void;
  } = {}
): Promise<CreateSearchPollOperation> {
  const state = this.state;
  const { searchRequest, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      const { searchId } = await client.createSearch(searchRequest, requestOptions);
      state.searchId = searchId;
      state.isStarted = true;
    }

    if (!state.isCompleted && state.searchId) {
      state.result = await client.getSearch(state.searchId, requestOptions);
      state.isCompleted = isComplete(state.result, "Success");
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makeCreateSearchPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: CreateSearchPollOperation): Promise<CreateSearchPollOperation> {
  throw new Error("Canceling is not supported.");
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: CreateSearchPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeCreateSearchPollOperation(
  state: CreateSearchPollOperationState
): CreateSearchPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
