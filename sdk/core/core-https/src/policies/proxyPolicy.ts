// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PipelineResponse, PipelineRequest, SendRequest, ProxySettings } from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { URL } from "../util/url";

const HTTPS_PROXY = "HTTPS_PROXY";
const HTTP_PROXY = "HTTP_PROXY";

/**
 * The programmatic identifier of the proxyPolicy.
 */
export const proxyPolicyName = "proxyPolicy";

function loadEnvironmentProxyValue(): string | undefined {
  if (!process) {
    return undefined;
  }

  if (process.env[HTTPS_PROXY]) {
    return process.env[HTTPS_PROXY];
  } else if (process.env[HTTPS_PROXY.toLowerCase()]) {
    return process.env[HTTPS_PROXY.toLowerCase()];
  } else if (process.env[HTTP_PROXY]) {
    return process.env[HTTP_PROXY];
  } else if (process.env[HTTP_PROXY.toLowerCase()]) {
    return process.env[HTTP_PROXY.toLowerCase()];
  }

  return undefined;
}

/**
 * This method converts a proxy url into `ProxySettings` for use with ProxyPolicy.
 * If no argument is given, it attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 * @param proxyUrl The url of the proxy to use. May contain authentication information.
 */
export function getDefaultProxySettings(proxyUrl?: string): ProxySettings | undefined {
  if (!proxyUrl) {
    proxyUrl = loadEnvironmentProxyValue();
    if (!proxyUrl) {
      return undefined;
    }
  }

  const parsedUrl = new URL(proxyUrl);
  const schema = parsedUrl.protocol ? parsedUrl.protocol + "//" : "";
  return {
    host: schema + parsedUrl.hostname,
    port: Number.parseInt(parsedUrl.port || "80"),
    username: parsedUrl.username,
    password: parsedUrl.password
  };
}

/**
 * A policy that allows one to apply proxy settings to all requests.
 * If not passed static settings, they will be retrieved from the HTTPS_PROXY
 * or HTTP_PROXY environment variables.
 * @param proxySettings ProxySettings to use on each request.
 */
export function proxyPolicy(proxySettings = getDefaultProxySettings()): PipelinePolicy {
  return {
    name: proxyPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.proxySettings) {
        request.proxySettings = proxySettings;
      }
      return next(request);
    }
  };
}
