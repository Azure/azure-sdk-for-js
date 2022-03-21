// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  HttpClient,
  PipelineRequest,
  PipelineResponse,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";
import { CommunicationAccessToken } from "../../../src";
import { CommunicationIdentityAccessTokenResult } from "../../../src/generated/src/models";

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

const tokenResponse = {
  id: "identity",
  token: "token",
  expiresOn: new Date("2011/11/30"),
};

export const getTokenHttpClient: HttpClient = createMockHttpClient<CommunicationAccessToken>(
  200,
  tokenResponse
);
export const revokeTokensHttpClient: HttpClient = createMockHttpClient(204);

export const createUserHttpClient: HttpClient =
  createMockHttpClient<CommunicationIdentityAccessTokenResult>(201, {
    identity: { id: "identity" },
  });

export const createUserAndTokenHttpClient: HttpClient =
  createMockHttpClient<CommunicationIdentityAccessTokenResult>(201, {
    identity: { id: "identity" },
    accessToken: {
      token: "token",
      expiresOn: new Date("2011/11/30"),
    },
  });

export const getTokenForTeamsUserHttpClient: HttpClient =
  createMockHttpClient<CommunicationAccessToken>(200, tokenResponse);
