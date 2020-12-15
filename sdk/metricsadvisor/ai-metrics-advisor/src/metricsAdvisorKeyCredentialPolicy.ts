// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions,
  BaseRequestPolicy,
  HttpOperationResponse,
  RequestPolicyOptionsLike,
  WebResourceLike
} from "@azure/core-http";

const API_KEY_HEADER_NAME = "Ocp-Apim-Subscription-Key";
const X_API_KEY_HEADER_NAME = "x-api-key";

/**
 * Credential used to authenticate and authorize with Metrics Advisor service
 */
export class MetricsAdvisorKeyCredential {
  /**
   * Creates an instance of MetricsAdvisorKeyCredential
   *
   * @param subscriptionKey - Subscription access key from the Azure portal
   * @param apiKey - API key from the Metrics Advisor web portal
   */
  constructor(readonly subscriptionKey: string, readonly apiKey: string) {}
}

/**
 * Creates an HTTP pipeline policy to authenticate a request
 * using an `MetricsAdvisorKeyCredential`
 */
export function createMetricsAdvisorKeyCredentialPolicy(
  credential: MetricsAdvisorKeyCredential
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new MetricsAdvisorKeyCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

/**
 * A concrete implementation of an MetricsAdvisorKeyCredential policy
 * using the appropriate header
 */
class MetricsAdvisorKeyCredentialPolicy extends BaseRequestPolicy {
  private subscriptionKey: string;
  private apiKey: string;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    credential: MetricsAdvisorKeyCredential
  ) {
    super(nextPolicy, options);
    this.subscriptionKey = credential.subscriptionKey;
    this.apiKey = credential.apiKey;
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    webResource.headers.set(API_KEY_HEADER_NAME, this.subscriptionKey);
    webResource.headers.set(X_API_KEY_HEADER_NAME, this.apiKey);
    return this._nextPolicy.sendRequest(webResource);
  }
}
