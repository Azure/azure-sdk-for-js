// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResource } from "../webResource";
import { Constants } from "../util/constants";
import { URLBuilder } from "../url";

function loadEnvironmentProxyValue(): string | undefined {
  let httpProxy = null;
  let httpsProxy = null;
  let allProxy = null;
  let noProxy = null;

  if (!process) {
    return undefined;
  }

  if (process.env[Constants.HTTPS_PROXY]) {
    httpsProxy = process.env[Constants.HTTPS_PROXY];
  } else if (process.env[Constants.HTTPS_PROXY.toLowerCase()]) {
    httpsProxy = process.env[Constants.HTTPS_PROXY.toLowerCase()];
  } else if (process.env[Constants.HTTP_PROXY]) {
    httpProxy = process.env[Constants.HTTP_PROXY];
  } else if (process.env[Constants.HTTP_PROXY.toLowerCase()]) {
    httpProxy = process.env[Constants.HTTP_PROXY.toLowerCase()];
  }

  if (httpProxy == null || httpsProxy == null) {
    if (process.env[Constants.ALL_PROXY]) {
      allProxy = process.env[Constants.ALL_PROXY];
    } else if (process.env[Constants.ALL_PROXY.toLowerCase()]) {
      allProxy = process.env[Constants.ALL_PROXY.toLowerCase()];
    }

    if (httpProxy == null) {
      httpProxy = allProxy;
    } else {
      httpsProxy = allProxy;
    }
  }

  if (httpProxy == null && httpsProxy == null) {
    if (process.env[Constants.NO_PROXY]) {
      noProxy = process.env[Constants.NO_PROXY];
    } else if (process.env[Constants.NO_PROXY.toLowerCase()]) {
      noProxy = process.env[Constants.NO_PROXY.toLowerCase()];
    }
    if (noProxy) {
      return noProxy;
    }
  }

  if (httpsProxy) {
    return httpsProxy;
  } else if (httpProxy) {
    return httpProxy;
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
  if (!proxySettings) {
    proxySettings = getDefaultProxySettings();
  }
  return {
    create: (nextPolicy: RequestPolicy, options: RequestPolicyOptions) => {
      return new ProxyPolicy(nextPolicy, options, proxySettings!);
    }
  };
}

export class ProxyPolicy extends BaseRequestPolicy {
  proxySettings: ProxySettings;

  constructor(
    nextPolicy: RequestPolicy,
    options: RequestPolicyOptions,
    proxySettings: ProxySettings
  ) {
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
