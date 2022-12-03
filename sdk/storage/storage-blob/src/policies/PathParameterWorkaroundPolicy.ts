// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the pathParameterWorkaroundPolicy.
 */
export const pathParameterWorkaroundPolicyName = "pathParameterWorkaroundPolicy";

/**
 * pathParameterWorkaroundPolicy works around a generator issue with path parameters being
 * left in the URL.
 */
export function pathParameterWorkaroundPolicy(): PipelinePolicy {
  return {
    name: pathParameterWorkaroundPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.url.includes("/%7BcontainerName%7D/%7Bblob%7D")) {
        request.url = request.url.replace("/%7BcontainerName%7D/%7Bblob%7D", "");
      } else if (request.url.includes("/%7BcontainerName%7D")) {
        request.url = request.url.replace("/%7BcontainerName%7D", "");
      }
      return next(request);
    },
  };
}
