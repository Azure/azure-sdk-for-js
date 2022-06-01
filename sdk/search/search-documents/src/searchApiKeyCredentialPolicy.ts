// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineRequest,
  SendRequest,
  PipelineResponse,
} from "@azure/core-rest-pipeline";

const API_KEY_HEADER_NAME = "api-key";
const searchApiKeyCredentialPolicy = "SearchApiKeyCredentialPolicy";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Cognitive Search
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
