// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollOperationState, PollerLike } from "@azure/core-lro";
import { delayMs } from "./delayMs";

const DEFAULT_POLLING_INTERVAL = 5000;

/**
 * A specification for a long-running operation, which defines the poller flow.
 * @internal
 */
export interface OperationSpec<TState extends PollOperationState<unknown>> {
  /**
   * A function that produces the first operation state for this LRO.
   */
  init: () => Promise<TState>;
  /**
   * A function that consumes the existing state of the poller and produces the next state.
   */
  poll: (state: TState) => Promise<TState>;
  /**
   * A function that serializes the state into a string.
   */
  serialize: (state: TState) => string;
}

/**
 * Uniform poller implementation, creates a poller based on a PollerSpec.
 *
 * @internal
 */
export async function lro<TResult, TState extends PollOperationState<TResult>>(
  spec: OperationSpec<TState>,
  pollingInterval: number | undefined
): Promise<PollerLike<TState, TResult>> {
  let state = typeof spec.init === "function" ? await spec.init() : spec.init;

  type ThisPoller = PollerLike<TState, TResult>;

  // Job handling. If `job` is defined, then there is an active `pollUntilDone` call on this poller.
  // Call `cancelJob` to interrupt the polling loop (awaiters will throw).
  let job: Promise<TResult> | undefined;
  let cancelJob: (() => void) | undefined;

  // Progress handlers
  type Handler = (state: TState) => void;
  const handlers = new Map<symbol, Handler>();
  const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));

  const self: ThisPoller = {
    onProgress: (callback: (state: TState) => void) => {
      const s = Symbol();
      handlers.set(s, callback);
      return () => handlers.delete(s);
    },
    stopPolling: () => cancelJob?.(),
    poll: async () => {
      state = await spec.poll(state);
      handleProgressEvents();
    },
    pollUntilDone: () =>
      (job ??= (async () => {
        // Technically, the poller could complete during initialization
        if (!self.isDone()) {
          // Poll once to get the ball rolling, this avoids a delay if the operation completes immediately
          await self.poll();
          while (!self.isDone()) {
            const delay = delayMs(pollingInterval ?? DEFAULT_POLLING_INTERVAL);
            cancelJob = delay.cancel;
            await delay.then(() => self.poll());
          }
        }
        const result = self.getResult();

        // The state says it's done, so we know we are in either a success case, an error case, or an _internal_ error.
        if (result !== undefined) return result;
        else if (state.error !== undefined) throw state.error;
        // Unreachable
        else {
          throw new Error(
            `Internal Client Error: analysis poller completed without success or error: ${state}`
          );
        }
      })().finally(() => {
        job = undefined;
      })),
    // The poller is stopped if there is no job running
    isStopped: () => !!job,
    // The operation is complete if either a result or error is produced
    isDone: () => !!state.result || !!state.error,
    // In FR, all operations run to completion
    cancelOperation() {
      throw new Error("The Azure Form Recognizer service does not support operation cancellation.");
    },
    getOperationState: () => state,
    getResult: () => state.result,
    toString: () => spec.serialize(state),
  };

  return self;
}
