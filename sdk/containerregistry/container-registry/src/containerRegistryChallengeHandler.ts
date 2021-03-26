// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import { PipelineRequest } from "@azure/core-rest-pipeline";
import { GetTokenOptions } from "@azure/identity";
import {
  BearerTokenChallengeResult,
  parseWWWAuthenticate
} from "./bearerTokenChallengeCredentialPolicy";
import { AcrAccessToken, AcrRefreshToken, GeneratedClient } from "./generated";
import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";

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
export class ChallengeHandler {
  constructor(
    private authClient: GeneratedClient,
    private options: GetTokenOptions & { claims?: string } = {}
  ) {}
  /**
   * Allows for the customization of the next request before its sent.
   * By default we won't be doing any changes to the initial challenge request.
   */
  // prepareRequest(request: PipelineRequest): Promise<void> {}
  /**
   * Updates  the authentication context based on the challenge.
   */
  async processChallenge(
    challenge: string,
    request: PipelineRequest
  ): Promise<BearerTokenChallengeResult | undefined> {
    // Once we're here, we've completed Step 1.

    // Step 2: Parse challenge string to retrieve serviceName and scope, where scope is the ACR Scope
    const { service, scope } = parseWWWAuthenticate(challenge);

    if (!service) {
      throw new Error("Failed to retrieve 'service' from challenge");
    }

    if (!scope) {
      throw new Error("Failed to retrieve 'scope' from challenge");
    }

    // Step 3: Exchange AAD Access Token for ACR Refresh Token
    const acrRefreshToken = await this.ExchangeAadAccessTokenForAcrRefreshTokenAsync(
      request,
      service
    );

    if (!acrRefreshToken) {
      throw new Error("Failed to retrieve 'service' from challenge");
    }

    // Step 4: Send in acrRefreshToken and get back acrAccessToken
    const acrAccessToken = await this.ExchangeAcrRefreshTokenForAcrAccessTokenAsync(
      acrRefreshToken,
      service,
      scope
    );

    // Step 5 - Authorize Request.  Note, we don't use SetAuthorizationHeader here, because it
    // sets an AAD access token header, and at this point we're done with AAD and using an ACR access token.
    request.headers.set("Authorization", `Bearer ${acrAccessToken}`);

    return undefined;
  }

  private async ExchangeAadAccessTokenForAcrRefreshTokenAsync(
    request: PipelineRequest,
    service: string
  ): Promise<string> {
    const aadAccessToken = this.GetAuthorizationToken(request);
    // const acrRefreshToken = await this.authClient.authentication.exchangeAadTokenForAcrRefreshToken(
    //   {
    //     aadAccesstoken: {
    //       grantType: "access_token",
    //       service,
    //       aadAccesstoken: aadAccessToken,
    //       tenant: "72f988bf-86f1-41af-91ab-2d7cd011db47"
    //     }
    //   }
    // );

    // TODO: (jeremymeng) revert custom sendOperationRequest call after FormData is working in core
    const payload = `grant_type=access_token&service=${encodeURIComponent(
      service
    )}&access_token=${encodeURIComponent(aadAccessToken)}`;
    const options: CustomAuthOptions = {
      payload
    };
    const acrRefreshToken = await this.authClient.sendOperationRequest<AcrRefreshToken>(
      { options: { ...this.options, ...options } },
      customExchangeAadTokenForAcrRefreshTokenOperationSpec
    );

    if (!acrRefreshToken.refreshToken) {
      throw new Error("Failed to exchange AAD access token for an ACR refresh token.");
    }
    return acrRefreshToken.refreshToken;
  }

  private async ExchangeAcrRefreshTokenForAcrAccessTokenAsync(
    acrRefreshToken: string,
    service: string,
    scope: string
  ): Promise<string> {
    // const acrAccessToken = await this.authClient.authentication.exchangeAcrRefreshTokenForAcrAccessToken(
    //   {
    //     acrRefreshToken: {
    //       grantType: "refresh_token",
    //       acrRefreshToken,
    //       service,
    //       scope
    //     }
    //   }
    // );

    // TODO: (jeremymeng) revert custom sendOperationRequest call after FormData is working in core
    const payload = `grant_type=refresh_token&service=${encodeURIComponent(
      service
    )}&refresh_token=${encodeURIComponent(acrRefreshToken)}&scope=${encodeURIComponent(scope)}`;
    const options: CustomAuthOptions = {
      payload
    };
    const acrAccessToken = await this.authClient.sendOperationRequest<AcrAccessToken>(
      { options: { ...this.options, ...options } },
      customExchangeAcrRefreshTokenForAcrAccessTokenOperationSpec
    );

    if (!acrAccessToken.accessToken) {
      throw new Error("Failed to exchange ACR refresh token for an ACR access token");
    }
    return acrAccessToken.accessToken;
  }

  private GetAuthorizationToken(request: PipelineRequest): string {
    const value = request.headers.get("Authorization");
    if (!value) {
      throw new Error("Failed to retrieve Authentication header from request.");
    }

    return value.substr("Bearer ".length);
  }
}

const customExchangeAadTokenForAcrRefreshTokenOperationSpec: OperationSpec = {
  path: "/oauth2/exchange",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AcrRefreshToken
    },
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  //formDataParameters: [Parameters.aadAccesstoken],
  requestBody: {
    parameterPath: ["options", "payload"],
    mapper: {
      type: {
        name: "Stream"
      }
    }
  },
  urlParameters: [Parameters.url],
  headerParameters: [Parameters.contentType3, Parameters.accept4],
  serializer: createSerializer(Mappers, /* isXml */ false)
};

interface CustomAuthOptions extends OperationOptions {
  payload: string;
}

const customExchangeAcrRefreshTokenForAcrAccessTokenOperationSpec: OperationSpec = {
  path: "/oauth2/token",
  httpMethod: "POST",
  responses: {
    200: {
      bodyMapper: Mappers.AcrAccessToken
    },
    default: {
      bodyMapper: Mappers.AcrErrors
    }
  },
  //formDataParameters: [Parameters.acrRefreshToken],
  requestBody: {
    parameterPath: ["options", "payload"],
    mapper: {
      type: {
        name: "Stream"
      }
    }
  },
  urlParameters: [Parameters.url],
  headerParameters: [Parameters.contentType3, Parameters.accept4],
  serializer: createSerializer(Mappers, /* isXml */ false)
};
