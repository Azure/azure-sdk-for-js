// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { delay } from "./helpers";

/**
 * A function that gets a promise of an access token and allows providing
 * options.
 *
 * @param options - the options to pass to the underlying token provider
 */
export type AccessTokenGetter = (
  scopes: string | string[],
  options: GetTokenOptions
) => Promise<AccessToken>;

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
  refreshWindowInMs: 1000 * 60 * 2 // Start refreshing 2m before expiry
};

/**
 * Calls to producer until the timeout is reached.
 * Prevents errors from bubbling up until the refresh timeout is reached.
 * Once the timeout is reached, errors will bubble up, and null return values will throw with the received "errorMessage".
 *
 * @param producer - The asynchronous function to call.
 * @param timeout - Unix time when to stop ignoring errors or null values.
 * @param errorMessage - Message to be used if the final value after the timeout is reached is still "null".
 * @returns - A promise that can be resolved with T or null until the time is reached, after which it will throw if it can't resolve with a value of the type T.
 */
async function tryUntilTimeout<T>(
  producer: () => Promise<T | null>,
  timeout: number
): Promise<T | null> {
  if (Date.now() < timeout) {
    try {
      return await producer();
    } catch {
      return null;
    }
  } else {
    const result = await producer();

    // Timeout is up, so throw if it's still null
    if (result === null) {
      throw new Error("operation timed out");
    }
    return result;
  }
}

/**
 * Retries an asynchronous function as often as the provided interval milliseconds,
 * until the provided Unix date timeout is reached.
 * Once the timeout is reached, errors will bubble up, and null return values will throw with the received "errorMessage".
 *
 * @param producer - The asynchronous function to call.
 * @param retryIntervalInMs - The time (in milliseconds) to wait between retry attempts.
 * @param refreshTimeout - The timestamp after which the refresh attempt will fail, throwing an exception.
 * @returns - A promise that, if it resolves, will resolve with the T type.
 */
async function retryUntilTimeout<T>(
  producer: () => Promise<T | null>,
  retryIntervalInMs: number,
  retryTimeout: number
): Promise<T> {
  let result = await tryUntilTimeout<T>(producer, retryTimeout);

  while (result === null) {
    await delay(retryIntervalInMs);
    result = await tryUntilTimeout(producer, retryTimeout);
  }

  return result;
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
export function createTokenCycler(
  credential: TokenCredential,
  tokenCyclerOptions?: Partial<TokenCyclerOptions>
): AccessTokenGetter {
  let refreshWorker: Promise<AccessToken> | null = null;
  let token: AccessToken | null = null;

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions
  };

  /**
   * This little holder defines several predicates that we use to construct
   * the rules of refreshing the token.
   */
  const self = {
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
        !self.isRefreshing &&
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
    }
  };

  /**
   * Starts a refresh job or returns the existing job if one is already
   * running.
   */
  function refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions
  ): Promise<AccessToken> {
    if (!self.isRefreshing) {
      // We bind `scopes` here to avoid passing it around a lot
      const tryGetAccessToken = (): Promise<AccessToken | null> =>
        credential.getToken(scopes, getTokenOptions);

      // Take advantage of promise chaining to insert an assignment to `token`
      // before the refresh can be considered done.
      refreshWorker = retryUntilTimeout<AccessToken>(
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
        .catch((error) => {
          // We also should reset the refresher if we enter a failed state.  All
          // existing awaiters will throw, but subsequent requests will start a
          // new retry chain.
          refreshWorker = null;
          token = null;
          throw new Error(`Failed to refresh access token: ${error.message}`);
        });
    }

    return refreshWorker as Promise<AccessToken>;
  }

  return async function(
    scopes: string | string[],
    tokenOptions: GetTokenOptions
  ): Promise<AccessToken> {
    //
    // Simple rules:
    // - If we MUST refresh, then return the refresh task, blocking
    //   the pipeline until a token is available.
    // - If we SHOULD refresh, then run refresh but don't return it
    //   (we can still use the cached token).
    // - Return the token, since it's fine if we didn't return in
    //   step 1.
    //

    if (self.mustRefresh) return refresh(scopes, tokenOptions);

    if (self.shouldRefresh) {
      refresh(scopes, tokenOptions);
    }

    return token as AccessToken;
  };
}
