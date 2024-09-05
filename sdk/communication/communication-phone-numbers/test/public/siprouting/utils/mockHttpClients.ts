// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { SipTrunk } from "../../../../src";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T,
  headers?: HttpHeaders,
): HttpClient => {
  return {
    async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
      return {
        status,
        request,
        headers: headers ?? request.headers,
        bodyAsText: JSON.stringify(parsedBody),
      };
    },
  };
};

export const getTrunksHttpClient: HttpClient = createMockHttpClient<SipTrunk[]>(200, [
  {
    fqdn: "one.trunk.contoso.com",
    sipSignalingPort: 1234,
  },
  {
    fqdn: "two.trunk.contoso.com",
    sipSignalingPort: 4321,
  },
]);
