// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { TokenCredential, AccessToken } from "@azure/core-auth";

export class StaticAccessTokenCredential implements TokenCredential {
  // AccessToken is an object with two properties:
  // - A "token" property with a string value.
  // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.
  constructor(private accessToken: string) {}
  async getToken(): Promise<AccessToken> {
    return {
      expiresOnTimestamp: Date.now() + 10000,
      token: this.accessToken,
    };
  }
}
