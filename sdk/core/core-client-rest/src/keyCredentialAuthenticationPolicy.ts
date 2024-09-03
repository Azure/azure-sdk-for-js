// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { KeyCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

/**
 * The programmatic identifier of the bearerTokenAuthenticationPolicy.
 */
export const keyCredentialAuthenticationPolicyName = "keyCredentialAuthenticationPolicy";

export function keyCredentialAuthenticationPolicy(
  credential: KeyCredential,
  apiKeyHeaderName: string,
): PipelinePolicy {
  return {
    name: keyCredentialAuthenticationPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set(apiKeyHeaderName, credential.key);
      return next(request);
    },
  };
}
