// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LroError,
  InnerError,
  Operation,
  OperationStatus,
  RestorableOperationState,
  OperationState,
} from "./models.js";
import { logger } from "../logger.js";
import { terminalStates } from "./constants.js";

/**
 * Deserializes the state
 */
export function deserializeState<TResult, TState extends OperationState<TResult>>(
  serializedState: string,
): RestorableOperationState<TResult, TState> {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`Unable to deserialize input state: ${serializedState}`);
  }
}

function setStateError<TResult, TState extends OperationState<TResult>>(inputs: {
  state: TState;
  isOperationError: (error: Error) => boolean;
}): (error: Error) => never {
  const { state, isOperationError } = inputs;
  return (error: Error) => {
    if (isOperationError(error)) {
      state.error = error;
      state.status = "failed";
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

async function processOperationStatus<
  TState extends OperationState<TResult>,
  TResult,
  TResponse,
>(result: {
  status: OperationStatus;
  response: TResponse;
  state: RestorableOperationState<TResult, TState>;
  processResult?: (result: TResponse, state: TState) => Promise<TResult>;
  getError?: (response: TResponse) => LroError | undefined;
  isDone?: (lastResponse: TResponse, state: TState) => boolean;
  setErrorAsResult: boolean;
}): Promise<void> {
  const { state, status, isDone, processResult, getError, response, setErrorAsResult } = result;
  switch (status) {
    case "succeeded": {
      state.status = "succeeded";
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
      state.error = new Error(errStr);
      state.status = "failed";
      logger.warning(errStr);
      break;
    }
    case "canceled": {
      state.status = "canceled";
      break;
    }
  }
  if (
    isDone?.(response, state) ||
    (isDone === undefined &&
      ["succeeded", "canceled"].concat(setErrorAsResult ? [] : ["failed"]).includes(status))
  ) {
    state.result = await buildResult({
      response,
      state,
      processResult,
    });
  }
}

async function buildResult<TResponse, TResult, TState>(inputs: {
  response: TResponse;
  state: TState;
  processResult?: (result: TResponse, state: TState) => Promise<TResult>;
}): Promise<TResult> {
  const { processResult, response, state } = inputs;
  return processResult ? processResult(response, state) : (response as unknown as TResult);
}

/**
 * Initiates the long-running operation.
 */
export async function initOperation<
  TResponse,
  TResult,
  TState extends OperationState<TResult>,
>(inputs: {
  init: Operation<TResponse, unknown>["init"];
  getOperationStatus: (inputs: {
    response: TResponse;
    state: RestorableOperationState<TResult, TState>;
    operationLocation?: string;
  }) => OperationStatus;
  processResult?: (result: TResponse, state: TState) => Promise<TResult>;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
  setErrorAsResult: boolean;
}): Promise<RestorableOperationState<TResult, TState>> {
  const { init, processResult, getOperationStatus, withOperationLocation, setErrorAsResult } =
    inputs;
  const {
    operationLocation,
    resourceLocation,
    initialRequestUrl,
    requestMethod,
    metadata,
    response,
  } = await init();
  if (operationLocation) withOperationLocation?.(operationLocation, false);
  const config = {
    metadata,
    operationLocation,
    resourceLocation,
    initialRequestUrl,
    requestMethod,
  };
  logger.verbose(`LRO: Operation description:`, config);
  const state = { status: "running", config } as any;
  const status = getOperationStatus({ response, state, operationLocation });
  await processOperationStatus({
    state,
    status,
    response,
    setErrorAsResult,
    processResult,
  });
  return state;
}

async function pollOperationHelper<
  TResponse,
  TState extends OperationState<TResult>,
  TResult,
  TOptions,
>(inputs: {
  poll: Operation<TResponse, TOptions>["poll"];
  state: RestorableOperationState<TResult, TState>;
  operationLocation: string;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TResult, TState>,
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TResult, TState>,
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
    operationLocation,
    getOperationStatus,
    getResourceLocation,
    isOperationError,
    options,
  } = inputs;
  const response = await poll(operationLocation, options).catch(
    setStateError({
      state,
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
        response: await poll(resourceLocation).catch(setStateError({ state, isOperationError })),
        status,
      };
    }
  }
  return { response, status };
}

/** Polls the long-running operation. */
export async function pollOperation<
  TResponse,
  TResult,
  TState extends OperationState<TResult>,
  TOptions,
>(inputs: {
  poll: Operation<TResponse, TOptions>["poll"];
  state: RestorableOperationState<TResult, TState>;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TResult, TState>,
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TResult, TState>,
  ) => string | undefined;
  isOperationError: (error: Error) => boolean;
  getPollingInterval?: (response: TResponse) => number | undefined;
  setDelay: (intervalInMs: number) => void;
  getOperationLocation?: (
    response: TResponse,
    state: RestorableOperationState<TResult, TState>,
  ) => string | undefined;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
  processResult?: (result: TResponse, state: TState) => Promise<TResult>;
  getError?: (response: TResponse) => LroError | undefined;
  updateState?: (state: TState, lastResponse: TResponse) => void;
  isDone?: (lastResponse: TResponse, state: TState) => boolean;
  setErrorAsResult: boolean;
  options?: TOptions;
}): Promise<void> {
  const {
    poll,
    state,
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
      operationLocation,
      getResourceLocation,
      isOperationError,
      options,
    });
    await processOperationStatus({
      status,
      response,
      state,
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
