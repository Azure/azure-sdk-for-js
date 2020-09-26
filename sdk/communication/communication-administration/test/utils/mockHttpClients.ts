// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpClient, WebResourceLike, HttpOperationResponse, HttpHeaders } from "@azure/core-http";
import { CommunicationIdentityToken } from "../../src";
import { CommunicationIdentity } from "../../src/communicationIdentity/generated/src/models";

export const createMockHttpClient = <T = {}>(status: number = 200, parsedBody?: T): HttpClient => {
  return {
    async sendRequest(httpRequest: WebResourceLike): Promise<HttpOperationResponse> {
      return {
        status,
        headers: new HttpHeaders(),
        request: httpRequest,
        parsedBody
      };
    }
  };
};

const tokenResponse = {
  id: "identity",
  token: "token",
  expiresOn: new Date("2011/11/30")
};
export const issueTokenHttpClient: HttpClient = createMockHttpClient<CommunicationIdentityToken>(
  200,
  tokenResponse
);
export const revokeTokensHttpClient: HttpClient = createMockHttpClient(204);
export const createUserHttpClient: HttpClient = createMockHttpClient<CommunicationIdentity>(200, {
  id: "identity"
});
