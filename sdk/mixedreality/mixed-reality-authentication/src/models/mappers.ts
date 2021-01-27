// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, HttpResponse } from "@azure/core-http";
import { GetTokenResponse, WithResponse } from "./models";
import * as RestModel from "../generated/models";
import { retrieveJwtExpirationTimestamp } from "../util/jwt";

/**
 * Mapping token REST model to AccessToken.
 */
export const mapToAccessToken = (
  tokenResponse: RestModel.MixedRealityStsRestClientGetTokenResponse
): AccessToken => {
  return {
    expiresOnTimestamp: 0,
    token: tokenResponse.accessToken
  };
};

/**
 * Mapping GetToken REST model to SDK model.
 */
export const mapToGetTokenResponse = (
  tokenResponse: RestModel.MixedRealityStsRestClientGetTokenResponse
): GetTokenResponse => {
  const token = mapToAccessToken(tokenResponse);

  if (token.token) {
    // On a successful request, parse the expiration timestamp out of the
    // access token and set it on the result object.
    token.expiresOnTimestamp = retrieveJwtExpirationTimestamp(tokenResponse.accessToken);
  }

  return attachHttpResponse(token, tokenResponse._response);
};

/**
 * Attach http response to a model
 */
export const attachHttpResponse = <T>(
  model: T,
  httpResponse: HttpResponse & { bodyAsText: string; parsedBody: any }
): WithResponse<T> => {
  const { parsedBody, bodyAsText, ...r } = httpResponse;
  return Object.defineProperty(model, "_response", {
    value: r
  });
};
