// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
import {
  RequestPolicyFactory,
  RequestPolicy,
  BaseRequestPolicy,
  WebResourceLike,
  HttpOperationResponse,
  RequestPolicyOptionsLike
} from "@azure/core-http";

const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Text Analytics
 */
export function createTextAnalyticsAzureKeyCredentialPolicy(
  credential: KeyCredential
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new TextAnalyticsAzureKeyCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

/**
 * A concrete implementation of an AzureKeyCredential policy
 * using the appropriate header for TextAnalytics
 */
class TextAnalyticsAzureKeyCredentialPolicy extends BaseRequestPolicy {
  private credential: KeyCredential;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    credential: KeyCredential
  ) {
    super(nextPolicy, options);
    this.credential = credential;
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    webResource.headers.set(API_KEY_HEADER_NAME, this.credential.key);
    return this._nextPolicy.sendRequest(webResource);
  }
}
