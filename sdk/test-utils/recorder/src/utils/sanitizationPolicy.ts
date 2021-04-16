// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
  HttpOperationResponse,
  WebResourceLike
} from "@azure/core-http";
import { isPlaybackMode } from "./index";

export interface SanitizationOptions {
  headerNames: string[];
  searchParamNames: string[];
  bodySanitizers: Array<(content: string) => string>;
}

export class SanitizationPolicy extends BaseRequestPolicy {
  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    private sanitizationOptions: SanitizationOptions = {
      headerNames: [],
      searchParamNames: [],
      bodySanitizers: []
    }
  ) {
    super(nextPolicy, options);
  }

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (isPlaybackMode()) {
      for (const headerName of this.sanitizationOptions.headerNames) {
        if (request.headers.get(headerName)) {
          request.headers.set(headerName, "SANITIZED");
        }
      }
      for (const searchParam of this.sanitizationOptions.searchParamNames) {
        if (request.query && request.query[searchParam]) {
          request.query[searchParam] = "SANITIZED";
        }
      }
      let sanitizedBody = request.body;
      for (const bodySanitizers of this.sanitizationOptions.bodySanitizers) {
        sanitizedBody = bodySanitizers(sanitizedBody);
      }
      request.body = sanitizedBody;
    }

    return this._nextPolicy.sendRequest(request);
  }
}

export function sanitizationPolicy(
  sanitizationOptions?: SanitizationOptions
): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new SanitizationPolicy(nextPolicy, options, sanitizationOptions);
    }
  };
}
