// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { isTokenCredential, KeyCredential, TokenCredential } from "@azure/core-auth";
import { bearerTokenAuthenticationPolicy, RequestPolicyFactory } from "@azure/core-http";
import { createCommunicationAccessKeyCredentialPolicy } from "./communicationAccessKeyCredentialPolicy";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 *
 * @param credential - The KeyCredential or TokenCredential.
 */
export const createCommunicationAuthPolicy = (
  credential: KeyCredential | TokenCredential
): RequestPolicyFactory => {
  if (isTokenCredential(credential)) {
    return bearerTokenAuthenticationPolicy(credential, "https://communication.azure.com//.default");
  } else {
    return createCommunicationAccessKeyCredentialPolicy(credential);
  }
};
