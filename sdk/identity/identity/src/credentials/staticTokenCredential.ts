// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { TokenCredentialOptions } from "../client/identityClient";

/**
 * Optional parameters for the {@link StaticTokenCredential} class.
 */
export interface StaticTokenCredentialOptions extends TokenCredentialOptions {}

/**
 * An AAD credential with a prefetched token for an AAD application.
 */
export class StaticTokenCredential implements TokenCredential {
  private accessToken: AccessToken;

  /**
   * Creates a StaticTokenCredential
   *
   * @param tokenString - The string of prefetched token
   * @param accessToken - The prefetched token
   */

  constructor(accessToken: AccessToken, _options?: StaticTokenCredentialOptions) {
    this.accessToken = accessToken;
  }

  /**
   * Authenticates with Azure Active Directory and returns an access token if successful.
   * If authentication fails, a {@link CredentialUnavailableError} will be thrown with the details of the failure.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this TokenCredential implementation might make.
   */
  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken> {
    return this.accessToken;
  }
}
