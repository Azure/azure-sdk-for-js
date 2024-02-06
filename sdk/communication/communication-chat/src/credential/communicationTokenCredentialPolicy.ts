// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationTokenCredential } from "@azure/communication-common";
import {
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";

/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
export const createCommunicationTokenCredentialPolicy = (
  credential: CommunicationTokenCredential
): PipelinePolicy => {
  const policyOptions: BearerTokenAuthenticationPolicyOptions = {
    credential: {
      getToken: (_scopes, options) => credential.getToken({ abortSignal: options?.abortSignal }),
    },
    scopes: [],
  };

  return bearerTokenAuthenticationPolicy(policyOptions);
};
