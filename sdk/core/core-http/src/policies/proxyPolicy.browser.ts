// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions,
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResourceLike } from "../webResource";

export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  return undefined;
}

export function proxyPolicy(_proxySettings?: ProxySettings): RequestPolicyFactory {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      throw new Error("ProxyPolicy is not supported in browser environment");
    },
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
    throw new Error("ProxyPolicy is not supported in browser environment");
  }

  public sendRequest(_request: WebResourceLike): Promise<HttpOperationResponse> {
    throw new Error("ProxyPolicy is not supported in browser environment");
  }
}
