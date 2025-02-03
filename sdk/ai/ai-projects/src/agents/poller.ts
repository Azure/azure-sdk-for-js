// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { delay } from "@azure/core-util";
import type { PollerLike, OperationState, OperationStatus } from "@azure/core-lro";
import type { AbortSignalLike } from "@azure/abort-controller";

const DEFAULT_POLL_INTERVAL_IN_MS = 1000;

export function createPoller<T>({
  initOperation,
  pollOperation,
  getOperationStatus,
  getOperationError,
  intervalInMs,
}: {
  initOperation: () => Promise<T>;
  pollOperation: (currentResult: T) => Promise<T>;
  getOperationStatus: (result: T) => OperationStatus;
  getOperationError?: (result: T) => Error | undefined;
  intervalInMs?: number;
}): PollerLike<OperationState<T>, T> {
  let state: OperationState<T>;
  const statePromise = initOperation().then((result) => {
    state = {
      result,
      status: getOperationStatus(result),
    };
    return state;
  });

  let resultPromise: Promise<T> | undefined;
  const abortController = new AbortController();
  type Handler = (state: OperationState<T>) => void;
  const handlers = new Map<symbol, Handler>();
  const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));
  const currentPollIntervalInMs = intervalInMs ?? DEFAULT_POLL_INTERVAL_IN_MS;

  const poller: PollerLike<OperationState<T>, T> = {
    get operationState(): OperationState<T> | undefined {
      return state;
    },
    get result(): T | undefined {
      return state?.result;
    },
    get isDone(): boolean {
      return ["succeeded", "failed", "canceled"].includes(state?.status ?? "");
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
    pollUntilDone: async (pollOptions?: { abortSignal?: AbortSignalLike }) => {
      resultPromise ??= (async () => {
        await statePromise;
        if (!state) {
          throw new Error("Poller is not initialized");
        }
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        function abortListener(): void {
          abortController.abort();
        }
        const abortSignal = abortController.signal;
        if (inputAbortSignal?.aborted) {
          abortController.abort();
        } else if (!abortSignal.aborted) {
          inputAbortSignal?.addEventListener("abort", abortListener, { once: true });
        }

        try {
          if (!poller.isDone) {
            await poller.poll({ abortSignal });
            while (!poller.isDone) {
              await delay(currentPollIntervalInMs, { abortSignal });
              await poller.poll({ abortSignal });
            }
          }
        } finally {
          inputAbortSignal?.removeEventListener("abort", abortListener);
        }
        switch (state.status) {
          case "succeeded":
            return poller.result as T;
          case "canceled":
            throw new Error("Operation cancelled");
          case "failed":
            throw state.error ?? new Error("Operation failed");
          case "notStarted":
          case "running":
            throw new Error("Polling completed without succeeding or failing");
        }
      })().finally(() => {
        resultPromise = undefined;
      });
      return resultPromise;
    },

    async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<OperationState<T>> {
      // Check state before polling
      await statePromise;
      if (!state || !state.result) {
        throw new Error("Poller is not initialized");
      }
      switch (state.status) {
        case "succeeded":
          return state;
        case "canceled":
          throw new Error("Operation was canceled");
        case "failed":
          throw state.error ?? new Error("Operation failed");
      }

      // Poll
      if (pollOptions?.abortSignal?.aborted) {
        throw new Error("Operation aborted");
      }
      const result = await pollOperation(state.result);
      state = {
        result,
        status: getOperationStatus(result),
        error: getOperationError ? getOperationError(result) : undefined,
      };

      await handleProgressEvents();
      switch (state.status) {
        case "canceled":
          throw new Error("Operation was canceled");
        case "failed":
          throw state.error ?? new Error("Operation failed");
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
