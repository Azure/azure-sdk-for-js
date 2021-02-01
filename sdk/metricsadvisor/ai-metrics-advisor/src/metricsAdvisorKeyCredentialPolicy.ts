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
   * Subscription access key from the Azure portal
   */
  private subscriptionKey: string;

  /**
   * API key from the Metrics Advisor web portal
   */
  private apiKey: string;

  /**
   * Creates an instance of MetricsAdvisorKeyCredential
   *
   * @param subscriptionKey - Subscription access key from the Azure portal
   * @param apiKey - API key from the Metrics Advisor web portal
   */
  constructor(subscriptionKey: string, apiKey: string) {
    if(!subscription && !apiKey)
    this.subscriptionKey = subscriptionKey;
    this.apiKey = apiKey;
  }

  /**
   * Get Subscription key
   */
  public async getSubscriptionKey() {
    return this.subscriptionKey;
  }

  /**
   * Get Api Key
   */
  public async getApiKey() {
    return this.apiKey;
  }

  /**
   * Change the value of the subscription key.
   *
   * Updates will take effect upon the next request after
   * updating the key value.
   *
   * @param subscriptionKey - The new subscription key value to be used
   */
  public async updateSubscriptionKey(subscriptionKey: string) {
    if (!subscriptionKey) {
      throw new RangeError("subscriptionKey must be a non-empty string");
    }
    this.subscriptionKey = subscriptionKey;
  }

  /**
   * Change the value of the api key.
   *
   * Updates will take effect upon the next request after
   * updating the key value.
   *
   * @param apiKey - The new api key value to be used
   */
  public async updateApiKey(apiKey: string) {
    if (!apiKey) {
      throw new RangeError("apiKey must be a non-empty string");
    }
    this.apiKey = apiKey;
  }
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
    this.subscriptionKey = credential.getSubscriptionKey();
    this.apiKey = credential.getApiKey();
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
