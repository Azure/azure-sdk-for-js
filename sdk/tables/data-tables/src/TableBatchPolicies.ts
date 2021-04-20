// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
  createHttpHeaders,
  createPipelineRequest
} from "@azure/core-rest-pipeline";
import { HeaderConstants } from "./utils/constants";
import { InnerBatchRequest } from "./utils/internalModels";

export const batchRequestAssemblePolicyName = "batchRequestAssemblePolicy";

const dummyResponse: PipelineResponse = {
  request: createPipelineRequest({ url: "FAKE" }),
  status: 200,
  headers: createHttpHeaders()
};

export function batchRequestAssemblePolicy(batchRequest: InnerBatchRequest): PipelinePolicy {
  return {
    name: batchRequestAssemblePolicyName,
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      batchRequest.appendSubRequestToBody(request);
      // Intercept request from going to wire
      return dummyResponse;
    }
  };
}

export const batchHeaderFilterPolicyName = "batchHeaderFilterPolicy";

export function batchHeaderFilterPolicy(): PipelinePolicy {
  return {
    name: batchHeaderFilterPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // The subrequests should not have the x-ms-version header.
      request.headers.delete(HeaderConstants.X_MS_VERSION);
      return next(request);
    }
  };
}
