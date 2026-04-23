// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

export const StorageFlushDataBrowserPolicyName = "StorageFlushDataBrowserPolicy";

/**
 * storageFlushDataBrowserPolicy is a policy used to trigger browsers to set Content-Length header to 0 for the Flush Data operation.
 * When the body is undefined, some browsers will not set it which is required for the Flush Data operation.
 */
export function storageFlushDataBrowserPolicy(): PipelinePolicy {
  return {
    name: StorageFlushDataBrowserPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (
        request.url.includes("action=flush") &&
        request.method === "PATCH" &&
        request.body === undefined
      ) {
        request.body = "";
      }
      return next(request);
    },
  };
}
