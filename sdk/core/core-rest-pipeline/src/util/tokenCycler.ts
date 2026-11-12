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
interface CachedToken {
  token: AccessToken;
  tenantId: string | undefined;
  sequence: number;
}

interface ClaimsEpoch {
  pending: number;
  latestSuccessfulSequence: number;
  hasSuccessfulClaims: boolean;
  successfulResult?: CachedToken;
  ordinaryResult?: CachedToken;
  finalized: boolean;
}

interface RefreshWorker {
  promise: Promise<AccessToken>;
  sequence: number;
  requestIdentityKey: string;
  isClaimsRefresh: boolean;
  claimsEpoch?: ClaimsEpoch;
  canJoin: boolean;
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
  let activeClaimsEpoch: ClaimsEpoch | undefined;
  const refreshWorkers = new Map<string, RefreshWorker>();

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ...tokenCyclerOptions,
  };

  const cycler = {
    get isRefreshing(): boolean {
      return Array.from(refreshWorkers.values()).some((worker) => {
        if (worker.isClaimsRefresh) {
          return worker.claimsEpoch!.latestSuccessfulSequence < worker.sequence;
        }
        // Ordinary workers associated with a claims epoch cannot update the
        // cache until every challenge in that epoch has settled. An ordinary
        // worker that is older than the current cache owner is also obsolete
        // and must not suppress proactive renewal.
        return (
          worker.claimsEpoch === undefined &&
          worker.canJoin &&
          worker.sequence >= latestCachedSequence
        );
      });
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

  function cacheToken(value: CachedToken): void {
    if (value.sequence < latestCachedSequence) {
      return;
    }
    token = value.token;
    tenantId = value.tenantId;
    latestCachedSequence = value.sequence;
  }

  function finalizeClaimsEpoch(epoch: ClaimsEpoch): void {
    if (epoch.pending !== 0 || epoch.finalized) {
      return;
    }
    epoch.finalized = true;
    if (activeClaimsEpoch === epoch) {
      if (epoch.hasSuccessfulClaims) {
        if (epoch.successfulResult !== undefined) {
          cacheToken(epoch.successfulResult);
        }
      } else if (epoch.ordinaryResult !== undefined) {
        cacheToken(epoch.ordinaryResult);
      }
      activeClaimsEpoch = undefined;
    }
  }

  function startClaimsEpoch(): ClaimsEpoch {
    const epoch: ClaimsEpoch = {
      pending: 0,
      latestSuccessfulSequence: 0,
      hasSuccessfulClaims: false,

      finalized: false,
    };
    activeClaimsEpoch = epoch;
    return epoch;
  }

  function refresh(
    scopes: string | string[],
    getTokenOptions: GetTokenOptions,
  ): Promise<AccessToken> {
    const requestIdentityKey = getTokenRequestIdentityKey(scopes, getTokenOptions);
    const isClaimsRefresh = Boolean(getTokenOptions.claims);
    const existingWorker = refreshWorkers.get(requestIdentityKey);
    if (
      existingWorker !== undefined &&
      !existingWorker.isClaimsRefresh &&
      existingWorker.sequence < latestCachedSequence
    ) {
      existingWorker.canJoin = false;
    }
    if (existingWorker?.canJoin) {
      // A new claims challenge can rejoin a still-pending claims worker after
      // another challenge has completed. Treat that rejoin as the current
      // cache owner so the shared worker's eventual result is not discarded as
      // stale, and invalidate ordinary workers that could otherwise replace
      // the challenged token.
      if (isClaimsRefresh && existingWorker.isClaimsRefresh) {
        let epoch = existingWorker.claimsEpoch!;
        if (epoch.hasSuccessfulClaims) {
          // This is a new challenge after an earlier challenge in the epoch
          // succeeded. Move the still-pending worker into a new epoch so
          // ordinary workers remain deferred until the rejoined challenge
          // settles.
          epoch.pending--;
          finalizeClaimsEpoch(epoch);
          epoch = startClaimsEpoch();
          epoch.pending++;
          existingWorker.claimsEpoch = epoch;
        }
        existingWorker.sequence = ++nextRefreshSequence;
        for (const activeWorker of refreshWorkers.values()) {
          if (!activeWorker.isClaimsRefresh) {
            activeWorker.claimsEpoch = epoch;
            activeWorker.canJoin = false;
          }
        }
      }
      return existingWorker.promise;
    }
    const claimsEpoch = isClaimsRefresh
      ? activeClaimsEpoch?.hasSuccessfulClaims
        ? startClaimsEpoch()
        : (activeClaimsEpoch ?? startClaimsEpoch())
      : activeClaimsEpoch;
    const worker: RefreshWorker = {
      promise: Promise.resolve(undefined as never),
      sequence: ++nextRefreshSequence,
      requestIdentityKey,
      isClaimsRefresh,
      claimsEpoch,
      canJoin: true,
    };

    if (isClaimsRefresh) {
      claimsEpoch!.pending++;
      for (const activeWorker of refreshWorkers.values()) {
        if (!activeWorker.isClaimsRefresh) {
          activeWorker.claimsEpoch = claimsEpoch;
          activeWorker.canJoin = false;
        }
      }
    }

    const tryGetAccessToken = (): Promise<AccessToken | null> =>
      credential.getToken(scopes, getTokenOptions);
    const promise = beginRefresh(
      tryGetAccessToken,
      options.retryIntervalInMs,
      token?.expiresOnTimestamp ?? Date.now(),
    )
      .then((_token) => {
        if (refreshWorkers.get(requestIdentityKey) === worker) {
          refreshWorkers.delete(requestIdentityKey);
        }

        const result: CachedToken = {
          token: _token,
          tenantId: getTokenOptions.tenantId,
          sequence: worker.sequence,
        };
        if (worker.isClaimsRefresh) {
          const epoch = worker.claimsEpoch!;
          epoch.pending--;
          if (!epoch.hasSuccessfulClaims || worker.sequence > epoch.latestSuccessfulSequence) {
            epoch.hasSuccessfulClaims = true;
            epoch.latestSuccessfulSequence = worker.sequence;
            epoch.successfulResult = result;
            // A newer claims epoch revokes the older epoch's authority to
            // publish to the settled cache. The result is still returned to
            // its own callers, but must not be restored after a newer
            // challenge has taken ownership.
            if (activeClaimsEpoch === epoch) {
              cacheToken(result);
            }
            for (const activeWorker of refreshWorkers.values()) {
              if (activeWorker.claimsEpoch === epoch && !activeWorker.isClaimsRefresh) {
                activeWorker.canJoin = false;
              }
            }
          }
          finalizeClaimsEpoch(epoch);
        } else if (worker.claimsEpoch !== undefined) {
          const epoch = worker.claimsEpoch;
          if (epoch.finalized) {
            if (!epoch.hasSuccessfulClaims) {
              cacheToken(result);
            }
          } else if (!epoch.hasSuccessfulClaims) {
            if (
              epoch.ordinaryResult === undefined ||
              result.sequence > epoch.ordinaryResult.sequence
            ) {
              epoch.ordinaryResult = result;
            }
          }
        } else {
          cacheToken(result);
        }
        return _token;
      })
      .catch((reason) => {
        if (refreshWorkers.get(requestIdentityKey) === worker) {
          refreshWorkers.delete(requestIdentityKey);
        }
        if (worker.isClaimsRefresh) {
          const epoch = worker.claimsEpoch!;
          epoch.pending--;
          finalizeClaimsEpoch(epoch);
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
      // A claims challenge means the cached token was rejected. Clear it before
      // starting the claims refresh so beginRefresh uses an immediate deadline
      // instead of retrying against the rejected token's expiration.
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
