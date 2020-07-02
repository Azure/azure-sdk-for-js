// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest, PipelinePolicy } from "@azure/core-https";
import { ServiceClientCredentials } from "./interfaces";

/**
 * The programmatic identifier of the signingPolicy.
 */
export const signingPolicyName = "signingPolicy";

/**
 * This policy handles signing requests with ServiceClientCredentials
 */
export function signingPolicy(authenticationProvider: ServiceClientCredentials): PipelinePolicy {
  return {
    name: signingPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      const signedRequest = await authenticationProvider.signRequest(request);
      return next(signedRequest);
    }
  };
}
