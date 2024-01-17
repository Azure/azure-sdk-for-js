// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LroEngineOptions, PollerConfig } from "./models.js";
import { GenericPollOperation } from "./operation.js";
import { LongRunningOperation } from "../../http/models.js";
import { POLL_INTERVAL_IN_MS } from "../../poller/constants.js";
import { PollOperationState } from "../pollOperation.js";
import { Poller } from "../poller.js";
import { RestorableOperationState } from "../../poller/models.js";
import { deserializeState } from "../../poller/operation.js";

/**
 * The LRO Engine, a class that performs polling.
 */
export class LroEngine<TResult, TState extends PollOperationState<TResult>> extends Poller<
  TState,
  TResult
> {
  private config: PollerConfig;

  constructor(lro: LongRunningOperation<TResult>, options?: LroEngineOptions<TResult, TState>) {
    const {
      intervalInMs = POLL_INTERVAL_IN_MS,
      resumeFrom,
      resolveOnUnsuccessful = false,
      isDone,
      lroResourceLocationConfig,
      processResult,
      updateState,
    } = options || {};
    const state: RestorableOperationState<TState> = resumeFrom
      ? deserializeState(resumeFrom)
      : ({} as RestorableOperationState<TState>);
    const operation = new GenericPollOperation(
      state,
      lro,
      !resolveOnUnsuccessful,
      lroResourceLocationConfig,
      processResult,
      updateState,
      isDone,
    );
    super(operation);
    this.resolveOnUnsuccessful = resolveOnUnsuccessful;

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
