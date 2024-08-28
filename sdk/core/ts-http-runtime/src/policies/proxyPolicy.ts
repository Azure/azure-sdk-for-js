// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type * as http from "http";
import type * as https from "https";
import { HttpsProxyAgent } from "https-proxy-agent";
import { HttpProxyAgent } from "http-proxy-agent";
import type {
  PipelineRequest,
  PipelineResponse,
  ProxySettings,
  SendRequest,
} from "../interfaces.js";
import type { PipelinePolicy } from "../pipeline.js";
import { logger } from "../log.js";

const HTTPS_PROXY = "HTTPS_PROXY";
const HTTP_PROXY = "HTTP_PROXY";
const ALL_PROXY = "ALL_PROXY";
const NO_PROXY = "NO_PROXY";

/**
 * The programmatic identifier of the proxyPolicy.
 */
export const proxyPolicyName = "proxyPolicy";

/**
 * Stores the patterns specified in NO_PROXY environment variable.
 * @internal
 */
export const globalNoProxyList: string[] = [];
let noProxyListLoaded: boolean = false;

/** A cache of whether a host should bypass the proxy. */
const globalBypassedMap: Map<string, boolean> = new Map();

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

/**
 * Check whether the host of a given `uri` matches any pattern in the no proxy list.
 * If there's a match, any request sent to the same host shouldn't have the proxy settings set.
 * This implementation is a port of https://github.com/Azure/azure-sdk-for-net/blob/8cca811371159e527159c7eb65602477898683e2/sdk/core/Azure.Core/src/Pipeline/Internal/HttpEnvironmentProxy.cs#L210
 */
function isBypassed(
  uri: string,
  noProxyList: string[],
  bypassedMap?: Map<string, boolean>,
): boolean | undefined {
  if (noProxyList.length === 0) {
    return false;
  }
  const host = new URL(uri).hostname;
  if (bypassedMap?.has(host)) {
    return bypassedMap.get(host);
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
  bypassedMap?.set(host, isBypassedFlag);
  return isBypassedFlag;
}

export function loadNoProxy(): string[] {
  const noProxy = getEnvironmentValue(NO_PROXY);
  noProxyListLoaded = true;
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
 * @deprecated - Internally this method is no longer necessary when setting proxy information.
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
    password: parsedUrl.password,
  };
}

/**
 * This method attempts to parse a proxy URL from the environment
 * variables `HTTPS_PROXY` or `HTTP_PROXY`.
 */
function getDefaultProxySettingsInternal(): URL | undefined {
  const envProxy = loadEnvironmentProxyValue();
  return envProxy ? new URL(envProxy) : undefined;
}

function getUrlFromProxySettings(settings: ProxySettings): URL {
  let parsedProxyUrl: URL;
  try {
    parsedProxyUrl = new URL(settings.host);
  } catch (_error) {
    throw new Error(
      `Expecting a valid host string in proxy settings, but found "${settings.host}".`,
    );
  }

  parsedProxyUrl.port = String(settings.port);
  if (settings.username) {
    parsedProxyUrl.username = settings.username;
  }
  if (settings.password) {
    parsedProxyUrl.password = settings.password;
  }

  return parsedProxyUrl;
}

function setProxyAgentOnRequest(
  request: PipelineRequest,
  cachedAgents: CachedAgents,
  proxyUrl: URL,
): void {
  // Custom Agent should take precedence so if one is present
  // we should skip to avoid overwriting it.
  if (request.agent) {
    return;
  }

  const url = new URL(request.url);

  const isInsecure = url.protocol !== "https:";

  if (request.tlsSettings) {
    logger.warning(
      "TLS settings are not supported in combination with custom Proxy, certificates provided to the client will be ignored.",
    );
  }

  const headers = request.headers.toJSON();

  if (isInsecure) {
    if (!cachedAgents.httpProxyAgent) {
      cachedAgents.httpProxyAgent = new HttpProxyAgent(proxyUrl, { headers });
    }
    request.agent = cachedAgents.httpProxyAgent;
  } else {
    if (!cachedAgents.httpsProxyAgent) {
      cachedAgents.httpsProxyAgent = new HttpsProxyAgent(proxyUrl, { headers });
    }
    request.agent = cachedAgents.httpsProxyAgent;
  }
}

interface CachedAgents {
  httpsProxyAgent?: https.Agent;
  httpProxyAgent?: http.Agent;
}

/**
 * A policy that allows one to apply proxy settings to all requests.
 * If not passed static settings, they will be retrieved from the HTTPS_PROXY
 * or HTTP_PROXY environment variables.
 * @param proxySettings - ProxySettings to use on each request.
 * @param options - additional settings, for example, custom NO_PROXY patterns
 */
export function proxyPolicy(
  proxySettings?: ProxySettings,
  options?: {
    /** a list of patterns to override those loaded from NO_PROXY environment variable. */
    customNoProxyList?: string[];
  },
): PipelinePolicy {
  if (!noProxyListLoaded) {
    globalNoProxyList.push(...loadNoProxy());
  }

  const defaultProxy = proxySettings
    ? getUrlFromProxySettings(proxySettings)
    : getDefaultProxySettingsInternal();

  const cachedAgents: CachedAgents = {};

  return {
    name: proxyPolicyName,
    async sendRequest(request: PipelineRequest, next: SendRequest): Promise<PipelineResponse> {
      if (
        !request.proxySettings &&
        defaultProxy &&
        !isBypassed(
          request.url,
          options?.customNoProxyList ?? globalNoProxyList,
          options?.customNoProxyList ? undefined : globalBypassedMap,
        )
      ) {
        setProxyAgentOnRequest(request, cachedAgents, defaultProxy);
      } else if (request.proxySettings) {
        setProxyAgentOnRequest(
          request,
          cachedAgents,
          getUrlFromProxySettings(request.proxySettings),
        );
      }
      return next(request);
    },
  };
}
