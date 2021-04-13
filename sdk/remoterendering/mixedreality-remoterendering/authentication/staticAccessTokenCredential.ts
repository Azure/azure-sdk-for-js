// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

export class StaticAccessTokenCredential implements TokenCredential {
  private token: AccessToken;

  constructor(token: AccessToken) {
    this.token = token;
  }

  getToken(_scopes: string | string[], _options?: GetTokenOptions): Promise<AccessToken | null> {
    return new Promise((resolve, _reject) => resolve(this.token));
  }
}
