// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpOperationMode,
  LongRunningOperation,
  LroResourceLocationConfig,
  LroResponse,
  RawResponse,
  ResponseBody,
} from "./models";
import {
  OperationConfig,
  OperationStatus,
  RestorableOperationState,
  StateProxy,
} from "../poller/models";
import { initOperation, pollOperation } from "../poller/operation";
import { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "../logger";

function getOperationLocationPollingUrl(inputs: {
  operationLocation?: string;
  azureAsyncOperation?: string;
}): string | undefined {
  const { azureAsyncOperation, operationLocation } = inputs;
  return operationLocation ?? azureAsyncOperation;
}

function getLocationHeader(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["location"];
}

function getOperationLocationHeader(rawResponse: RawResponse): string | undefined {
  return rawResponse.headers["operation-location"];
}

function getAzureAsyncOperationHeader(rawResponse: RawResponse): string | undefined {
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

export function inferLroMode(inputs: {
  rawResponse: RawResponse;
  requestPath?: string;
  requestMethod?: string;
  resourceLocationConfig?: LroResourceLocationConfig;
}): (OperationConfig & { mode: HttpOperationMode }) | undefined {
  const { rawResponse, requestMethod, requestPath, resourceLocationConfig } = inputs;
  const operationLocation = getOperationLocationHeader(rawResponse);
  const azureAsyncOperation = getAzureAsyncOperationHeader(rawResponse);
  const pollingUrl = getOperationLocationPollingUrl({ operationLocation, azureAsyncOperation });
  const location = getLocationHeader(rawResponse);
  if (pollingUrl !== undefined) {
    return {
      mode: "OperationLocation",
      operationLocation: pollingUrl,
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
      operationLocation: location,
    };
  } else if (requestMethod === "PUT" && requestPath) {
    return {
      mode: "Body",
      operationLocation: requestPath,
    };
  } else {
    return undefined;
  }
}

function transformStatus(status: string | undefined): OperationStatus {
  switch (status?.toLowerCase()) {
    case undefined:
    case "succeeded":
      return "succeeded";
    case "failed":
      return "failed";
    case "running":
    case "accepted":
    case "canceling":
    case "cancelling":
      return "running";
    case "canceled":
    case "cancelled":
      return "canceled";
    default: {
      logger.warning(`LRO: unrecognized operation status: ${status}`);
      return status as OperationStatus;
    }
  }
}

function getStatus(rawResponse: RawResponse): OperationStatus {
  const { status } = (rawResponse.body as ResponseBody) ?? {};
  return transformStatus(status);
}

function getProvisioningState(rawResponse: RawResponse): OperationStatus {
  const { properties, provisioningState } = (rawResponse.body as ResponseBody) ?? {};
  const state = properties?.provisioningState ?? provisioningState;
  return transformStatus(state);
}

function toOperationStatus(statusCode: number): OperationStatus {
  if (statusCode === 202) {
    return "running";
  } else if (statusCode < 300) {
    return "succeeded";
  } else {
    return "failed";
  }
}

export function parseRetryAfter<T>({ rawResponse }: LroResponse<T>): number | undefined {
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

/**
 * Initiates the long-running operation.
 */
export async function initHttpOperation<TResult, TState>(inputs: {
  stateProxy: StateProxy<TState, TResult>;
  resourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => TResult;
  lro: LongRunningOperation;
}): Promise<RestorableOperationState<TState>> {
  const { stateProxy, resourceLocationConfig, processResult, lro } = inputs;
  return initOperation({
    init: async () => {
      const response = await lro.sendInitialRequest();
      const config = inferLroMode({
        rawResponse: response.rawResponse,
        requestPath: lro.requestPath,
        requestMethod: lro.requestMethod,
        resourceLocationConfig,
      });
      return {
        response,
        operationLocation: config?.operationLocation,
        resourceLocation: config?.resourceLocation,
        ...(config?.mode ? { metadata: { mode: config.mode } } : {}),
      };
    },
    stateProxy,
    processResult: processResult
      ? ({ flatResponse }, state) => processResult(flatResponse, state)
      : ({ flatResponse }) => flatResponse as TResult,
    getOperationStatus: (response, state) => {
      const mode = state.config.metadata?.["mode"];
      return mode === undefined ||
        (mode === "Body" && getOperationStatus(response, state) === "succeeded")
        ? "succeeded"
        : "running";
    },
  });
}

export function getOperationLocation<TState>(
  { rawResponse }: LroResponse,
  state: RestorableOperationState<TState>
): string | undefined {
  const mode = state.config.metadata?.["mode"];
  switch (mode) {
    case "OperationLocation": {
      return getOperationLocationPollingUrl({
        operationLocation: getOperationLocationHeader(rawResponse),
        azureAsyncOperation: getAzureAsyncOperationHeader(rawResponse),
      });
    }
    case "ResourceLocation": {
      return getLocationHeader(rawResponse);
    }
    case "Body":
    default: {
      return undefined;
    }
  }
}

export function getOperationStatus<TState>(
  { rawResponse }: LroResponse,
  state: RestorableOperationState<TState>
): OperationStatus {
  const mode = state.config.metadata?.["mode"];
  switch (mode) {
    case "OperationLocation": {
      return getStatus(rawResponse);
    }
    case "ResourceLocation": {
      return toOperationStatus(rawResponse.statusCode);
    }
    case "Body": {
      return getProvisioningState(rawResponse);
    }
    default:
      throw new Error(`Unexpected operation mode: ${mode}`);
  }
}

/** Polls the long-running operation. */
export async function pollHttpOperation<TState, TResult>(inputs: {
  lro: LongRunningOperation;
  stateProxy: StateProxy<TState, TResult>;
  processResult?: (result: unknown, state: TState) => TResult;
  updateState?: (state: TState, lastResponse: LroResponse) => void;
  isDone?: (lastResponse: LroResponse, state: TState) => boolean;
  setDelay: (intervalInMs: number) => void;
  options?: { abortSignal?: AbortSignalLike };
  state: RestorableOperationState<TState>;
}): Promise<void> {
  const { lro, stateProxy, options, processResult, updateState, setDelay, state } = inputs;
  return pollOperation({
    state,
    stateProxy,
    setDelay,
    processResult: processResult
      ? ({ flatResponse }, inputState) => processResult(flatResponse, inputState)
      : ({ flatResponse }) => flatResponse as TResult,
    updateState,
    getPollingInterval: parseRetryAfter,
    getOperationLocation,
    getOperationStatus,
    options,
    poll: lro.sendPollRequest,
  });
}
