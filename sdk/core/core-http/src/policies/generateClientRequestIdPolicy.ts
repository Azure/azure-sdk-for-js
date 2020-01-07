// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";

export function generateClientRequestIdPolicy(
  requestIdHeaderName = "x-ms-client-request-id"
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new GenerateClientRequestIdPolicy(nextPolicy, options, requestIdHeaderName);
    }
  };
}

export class GenerateClientRequestIdPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private _requestIdHeaderName: string
  ) {
    super(nextPolicy, options);
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!request.headers.contains(this._requestIdHeaderName)) {
      request.headers.set(this._requestIdHeaderName, request.requestId);
    }
    return this._nextPolicy.sendRequest(request);
  }
}
