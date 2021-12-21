// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

/**
 * Creates a policy that assigns a unique request id to outgoing requests.
 * @param requestIdHeaderName - The name of the header to use when assigning the unique id to the request.
 */
export function generateClientRequestIdPolicy(
  requestIdHeaderName = "x-ms-client-request-id"
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new GenerateClientRequestIdPolicy(nextPolicy, options, requestIdHeaderName);
    },
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

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.headers.contains(this._requestIdHeaderName)) {
      request.headers.set(this._requestIdHeaderName, request.requestId);
    }
    return this._nextPolicy.sendRequest(request);
  }
}
