// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  AuthenticationContext
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";

export const challengeAuthenticationPolicyName = "challengeAuthenticationPolicy";

export interface ChallengeAuthenticationPolicyOptions {
  authenticationContext: AuthenticationContext;
  prepareRequest?(request: PipelineRequest): Promise<void>;
  getChallenge?(response: PipelineResponse): string | undefined;
  processChallenge?(challenge: string, context: AuthenticationContext): Promise<boolean>;
}

const defaultOptions: ChallengeAuthenticationPolicyOptions = {
  authenticationContext: {},
  getChallenge(response: PipelineResponse): string | undefined {
    const challenges = response.headers.get("WWW-Authenticate");
    if (response.status === 401 && challenges) {
      return challenges;
    }
    return;
  }
};

export function challengeAuthenticationPolicy(
  options: ChallengeAuthenticationPolicyOptions
): PipelinePolicy {
  const completeOptions = {
    ...defaultOptions,
    ...options
  };
  const {
    prepareRequest,
    getChallenge,
    processChallenge,
    authenticationContext
  } = completeOptions;

  return {
    name: challengeAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (prepareRequest) {
        await prepareRequest(request);
      }
      const response = await next(request);
      const challenge = getChallenge && getChallenge(response);
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
