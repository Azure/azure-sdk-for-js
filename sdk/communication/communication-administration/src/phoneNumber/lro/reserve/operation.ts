// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ReservePhoneNumbersPollOperationState,
  ReservePhoneNumbersPollOperation,
  UpdatePollerOptions
} from "../../lroModels";
import { isComplete } from "../utils";

/**
 * @summary Reaches to the service and queries the status of the operation.
 * @param {ReservePhoneNumbersPollOperation} this The poll operation
 * @param {UpdatePollerOptions<ReservePhoneNumbersPollOperationState>} [options={}] Additional options for the poll operation
 */
async function update(
  this: ReservePhoneNumbersPollOperation,
  options: UpdatePollerOptions<ReservePhoneNumbersPollOperationState> = {}
): Promise<ReservePhoneNumbersPollOperation> {
  const state = this.state;
  const { reservationRequest, client } = state;
  const requestOptions = state.options || {};

  if (options.abortSignal) {
    requestOptions.abortSignal = options.abortSignal;
  }

  try {
    if (!state.isStarted) {
      const { reservationId } = await client.createReservation(reservationRequest, requestOptions);
      state.reservationId = reservationId;
      state.isStarted = true;
    }

    if (!state.isCompleted && state.reservationId) {
      state.result = await client.getReservation(state.reservationId, requestOptions);
      state.isCompleted = isComplete(state.result, "Reserved");
    }
  } catch (error) {
    state.error = error;
    state.isCompleted = true;
  } finally {
    return makeReservePhoneNumbersPollOperation(state);
  }
}

/**
 * @summary Reaches to the service and cancels the operation, also updating the poll operation
 */
async function cancel(
  this: ReservePhoneNumbersPollOperation
): Promise<ReservePhoneNumbersPollOperation> {
  const state = this.state;
  const { reservationId, client, options = {} } = state;

  if (reservationId) {
    await client.cancelReservation(reservationId, options);
  }

  state.isCancelled = true;
  return makeReservePhoneNumbersPollOperation(state);
}

/**
 * @summary Serializes the poll operation
 */
function toString(this: ReservePhoneNumbersPollOperation): string {
  return JSON.stringify({
    state: this.state
  });
}

/**
 * @summary Builds a poll operation
 * @param [state] A poll operation's state, in case the new one is intended to follow up where the previous one was left.
 */
export function makeReservePhoneNumbersPollOperation(
  state: ReservePhoneNumbersPollOperationState
): ReservePhoneNumbersPollOperation {
  return {
    state: {
      ...state
    },
    update,
    cancel,
    toString
  };
}
