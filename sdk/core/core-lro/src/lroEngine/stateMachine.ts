// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetLroStatusFromResponse,
  LongRunningOperation,
  LroConfig,
  LroResourceLocationConfig,
  LroResponse,
  LroStatus,
  PollerConfig,
  ResumablePollOperationState,
} from "./models";
import {
  getPollingUrl,
  getProvisioningState,
  inferLroMode,
  isPollingDone,
  isUnexpectedInitialResponse,
} from "./requestUtils";
import { PollOperationState } from "../pollOperation";
import { logger } from "./logger";
import { processBodyPollingOperationResult } from "./bodyPolling";
import { processLocationPollingOperationResult } from "./locationPolling";
import { processPassthroughOperationResult } from "./passthrough";

/**
 * creates a stepping function that maps an LRO state to another.
 */
export function createGetLroStatusFromResponse<TResult, TState extends PollOperationState<TResult>>(
  lroPrimitives: LongRunningOperation<TResult>,
  config: LroConfig,
  state: TState,
  lroResourceLocationConfig?: LroResourceLocationConfig
): GetLroStatusFromResponse<TResult> {
  switch (config.mode) {
    case "Location": {
      return processLocationPollingOperationResult(
        lroPrimitives,
        state,
        config.resourceLocation,
        lroResourceLocationConfig
      );
    }
    case "Body": {
      return processBodyPollingOperationResult(state);
    }
    default: {
      return processPassthroughOperationResult;
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
): (response: LroResponse<TResult>) => boolean {
  return (response: LroResponse<TResult>): boolean => {
    if (isUnexpectedInitialResponse(response.rawResponse)) return true;
    state.initialRawResponse = response.rawResponse;
    state.isStarted = true;
    state.pollingURL = getPollingUrl(state.initialRawResponse, requestPath);
    state.config = inferLroMode(requestPath, requestMethod, state.initialRawResponse);
    /** short circuit polling if body polling is done in the initial request */
    if (
      state.config.mode === undefined ||
      (state.config.mode === "Body" &&
        isPollingDone({
          rawResponse: state.initialRawResponse,
          status: getProvisioningState(state.initialRawResponse),
        }))
    ) {
      state.result = response.flatResponse as TResult;
      state.isCompleted = true;
    }
    logger.verbose(`LRO: initial state: ${JSON.stringify(state)}`);
    return Boolean(state.isCompleted);
  };
}
