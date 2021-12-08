// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CancelOnProgress, PollOperationState, PollerLike } from "@azure/core-lro";
import { AbortSignalLike } from "@azure/abort-controller";

/**
 * @internal
 */
export class SearchBatchPoller<TSearchBatchResult, TInternalBatchResult>
  implements PollerLike<PollOperationState<TSearchBatchResult>, TSearchBatchResult> {
  constructor(
    private internalPoller: PollerLike<
      PollOperationState<TInternalBatchResult>,
      TInternalBatchResult
    >,
    private mapper: (res: TInternalBatchResult) => TSearchBatchResult
  ) {}
  public poll(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    return this.internalPoller.poll(options);
  }
  public cancelOperation(options: { abortSignal?: AbortSignalLike } = {}): Promise<void> {
    return this.internalPoller.cancelOperation(options);
  }

  public async pollUntilDone(): Promise<TSearchBatchResult> {
    const result = await this.internalPoller.pollUntilDone();
    return this.mapper(result);
  }
  public onProgress(
    callback: (state: PollOperationState<TSearchBatchResult>) => void
  ): CancelOnProgress {
    const internalCallback = (internalState: PollOperationState<TInternalBatchResult>): void => {
      const state: PollOperationState<TSearchBatchResult> = {};
      if (internalState.isStarted) {
        state.isStarted = internalState.isStarted;
      }
      if (internalState.isCompleted) {
        state.isCompleted = internalState.isCompleted;
      }
      if (internalState.isCancelled) {
        state.isCancelled = internalState.isCancelled;
      }
      if (internalState.error) {
        state.error = internalState.error;
      }
      if (internalState.result) {
        state.result = this.mapper(internalState.result);
      }
      callback(state);
    };
    return this.internalPoller.onProgress(internalCallback);
  }
  public isDone(): boolean {
    return this.internalPoller.isDone();
  }
  public stopPolling(): void {
    this.internalPoller.stopPolling();
  }
  public isStopped(): boolean {
    return this.internalPoller.isStopped();
  }
  public getOperationState(): PollOperationState<TSearchBatchResult> {
    const internalState = this.internalPoller.getOperationState();
    const state: PollOperationState<TSearchBatchResult> = {};
    if (internalState.isStarted) {
      state.isStarted = internalState.isStarted;
    }
    if (internalState.isCompleted) {
      state.isCompleted = internalState.isCompleted;
    }
    if (internalState.isCancelled) {
      state.isCancelled = internalState.isCancelled;
    }
    if (internalState.error) {
      state.error = internalState.error;
    }
    if (internalState.result) {
      state.result = this.mapper(internalState.result);
    }
    return state;
  }
  public getResult(): TSearchBatchResult | undefined {
    const result = this.internalPoller.getResult();
    if (result) {
      return this.mapper(result);
    }
    return undefined;
  }
  public toString(): string {
    return this.internalPoller.toString();
  }
}
