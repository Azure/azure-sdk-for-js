// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";

/**
 * Generates a policy that assigns the client request Id header to outgoing requests.
 * The name of the header is specified through the first parameter sent to `generateClientRequestIdPolicy`,
 * and the value of the header is obtained from the outgoing request's `requestId` property.
 * @param requestIdHeaderName - Name of the client request Id header.
 * @returns A request policy that sets the request Id on the HTTP headers.
 */
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

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.headers.contains(this._requestIdHeaderName)) {
      request.headers.set(this._requestIdHeaderName, request.requestId);
    }
    return this._nextPolicy.sendRequest(request);
  }
}
