// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";

export const createMockHttpClient = (
  status: number = 200,
  bodyAsText?: string
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: request.headers,
        bodyAsText
      };
    },
  };
};

export const getUSProgramBriefHttpClient: HttpClient = createMockHttpClient(
  200
);
