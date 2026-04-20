// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationState, PollerLike } from "@azure/core-lro";

export function createBatchPoller(params: {
  initFn: () => Promise<OperationState<void>>;
  pollFn: (options?: { abortSignal?: AbortSignalLike }) => Promise<OperationState<void>>;
  updateIntervalInMs?: number;
}): PollerLike<OperationState<void>, void> {
  const updateIntervalInMs = params.updateIntervalInMs ?? 5000;
  let state: OperationState<void> = { status: "notStarted" };
  let resultPromise: Promise<void> | undefined;
  let pollPromise: Promise<OperationState<void>> | undefined;
  const progressCallbacks: Set<(state: OperationState<void>) => void> = new Set();
  let abortSignal: AbortSignalLike | undefined;

  // Helper to check if the operation was aborted
  const checkIfAborted = (signal?: AbortSignalLike): void => {
    if (signal?.aborted) {
      state.status = "canceled";
      throw new Error("The operation was aborted.");
    }
  };

  // Helper to wait for a given duration, respecting abort signal
  const wait = (ms: number, signal?: AbortSignalLike): Promise<void> => {
    return new Promise((resolve, reject) => {
      try {
        checkIfAborted(signal);
      } catch (err) {
        reject(err);
        return;
      }

      let onAbort: (() => void) | undefined;

      const timeoutId = setTimeout(() => {
        if (onAbort && signal) {
          signal.removeEventListener("abort", onAbort);
        }
        resolve();
      }, ms);

      if (signal) {
        onAbort = () => {
          clearTimeout(timeoutId);
          state.status = "canceled";
          reject(new Error("The operation was aborted."));
        };
        signal.addEventListener("abort", onAbort);
      }
    });
  };

  // Helper to call pollFn, reusing existing promise if one is in flight
  const doPoll = (options?: { abortSignal?: AbortSignalLike }): Promise<OperationState<void>> => {
    if (!pollPromise) {
      pollPromise = params
        .pollFn(options)
        .then((newState) => {
          state = newState;
          checkStatus(state);
          return state;
        })
        .catch((err) => {
          state.error = err;
          state.status =
            state.status !== "failed" && state.status !== "canceled" ? "failed" : state.status;
          throw err;
        })
        .finally(() => {
          // Notify all progress callbacks
          for (const callback of progressCallbacks) {
            callback(state);
          }
          pollPromise = undefined;
        });
    }
    return pollPromise;
  };

  // Start initialization immediately when poller is created
  const initPromise = params
    .initFn()
    .then((initialState) => {
      checkIfAborted(abortSignal);
      state = initialState;
      checkStatus(state);
      return state;
    })
    .catch((err) => {
      state.error = err;
      state.status =
        state.status !== "failed" && state.status !== "canceled" ? "failed" : state.status;
      throw err;
    });

  const poller: PollerLike<OperationState<void>, void> = {
    get isDone() {
      return (
        state.status === "succeeded" || state.status === "failed" || state.status === "canceled"
      );
    },
    get operationState() {
      return state;
    },
    get result() {
      return state.result;
    },
    onProgress: (callback) => {
      progressCallbacks.add(callback);
      return () => {
        progressCallbacks.delete(callback);
      };
    },
    poll: async (pollOptions?: { abortSignal?: AbortSignalLike }) => {
      await initPromise;
      if (poller.isDone) {
        checkStatus(state);
        return state;
      }
      checkIfAborted(pollOptions?.abortSignal);
      await doPoll(pollOptions);
      return state;
    },
    pollUntilDone: async (pollOptions?: { abortSignal?: AbortSignalLike }) => {
      abortSignal = pollOptions?.abortSignal;
      if (!resultPromise) {
        resultPromise = (async () => {
          // Wait for init to complete first
          await initPromise;
          checkIfAborted(abortSignal);
          if (poller.isDone) {
            checkStatus(state);
            return;
          }
          // Poll until done
          while (!poller.isDone) {
            checkIfAborted(abortSignal);
            await doPoll({ abortSignal });
            if (!poller.isDone) {
              await wait(updateIntervalInMs, abortSignal);
            }
          }
        })();
      }
      return resultPromise;
    },
    serialize: async () => JSON.stringify({ state }),
    submitted: async () => {
      await initPromise;
    },
    then: (onfulfilled, onrejected) => {
      if (!resultPromise) {
        resultPromise = poller.pollUntilDone();
      }
      return resultPromise.then(onfulfilled, onrejected);
    },
    catch: (onrejected) => {
      if (!resultPromise) {
        resultPromise = poller.pollUntilDone();
      }
      return resultPromise.catch(onrejected);
    },
    finally: (onfinally) => {
      if (!resultPromise) {
        resultPromise = poller.pollUntilDone();
      }
      return resultPromise.finally(onfinally);
    },
    [Symbol.toStringTag]: "Poller",
  };

  return poller;
}

function checkStatus(state: OperationState<void>): void {
  switch (state.status) {
    case "succeeded":
      break;
    case "running":
      break;
    case "failed":
      throw state.error ?? new Error("Operation failed");
    case "canceled":
      throw new Error("Operation was canceled");
    case "notStarted":
      throw new Error("Operation has not started");
    default:
      throw new Error(`Unknown operation status: ${state.status}`);
  }
}
