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
import { HttpClientOptions } from "./httpClient";

interface GlobalWithFetch extends NodeJS.Global {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const globalWithFetch = global as GlobalWithFetch;
if (typeof globalWithFetch.fetch !== "function") {
  const fetch = require("node-fetch").default;
  globalWithFetch.fetch = fetch;
}

export class NodeFetchHttpClient extends FetchHttpClient {
  private httpAgent: http.Agent | undefined;
  private httpsAgent: https.Agent | undefined;
  private httpClientOptions: HttpClientOptions;

  private readonly cookieJar = new tough.CookieJar(undefined, { looseMode: true });

  constructor(httpClientOptions?: HttpClientOptions) {
    super();

    this.httpClientOptions = {
      keepAlive: true,
      proxySettings: undefined,
      ...httpClientOptions
    };
  }

  private getOrCreateAgent(httpRequest: WebResource): http.Agent | https.Agent {
    const isHttps = isUrlHttps(httpRequest.url);
    const getCachedAgent = () => isHttps ? this.httpsAgent : this.httpAgent;

    let agent = getCachedAgent();

    if (!agent) {
      // At the moment, proxy settings and keepAlive are mutually
      // exclusive because the 'tunnel' library currently lacks the
      // ability to create a proxy with keepAlive turned on.
      if (this.httpClientOptions.proxySettings) {
        const tunnel: ProxyAgent = createProxyAgent(
          httpRequest.url,
          this.httpClientOptions.proxySettings,
          httpRequest.headers
        );

        agent = tunnel.agent;
        if (tunnel.isHttps) {
          this.httpsAgent = tunnel.agent as https.Agent;
        } else {
          this.httpAgent = tunnel.agent;
        }
      } else {
        const agentOptions: http.AgentOptions | https.AgentOptions = {
          keepAlive: this.httpClientOptions.keepAlive
        };

        if (isHttps) {
          this.httpsAgent = new https.Agent(agentOptions);
        } else {
          this.httpAgent = new http.Agent(agentOptions);
        }
      }

      agent = getCachedAgent();
    }

    // We've created or reused an agent by this point, so assert
    // that agent is not undefined
    return agent!;
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
