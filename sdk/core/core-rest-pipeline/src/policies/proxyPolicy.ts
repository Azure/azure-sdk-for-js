// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as http from "http";
import * as https from "https";
import { HttpsProxyAgent, HttpsProxyAgentOptions } from "https-proxy-agent";
import { HttpProxyAgent, HttpProxyAgentOptions } from "http-proxy-agent";
import {
  PipelineResponse,
  PipelineRequest,
  SendRequest,
  ProxySettings,
  HttpHeaders
} from "../interfaces";
import { PipelinePolicy } from "../pipeline";
import { URL } from "../util/url";

const HTTPS_PROXY = "HTTPS_PROXY";
const HTTP_PROXY = "HTTP_PROXY";
const ALL_PROXY = "ALL_PROXY";
const NO_PROXY = "NO_PROXY";

/**
 * The programmatic identifier of the proxyPolicy.
 */
export const proxyPolicyName = "proxyPolicy";

export const noProxyList: string[] = loadNoProxy();
const byPassedList: Map<string, boolean> = new Map();

let httpsProxyAgent: https.Agent | undefined;
let httpProxyAgent: http.Agent | undefined;

function getEnvironmentValue(name: string): string | undefined {
  if (process.env[name]) {
    return process.env[name];
  } else if (process.env[name.toLowerCase()]) {
    return process.env[name.toLowerCase()];
  }
  return undefined;
}

function loadEnvironmentProxyValue(): string | undefined {
  if (!process) {
    return undefined;
  }

  const httpsProxy = getEnvironmentValue(HTTPS_PROXY);
  const allProxy = getEnvironmentValue(ALL_PROXY);
  const httpProxy = getEnvironmentValue(HTTP_PROXY);

  return httpsProxy || allProxy || httpProxy;
}

// Check whether the host of a given `uri` is in the noProxyList.
// If there's a match, any request sent to the same host won't have the proxy settings set.
function isBypassed(uri: string): boolean | undefined {
  if (noProxyList.length === 0) {
    return false;
  }
  const host = new URL(uri).hostname;
  if (byPassedList.has(host)) {
    return byPassedList.get(host);
  }
  let isBypassedFlag = false;
  for (const pattern of noProxyList) {
    if (pattern[0] === ".") {
      // This should match either domain it self or any subdomain or host
      // .foo.com will match foo.com it self or *.foo.com
      if (host.endsWith(pattern)) {
        isBypassedFlag = true;
      } else {
        if (host.length === pattern.length - 1 && host === pattern.slice(1)) {
          isBypassedFlag = true;
        }
      }
    } else {
      if (host === pattern) {
        isBypassedFlag = true;
      }
    }
  }
  byPassedList.set(host, isBypassedFlag);
  return isBypassedFlag;
}

export function loadNoProxy(): string[] {
  const noProxy = getEnvironmentValue(NO_PROXY);
  if (noProxy) {
    return noProxy
      .split(",")
      .map((item) => item.trim())
      .filter((item) => item.length);
  }

  return [];
}

/**
 * This method converts a proxy url into `ProxySettings` for use with ProxyPolicy.
 * If no argument is given, it attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 * @param proxyUrl - The url of the proxy to use. May contain authentication information.
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

function getProxyAgentOptions(
  proxySettings: ProxySettings,
  requestHeaders: HttpHeaders
): HttpProxyAgentOptions {
  let parsedProxyUrl: URL;
  try {
    parsedProxyUrl = new URL(proxySettings.host);
  } catch (_error) {
    throw new Error(
      `Expecting a valid host string in proxy settings, but found "${proxySettings.host}".`
    );
  }

  const proxyAgentOptions: HttpsProxyAgentOptions = {
    hostname: parsedProxyUrl.hostname,
    port: proxySettings.port,
    protocol: parsedProxyUrl.protocol,
    headers: requestHeaders.toJSON()
  };
  if (proxySettings.username && proxySettings.password) {
    proxyAgentOptions.auth = `${proxySettings.username}:${proxySettings.password}`;
  }
  return proxyAgentOptions;
}

function setProxyAgentOnRequest(request: PipelineRequest): void {
  const url = new URL(request.url);

  const isInsecure = url.protocol !== "https:";

  const proxySettings = request.proxySettings;
  if (proxySettings) {
    if (isInsecure) {
      if (!httpProxyAgent) {
        const proxyAgentOptions = getProxyAgentOptions(proxySettings, request.headers);
        httpProxyAgent = new HttpProxyAgent(proxyAgentOptions);
      }
      request.agent = httpProxyAgent;
    } else {
      if (!httpsProxyAgent) {
        const proxyAgentOptions = getProxyAgentOptions(proxySettings, request.headers);
        httpsProxyAgent = new HttpsProxyAgent(proxyAgentOptions);
      }
      request.agent = httpsProxyAgent;
    }
  }
}

/**
 * A policy that allows one to apply proxy settings to all requests.
 * If not passed static settings, they will be retrieved from the HTTPS_PROXY
 * or HTTP_PROXY environment variables.
 * @param proxySettings - ProxySettings to use on each request.
 */
export function proxyPolicy(proxySettings = getDefaultProxySettings()): PipelinePolicy {
  return {
    name: proxyPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (!request.proxySettings && !isBypassed(request.url)) {
        request.proxySettings = proxySettings;
      }

      if (request.proxySettings) {
        setProxyAgentOnRequest(request);
      }
      return next(request);
    }
  };
}
