// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortController, AbortSignalLike } from "@azure/abort-controller";
import { delay } from "@azure/core-util";
import { POLL_INTERVAL_IN_MS } from "./constants";
import { OperationState, BuildCreatePollerOptions, Operation, CreatePollerOptions, PromiseWithSimplePollerLike, RestorableOperationState, SimplePollerLike, StateProxy } from "./models";
import { deserializeState, initOperation, pollOperation } from "./operation";

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
 * ============================ Option 1: devired promise from pollUntilDone ============================
 * step 0: init state with notStarted status and config it when calling initOperation
 * Step 1: create poller
 * Step 2: get result promise by calling poller.pollUntilDone()
 * Step 3: somehow delegate the polling operations to poller and delegate promise operations to promise
 * Step 4: return the poller & promise
 * =====================================================================================================
 */
export function buildCreatePollerOption1<TResponse, TResult, TState extends OperationState<TResult>>(
  inputs: BuildCreatePollerOptions<TResponse, TState>
): (
  lro: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
  options?: CreatePollerOptions<TResponse, TResult, TState>
) => PromiseWithSimplePollerLike<TState, TResult> {
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
    const statePromise: Promise<RestorableOperationState<TState>> = restoreFrom
      ? deserializeState(restoreFrom)
      : initOperation({
        init,
        stateProxy,
        processResult,
        getOperationStatus: getStatusFromInitialResponse,
        withOperationLocation,
        setErrorAsResult: !resolveOnUnsuccessful,
      });
    let state: TState = {
      status: "notStarted",
    } as any;
    statePromise.then((s) => state = s).catch(() => console.log);
    let resultPromise: Promise<TResult> | undefined;
    const abortController = new AbortController();
    // Progress handlers
    type Handler = (state: TState) => void;
    const handlers = new Map<symbol, Handler>();
    const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));
    const cancelErrMsg = "Operation was canceled";
    let currentPollIntervalInMs = intervalInMs;

    const poller: SimplePollerLike<TState, TResult> = {
      getOperationState: () => state,
      getResult: () => state.result,
      isDone: () => ["succeeded", "failed", "canceled"].includes(state.status),
      isStopped: () => resultPromise === undefined,
      stopPolling: () => {
        abortController.abort();
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
      pollUntilDone: (pollOptions?: { abortSignal?: AbortSignalLike }) =>
      (resultPromise ??= (async () => {
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        const { signal: abortSignal } = inputAbortSignal
          ? new AbortController([inputAbortSignal, abortController.signal])
          : abortController;
        await statePromise;
        if (!poller.isDone()) {
          await poller.poll({ abortSignal });
          while (!poller.isDone()) {
            await delay(currentPollIntervalInMs, { abortSignal });
            await poller.poll({ abortSignal });
          }
        }
        if (resolveOnUnsuccessful) {
          return poller.getResult() as TResult;
        } else {
          switch (state.status) {
            case "succeeded":
              return poller.getResult() as TResult;
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
            case "notStarted":
            case "running":
              throw new Error(`Polling completed without succeeding or failing`);
          }
        }
      })().finally(() => {
        resultPromise = undefined;
      })),
      async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<void> {
        if (resolveOnUnsuccessful) {
          if (poller.isDone()) return;
        } else {
          switch (state.status) {
            case "succeeded":
              return;
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
          }
        }
        await pollOperation({
          poll,
          state: state as RestorableOperationState<TState>,
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
          switch (state.status) {
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
          }
        }
      },
    };
    // The polling will be triggered automatically when calling pollUntilDone()
    const returnPromise = poller.pollUntilDone();
    // We could either delegate operations to promise/poller or directly bind then/catch/finally to the promise
    (poller as PromiseWithSimplePollerLike<TState, TResult>).then = returnPromise.then.bind(returnPromise);
    (poller as PromiseWithSimplePollerLike<TState, TResult>).catch = returnPromise.catch.bind(returnPromise);
    (poller as PromiseWithSimplePollerLike<TState, TResult>).finally = returnPromise.finally.bind(returnPromise);
    return poller as PromiseWithSimplePollerLike<TState, TResult>;
  };
}

/**
 * ============================ Option 2: direct assign to promiseWithPoller.pollUntilDone()  ============================
 * step 0: init state with notStarted status and config it when calling initOperation
 * Step 1: create promiseWithPoller
 * Step 4: return promiseWithPoller
 * =========================================================================================
 */
export function buildCreatePollerOption2<TResponse, TResult, TState extends OperationState<TResult>>(
  inputs: BuildCreatePollerOptions<TResponse, TState>
): (
  lro: Operation<TResponse, { abortSignal?: AbortSignalLike }>,
  options?: CreatePollerOptions<TResponse, TResult, TState>
) => PromiseWithSimplePollerLike<TState, TResult> {
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
    const statePromise: Promise<RestorableOperationState<TState>> = restoreFrom
      ? deserializeState(restoreFrom)
      : initOperation({
        init,
        stateProxy,
        processResult,
        getOperationStatus: getStatusFromInitialResponse,
        withOperationLocation,
        setErrorAsResult: !resolveOnUnsuccessful,
      });
    let state: TState = {
      status: "notStarted",
    } as any;
    statePromise.then((s) => state = s).catch(() => console.log);
    let resultPromise: Promise<TResult> | undefined;
    const abortController = new AbortController();
    // Progress handlers
    type Handler = (state: TState) => void;
    const handlers = new Map<symbol, Handler>();
    const handleProgressEvents = async (): Promise<void> => handlers.forEach((h) => h(state));
    const cancelErrMsg = "Operation was canceled";
    let currentPollIntervalInMs = intervalInMs;

    const promiseWithPoller: PromiseWithSimplePollerLike<TState, TResult> = {
      getOperationState: () => state,
      getResult: () => state.result,
      isDone: () => ["succeeded", "failed", "canceled"].includes(state.status),
      isStopped: () => resultPromise === undefined,
      stopPolling: () => {
        abortController.abort();
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
      pollUntilDone: (pollOptions?: { abortSignal?: AbortSignalLike }) =>
      (resultPromise ??= (async () => {
        const { abortSignal: inputAbortSignal } = pollOptions || {};
        const { signal: abortSignal } = inputAbortSignal
          ? new AbortController([inputAbortSignal, abortController.signal])
          : abortController;
        await statePromise;
        if (!promiseWithPoller.isDone()) {
          await promiseWithPoller.poll({ abortSignal });
          while (!promiseWithPoller.isDone()) {
            await delay(currentPollIntervalInMs, { abortSignal });
            await promiseWithPoller.poll({ abortSignal });
          }
        }
        if (resolveOnUnsuccessful) {
          return promiseWithPoller.getResult() as TResult;
        } else {
          switch (state.status) {
            case "succeeded":
              return promiseWithPoller.getResult() as TResult;
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
            case "notStarted":
            case "running":
              throw new Error(`Polling completed without succeeding or failing`);
          }
        }
      })().finally(() => {
        resultPromise = undefined;
      })),
      async poll(pollOptions?: { abortSignal?: AbortSignalLike }): Promise<void> {
        if (resolveOnUnsuccessful) {
          if (promiseWithPoller.isDone()) return;
        } else {
          switch (state.status) {
            case "succeeded":
              return;
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
          }
        }
        await pollOperation({
          poll,
          state: state as RestorableOperationState<TState>,
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
          switch (state.status) {
            case "canceled":
              throw new Error(cancelErrMsg);
            case "failed":
              throw state.error;
          }
        }
      },
      then<TResult1 = TResult, TResult2 = never>(
        onfulfilled?: ((value: TResult) => TResult1 | PromiseLike<TResult1>) | undefined | null,
        onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null
      ): Promise<TResult1 | TResult2> {
        return promiseWithPoller.pollUntilDone().then(onfulfilled, onrejected);
      },
      catch<T = never>(onrejected?: ((reason: any) => T | PromiseLike<T>) | undefined | null): Promise<TResult | T> {
        return promiseWithPoller.pollUntilDone().catch(onrejected);
      },
      finally(onfinally?: (() => void) | undefined | null): Promise<TResult> {
        return promiseWithPoller.pollUntilDone().finally(onfinally)
      },
      [Symbol.toStringTag]: "PromiseWithSimplePollerLike",
    };
    return promiseWithPoller;
  };
}
