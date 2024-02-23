// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LroError,
  InnerError,
  Operation,
  OperationStatus,
  RestorableOperationState,
  StateProxy,
} from "./models.js";
import { logger } from "../logger.js";
import { terminalStates } from "./constants.js";

/**
 * Deserializes the state
 */
export function deserializeState<TState>(
  serializedState: string,
): RestorableOperationState<TState> {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`Unable to deserialize input state: ${serializedState}`);
  }
}

function setStateError<TState, TResult>(inputs: {
  state: TState;
  stateProxy: StateProxy<TState, TResult>;
  isOperationError: (error: Error) => boolean;
}): (error: Error) => never {
  const { state, stateProxy, isOperationError } = inputs;
  return (error: Error) => {
    if (isOperationError(error)) {
      stateProxy.setError(state, error);
      stateProxy.setFailed(state);
    }
    throw error;
  };
}

function appendReadableErrorMessage(currentMessage: string, innerMessage: string): string {
  let message = currentMessage;
  if (message.slice(-1) !== ".") {
    message = message + ".";
  }
  return message + " " + innerMessage;
}

function simplifyError(err: LroError): {
  code: string;
  message: string;
} {
  let message = err.message;
  let code = err.code;
  let curErr = err as InnerError;
  while (curErr.innererror) {
    curErr = curErr.innererror;
    code = curErr.code;
    message = appendReadableErrorMessage(message, curErr.message);
  }
  return {
    code,
    message,
  };
}

async function processOperationStatus<TState, TResult, TResponse>(result: {
  status: OperationStatus;
  response: TResponse;
  state: RestorableOperationState<TState>;
  stateProxy: StateProxy<TState, TResult>;
  processResult?: (result: TResponse, state: TState) => TResult | Promise<TResult>;
  getError?: (response: TResponse) => LroError | undefined;
  isDone?: (lastResponse: TResponse, state: TState) => boolean;
  setErrorAsResult: boolean;
}): Promise<void> {
  const { state, stateProxy, status, isDone, processResult, getError, response, setErrorAsResult } =
    result;
  switch (status) {
    case "succeeded": {
      stateProxy.setSucceeded(state);
      break;
    }
    case "failed": {
      const err = getError?.(response);
      let postfix = "";
      if (err) {
        const { code, message } = simplifyError(err);
        postfix = `. ${code}. ${message}`;
      }
      const errStr = `The long-running operation has failed${postfix}`;
      stateProxy.setError(state, new Error(errStr));
      stateProxy.setFailed(state);
      logger.warning(errStr);
      break;
    }
    case "canceled": {
      stateProxy.setCanceled(state);
      break;
    }
  }
  if (
    isDone?.(response, state) ||
    (isDone === undefined &&
      ["succeeded", "canceled"].concat(setErrorAsResult ? [] : ["failed"]).includes(status))
  ) {
    stateProxy.setResult(
      state,
      await buildResult({
        response,
        state,
        processResult,
      }),
    );
  }
}

async function buildResult<TResponse, TResult, TState>(inputs: {
  response: TResponse;
  state: TState;
  processResult?: (result: TResponse, state: TState) => TResult | Promise<TResult>;
}): Promise<TResult> {
  const { processResult, response, state } = inputs;
  return processResult ? processResult(response, state) : (response as unknown as TResult);
}

/**
 * Initiates the long-running operation.
 */
export async function initOperation<TResponse, TResult, TState>(inputs: {
  init: Operation<TResponse, unknown>["init"];
  stateProxy: StateProxy<TState, TResult>;
  getOperationStatus: (inputs: {
    response: TResponse;
    state: RestorableOperationState<TState>;
    operationLocation?: string;
  }) => OperationStatus;
  processResult?: (result: TResponse, state: TState) => TResult | Promise<TResult>;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
  setErrorAsResult: boolean;
}): Promise<RestorableOperationState<TState>> {
  const {
    init,
    stateProxy,
    processResult,
    getOperationStatus,
    withOperationLocation,
    setErrorAsResult,
  } = inputs;
  const { operationLocation, resourceLocation, initialUrl, requestMethod, metadata, response } =
    await init();
  if (operationLocation) withOperationLocation?.(operationLocation, false);
  const config = {
    metadata,
    operationLocation,
    resourceLocation,
    initialUrl,
    requestMethod,
  };
  logger.verbose(`LRO: Operation description:`, config);
  const state = stateProxy.initState(config);
  const status = getOperationStatus({ response, state, operationLocation });
  await processOperationStatus({
    state,
    status,
    stateProxy,
    response,
    setErrorAsResult,
    processResult,
  });
  return state;
}

async function pollOperationHelper<TResponse, TState, TResult, TOptions>(inputs: {
  poll: Operation<TResponse, TOptions>["poll"];
  stateProxy: StateProxy<TState, TResult>;
  state: RestorableOperationState<TState>;
  operationLocation: string;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TState>,
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TState>,
  ) => string | undefined;
  isOperationError: (error: Error) => boolean;
  options?: TOptions;
}): Promise<{
  status: OperationStatus;
  response: TResponse;
}> {
  const {
    poll,
    state,
    stateProxy,
    operationLocation,
    getOperationStatus,
    getResourceLocation,
    isOperationError,
    options,
  } = inputs;
  const response = await poll(operationLocation, options).catch(
    setStateError({
      state,
      stateProxy,
      isOperationError,
    }),
  );
  const status = getOperationStatus(response, state);
  logger.verbose(
    `LRO: Status:\n\tPolling from: ${
      state.config.operationLocation
    }\n\tOperation status: ${status}\n\tPolling status: ${
      terminalStates.includes(status) ? "Stopped" : "Running"
    }`,
  );
  if (status === "succeeded") {
    const resourceLocation = getResourceLocation(response, state);
    if (resourceLocation !== undefined) {
      return {
        response: await poll(resourceLocation).catch(
          setStateError({ state, stateProxy, isOperationError }),
        ),
        status,
      };
    }
  }
  return { response, status };
}

/** Polls the long-running operation. */
export async function pollOperation<TResponse, TState, TResult, TOptions>(inputs: {
  poll: Operation<TResponse, TOptions>["poll"];
  stateProxy: StateProxy<TState, TResult>;
  state: RestorableOperationState<TState>;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TState>,
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TState>,
  ) => string | undefined;
  isOperationError: (error: Error) => boolean;
  getPollingInterval?: (response: TResponse) => number | undefined;
  setDelay: (intervalInMs: number) => void;
  getOperationLocation?: (
    response: TResponse,
    state: RestorableOperationState<TState>,
  ) => string | undefined;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
  processResult?: (result: TResponse, state: TState) => TResult | Promise<TResult>;
  getError?: (response: TResponse) => LroError | undefined;
  updateState?: (state: TState, lastResponse: TResponse) => void;
  isDone?: (lastResponse: TResponse, state: TState) => boolean;
  setErrorAsResult: boolean;
  options?: TOptions;
}): Promise<void> {
  const {
    poll,
    state,
    stateProxy,
    options,
    getOperationStatus,
    getResourceLocation,
    getOperationLocation,
    isOperationError,
    withOperationLocation,
    getPollingInterval,
    processResult,
    getError,
    updateState,
    setDelay,
    isDone,
    setErrorAsResult,
  } = inputs;
  const { operationLocation } = state.config;
  if (operationLocation !== undefined) {
    const { response, status } = await pollOperationHelper({
      poll,
      getOperationStatus,
      state,
      stateProxy,
      operationLocation,
      getResourceLocation,
      isOperationError,
      options,
    });
    await processOperationStatus({
      status,
      response,
      state,
      stateProxy,
      isDone,
      processResult,
      getError,
      setErrorAsResult,
    });

    if (!terminalStates.includes(status)) {
      const intervalInMs = getPollingInterval?.(response);
      if (intervalInMs) setDelay(intervalInMs);
      const location = getOperationLocation?.(response, state);
      if (location !== undefined) {
        const isUpdated = operationLocation !== location;
        state.config.operationLocation = location;
        withOperationLocation?.(location, isUpdated);
      } else withOperationLocation?.(operationLocation, false);
    }
    updateState?.(state, response);
  }
}
