// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PollerLike,
  OperationState,
  ResourceLocationConfig,
  RunningOperation,
  OperationResponse,
} from "@azure/core-lro";
import { createHttpPoller } from "@azure/core-lro";

import type { Client, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError } from "@azure-rest/core-client";
import type { AbortSignalLike } from "@azure/abort-controller";

export interface GetLongRunningPollerOptions<TResponse> {
  /** Delay to wait until next poll, in milliseconds. */
  updateIntervalInMs?: number;
  /**
   * The signal which can be used to abort requests.
   */
  abortSignal?: AbortSignalLike;
  /**
   * The potential location of the result of the LRO if specified by the LRO extension in the swagger.
   */
  resourceLocationConfig?: ResourceLocationConfig;
  /**
   * The original url of the LRO
   * Should not be null when restoreFrom is set
   */
  initialRequestUrl?: string;
  /**
   * A serialized poller which can be used to resume an existing paused Long-Running-Operation.
   */
  restoreFrom?: string;
  /**
   * The function to get the initial response
   */
  getInitialResponse?: () => PromiseLike<TResponse>;
  /**
   * The api-version of the LRO
   */
  apiVersion?: string;
}
export function getLongRunningPoller<TResponse extends PathUncheckedResponse, TResult = void>(
  client: Client,
  processResponseBody: (result: TResponse) => Promise<TResult>,
  expectedStatuses: string[],
  options: GetLongRunningPollerOptions<TResponse>,
): PollerLike<OperationState<TResult>, TResult> {
  const { restoreFrom, getInitialResponse, apiVersion } = options;
  if (!restoreFrom && !getInitialResponse) {
    throw new Error("Either restoreFrom or getInitialResponse must be specified");
  }
  let initialResponse: TResponse | undefined = undefined;
  const pollAbortController = new AbortController();
  const poller: RunningOperation<TResponse> = {
    sendInitialRequest: async () => {
      if (!getInitialResponse) {
        throw new Error("getInitialResponse is required when initializing a new poller");
      }
      initialResponse = await getInitialResponse();
      return getLroResponse(initialResponse, expectedStatuses);
    },
    sendPollRequest: async (
      path: string,
      pollOptions?: {
        abortSignal?: AbortSignalLike;
      },
    ) => {
      // The poll request would both listen to the user provided abort signal and the poller's own abort signal
      function abortListener(): void {
        pollAbortController.abort();
      }
      const abortSignal = pollAbortController.signal;
      if (options.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (pollOptions?.abortSignal?.aborted) {
        pollAbortController.abort();
      } else if (!abortSignal.aborted) {
        options.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
        pollOptions?.abortSignal?.addEventListener("abort", abortListener, {
          once: true,
        });
      }
      let response;
      try {
        const pollingPath = apiVersion ? addApiVersionToUrl(path, apiVersion) : path;
        response = await client.pathUnchecked(pollingPath).get({ abortSignal });
      } finally {
        options.abortSignal?.removeEventListener("abort", abortListener);
        pollOptions?.abortSignal?.removeEventListener("abort", abortListener);
      }

      return getLroResponse(response as TResponse, expectedStatuses);
    },
  };
  return createHttpPoller(poller, {
    intervalInMs: options?.updateIntervalInMs,
    resourceLocationConfig: options?.resourceLocationConfig,
    restoreFrom: options?.restoreFrom,
    processResult: (result: unknown) => {
      return processResponseBody(result as TResponse);
    },
  });
}
/**
 * Converts a Rest Client response to a response that the LRO implementation understands
 * @param response - a rest client http response
 * @param deserializeFn - deserialize function to convert Rest response to modular output
 * @returns - An LRO response that the LRO implementation understands
 */
function getLroResponse<TResponse extends PathUncheckedResponse>(
  response: TResponse,
  expectedStatuses: string[],
): OperationResponse<TResponse> {
  if (!expectedStatuses.includes(response.status)) {
    throw createRestError(response);
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

/**
 * Adds the api-version query parameter on a URL if it's not present.
 * @param url - the URL to modify
 * @param apiVersion - the API version to set
 * @returns - the URL with the api-version query parameter set
 */
function addApiVersionToUrl(url: string, apiVersion: string): string {
  // The base URL is only used for parsing and won't appear in the returned URL
  const urlObj = new URL(url, "https://microsoft.com");
  if (!urlObj.searchParams.get("api-version")) {
    // Append one if there is no apiVersion
    return `${url}${
      Array.from(urlObj.searchParams.keys()).length > 0 ? "&" : "?"
    }api-version=${apiVersion}`;
  }
  return url;
}
