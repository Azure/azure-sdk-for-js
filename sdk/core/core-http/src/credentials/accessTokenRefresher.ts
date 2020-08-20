// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential, GetTokenOptions } from "@azure/core-auth";

/**
 * Helps the core-http token authentication policies with requesting a new token if we're not currently waiting for a new token.
 */
export class AccessTokenRefresher {
  private promise: Promise<AccessToken | undefined> | undefined;
  private lastCalled = 0;

  constructor(
    private credential: TokenCredential,
    private scopes: string | string[],
    private requiredMillisecondsBeforeNewRefresh: number = 30000
  ) {}

  /**
   * Returns true if the required milliseconds(defaulted to 30000) have been passed signifying
   * that we are ready for a new refresh.
   *
   * @returns {boolean}
   */
  public isReady(): boolean {
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
    const token = await this.credential.getToken(this.scopes, options);
    this.promise = undefined;
    return token || undefined;
  }

  /**
   * Requests a new token if we're not currently waiting for a new token.
   * Returns null if the required time between each call hasn't been reached.
   * @param options getToken options
   */
  public refresh(options: GetTokenOptions): Promise<AccessToken | undefined> {
    if (!this.promise) {
      this.promise = this.getToken(options);
    }

    return this.promise;
  }
}
