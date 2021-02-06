// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { GetTokenOptions } from "@azure/core-auth";
import { BaseRequestPolicy, RequestPolicy, RequestPolicyOptions } from "../policies/requestPolicy";
import { Constants } from "../util/constants";
import { HttpOperationResponse } from "../httpOperationResponse";
import { HttpHeaders } from "../httpHeaders";
import { WebResource, WebResourceLike } from "../webResource";
import { AccessTokenCache } from "../credentials/accessTokenCache";
import { AccessTokenRefresher } from "../credentials/accessTokenRefresher";
import { ChallengeCache } from "../CAE/challengeCache";

/**
 * Represents a policy that handles challenges.
 */
export abstract class BaseChallengePolicy extends BaseRequestPolicy {
  /**
   * Allows configuration on the request before its sent.
   */
  protected prepareRequest?(webResource: WebResourceLike): Promise<void>;

  /**
   * Tries to retrieve the challenge.
   */
  protected getChallenge?(response: HttpOperationResponse): string | undefined;

  /**
   * Authorizes request according to an authentication challenge.
   */
  protected processChallenge?(_webResource: WebResourceLike, challenge?: string): Promise<boolean>;
}

/**
 *
 * Provides a RequestPolicy that can request a token from a TokenCredential
 * implementation and then apply it to the Authorization header of a request
 * as a Bearer token.
 *
 */
export class BearerTokenChallengeAuthenticationPolicy<TChallenge> extends BaseChallengePolicy {
  protected scope?: string;
  protected claims?: string;

  /**
   * Creates a new BearerTokenChallengeAuthenticationPolicy object.
   *
   * @param nextPolicy - The next RequestPolicy in the request pipeline.
   * @param options - Options for this RequestPolicy.
   * @param scopes - The scopes for which the bearer token applies.
   * @param tokenCache - The cache for the most recent AccessToken returned from the TokenCredential.
   * @param tokenRefresher - The AccessToken refresher.
   * @param challengeCache - The cache for the challenge.
   */
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    protected tokenCache: AccessTokenCache,
    protected tokenRefresher: AccessTokenRefresher,
    protected challengeCache: ChallengeCache<TChallenge>
  ) {
    super(nextPolicy, options);
  }

  /**
   * Gets or updates the token from the token cache into the headers of the received web resource.
   */
  protected async loadToken(webResource: WebResource, accessToken?: string): Promise<void> {
    if (!accessToken) {
      const getTokenOptions: GetTokenOptions = {
        abortSignal: webResource.abortSignal,
        tracingOptions: {
          spanOptions: webResource.spanOptions
        }
      };
      if (this.claims) {
        getTokenOptions.claims = this.claims;
      }
      accessToken = await this.getToken(getTokenOptions);
    }

    if (accessToken) {
      webResource.headers.set(Constants.HeaderConstants.AUTHORIZATION, `Bearer ${accessToken}`);
    }
  }

  /**
   * Tries to retrieve the challenge.
   */
  protected getChallenge(response: HttpOperationResponse): string | undefined {
    const challenges = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenges) {
      return challenges;
    }
    return;
  }

  /**
   * Applies the Bearer token to the request through the Authorization header.
   */
  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource.headers) webResource.headers = new HttpHeaders();

    if (this.prepareRequest) {
      await this.prepareRequest(webResource);
    } else {
      await this.loadToken(webResource);
    }

    const response = await this._nextPolicy.sendRequest(webResource);

    if (
      this.processChallenge &&
      (await this.processChallenge(webResource, this.getChallenge(response)))
    ) {
      return this._nextPolicy.sendRequest(webResource);
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
      // Updating the scope based on the local one
      if (this.scope) {
        this.tokenRefresher.setScopes(this.scope);
      }
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
