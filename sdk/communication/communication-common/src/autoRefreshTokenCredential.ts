// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationGetTokenOptions, TokenCredential } from "./communicationTokenCredential";
import { AbortSignalLike } from "@azure/abort-controller";
import { AccessToken } from "@azure/core-auth";
import { parseToken } from "./tokenParser";

/**
 * Options for auto-refreshing a Communication Token credential.
 */
export interface CommunicationTokenRefreshOptions {
  /**
   * Callback function that returns a string JWT token acquired from the Communication Identity API.
   * The returned token must be valid (expiration date must be in the future).
   */
  tokenRefresher: (abortSignal?: AbortSignalLike) => Promise<string>;

  /**
   * Optional token to initialize.
   */
  token?: string;

  /**
   * Indicates whether the token should be proactively renewed prior to expiry or only renew on demand.
   * By default false.
   */
  refreshProactively?: boolean;
}

const expiredToken = { token: "", expiresOnTimestamp: -10 };
const minutesToMs = (minutes: number): number => minutes * 1000 * 60;
const defaultExpiringSoonInterval = minutesToMs(10);
const defaultRefreshAfterLifetimePercentage = 0.5;

export class AutoRefreshTokenCredential implements TokenCredential {
  private readonly refresh: (abortSignal?: AbortSignalLike) => Promise<string>;
  private readonly refreshProactively: boolean;
  private readonly expiringSoonIntervalInMs: number = defaultExpiringSoonInterval;
  private readonly refreshAfterLifetimePercentage = defaultRefreshAfterLifetimePercentage;

  private currentToken: AccessToken;
  private activeTimeout: ReturnType<typeof setTimeout> | undefined;
  private activeTokenFetching: Promise<string> | null = null;
  private activeTokenUpdating: Promise<void> | null = null;
  private disposed = false;

  constructor(refreshArgs: CommunicationTokenRefreshOptions) {
    const { tokenRefresher, token, refreshProactively } = refreshArgs;

    this.refresh = tokenRefresher;
    this.currentToken = token ? parseToken(token) : expiredToken;
    this.refreshProactively = refreshProactively ?? false;

    if (this.refreshProactively) {
      this.scheduleRefresh();
    }
  }

  public async getToken(options?: CommunicationGetTokenOptions): Promise<AccessToken> {
    if (!this.isTokenExpiringSoon(this.currentToken)) {
      return this.currentToken;
    }

    if (!this.isTokenValid(this.currentToken)) {
      const updatePromise = this.updateTokenAndReschedule(options?.abortSignal);
      await updatePromise;
    }

    return this.currentToken;
  }

  public dispose(): void {
    this.disposed = true;
    this.activeTokenFetching = null;
    this.activeTokenUpdating = null;
    this.currentToken = expiredToken;
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
    }
  }

  private async updateTokenAndReschedule(abortSignal?: AbortSignalLike): Promise<void> {
    if (this.activeTokenUpdating) {
      return this.activeTokenUpdating;
    }
    this.activeTokenUpdating = this.refreshTokenAndReschedule(abortSignal);
    try {
      await this.activeTokenUpdating;
    } finally {
      this.activeTokenUpdating = null;
    }
  }

  private async refreshTokenAndReschedule(abortSignal?: AbortSignalLike): Promise<void> {
    const newToken = await this.refreshToken(abortSignal);

    if (!this.isTokenValid(newToken)) {
      throw new Error("The token returned from the tokenRefresher is expired.");
    }

    this.currentToken = newToken;
    if (this.refreshProactively) {
      this.scheduleRefresh();
    }
  }

  private async refreshToken(abortSignal?: AbortSignalLike): Promise<AccessToken> {
    try {
      if (!this.activeTokenFetching) {
        this.activeTokenFetching = this.refresh(abortSignal);
      }
      return parseToken(await this.activeTokenFetching);
    } finally {
      this.activeTokenFetching = null;
    }
  }

  private scheduleRefresh(): void {
    if (this.disposed) {
      return;
    }
    if (this.activeTimeout) {
      clearTimeout(this.activeTimeout);
    }
    const tokenTtlInMs = this.currentToken.expiresOnTimestamp - Date.now();
    let timespanInMs = null;

    if (this.isTokenExpiringSoon(this.currentToken)) {
      // Schedule the next refresh for when it reaches a certain percentage of the remaining lifetime.
      timespanInMs = tokenTtlInMs * this.refreshAfterLifetimePercentage;
    } else {
      // Schedule the next refresh for when it gets in to the soon-to-expire window.
      timespanInMs = tokenTtlInMs - this.expiringSoonIntervalInMs;
    }

    this.activeTimeout = setTimeout(() => this.updateTokenAndReschedule(), timespanInMs);
  }

  private isTokenValid(token: AccessToken): boolean {
    return token && Date.now() < token.expiresOnTimestamp;
  }

  private isTokenExpiringSoon(token: AccessToken): boolean {
    return !token || Date.now() >= token.expiresOnTimestamp - this.expiringSoonIntervalInMs;
  }
}
