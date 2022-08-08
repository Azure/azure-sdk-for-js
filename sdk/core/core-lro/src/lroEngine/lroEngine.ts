// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, RestorableOperationState } from "../models";
import { LroEngineOptions, PollerConfig } from "./models";
import { POLL_INTERVAL_IN_MS, deserializeState } from "../impl";
import { GenericPollOperation } from "./operation";
import { PollOperationState } from "../pollOperation";
import { Poller } from "../poller";

/**
 * The LRO Engine, a class that performs polling.
 */
export class LroEngine<TResult, TState extends PollOperationState<TResult>> extends Poller<
  TState,
  TResult
> {
  private config: PollerConfig;

  constructor(lro: LongRunningOperation<TResult>, options?: LroEngineOptions<TResult, TState>) {
    const { intervalInMs = POLL_INTERVAL_IN_MS, resumeFrom } = options || {};
    const state: RestorableOperationState<TState> = resumeFrom
      ? deserializeState(resumeFrom)
      : ({} as RestorableOperationState<TState>);

    const operation = new GenericPollOperation(
      state,
      lro,
      options?.lroResourceLocationConfig,
      options?.processResult,
      options?.updateState,
      options?.isDone
    );
    super(operation);

    this.config = { intervalInMs: intervalInMs };
    operation.setPollerConfig(this.config);
  }

  /**
   * The method used by the poller to wait before attempting to update its operation.
   */
  delay(): Promise<void> {
    return new Promise((resolve) => setTimeout(() => resolve(), this.config.intervalInMs));
  }
}
