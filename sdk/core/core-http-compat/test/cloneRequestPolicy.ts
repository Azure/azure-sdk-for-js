// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  CompatResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
  WebResourceLike,
} from "@azure/core-http-compat";

export function cloneRequestPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptionsLike) => {
      return new CloneRequestPolicy(nextPolicy, options);
    },
  };
}

export class CloneRequestPolicy {
  constructor(
    private _nextPolicy: RequestPolicy,
    _options: RequestPolicyOptionsLike,
  ) {
    /** Nothing much to do here */
  }

  public async sendRequest(request: WebResourceLike): Promise<CompatResponse> {
    return this._nextPolicy.sendRequest(request.clone());
  }
}
