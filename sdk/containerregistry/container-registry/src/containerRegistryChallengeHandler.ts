// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import {
  AuthorizeRequestOnChallengeOptions,
  ChallengeCallbacks,
  AuthorizeRequestOptions,
} from "@azure/core-rest-pipeline";
import { parseWWWAuthenticate } from "./utils/wwwAuthenticateParser";
import {
  ContainerRegistryGetTokenOptions,
  ContainerRegistryRefreshTokenCredential,
} from "./containerRegistryTokenCredential";
import { AccessTokenRefresher, createTokenCycler } from "./utils/tokenCycler";

const fiveMinutesInMs = 5 * 60 * 1000;

/**
 * Handles challenge based authentication for Container Registry Service.
 *```
 *  The challenge-based authorization flow for ACR is illustrated in the following steps.
 *  For example, GET /api/v1/acr/repositories translates into the following calls.
 *      Step 1: GET /api/v1/acr/repositories
 *  Return Header: 401: www-authenticate header - Bearer realm="{url}",service="{serviceName}",scope="{scope}",error="invalid_token"
 *      Step 2: Retrieve the serviceName, scope from the WWW-Authenticate header.  (Parse the string.)
 *      Step 3: POST /api/oauth2/exchange
 *  Request Body : { service, scope, grant-type, aadToken with ARM scope }
 *  Response Body: { acrRefreshToken }
 *      Step 4: POST /api/oauth2/token
 *  Request Body: { acrRefreshToken, scope, grant-type }
 *  Response Body: { acrAccessToken }
 *      Step 5: GET /api/v1/acr/repositories
 *  Request Header: { Bearer acrTokenAccess }
 *```
 */
export class ChallengeHandler implements ChallengeCallbacks {
  private readonly cycler: AccessTokenRefresher<ContainerRegistryGetTokenOptions>;
  constructor(
    private credential: ContainerRegistryRefreshTokenCredential,
    private options: GetTokenOptions & { claims?: string } = {}
  ) {
    this.cycler = createTokenCycler(credential, {
      refreshWindowInMs: fiveMinutesInMs,
    });
  }

  authorizeRequest(_options: AuthorizeRequestOptions): Promise<void> {
    return Promise.resolve();
  }

  /**
   * Updates  the authentication context based on the challenge.
   */
  async authorizeRequestOnChallenge(options: AuthorizeRequestOnChallengeOptions): Promise<boolean> {
    // Once we're here, we've completed Step 1.
    const challenge = options.response?.headers.get("WWW-Authenticate");
    if (!challenge) {
      throw new Error("Failed to retrieve challenge from response headers");
    }
    // Step 2: Parse challenge string to retrieve serviceName and scope, where scope is the ACR Scope
    const { service, scope } = parseWWWAuthenticate(challenge);

    if (!service) {
      throw new Error("Failed to retrieve 'service' from challenge");
    }

    if (!scope) {
      throw new Error("Failed to retrieve 'scope' from challenge");
    }

    // Step 3: Exchange AAD Access Token for ACR Refresh Token
    //   For anonymous access, we send the request with grant_type=password and an empty ACR refresh token
    //   For non-anonymous access, we get an AAD token then exchange it for an ACR fresh token
    let grantType: "password" | "refresh_token";
    let acrRefreshToken: string;
    if (this.credential.isAnonymousAccess) {
      grantType = "password";
      acrRefreshToken = "";
    } else {
      grantType = "refresh_token";
      acrRefreshToken = (await this.cycler.getToken(scope, { ...options, service })).token;
    }

    // Step 4: Send in acrRefreshToken and get back acrAccessToken
    const acrAccessToken =
      await this.credential.tokenService.ExchangeAcrRefreshTokenForAcrAccessTokenAsync(
        acrRefreshToken,
        service,
        scope,
        grantType,
        this.options
      );

    // Step 5 - Authorize Request.  At this point we're done with AAD and using an ACR access token.
    options.request.headers.set("Authorization", `Bearer ${acrAccessToken}`);

    return true;
  }
}
