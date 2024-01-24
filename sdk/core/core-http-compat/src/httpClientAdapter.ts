// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { RequestPolicy } from "./policies/requestPolicyFactoryPolicy";
import { toPipelineResponse } from "./response";
import { toWebResourceLike } from "./util";

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
