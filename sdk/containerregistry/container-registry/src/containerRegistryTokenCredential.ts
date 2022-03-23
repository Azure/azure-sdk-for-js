// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { GeneratedClient } from "./generated";
import { base64decode } from "./utils/base64";

export interface ContainerRegistryGetTokenOptions extends GetTokenOptions {
  service: string;
}

export class ContainerRegistryRefreshTokenCredential implements TokenCredential {
  readonly tokenService: ContainerRegistryTokenService;
  readonly isAnonymousAccess: boolean;
  constructor(
    authClient: GeneratedClient,
    private authenticationScope: string,
    private credential?: TokenCredential
  ) {
    this.tokenService = new ContainerRegistryTokenService(authClient);
    this.isAnonymousAccess = !this.credential;
  }

  async getToken(
    _scopes: string | string[],
    options: ContainerRegistryGetTokenOptions
  ): Promise<AccessToken | null> {
    if (!this.credential) {
      return null;
    }

    const aadToken = await this.credential.getToken(this.authenticationScope, options);
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

export class ContainerRegistryTokenService {
  constructor(private authClient: GeneratedClient) {}

  async ExchangeAadAccessTokenForAcrRefreshTokenAsync(
    aadAccessToken: string,
    service: string,
    options: GetTokenOptions
  ): Promise<AccessToken> {
    const acrRefreshToken =
      await this.authClient.authentication.exchangeAadAccessTokenForAcrRefreshToken(
        "access_token",
        service,
        {
          ...options,
          accessToken: aadAccessToken,
        }
      );
    if (!acrRefreshToken.refreshToken) {
      throw new Error("Failed to exchange AAD access token for an ACR refresh token.");
    }

    // ACR refresh token expires after three hours
    const jwtParts = acrRefreshToken.refreshToken.split(".");
    if (jwtParts.length < 3) {
      throw new Error("Invalid JWT structure from ACR refresh token.");
    }
    if (!jwtParts[1]) {
      throw new Error("Invalid JWT payload.");
    }

    const jwtPayload = JSON.parse(base64decode(jwtParts[1]));
    if (!jwtPayload.exp) {
      throw new Error("Invalid JWT payload structure. No expiration.");
    }

    // JWT expiry is in seconds
    const expiry = Number.parseInt(jwtPayload.exp) * 1000;
    return {
      token: acrRefreshToken.refreshToken,
      expiresOnTimestamp: expiry,
    };
  }

  async ExchangeAcrRefreshTokenForAcrAccessTokenAsync(
    acrRefreshToken: string,
    service: string,
    scope: string,
    grantType: "refresh_token" | "password",
    options: GetTokenOptions
  ): Promise<string> {
    const acrAccessToken =
      await this.authClient.authentication.exchangeAcrRefreshTokenForAcrAccessToken(
        service,
        scope,
        acrRefreshToken,
        grantType,
        options
      );

    if (!acrAccessToken.accessToken) {
      throw new Error("Failed to exchange ACR refresh token for an ACR access token");
    }
    return acrAccessToken.accessToken;
  }
}
