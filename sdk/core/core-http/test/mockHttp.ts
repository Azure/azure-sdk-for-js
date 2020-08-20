// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import xhrMock, { proxy } from "xhr-mock";
import { isNode, HttpMethods } from "../src/coreHttp";
import fetchMock, * as fetch from "fetch-mock";
import { Readable } from "stream";
import node_fetch from "node-fetch";

export type UrlFilter = string | RegExp;

export type MockResponseData = {
  status?: number;
  body?: any;
  headers?: any;
};

export type MockResponseFunction = (
  url?: string,
  method?: string,
  body?: any,
  headers?: any
) => Promise<MockResponseData | void>;

export type MockResponse = MockResponseData | MockResponseFunction;

export interface HttpMockFacade {
  setup(): void;
  teardown(): void;
  passThrough(url?: UrlFilter): void;
  timeout(method: HttpMethods, url?: UrlFilter): void;
  mockHttpMethod(method: HttpMethods, url: UrlFilter, response: MockResponse): void;
  get(url: UrlFilter, response: MockResponse): void;
  post(url: UrlFilter, response: MockResponse): void;
  put(url: UrlFilter, response: MockResponse): void;
  getFetch(): typeof node_fetch | undefined;
}

export function getHttpMock(): HttpMockFacade {
  return isNode ? new FetchHttpMock() : new BrowserHttpMock();
}

class FetchHttpMock implements HttpMockFacade {
  private _fetch: fetchMock.FetchMockSandbox;

  constructor() {
    this._fetch = fetchMock.sandbox();
  }

  // returns the locally mocked fetch instance
  getFetch(): typeof node_fetch {
    /// @ts-ignore
    return this._fetch as typeof node_fetch;
  }

  setup(): void {
    this._fetch.resetHistory();
  }

  teardown(): void {
    this._fetch.resetHistory();
  }

  passThrough(_url?: string | RegExp | undefined): void {
    this._fetch.reset();
  }

  timeout(_method: HttpMethods, url: UrlFilter): void {
    const delay = new Promise((resolve) => {
      setTimeout(() => resolve({ $uri: url, delay: 500 }), 2500);
    });

    this._fetch.mock(url, delay);
  }

  convertStreamToBuffer(stream: Readable): Promise<any> {
    return new Promise((resolve) => {
      const buffer: any = [];

      stream.on("data", (chunk: any) => {
        buffer.push(chunk);
      });

      stream.on("end", () => {
        return resolve(buffer);
      });
    });
  }

  mockHttpMethod(method: HttpMethods, url: UrlFilter, response: MockResponse): void {
    let mockResponse: fetch.MockResponse | fetch.MockResponseFunction = response;

    if (typeof response === "function") {
      const mockFunction: MockResponseFunction = response;
      mockResponse = (async (url: string, opts: any) => {
        if (opts.body && typeof opts.body.pipe === "function") {
          opts.body = await this.convertStreamToBuffer(opts.body);
        }

        return mockFunction(url, method, opts.body, opts.headers);
      }) as fetch.MockResponseFunction;
    }

    const matcher = (_url: string, opts: fetch.MockRequest): boolean =>
      url === _url && opts.method === method;
    this._fetch.mock(matcher, mockResponse);
  }

  get(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("GET", url, response);
  }

  post(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("POST", url, response);
  }

  put(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("PUT", url, response);
  }
}

export class BrowserHttpMock implements HttpMockFacade {
  setup(): void {
    xhrMock.setup();
  }

  teardown(): void {
    xhrMock.teardown();
  }

  mockHttpMethod(method: HttpMethods, url: UrlFilter, response: MockResponse): void {
    if (typeof response === "function") {
      xhrMock.use(method, url, async (req, res) => {
        const result =
          (await response(
            req.url().toString(),
            req.method().toString(),
            req.body(),
            req.headers()
          )) || {};
        return res
          .status(result.status || 200)
          .body(result.body || {})
          .headers(result.headers || {});
      });
    } else {
      xhrMock.use(method, url, {
        status: response.status,
        body: response.body
      });
    }
  }

  get(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("GET", url, response);
  }

  post(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("POST", url, response);
  }

  put(url: UrlFilter, response: MockResponse): void {
    this.mockHttpMethod("PUT", url, response);
  }

  passThrough(url?: UrlFilter): void {
    if (url) {
      console.warn("Browser mock doesn't support filtered passThrough calls.");
    }

    xhrMock.use(proxy);
  }

  timeout(method: HttpMethods, url: UrlFilter): void {
    return this.mockHttpMethod(method, url, async () => {
      throw new Error("Timeout");
    });
  }

  getFetch(): undefined {
    return undefined;
  }
}
