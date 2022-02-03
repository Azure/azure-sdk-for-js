// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, PipelineRequest, PipelineResponse } from "./interfaces";
import { createFetchHttpClient } from "./fetchHttpClient";
import { createXhrHttpClient } from "./xhrHttpClient";

/**
 * Create an HTTP Client that uses either XHR or fetch.
 * Once a single request enables streaming, fetch will be used.
 */
export function createBrowserHttpClient(): HttpClient {
  let client: HttpClient;
  let fetchEnabled = false;
  return {
    /**
     * Makes a request over an underlying transport layer and returns the response.
     * @param request - The request to be made.
     */
    sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      if (request.enableBrowserStreams && !fetchEnabled) {
        client = createFetchHttpClient();
        fetchEnabled = true;
      } else if (!client) {
        client = createXhrHttpClient();
      }
      return client.sendRequest(request);
    },
  };
}
