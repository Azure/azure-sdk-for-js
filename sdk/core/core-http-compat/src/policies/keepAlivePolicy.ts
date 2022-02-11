// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";

export const keepAlivePolicyName = "KeepAlivePolicy";

export function createKeepAlivePolicy(): PipelinePolicy {
  return {
    name: keepAlivePolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.disableKeepAlive = true;
      return next(request);
    },
  };
}
