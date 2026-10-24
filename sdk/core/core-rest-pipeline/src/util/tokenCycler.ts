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

interface CacheEntry {
  token: AccessToken;
  sequence: number;
}

interface RefreshWorker {
  promise: Promise<AccessToken>;
  sequence: number;
  baseIdentityKey: string;
  isClaimsRefresh: boolean;
  startedDuringClaimsRefresh: boolean;
}

type ClaimsRefreshOutcome = "pending" | "succeeded" | "failed";

interface ClaimsRefreshState {
  sequence: number;
  outcome: ClaimsRefreshOutcome;
}

function getTokenBaseIdentityKey(
  scopes: string | string[],
  getTokenOptions: GetTokenOptions,
): string {
  const proofOfPossessionOptions = getTokenOptions.proofOfPossessionOptions;
  return JSON.stringify({
    scopes: typeof scopes === "string" ? [scopes] : [...scopes],
    tenantId: getTokenOptions.tenantId,
    enableCae: getTokenOptions.enableCae === true,
    proofOfPossessionOptions: proofOfPossessionOptions && {
      nonce: proofOfPossessionOptions.nonce,
      resourceRequestMethod: proofOfPossessionOptions.resourceRequestMethod,
      resourceRequestUrl: proofOfPossessionOptions.resourceRequestUrl,
    },
  });
}

function getTokenRequestIdentityKey(
  baseIdentityKey: string,
  getTokenOptions: GetTokenOptions,
): string {
  return JSON.stringify({ baseIdentityKey, claims: getTokenOptions.claims });
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
  const cachedTokens = new Map<string, CacheEntry>();
  const refreshWorkers = new Map<string, RefreshWorker>();
  const claimsRefreshStates = new Map<string, ClaimsRefreshState>();
  const deferredOrdinaryTokens = new Map<
    string,
    Array<{ worker: RefreshWorker; token: AccessToken }>
  >();
  let nextWorkerSequence = 0;

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions,
  };

  function retireWorker(requestIdentityKey: string, worker: RefreshWorker): void {
    if (refreshWorkers.get(requestIdentityKey) === worker) {
      refreshWorkers.delete(requestIdentityKey);
    }
  }

  function evictWorkersForClaimsChallenge(baseIdentityKey: string): void {
    for (const [requestIdentityKey, worker] of refreshWorkers) {
      if (worker.baseIdentityKey === baseIdentityKey) {
        refreshWorkers.delete(requestIdentityKey);
      }
    }
  }

  function cacheToken(worker: RefreshWorker, token: AccessToken): void {
    const currentCacheEntry = cachedTokens.get(worker.baseIdentityKey);
    if (
      !currentCacheEntry ||
      worker.sequence > currentCacheEntry.sequence ||
      worker.isClaimsRefresh
    ) {
      cachedTokens.set(worker.baseIdentityKey, { token, sequence: worker.sequence });
    }
  }

  function canCacheOrdinaryWorker(worker: RefreshWorker): boolean {
    const claimsRefreshState = claimsRefreshStates.get(worker.baseIdentityKey);

    if (!claimsRefreshState) {
      return true;
    }

    if (worker.sequence < claimsRefreshState.sequence || claimsRefreshState.outcome === "pending") {
      return false;
    }

    // An ordinary refresh started while a claims challenge was pending may be
    // retained only when that challenge fails. A successful challenge response
    // must remain cached until a subsequent ordinary refresh starts.
    return claimsRefreshState.outcome === "failed" || !worker.startedDuringClaimsRefresh;
  }

  function cacheDeferredOrdinaryTokens(baseIdentityKey: string): void {
    const deferredTokens = deferredOrdinaryTokens.get(baseIdentityKey);
    if (!deferredTokens) {
      return;
    }

    for (const deferredToken of deferredTokens) {
      if (canCacheOrdinaryWorker(deferredToken.worker)) {
        cacheToken(deferredToken.worker, deferredToken.token);
      }
    }
    deferredOrdinaryTokens.delete(baseIdentityKey);
  }

  /**
   * Starts a refresh job or returns an existing job with the same token
   * request identity. Incompatible requests must not share credentials.
   */
  function refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions,
    baseIdentityKey: string,
    requestIdentityKey: string,
    refreshTimeout: number,
  ): Promise<AccessToken> {
    const existingWorker = refreshWorkers.get(requestIdentityKey);
    if (existingWorker) {
      return existingWorker.promise;
    }

    const isClaimsRefresh = Boolean(getTokenOptions.claims);
    const worker: RefreshWorker = {
      promise: Promise.resolve(undefined as never),
      sequence: ++nextWorkerSequence,
      baseIdentityKey,
      isClaimsRefresh,
      startedDuringClaimsRefresh:
        !isClaimsRefresh && claimsRefreshStates.get(baseIdentityKey)?.outcome === "pending",
    };

    if (isClaimsRefresh) {
      // A claims challenge rejects the token used for this identity. Existing
      // callers may keep using a still-valid cached value, but earlier workers
      // are evicted so later callers cannot rejoin them with stale timeouts.
      claimsRefreshStates.set(baseIdentityKey, { sequence: worker.sequence, outcome: "pending" });
      evictWorkersForClaimsChallenge(baseIdentityKey);
    }

    // We bind `scopes` here to avoid passing it around a lot.
    const tryGetAccessToken = (): Promise<AccessToken | null> =>
      credential.getToken(scopes, getTokenOptions);

    const promise = beginRefresh(tryGetAccessToken, options.retryIntervalInMs, refreshTimeout)
      .then((accessToken) => {
        retireWorker(requestIdentityKey, worker);

        if (worker.isClaimsRefresh) {
          const claimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
          if (claimsRefreshState?.sequence === worker.sequence) {
            claimsRefreshState.outcome = "succeeded";
            deferredOrdinaryTokens.delete(baseIdentityKey);
            cacheToken(worker, accessToken);
          }
        } else if (canCacheOrdinaryWorker(worker)) {
          cacheToken(worker, accessToken);
        } else if (worker.startedDuringClaimsRefresh) {
          const deferredTokens = deferredOrdinaryTokens.get(baseIdentityKey) ?? [];
          deferredTokens.push({ worker, token: accessToken });
          deferredOrdinaryTokens.set(baseIdentityKey, deferredTokens);
        }

        return accessToken;
      })
      .catch((reason) => {
        retireWorker(requestIdentityKey, worker);

        if (worker.isClaimsRefresh) {
          const claimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
          if (claimsRefreshState?.sequence === worker.sequence) {
            claimsRefreshState.outcome = "failed";
            cacheDeferredOrdinaryTokens(baseIdentityKey);
          }
        }

        throw reason;
      });

    worker.promise = promise;
    // A proactive refresh may settle after its caller has already used the
    // cached token. Observe its rejection while preserving the original promise
    // for callers that are awaiting a forced refresh.
    void promise.catch(() => {});
    refreshWorkers.set(requestIdentityKey, worker);

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

    const baseIdentityKey = getTokenBaseIdentityKey(scopes, tokenOptions);
    const requestIdentityKey = getTokenRequestIdentityKey(baseIdentityKey, tokenOptions);
    const hasClaimChallenge = Boolean(tokenOptions.claims);
    const cacheEntry = cachedTokens.get(baseIdentityKey);
    const token = cacheEntry?.token;

    // A cache hit is usable only for the same scopes, tenant, CAE setting, and
    // proof-of-possession request. A claims challenge always requires a fresh
    // token, but it does not discard a still-valid cached token before the
    // challenge refresh settles.
    const mustRefresh =
      hasClaimChallenge ||
      token === undefined ||
      token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now();

    if (mustRefresh) {
      return refresh(
        scopes,
        tokenOptions,
        baseIdentityKey,
        requestIdentityKey,
        hasClaimChallenge || token === undefined ? Date.now() : token.expiresOnTimestamp,
      );
    }

    const shouldRefresh =
      (token.refreshAfterTimestamp !== undefined && token.refreshAfterTimestamp < Date.now()) ||
      token.expiresOnTimestamp - options.refreshWindowInMs < Date.now();

    if (shouldRefresh) {
      refresh(scopes, tokenOptions, baseIdentityKey, requestIdentityKey, token.expiresOnTimestamp);
    }

    return token;
  };
}
