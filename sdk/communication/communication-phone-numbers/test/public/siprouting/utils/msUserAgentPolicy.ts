// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { getAzureUserAgentOverride } from "../../../utils/injectables.js";

export function createMSUserAgentPolicy(): PipelinePolicy {
  return {
    name: "msUserAgentPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const useragent = getAzureUserAgentOverride();
      request.headers.set("x-ms-useragent", useragent);
      return next(request);
    },
  };
}
