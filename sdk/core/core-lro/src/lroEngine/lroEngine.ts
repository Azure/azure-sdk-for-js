// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperation,
  LroEngineOptions,
  PollerConfig,
  ResumablePollOperationState
} from "./models";
import { GenericPollOperation } from "./operation";
import { PollOperationState } from "../pollOperation";
import { Poller } from "../poller";

function deserializeState<TResult, TState>(
  serializedState: string
): TState & ResumablePollOperationState<TResult> {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`LroEngine: Unable to deserialize state: ${serializedState}`);
  }
}

/**
 * The LRO Engine, a class that performs polling.
 */
export class LroEngine<TResult, TState extends PollOperationState<TResult>> extends Poller<
  TState,
  TResult
> {
  private config: PollerConfig;

  constructor(lro: LongRunningOperation<TResult>, options?: LroEngineOptions<TResult, TState>) {
    const { intervalInMs = 2000, resumeFrom } = options || {};
    const state: TState & ResumablePollOperationState<TResult> = resumeFrom
      ? deserializeState(resumeFrom)
      : ({} as TState & ResumablePollOperationState<TResult>);

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
