// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  WebResourceLike,
  HttpOperationResponse,
  RequestPolicyFactory
} from "@azure/core-http";

/**
 * Implements the X-Api-Key policy used for the public demo workspace for Azure Log Analytics.
 * Customers can use this to get started with the API immediately, without setting up their own server.
 * More here: https://dev.loganalytics.io/
 *
 * @internal
 */
export function demoApiKeyAuthenticationPolicy(): RequestPolicyFactory {
  class DemoApiKeyAuthenticationPolicy extends BaseRequestPolicy {
    // eslint-disable-next-line @azure/azure-sdk/ts-use-interface-parameters
    public constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
      super(nextPolicy, options);
    }

    public async sendRequest(webResource: WebResourceLike): Promise<HttpOperationResponse> {
      webResource.headers.set("X-Api-Key", `DEMO_KEY`);
      return this._nextPolicy.sendRequest(webResource);
    }
  }

  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPolicy => {
      return new DemoApiKeyAuthenticationPolicy(nextPolicy, options);
    }
  };
}
