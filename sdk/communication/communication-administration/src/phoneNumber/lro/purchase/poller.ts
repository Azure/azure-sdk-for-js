// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PurchaseReservationPollerOptions,
  PurchaseReservationPollOperationState
} from "../../lroModels";
import { PhoneNumberPollerBase } from "../phoneNumberPollerBase";
import { PurchaseReservationPollOperation } from "./operation";

/**
 * The poller for purchasing a phone number reservation.
 */
export class PurchaseReservationPoller extends PhoneNumberPollerBase<
  PurchaseReservationPollOperationState,
  void
> {
  /**
   * Initializes an instance of PurchaseReservationPoller
   *
   * @param {PurchaseReservationPollerOptions} options Options for initializing the poller.
   */
  constructor(options: PurchaseReservationPollerOptions) {
    const { client, reservationId, requestOptions = {}, pollInterval = 2000, resumeFrom } = options;
    let state: PurchaseReservationPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new PurchaseReservationPollOperation(
      {
        ...state,
        reservationId
      },
      client,
      requestOptions
    );

    super(operation);

    this.pollInterval = pollInterval;
  }
}
