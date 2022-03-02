// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

export function createPhoneNumbersPagingPolicy(host: string): PipelinePolicy {
  return {
    name: "phoneNumbersPagingPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response: FullOperationResponse = await next(request);
      const nextLink: string = response?.parsedBody?.nextLink;

      if (nextLink && !nextLink.startsWith(host)) {
        const absolutePath = host.endsWith("/") ? host + nextLink.substring(1) : host + nextLink;
        response.parsedBody.nextLink = absolutePath;
      }

      return response;
    },
  };
}

export const phoneNumbersLroPolicy: PipelinePolicy = {
  name: "phoneNumbersLroPolicy",
  async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
    const response = await next(request);

    const operationLocation = response.headers?.get("operation-location");
    if (operationLocation) {
      response.headers.set("azure-asyncoperation", operationLocation);
    }

    return response;
  },
};
