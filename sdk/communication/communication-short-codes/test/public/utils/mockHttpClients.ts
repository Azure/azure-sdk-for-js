// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, WebResourceLike, HttpOperationResponse } from "@azure/core-http";
import { USProgramBrief } from "../../../src";
import { getTestUSProgramBrief } from "./testUSProgramBrief";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T
): HttpClient => {
  return {
    async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status,
        request,
        headers: request.headers,
        parsedBody
      };
    }
  };
};

const uspb = getTestUSProgramBrief("9fb78ef0-5704-4866-bca2-6a040ec83c0b");

export const getUSProgramBriefHttpClient: HttpClient = createMockHttpClient<USProgramBrief>(
  200,
  uspb
);
