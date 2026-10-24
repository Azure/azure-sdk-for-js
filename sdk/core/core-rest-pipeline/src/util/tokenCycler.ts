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

const MAX_CACHED_TOKEN_IDENTITIES = 100;

interface CacheEntry {
  token: AccessToken;
  sequence: number;
}

interface DeferredToken {
  cacheEntry: CacheEntry;
  claimsRefreshSequence: number;
}

interface RefreshWorker {
  promise: Promise<AccessToken>;
  sequence: number;
  requestIdentityKey: string;
  baseIdentityKey: string;
  isClaimsRefresh: boolean;
  startedDuringClaimsRefreshSequence?: number;
  isInvalidated: boolean;
}

interface ClaimsRefreshState {
  sequence: number;
  worker: RefreshWorker;
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
  const deferredOrdinaryTokens = new Map<string, DeferredToken>();
  let nextWorkerSequence = 0;

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions,
  };

  function cleanUpCachedTokens(): void {
    const now = Date.now();
    for (const [baseIdentityKey, cacheEntry] of cachedTokens) {
      if (cacheEntry.token.expiresOnTimestamp <= now) {
        cachedTokens.delete(baseIdentityKey);
      }
    }

    for (const [baseIdentityKey, deferredToken] of deferredOrdinaryTokens) {
      if (deferredToken.cacheEntry.token.expiresOnTimestamp <= now) {
        deferredOrdinaryTokens.delete(baseIdentityKey);
      }
    }

    while (cachedTokens.size > MAX_CACHED_TOKEN_IDENTITIES) {
      const oldestBaseIdentityKey = cachedTokens.keys().next().value;
      if (oldestBaseIdentityKey === undefined) {
        return;
      }
      cachedTokens.delete(oldestBaseIdentityKey);
    }
  }

  function retireWorker(worker: RefreshWorker): void {
    if (refreshWorkers.get(worker.requestIdentityKey) === worker) {
      refreshWorkers.delete(worker.requestIdentityKey);
    }
  }

  function invalidateOrdinaryWorkersForClaimsChallenge(baseIdentityKey: string): void {
    for (const worker of refreshWorkers.values()) {
      if (worker.baseIdentityKey === baseIdentityKey && !worker.isClaimsRefresh) {
        worker.isInvalidated = true;
        refreshWorkers.delete(worker.requestIdentityKey);
      }
    }
  }

  function invalidateOrdinaryWorkersStartedDuringClaimsRefresh(
    baseIdentityKey: string,
    claimsRefreshSequence: number,
  ): void {
    for (const worker of refreshWorkers.values()) {
      if (
        worker.baseIdentityKey === baseIdentityKey &&
        worker.startedDuringClaimsRefreshSequence === claimsRefreshSequence
      ) {
        worker.isInvalidated = true;
        refreshWorkers.delete(worker.requestIdentityKey);
      }
    }
  }

  function setCachedToken(baseIdentityKey: string, cacheEntry: CacheEntry): void {
    // Moving an entry to the end lets the bounded cache evict the least
    // recently refreshed identity first.
    cachedTokens.delete(baseIdentityKey);
    cachedTokens.set(baseIdentityKey, cacheEntry);
    cleanUpCachedTokens();
  }

  function cacheToken(worker: RefreshWorker, token: AccessToken, force = false): void {
    const currentCacheEntry = cachedTokens.get(worker.baseIdentityKey);
    if (!currentCacheEntry || worker.sequence > currentCacheEntry.sequence || force) {
      setCachedToken(worker.baseIdentityKey, { token, sequence: worker.sequence });
    }
  }

  function deferToken(
    deferredTokens: Map<string, DeferredToken>,
    worker: RefreshWorker,
    token: AccessToken,
    claimsRefreshSequence: number,
  ): void {
    const currentDeferredToken = deferredTokens.get(worker.baseIdentityKey);
    if (!currentDeferredToken || worker.sequence > currentDeferredToken.cacheEntry.sequence) {
      deferredTokens.set(worker.baseIdentityKey, {
        cacheEntry: { token, sequence: worker.sequence },
        claimsRefreshSequence,
      });
    }
  }

  function deferOrdinaryToken(worker: RefreshWorker, token: AccessToken): void {
    const claimsRefreshSequence = worker.startedDuringClaimsRefreshSequence;
    if (claimsRefreshSequence !== undefined) {
      deferToken(deferredOrdinaryTokens, worker, token, claimsRefreshSequence);
    }
  }

  function cacheDeferredTokensAfterClaimsFailure(
    baseIdentityKey: string,
    claimsRefreshSequence: number,
  ): void {
    const currentCacheEntry = cachedTokens.get(baseIdentityKey);
    const deferredToken = deferredOrdinaryTokens.get(baseIdentityKey);
    if (
      deferredToken?.claimsRefreshSequence === claimsRefreshSequence &&
      (!currentCacheEntry || deferredToken.cacheEntry.sequence > currentCacheEntry.sequence)
    ) {
      setCachedToken(baseIdentityKey, deferredToken.cacheEntry);
    }
    deferredOrdinaryTokens.delete(baseIdentityKey);
  }

  function invalidateSupersededClaimsWorkers(baseIdentityKey: string, sequence: number): void {
    for (const worker of refreshWorkers.values()) {
      if (
        worker.baseIdentityKey === baseIdentityKey &&
        worker.isClaimsRefresh &&
        worker.sequence < sequence
      ) {
        worker.isInvalidated = true;
        refreshWorkers.delete(worker.requestIdentityKey);
      }
    }
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
    if (existingWorker && !existingWorker.isInvalidated) {
      return existingWorker.promise;
    }
    if (existingWorker) {
      refreshWorkers.delete(requestIdentityKey);
    }

    const isClaimsRefresh = Boolean(getTokenOptions.claims);
    const currentClaimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
    const worker: RefreshWorker = {
      promise: Promise.resolve(undefined as never),
      sequence: ++nextWorkerSequence,
      requestIdentityKey,
      baseIdentityKey,
      isClaimsRefresh,
      startedDuringClaimsRefreshSequence: isClaimsRefresh
        ? undefined
        : currentClaimsRefreshState?.sequence,
      isInvalidated: false,
    };

    if (isClaimsRefresh) {
      // A claims challenge rejects the token used for this identity. Existing
      // ordinary workers are invalidated so they cannot later overwrite the
      // challenge response, but pending claims workers remain discoverable by
      // their own request identity for A/B/A claims de-duplication.
      invalidateOrdinaryWorkersForClaimsChallenge(baseIdentityKey);
      deferredOrdinaryTokens.delete(baseIdentityKey);
      claimsRefreshStates.set(baseIdentityKey, { sequence: worker.sequence, worker });
    }

    // We bind `scopes` here to avoid passing it around a lot.
    const tryGetAccessToken = (): Promise<AccessToken | null> =>
      credential.getToken(scopes, getTokenOptions);

    const promise = beginRefresh(tryGetAccessToken, options.retryIntervalInMs, refreshTimeout)
      .then((accessToken) => {
        retireWorker(worker);

        if (worker.isClaimsRefresh) {
          const claimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
          if (
            !worker.isInvalidated &&
            (!claimsRefreshState || claimsRefreshState.worker === worker)
          ) {
            // A successful challenge must remain the cached token. Ordinary
            // workers which began while it was pending cannot become the next
            // proactive refresh owner, and older claims workers must not be
            // rejoined after this newer challenge has settled. If a newer
            // claims worker fails, a surviving older worker may still safely
            // cache its response; a newer successful worker invalidates it.
            invalidateOrdinaryWorkersStartedDuringClaimsRefresh(baseIdentityKey, worker.sequence);
            invalidateSupersededClaimsWorkers(baseIdentityKey, worker.sequence);
            deferredOrdinaryTokens.delete(baseIdentityKey);
            cacheToken(worker, accessToken, true);
            if (claimsRefreshState?.worker === worker) {
              claimsRefreshStates.delete(baseIdentityKey);
            }
          }
        } else if (!worker.isInvalidated) {
          const claimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
          if (claimsRefreshState) {
            // The challenge response owns the cache while pending. Retain only
            // the newest ordinary token as a fallback if that response fails.
            deferOrdinaryToken(worker, accessToken);
          } else {
            cacheToken(worker, accessToken);
          }
        }

        return accessToken;
      })
      .catch((reason) => {
        retireWorker(worker);

        if (worker.isClaimsRefresh) {
          const claimsRefreshState = claimsRefreshStates.get(baseIdentityKey);
          if (claimsRefreshState?.worker === worker) {
            claimsRefreshStates.delete(baseIdentityKey);
            cacheDeferredTokensAfterClaimsFailure(baseIdentityKey, worker.sequence);
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

    cleanUpCachedTokens();

    const baseIdentityKey = getTokenBaseIdentityKey(scopes, tokenOptions);
    const requestIdentityKey = getTokenRequestIdentityKey(baseIdentityKey, tokenOptions);
    const hasClaimChallenge = Boolean(tokenOptions.claims);
    const deferredOrdinaryToken = hasClaimChallenge
      ? undefined
      : deferredOrdinaryTokens.get(baseIdentityKey)?.cacheEntry;
    // An ordinary refresh which succeeds while a claims request is pending is
    // reusable by ordinary callers, but remains provisional until that claims
    // request settles. A successful challenge replaces it; a failed challenge
    // promotes it into the normal cache.
    const cacheEntry = deferredOrdinaryToken ?? cachedTokens.get(baseIdentityKey);
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
