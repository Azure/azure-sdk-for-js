// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  AuthenticationContext
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";

/**
 * The programmatic identifier of the challengeAuthenticationPolicy.
 */
export const challengeAuthenticationPolicyName = "challengeAuthenticationPolicy";

/**
 * Options to configure the challengeAuthenticationPolicy
 */
export interface ChallengeAuthenticationPolicyOptions {
  /**
   * Authentication context that can bind together the challengeAuthenticationPolicy with other policies.
   * The second policy should also receive an authenticationContext in their options.
   * By default, the only other policy that supports this is the bearerTokenAuthenticationPolicy.
   */
  authenticationContext: AuthenticationContext;
  /**
   * Allows for the customization of the next request before its sent.
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
  processChallenge(challenge: string, context: AuthenticationContext): Promise<boolean>;
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
 * Allows processing authentication challenges.
 */
export function challengeAuthenticationPolicy(
  options: ChallengeAuthenticationPolicyOptions
): PipelinePolicy {
  const {
    prepareRequest,
    getChallenge = defaultGetChallenge,
    processChallenge,
    authenticationContext
  } = options;

  return {
    name: challengeAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (prepareRequest) {
        await prepareRequest(request);
      }
      const response = await next(request);
      const challenge = getChallenge(response);
      if (
        challenge &&
        processChallenge &&
        (await processChallenge(challenge, authenticationContext))
      ) {
        return next(request);
      }
      return response;
    }
  };
}
