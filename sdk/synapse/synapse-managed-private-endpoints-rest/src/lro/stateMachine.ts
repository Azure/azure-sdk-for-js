// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { processAzureAsyncOperationResult } from "./azureAsyncPolling";
import {
  isBodyPollingDone,
  processBodyPollingOperationResult
} from "./bodyPolling";
import { processLocationPollingOperationResult } from "./locationPolling";
import {
  FinalStateVia,
  LRO,
  LROConfig,
  LROState,
  PollerConfig,
  RawResponse,
  ResumablePollOperationState
} from "./models";
import { processPassthroughOperationResult } from "./passthrough";
import { getPollingURL, inferLROMode } from "./requestUtils";

export const successStates = ["succeeded"];
export const failureStates = ["failed", "canceled", "cancelled"];
export const terminalStates = successStates.concat(failureStates);

/**
 * creates a stepping function that maps an LRO state to another.
 */
export function createGetLROState<TResult>(
  lroPrimitives: LRO<TResult>,
  config: LROConfig,
  finalStateVia?: FinalStateVia
): (rawResponse: RawResponse, flatResponse: TResult) => LROState<TResult> {
  switch (config.mode) {
    case "AzureAsync": {
      return processAzureAsyncOperationResult(
        lroPrimitives.retrieveAzureAsyncResource!,
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
export function createPollForLROState<TResult>(
  lroPrimitives: LRO<TResult>,
  config: LROConfig
): (
  pollingURL: string,
  pollerConfig: PollerConfig
) => Promise<LROState<TResult>> {
  return async (
    path: string,
    pollerConfig: PollerConfig
  ): Promise<LROState<TResult>> => {
    const response = await lroPrimitives.sendPollRequest(config, path);
    const retryAfter: string | undefined =
      response.rawResponse.headers["Retry-After"];
    if (retryAfter !== undefined) {
      const retryAfterInMs = parseInt(retryAfter);
      pollerConfig.intervalInMs = isNaN(retryAfterInMs)
        ? calculatePollingIntervalFromDate(
            new Date(retryAfter),
            pollerConfig.intervalInMs
          )
        : retryAfterInMs;
    }
    return response!;
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
 * @param state of the polling operation
 * @param operationSpec of the LRO
 * @param callback callback to be called when the operation is done
 * @returns callback that initializes the state of the polling operation
 */
export function createInitializeState<TResult>(
  state: ResumablePollOperationState<TResult>,
  requestPath: string,
  requestMethod: string
): (rawResponse: RawResponse, flatResponse: unknown) => boolean {
  return (rawResponse: RawResponse, flatResponse: unknown) => {
    state.initialRawResponse = rawResponse;
    state.isStarted = true;
    state.pollingURL = getPollingURL(state.initialRawResponse, requestPath);
    state.config = inferLROMode(
      requestPath,
      requestMethod,
      state.initialRawResponse
    );
    /** short circuit polling if body polling is done in the initial request */
    if (
      state.config.mode === undefined ||
      (state.config.mode === "Body" &&
        isBodyPollingDone(state.initialRawResponse))
    ) {
      state.result = flatResponse as TResult;
      state.isCompleted = true;
    }
    return !!state.isCompleted;
  };
}
