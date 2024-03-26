// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { LongRunningOperation, OperationResponse } from "./models.js";
import { OperationState, PollerLike, SimplePollerLike } from "../poller/models.js";
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
import { CreateHttpPollerOptions } from "./models.js";
import { buildCreatePoller } from "../poller/poller.js";

/**
 * Create a SimplePoller that will poll the LRO until it is done
 * Awaitting this would return an initialized poller
 */
export function createInitializedHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>,
): Promise<PollerLike<TState, TResult>>;
/**
 * Explicitly specify the type of poller as "Poller" to create
 */
export function createInitializedHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  type: "Poller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): Promise<PollerLike<TState, TResult>>;
/**
 * Explicitly specify the type of poller as "SimplePoller" to create
 */
export function createInitializedHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  type: "SimplePoller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): Promise<SimplePollerLike<TState, TResult>>;
export async function createInitializedHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  typeOrOptions: "Poller" | "SimplePoller" | CreateHttpPollerOptions<TResult, TState> = "Poller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): Promise<SimplePollerLike<TState, TResult> | PollerLike<TState, TResult>> {
  const type = typeof typeOrOptions === "string" ? typeOrOptions : "Poller";
  options = typeof typeOrOptions === "string" ? options : typeOrOptions;
  const poller =
    type === "Poller"
      ? createHttpPoller(lro, options)
      : createHttpPoller(lro, "SimplePoller", options);
  await poller.submitted();
  return poller;
}

/**
 * The default creation function in which returns poller extending promise interface
 */
export function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  options?: CreateHttpPollerOptions<TResult, TState>,
): PollerLike<TState, TResult>;
/**
 * Explicitly specify the type of poller as "Poller" to create
 */
export function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  type: "Poller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): PollerLike<TState, TResult>;
/**
 * Explicitly specify the type of poller as "SimplePoller" to create
 */
export function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  type: "SimplePoller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): SimplePollerLike<TState, TResult>;
/**
 * Creates a poller that can be used to poll a long-running operation.
 * @param lro - Description of the long-running operation
 * @param typeOrOptions - the type of poller or options, type would be limited to Poller or SimplePoller
 * @param options - options to configure the poller
 * @returns an initialized poller
 */
export function createHttpPoller<TResult, TState extends OperationState<TResult>>(
  lro: LongRunningOperation,
  typeOrOptions: "Poller" | "SimplePoller" | CreateHttpPollerOptions<TResult, TState> = "Poller",
  options?: CreateHttpPollerOptions<TResult, TState>,
): SimplePollerLike<TState, TResult> | PollerLike<TState, TResult> {
  const type = typeof typeOrOptions === "string" ? typeOrOptions : "Poller";
  options = typeof typeOrOptions === "string" ? options : typeOrOptions;
  const {
    resourceLocationConfig,
    intervalInMs,
    processResult,
    restoreFrom,
    updateState,
    withOperationLocation,
    resolveOnUnsuccessful = false,
  } = options || {};
  return buildCreatePoller<OperationResponse, TResult, TState>(type, {
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
        const metadata: Record<string, string> = {};
        if (config?.mode) {
          metadata["mode"] = config.mode;
        }
        if (resourceLocationConfig) {
          metadata["resourceLocationConfig"] = resourceLocationConfig;
        }
        return {
          response,
          operationLocation: config?.operationLocation,
          resourceLocation: config?.resourceLocation,
          initialUrl: config?.initialUrl,
          requestMethod: config?.requestMethod,
          metadata,
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
    },
  );
}
