// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as tough from "tough-cookie";
import * as http from "http";
import * as https from "https";
import node_fetch from "node-fetch";

import {
  FetchHttpClient,
  CommonRequestInfo,
  CommonRequestInit,
  CommonResponse
} from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResourceLike } from "./webResource";
import { createProxyAgent, ProxyAgent, isUrlHttps } from "./proxyAgent";

interface AgentCache {
  httpAgent?: http.Agent;
  httpsAgent?: https.Agent;
}

function getCachedAgent(
  isHttps: boolean,
  agentCache: AgentCache
): http.Agent | https.Agent | undefined {
  return isHttps ? agentCache.httpsAgent : agentCache.httpAgent;
}

export class NodeFetchHttpClient extends FetchHttpClient {
  private proxyAgents: AgentCache = {};
  private keepAliveAgents: AgentCache = {};

  private readonly cookieJar = new tough.CookieJar(undefined, { looseMode: true });

  private getOrCreateAgent(httpRequest: WebResourceLike): http.Agent | https.Agent {
    const isHttps = isUrlHttps(httpRequest.url);

    // At the moment, proxy settings and keepAlive are mutually
    // exclusive because the 'tunnel' library currently lacks the
    // ability to create a proxy with keepAlive turned on.
    if (httpRequest.proxySettings) {
      let agent = getCachedAgent(isHttps, this.proxyAgents);
      if (agent) {
        return agent;
      }

      const tunnel: ProxyAgent = createProxyAgent(
        httpRequest.url,
        httpRequest.proxySettings,
        httpRequest.headers
      );

      agent = tunnel.agent;
      if (tunnel.isHttps) {
        this.proxyAgents.httpsAgent = tunnel.agent as https.Agent;
      } else {
        this.proxyAgents.httpAgent = tunnel.agent;
      }

      return agent;
    } else if (httpRequest.keepAlive) {
      let agent = getCachedAgent(isHttps, this.keepAliveAgents);
      if (agent) {
        return agent;
      }

      const agentOptions: http.AgentOptions | https.AgentOptions = {
        keepAlive: httpRequest.keepAlive
      };

      if (isHttps) {
        agent = this.keepAliveAgents.httpsAgent = new https.Agent(agentOptions);
      } else {
        agent = this.keepAliveAgents.httpAgent = new http.Agent(agentOptions);
      }

      return agent;
    } else {
      return isHttps ? https.globalAgent : http.globalAgent;
    }
  }

  // eslint-disable-next-line @azure/azure-sdk/ts-apisurface-standardized-verbs
  async fetch(input: CommonRequestInfo, init?: CommonRequestInit): Promise<CommonResponse> {
    return node_fetch(input, init) as unknown as Promise<CommonResponse>;
  }

  async prepareRequest(httpRequest: WebResourceLike): Promise<Partial<RequestInit>> {
    const requestInit: Partial<RequestInit & { agent?: any; compress?: boolean }> = {};

    if (this.cookieJar && !httpRequest.headers.get("Cookie")) {
      const cookieString = await new Promise<string>((resolve, reject) => {
        this.cookieJar!.getCookieString(httpRequest.url, (err, cookie) => {
          if (err) {
            reject(err);
          } else {
            resolve(cookie);
          }
        });
      });

      httpRequest.headers.set("Cookie", cookieString);
    }

    // Set the http(s) agent
    requestInit.agent = this.getOrCreateAgent(httpRequest);

    requestInit.compress = httpRequest.decompressResponse;

    return requestInit;
  }

  async processRequest(operationResponse: HttpOperationResponse): Promise<void> {
    if (this.cookieJar) {
      const setCookieHeader = operationResponse.headers.get("Set-Cookie");
      if (setCookieHeader !== undefined) {
        await new Promise((resolve, reject) => {
          this.cookieJar!.setCookie(
            setCookieHeader,
            operationResponse.request.url,
            { ignoreError: true },
            (err) => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            }
          );
        });
      }
    }
  }
}
