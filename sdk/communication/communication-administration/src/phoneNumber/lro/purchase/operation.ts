// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PurchaseReservationPollOperationState,
  PurchaseReservationPollOperation,
  UpdatePollerOptions
} from "../../lroModels";
import { isComplete } from "../utils";

/**
 * @summary Reaches to the service and queries the status of the operation.
 * @param {PurchaseReservationPollOperation} this The poll operation
 * @param {UpdatePollerOptions<PurchaseReservationPollOperationState>} [options={}] Additional options for the poll operation
 */
async function update(
  this: PurchaseReservationPollOperation,
  options: UpdatePollerOptions<PurchaseReservationPollOperationState> = {}
): Promise<PurchaseReservationPollOperation> {
  const state = this.state;
  const { reservationId, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      await client.purchaseReservation(reservationId, requestOptions);
      state.isStarted = true;
    }

    if (!state.isCompleted) {
      state.result = await client.getReservation(reservationId, requestOptions);
      state.isCompleted = isComplete(state.result, "Success");
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makePurchaseReservationPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 */
async function cancel(
  this: PurchaseReservationPollOperation
): Promise<PurchaseReservationPollOperation> {
  const state = this.state;
  const { reservationId, client, options = {} } = state;

  if (reservationId) {
    await client.cancelReservation(reservationId, options);
  }

  state.isCancelled = true;
  return makePurchaseReservationPollOperation(state);
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: PurchaseReservationPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makePurchaseReservationPollOperation(
  state: PurchaseReservationPollOperationState
): PurchaseReservationPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
