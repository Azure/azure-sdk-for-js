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
 * Options for how HTTP connections generate the client request id header
 * requests.
 */
export interface ClientRequestIdOptions {
  /**
   * The header name to use for the client request id
   */
  requestIdHeaderName?: string;
  /**
   * Whether or not to include a the generateClientRequestPolicyId pipeline
   */
  disable?: boolean;
}

/**
 * Default options for ClientRequestId policy
 */
export const DefaultClientRequestIdOptions: ClientRequestIdOptions = {
  requestIdHeaderName: "x-ms-client-request-id",
  disable: false
};

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
