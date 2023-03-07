// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  HttpHeaders,
  PipelineRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";
import { DomainOwnershipChallenge } from "../../../src";

export const createMockHttpClient = <T = Record<string, unknown>>(
  status: number = 200,
  parsedBody?: T,
  headers?: HttpHeaders
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

export const getDomainOwnershipChallengeHttpClient: HttpClient =
  createMockHttpClient<DomainOwnershipChallenge>(200, { value: "MS123456" });
