// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T
): HttpClient => {
  return {
    async sendRequest(httpRequest: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        headers: createHttpHeaders(),
        request: httpRequest,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
};

export const baseHttpClient: HttpClient = createMockHttpClient();

export const base202HttpClient: HttpClient = createMockHttpClient(202);
