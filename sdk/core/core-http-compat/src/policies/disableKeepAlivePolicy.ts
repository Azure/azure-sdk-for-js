// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";

export const disbaleKeepAlivePolicyName = "DisableKeepAlivePolicy";

export function createDisableKeepAlivePolicy(): PipelinePolicy {
  return {
    name: disbaleKeepAlivePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.disableKeepAlive = true;
      return next(request);
    },
  };
}
