// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RunningOperation, OperationResponse } from "./models.js";
import type { OperationState, PollerLike } from "../poller/models.js";
import {
  getErrorFromResponse,
  getOperationLocation,
  getOperationStatus,
  getResourceLocation,
  getStatusFromInitialResponse,
  inferLroMode,
  isOperationError,
  parseRetryAfter,
} from "./operation.js";
import type { CreateHttpPollerOptions } from "./models.js";
import { buildCreatePoller } from "../poller/poller.js";
import { rewriteUrl } from "./utils.js";

/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: RunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>,
): PollerLike<TState, TResult> {
  const {
    resourceLocationConfig,
    intervalInMs,
    processResult,
    restoreFrom,
    updateState,
    withOperationLocation,
    resolveOnUnsuccessful = false,
    baseUrl,
  } = options || {};
  return buildCreatePoller<OperationResponse, TResult, TState>({
    getStatusFromInitialResponse,
    getStatusFromPollResponse: getOperationStatus,
    isOperationError,
    getOperationLocation,
    getResourceLocation,
    getPollingInterval: parseRetryAfter,
    getError: getErrorFromResponse,
    resolveOnUnsuccessful,
  })(
    {
      init: async () => {
        const response = await lro.sendInitialRequest();
        const config = inferLroMode(response.rawResponse, resourceLocationConfig);
        return {
          response,
          operationLocation: rewriteUrl({ url: config?.operationLocation, baseUrl }),
          resourceLocation: rewriteUrl({ url: config?.resourceLocation, baseUrl }),
          initialRequestUrl: config?.initialRequestUrl,
          requestMethod: config?.requestMethod,
          ...(config?.mode ? { metadata: { mode: config.mode } } : {}),
        };
      },
      poll: lro.sendPollRequest,
    },
    {
      intervalInMs,
      withOperationLocation,
      restoreFrom,
      updateState,
      processResult: processResult
        ? ({ flatResponse }, state) => processResult(flatResponse, state)
        : ({ flatResponse }) => flatResponse as Promise<TResult>,
    },
  );
}
