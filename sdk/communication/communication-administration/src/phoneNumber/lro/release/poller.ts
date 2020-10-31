// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PhoneNumberRelease } from "../../generated/src/models";
import {
  ReleasePhoneNumbersPollerOptions,
  ReleasePhoneNumbersPollOperationState
} from "../../lroModels";
import { PhoneNumberPollerBase } from "../phoneNumberPollerBase";
import { ReleasePhoneNumbersPollOperation } from "./operation";

/**
 * The poller for release a phone number or list of phone numbers.
 */
export class ReleasePhoneNumbersPoller extends PhoneNumberPollerBase<
  ReleasePhoneNumbersPollOperationState,
  PhoneNumberRelease
> {
  /**
   * Initializes an instance of ReleasePhoneNumbersPoller
   *
   * @param {ReleasePhoneNumbersPollerOptions} options Options for initializing the poller.
   */
  constructor(options: ReleasePhoneNumbersPollerOptions) {
    const { client, phoneNumbers, requestOptions = {}, pollInterval = 2000, resumeFrom } = options;
    let state: ReleasePhoneNumbersPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = new ReleasePhoneNumbersPollOperation(
      {
        ...state,
        phoneNumbers
      },
      client,
      requestOptions
    );

    super(operation);

    this.pollInterval = pollInterval;
  }
}
