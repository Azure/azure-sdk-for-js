// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createSerializer, OperationOptions, OperationSpec } from "@azure/core-client";
import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { AcrAccessToken, AcrRefreshToken, GeneratedClient } from "./generated";
import * as Mappers from "./generated/models/mappers";
import * as Parameters from "./generated/models/parameters";

const threeHoursInMs = 3 * 60 * 60 * 1000;

export interface ContainerRegistryGetTokenOptions extends GetTokenOptions {
  service: string;
}

const credentialScopes = "https://management.core.windows.net/.default";

export class ContainerRegistryRefreshTokenCredential implements TokenCredential {
  readonly tokenService: ContainerRegistryTokenService;
  readonly isAnonymousAccess: boolean;
  constructor(authClient: GeneratedClient, private credential?: TokenCredential) {
    this.tokenService = new ContainerRegistryTokenService(authClient);
    this.isAnonymousAccess = !Boolean(this.credential);
  }

  async getToken(
    _scopes: string | string[],
    options: ContainerRegistryGetTokenOptions
  ): Promise<AccessToken | null> {
    if (!this.credential) {
      return null;
    }

    const aadToken = await this.credential.getToken(credentialScopes, options);
    if (!aadToken) {
      throw new Error("Failed to retrieve AAD token.");
    }

    return this.tokenService.ExchangeAadAccessTokenForAcrRefreshTokenAsync(
      aadToken.token,
      options.service,
      options
    );
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
  // formDataParameters: [Parameters.aadAccesstoken],
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
  // formDataParameters: [Parameters.acrRefreshToken],
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

export class ContainerRegistryTokenService {
  constructor(private authClient: GeneratedClient) {}

  async ExchangeAadAccessTokenForAcrRefreshTokenAsync(
    aadAccessToken: string,
    service: string,
    options: GetTokenOptions
  ): Promise<AccessToken> {
    // const acrRefreshToken = await this.authClient.authentication.exchangeAadTokenForAcrRefreshToken(
    //   {
    //     aadAccesstoken: {
    //       grantType: "access_token",
    //       service,
    //       aadAccesstoken: aadAccessToken,
    //     }
    //   }
    // );

    // TODO: (jeremymeng) revert custom sendOperationRequest call after FormData is working in core
    const payload = `grant_type=access_token&service=${encodeURIComponent(
      service
    )}&access_token=${encodeURIComponent(aadAccessToken)}`;
    const customOptions: CustomAuthOptions = {
      payload
    };
    const acrRefreshToken = await this.authClient.sendOperationRequest<AcrRefreshToken>(
      { options: { ...options, ...customOptions } },
      customExchangeAadTokenForAcrRefreshTokenOperationSpec
    );

    if (!acrRefreshToken.refreshToken) {
      throw new Error("Failed to exchange AAD access token for an ACR refresh token.");
    }

    // ACR refresh token expires after three hours
    return {
      token: acrRefreshToken.refreshToken,
      expiresOnTimestamp: Date.now() + threeHoursInMs
    };
  }

  async ExchangeAcrRefreshTokenForAcrAccessTokenAsync(
    acrRefreshToken: string,
    service: string,
    scope: string,
    grantType: "refresh_token" | "password",
    options: GetTokenOptions
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
    const payload = `grant_type=${grantType}&service=${encodeURIComponent(service)}&refresh_token=${
      acrRefreshToken ? encodeURIComponent(acrRefreshToken) : ""
    }&scope=${encodeURIComponent(scope)}`;
    const customOptions: CustomAuthOptions = {
      payload
    };
    const acrAccessToken = await this.authClient.sendOperationRequest<AcrAccessToken>(
      { options: { ...options, ...customOptions } },
      customExchangeAcrRefreshTokenForAcrAccessTokenOperationSpec
    );

    if (!acrAccessToken.accessToken) {
      throw new Error("Failed to exchange ACR refresh token for an ACR access token");
    }
    return acrAccessToken.accessToken;
  }
}
