// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Poller, PollOperationState } from "../";
import { LongRunningOperation, LroPollerOptions, ResumablePollOperationState } from "./models";
import { GenericPollOperation } from "./operation";

/**
 * The LRO Engine, a class that performs polling.
 */
export class LroPoller<TResult, TState extends PollOperationState<TResult>> extends Poller<
  TState,
  TResult
> {
  private intervalInMs: number;

  constructor({ intervalInMs = 2000, resumeFrom }: LroPollerOptions, lro: LongRunningOperation<TResult>) {
    const state: TState & ResumablePollOperationState<TResult> = resumeFrom
      ? JSON.parse(resumeFrom).state
      : {};

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
