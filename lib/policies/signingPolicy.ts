// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { ServiceClientCredentials } from "../credentials/serviceClientCredentials";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import { BaseRequestPolicy, RequestPolicyCreator, RequestPolicy } from "./requestPolicy";

export function signingPolicy(authenticationProvider: ServiceClientCredentials): RequestPolicyCreator {
  return (nextPolicy: RequestPolicy) => {
    return new SigningPolicy(nextPolicy, authenticationProvider);
  };
}

export class SigningPolicy extends BaseRequestPolicy {

  constructor(nextPolicy: RequestPolicy, public authenticationProvider: ServiceClientCredentials) {
    super(nextPolicy);
  }

  before(request: WebResource): Promise<WebResource> {
    return this.authenticationProvider.signRequest(request);
  }

  public async sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    const nextRequest: WebResource = await this.before(request);
    return await this._nextPolicy.sendRequest(nextRequest);
  }
}
