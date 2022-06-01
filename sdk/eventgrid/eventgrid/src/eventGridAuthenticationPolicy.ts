// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential, SASCredential } from "@azure/core-auth";
import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  PipelinePolicy,
} from "@azure/core-rest-pipeline";

import { isKeyCredentialLike } from "./util";

/**
 * The name of the header to include when a Shared Key is used for authentication.
 */
const API_KEY_HEADER_NAME = "aeg-sas-key";

/**
 * The name of the header to include when Shared Access Signature is used for authentication.
 */
const SAS_TOKEN_HEADER_NAME = "aeg-sas-token";

/**
 * The programmatic identifier of the eventGridCredentialPolicy.
 */
export const eventGridCredentialPolicyName = "eventGridCredentialPolicy";

/**
 * A concrete implementation of an AzureKeyCredential policy
 * using the appropriate header for Event Grid
 */
export function eventGridCredentialPolicy(
  credential: KeyCredential | SASCredential
): PipelinePolicy {
  return {
    name: eventGridCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (isKeyCredentialLike(credential)) {
        request.headers.set(API_KEY_HEADER_NAME, credential.key);
      } else {
        request.headers.set(SAS_TOKEN_HEADER_NAME, credential.signature);
      }

      return next(request);
    },
  };
}
