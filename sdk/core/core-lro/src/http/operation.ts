// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpOperationMode,
  LongRunningOperation,
  ResourceLocationConfig,
  OperationResponse,
  RawResponse,
  ResponseBody,
} from "./models.js";
import {
  LroError,
  OperationConfig,
  OperationStatus,
  RestorableOperationState,
  StateProxy,
} from "../poller/models.js";
import { pollOperation } from "../poller/operation.js";
import { AbortSignalLike } from "@azure/abort-controller";
import { logger } from "../logger.js";

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
  resourceLocationConfig?: ResourceLocationConfig;
}): string | undefined {
  const { location, requestMethod, requestPath, resourceLocationConfig } = inputs;
  switch (requestMethod) {
    case "PUT": {
      return requestPath;
    }
    case "DELETE": {
      return undefined;
    }
    case "PATCH": {
      return getDefault() ?? requestPath;
    }
    default: {
      return getDefault();
    }
  }

  function getDefault() {
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

export function inferLroMode(
  rawResponse: RawResponse,
  resourceLocationConfig?: ResourceLocationConfig,
): (OperationConfig & { mode: HttpOperationMode }) | undefined {
  const requestPath = rawResponse.request.url;
  const requestMethod = rawResponse.request.method;
  const operationLocation = getOperationLocationHeader(rawResponse);
  const azureAsyncOperation = getAzureAsyncOperationHeader(rawResponse);
  const pollingUrl = getOperationLocationPollingUrl({ operationLocation, azureAsyncOperation });
  const location = getLocationHeader(rawResponse);
  const normalizedRequestMethod = requestMethod?.toLocaleUpperCase();
  if (pollingUrl !== undefined) {
    return {
      mode: "OperationLocation",
      operationLocation: pollingUrl,
      resourceLocation: findResourceLocation({
        requestMethod: normalizedRequestMethod,
        location,
        requestPath,
        resourceLocationConfig,
      }),
      initialUrl: requestPath,
      requestMethod,
    };
  } else if (location !== undefined) {
    return {
      mode: "ResourceLocation",
      operationLocation: location,
      initialUrl: requestPath,
      requestMethod,
    };
  } else if (normalizedRequestMethod === "PUT" && requestPath) {
    return {
      mode: "Body",
      operationLocation: requestPath,
      initialUrl: requestPath,
      requestMethod,
    };
  } else {
    return undefined;
  }
}

function transformStatus(inputs: { status: unknown; statusCode: number }): OperationStatus {
  const { status, statusCode } = inputs;
  if (typeof status !== "string" && status !== undefined) {
    throw new Error(
      `Polling was unsuccessful. Expected status to have a string value or no value but it has instead: ${status}. This doesn't necessarily indicate the operation has failed. Check your Azure subscription or resource status for more information.`,
    );
  }
  switch (status?.toLocaleLowerCase()) {
    case undefined:
      return toOperationStatus(statusCode);
    case "succeeded":
      return "succeeded";
    case "failed":
      return "failed";
    case "running":
    case "accepted":
    case "started":
    case "canceling":
    case "cancelling":
      return "running";
    case "canceled":
    case "cancelled":
      return "canceled";
    default: {
      logger.verbose(`LRO: unrecognized operation status: ${status}`);
      return status as OperationStatus;
    }
  }
}

function getStatus(rawResponse: RawResponse): OperationStatus {
  const { status } = (rawResponse.body as ResponseBody) ?? {};
  return transformStatus({ status, statusCode: rawResponse.statusCode });
}

function getProvisioningState(rawResponse: RawResponse): OperationStatus {
  const { properties, provisioningState } = (rawResponse.body as ResponseBody) ?? {};
  const status = properties?.provisioningState ?? provisioningState;
  return transformStatus({ status, statusCode: rawResponse.statusCode });
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

export function parseRetryAfter<T>({ rawResponse }: OperationResponse<T>): number | undefined {
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

export function getErrorFromResponse<T>(response: OperationResponse<T>): LroError | undefined {
  const error = accessBodyProperty(response, "error");
  if (!error) {
    logger.warning(
      `The long-running operation failed but there is no error property in the response's body`,
    );
    return;
  }
  if (!error.code || !error.message) {
    logger.warning(
      `The long-running operation failed but the error property in the response's body doesn't contain code or message`,
    );
    return;
  }
  return error as LroError;
}

function calculatePollingIntervalFromDate(retryAfterDate: Date): number | undefined {
  const timeNow = Math.floor(new Date().getTime());
  const retryAfterTime = retryAfterDate.getTime();
  if (timeNow < retryAfterTime) {
    return retryAfterTime - timeNow;
  }
  return undefined;
}

export function getStatusFromInitialResponse<TState>(inputs: {
  response: OperationResponse<unknown>;
  state: RestorableOperationState<TState>;
  operationLocation?: string;
}): OperationStatus {
  const { response, state, operationLocation } = inputs;
  function helper(): OperationStatus {
    const mode = state.config.metadata?.["mode"];
    switch (mode) {
      case undefined:
        return toOperationStatus(response.rawResponse.statusCode);
      case "Body":
        return getOperationStatus(response, state);
      default:
        return "running";
    }
  }
  const status = helper();
  return status === "running" && operationLocation === undefined ? "succeeded" : status;
}

export function getOperationLocation<TState>(
  { rawResponse }: OperationResponse,
  state: RestorableOperationState<TState>,
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
  { rawResponse }: OperationResponse,
  state: RestorableOperationState<TState>,
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
      throw new Error(`Internal error: Unexpected operation mode: ${mode}`);
  }
}

function accessBodyProperty<P extends string>(
  { flatResponse, rawResponse }: OperationResponse,
  prop: P,
): ResponseBody[P] {
  return (flatResponse as ResponseBody)?.[prop] ?? (rawResponse.body as ResponseBody)?.[prop];
}

export function getResourceLocation<TState>(
  res: OperationResponse,
  state: RestorableOperationState<TState>,
): string | undefined {
  const loc = accessBodyProperty(res, "resourceLocation");
  if (loc && typeof loc === "string") {
    state.config.resourceLocation = loc;
  }
  return state.config.resourceLocation;
}

export function isOperationError(e: Error): boolean {
  return e.name === "RestError";
}

/** Polls the long-running operation. */
export async function pollHttpOperation<TState, TResult>(inputs: {
  lro: LongRunningOperation;
  stateProxy: StateProxy<TState, TResult>;
  processResult?: (result: unknown, state: TState) => TResult;
  updateState?: (state: TState, lastResponse: OperationResponse) => void;
  isDone?: (lastResponse: OperationResponse, state: TState) => boolean;
  setDelay: (intervalInMs: number) => void;
  options?: { abortSignal?: AbortSignalLike };
  state: RestorableOperationState<TState>;
  setErrorAsResult: boolean;
}): Promise<void> {
  const {
    lro,
    stateProxy,
    options,
    processResult,
    updateState,
    setDelay,
    state,
    setErrorAsResult,
  } = inputs;
  return pollOperation({
    state,
    stateProxy,
    setDelay,
    processResult: processResult
      ? ({ flatResponse }, inputState) => processResult(flatResponse, inputState)
      : ({ flatResponse }) => flatResponse as TResult,
    getError: getErrorFromResponse,
    updateState,
    getPollingInterval: parseRetryAfter,
    getOperationLocation,
    getOperationStatus,
    isOperationError,
    getResourceLocation,
    options,
    /**
     * The expansion here is intentional because `lro` could be an object that
     * references an inner this, so we need to preserve a reference to it.
     */
    poll: async (location: string, inputOptions?: { abortSignal?: AbortSignalLike }) =>
      lro.sendPollRequest(location, inputOptions),
    setErrorAsResult,
  });
}
