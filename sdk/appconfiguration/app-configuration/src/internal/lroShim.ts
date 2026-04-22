// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type {
  CancelOnProgress,
  OperationState,
  PollerLike as CorePollerLike,
} from "@azure/core-lro";

/**
 * A simple poller that can be used to poll a long running operation.
 *
 * This interface mirrors the shape of `SimplePollerLike` from `@azure/core-lro` v2
 * so that the public API surface is preserved while internally using the v3 poller.
 */
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
  /**
   * Returns true if the poller is stopped.
   */
  isStopped(): boolean;
  /**
   * Returns the state of the operation.
   */
  getOperationState(): TState;
  /**
   * Returns the result value of the operation,
   * regardless of the state of the poller.
   * It can return undefined or an incomplete form of the final TResult value
   * depending on the implementation.
   */
  getResult(): TResult | undefined;
  /**
   * Returns a promise that will resolve once a single polling request finishes.
   * It does this by calling the update method of the Poller's operation.
   */
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<void>;
  /**
   * Returns a promise that will resolve once the underlying operation is completed.
   */
  pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TResult>;
  /**
   * Invokes the provided callback after each polling is completed,
   * sending the current state of the poller's operation.
   *
   * It returns a method that can be used to stop receiving updates on the given callback function.
   */
  onProgress(callback: (state: TState) => void): CancelOnProgress;
  /**
   * Returns a string representation of the poller's operation. Similar to serialize but returns a string.
   */
  toString(): string;
  /**
   * Stops the poller from continuing to poll. Please note this will only stop the client-side polling
   */
  stopPolling(): void;
}

/**
 * Wraps a v3 core-lro `PollerLike` so that it exposes the v2-style `SimplePollerLike` API
 * surface expected by existing callers of `@azure/app-configuration`.
 *
 * @internal
 */
export async function wrapPoller<TState extends OperationState<TResult>, TResult>(
  httpPoller: CorePollerLike<TState, TResult>,
): Promise<SimplePollerLike<TState, TResult>> {
  const abortController = new AbortController();
  const simplePoller: SimplePollerLike<TState, TResult> = {
    isDone() {
      return httpPoller.isDone;
    },
    isStopped() {
      return abortController.signal.aborted;
    },
    getOperationState() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started; await submitted() before calling getOperationState().",
        );
      }
      return httpPoller.operationState;
    },
    getResult() {
      return httpPoller.result;
    },
    toString() {
      if (!httpPoller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started; await submitted() before calling getOperationState().",
        );
      }
      return JSON.stringify({
        state: httpPoller.operationState,
      });
    },
    stopPolling() {
      abortController.abort();
    },
    onProgress: httpPoller.onProgress,
    async poll(options) {
      await httpPoller.poll(options);
    },
    pollUntilDone(pollOptions?: { abortSignal?: AbortSignalLike }) {
      function abortListener(): void {
        abortController.abort();
      }
      const inputAbortSignal = pollOptions?.abortSignal;
      const abortSignal = abortController.signal;
      if (inputAbortSignal?.aborted) {
        abortController.abort();
      } else if (!abortSignal.aborted) {
        inputAbortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      return httpPoller.pollUntilDone({ abortSignal: abortController.signal });
    },
  };
  await httpPoller.submitted();
  return simplePoller;
}
