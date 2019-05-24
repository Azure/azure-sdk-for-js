// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { BaseRequestPolicy, RequestPolicy, RequestPolicyFactory, RequestPolicyOptions } from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResource } from "../webResource";
import { Constants } from "../util/constants";
import { URLBuilder } from "../url";

function loadEnvironmentProxyValue(): string | undefined {
  if (!process) {
    return undefined;
  }

  if (process.env[Constants.HTTPS_PROXY]) {
    return process.env[Constants.HTTPS_PROXY];
  } else if (process.env[Constants.HTTPS_PROXY.toLowerCase()]) {
    return process.env[Constants.HTTPS_PROXY.toLowerCase()];
  } else if (process.env[Constants.HTTP_PROXY]) {
    return process.env[Constants.HTTP_PROXY];
  } else if (process.env[Constants.HTTP_PROXY.toLowerCase()]) {
    return process.env[Constants.HTTP_PROXY.toLowerCase()];
  }

  return undefined;
}

export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined {
  if (!proxyUrl) {
    proxyUrl = loadEnvironmentProxyValue();
    if (!proxyUrl) {
      return undefined;
    }
  }

  const parsedUrl = URLBuilder.parse(proxyUrl);
  return {
    host: parsedUrl.getScheme() + "://" + parsedUrl.getHost(),
    port: Number.parseInt(parsedUrl.getPort() || "80")
  };
}


export function proxyPolicy(proxySettings?: ProxySettings): RequestPolicyFactory {
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ProxyPolicy(nextPolicy, options, proxySettings!);
    }
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  proxySettings: ProxySettings;

  constructor(nextPolicy: RequestPolicy, options: RequestPolicyOptions, proxySettings: ProxySettings) {
    super(nextPolicy, options);
    this.proxySettings = proxySettings;
  }

  public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
    if (!request.proxySettings) {
      request.proxySettings = this.proxySettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
