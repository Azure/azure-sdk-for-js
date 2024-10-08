// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PollOperationState, PollerLike } from "@azure/core-lro";
import { delayMs } from "./delayMs";
import { AbortError, AbortSignalLike } from "@azure/abort-controller";

const DEFAULT_POLLING_INTERVAL = 5000;

/**
 * Information about the Long-Running Operation (LRO) that is being performed.
 */
export interface OperationContext {
  /**
   * An AbortSignal that can be used to cancel the operation.
   */
  abortSignal?: AbortSignalLike;

  /**
   * Sets the server's preferred polling interval in milliseconds. To clear the server's preferred polling interval,
   * pass `undefined`.
   */
  updateDelay: (interval: number | undefined) => void;
}

/**
 * A specification for a long-running operation, which defines the poller flow.
 * @internal
 */
export interface OperationSpec<TState extends PollOperationState<unknown>> {
  /**
   * A function that produces the first operation state for this LRO.
   */
  init: (ctx: OperationContext) => Promise<TState>;
  /**
   * A function that consumes the existing state of the poller and produces the next state.
   */
  poll: (ctx: OperationContext, state: TState) => Promise<TState>;
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
  pollingInterval: number | undefined,
  initAbortSignal: AbortSignalLike | undefined,
): Promise<PollerLike<TState, TResult>> {
  let serverDrivenDelay: number | undefined;

  const initContext: OperationContext = {
    abortSignal: initAbortSignal,
    updateDelay: (interval) => {
      serverDrivenDelay = interval;
    },
  };

  if (initAbortSignal?.aborted) {
    throw new AbortError("The operation was aborted.");
  }

  let state = await spec.init(initContext);

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
    poll: async (options) => {
      state = await spec.poll(
        {
          abortSignal: options?.abortSignal,
          updateDelay: (interval) => {
            serverDrivenDelay = interval;
          },
        },
        state,
      );
      handleProgressEvents();
    },
    pollUntilDone: (options) =>
      (job ??= (async () => {
        // Technically, the poller could complete during initialization
        if (!self.isDone()) {
          // Poll once to get the ball rolling, this avoids a delay if the operation completes immediately
          await self.poll(options);
          while (!self.isDone()) {
            const finalPollingInterval = Math.max(
              serverDrivenDelay ?? 0,
              pollingInterval ?? DEFAULT_POLLING_INTERVAL,
            );
            const delay = delayMs(finalPollingInterval, options?.abortSignal);
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
            `Internal Client Error: analysis poller completed without success or error: ${state}`,
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
