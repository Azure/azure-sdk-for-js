// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as tough from "tough-cookie";
import * as http from "http";
import * as https from "https";
import "node-fetch";

import { FetchHttpClient } from "./fetchHttpClient";
import { HttpOperationResponse } from "./httpOperationResponse";
import { WebResource } from "./webResource";
import { createProxyAgent, ProxyAgent } from "./proxyAgent";

interface GlobalWithFetch extends NodeJS.Global {
  fetch: (input: RequestInfo, init?: RequestInit) => Promise<Response>;
}

const globalWithFetch = global as GlobalWithFetch;
if (typeof globalWithFetch.fetch !== "function") {
  const fetch = require("node-fetch");
  globalWithFetch.fetch = fetch;
}


export class NodeFetchHttpClient extends FetchHttpClient {
  private readonly cookieJar = new tough.CookieJar(undefined, { looseMode: true });

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

    if (httpRequest.proxySettings) {
      const tunnel: ProxyAgent = createProxyAgent(httpRequest.url, httpRequest.proxySettings, httpRequest.headers);
      requestInit.agent = tunnel.agent;
    }

    if (httpRequest.keepAlive === true) {
      if (requestInit.agent) {
        requestInit.agent.keepAlive = true;
      } else {
        const options: http.AgentOptions | https.AgentOptions = { keepAlive: true };
        const agent = httpRequest.url.startsWith("https") ? new https.Agent(options) : new http.Agent(options);
        requestInit.agent = agent;
      }
    }

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
            err => {
              if (err) {
                reject(err);
              } else {
                resolve();
              }
            });
        });
      }
    }
  }
}
