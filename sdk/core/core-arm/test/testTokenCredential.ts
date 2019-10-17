// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-http";

export class TestTokenCredential implements TokenCredential {
  public token: string;
  public expiresOn: number;

  constructor(token: string, expiresOn?: Date) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn.getTime() : Date.now() + 60 * 60 * 1000;
  }

  async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn
    };
  }
}
