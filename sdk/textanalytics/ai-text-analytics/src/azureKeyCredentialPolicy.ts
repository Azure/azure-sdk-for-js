// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  PipelinePolicy,
  PipelineRequest,
  PipelineResponse,
  SendRequest,
} from "@azure/core-rest-pipeline";
import { KeyCredential } from "@azure/core-auth";

const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";

/**
 * The programmatic identifier of the textAnalyticsAzureKeyCredentialPolicy.
 */
const textAnalyticsAzureKeyCredentialPolicyName = "textAnalyticsAzureKeyCredentialPolicy";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Text Analytics
 * @internal
 */
export function textAnalyticsAzureKeyCredentialPolicy(credential: KeyCredential): PipelinePolicy {
  return {
    name: textAnalyticsAzureKeyCredentialPolicyName,
    sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      request.headers.set(API_KEY_HEADER_NAME, credential.key);
      return next(request);
    },
  };
}
