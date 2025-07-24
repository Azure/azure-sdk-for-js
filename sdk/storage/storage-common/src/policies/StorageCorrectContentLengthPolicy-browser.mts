// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelineRequest,
  PipelineResponse,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the storageCorrectContentLengthPolicy.
 */
export const storageCorrectContentLengthPolicyName = "StorageCorrectContentLengthPolicy";

/**
 * storageCorrectContentLengthPolicy to correctly set Content-Length header with request body length.
 */
export function storageCorrectContentLengthPolicy(): PipelinePolicy {
  return {
    name: storageCorrectContentLengthPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      return next(request);
    },
  };
}
