// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AbortSignalLike, AccessToken } from "@azure/core-http";
import { parseToken } from "./tokenParser";
import { UserCredential } from "./communicationUserCredential";

/**
 * Options for auto-refreshing a Communication user credential.
 */
export interface RefreshOptions {
  /**
   * Function that returns a user token acquired from the Communication configuration SDK.
   */
  tokenRefresher: (abortSignal?: AbortSignalLike) => Promise<string>;

  /**
   * Optional user token to initialize.
   */
  initialToken?: string;

  /**
   * Indicates whether the user token should be proactively renewed prior to expiry or only renew on demand.
   * By default false.
   */
  refreshProactively?: boolean;
}

const expiredToken = { token: "", expiresOnTimestamp: -10 };
const minutesToMs = (minutes: number): number => minutes * 1000 * 60;
const defaultRefreshingInterval = minutesToMs(10);

export class AutoRefreshUserCredential implements UserCredential {
  private readonly refresh: (abortSignal?: AbortSignalLike) => Promise<string>;
  private readonly refreshProactively: boolean;
  private readonly refreshingIntervalInMs: number = defaultRefreshingInterval;

  private currentToken: AccessToken;
  private activeTimeout: ReturnType<typeof setTimeout> | undefined;
  private activeTokenFetching: Promise<string> | null = null;
  private activeTokenUpdating: Promise<void> | null = null;
  private disposed = false;

  constructor(refreshArgs: RefreshOptions) {
    const { tokenRefresher, initialToken, refreshProactively } = refreshArgs;

    this.refresh = tokenRefresher;
    this.currentToken = initialToken ? parseToken(initialToken) : expiredToken;
    this.refreshProactively = refreshProactively ?? false;

    if (this.refreshProactively) {
      this.scheduleRefresh();
    }
  }

  public async getToken(abortSignal?: AbortSignalLike): Promise<AccessToken> {
    if (!this.isCurrentTokenExpiringSoon) {
      return this.currentToken;
    }

    const updatePromise = this.updateTokenAndReschedule(abortSignal);

    if (!this.isCurrentTokenValid) {
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
    this.currentToken = await this.refreshToken(abortSignal);
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
    const timespanInMs =
      this.currentToken.expiresOnTimestamp - Date.now() - this.refreshingIntervalInMs;
    this.activeTimeout = setTimeout(() => this.updateTokenAndReschedule(), timespanInMs);
  }

  private get isCurrentTokenValid(): boolean {
    return this.currentToken && Date.now() < this.currentToken.expiresOnTimestamp;
  }

  private get isCurrentTokenExpiringSoon(): boolean {
    return (
      !this.currentToken ||
      Date.now() >= this.currentToken.expiresOnTimestamp - this.refreshingIntervalInMs
    );
  }
}
