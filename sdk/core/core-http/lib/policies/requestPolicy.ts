// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";

/**
 * Creates a new RequestPolicy per-request that uses the provided nextPolicy.
 */
export type RequestPolicyFactory = {
  create(nextPolicy: RequestPolicy, options: RequestPolicyOptions): RequestPolicy
};

export interface RequestPolicy {
  sendRequest(httpRequest: WebResource): Promise<HttpOperationResponse>;
}

export abstract class BaseRequestPolicy implements RequestPolicy {
  protected constructor(readonly _nextPolicy: RequestPolicy, readonly _options: RequestPolicyOptions) {
  }

  public abstract sendRequest(webResource: WebResource): Promise<HttpOperationResponse>;
}

export interface RequestPolicyOptions { }