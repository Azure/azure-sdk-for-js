// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T,
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: request.headers,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
};

export const configurationHttpClient: HttpClient = createMockHttpClient(200);
