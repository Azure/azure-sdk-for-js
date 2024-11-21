// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// BaseRequestPolicy has a protected constructor.
/* eslint-disable @typescript-eslint/no-useless-constructor */

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

export function ndJsonPolicy(): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new NdJsonPolicy(nextPolicy, options);
    },
  };
}

/**
 * NdJsonPolicy that formats a JSON array as newline-delimited JSON
 */
class NdJsonPolicy extends BaseRequestPolicy {
  /**
   * Creates an instance of KeepAlivePolicy.
   */
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
  }

  /**
   * Sends a request.
   */
  public async sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    // There currently isn't a good way to bypass the serializer
    if (typeof request.body === "string" && request.body.startsWith("[")) {
      const body = JSON.parse(request.body);
      if (Array.isArray(body)) {
        request.body = body.map((item) => JSON.stringify(item) + "\n").join("");
      }
    }
    return this._nextPolicy.sendRequest(request);
  }
}
