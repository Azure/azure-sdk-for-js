// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ApplicationTokenCredentials,
  DeviceTokenCredentials,
  UserTokenCredentials,
  MSITokenCredentials
} from "@azure/ms-rest-nodeauth";
import { TokenInfo, TokenType, TokenProvider } from "./token";
import * as Constants from "../util/constants";

/**
 * Defines the AAD (Azure ActiveDirectory) TokenProvider.
 * @class AadTokenProvider
 */
export class AadTokenProvider implements TokenProvider {
  /**
   * @property {(ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials)} credentials - The credentials object after successful authentication with AAD.
   */
  credentials:
    | ApplicationTokenCredentials
    | UserTokenCredentials
    | DeviceTokenCredentials
    | MSITokenCredentials;
  /**
   * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is
   * good to renew the token. The constant is set to 270 seconds (4.5 minutes).
   * This is because ADAL (`adal-node`) will return token from cache if it is not within 5 minutes of token expiration.
   * On renewing token within last 4.5 minutes of refresh token, ADAL will be forced to get new access token and will be valid for the next 1 hour.
   * For more context, please see https://github.com/AzureAD/azure-activedirectory-library-for-nodejs/blob/81ff31dd612cae6cd69a9a7452171b7af792be9f/lib/cache-driver.js#L329
   */
  readonly tokenRenewalMarginInSeconds: number = 270;
  /**
   * @property {number} tokenValidTimeInSeconds - The number of seconds for which the
   * token is valid. A constant set to 3599 seconds (~1 hour). Adal has a set valid time of
   * 1 hour (3600 seconds) when it refreshes the access token.
   */
  readonly tokenValidTimeInSeconds: number = 3599;

  constructor(
    credentials:
      | ApplicationTokenCredentials
      | UserTokenCredentials
      | DeviceTokenCredentials
      | MSITokenCredentials
  ) {
    if (
      !credentials ||
      (credentials &&
        !(
          credentials instanceof ApplicationTokenCredentials ||
          credentials instanceof UserTokenCredentials ||
          credentials instanceof DeviceTokenCredentials ||
          credentials instanceof MSITokenCredentials
        ))
    ) {
      throw new TypeError(
        "'credentials' is a required parameter and must be an instance of " +
          "ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials."
      );
    }
    this.credentials = credentials;
  }

  /**
   * Gets the jwt token for the specified audience
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  async getToken(audience?: string): Promise<TokenInfo> {
    const self = this;
    const result = await self.credentials.getToken();
    let expiresOn = Date.now();
    if (result.expiresOn && result.expiresOn instanceof Date) {
      // TODO: Fix issue where expiry time for MSI based credentials' tokens are returned in seconds and not milliseconds
      expiresOn = result.expiresOn.getTime();
    }
    const expiry =
      Math.floor(expiresOn / 1000) +
      self.tokenValidTimeInSeconds -
      Constants.aadTokenValidityMarginSeconds;
    const tokenObj: TokenInfo = {
      expiry: expiry,
      tokenType: TokenType.CbsTokenTypeJwt,
      token: result.accessToken
    };

    return tokenObj;
  }
}
