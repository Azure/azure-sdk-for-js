// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, HttpResponse } from "@azure-rest/core-client";
import {
  LongRunningOperation,
  LroEngine,
  LroEngineOptions,
  LroResponse,
  PollOperationState,
  PollerLike,
} from "@azure/core-lro";

/**
 * Helper function that builds a Poller object to help polling a long running operation.
 * @param client - Client to use for sending the request to get additional pages.
 * @param initialResponse - The initial response.
 * @param options - Options to set a resume state or custom polling interval.
 * @returns - A poller object to poll for operation state updates and eventually get the final response.
 */
export function getLongRunningPoller<TResult extends HttpResponse>(
  client: Client,
  initialResponse: TResult,
  options: LroEngineOptions<TResult, PollOperationState<TResult>> = {}
): PollerLike<PollOperationState<TResult>, TResult> {
  const poller: LongRunningOperation<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async () => {
      // In the case of Rest Clients we are building the LRO poller object from a response that's the reason
      // we are not triggering the initial request here, just extracting the information from the
      // response we were provided.
      return getLroResponse(initialResponse);
    },
    sendPollRequest: async (path) => {
      // This is the callback that is going to be called to poll the service
      // to get the latest status. We use the client provided and the polling path
      // which is an opaque URL provided by caller, the service sends this in one of the following headers: operation-location, azure-asyncoperation or location
      // depending on the lro pattern that the service implements. If non is provided we default to the initial path.
      const pollPath = path ?? initialResponse.request.url;
      const response = await client.pathUnchecked(pollPath).get();
      const lroResponse = getLroResponse(response as TResult);
      lroResponse.rawResponse.headers["x-ms-original-url"] = initialResponse.request.url;
      return lroResponse;
    },
  };

  return new LroEngine(poller, options);
}

/**
 * Converts a Rest Client response to a response that the LRO engine knows about
 * @param response - a rest client http response
 * @returns - An LRO response that the LRO engine can work with
 */
function getLroResponse<TResult extends HttpResponse>(response: TResult): LroResponse<TResult> {
  if (Number.isNaN(response.status)) {
    throw new TypeError(`Status code of the response is not a number. Value: ${response.status}`);
  }

  return {
    flatResponse: response,
    rawResponse: {
      ...response,
      statusCode: Number.parseInt(response.status),
      body: response.body,
    },
  };
}
