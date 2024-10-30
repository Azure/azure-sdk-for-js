// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken } from "@azure/core-auth";
import type { GetTokenResponse } from "../generated";
import { retrieveJwtExpirationTimestamp } from "../util/jwt";

/**
 * Mapping token REST model to AccessToken.
 * @internal
 */
export const mapToAccessToken = (tokenResponse: GetTokenResponse): AccessToken => {
  const token: AccessToken = {
    expiresOnTimestamp: 0,
    token: tokenResponse.accessToken,
  };

  if (token.token) {
    // On a successful request, parse the expiration timestamp out of the
    // access token and set it on the result object.
    token.expiresOnTimestamp = retrieveJwtExpirationTimestamp(tokenResponse.accessToken);
  }

  return token;
};
