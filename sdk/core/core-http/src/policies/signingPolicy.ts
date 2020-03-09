// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicyFactory,
  RequestPolicy,
  RequestPolicyOptions
} from "./requestPolicy";

export function signingPolicy(
  authenticationProvider: ServiceClientCredentials
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new SigningPolicy(nextPolicy, options, authenticationProvider);
    }
  };
}

export class SigningPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    public authenticationProvider: ServiceClientCredentials
  ) {
    super(nextPolicy, options);
  }

  signRequest(request: WebResource): Promise<WebResource> {
    return this.authenticationProvider.signRequest(request);
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    return this.signRequest(request).then((nextRequest) =>
      this._nextPolicy.sendRequest(nextRequest)
    );
  }
}
