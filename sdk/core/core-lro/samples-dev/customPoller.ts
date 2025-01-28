// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary demnostrates how to create a custom poller.
 */

import type { OperationState, OperationStatus, PollerLike } from "@azure/core-lro";
import { delay } from "@azure/core-util";

const DEFAULT_POLL_INTERVAL_IN_MS = 2000;

/**
 * This type represents the configuration needed to poll the operation.
 * This is typically an operation ID, a resource ID, or an absolute URL.
 */
type OperationConfig = { id: string };

type RestorableOperationState<TResult, TState extends OperationState<TResult>> = TState & {
  config: OperationConfig;
};

/**
 * This function sends the initial request to start the operation and returns
 * the state of the operation including a configuration object that can be used
 * to poll the operation.
 * @returns the initial state of the operation
 */
async function initOperation<T>(): Promise<RestorableOperationState<T, OperationState<T>>> {
  // starts the operation
  return { status: "running", config: { id: "1" } };
}

/**
 * This type represents the options that can be passed to pollOperation.
 */
type PollOperationOptions<T> = {
  state: RestorableOperationState<T, OperationState<T>>;
  setDelay: (interval: number) => void;
  options?: { abortSignal?: AbortSignal };
};

/**
 * This function polls the operation using the configuration object in state
 * that was returned from initOperation. It also updates the poller state with
 * the information in the polling response.
 */
async function pollOperation<T>({
  setDelay,
  state,
  options,
}: PollOperationOptions<T>): Promise<void> {
  if (options?.abortSignal?.aborted) {
    throw new Error("aborted");
  }
  // polls the operation using id while respecting the abort signal in options
  const { id } = state.config;
  const response = { id, status: "succeeded", retryAfter: 2000 };
  // update the state based on the response
  if (response.status === "succeeded") {
    state.status = "succeeded";
    state.result = response as T;
  } else if (response.status === "failed") {
    state.status = "failed";
    state.error = (response as any).error;
  } else if (response.status === "canceled") {
    state.status = "canceled";
  } else {
    setDelay(response.retryAfter); // updates the delay if the service suggests a different interval
  }
}

/**
 * This function deserializes the state of the poller.
 */
function deserializeState<T, TState extends OperationState<T>>(
  serializedState: string,
): RestorableOperationState<T, TState> {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`Unable to deserialize input state: ${serializedState}`);
  }
}

/**
 * This type represents the options that can be passed to createPoller.
 */
interface CreatePollerOptions {
  /**
   * The serialized state of the poller.
   */
  restoreFrom?: string;
  /**
   * The interval in milliseconds to wait between polls.
   */
  intervalInMs?: number;
}

/**
 * Creates a poller for the operation.
 */
function createPoller<T>({
  intervalInMs,
  restoreFrom,
}: CreatePollerOptions): PollerLike<OperationState<T>, T> {
  let statePromise: Promise<OperationState<T>>;
  let state: RestorableOperationState<T, OperationState<T>>;
  if (restoreFrom) {
    state = deserializeState(restoreFrom);
    statePromise = Promise.resolve(state);
  } else {
    statePromise = initOperation<T>().then((s) => (state = s));
  }
  let resultPromise: Promise<T> | undefined;
  const abortController = new AbortController();
  // Progress handlers
  type Handler = (state: OperationState<T>) => void;
  const handlers = new Map<symbol, Handler>();
  const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));
  const cancelErrMsg = "Operation was canceled";
  let currentPollIntervalInMs = intervalInMs ?? DEFAULT_POLL_INTERVAL_IN_MS;
  const poller: PollerLike<OperationState<T>, T> = {
    get operationState(): OperationState<T> | undefined {
      return state;
    },
    get result(): T | undefined {
      return state?.result;
    },
    get isDone(): boolean {
      return ["succeeded", "failed", "canceled"].includes(state?.status);
    },
    onProgress: (callback: (state: OperationState<T>) => void) => {
      const s = Symbol();
      handlers.set(s, callback);
      return () => handlers.delete(s);
    },
    serialize: async () => {
      await statePromise;
      return JSON.stringify({
        state,
      });
    },
    submitted: async () => {
      await statePromise;
    },
    pollUntilDone: async (pollOptions?: { abortSignal?: AbortSignal }) => {
      resultPromise ??= (async () => {
        await statePromise;
        if (!state) {
          throw new Error("Poller should be initialized but it is not!");
        }
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        const abortSignal = inputAbortSignal
          ? AbortSignal.any([inputAbortSignal, abortController.signal])
          : abortController.signal;

        if (!poller.isDone) {
          await poller.poll({ abortSignal });
          while (!poller.isDone) {
            await delay(currentPollIntervalInMs, { abortSignal });
            await poller.poll({ abortSignal });
          }
        }
        switch (state.status) {
          case "succeeded":
            return poller.result as T;
          case "canceled":
            throw new Error(cancelErrMsg);
          case "failed":
            throw state.error;
          case "notStarted":
          case "running":
            throw new Error(`Polling completed without succeeding or failing`);
        }
      })().finally(() => {
        resultPromise = undefined;
      });
      return resultPromise;
    },
    async poll(pollOptions?: { abortSignal?: AbortSignal }): Promise<OperationState<T>> {
      await statePromise;
      if (!state) {
        throw new Error("Poller should be initialized but it is not!");
      }
      switch (state.status) {
        case "succeeded":
          return state;
        case "canceled":
          throw new Error(cancelErrMsg);
        case "failed":
          throw state.error;
      }
      await pollOperation({
        state,
        options: pollOptions,
        setDelay: (pollIntervalInMs) => {
          currentPollIntervalInMs = pollIntervalInMs;
        },
      });
      await handleProgressEvents();
      switch (state.status as OperationStatus) {
        case "canceled":
          throw new Error(cancelErrMsg);
        case "failed":
          throw state.error;
      }

      return state;
    },
    then<T1 = T, T2 = never>(
      onfulfilled?: ((value: T) => T1 | PromiseLike<T1>) | undefined | null,
      onrejected?: ((reason: any) => T2 | PromiseLike<T2>) | undefined | null,
    ): Promise<T1 | T2> {
      return poller.pollUntilDone().then(onfulfilled, onrejected);
    },
    catch<T2 = never>(
      onrejected?: ((reason: any) => T2 | PromiseLike<T2>) | undefined | null,
    ): Promise<T | T2> {
      return poller.pollUntilDone().catch(onrejected);
    },
    finally(onfinally?: (() => void) | undefined | null): Promise<T> {
      return poller.pollUntilDone().finally(onfinally);
    },
    [Symbol.toStringTag]: "Poller",
  };
  return poller;
}

async function main() {
  const poller = createPoller({ intervalInMs: 1000 });
  const res = await poller.pollUntilDone();
  console.log(res);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
