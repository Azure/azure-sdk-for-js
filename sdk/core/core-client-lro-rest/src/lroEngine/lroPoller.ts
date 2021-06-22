// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Poller, PollOperationState } from "@azure/core-lro";
import { LRO, LROPollerOptions } from "./models";
import { GenericPollOperation } from "./operation";

export class LROPoller<TResult> extends Poller<PollOperationState<TResult>, TResult> {
  private intervalInMs: number;

  constructor({ intervalInMs = 2000, resumeFrom }: LROPollerOptions, lro: LRO<TResult>) {
    const state: PollOperationState<TResult> = resumeFrom ? JSON.parse(resumeFrom).state : {};

    const operation = new GenericPollOperation(state, lro);
    super(operation);

    this.intervalInMs = intervalInMs;
    operation.setPollerConfig(this as any);
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), this.intervalInMs));
  }
}
