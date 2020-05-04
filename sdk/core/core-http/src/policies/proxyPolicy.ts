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
    if (!request.proxySettings) {
      request.proxySettings = this.proxySettings;
    }
    return this._nextPolicy.sendRequest(request);
  }
}
