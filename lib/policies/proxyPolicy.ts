// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResource } from "../webResource";

export function proxyPolicy(proxySettings: ProxySettings): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ProxyPolicy(nextPolicy, options, proxySettings);
    }
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  proxySettings: ProxySettings;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, proxySettings: ProxySettings) {
    super(nextPolicy, options);
    this.proxySettings = proxySettings;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!request.proxySettings) {
      request.proxySettings = this.proxySettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
