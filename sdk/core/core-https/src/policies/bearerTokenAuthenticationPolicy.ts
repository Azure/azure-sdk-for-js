// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  AuthenticationContext
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { TokenCredential, GetTokenOptions } from "@azure/core-auth";
import { AccessTokenCache, ExpiringAccessTokenCache } from "../accessTokenCache";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const bearerTokenAuthenticationPolicyName = "bearerTokenAuthenticationPolicy";

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
     * Defines how to get the challenge from the PipelineResponse.
     * By default we will retrieve the challenge only if the response status code was 401,
     * and if the response contained the header "WWW-Authenticate" with a non-empty value.
     */
    getChallenge?(response: PipelineResponse): string | undefined;
    /**
     * Updates  the authentication context based on the challenge.
     */
    processChallenge(challenge: string): Promise<AuthenticationContext | undefined>;
  };
}

/**
 * By default we will retrieve the challenge only if the response status code was 401,
 * and if the response contained the header "WWW-Authenticate" with a non-empty value.
 */
function defaultGetChallenge(response: PipelineResponse): string | undefined {
  const challenges = response.headers.get("WWW-Authenticate");
  if (response.status === 401 && challenges) {
    return challenges;
  }
  return;
}

/**
 * A policy that can request a token from a TokenCredential implementation and
 * then apply it to the Authorization header of a request as a Bearer token.
 */
export function bearerTokenAuthenticationPolicy(
  options: BearerTokenAuthenticationPolicyOptions
): PipelinePolicy {
  const { credential, scopes } = options;
  const tokenCache: AccessTokenCache = new ExpiringAccessTokenCache();
  const { prepareRequest, getChallenge = defaultGetChallenge, processChallenge } =
    options.challenge || {};

  /**
   * getToken will call to the underlying credential's getToken request with properties coming from the request,
   * as well as properties coming from parsing the CAE challenge, if any.
   */
  async function getToken(
    request: PipelineRequest,
    context?: AuthenticationContext
  ): Promise<string | undefined> {
    let accessToken = tokenCache.getCachedToken();
    const getTokenOptions: GetTokenOptions = {
      challengeClaims: context?.challengeClaims,
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
    request.headers.set("Authorization", `Bearer ${token}`);
    return request;
  }

  /**
   * Uses the challenge parameters to:
   * - Prepare the outgoing request (if the `prepareRequest` method has been provided).
   * - Process a challenge if the response contains it.
   * - Retrieve a token with the challenge information, then re-send the request.
   */
  async function challengePolicy(
    request: PipelineRequest,
    next: SendRequest
  ): Promise<PipelineResponse> {
    if (prepareRequest) {
      await prepareRequest(request);
    }
    const response = await next(request);
    const challenge = getChallenge(response);
    if (challenge && processChallenge) {
      const context = await processChallenge(challenge);
      const token = await getToken(request, context);
      return next(assignToken(request, token));
    }
    return response;
  }

  return {
    name: bearerTokenAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const token = await getToken(request);
      if (token) {
        return next(assignToken(request, token));
      } else {
        return await challengePolicy(request, next);
      }
    }
  };
}
