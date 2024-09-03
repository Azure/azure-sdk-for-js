// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { RequestPolicy } from "./policies/requestPolicyFactoryPolicy.js";
import { toPipelineResponse } from "./response.js";
import { toWebResourceLike } from "./util.js";

/**
 * Converts a RequestPolicy based HttpClient to a PipelineRequest based HttpClient.
 * @param requestPolicyClient - A HttpClient compatible with core-http
 * @returns A HttpClient compatible with core-rest-pipeline
 */
export function convertHttpClient(requestPolicyClient: RequestPolicy): HttpClient {
  return {
    sendRequest: async (request: PipelineRequest): Promise<PipelineResponse> => {
      const response = await requestPolicyClient.sendRequest(
        toWebResourceLike(request, { createProxy: true }),
      );
      return toPipelineResponse(response);
    },
  };
}
