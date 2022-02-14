// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import {
  bearerTokenAuthenticationPolicy,
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";
import { createCommunicationKeyCredentialPolicy } from "./communicationKeyCredentialPolicy";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export const createCommunicationAuthenticationPolicy = (
  credential: KeyCredential | TokenCredential
): PipelinePolicy => {
  if (isTokenCredential(credential)) {
    const policyOptions: BearerTokenAuthenticationPolicyOptions = {
      credential: credential,
      scopes: ["https://communication.azure.com//.default"],
    };
    return bearerTokenAuthenticationPolicy(policyOptions);
  } else {
    return createCommunicationKeyCredentialPolicy(credential);
  }
};
