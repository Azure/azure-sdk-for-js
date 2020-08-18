// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as http from "http";
import * as https from "https";
import * as tunnel from "tunnel";

import { ProxySettings } from "./serviceClient";
import { URLBuilder } from "./url";
import { HttpHeadersLike } from "./httpHeaders";

export type ProxyAgent = { isHttps: boolean; agent: http.Agent | https.Agent };
export function createProxyAgent(
  requestUrl: string,
  proxySettings: ProxySettings,
  headers?: HttpHeadersLike
): ProxyAgent {
  const host = URLBuilder.parse(proxySettings.host).getHost() as string;
  if (!host) {
    throw new Error("Expecting a non-empty host in proxy settings.");
  }
  if (!isValidPort(proxySettings.port)) {
    throw new Error("Expecting a valid port number in the range of [0, 65535] in proxy settings.");
  }
  const tunnelOptions: tunnel.HttpsOverHttpsOptions = {
    proxy: {
      host: host,
      port: proxySettings.port,
      headers: (headers && headers.rawHeaders()) || {}
    }
  };

  if (proxySettings.username && proxySettings.password) {
    tunnelOptions.proxy!.proxyAuth = `${proxySettings.username}:${proxySettings.password}`;
  }

  const isRequestHttps = isUrlHttps(requestUrl);
  const isProxyHttps = isUrlHttps(proxySettings.host);

  const proxyAgent = {
    isHttps: isRequestHttps,
    agent: createTunnel(isRequestHttps, isProxyHttps, tunnelOptions)
  };

  return proxyAgent;
}

export function isUrlHttps(url: string): boolean {
  const urlScheme = URLBuilder.parse(url).getScheme() || "";
  return urlScheme.toLowerCase() === "https";
}

export function createTunnel(
  isRequestHttps: boolean,
  isProxyHttps: boolean,
  tunnelOptions: tunnel.HttpsOverHttpsOptions
): http.Agent | https.Agent {
  if (isRequestHttps && isProxyHttps) {
    return tunnel.httpsOverHttps(tunnelOptions);
  } else if (isRequestHttps && !isProxyHttps) {
    return tunnel.httpsOverHttp(tunnelOptions);
  } else if (!isRequestHttps && isProxyHttps) {
    return tunnel.httpOverHttps(tunnelOptions);
  } else {
    return tunnel.httpOverHttp(tunnelOptions);
  }
}

function isValidPort(port: number): boolean {
  // any port in 0-65535 range is valid (RFC 793) even though almost all implementations
  // will reserve 0 for a specific purpose, and a range of numbers for ephemeral ports
  return 0 <= port && port <= 65535;
}
