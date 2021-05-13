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
import { InnerTransactionRequest } from "./utils/internalModels";

export const transactionRequestAssemblePolicyName = "transactionRequestAssemblePolicy";

const dummyResponse: PipelineResponse = {
  request: createPipelineRequest({ url: "FAKE" }),
  status: 200,
  headers: createHttpHeaders()
};

export function transactionRequestAssemblePolicy(
  transactionRequest: InnerTransactionRequest
): PipelinePolicy {
  return {
    name: transactionRequestAssemblePolicyName,
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      transactionRequest.appendSubRequestToBody(request);
      // Intercept request from going to wire
      return dummyResponse;
    }
  };
}

export const transactionHeaderFilterPolicyName = "transactionHeaderFilterPolicy";

export function transactionHeaderFilterPolicy(): PipelinePolicy {
  return {
    name: transactionHeaderFilterPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      // The subrequests should not have the x-ms-version header.
      request.headers.delete(HeaderConstants.X_MS_VERSION);
      return next(request);
    }
  };
}
