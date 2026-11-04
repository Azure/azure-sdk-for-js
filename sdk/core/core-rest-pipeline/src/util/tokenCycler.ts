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
interface RefreshWorker {
  promise: Promise<AccessToken>;
  sequence: number;
  requestIdentityKey: string;
  isClaimsRefresh: boolean;
  startedDuringClaimsSequence?: number;
  isInvalidated: boolean;
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

export function createTokenCycler(
  credential: TokenCredential,
  tokenCyclerOptions?: Partial<TokenCyclerOptions>,
): AccessTokenGetter {
  let token: AccessToken | null = null;
  let tenantId: string | undefined;
  let nextRefreshSequence = 0;
  let latestCachedSequence = 0;
  let latestSuccessfulClaimsSequence = 0;
  const refreshWorkers = new Map<string, RefreshWorker>();
  const pendingClaims = new Map<number, RefreshWorker>();
  const deferredClaimsTokens = new Map<number, AccessToken>();
  const deferredOrdinaryTokens = new Map<number, AccessToken>();

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions,
  };

  const cycler = {
    get isRefreshing(): boolean {
      return refreshWorkers.size > 0;
    },
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
    get mustRefresh(): boolean {
      return (
        token === null || token.expiresOnTimestamp - options.forcedRefreshWindowInMs < Date.now()
      );
    },
  };

  function newestToken(tokens: Map<number, AccessToken>): AccessToken | undefined {
    let newest: AccessToken | undefined;
    let newestSequence = -1;
    for (const [sequence, value] of tokens) {
      if (sequence > newestSequence) {
        newestSequence = sequence;
        newest = value;
      }
    }
    return newest;
  }

  function finishClaimsBatchIfReady(): void {
    if (pendingClaims.size !== 0) {
      return;
    }

    const claimsToken = newestToken(deferredClaimsTokens);
    const ordinaryToken = newestToken(deferredOrdinaryTokens);
    deferredClaimsTokens.clear();
    deferredOrdinaryTokens.clear();

    if (claimsToken !== undefined) {
      latestCachedSequence = Math.max(latestCachedSequence, latestSuccessfulClaimsSequence);
      token = claimsToken;
      return;
    }

    // If every claims refresh failed, an ordinary refresh that completed while
    // the challenge was pending is the safe fallback.
    if (ordinaryToken !== undefined && latestSuccessfulClaimsSequence === 0) {
      token = ordinaryToken;
    }
  }

  function refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions,
  ): Promise<AccessToken> {
    const requestIdentityKey = getTokenRequestIdentityKey(scopes, getTokenOptions);
    const existingWorker = refreshWorkers.get(requestIdentityKey);
    if (existingWorker && !existingWorker.isInvalidated) {
      return existingWorker.promise;
    }

    const isClaimsRefresh = Boolean(getTokenOptions.claims);
    const newestPendingClaims = Math.max(0, ...pendingClaims.keys());
    const worker: RefreshWorker = {
      promise: Promise.resolve(undefined as never),
      sequence: ++nextRefreshSequence,
      requestIdentityKey,
      isClaimsRefresh,
      startedDuringClaimsSequence: isClaimsRefresh ? undefined : newestPendingClaims || undefined,
      isInvalidated: false,
    };

    if (isClaimsRefresh) {
      for (const activeWorker of refreshWorkers.values()) {
        if (!activeWorker.isClaimsRefresh) {
          activeWorker.isInvalidated = true;
        }
      }
      pendingClaims.set(worker.sequence, worker);
    }

    const tryGetAccessToken = (): Promise<AccessToken | null> =>
      credential.getToken(scopes, getTokenOptions);
    const promise = beginRefresh(
      tryGetAccessToken,
      options.retryIntervalInMs,
      token?.expiresOnTimestamp ?? Date.now(),
    )
      .then((_token) => {
        refreshWorkers.delete(requestIdentityKey);

        if (worker.isClaimsRefresh) {
          pendingClaims.delete(worker.sequence);
          const newerClaimsPending = pendingClaims.size > 0;
          if (newerClaimsPending) {
            deferredClaimsTokens.set(worker.sequence, _token);
          } else {
            latestSuccessfulClaimsSequence = Math.max(
              latestSuccessfulClaimsSequence,
              worker.sequence,
            );
            token = _token;
            tenantId = getTokenOptions.tenantId;
            latestCachedSequence = Math.max(latestCachedSequence, worker.sequence);
            deferredClaimsTokens.clear();
            deferredOrdinaryTokens.clear();
          }
          finishClaimsBatchIfReady();
        } else if (!worker.isInvalidated) {
          if (pendingClaims.size > 0 && worker.startedDuringClaimsSequence !== undefined) {
            deferredOrdinaryTokens.set(worker.sequence, _token);
          } else if (
            worker.sequence >= latestCachedSequence &&
            worker.startedDuringClaimsSequence === undefined
          ) {
            token = _token;
            tenantId = getTokenOptions.tenantId;
            latestCachedSequence = worker.sequence;
          }
        }
        return _token;
      })
      .catch((reason) => {
        refreshWorkers.delete(requestIdentityKey);
        if (worker.isClaimsRefresh) {
          pendingClaims.delete(worker.sequence);
          finishClaimsBatchIfReady();
        }
        throw reason;
      });

    // A proactive refresh is intentionally not awaited by callers. Observe its
    // rejection without changing the promise returned to forced callers.
    void promise.catch(() => {});
    worker.promise = promise;
    refreshWorkers.set(requestIdentityKey, worker);
    return promise;
  }

  return async (scopes: string | string[], tokenOptions: GetTokenOptions): Promise<AccessToken> => {
    const hasClaimChallenge = Boolean(tokenOptions.claims);
    const tenantIdChanged = tenantId !== tokenOptions.tenantId;

    if (hasClaimChallenge) {
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
