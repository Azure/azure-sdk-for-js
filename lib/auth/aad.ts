// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import {
  ApplicationTokenCredentials, DeviceTokenCredentials, UserTokenCredentials, MSITokenCredentials
} from "ms-rest-azure";
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
  credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials;
  /**
   * @property {number} tokenRenewalMarginInSeconds - The number of seconds within which it is
   * good to renew the token. A constant set to 270 seconds (4.5 minutes). Adal has a set window
   * of 5 minutes when it refreshes the token from its token cache.
   */
  readonly tokenRenewalMarginInSeconds: number = 270;
  /**
   * @property {number} tokenValidTimeInSeconds - The number of seconds for which the
   * token is valid. A constant set to 3599 seconds (~1 hour). Adal has a set valid time of
   * 1 hour (3600 seconds) when it refreshes the access token.
   */
  readonly tokenValidTimeInSeconds: number = 3599;

  constructor(credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials) {
    if (!credentials ||
      (credentials &&
        !(credentials instanceof ApplicationTokenCredentials ||
          credentials instanceof UserTokenCredentials ||
          credentials instanceof DeviceTokenCredentials ||
          credentials instanceof MSITokenCredentials))) {
      throw new Error("'credentials' is a required parameter and must be an instance of " +
        "ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.");
    }
    if (credentials instanceof MSITokenCredentials) {
      credentials.resource = Constants.aadEventHubsAudience;
    }
    this.credentials = credentials;
  }

  /**
   * Gets the jwt token for the specified audience
   * @param {string} [audience] - The audience for which the token is desired. If not
   * provided then the Endpoint from the connection string will be applied.
   */
  getToken(audience?: string): Promise<TokenInfo> {
    const self = this;
    return new Promise<TokenInfo>((resolve, reject) => {
      self.credentials.getToken((err, result) => {
        if (err) {
          reject(err);
        }
        let expiresOn = Date.now();
        if (result.expiresOn && result.expiresOn instanceof Date) {
          expiresOn = result.expiresOn.getTime();
        }
        const expiry = Math.floor(expiresOn / 1000) +
          self.tokenValidTimeInSeconds - Constants.aadTokenValidityMarginSeconds;
        const tokenObj: TokenInfo = {
          expiry: expiry,
          tokenType: TokenType.CbsTokenTypeJwt,
          token: result.accessToken
        };
        resolve(tokenObj);
      });
    });
  }
}
