// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResourceLocationConfig, RawResponse } from "../../http/models.js";
import { PollOperation, PollOperationState } from "../pollOperation.js";
import { RestorableOperationState, StateProxy } from "../../poller/models.js";
import { initHttpOperation, pollHttpOperation } from "../../http/operation.js";
import { AbortSignalLike } from "@azure/abort-controller";
import { PollerConfig } from "./models.js";
import { logger } from "../../logger.js";

const createStateProxy: <TResult, TState extends PollOperationState<TResult>>() => StateProxy<
  TState,
  TResult
> = () => ({
  initState: (config) => ({ config, isStarted: true }) as any,
  setCanceled: (state) => (state.isCancelled = true),
  setError: (state, error) => (state.error = error),
  setResult: (state, result) => (state.result = result),
  setRunning: (state) => (state.isStarted = true),
  setSucceeded: (state) => (state.isCompleted = true),
  setFailed: () => {
    /** empty body */
  },

  getError: (state) => state.error,
  getResult: (state) => state.result,
  isCanceled: (state) => !!state.isCancelled,
  isFailed: (state) => !!state.error,
  isRunning: (state) => !!state.isStarted,
  isSucceeded: (state) => Boolean(state.isCompleted && !state.isCancelled && !state.error),
});

export class GenericPollOperation<TResult, TState extends PollOperationState<TResult>>
  implements PollOperation<TState, TResult>
{
  private pollerConfig?: PollerConfig;

  constructor(
    public state: RestorableOperationState<TState>,
    private lro: LongRunningOperation,
    private setErrorAsResult: boolean,
    private lroResourceLocationConfig?: LroResourceLocationConfig,
    private processResult?: (result: unknown, state: TState) => TResult,
    private updateState?: (state: TState, lastResponse: RawResponse) => void,
    private isDone?: (lastResponse: TResult, state: TState) => boolean,
  ) {}

  public setPollerConfig(pollerConfig: PollerConfig): void {
    this.pollerConfig = pollerConfig;
  }

  async update(options?: {
    abortSignal?: AbortSignalLike;
    fireProgress?: (state: TState) => void;
  }): Promise<PollOperation<TState, TResult>> {
    const stateProxy = createStateProxy<TResult, TState>();
    if (!this.state.isStarted) {
      this.state = {
        ...this.state,
        ...(await initHttpOperation({
          lro: this.lro,
          stateProxy,
          resourceLocationConfig: this.lroResourceLocationConfig,
          processResult: this.processResult,
          setErrorAsResult: this.setErrorAsResult,
        })),
      };
    }
    const updateState = this.updateState;
    const isDone = this.isDone;

    if (!this.state.isCompleted && this.state.error === undefined) {
      await pollHttpOperation({
        lro: this.lro,
        state: this.state,
        stateProxy,
        processResult: this.processResult,
        updateState: updateState
          ? (state, { rawResponse }) => updateState(state, rawResponse)
          : undefined,
        isDone: isDone
          ? ({ flatResponse }, state) => isDone(flatResponse as TResult, state)
          : undefined,
        options,
        setDelay: (intervalInMs) => {
          this.pollerConfig!.intervalInMs = intervalInMs;
        },
        setErrorAsResult: this.setErrorAsResult,
      });
    }
    options?.fireProgress?.(this.state);
    return this;
  }

  async cancel(): Promise<PollOperation<TState, TResult>> {
    logger.error("`cancelOperation` is deprecated because it wasn't implemented");
    return this;
  }

  /**
   * Serializes the Poller operation.
   */
  public toString(): string {
    return JSON.stringify({
      state: this.state,
    });
  }
}
