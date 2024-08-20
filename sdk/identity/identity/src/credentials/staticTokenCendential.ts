import { TokenCredential, AccessToken } from "@azure/core-auth";

export class StaticTokenCredential implements TokenCredential {
  // AccessToken is an object with two properties:
  // - A "token" property with a string value.
  // - And an "expiresOnTimestamp" property with a numeric unix timestamp as its value.
  constructor(private accessToken: AccessToken) {}
  async getToken(): Promise<AccessToken> {
    return this.accessToken;
  }
}
