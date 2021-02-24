// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { CommunicationTokenCredential } from "@azure/communication-common";
import { RequestPolicyFactory, bearerTokenAuthenticationPolicy } from "@azure/core-http";

/**
 * Creates a new CommunicationTokenCredentialPolicy factory.
 *
 * @param credential - The CommunicationTokenCredential implementation that can supply the user credential.
 */
export const createCommunicationTokenCredentialPolicy = (
  credential: CommunicationTokenCredential
): RequestPolicyFactory => {
  return bearerTokenAuthenticationPolicy(
    {
      getToken: (_scopes, options) => credential.getToken(options?.abortSignal)
    },
    []
  );
};
