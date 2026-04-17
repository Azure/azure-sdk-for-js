// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/identity";

/**
 * A TokenCredential that always returns a fixed, pre-fetched token.
 * Used to avoid re-authenticating when the token is already cached.
 */
export class StaticTokenCredential implements TokenCredential {
  private _token: AccessToken;

  constructor(token: AccessToken) {
    this._token = token;
  }

  async getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken> {
    return this._token;
  }
}
