// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
import { WebResourceLike } from "../webResource";

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

  signRequest(request: WebResourceLike): Promise<WebResourceLike> {
    return this.authenticationProvider.signRequest(request);
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    return this.signRequest(request).then((nextRequest) =>
      this._nextPolicy.sendRequest(nextRequest)
    );
  }
}
