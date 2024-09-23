// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

/**
 * Represents a static access token credential.
 * @internal
 */
export class StaticAccessTokenCredential implements TokenCredential {
  private token: AccessToken;

  constructor(token: AccessToken) {
    this.token = token;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    return Promise.resolve(this.token);
  }
}
