// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { BeginPurchaseSearchOptions, PhoneNumberPollerClient } from "../../models";
import { makePurchaseSearchPollOperation, PurchaseSearchPollOperationState } from "./operation";

export interface PurchaseSearchPollerOptions {
  client: PhoneNumberPollerClient;
  searchId: string;
  options?: BeginPurchaseSearchOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

export class PurchaseSearchPoller extends Poller<
  PurchaseSearchPollOperationState,
  PhoneNumberSearch
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: PurchaseSearchPollerOptions) {
    const { client, searchId, options, intervalInMs = 2000, resumeFrom } = _options;

    let state: PurchaseSearchPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makePurchaseSearchPollOperation({
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
   * @memberof DeleteSecretPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
