// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { BeginPurchasePhoneNumbersOptions, _PhoneNumberPollerClient } from "../../models";
import { makePurchasePhoneNumbersPollOperation, PurchasePhoneNumbersPollOperationState } from "./operation";

export interface PurchasePhoneNumbersPollerOptions {
  client: _PhoneNumberPollerClient;
  searchId: string;
  options?: BeginPurchasePhoneNumbersOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

export class PurchasePhoneNumbersPoller extends Poller<
  PurchasePhoneNumbersPollOperationState,
  PhoneNumberSearch
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: PurchasePhoneNumbersPollerOptions) {
    const { client, searchId, options, intervalInMs = 2000, resumeFrom } = _options;

    let state: PurchasePhoneNumbersPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makePurchasePhoneNumbersPollOperation({
      ...state,
      searchId,
      options,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof PurchasePhoneNumbersPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
