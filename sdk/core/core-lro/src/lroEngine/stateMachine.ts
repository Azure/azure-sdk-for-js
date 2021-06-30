// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { processAzureAsyncOperationResult } from "./azureAsyncPolling";
import { isBodyPollingDone, processBodyPollingOperationResult } from "./bodyPolling";
import { processLocationPollingOperationResult } from "./locationPolling";
import {
  LroResourceLocationConfig,
  GetLroStatusFromResponse,
  LongRunningOperation,
  LroConfig,
  LroStatus,
  PollerConfig,
  RawResponse,
  ResumablePollOperationState
} from "./models";
import { processPassthroughOperationResult } from "./passthrough";
import { getPollingUrl, inferLroMode, isExpectedInitialResponse } from "./requestUtils";

/**
 * creates a stepping function that maps an LRO state to another.
 */
export function createGetLroStatusFromResponse<TResult>(
  lroPrimitives: LongRunningOperation<TResult>,
  config: LroConfig,
  finalStateVia?: LroResourceLocationConfig
): GetLroStatusFromResponse<TResult> {
  switch (config.mode) {
    case "AzureAsync": {
      return processAzureAsyncOperationResult(
        lroPrimitives,
        config.resourceLocation,
        finalStateVia
      );
    }
    case "Location": {
      return processLocationPollingOperationResult;
    }
    case "Body": {
      return processBodyPollingOperationResult;
    }
    default: {
      return processPassthroughOperationResult;
    }
  }
}

/**
 * Creates a polling operation that returns a LRO state.
 */
export function createPollForLROStatus<TResult>(
  lroPrimitives: LongRunningOperation<TResult>,
  config: LroConfig
): (pollingURL: string, pollerConfig: PollerConfig) => Promise<LroStatus<TResult>> {
  return async (path: string, pollerConfig: PollerConfig): Promise<LroStatus<TResult>> => {
    const response = await lroPrimitives.sendPollRequest(config, path);
    const retryAfter: string | undefined = response.rawResponse.headers["retry-after"];
    if (retryAfter !== undefined) {
      const retryAfterInMs = parseInt(retryAfter);
      pollerConfig.intervalInMs = isNaN(retryAfterInMs)
        ? calculatePollingIntervalFromDate(new Date(retryAfter), pollerConfig.intervalInMs)
        : retryAfterInMs;
    }
    return response;
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

/**
 * Creates a callback to be used to initialize the polling operation state.
 * @param state - of the polling operation
 * @param operationSpec - of the LRO
 * @param callback - callback to be called when the operation is done
 * @returns callback that initializes the state of the polling operation
 */
export function createInitializeState<TResult>(
  state: ResumablePollOperationState<TResult>,
  requestPath: string,
  requestMethod: string
): (rawResponse: RawResponse, flatResponse: unknown) => boolean {
  return (rawResponse: RawResponse, flatResponse: unknown) => {
    if (isExpectedInitialResponse(rawResponse)) return true;
    state.initialRawResponse = rawResponse;
    state.isStarted = true;
    state.pollingURL = getPollingUrl(state.initialRawResponse, requestPath);
    state.config = inferLroMode(requestPath, requestMethod, state.initialRawResponse);
    /** short circuit polling if body polling is done in the initial request */
    if (
      state.config.mode === undefined ||
      (state.config.mode === "Body" && isBodyPollingDone(state.initialRawResponse))
    ) {
      state.result = flatResponse as TResult;
      state.isCompleted = true;
    }
    return Boolean(state.isCompleted);
  };
}
