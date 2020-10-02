// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { delay } from "@azure/core-http";
import { Poller } from "@azure/core-lro";
import { PhoneNumberSearch } from "../../generated/src/models";
import { CreateSearchOptions, CreateSearchRequest, _PhoneNumberPollerClient } from "../../models";
import { makeCreateSearchPollOperation, CreateSearchPollOperationState } from "./operation";

export interface CreateSearchPollerOptions {
  client: _PhoneNumberPollerClient;
  searchRequest: CreateSearchRequest;
  options?: CreateSearchOptions;
  intervalInMs?: number;
  resumeFrom?: string;
}

export class CreateSearchPoller extends Poller<CreateSearchPollOperationState, PhoneNumberSearch> {
  /**
   * Defines how much time the poller is going to wait before making a new request to the service.
   */
  public intervalInMs: number;

  constructor(_options: CreateSearchPollerOptions) {
    const { client, searchRequest, options, intervalInMs = 2000, resumeFrom } = _options;

    let state: CreateSearchPollOperationState | undefined;

    if (resumeFrom) {
      state = JSON.parse(resumeFrom).state;
    }

    const operation = makeCreateSearchPollOperation({
      ...state,
      searchRequest,
      options,
      client
    });

    super(operation);

    this.intervalInMs = intervalInMs;
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   * @memberof CreateSearchPoller
   */
  async delay(): Promise<void> {
    return delay(this.intervalInMs);
  }
}
