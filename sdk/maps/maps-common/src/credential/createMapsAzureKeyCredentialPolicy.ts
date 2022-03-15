// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";

const API_KEY_HEADER_NAME = "subscription-key";

/**
 * The programmatic identifier of the mapsAzureKeyCredentialPolicy.
 */
const mapsAzureKeyCredentialPolicyName = "mapsAzureKeyCredentialPolicy";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Maps
 */
export function createMapsAzureKeyCredentialPolicy(
  azureKeyCredential: KeyCredential
): PipelinePolicy {
  return {
    name: mapsAzureKeyCredentialPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(API_KEY_HEADER_NAME)) {
        request.headers.set(API_KEY_HEADER_NAME, azureKeyCredential.key);
      }
      return next(request);
    },
  };
}
