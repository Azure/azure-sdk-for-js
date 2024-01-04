// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, LroResponse } from "./models";
import { OperationState, PromisePollerLike, SimplePollerLike } from "../poller/models";
import {
  getErrorFromResponse,
  getOperationLocation,
  getOperationStatus,
  getResourceLocation,
  getStatusFromInitialResponse,
  inferLroMode,
  isOperationError,
  parseRetryAfter,
} from "./operation";
import { CreateHttpPollerOptions } from "./models";
import { buildCreatePoller, buildCreatePromisePoller } from "../poller/poller";

/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export async function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>
): Promise<SimplePollerLike<TState, TResult>> {
  return createHttpPollerOrPromisePoller(lro, false, options);
}

/**
 * Creates a poller which is also a promise that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param options - options to configure the poller
 * @returns a poller which may not be initialized yet
 */
export function createHttpPromisePoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>
): PromisePollerLike<TState, TResult> {
  return createHttpPollerOrPromisePoller(lro, true, options);
}

/**
 * Helper function to create a poller or a promise poller. 
 */
function createHttpPollerOrPromisePoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  isPromisePoller: false,
  options?: CreateHttpPollerOptions<TResult, TState>
): Promise<SimplePollerLike<TState, TResult>>;
function createHttpPollerOrPromisePoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  isPromisePoller: true,
  options?: CreateHttpPollerOptions<TResult, TState>
): PromisePollerLike<TState, TResult>;
function createHttpPollerOrPromisePoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  isPromisePoller: boolean,
  options?: CreateHttpPollerOptions<TResult, TState>
): Promise<SimplePollerLike<TState, TResult>> | PromisePollerLike<TState, TResult> {
  const buildFunction = isPromisePoller ? buildCreatePromisePoller : buildCreatePoller;
  const {
    resourceLocationConfig,
    intervalInMs,
    processResult,
    restoreFrom,
    updateState,
    withOperationLocation,
    resolveOnUnsuccessful = false,
  } = options || {};
  return buildFunction<LroResponse, TResult, TState>({
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
          initialUrl: lro.requestPath,
          requestMethod: lro.requestMethod,
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
        : ({ flatResponse }) => flatResponse as TResult,
    }
  );
}
