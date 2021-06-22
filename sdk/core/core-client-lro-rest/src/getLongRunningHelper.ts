// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, HttpResponse } from "@azure-rest/core-client";
import {
  createGetLROState,
  FinalStateVia,
  LRO,
  LROBody,
  LROPoller,
  LROPollerOptions,
  LROState,
} from "./lroEngine";
import { PollOperationState, PollerLike } from "@azure/core-lro";

/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult
): PollerLike<PollOperationState<TResult>, TResult>;
/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param pollerOptions - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  pollerOptions: LROPollerOptions
): PollerLike<PollOperationState<TResult>, TResult>;
/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param finalStateVia - Additional information about how to get to the final result of the long running operation.
 * Typically this is described in the Swagger using the extension `x-ms-long-running-operation-options`.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  finalStateVia: FinalStateVia
): PollerLike<PollOperationState<TResult>, TResult>;
/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param pollerOptions - Options to set a resume state or custom polling interval.
 * @param finalStateVia - Additional information about how to get to the final result of the long running operation.
 * Typically this is described in the Swagger using the extension `x-ms-long-running-operation-options`.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  pollerOptions: LROPollerOptions,
  finalStateVia: FinalStateVia
): PollerLike<PollOperationState<TResult>, TResult>;
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  pollerOptionsOrFinalState?: LROPollerOptions | FinalStateVia,
  finalStateViaOrNothing?: FinalStateVia
): PollerLike<PollOperationState<TResult>, TResult> {
  // Default values
  let pollerOptions: LROPollerOptions = {};
  let finalStateVia: FinalStateVia | undefined;

  // Figure out which override we are handling
  if (isFinalStateVia(pollerOptionsOrFinalState)) {
    finalStateVia = pollerOptionsOrFinalState;
  } else if (finalStateViaOrNothing) {
    finalStateVia = finalStateViaOrNothing;
  }

  if (isLROPollerOptions(pollerOptionsOrFinalState)) {
    pollerOptions = pollerOptionsOrFinalState;
  }

  // Translating the rest response into a response that the LRO engine understands
  const initialLROResponse = getLroResponse(initialResponse);

  const poller: LRO<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async (initializeState) => {
      // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
      // we are not triggering the initial request here, just extracting the information from the
      // response we were provided.
      initializeState(initialLROResponse.rawResponse, initialLROResponse.flatResponse);
      return initialLROResponse;
    },
    sendPollRequest: async (config, path) => {
      // This is the callback that is going to be called to poll the service
      // to get the latest status. We use the client provided and the polling path
      // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
      // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
      const response = (await client
        .pathUnchecked(path ?? initialResponse.request.url)
        .get()) as TResult;

      // Translating the rest response into a response that the LRO engine understands
      const lroResponse = getLroResponse(response);

      // Hand off the information we have to the LRO engine to continue polling
      return createGetLROState<TResult>(
        poller,
        config,
        finalStateVia
      )(lroResponse.rawResponse, lroResponse.flatResponse);
    },
    retrieveAzureAsyncResource: async (path) => {
      // This is the function executed when a final request is needed to get the result once the operation completed
      // we use the path provided by the engine when this callback is executed or default to the initial path.
      const response: HttpResponse = await client
        .pathUnchecked(path ?? initialResponse.request.url)
        .get();

      const lroResponse = getLroResponse(response);

      // retreiveAzureAsyncResource is called as a final request to get the result
      // we need to set the done property as true since there are no additional requests to do
      lroResponse.done = true;

      return createGetLROState<TResult>(poller, {})(
        lroResponse.rawResponse,
        // flatResponse is used when there is additional deserialization
        // since RLC doesn't use mappers flatResponse is the same as rawResponse
        lroResponse.flatResponse as TResult
      );
    },
  };

  return new LROPoller(pollerOptions, poller);
}

/**
 * Converts a Rest Client response to a response that the LRO engine knows about
 * @param response - a rest client http response
 * @returns - An LRO response that the LRO engine can work with
 */
function getLroResponse<TResult extends HttpResponse>(response: TResult): LROState<TResult> {
  if (Number.isNaN(response.status)) {
    throw new TypeError(`Status code of the response is not a number. Value: ${response.status}`);
  }

  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: response.body as LROBody,
    },
    done: false,
  };
}

function isFinalStateVia(param?: LROPollerOptions | FinalStateVia): param is FinalStateVia {
  if (
    typeof param === "string" &&
    ["azure-async-operation", "location", "original-uri"].includes(param)
  ) {
    return true;
  } else {
    return false;
  }
}

function isLROPollerOptions(param?: LROPollerOptions | FinalStateVia): param is LROPollerOptions {
  if (typeof param === "object") {
    // Infer LRO Poller options if we find any of the 2 properties in the object
    return param.intervalInMs !== undefined || param.resumeFrom !== undefined;
  } else {
    return false;
  }
}
