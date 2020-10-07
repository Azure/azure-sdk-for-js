// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import {
  PurchaseReservationPollerOptions,
  PurchaseReservationPollOperationState
} from "../../lroModels";
import { makePurchaseReservationPollOperation } from "./operation";

export class PurchaseReservationPoller extends Poller<
  PurchaseReservationPollOperationState,
  PhoneNumberSearch
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: PurchaseReservationPollerOptions) {
    const { client, reservationId, options, intervalInMs = 2000, resumeFrom } = _options;
    let state: PurchaseReservationPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makePurchaseReservationPollOperation({
      ...state,
      reservationId,
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
