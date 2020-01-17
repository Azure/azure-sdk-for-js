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

function environmentProxyValue(name: string): string | undefined {
  if (process.env[name]) {
    return process.env[name];
  } else if (process.env[name.toLowerCase()]) {
    return process.env[name.toLowerCase()];
  }
  return undefined;
}

function loadEnvironmentProxyValue(): string | undefined {
  let httpProxy = null;
  let httpsProxy = null;
  let allProxy = null;
  let noProxy = null;

  if (!process) {
    return undefined;
  }

  httpsProxy = environmentProxyValue(Constants.HTTPS_PROXY);
  httpProxy = environmentProxyValue(Constants.HTTP_PROXY);

  if (httpProxy == undefined || httpsProxy == undefined) {
    allProxy = environmentProxyValue(Constants.ALL_PROXY);

    if (httpProxy == undefined) {
      httpProxy = allProxy;
    } else {
      httpsProxy = allProxy;
    }
  }

  if (httpProxy == undefined && httpsProxy == undefined) {
    noProxy = environmentProxyValue(Constants.NO_PROXY);
    if (noProxy != undefined) {
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
