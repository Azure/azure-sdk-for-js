// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberRelease } from "../../generated/src/models";
import {
  ReleasePhoneNumbersPollerOptions,
  ReleasePhoneNumbersPollOperationState
} from "../../lroModels";
import { makeReleasePhoneNumbersPollOperation } from "./operation";

export class ReleasePhoneNumbersPoller extends Poller<
  ReleasePhoneNumbersPollOperationState,
  PhoneNumberRelease
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: ReleasePhoneNumbersPollerOptions) {
    const { client, phoneNumbers, options, intervalInMs = 2000, resumeFrom } = _options;
    let state: ReleasePhoneNumbersPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeReleasePhoneNumbersPollOperation({
      ...state,
      phoneNumbers,
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
