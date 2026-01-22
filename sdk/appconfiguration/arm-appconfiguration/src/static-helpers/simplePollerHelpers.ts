// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PollerLike, OperationState, CancelOnProgress } from "@azure/core-lro";
import type { AbortSignalLike } from "@azure/abort-controller";

/**
 * A simple poller that can be used to poll a long running operation.
 */
export interface SimplePollerLike<TState extends OperationState<TResult>, TResult> {
  /**
   * Returns true if the poller has finished polling.
   */
  isDone(): boolean;
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
  poll(options?: { abortSignal?: AbortSignalLike }): Promise<TState>;
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
   * Returns a promise that could be used for serialized version of the poller's operation
   * by invoking the operation's serialize method.
   */
  serialize(): Promise<string>;

  /**
   * Wait the poller to be submitted.
   */
  submitted(): Promise<void>;

  /**
   * Returns a string representation of the poller's operation. Similar to serialize but returns a string.
   * @deprecated Use serialize() instead.
   */
  toString(): string;

  /**
   * Stops the poller from continuing to poll. Please note this will only stop the client-side polling
   * @deprecated Use abortSignal to stop polling instead.
   */
  stopPolling(): void;

  /**
   * Returns true if the poller is stopped.
   * @deprecated Use abortSignal status to track this instead.
   */
  isStopped(): boolean;
}

/**
 * Create the deprecated SimplePollerLike from PollerLike
 * @param poller PollerLike to convert
 * @returns SimplePollerLike
 */
export function getSimplePoller<TResult>(
  poller: PollerLike<OperationState<TResult>, TResult>,
): SimplePollerLike<OperationState<TResult>, TResult> {
  const simplePoller: SimplePollerLike<OperationState<TResult>, TResult> = {
    isDone() {
      return poller.isDone;
    },
    isStopped() {
      throw new Error("isStopped is deprecated. Use abortSignal status to track this instead.");
    },
    getOperationState() {
      if (!poller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return poller.operationState;
    },
    getResult() {
      return poller.result;
    },
    toString() {
      if (!poller.operationState) {
        throw new Error(
          "Operation state is not available. The poller may not have been started and you could await submitted() before calling getOperationState().",
        );
      }
      return JSON.stringify({
        state: poller.operationState,
      });
    },
    stopPolling() {
      throw new Error("stopPolling is deprecated. Use abortSignal to stop polling instead.");
    },
    onProgress: poller.onProgress,
    poll: poller.poll,
    pollUntilDone: poller.pollUntilDone,
    serialize: poller.serialize,
    submitted: poller.submitted,
  };
  return simplePoller;
}
