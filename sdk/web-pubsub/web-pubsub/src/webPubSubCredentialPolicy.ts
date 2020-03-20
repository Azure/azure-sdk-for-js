// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyOptions,
  WebResource,
  HttpOperationResponse
} from "@azure/core-http";
import { AzureKeyCredential } from "@azure/core-auth";

import jwt from "jsonwebtoken";

export function webPubSubAzureKeyCredentialPolicyFactory(credential: AzureKeyCredential) {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new WebPubSubKeyCredentialPolicy(nextPolicy, options, credential);
    }
  };
}

export class WebPubSubKeyCredentialPolicy extends BaseRequestPolicy {
  public credential: AzureKeyCredential;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    credential: AzureKeyCredential
  ) {
    super(nextPolicy, options);
    this.credential = credential;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    request.headers.set(
      "Authorization",
      "Bearer " +
        jwt.sign({}, this.credential.key, {
          audience: request.url,
          expiresIn: "1h",
          algorithm: "HS256"
        })
    );

    return this._nextPolicy.sendRequest(request);
  }
}
