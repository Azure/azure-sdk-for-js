// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CommunicationTokenCredential } from "@azure/communication-common";
import type {
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { bearerTokenAuthenticationPolicy } from "@azure/core-rest-pipeline";

/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
export const createCommunicationTokenCredentialPolicy = (
  credential: CommunicationTokenCredential,
): PipelinePolicy => {
  const policyOptions: BearerTokenAuthenticationPolicyOptions = {
    credential: {
      getToken: (_scopes, options) => credential.getToken({ abortSignal: options?.abortSignal }),
    },
    scopes: [],
  };

  return bearerTokenAuthenticationPolicy(policyOptions);
};
