// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  BaseRequestPolicy,
  RequestPolicy,
  RequestPolicyFactory,
  RequestPolicyOptions
} from "./requestPolicy";
import { HttpOperationResponse } from "../httpOperationResponse";
import { ProxySettings } from "../serviceClient";
import { WebResourceLike } from "../webResource";
import { Constants } from "../util/constants";
import { URLBuilder } from "../url";
import { getEnvironmentValue } from "../util/utils";

let noProxyList: string[] = [];
let isNoProxyInitalized = false;
let byPassedList = new Map();

function loadEnvironmentProxyValue(): string | undefined {
  if (!process) {
    return undefined;
  }

  const httpsProxy = getEnvironmentValue(Constants.HTTPS_PROXY);
  const allProxy = getEnvironmentValue(Constants.ALL_PROXY);
  const httpProxy = getEnvironmentValue(Constants.HTTP_PROXY);

  return httpsProxy || allProxy || httpProxy;
}

// Check whether the given `uri` matches the noProxyList. If it matches, any request sent to that same `uri` won't set the proxy settings.
function isBypassed(uri: string) {
  if (byPassedList.has(uri)) {
    return byPassedList.get(uri);
  }
  loadNoProxy();
  let isBypassed = false;
  let host = URLBuilder.parse(uri).getHost()!;
  for (const proxyString of noProxyList) {
    if (proxyString[0] === ".") {
      if (uri.endsWith(proxyString)) {
        isBypassed = true;
      } else {
        if (host === proxyString.slice(1) && host.length === proxyString.length - 1) {
          isBypassed = true;
        }
      }
    } else {
      if (host === proxyString) {
        isBypassed = true;
      }
    }
  }
  byPassedList.set(uri, isBypassed);
  return isBypassed;
}

function loadNoProxy() {
  if (isNoProxyInitalized) {
    return;
  }
  const noProxy = getEnvironmentValue(Constants.NO_PROXY);
  if (noProxy) {
    let list = noProxy.split(",");
    noProxyList = list.map((item) => item.trim()).filter((item) => item.length);
  }
  isNoProxyInitalized = true;
}

export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined {
  if (!proxyUrl) {
    proxyUrl = loadEnvironmentProxyValue();
    if (!proxyUrl) {
      return undefined;
    }
  }

  const { username, password, urlWithoutAuth } = extractAuthFromUrl(proxyUrl);
  const parsedUrl = URLBuilder.parse(urlWithoutAuth);
  const schema = parsedUrl.getScheme() ? parsedUrl.getScheme() + "://" : "";
  return {
    host: schema + parsedUrl.getHost(),
    port: Number.parseInt(parsedUrl.getPort() || "80"),
    username,
    password
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

function extractAuthFromUrl(
  url: string
): { username?: string; password?: string; urlWithoutAuth: string } {
  const atIndex = url.indexOf("@");
  if (atIndex === -1) {
    return { urlWithoutAuth: url };
  }

  const schemeIndex = url.indexOf("://");
  const authStart = schemeIndex !== -1 ? schemeIndex + 3 : 0;
  const auth = url.substring(authStart, atIndex);
  const colonIndex = auth.indexOf(":");
  const hasPassword = colonIndex !== -1;
  const username = hasPassword ? auth.substring(0, colonIndex) : auth;
  const password = hasPassword ? auth.substring(colonIndex + 1) : undefined;
  const urlWithoutAuth = url.substring(0, authStart) + url.substring(atIndex + 1);
  return {
    username,
    password,
    urlWithoutAuth
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

  public sendRequest(request: WebResourceLike): Promise<HttpOperationResponse> {
    if (!request.proxySettings && !isBypassed(request.url)) {
      request.proxySettings = this.proxySettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
