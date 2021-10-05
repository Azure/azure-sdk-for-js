// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import { PipelinePolicy, PipelineResponse } from "@azure/core-rest-pipeline";

const APIM_SUBSCRIPTION_KEY_HEADER = "Ocp-Apim-Subscription-Key";

/**
 * Create an HTTP pipeline policy to authenticate a request using an `AzureKeyCredential` for Azure Form Recognizer
 * @internal
 */
export function createFormRecognizerAzureKeyCredentialPolicy(
  credential: KeyCredential
): PipelinePolicy {
  return {
    name: "cognitiveServicesApimSubscriptionKeyCredentialPolicy",
    sendRequest(request, next): Promise<PipelineResponse> {
      request.headers.set(APIM_SUBSCRIPTION_KEY_HEADER, credential.key);
      return next(request);
    },
  };
}
