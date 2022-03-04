// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { FullOperationResponse } from "@azure/core-client";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * Creates a `PipelinePolicy` that converts relative URL values in the `nextLink` property to absolute URLs.
 *
 * This is necessary because the Core V2 library does not support paging with relative links at time of writing.
 *
 * @param host - The base URL of the resource.
 * @returns the `PipelinePolicy` that addresses the issue.
 */
export function createPhoneNumbersPagingPolicy(host: string): PipelinePolicy {
  return {
    name: "phoneNumbersPagingPolicy",
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const response: FullOperationResponse = await next(request);
      let nextLink: string = response?.parsedBody?.nextLink;

      if (nextLink && !nextLink.startsWith(host)) {
        nextLink = host.endsWith("/") ? nextLink.substring(1) : nextLink;
        const absolutePath = `${host}${nextLink}`;
        response.parsedBody.nextLink = absolutePath;
      }

      return response;
    },
  };
}

/**
 * A `PipelinePolicy` that adds the `azure-asyncoperation` header to the request with the
 * same value as the `operation-location` header, if it exists.
 *
 * This is used because the phone-numbers API uses LROs with status monitors, but
 * the Core V2 LRO implementation only supports this pattern if the legacy
 * `azure-asyncoperation` header is present.
 *
 * For more information on the LRO guidelines, refer to: https://github.com/microsoft/api-guidelines/blob/vNext/azure/Guidelines.md#long-running-operations-with-status-monitor
 */
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
