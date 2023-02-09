// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the dataLakePathParameterWorkaroundPolicy.
 */
export const dataLakePathParameterWorkaroundPolicyName = "dataLakePathParameterWorkaroundPolicy";

/**
 * dataLakePathParameterWorkaroundPolicy works around a generator issue with path parameters being
 * left in the URL.
 */
export function dataLakePathParameterWorkaroundPolicy(): PipelinePolicy {
  return {
    name: dataLakePathParameterWorkaroundPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.url.includes("/%7Bfilesystem%7D/%7Bpath%7D")) {
        request.url = request.url.replace("/%7Bfilesystem%7D/%7Bpath%7D", "");
      } else if (request.url.includes("/%7Bfilesystem%7D")) {
        request.url = request.url.replace("/%7Bfilesystem%7D", "");
      }
      return next(request);
    },
  };
}
