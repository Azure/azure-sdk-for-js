// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike } from "@azure/abort-controller";
import {
  BuildCreatePollerOptions,
  CreatePollerOptions,
  Operation,
  OperationState,
  RestorableOperationState,
  PollerLike,
  StateProxy,
} from "./models";
import { deserializeState, initOperation, pollOperation } from "./operation";
import { POLL_INTERVAL_IN_MS } from "./constants";
import { delay } from "@azure/core-util";

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
  setError: (state, error) => (state.error = error),
  setResult: (state, result) => (state.result = result),
  setRunning: (state) => (state.status = "running"),
  setSucceeded: (state) => (state.status = "succeeded"),
  setFailed: (state) => (state.status = "failed"),

  getError: (state) => state.error,
  getResult: (state) => state.result,
  isCanceled: (state) => state.status === "canceled",
  isFailed: (state) => state.status === "failed",
  isRunning: (state) => state.status === "running",
  isSucceeded: (state) => state.status === "succeeded",
});

/**
 * Returns a poller factory.
 */
export function buildCreatePoller<TResponse, TResult, TState extends OperationState<TResult>>(
  inputs: BuildCreatePollerOptions<TResponse, TState>
): (
  lro: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
  options?: CreatePollerOptions<TResponse, TResult, TState>
) => PollerLike<TState, TResult> {
  const {
    getOperationLocation,
    getStatusFromInitialResponse,
    getStatusFromPollResponse,
    isOperationError,
    getResourceLocation,
    getPollingInterval,
    getError,
    resolveOnUnsuccessful,
  } = inputs;
  return (
    { init, poll }: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
    options?: CreatePollerOptions<TResponse, TResult, TState>
  ) => {
    const {
      processResult,
      updateState,
      withOperationLocation: withOperationLocationCallback,
      intervalInMs = POLL_INTERVAL_IN_MS,
      restoreFrom,
    } = options || {};
    const stateProxy = createStateProxy<TResult, TState>();
    const withOperationLocation = withOperationLocationCallback
      ? (() => {
        let called = false;
        return (operationLocation: string, isUpdated: boolean) => {
          if (isUpdated) withOperationLocationCallback(operationLocation);
          else if (!called) withOperationLocationCallback(operationLocation);
          called = true;
        };
      })()
      : undefined;
    let statePromise: Promise<TState>;
    let state: RestorableOperationState<TState> | undefined = undefined;
    if (restoreFrom) {
      state = deserializeState(restoreFrom);
      statePromise = Promise.resolve(state);
    } else {
      statePromise = initOperation({
        init,
        stateProxy,
        processResult,
        getOperationStatus: getStatusFromInitialResponse,
        withOperationLocation,
        setErrorAsResult: !resolveOnUnsuccessful,
      });
    }
    let resultPromise: Promise<TResult> | undefined;
    const abortController = new AbortController();
    // Progress handlers
    type Handler = (state?: TState) => void;
    const handlers = new Map<symbol, Handler>();
    const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));
    const cancelErrMsg = "Operation was canceled";
    let currentPollIntervalInMs = intervalInMs;

    const poller: PollerLike<TState, TResult> = {
      operationState: state,
      result: state?.result,
      isDone: ["succeeded", "failed", "canceled"].includes(state?.status ?? ""),
      isStopped: resultPromise === undefined,
      onProgress: (callback: (state?: TState) => void) => {
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
          const { abortSignal: inputAbortSignal } = pollOptions || {};
          // In the future we can use AbortSignal.any() instead
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
          if (resolveOnUnsuccessful) {
            return poller.result as TResult;
          } else {
            switch (state!.status) {
              case "succeeded":
                return poller.result as TResult;
              case "canceled":
                throw new Error(cancelErrMsg);
              case "failed":
                throw state!.error;
              case "notStarted":
              case "running":
                throw new Error(`Polling completed without succeeding or failing`);
            }
          }
        })().finally(() => { resultPromise = undefined; });
        return resultPromise;
      },
      async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<TState> {
        await statePromise;
        if (resolveOnUnsuccessful) {
          if (poller.isDone) return state!;
        } else {
          switch (state!.status) {
            case "succeeded":
              return state!;
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state!.error;
          }
        }
        await pollOperation({
          poll,
          state: state!,
          stateProxy,
          getOperationLocation,
          isOperationError,
          withOperationLocation,
          getPollingInterval,
          getOperationStatus: getStatusFromPollResponse,
          getResourceLocation,
          processResult,
          getError,
          updateState,
          options: pollOptions,
          setDelay: (pollIntervalInMs) => {
            currentPollIntervalInMs = pollIntervalInMs;
          },
          setErrorAsResult: !resolveOnUnsuccessful,
        });
        await handleProgressEvents();
        if (!resolveOnUnsuccessful) {
          switch (state!.status) {
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state!.error;
          }
        }

        return state!;
      },
      // promise operations - directly delegate then/catch/finally to the promise of pollUntilDone() returned
      then<TResult1 = TResult, TResult2 = never>(
        onfulfilled?: ((value: TResult) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
      ): Promise<TResult1 | TResult2> {
        return poller.pollUntilDone().then(onfulfilled, onrejected);
      },
      catch<TResult2 = never>(onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult | TResult2> {
        return poller.pollUntilDone().catch(onrejected);
      },
      finally(onfinally?: (() => void) | undefined | null): Promise<TResult> {
        return poller.pollUntilDone().finally(onfinally);
      },
      [Symbol.toStringTag]: "Poller"

    };
    return poller;
  };
}
