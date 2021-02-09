// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberReservation } from "../../generated/src/models";
import {
  ReservePhoneNumbersPollerOptions,
  ReservePhoneNumbersPollOperationState
} from "../../lroModels";
import { PhoneNumberPollerBase } from "../phoneNumberPollerBase";
import { ReservePhoneNumbersPollOperation } from "./operation";

/**
 * The poller for reserving phone numbers.
 */
export class ReservePhoneNumbersPoller extends PhoneNumberPollerBase<
  ReservePhoneNumbersPollOperationState,
  PhoneNumberReservation
> {
  /**
   * Initializes an instance of ReservePhoneNumbersPoller
   *
   * @param options - Options for initializing the poller.
   */
  constructor(options: ReservePhoneNumbersPollerOptions) {
    const {
      client,
      reservationRequest,
      requestOptions = {},
      pollInterval = 2000,
      resumeFrom
    } = options;
    let state: ReservePhoneNumbersPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new ReservePhoneNumbersPollOperation(
      {
        ...state,
        reservationRequest
      },
      client,
      requestOptions
    );

    super(operation);

    this.pollInterval = pollInterval;
  }
}
