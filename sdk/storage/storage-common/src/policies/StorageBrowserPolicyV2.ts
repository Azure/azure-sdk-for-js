// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the StorageBrowserPolicy.
 */
export const storageBrowserPolicyName = "storageBrowserPolicy";

/**
 * storageBrowserPolicy is a policy used to prevent browsers from caching requests
 * and to remove cookies and explicit content-length headers.
 *
 * In Node.js, this policy is a no-op pass-through.
 */
export function storageBrowserPolicy(): PipelinePolicy {
  return {
    name: storageBrowserPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return next(request);
    },
  };
}
