// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import xhrMock, { proxy } from "xhr-mock";
import MockAdapter from "axios-mock-adapter";
import { isNode, HttpMethods } from "../lib/msRest";
import { AxiosRequestConfig, AxiosInstance } from "axios";

export type UrlFilter = string | RegExp;

export type MockResponseData = {
    status?: number;
    body?: any;
    headers?: any;
};

export type MockResponseFunction = (url?: string, method?: string, body?: any, headers?: any) => Promise<MockResponseData>;

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
}

export function getHttpMock(axiosInstance?: AxiosInstance): HttpMockFacade {
    return (isNode ? new NodeHttpMock(axiosInstance) : new BrowserHttpMock());
}

class NodeHttpMock implements HttpMockFacade {
    private _mockAdapter: MockAdapter;

    constructor(axiosInstance?: AxiosInstance) {
        if (!axiosInstance) {
            throw new Error("Axios instance cannot be undefined");
        }
        this._mockAdapter = new MockAdapter(axiosInstance);
        axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => ({ ...config, method: config.method && config.method.toLowerCase() }));
    }

    setup(): void {
        this._mockAdapter.reset();
    }

    teardown(): void {
        this._mockAdapter.restore();
    }

    mockHttpMethod(method: HttpMethods, url: UrlFilter, response: MockResponse): void {
        const methodName = "on" + method.charAt(0) + method.slice(1).toLowerCase();
        const mockCall: { reply: (statusOrCallback: number | Function, data?: any, headers?: any) => MockAdapter } = (this._mockAdapter as any)[methodName](url);

        if (typeof response === "function") {
            mockCall.reply(async (config: AxiosRequestConfig) => {
                const result = await response(config.url, config.method, config.data, config.headers);
                return [result.status, result.body, result.headers];
            });
        } else {
            mockCall.reply(response.status || 200, response.body || {}, response.headers || {});
        }
    }

    get(url: UrlFilter, response: MockResponse): void {
        return this.mockHttpMethod("GET", url, response);
    }

    post(url: UrlFilter, response: MockResponse): void {
        return this.mockHttpMethod("POST", url, response);
    }

    put(url: UrlFilter, response: MockResponse): void {
        return this.mockHttpMethod("PUT", url, response);
    }

    passThrough(url?: UrlFilter): void {
        this._mockAdapter.onAny(url).passThrough();
    }

    timeout(_method: HttpMethods, url?: UrlFilter): void {
        this._mockAdapter.onAny(url).timeout();
    }
}

class BrowserHttpMock implements HttpMockFacade {
    setup(): void {
        xhrMock.setup();
    }

    teardown(): void {
        xhrMock.teardown();
    }

    mockHttpMethod(method: HttpMethods, url: UrlFilter, response: MockResponse): void {
        if (typeof response === "function") {
            xhrMock.use(method, url, async (req, res) => {
                const result = await response(req.url().toString(), req.method().toString(), req.body(), req.headers());
                return res.status(result.status || 200).body(result.body || {}).headers(result.headers || {});
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
        return this.mockHttpMethod(method, url, () => new Promise(() => { }));
    }
}

