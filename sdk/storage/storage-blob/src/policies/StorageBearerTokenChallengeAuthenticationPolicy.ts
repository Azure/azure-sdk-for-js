// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, GetTokenOptions, TokenCredential, URLBuilder } from "@azure/core-http";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "@azure/core-http";
import { HttpOperationResponse } from "@azure/core-http";
import { WebResourceLike } from "@azure/core-http";
import { delay } from "@azure/core-http";

/**
 * A set of constants used internally when processing requests.
 */
const Constants = {
  DefaultScope: "/.default",
  /**
   * Defines constants for use with HTTP headers.
   */
  HeaderConstants: {
    /**
     * The Authorization header.
     */
    AUTHORIZATION: "authorization",
  },
};

// #region Access Token Cycler

/**
 * A function that gets a promise of an access token and allows providing
 * options.
 *
 * @param options - the options to pass to the underlying token provider
 */
type AccessTokenGetter = (options: GetTokenOptions) => Promise<AccessToken>;

interface TokenCyclerOptions {
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
const DEFAULT_CYCLER_OPTIONS: TokenCyclerOptions = {
  forcedRefreshWindowInMs: 1000, // Force waiting for a refresh 1s before the token expires
  retryIntervalInMs: 3000, // Allow refresh attempts every 3s
  refreshWindowInMs: 1000 * 60 * 2, // Start refreshing 2m before expiry
};

/**
 * Converts an an unreliable access token getter (which may resolve with null)
 * into an AccessTokenGetter by retrying the unreliable getter in a regular
 * interval.
 *
 * @param getAccessToken - a function that produces a promise of an access
 * token that may fail by returning null
 * @param retryIntervalInMs - the time (in milliseconds) to wait between retry
 * attempts
 * @param timeoutInMs - the timestamp after which the refresh attempt will fail,
 * throwing an exception
 * @returns - a promise that, if it resolves, will resolve with an access token
 */
async function beginRefresh(
  getAccessToken: () => Promise<AccessToken | null>,
  retryIntervalInMs: number,
  timeoutInMs: number
): Promise<AccessToken> {
  // This wrapper handles exceptions gracefully as long as we haven't exceeded
  // the timeout.
  async function tryGetAccessToken(): Promise<AccessToken | null> {
    if (Date.now() < timeoutInMs) {
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
 * @param scopes - the scopes to request authorization for
 * @param tokenCyclerOptions - optionally override default settings for the cycler
 *
 * @returns - a function that reliably produces a valid access token
 */
function createTokenCycler(
  credential: TokenCredential,
  scopes: string | string[],
  tokenCyclerOptions?: Partial<TokenCyclerOptions>
): AccessTokenGetter {
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
  function refresh(getTokenOptions: GetTokenOptions): Promise<AccessToken> {
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

  return async (tokenOptions: GetTokenOptions): Promise<AccessToken> => {
    //
    // Simple rules:
    // - If we MUST refresh, then return the refresh task, blocking
    //   the pipeline until a token is available.
    // - If we SHOULD refresh, then run refresh but don't return it
    //   (we can still use the cached token).
    // - Return the token, since it's fine if we didn't return in
    //   step 1.
    //

    if (cycler.mustRefresh) return refresh(tokenOptions);

    if (cycler.shouldRefresh) {
      refresh(tokenOptions);
    }

    return token as AccessToken;
  };
}
/**
 * We will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function getChallenge(response: HttpOperationResponse): string | undefined {
  const challenge = response.headers.get("WWW-Authenticate");
  if (response.status === 401 && challenge) {
    return challenge;
  }
  return;
}

/**
 * Challenge structure
 */
interface Challenge {
  authorization_uri: string;
  resource_id: string;
}

/**
 * Converts: `Bearer a="b" c="d"`.
 * Into: `[ { a: 'b', c: 'd' }]`.
 *
 * @internal
 */
function parseChallenge(challenge: string): any {
  const bearerChallenge = challenge.slice("Bearer ".length);
  const challengeParts = `${bearerChallenge.trim()} `.split(" ").filter((x) => x);
  const keyValuePairs = challengeParts.map((keyValue) =>
    (([key, value]) => ({ [key]: value }))(keyValue.trim().split("="))
  );
  // Key-value pairs to plain object:
  return keyValuePairs.reduce((a, b) => ({ ...a, ...b }), {});
}

// #endregion

/**
 * Creates a new factory for a RequestPolicy that applies a bearer token to
 * the requests' `Authorization` headers.
 *
 * @param credential - The TokenCredential implementation that can supply the bearer token.
 * @param scopes - The scopes for which the bearer token applies.
 */

export function storageBearerTokenChallengeAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  // This simple function encapsulates the entire process of reliably retrieving the token
  let getToken = createTokenCycler(credential, scopes);

  class StorageBearerTokenChallengeAuthenticationPolicy extends BaseRequestPolicy {
    public constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      super(nextPolicy, options);
    }

    public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
      if (!webResource.url.toLowerCase().startsWith("https://")) {
        throw new Error(
          "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs."
        );
      }

      const getTokenInternal = getToken;
      const token = (
        await getTokenInternal({
          abortSignal: webResource.abortSignal,
          tracingOptions: {
            tracingContext: webResource.tracingContext,
          },
        })
      ).token;
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);

      const response = await this._nextPolicy.sendRequest(webResource);

      if (response?.status === 401) {
        const challenge = getChallenge(response);
        if (challenge) {
          const challengeInfo: Challenge = parseChallenge(challenge);
          const challengeScopes = challengeInfo.resource_id + Constants.DefaultScope;
          const parsedAuthUri = URLBuilder.parse(challengeInfo.authorization_uri);
          const pathSegments = parsedAuthUri.getPath()!.split("/");
          const tenantId = pathSegments[1];
          const getTokenForChallenge = createTokenCycler(credential, challengeScopes);

          const tokenForChallenge = (
            await getTokenForChallenge({
              abortSignal: webResource.abortSignal,
              tracingOptions: {
                tracingContext: webResource.tracingContext,
              },
              tenantId: tenantId,
            })
          ).token;

          getToken = getTokenForChallenge;
          webResource.headers.set(
            Constants.HeaderConstants.AUTHORIZATION,
            `Bearer ${tokenForChallenge}`
          );
          return this._nextPolicy.sendRequest(webResource);
        }
      }

      return response;
    }
  }

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new StorageBearerTokenChallengeAuthenticationPolicy(nextPolicy, options);
    },
  };
}
