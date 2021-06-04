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
 * Interface parameters for updateKey function
 */
export interface MetricsAdvisorKeys {
  apiKey?: string;
  subscriptionKey?: string;
}

/**
 * Credential used to authenticate and authorize with Metrics Advisor service
 */
export class MetricsAdvisorKeyCredential {
  /**
   * Subscription access key from the Azure portal
   */
  private _subscriptionKey: string;

  /**
   * API key from the Metrics Advisor web portal
   */
  private _apiKey: string;

  /**
   * Creates an instance of MetricsAdvisorKeyCredential
   *
   * @param subscriptionKey - Subscription access key from the Azure portal
   * @param apiKey - API key from the Metrics Advisor web portal
   */
  constructor(subscriptionKey: string, apiKey: string) {
    if (!subscriptionKey || !apiKey) {
      throw new RangeError("Subscription Key or Api Key doesn't have a valid value");
    }
    this._subscriptionKey = subscriptionKey;
    this._apiKey = apiKey;
  }

  /**
   * Get Api Key
   */
  public get apiKey(): string {
    return this._apiKey;
  }

  /**
   * Get Subscription key
   */
  public get subscriptionKey(): string {
    return this._subscriptionKey;
  }

  /**
   * Change the value of the subscription and/or api keys.
   *
   * Updates will take effect upon the next request after
   * updating the key value.
   *
   * @param subscriptionKey - The new subscription key value to be used
   * @param apiKey - The new api key value to be used
   */
  public updateKey(metricAdvisorKeys: MetricsAdvisorKeys): void {
    if (!metricAdvisorKeys.subscriptionKey && !metricAdvisorKeys.apiKey) {
      throw new Error("At least one of the subscriptionKey and apiKey must be a non-empty string");
    }
    if (metricAdvisorKeys.subscriptionKey) {
      this._subscriptionKey = metricAdvisorKeys.subscriptionKey;
    }
    if (metricAdvisorKeys.apiKey) {
      this._apiKey = metricAdvisorKeys.apiKey;
    }
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
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptionsLike,
    private _credential: MetricsAdvisorKeyCredential
  ) {
    super(nextPolicy, options);
  }

  public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
    if (!webResource) {
      throw new Error("webResource cannot be null or undefined");
    }

    webResource.headers.set(API_KEY_HEADER_NAME, this._credential.subscriptionKey);
    webResource.headers.set(X_API_KEY_HEADER_NAME, this._credential.apiKey);
    return this._nextPolicy.sendRequest(webResource);
  }
}
