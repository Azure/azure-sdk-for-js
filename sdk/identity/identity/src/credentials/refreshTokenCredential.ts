// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredentialRefresher } from "@azure/core-auth";
import { delay } from "@azure/core-util";

/**
 * Refresh settings
 */
export interface RefreshOptions {
  /**
   * The window of time before token expiration during which the token will be
   * considered unusable due to risk of the token expiring before sending the
   * request.
   *
   * This will only become meaningful if the refresh fails for over
   * (refreshWindow - forcedRefreshWindow) milliseconds.
   */
  forcedRefreshWindowInMs: number;
  /**
   * Interval in milliseconds to retry failed token refreshes.
   */
  retryIntervalInMs: number;
  /**
   * The window of time before token expiration during which
   * we will attempt to refresh the token.
   */
  refreshWindowInMs: number;
}

/**
 * Represents a credential capable of refreshing an access token over time.
 * Credentials like this have a `refreshToken` method, that calls `getToken` if a token has never been retrieved before, or if the previously retrieved token is about to expire.
 */
export abstract class RefreshTokenCredential implements TokenCredentialRefresher {
  /**
   * Gets the token provided by this credential.
   *
   * This method is called automatically by Azure SDK client libraries. You may call this method
   * directly, but you must also handle token caching and token refreshing.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  abstract getToken(
    scopes: string | string[],
    options?: GetTokenOptions
  ): Promise<AccessToken | null>;

  private refreshWorker: Promise<AccessToken> | null = null;
  private token: AccessToken | null = null;

  /**
   * Default refresh settings
   */
  public refreshOptions: RefreshOptions = {
    forcedRefreshWindowInMs: 1000, // Force waiting for a refresh 1s before the token expires
    retryIntervalInMs: 3000, // Allow refresh attempts every 3s
    refreshWindowInMs: 1000 * 60 * 2 // Start refreshing 2m before expiry
  };

  /**
   * Produces true if a refresh job is currently in progress.
   */
  private get isRefreshing(): boolean {
    return this.refreshWorker !== null;
  }
  /**
   * Produces true if the refresher SHOULD refresh (we are within the refresh
   * window and not already refreshing)
   */
  private get shouldRefresh(): boolean {
    return (
      !this.isRefreshing &&
      (this.token?.expiresOnTimestamp ?? 0) - this.refreshOptions.refreshWindowInMs < Date.now()
    );
  }

  /**
   * Produces true if the refresher MUST refresh (null or nearly-expired
   * token).
   */
  private get mustRefresh(): boolean {
    return (
      this.token === null ||
      this.token.expiresOnTimestamp - this.refreshOptions.forcedRefreshWindowInMs < Date.now()
    );
  }

  /**
   * Converts an an unreliable access token getter (which may resolve with null)
   * into an AccessTokenGetter by retrying the unreliable getter in a regular
   * interval.
   *
   * @param getAccessToken - A function that produces a promise of an access token that may fail by returning null.
   * @param retryIntervalInMs - The time (in milliseconds) to wait between retry attempts.
   * @param refreshTimeout - The timestamp after which the refresh attempt will fail, throwing an exception.
   * @returns - A promise that, if it resolves, will resolve with an access token.
   */
  private async beginRefresh(
    getAccessToken: () => Promise<AccessToken | null>,
    retryIntervalInMs: number,
    refreshTimeout: number
  ): Promise<AccessToken> {
    // This wrapper handles exceptions gracefully as long as we haven't exceeded
    // the timeout.
    async function tryGetAccessToken(): Promise<AccessToken | null> {
      if (Date.now() < refreshTimeout) {
        try {
          return await getAccessToken();
        } catch {
          return null;
        }
      } else {
        const finalToken = await getAccessToken();

        // Timeout is up, so throw if it's still null
        if (finalToken === null) {
          throw new Error("Failed to refresh access token.");
        }

        return finalToken;
      }
    }

    let token: AccessToken | null = await tryGetAccessToken();
    while (token === null) {
      await delay(retryIntervalInMs);
      token = await tryGetAccessToken();
    }
    return token;
  }

  private async refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions
  ): Promise<AccessToken> {
    if (!this.isRefreshing) {
      // We bind `scopes` here to avoid passing it around a lot
      const tryGetAccessToken = (): Promise<AccessToken | null> =>
        this.getToken(scopes, getTokenOptions);

      // Take advantage of promise chaining to insert an assignment to `token`
      // before the refresh can be considered done.
      this.refreshWorker = this.beginRefresh(
        tryGetAccessToken,
        this.refreshOptions.retryIntervalInMs,
        // If we don't have a token, then we should timeout immediately
        this.token?.expiresOnTimestamp ?? Date.now()
      )
        .then((_token) => {
          this.refreshWorker = null;
          this.token = _token;
          return this.token;
        })
        .catch((reason) => {
          // We also should reset the refresher if we enter a failed state.  All
          // existing awaiters will throw, but subsequent requests will start a
          // new retry chain.
          this.refreshWorker = null;
          this.token = null;
          throw reason;
        });
    }

    return this.refreshWorker as Promise<AccessToken>;
  }

  /**
   * Retrieves previously stored token, or retrieves a new token.
   * It will attempt to retrieve a new token earlier than the expiration date of the previous token.
   *
   * This method is called automatically by Azure SDK client libraries.
   *
   * @param scopes - The list of scopes for which the token will have access.
   * @param options - The options used to configure any requests this
   *                TokenCredential implementation might make.
   */
  public async refreshToken(
    scopes: string | string[],
    tokenOptions: GetTokenOptions
  ): Promise<AccessToken> {
    // Simple rules:
    //
    // - If we MUST refresh, then return the refresh task, blocking
    //   the pipeline until a token is available.
    // - If we SHOULD refresh, then run refresh but don't return it
    //   (we can still use the cached token).
    // - Return the token, since it's fine if we didn't return in
    //   step 1.
    //

    if (this.mustRefresh) return this.refresh(scopes, tokenOptions);

    if (this.shouldRefresh) {
      this.refresh(scopes, tokenOptions);
    }

    return this.token as AccessToken;
  }
}
