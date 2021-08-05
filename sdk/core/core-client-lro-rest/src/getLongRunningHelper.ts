// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Client, HttpResponse } from "@azure-rest/core-client";
import { createGetLROState, LRO, LROBody, LROPoller, LROPollerOptions, LROState } from "./lro";
import { PollOperationState, PollerLike } from "@azure/core-lro";

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
  pollerOptions: LROPollerOptions = {}
): PollerLike<PollOperationState<TResult>, TResult> {
  const lroResponse = gerLroResponse<TResult>(initialResponse);

  const poller: LRO<TResult> = {
    requestMethod: initialResponse.request.method,
    requestPath: initialResponse.request.url,
    sendInitialRequest: async (initializeState) => {
      initializeState(lroResponse.rawResponse, lroResponse.flatResponse);
      return lroResponse;
    },
    sendPollRequest: async (config, path) => {
      const response = (await client
        .pathUnchecked(path ?? initialResponse.request.url)
        .get()) as TResult;

      const lroResponse = gerLroResponse<TResult>(response);

      return createGetLROState<TResult>(poller, config)(
        lroResponse.rawResponse,
        lroResponse.flatResponse
      );
    },
    retrieveAzureAsyncResource: async (path) => {
      const response = (await client
        .pathUnchecked(path ?? initialResponse.request.url)
        .get()) as TResult;

      const lroResponse = gerLroResponse<TResult>(response);

      return createGetLROState<TResult>(poller, {})(
        lroResponse.rawResponse,
        lroResponse.flatResponse
      );
    },
  };

  return new LROPoller(pollerOptions, poller);
}

function gerLroResponse<TResult extends HttpResponse>(response: TResult): LROState<TResult> {
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
