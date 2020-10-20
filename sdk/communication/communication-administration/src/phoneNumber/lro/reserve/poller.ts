// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberReservation } from "../../generated/src/models";
import {
  ReservePhoneNumbersPollerOptions,
  ReservePhoneNumbersPollOperationState
} from "../../lroModels";
import { makeReservePhoneNumbersPollOperation } from "./operation";

export class ReservePhoneNumbersPoller extends Poller<
  ReservePhoneNumbersPollOperationState,
  PhoneNumberReservation
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: ReservePhoneNumbersPollerOptions) {
    const { client, reservationRequest, options, intervalInMs = 2000, resumeFrom } = _options;
    let state: ReservePhoneNumbersPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeReservePhoneNumbersPollOperation({
      ...state,
      reservationRequest,
      options,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
