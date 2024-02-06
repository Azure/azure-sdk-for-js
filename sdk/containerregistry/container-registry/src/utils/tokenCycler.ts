// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";

function delay<T>(t: number, value?: T): Promise<T | void> {
  return new Promise((resolve) => setTimeout(() => resolve(value), t));
}
/**
 * A function that gets a promise of an access token and allows providing
 * options.
 *
 * @param options - the options to pass to the underlying token provider
 */
export type AccessTokenGetter<T extends GetTokenOptions> = (
  scopes: string | string[],
  options: T
) => Promise<AccessToken>;

/**
 * The response of the
 */
export interface AccessTokenRefresher<T extends GetTokenOptions> {
  cachedToken?: AccessToken;
  getToken: AccessTokenGetter<T>;
}

export interface TokenCyclerOptions {
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

// Default options for the cycler if none are provided
export const DEFAULT_CYCLER_OPTIONS: TokenCyclerOptions = {
  forcedRefreshWindowInMs: 1000, // Force waiting for a refresh 1s before the token expires
  retryIntervalInMs: 3000, // Allow refresh attempts every 3s
  refreshWindowInMs: 1000 * 60 * 2, // Start refreshing 2m before expiry
};

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
async function beginRefresh(
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

/**
 * Creates a token cycler from a credential, scopes, and optional settings.
 *
 * A token cycler represents a way to reliably retrieve a valid access token
 * from a TokenCredential. It will handle initializing the token, refreshing it
 * when it nears expiration, and synchronizes refresh attempts to avoid
 * concurrency hazards.
 *
 * @param credential - the underlying TokenCredential that provides the access
 * token
 * @param tokenCyclerOptions - optionally override default settings for the cycler
 *
 * @returns - a function that reliably produces a valid access token
 */
export function createTokenCycler<T extends GetTokenOptions>(
  credential: TokenCredential,
  tokenCyclerOptions?: Partial<TokenCyclerOptions>
): AccessTokenRefresher<T> {
  let refreshWorker: Promise<AccessToken> | null = null;
  let token: AccessToken | null = null;

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions,
  };

  /**
   * This little holder defines several predicates that we use to construct
   * the rules of refreshing the token.
   */
  const cycler = {
    /**
     * Produces true if a refresh job is currently in progress.
     */
    get isRefreshing(): boolean {
      return refreshWorker !== null;
    },
    /**
     * Produces true if the cycler SHOULD refresh (we are within the refresh
     * window and not already refreshing)
     */
    get shouldRefresh(): boolean {
      return (
        !cycler.isRefreshing &&
        (token?.expiresOnTimestamp ?? 0) - options.refreshWindowInMs < Date.now()
      );
    },
    /**
     * Produces true if the cycler MUST refresh (null or nearly-expired
     * token).
     */
    get mustRefresh(): boolean {
      return (
        token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now()
      );
    },
  };

  /**
   * Starts a refresh job or returns the existing job if one is already
   * running.
   */
  function refresh(scopes: string | string[], getTokenOptions: T): Promise<AccessToken> {
    if (!cycler.isRefreshing) {
      // We bind `scopes` here to avoid passing it around a lot
      const tryGetAccessToken = (): Promise<AccessToken | null> =>
        credential.getToken(scopes, getTokenOptions);

      // Take advantage of promise chaining to insert an assignment to `token`
      // before the refresh can be considered done.
      refreshWorker = beginRefresh(
        tryGetAccessToken,
        options.retryIntervalInMs,
        // If we don't have a token, then we should timeout immediately
        token?.expiresOnTimestamp ?? Date.now()
      )
        .then((_token) => {
          refreshWorker = null;
          token = _token;
          return token;
        })
        .catch((reason) => {
          // We also should reset the refresher if we enter a failed state.  All
          // existing awaiters will throw, but subsequent requests will start a
          // new retry chain.
          refreshWorker = null;
          token = null;
          throw reason;
        });
    }

    return refreshWorker as Promise<AccessToken>;
  }

  return {
    get cachedToken(): AccessToken | undefined {
      return token || undefined;
    },
    getToken: async (scopes: string | string[], tokenOptions: T): Promise<AccessToken> => {
      //
      // Simple rules:
      // - If we MUST refresh, then return the refresh task, blocking
      //   the pipeline until a token is available.
      // - If we SHOULD refresh, then run refresh but don't return it
      //   (we can still use the cached token).
      // - Return the token, since it's fine if we didn't return in
      //   step 1.
      //
      if (cycler.mustRefresh) return refresh(scopes, tokenOptions);

      if (cycler.shouldRefresh) {
        refresh(scopes, tokenOptions);
      }

      return token as AccessToken;
    },
  };
}
