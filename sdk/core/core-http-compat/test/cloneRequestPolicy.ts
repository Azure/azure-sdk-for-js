// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CompatResponse,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptionsLike,
  WebResourceLike,
} from "../src/index.js";

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
