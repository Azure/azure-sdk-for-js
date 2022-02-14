// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, TokenCredential, isTokenCredential } from "@azure/core-auth";
import { RequestPolicyFactory, bearerTokenAuthenticationPolicy } from "@azure/core-http";
import { createCommunicationAccessKeyCredentialPolicy } from "./communicationAccessKeyCredentialPolicy";
/**
 * Creates a pipeline policy to authenticate request based
 * on the credential passed in.
 * @hidden
 * @deprecated Use `createCommunicationAuthenticationPolicy` instead.
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
