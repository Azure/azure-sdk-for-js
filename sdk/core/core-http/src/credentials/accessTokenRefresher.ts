import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-auth";

/**
 * Helps the core-http token authentication policies with requesting a new token if we're not currently waiting for a new token.
 */
export class AccessTokenRefresher {
  private promise: Promise<AccessToken | undefined> | undefined;
  private lastCalled: number | undefined;

  constructor(
    private credential: TokenCredential,
    private scopes: string | string[],
    private requiredMillisecondsBeforeNewRefresh: number
  ) {}

  private readyForNewRefresh() {
    // We're only ready for a new refresh if the required milliseconds have passed.
    return (
      !this.lastCalled || Date.now() - this.lastCalled > this.requiredMillisecondsBeforeNewRefresh
    );
  }

  /**
   * Stores the time in which it is called,
   * then requests a new token,
   * then sets this.promise to undefined,
   * then returns the token.
   * @param options getToken options
   */
  private async getToken(options: GetTokenOptions): Promise<AccessToken | undefined> {
    this.lastCalled = Date.now();
    const token = (await this.credential.getToken(this.scopes, options)) || undefined;
    this.promise = undefined;
    return token;
  }

  /**
   * Requests a new token if we're not currently waiting for a new token.
   * Returns null if the required time between each call hasn't been reached.
   * @param options getToken options
   */
  public refresh(options: GetTokenOptions): Promise<AccessToken | undefined> | null {
    if (this.promise) {
      return this.promise;
    } else {
      if (this.readyForNewRefresh()) {
        this.promise = this.getToken(options);
        return this.promise;
      } else {
        return null;
      }
    }
  }
}
