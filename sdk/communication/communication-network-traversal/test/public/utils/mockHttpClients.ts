// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, HttpHeaders, HttpOperationResponse, WebResourceLike } from "@azure/core-http";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T
): HttpClient => {
  return {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody,
      };
    },
  };
};

export const baseHttpClient: HttpClient = createMockHttpClient();

export const base202HttpClient: HttpClient = createMockHttpClient(202);
