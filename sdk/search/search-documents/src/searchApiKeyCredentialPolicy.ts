// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KeyCredential } from "@azure/core-auth";
import type {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";

const API_KEY_HEADER_NAME = "api-key";
const searchApiKeyCredentialPolicy = "SearchApiKeyCredentialPolicy";

/**
 * Create an HTTP pipeline policy to authenticate a request using an `AzureKeyCredential` for Azure
 * AI Search
 */
export function createSearchApiKeyCredentialPolicy(credential: KeyCredential): PipelinePolicy {
  return {
    name: searchApiKeyCredentialPolicy,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.headers.has(API_KEY_HEADER_NAME)) {
        request.headers.set(API_KEY_HEADER_NAME, credential.key);
      }
      return next(request);
    },
  };
}
