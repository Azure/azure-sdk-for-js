// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest } from "../interfaces";
import { PipelinePolicy } from "../pipeline";

export const challengeAuthenticationPolicyName = "challengeAuthenticationPolicy";

export interface ChallengeAuthenticationPolicyOptions {
  prepareRequest?(request: PipelineRequest): Promise<void>;
  getChallenge?(response: PipelineResponse): string | undefined;
  processChallenge?(request: PipelineRequest, challenge?: string): Promise<boolean>;
}

const defaultOptions: ChallengeAuthenticationPolicyOptions = {
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
  const { prepareRequest, getChallenge, processChallenge } = completeOptions;

  return {
    name: challengeAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (prepareRequest) {
        await prepareRequest(request);
      }
      const response = await next(request);
      if (
        getChallenge &&
        processChallenge &&
        (await processChallenge(request, getChallenge(response)))
      ) {
        return next(request);
      }
      return response;
    }
  };
}
