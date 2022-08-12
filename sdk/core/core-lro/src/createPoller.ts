// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import {
  CreatePollerOptions,
  LongRunningOperation,
  OperationState,
  RestorableOperationState,
  SimplePollerLike,
  StateProxy,
} from "./models";
import { POLL_INTERVAL_IN_MS, deserializeState, initOperation, pollOperation } from "./impl";
import { delayMs } from "./util/delayMs";

const createStateProxy: <TResult, TState extends OperationState<TResult>>() => StateProxy<
  TState,
  TResult
> = () => ({
  /**
   * The state at this point is created to be of type OperationState<TResult>.
   * It will be updated later to be of type TState when the
   * customer-provided callback, `updateState`, is called during polling.
   */
  initState: (config) => ({ status: "running", config } as any),
  setCanceled: (state) => (state.status = "canceled"),
  setCanceling: (state) => (state.status = "canceling"),
  setError: (state, error) => (state.error = error),
  setResult: (state, result) => (state.result = result),
  setRunning: (state) => (state.status = "running"),
  setSucceeded: (state) => (state.status = "succeeded"),
  setFailed: (state) => (state.status = "failed"),

  getError: (state) => state.error,
  getResult: (state) => state.result,
  isCanceled: (state) => state.status === "canceled",
  isCanceling: (state) => state.status === "canceling",
  isFailed: (state) => state.status === "failed",
  isRunning: (state) => state.status === "running",
  isSucceeded: (state) => state.status === "succeeded",
});

/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export async function createPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  options?: CreatePollerOptions<TResult, TState>
): Promise<SimplePollerLike<TState, TResult>> {
  const {
    resourceLocationConfig,
    processResult,
    updateState,
    withPollingUrl: withPollingUrlCallback,
    intervalInMs = POLL_INTERVAL_IN_MS,
    restoreFrom,
  } = options || {};
  const { requestMethod, requestPath } = lro;
  const stateProxy = createStateProxy<TResult, TState>();
  const withPollingUrl = withPollingUrlCallback
    ? (() => {
        let called = false;
        return (pollingUrl: string, isUpdated: boolean) => {
          if (isUpdated) withPollingUrlCallback(pollingUrl);
          else if (!called) withPollingUrlCallback(pollingUrl);
          called = true;
        };
      })()
    : undefined;
  const state: RestorableOperationState<TState> = restoreFrom
    ? deserializeState(restoreFrom)
    : await initOperation({
        lro,
        stateProxy,
        requestPath,
        requestMethod,
        resourceLocationConfig,
        processResult,
        withPollingUrl,
      });
  let resultPromise: Promise<TResult> | undefined;
  let cancelJob: (() => void) | undefined;
  const abortController = new AbortController();
  // Progress handlers
  type Handler = (state: TState) => void;
  const handlers = new Map<symbol, Handler>();
  const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));

  let currentPollIntervalInMs = intervalInMs;

  const poller: SimplePollerLike<TState, TResult> = {
    getOperationState: () => state,
    getResult: () => state.result,
    isDone: () => ["succeeded", "failed", "canceled"].includes(state.status),
    isStopped: () => resultPromise === undefined,
    stopPolling: () => {
      abortController.abort();
      cancelJob?.();
    },
    toString: () =>
      JSON.stringify({
        state,
      }),
    onProgress: (callback: (state: TState) => void) => {
      const s = Symbol();
      handlers.set(s, callback);
      return () => handlers.delete(s);
    },
    pollUntilDone: (pollOptions: { abortSignal?: AbortSignalLike } = {}) =>
      (resultPromise ??= (async () => {
        const { abortSignal } = pollOptions;
        const { signal } = abortSignal
          ? new AbortController([abortSignal, abortController.signal])
          : abortController;
        if (!poller.isDone()) {
          await poller.poll({ abortSignal: signal });
          while (!poller.isDone()) {
            const delay = delayMs(currentPollIntervalInMs);
            cancelJob = delay.cancel;
            await delay;
            await poller.poll({ abortSignal: signal });
          }
        }
        switch (state.status) {
          case "succeeded": {
            return poller.getResult() as TResult;
          }
          case "canceled": {
            throw new Error("Operation was canceled");
          }
          case "failed": {
            throw state.error;
          }
          case "canceling":
          case "notStarted":
          case "running": {
            // Unreachable
            throw new Error(`polling completed without succeeding or failing`);
          }
        }
      })().finally(() => {
        resultPromise = undefined;
      })),
    async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<void> {
      await pollOperation({
        lro,
        state,
        stateProxy,
        processResult,
        updateState,
        withPollingUrl,
        options: pollOptions,
        setDelay: (pollIntervalInMs) => {
          currentPollIntervalInMs = pollIntervalInMs;
        },
      });
      await handleProgressEvents();
      if (state.status === "canceled") {
        throw new Error("Operation was canceled");
      }
      if (state.status === "failed") {
        throw state.error;
      }
    },
  };
  return poller;
}
