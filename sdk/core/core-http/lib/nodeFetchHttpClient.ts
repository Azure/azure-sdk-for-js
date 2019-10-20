// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as tough from "tough-cookie";
import * as http from "http";
import * as https from "https";
import "node-fetch";

import { FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import { createProxyAgent, ProxyAgent, isUrlHttps } from "./proxyAgent";

interface GlobalWithFetch extends NodeJS.Global {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const globalWithFetch = global as GlobalWithFetch;
if (typeof globalWithFetch.fetch !== "function") {
  const fetch = require("node-fetch").default;
  globalWithFetch.fetch = fetch;
}

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

  private getOrCreateAgent(httpRequest: WebResource): http.Agent | https.Agent {
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

  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return fetch(input, init);
  }

  async prepareRequest(httpRequest: WebResource): Promise<Partial<RequestInit>> {
    const requestInit: Partial<RequestInit & { agent?: any }> = {};

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

    return requestInit;
  }

  async processRequest(operationResponse: HttpOperationResponse): Promise<void> {
    if (this.cookieJar) {
      const setCookieHeader = operationResponse.headers.get("Set-Cookie");
      if (setCookieHeader != undefined) {
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
