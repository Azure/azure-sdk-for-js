// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as http from "http";
import * as https from "https";
import * as tunnel from "tunnel";

import { ProxySettings } from "./serviceClient";
import { URLBuilder } from "./url";
import { HttpHeaders } from "./httpHeaders";

export type ProxyAgent = { isHttps: boolean; agent: http.Agent | https.Agent };
export function createProxyAgent(requestUrl: string, proxySettings: ProxySettings, headers?: HttpHeaders): ProxyAgent {
  const tunnelOptions: tunnel.HttpsOverHttpsOptions = {
    proxy: {
      host: URLBuilder.parse(proxySettings.host).getHost() as string,
      port: proxySettings.port,
      headers: (headers && headers.rawHeaders()) || {}
    }
  };

  if ((proxySettings.username && proxySettings.password)) {
    tunnelOptions.proxy!.proxyAuth = `${proxySettings.username}:${proxySettings.password}`;
  }

  const requestScheme = URLBuilder.parse(requestUrl).getScheme() || "";
  const isRequestHttps = requestScheme.toLowerCase() === "https";
  const proxyScheme = URLBuilder.parse(proxySettings.host).getScheme() || "";
  const isProxyHttps = proxyScheme.toLowerCase() === "https";

  const proxyAgent = {
    isHttps: isRequestHttps,
    agent: createTunnel(isRequestHttps, isProxyHttps, tunnelOptions)
  };

  return proxyAgent;
}

export function createTunnel(isRequestHttps: boolean, isProxyHttps: boolean, tunnelOptions: tunnel.HttpsOverHttpsOptions): http.Agent | https.Agent {
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
