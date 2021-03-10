// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import { delay } from "../util/utils";

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
  forcedRefreshWindow: number;
  /**
   * Interval in milliseconds to retry failed token refreshes.
   */
  retryInterval: number;
  /**
   * The window of time before token expiration during which
   * we will attempt to refresh the token.
   */
  refreshWindow: number;
}

// Default options for the cycler if none are provided
const DEFAULT_CYCLER_OPTIONS: TokenCyclerOptions = {
  forcedRefreshWindow: 1000, // Force waiting for a refresh 1s before the token expires
  retryInterval: 3000, // Allow refresh attempts every 3s
  refreshWindow: 1000 * 60 * 2 // Start refreshing 2m before expiry
};

/**
 * Converts an an unreliable access token getter (which may resolve with null)
 * into an AccessTokenGetter by retrying the unreliable getter in a regular
 * interval.
 *
 * @param tryGetAccessToken - a function that produces a promise of an access
 * token that may fail by returning null
 * @param retryInterval - the time (in milliseconds) to wait between retry
 * attempts
 * @returns - a promise that, if it resolves, will resolve with an access token
 */
async function beginRefresh(
  tryGetAccessToken: () => Promise<AccessToken | null>,
  retryInterval: number
): Promise<AccessToken> {
  let token: AccessToken | null = await tryGetAccessToken();

  while (token === null) {
    await delay(retryInterval);

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
 * @param _options - optionally override default settings for the cycler
 *
 * @returns - a function that reliably produces a valid access token
 */
function createTokenCycler(
  credential: TokenCredential,
  scopes: string | string[],
  _options?: Partial<TokenCyclerOptions>
): AccessTokenGetter {
  let refreshWorker: Promise<AccessToken> | null = null;
  let token: AccessToken | null = null;

  const options = {
    ...DEFAULT_CYCLER_OPTIONS,
    ..._options
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
        (token?.expiresOnTimestamp ?? 0) - options.refreshWindow < Date.now()
      );
    },
    /**
     * Produces true if the cycler MUST refresh (null or nearly-expired
     * token).
     */
    get mustRefresh(): boolean {
      return token === null || token.expiresOnTimestamp - options.forcedRefreshWindow < Date.now();
    }
  };

  /**
   * Starts a refresh job or returns the existing job if one is already
   * running.
   */
  function refresh(getTokenOptions: GetTokenOptions): Promise<AccessToken> {
    if (!cycler.isRefreshing) {
      // We bind `scopes` here to avoid passing it around a lot
      const tryGetAccessToken = () => credential.getToken(scopes, getTokenOptions);

      // Take advantage of promise chaining to insert an assignment to `token`
      // before the refresh can be considered done.
      refreshWorker = beginRefresh(tryGetAccessToken, options.retryInterval).then((_token) => {
        token = _token;
        return token;
      });
    }

    return refreshWorker as Promise<AccessToken>;
  }

  return async (options: GetTokenOptions): Promise<AccessToken> => {
    //
    // Simple rules:
    // - If we MUST refresh, then return the refresh task, blocking
    //   the pipeline until a token is available.
    // - If we SHOULD refresh, then run refresh but don't return it
    //   (we can still use the cached token).
    // - Return the token, since it's fine if we didn't return in
    //   step 1.
    //

    if (cycler.mustRefresh) return refresh(options);

    if (cycler.shouldRefresh) {
      refresh(options);
    }

    return token as AccessToken;
  };
}

// #endregion

/**
 * Creates a new factory for a RequestPolicy that applies a bearer token to
 * the requests' `Authorization` headers.
 *
 * @param credential - The TokenCredential implementation that can supply the bearer token.
 * @param scopes - The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  // This simple function encapsulates the entire process of reliably retrieving the token
  const getToken = createTokenCycler(credential, scopes /*, options */);

  class SimpleBearerAuthorizationPolicy extends BaseRequestPolicy {
    constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      super(nextPolicy, options);
    }

    public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
      const { token } = await getToken({
        abortSignal: webResource.abortSignal,
        tracingOptions: {
          spanOptions: webResource.spanOptions
        }
      });
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${token}`);
      return this._nextPolicy.sendRequest(webResource);
    }
  }

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new SimpleBearerAuthorizationPolicy(nextPolicy, options);
    }
  };
}
