// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BearerTokenAuthenticationPolicyOptions,
  PipelinePolicy,
  bearerTokenAuthenticationPolicy,
} from "@azure/core-rest-pipeline";
import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { createCommunicationAccessKeyCredentialPolicy } from "./communicationAccessKeyCredentialPolicy";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export function createCommunicationAuthPolicy(
  credential: KeyCredential | TokenCredential
): PipelinePolicy {
  if (isTokenCredential(credential)) {
    const policyOptions: BearerTokenAuthenticationPolicyOptions = {
      credential: credential,
      scopes: ["https://communication.azure.com//.default"],
    };
    return bearerTokenAuthenticationPolicy(policyOptions);
  } else {
    return createCommunicationAccessKeyCredentialPolicy(credential);
  }
}
