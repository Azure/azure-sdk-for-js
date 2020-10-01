// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { BeginRefreshSearchOptions, PhoneNumberPollerClient } from "../../models";
import { makeRefreshSearchPollOperation, RefreshSearchPollOperationState } from "./operation";

export interface RefreshSearchPollerOptions {
  client: PhoneNumberPollerClient;
  searchId: string;
  options?: BeginRefreshSearchOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

export class RefreshSearchPoller extends Poller<
  RefreshSearchPollOperationState,
  PhoneNumberSearch
> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: RefreshSearchPollerOptions) {
    const { client, searchId, options, intervalInMs = 2000, resumeFrom } = _options;

    let state: RefreshSearchPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeRefreshSearchPollOperation({
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
