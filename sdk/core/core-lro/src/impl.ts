// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  LongRunningOperation,
  LroResourceLocationConfig,
  LroResponse,
  OperationConfig,
  OperationStatus,
  RawResponse,
  ResponseBody,
  RestorableOperationState,
  StateProxy,
} from "./models";
import { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "./logger";

export const POLL_INTERVAL_IN_MS = 2000;

export function deserializeState<TState>(
  serializedState: string
): RestorableOperationState<TState> {
  try {
    return JSON.parse(serializedState).state;
  } catch (e) {
    throw new Error(`Unable to deserialize input state: ${serializedState}`);
  }
}

function updatePollingUrlHelper(inputs: {
  pollingUrl?: string;
  config: OperationConfig;
  withPollingUrl?: (pollingUrl: string) => void;
}): void {
  const { pollingUrl, config, withPollingUrl } = inputs;
  if (pollingUrl !== undefined && pollingUrl !== config.pollingUrl) {
    config.pollingUrl = pollingUrl;
    withPollingUrl?.(pollingUrl);
  }
}

function updatePollingUrl(inputs: {
  rawResponse: RawResponse;
  config: OperationConfig;
  withPollingUrl?: (pollingUrl: string) => void;
}): void {
  const { config, rawResponse, withPollingUrl } = inputs;
  switch (config.mode) {
    case "OperationLocation": {
      updatePollingUrlHelper({
        pollingUrl: getOperationLocationPollingUrl({
          operationLocation: getOperationLocation(rawResponse),
          azureAsyncOperation: getAzureAsyncOperation(rawResponse),
        }),
        config,
        withPollingUrl,
      });
      break;
    }
    case "ResourceLocation": {
      updatePollingUrlHelper({ pollingUrl: getLocation(rawResponse), config, withPollingUrl });
      break;
    }
  }
}

function getOperationLocationPollingUrl(inputs: {
  operationLocation?: string;
  azureAsyncOperation?: string;
}): string | undefined {
  const { azureAsyncOperation, operationLocation } = inputs;
  return operationLocation ?? azureAsyncOperation;
}

function getLocation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["location"];
}

function getOperationLocation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["operation-location"];
}

function getAzureAsyncOperation(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["azure-asyncoperation"];
}

function findResourceLocation(inputs: {
  requestMethod?: string;
  location?: string;
  requestPath?: string;
  resourceLocationConfig?: LroResourceLocationConfig;
}): string | undefined {
  const { location, requestMethod, requestPath, resourceLocationConfig } = inputs;
  switch (requestMethod) {
    case "PUT": {
      return requestPath;
    }
    case "DELETE": {
      return undefined;
    }
    default: {
      switch (resourceLocationConfig) {
        case "azure-async-operation": {
          return undefined;
        }
        case "original-uri": {
          return requestPath;
        }
        case "location":
        default: {
          return location;
        }
      }
    }
  }
}

function inferLroMode(inputs: {
  rawResponse: RawResponse;
  requestPath?: string;
  requestMethod?: string;
  resourceLocationConfig?: LroResourceLocationConfig;
}): OperationConfig | undefined {
  const { rawResponse, requestMethod, requestPath, resourceLocationConfig } = inputs;
  const operationLocation = getOperationLocation(rawResponse);
  const azureAsyncOperation = getAzureAsyncOperation(rawResponse);
  const pollingUrl = getOperationLocationPollingUrl({ operationLocation, azureAsyncOperation });
  const location = getLocation(rawResponse);
  if (pollingUrl !== undefined) {
    return {
      mode: "OperationLocation",
      pollingUrl,
      resourceLocation: findResourceLocation({
        requestMethod,
        location,
        requestPath,
        resourceLocationConfig,
      }),
    };
  } else if (location !== undefined) {
    return {
      mode: "ResourceLocation",
      pollingUrl: location,
    };
  } else if (requestMethod === "PUT" && requestPath) {
    return {
      mode: "Body",
      pollingUrl: requestPath,
    };
  } else {
    return undefined;
  }
}

function setStateError<TState, TResult>(inputs: {
  state: TState;
  stateProxy: StateProxy<TState, TResult>;
}): (e: Error) => Promise<LroResponse<unknown>> {
  const { state, stateProxy } = inputs;
  return (error) => {
    stateProxy.setError(state, error);
    stateProxy.setFailed(state);
    throw error;
  };
}

function getStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as ResponseBody) ?? {};
  return typeof status === "string" ? status.toLowerCase() : "succeeded";
}

function getProvisioningState(rawResponse: RawResponse): string {
  const { properties, provisioningState } = (rawResponse.body as ResponseBody) ?? {};
  const state = properties?.provisioningState ?? provisioningState;
  return typeof state === "string" ? state.toLowerCase() : "succeeded";
}

function toOperationStatus(statusCode: number): string {
  if (statusCode === 202) {
    return "running";
  } else if (statusCode < 300) {
    return "succeeded";
  } else {
    return "failed";
  }
}

function isTerminal<TState, TResult>(operation: {
  state: TState;
  stateProxy: StateProxy<TState, TResult>;
  operationStatus: string;
}): boolean {
  const { state, stateProxy, operationStatus } = operation;
  switch (operationStatus) {
    case "succeeded": {
      stateProxy.setSucceeded(state);
      return true;
    }
    case "failed": {
      stateProxy.setError(state, new Error(`The long-running operation has failed`));
      stateProxy.setFailed(state);
      return true;
    }
    case "canceled":
    case "cancelled": {
      stateProxy.setCanceled(state);
      return true;
    }
    case "canceling":
    case "cancelling": {
      stateProxy.setCanceling(state);
      return false;
    }
    default:
      return false;
  }
}

function getOperationStatusHelper<TState, TResult>(result: {
  rawResponse: RawResponse;
  state: TState;
  stateProxy: StateProxy<TState, TResult>;
  config: OperationConfig;
  responseKind?: "Initial" | "Polling";
}): {
  operationStatus: string | number;
  shouldStopPolling: boolean;
} {
  const { rawResponse, state, stateProxy, config, responseKind = "Polling" } = result;
  switch (config.mode) {
    case "OperationLocation": {
      const operationStatus = getStatus(rawResponse);
      return {
        operationStatus,
        shouldStopPolling:
          responseKind === "Polling" && isTerminal({ state, stateProxy, operationStatus }),
      };
    }
    case "Body": {
      const operationStatus = getProvisioningState(rawResponse);
      return {
        operationStatus,
        shouldStopPolling: isTerminal({ state, stateProxy, operationStatus }),
      };
    }
    case "ResourceLocation": {
      const operationStatus = toOperationStatus(rawResponse.statusCode);
      return {
        operationStatus,
        shouldStopPolling:
          responseKind === "Polling" && isTerminal({ state, stateProxy, operationStatus }),
      };
    }
  }
}

function shouldStopPolling<TState, TResult>(result: {
  rawResponse: RawResponse;
  state: TState;
  stateProxy: StateProxy<TState, TResult>;
  config?: OperationConfig;
  responseKind?: "Initial" | "Polling";
}): boolean {
  const { rawResponse, state, stateProxy, config, responseKind = "Polling" } = result;
  if (!config) {
    logger.verbose(`LRO: Status: Not an LRO`);
    stateProxy.setSucceeded(state);
    return true;
  }
  const { shouldStopPolling: isPollingStopped, operationStatus } = getOperationStatusHelper({
    config,
    rawResponse,
    state,
    stateProxy,
    responseKind,
  });
  logger.verbose(
    `LRO: Status:\n\tPolling from: ${
      config.pollingUrl
    }\n\tOperation status: ${operationStatus}\n\tPolling status: ${
      isPollingStopped ? "Stopped" : "Running"
    }`
  );
  return isPollingStopped;
}

function parseRetryAfter(rawResponse: RawResponse): number | undefined {
  const retryAfter: string | undefined = rawResponse.headers["retry-after"];
  if (retryAfter !== undefined) {
    // Retry-After header value is either in HTTP date format, or in seconds
    const retryAfterInSeconds = parseInt(retryAfter);
    return isNaN(retryAfterInSeconds)
      ? calculatePollingIntervalFromDate(new Date(retryAfter))
      : retryAfterInSeconds * 1000;
  }
  return undefined;
}

function calculatePollingIntervalFromDate(retryAfterDate: Date): number | undefined {
  const timeNow = Math.floor(new Date().getTime());
  const retryAfterTime = retryAfterDate.getTime();
  if (timeNow < retryAfterTime) {
    return retryAfterTime - timeNow;
  }
  return undefined;
}

function buildResult<TResult, TState>(inputs: {
  flatResponse: unknown;
  state: TState;
  processResult?: (result: unknown, state: TState) => TResult;
}): TResult {
  const { processResult, flatResponse, state } = inputs;
  return processResult ? processResult(flatResponse, state) : (flatResponse as TResult);
}

/**
 * Initiates the long-running operation.
 */
export async function initOperation<TResult, TState>(inputs: {
  stateProxy: StateProxy<TState, TResult>;
  requestPath?: string;
  requestMethod?: string;
  resourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => TResult;
  withPollingUrl?: (pollingUrl: string) => void;
  lro: LongRunningOperation;
}): Promise<RestorableOperationState<TState>> {
  const {
    requestMethod,
    requestPath,
    stateProxy,
    resourceLocationConfig,
    processResult,
    withPollingUrl,
    lro,
  } = inputs;
  const { rawResponse, flatResponse } = await lro.sendInitialRequest();
  const config = inferLroMode({
    rawResponse,
    requestPath,
    requestMethod,
    resourceLocationConfig,
  });
  if (config) withPollingUrl?.(config.pollingUrl);
  const state = stateProxy.initState(config);
  logger.verbose(`LRO: Operation description:`, config);
  if (
    shouldStopPolling({
      rawResponse,
      state,
      stateProxy,
      config,
      responseKind: "Initial",
    })
  ) {
    stateProxy.setResult(
      state,
      buildResult({
        flatResponse,
        state,
        processResult,
      })
    );
  }
  return state;
}

async function getOperationStatus<TState, TResult>(inputs: {
  lro: LongRunningOperation;
  stateProxy: StateProxy<TState, TResult>;
  state: RestorableOperationState<TState>;
  isDone?: (lastResponse: TResult, state: TState) => boolean;
  options?: { abortSignal?: AbortSignalLike };
}): Promise<OperationStatus<unknown>> {
  const { isDone, lro, state, stateProxy, options } = inputs;
  const config = state.config;
  const response = await lro.sendPollRequest(config.pollingUrl, options).catch(
    setStateError({
      state,
      stateProxy,
    })
  );
  const isTerminalStatus = isDone
    ? isDone(response.flatResponse as TResult, state)
    : shouldStopPolling({
        config,
        rawResponse: response.rawResponse,
        state,
        stateProxy,
      });
  const location = config?.resourceLocation;
  if (stateProxy.isSucceeded(state) && location) {
    return {
      ...(await lro.sendPollRequest(location).catch(setStateError({ state, stateProxy }))),
      done: true,
    };
  }
  return {
    ...response,
    done: isTerminalStatus,
  };
}

/** Polls the long-running operation. */
export async function pollOperation<TState, TResult>(inputs: {
  lro: LongRunningOperation;
  stateProxy: StateProxy<TState, TResult>;
  state: RestorableOperationState<TState>;
  isDone?: (lastResponse: TResult, state: TState) => boolean;
  processResult?: (result: unknown, state: TState) => TResult;
  withPollingUrl?: (pollingUrl: string) => void;
  updateState?: (state: TState, lastResponse: RawResponse) => void;
  setDelay: (intervalInMs: number) => void;
  options?: { abortSignal?: AbortSignalLike };
}): Promise<void> {
  const {
    lro,
    state,
    stateProxy,
    isDone,
    options,
    processResult,
    withPollingUrl,
    updateState,
    setDelay,
  } = inputs;
  const { flatResponse, done, rawResponse } = await getOperationStatus({
    lro,
    state,
    stateProxy,
    isDone,
    options,
  });
  if (done) {
    stateProxy.setResult(
      state,
      buildResult({
        flatResponse,
        state,
        processResult,
      })
    );
  } else {
    const intervalInMs = parseRetryAfter(rawResponse);
    if (intervalInMs) setDelay(intervalInMs);
    updatePollingUrl({
      rawResponse,
      config: state.config,
      withPollingUrl,
    });
  }
  updateState?.(state, rawResponse);
}
