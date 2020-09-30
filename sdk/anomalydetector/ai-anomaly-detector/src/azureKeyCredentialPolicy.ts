// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { KeyCredential } from "@azure/core-auth";
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

/**
 * Create an HTTP pipeline policy to authenticate a request
 * using an `AzureKeyCredential` for Azure Anomaly Detector
 */
export function createAnomalyDetectorAzureKeyCredentialPolicy(
  credential: KeyCredential
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new AnomalyDetectorAzureKeyCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

/**
 * A concrete implementation of an AzureKeyCredential policy
 * using the appropriate header for Azure Anomaly Detector
 */
class AnomalyDetectorAzureKeyCredentialPolicy extends BaseRequestPolicy {
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
    webResource.headers.set(API_KEY_HEADER_NAME, this.credential.key);
    return this._nextPolicy.sendRequest(webResource);
  }
}
