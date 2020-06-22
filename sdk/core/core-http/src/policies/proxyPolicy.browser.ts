// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ProxySettings } from "../serviceClient";
import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResourceLike } from "../webResource";

const proxyNotSupportedInBrowser = new Error("ProxyPolicy is not supported in browser environment");

export function getDefaultProxySettings(_proxyUrl?: string): ProxySettings | undefined {
  return undefined;
}

export function proxyPolicy(_proxySettings?: ProxySettings): RequestPolicyFactory {
  return {
    create: (_nextPolicy: RequestPolicy, _options: RequestPolicyOptions) => {
      throw proxyNotSupportedInBrowser;
    }
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions) {
    super(nextPolicy, options);
    throw proxyNotSupportedInBrowser;
  }

  public sendRequest(_request: WebResourceLike): Promise<HttpOperationResponse> {
    throw proxyNotSupportedInBrowser;
  }
}
