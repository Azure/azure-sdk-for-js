// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { TokenCredential, GetTokenOptions } from "@azure/core-auth";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../accessTokenCache";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";

/**
 * The processing of the challenge should return in any (or both) of these properties.
 */
export interface BearerTokenChallengeResult {
  /**
   * Scopes to overwrite during the get token request.
   */
  scopes?: string[];
  /**
   * Additional claims to be included in the token.
   * For more information on format and content: [the claims parameter specification](href="https://openid.net/specs/openid-connect-core-1_0-final.html#ClaimsParameter).
   */
  claims?: string;
}

/**
 * Options to configure the bearerTokenAuthenticationPolicy
 */
export interface BearerTokenAuthenticationPolicyOptions {
  /**
   * The TokenCredential implementation that can supply the bearer token.
   */
  credential: TokenCredential;
  /**
   * The scopes for which the bearer token applies.
   */
  scopes: string | string[];
  /**
   * Allows for the processing of [Continuous Access Evaluation](https://docs.microsoft.com/azure/active-directory/conditional-access/concept-continuous-access-evaluation) challenges.
   * If provided, it must contain at least the `processChallenge` method.
   * If provided, after a request is sent, if it has a challenge, it can be processed to re-send the original request with the relevant challenge information.
   */
  challenge?: {
    /**
     * Allows for the customization of the next request before its sent.
     * By default we won't be doing any changes to the initial challenge request.
     */
    prepareRequest?(request: PipelineRequest): Promise<void>;
    /**
     * Updates  the authentication context based on the challenge.
     */
    processChallenge(challenge: string): Promise<BearerTokenChallengeResult | undefined>;
  };
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes, challenge } = options;
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const { prepareRequest, processChallenge } = challenge ?? {};

  /**
   * retrieveToken will call to the underlying credential's getToken request with properties coming from the request,
   * as well as properties coming from parsing the CAE challenge, if any.
   */
  async function retrieveToken(
    request: PipelineRequest,
    context?: BearerTokenChallengeResult
  ): Promise<string | undefined> {
    let accessToken = tokenCache.getCachedToken();
    const getTokenOptions: GetTokenOptions = {
      claims: context?.claims,
      abortSignal: request.abortSignal,
      tracingOptions: {
        spanOptions: request.spanOptions
      }
    };
    if (accessToken === undefined) {
      accessToken =
        (await credential.getToken(context?.scopes || scopes, getTokenOptions)) || undefined;
      tokenCache.setCachedToken(accessToken);
    }
    return accessToken ? accessToken.token : undefined;
  }

  /**
   * Populates the token in the request headers.
   */
  function assignToken(request: PipelineRequest, token?: string): PipelineRequest {
    if (token) {
      request.headers.set("Authorization", `Bearer ${token}`);
    }
    return request;
  }

  /**
   * We will retrieve the challenge only if the response status code was 401,
   * and if the response contained the header "WWW-Authenticate" with a non-empty value.
   */
  function getChallenge(response: PipelineResponse): string | undefined {
    const challenge = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenge) {
      return challenge;
    }
    return;
  }

  return {
    name: bearerTokenAuthenticationPolicyName,
    /**
     * If there's no challenge parameter:
     * - It will try to retrieve the token using the cache, or the credential's getToken.
     * - Then it will try the next policy with or without the retrieved token.
     *
     * It uses the challenge parameters to:
     * - Skip a first attempt to get the token from the credential if there's no cached token,
     *   since it expects the token to be retrievable only after the challenge.
     * - Prepare the outgoing request if the `prepareRequest` method has been provided.
     * - Send an initial request to receive the challenge if it fails.
     * - Process a challenge if the response contains it.
     * - Retrieve a token with the challenge information, then re-send the request.
     */
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      let accessToken = tokenCache.getCachedToken();
      let token: string | undefined;
      if (!accessToken && !processChallenge) {
        token = await retrieveToken(request);
        request = assignToken(request, token);
      }

      if (prepareRequest) {
        await prepareRequest(request);
      }

      const response = await next(request);
      const challenge = getChallenge(response);

      if (challenge && processChallenge) {
        const context = await processChallenge(challenge);
        const token = await retrieveToken(request, context);
        return next(assignToken(request, token));
      }

      return response;
    }
  };
}
