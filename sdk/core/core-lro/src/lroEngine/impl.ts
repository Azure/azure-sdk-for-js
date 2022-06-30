// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLroStatusFromResponse,
  LongRunningOperation,
  LroBody,
  LroInfo,
  LroResourceLocationConfig,
  LroResponse,
  LroStatus,
  PollerConfig,
  RawResponse,
  ResumablePollOperationState,
} from "./models";
import { PollOperationState } from "../pollOperation";
import { logger } from "./logger";

export function throwIfUndefined<T>(
  input: T | undefined,
  options: { errorMessage?: string } = {}
): T {
  if (input === undefined) {
    throw new Error(options.errorMessage ?? "undefined variable");
  }
  return input;
}

export function updatePollingUrl(inputs: { rawResponse: RawResponse; info: LroInfo }): void {
  const { info, rawResponse } = inputs;
  switch (info.mode) {
    case "OperationLocation": {
      const operationLocation = getOperationLocation(rawResponse);
      const azureAsyncOperation = getAzureAsyncOperation(rawResponse);
      info.pollingUrl =
        getOperationLocationPollingUrl({ operationLocation, azureAsyncOperation }) ??
        throwIfUndefined(info.pollingUrl);
      break;
    }
    case "ResourceLocation": {
      info.pollingUrl = getLocation(rawResponse) ?? throwIfUndefined(info.pollingUrl);
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
  requestMethod: string;
  location?: string;
  requestPath: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
}): string | undefined {
  const { location, requestMethod, requestPath, lroResourceLocationConfig } = inputs;
  switch (requestMethod) {
    case "PUT": {
      return requestPath;
    }
    case "DELETE": {
      return undefined;
    }
    default: {
      switch (lroResourceLocationConfig) {
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
  requestPath: string;
  requestMethod: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
}): LroInfo {
  const { rawResponse, requestMethod, requestPath, lroResourceLocationConfig } = inputs;
  const operationLocation = getOperationLocation(rawResponse);
  const azureAsyncOperation = getAzureAsyncOperation(rawResponse);
  const location = getLocation(rawResponse);
  if (operationLocation !== undefined || azureAsyncOperation !== undefined) {
    return {
      mode: "OperationLocation",
      pollingUrl: operationLocation ?? azureAsyncOperation,
      resourceLocation: findResourceLocation({
        requestMethod,
        location,
        requestPath,
        lroResourceLocationConfig,
      }),
    };
  } else if (location !== undefined) {
    return {
      mode: "ResourceLocation",
      pollingUrl: location,
    };
  } else if (requestMethod === "PUT") {
    return {
      mode: "Body",
      pollingUrl: requestPath,
    };
  } else {
    return {
      mode: "None",
    };
  }
}

class SimpleRestError extends Error {
  public statusCode?: number;
  constructor(message: string, statusCode: number) {
    super(message);
    this.name = "RestError";
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, SimpleRestError.prototype);
  }
}

function throwIfError(rawResponse: RawResponse): void {
  const code = rawResponse.statusCode;
  if (code >= 400) {
    throw new SimpleRestError(
      `Received unexpected HTTP status code ${code} while polling. This may indicate a server issue.`,
      code
    );
  }
}

function getStatus(rawResponse: RawResponse): string {
  const { status } = (rawResponse.body as LroBody) ?? {};
  return typeof status === "string" ? status.toLowerCase() : "succeeded";
}

function getProvisioningState(rawResponse: RawResponse): string {
  const { properties, provisioningState } = (rawResponse.body as LroBody) ?? {};
  const state = properties?.provisioningState ?? provisioningState;
  return typeof state === "string" ? state.toLowerCase() : "succeeded";
}

function isCanceled<TResult, TState extends PollOperationState<TResult>>(operation: {
  state: TState;
  status: string;
}): boolean {
  const { state, status } = operation;
  if (["canceled", "cancelled"].includes(status)) {
    state.isCancelled = true;
    return true;
  }
  return false;
}

function isTerminal<TResult, TState extends PollOperationState<TResult>>(operation: {
  state: TState;
  status: string;
}): boolean {
  const { state, status } = operation;
  if (status === "failed") {
    throw new Error(`The long-running operation has failed.`);
  }
  return status === "succeeded" || isCanceled({ state, status });
}

function isDone<TResult, TState extends PollOperationState<TResult>>(result: {
  rawResponse: RawResponse;
  state: TState;
  info: LroInfo;
  responseKind?: "Initial" | "Polling";
}): boolean {
  const { rawResponse, state, info, responseKind = "Polling" } = result;
  throwIfError(rawResponse);
  switch (info.mode) {
    case "OperationLocation": {
      return responseKind === "Polling" && isTerminal({ state, status: getStatus(rawResponse) });
    }
    case "Body": {
      return isTerminal({ state, status: getProvisioningState(rawResponse) });
    }
    case "ResourceLocation": {
      return responseKind === "Polling" && rawResponse.statusCode !== 202;
    }
    case "None": {
      return true;
    }
  }
}

/**
 * Creates a polling operation.
 */
export function createPoll<TResult>(
  lroPrimitives: LongRunningOperation<TResult>
): (
  pollingURL: string,
  pollerConfig: PollerConfig,
  getLroStatusFromResponse: GetLroStatusFromResponse<TResult>
) => Promise<LroStatus<TResult>> {
  return async (
    path: string,
    pollerConfig: PollerConfig,
    getLroStatusFromResponse: GetLroStatusFromResponse<TResult>
  ): Promise<LroStatus<TResult>> => {
    const response = await lroPrimitives.sendPollRequest(path);
    const retryAfter: string | undefined = response.rawResponse.headers["retry-after"];
    if (retryAfter !== undefined) {
      // Retry-After header value is either in HTTP date format, or in seconds
      const retryAfterInSeconds = parseInt(retryAfter);
      pollerConfig.intervalInMs = isNaN(retryAfterInSeconds)
        ? calculatePollingIntervalFromDate(new Date(retryAfter), pollerConfig.intervalInMs)
        : retryAfterInSeconds * 1000;
    }
    return getLroStatusFromResponse(response);
  };
}

function calculatePollingIntervalFromDate(
  retryAfterDate: Date,
  defaultIntervalInMs: number
): number {
  const timeNow = Math.floor(new Date().getTime());
  const retryAfterTime = retryAfterDate.getTime();
  if (timeNow < retryAfterTime) {
    return retryAfterTime - timeNow;
  }
  return defaultIntervalInMs;
}

export function buildResult<TResult, TState extends PollOperationState<TResult>>(inputs: {
  response: TResult;
  state: TState;
  processResult?: (result: unknown, state: TState) => TResult;
}): TResult {
  const { processResult, response, state } = inputs;
  return processResult ? processResult(response, state) : response;
}

/**
 * Creates a callback to be used to initialize the polling operation state.
 */
export function createStateInitializer<
  TResult,
  TState extends PollOperationState<TResult>
>(inputs: {
  state: ResumablePollOperationState<TResult>;
  requestPath: string;
  requestMethod: string;
  lroResourceLocationConfig?: LroResourceLocationConfig;
  processResult?: (result: unknown, state: TState) => TResult;
}): (response: LroResponse<TResult>) => void {
  const { requestMethod, requestPath, state, lroResourceLocationConfig, processResult } = inputs;
  return (response: LroResponse<TResult>): void => {
    state.initialRawResponse = response.rawResponse;
    state.isStarted = true;
    state.config = inferLroMode({
      rawResponse: state.initialRawResponse,
      requestPath,
      requestMethod,
      lroResourceLocationConfig,
    });
    /** short circuit before polling */
    if (
      isDone({
        rawResponse: state.initialRawResponse,
        state,
        info: state.config,
        responseKind: "Initial",
      })
    ) {
      state.result = buildResult({
        response: response.flatResponse,
        state: state as TState,
        processResult,
      });
      state.isCompleted = true;
    }
    logger.verbose(`LRO: initial state: ${JSON.stringify(state)}`);
  };
}

export function createGetLroStatusFromResponse<
  TResult,
  TState extends PollOperationState<TResult>
>(inputs: {
  lro: LongRunningOperation<TResult>;
  state: TState;
  info: LroInfo;
}): (response: LroResponse<TResult>) => LroStatus<TResult> {
  const { lro, state, info } = inputs;
  const location = info.resourceLocation;
  return (response: LroResponse<TResult>): LroStatus<TResult> => {
    const isTerminalStatus = isDone({
      info,
      rawResponse: response.rawResponse,
      state,
    });
    return {
      ...response,
      done: isTerminalStatus && !location,
      next: !(isTerminalStatus && location)
        ? undefined
        : () =>
            lro.sendPollRequest(location).then((res) => ({
              ...res,
              done: true,
            })),
    };
  };
}
