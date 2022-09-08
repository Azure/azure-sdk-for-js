// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Operation, OperationStatus, RestorableOperationState, StateProxy } from "./models";
import { logger } from "../logger";
import { terminalStates } from "./constants";

/**
 * Deserializes the state
 */
export function deserializeState<TState>(
  serializedState: string
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
}): (error: Error) => never {
  const { state, stateProxy } = inputs;
  return (error: Error) => {
    stateProxy.setError(state, error);
    stateProxy.setFailed(state);
    throw error;
  };
}

function processOperationStatus<TState, TResult>(result: {
  status: OperationStatus;
  state: RestorableOperationState<TState>;
  stateProxy: StateProxy<TState, TResult>;
}): void {
  const { state, stateProxy, status } = result;
  logger.verbose(
    `LRO: Status:\n\tPolling from: ${
      state.config.operationLocation
    }\n\tOperation status: ${status}\n\tPolling status: ${
      terminalStates.includes(status) ? "Stopped" : "Running"
    }`
  );
  switch (status) {
    case "succeeded": {
      stateProxy.setSucceeded(state);
      break;
    }
    case "failed": {
      stateProxy.setError(state, new Error(`The long-running operation has failed`));
      stateProxy.setFailed(state);
      break;
    }
    case "canceled": {
      stateProxy.setCanceled(state);
      break;
    }
  }
}

function buildResult<TResponse, TResult, TState>(inputs: {
  response: TResponse;
  state: TState;
  processResult?: (result: TResponse, state: TState) => TResult;
}): TResult {
  const { processResult, response, state } = inputs;
  return processResult ? processResult(response, state) : (response as unknown as TResult);
}

/**
 * Initiates the long-running operation.
 */
export async function initOperation<TResponse, TResult, TState>(inputs: {
  init: Operation<TResponse, unknown>["init"];
  stateProxy: StateProxy<TState, TResult>;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TState>
  ) => OperationStatus;
  processResult?: (result: TResponse, state: TState) => TResult;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
}): Promise<RestorableOperationState<TState>> {
  const { init, stateProxy, processResult, getOperationStatus, withOperationLocation } = inputs;
  const { operationLocation, resourceLocation, metadata, response } = await init();
  if (operationLocation) withOperationLocation?.(operationLocation, false);
  const config = {
    metadata,
    operationLocation,
    resourceLocation,
  };
  logger.verbose(`LRO: Operation description:`, config);
  const state = stateProxy.initState(config);
  const status = getOperationStatus(response, state);
  if (status === "succeeded" || operationLocation === undefined) {
    stateProxy.setSucceeded(state);
    stateProxy.setResult(
      state,
      buildResult({
        response,
        state,
        processResult,
      })
    );
  }
  return state;
}

async function pollOperationHelper<TResponse, TState, TResult, TOptions>(inputs: {
  poll: Operation<TResponse, TOptions>["poll"];
  stateProxy: StateProxy<TState, TResult>;
  state: RestorableOperationState<TState>;
  operationLocation: string;
  getOperationStatus: (
    response: TResponse,
    state: RestorableOperationState<TState>
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TState>
  ) => string | undefined;
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
    options,
  } = inputs;
  const response = await poll(operationLocation, options).catch(
    setStateError({
      state,
      stateProxy,
    })
  );
  const status = getOperationStatus(response, state);
  processOperationStatus({
    status,
    state,
    stateProxy,
  });
  const resourceLocation = getResourceLocation(response, state);
  if (status === "succeeded" && resourceLocation !== undefined) {
    return {
      response: await poll(resourceLocation).catch(setStateError({ state, stateProxy })),
      status,
    };
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
    state: RestorableOperationState<TState>
  ) => OperationStatus;
  getResourceLocation: (
    response: TResponse,
    state: RestorableOperationState<TState>
  ) => string | undefined;
  getPollingInterval?: (response: TResponse) => number | undefined;
  setDelay: (intervalInMs: number) => void;
  getOperationLocation?: (
    response: TResponse,
    state: RestorableOperationState<TState>
  ) => string | undefined;
  withOperationLocation?: (operationLocation: string, isUpdated: boolean) => void;
  processResult?: (result: TResponse, state: TState) => TResult;
  updateState?: (state: TState, lastResponse: TResponse) => void;
  isDone?: (lastResponse: TResponse, state: TState) => boolean;
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
    withOperationLocation,
    getPollingInterval,
    processResult,
    updateState,
    setDelay,
    isDone,
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
      options,
    });
    if (
      isDone?.(response, state) ||
      (isDone === undefined && ["succeeded", "canceled"].includes(status))
    ) {
      stateProxy.setResult(
        state,
        buildResult({
          response,
          state,
          processResult,
        })
      );
    } else {
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
