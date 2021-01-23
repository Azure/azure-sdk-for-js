// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { TokenCredential, GetTokenOptions } from "@azure/core-auth";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  RequestPolicyFactory
} from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders } from "../httpHeaders";
import { WebResource, WebResourceLike } from "../webResource";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../credentials/accessTokenCache";
import { AccessTokenRefresher } from "../credentials/accessTokenRefresher";
import { logger } from "../log";
import { decodeString, uint8ArrayToString } from "../util/base64";
import { CAEParsed, parseCAEChallenges } from "../CAE";

/**
 * The automated token refresh will only start to happen at the
 * expiration date minus the value of timeBetweenRefreshAttemptsInMs,
 * which is by default 30 seconds.
 */
const timeBetweenRefreshAttemptsInMs = 30000;

/**
 * Creates a new BearerTokenAuthenticationPolicy factory.
 *
 * @param credential - The TokenCredential implementation that can supply the bearer token.
 * @param scopes - The scopes for which the bearer token applies.
 */
export function bearerTokenAuthenticationPolicy(
  credential: TokenCredential,
  scopes: string | string[]
): RequestPolicyFactory {
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const tokenRefresher = new AccessTokenRefresher(
    credential,
    scopes,
    timeBetweenRefreshAttemptsInMs
  );

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new BearerTokenAuthenticationPolicy(nextPolicy, options, tokenCache, tokenRefresher);
    }
  };
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class BearerTokenAuthenticationPolicy extends BaseRequestPolicy {
  /**
   * Local cache of the access token.
   */
  protected tokenCache: AccessTokenCache;

  /**
   * Optimization on the refreshing of tokens.
   */
  protected tokenRefresher: AccessTokenRefresher;

  /**
   * Creates a new BearerTokenAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param scopes - The scopes for which the bearer token applies.
   * @param tokenCache - The cache for the most recent AccessToken returned from the TokenCredential.
   * @param tokenRefresher - The AccessToken refresher.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    tokenCache: AccessTokenCache,
    tokenRefresher: AccessTokenRefresher
  ) {
    super(nextPolicy, options);
    this.tokenCache = tokenCache;
    this.tokenRefresher = tokenRefresher;
  }

  /**
   * Allows configuration on the request before its sent.
   * By default it simply attempts to load tokens into the request that is about to be sent.
   */
  async onBeforeRequest(webResource: WebResourceLike): Promise<void> {
    await this.loadToken(webResource);
  }

  /**
   * Authorizes request according to an authentication challenge.
   * This base implementation only handles CAE claims directives,
   * which means that the WWW-Authenticate header is expected to have
   * only one challenge that must include a "claims" property.
   * Clients expecting other challenges must override.
   */
  async onChallenge(webResource: WebResourceLike, challenges: string): Promise<boolean> {
    const parsedChallenges = parseCAEChallenges(challenges);
    if (parsedChallenges.length !== 1) {
      logger.info("No challenges received. Bypassing CAE.");
      return false;
    }
    const challenge = parsedChallenges[0] as CAEParsed.InsufficientClaims;
    const encodedClaims = challenge.claims;
    if (!encodedClaims) {
      logger.info("The CAE challenge received does not have claims. Bypassing CAE.");
      return false;
    }
    try {
      const padding = 4 - (encodedClaims.length % 4);
      const decodedClaims = decodeString(`${encodedClaims}${"=".repeat(padding)}`);
      const claims = JSON.parse(uint8ArrayToString(decodedClaims));
      if (!claims.access_token) return false;
      await this.loadToken(webResource, claims.access_token);
      return true;
    } catch (e) {
      return false;
    }
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  protected async loadToken(webResource: WebResource, accessToken?: string): Promise<void> {
    if (!accessToken) {
      accessToken = await this.getToken({
        abortSignal: webResource.abortSignal,
        tracingOptions: {
          spanOptions: webResource.spanOptions
        }
      });
    }

    if (accessToken) {
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${accessToken}`);
    }
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();
    await this.onBeforeRequest(webResource);

    const response = await this._nextPolicy.sendRequest(webResource);

    const challenges = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenges) {
      if (await this.onChallenge(webResource, challenges)) {
        return this._nextPolicy.sendRequest(webResource);
      }
    }

    return response;
  }

  /**
   * Attempts a token update if any other time related conditionals have been reached based on the tokenRefresher class.
   */
  private async updateTokenIfNeeded(options: GetTokenOptions): Promise<void> {
    if (this.tokenRefresher.isReady()) {
      const accessToken = await this.tokenRefresher.refresh(options);
      this.tokenCache.setCachedToken(accessToken);
    }
  }

  /**
   * Tries to retrieve the token from the cache, otherwise tries to refresh the token.
   */
  protected async getToken(options: GetTokenOptions): Promise<string | undefined> {
    let accessToken = this.tokenCache.getCachedToken();
    if (accessToken === undefined) {
      // Waiting for the next refresh only if the cache is unable to retrieve the access token,
      // which means that it has expired, or it has never been set.
      accessToken = await this.tokenRefresher.refresh(options);
      this.tokenCache.setCachedToken(accessToken);
    } else {
      // If we still have a cached access token,
      // And any other time related conditionals have been reached based on the tokenRefresher class,
      // then attempt to refresh without waiting.
      this.updateTokenIfNeeded(options);
    }

    return accessToken ? accessToken.token : undefined;
  }
}
