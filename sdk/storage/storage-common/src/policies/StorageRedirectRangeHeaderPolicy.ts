// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * Redirects the "range" header to "x-ms-range" for Azure Storage requests as the latter is preferred.
 */
export const storageRedirectRangeHeaderPolicyName = "storageRedirectRangeHeaderPolicy";

/**
 * StorageRedirectRangeHeaderPolicy
 */
export function storageRedirectRangeHeaderPolicy(): PipelinePolicy {
  return {
    name: storageRedirectRangeHeaderPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (request.headers.has("range")) {
        request.headers.set("x-ms-range", request.headers.get("range")!);
        request.headers.delete("range");
      }
      return next(request);
    },
  };
}
