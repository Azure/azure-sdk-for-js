// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import { PollOperationState, PollOperation } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { BeginPurchaseSearchOptions, PhoneNumberPollerClient } from "../../models";
import { isComplete } from "../utils";

export interface PurchaseSearchPollOperationState extends PollOperationState<PhoneNumberSearch> {
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
  options?: BeginPurchaseSearchOptions;
}

/**
 * Represents the refresh poll operation.
 */
export interface PurchaseSearchPollOperation
  extends PollOperation<PurchaseSearchPollOperationState, PhoneNumberSearch> {}

async function update(
  this: PurchaseSearchPollOperation,
  options: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: PurchaseSearchPollOperationState) => void;
  } = {}
): Promise<PurchaseSearchPollOperation> {
  const state = this.state;
  const { searchId, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      await client.purchaseSearch(searchId, requestOptions);
      state.isStarted = true;
      state.result = await client.getSearch(searchId, requestOptions);
      state.isCompleted = isComplete(state.result, "Success");
    }

    if (!state.isCompleted) {
      state.result = await client.getSearch(searchId, requestOptions);
      state.isCompleted = isComplete(state.result, "Success");
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makePurchaseSearchPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 * @param [options] The optional parameters, which is only an abortSignal from @azure/abort-controller
 */
async function cancel(this: PurchaseSearchPollOperation): Promise<PurchaseSearchPollOperation> {
  throw new Error("Canceling is not supported.");
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: PurchaseSearchPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makePurchaseSearchPollOperation(
  state: PurchaseSearchPollOperationState
): PurchaseSearchPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
