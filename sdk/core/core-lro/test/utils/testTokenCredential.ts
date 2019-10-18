import { TokenCredential, GetTokenOptions, AccessToken, TokenRequestContext } from "@azure/core-http";

export class TestTokenCredential implements TokenCredential {
  public token: string;
  public expiresOn: number;

  constructor(token: string, expiresOn?: Date) {
    this.token = token;
    this.expiresOn = expiresOn ? expiresOn.getTime() : Date.now() + 60 * 60 * 1000;
  }

  async getToken(
    _requestContext: TokenRequestContext,
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    return {
      token: this.token,
      expiresOnTimestamp: this.expiresOn
    };
  }
}
