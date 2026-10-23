// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, GetTokenOptions, TokenCredential } from "@azure/core-auth";
import { delay } from "@azure/core-util";

/**
 * A function that gets a promise of an access token and allows providing
 * options.
 *
 * @param options - the options to pass to the underlying token provider
 */
export type AccessTokenGetter = (
  scopes: string | string[],
  options: GetTokenOptions,
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
  refreshTimeout: number,
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

interface RefreshWorker {
  promise: Promise<AccessToken>;
  hasClaims: boolean;
}

function getTokenRequestIdentityKey(
  scopes: string | string[],
  getTokenOptions: GetTokenOptions,
): string {
  const proofOfPossessionOptions = getTokenOptions.proofOfPossessionOptions;
  return JSON.stringify({
    scopes: typeof scopes === "string" ? [scopes] : [...scopes],
    tenantId: getTokenOptions.tenantId,
    claims: getTokenOptions.claims,
    enableCae: getTokenOptions.enableCae === true,
    proofOfPossessionOptions: proofOfPossessionOptions && {
      nonce: proofOfPossessionOptions.nonce,
      resourceRequestMethod: proofOfPossessionOptions.resourceRequestMethod,
      resourceRequestUrl: proofOfPossessionOptions.resourceRequestUrl,
    },
  });
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
  tokenCyclerOptions?: Partial<TokenCyclerOptions>,
): AccessTokenGetter {
  const refreshWorkers = new Map<string, RefreshWorker>();
  let latestRefreshWorker: RefreshWorker | null = null;
  let token: AccessToken | null = null;
  let tenantId: string | undefined;

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
      // Only the worker that still owns the cache update should suppress a
      // proactive refresh. Superseded incompatible workers may still be in
      // flight, but they cannot update `token` when they finish.
      return latestRefreshWorker !== null;
    },
    /**
     * Produces true if the cycler SHOULD refresh (we are within the refresh
     * window and not already refreshing)
     */
    get shouldRefresh(): boolean {
      if (token === null) {
        return true;
      }
      if (cycler.isRefreshing) {
        return false;
      }
      if (token.refreshAfterTimestamp && token.refreshAfterTimestamp < Date.now()) {
        return true;
      }

      return token.expiresOnTimestamp - options.refreshWindowInMs < Date.now();
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
   * Starts a refresh job or returns an existing job with the same token
   * request identity. Incompatible requests must not share credentials.
   */
  function refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions,
  ): Promise<AccessToken> {
    const requestIdentityKey = getTokenRequestIdentityKey(scopes, getTokenOptions);
    const existingWorker = refreshWorkers.get(requestIdentityKey);
    if (existingWorker) {
      // A worker that is selected again may become the cache owner after a
      // newer incompatible worker has completed. An ordinary worker must not,
      // however, displace an in-flight claims worker: that worker is handling
      // a challenge for a token the service has already rejected.
      if (!latestRefreshWorker || getTokenOptions.claims || !latestRefreshWorker.hasClaims) {
        latestRefreshWorker = existingWorker;
      }
      return existingWorker.promise;
    }

    // We bind `scopes` here to avoid passing it around a lot.
    const tryGetAccessToken = (): Promise<AccessToken | null> =>
      credential.getToken(scopes, getTokenOptions);
    const worker = { hasClaims: Boolean(getTokenOptions.claims) } as RefreshWorker;

    // Take advantage of promise chaining to insert an assignment to `token`
    // before the refresh can be considered done. A worker only updates the
    // cache if it is still the newest refresh, so an older incompatible worker
    // cannot overwrite a token acquired for a later claims challenge.
    const promise = beginRefresh(
      tryGetAccessToken,
      options.retryIntervalInMs,
      // If we don't have a token, then we should timeout immediately
      token?.expiresOnTimestamp ?? Date.now(),
    )
      .then((_token) => {
        if (refreshWorkers.get(requestIdentityKey) === worker) {
          refreshWorkers.delete(requestIdentityKey);
        }
        if (latestRefreshWorker === worker) {
          latestRefreshWorker = null;
          token = _token;
          tenantId = getTokenOptions.tenantId;
        }
        return _token;
      })
      .catch((reason) => {
        // We also should reset the refresher if the current worker enters a
        // failed state. Existing awaiters still throw, while later requests
        // can start a new retry chain.
        if (refreshWorkers.get(requestIdentityKey) === worker) {
          refreshWorkers.delete(requestIdentityKey);
        }
        if (latestRefreshWorker === worker) {
          latestRefreshWorker = null;
          token = null;
          tenantId = undefined;
        }
        throw reason;
      });
    worker.promise = promise;
    // A proactive refresh may be superseded before it settles. Observe a later
    // rejection so it does not become unhandled, while preserving `promise` for
    // callers that are awaiting a forced refresh.
    void promise.catch(() => {});
    refreshWorkers.set(requestIdentityKey, worker);
    // An ordinary refresh can proceed alongside a claims refresh, but it must
    // not take over the cache while the claims response is still pending.
    if (!latestRefreshWorker || worker.hasClaims || !latestRefreshWorker.hasClaims) {
      latestRefreshWorker = worker;
    }

    return promise;
  }

  return async (scopes: string | string[], tokenOptions: GetTokenOptions): Promise<AccessToken> => {
    //
    // Simple rules:
    // - If we MUST refresh, then return the refresh task, blocking
    //   the pipeline until a token is available.
    // - If we SHOULD refresh, then run refresh but don't return it
    //   (we can still use the cached token).
    // - Return the token, since it's fine if we didn't return in
    //   step 1.
    //

    const hasClaimChallenge = Boolean(tokenOptions.claims);
    const tenantIdChanged = tenantId !== tokenOptions.tenantId;

    if (hasClaimChallenge) {
      // If we've received a claim, we know the existing token isn't valid.
      // Clear it so the new refresh does not use the old expiration time as a timeout.
      token = null;
    }

    const mustRefresh = tenantIdChanged || hasClaimChallenge || cycler.mustRefresh;

    if (mustRefresh) {
      return refresh(scopes, tokenOptions);
    }

    if (cycler.shouldRefresh) {
      refresh(scopes, tokenOptions);
    }

    return token as AccessToken;
  };
}
