// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import "chai/register-should";
import { should } from "chai";
import tunnel from "tunnel";
import https from "https";

import { HttpHeaders } from "../lib/msRest";
import { createTunnel, createProxyAgent } from "../lib/axiosHttpClient";

describe("AxiosHttpClient", () => {
    describe("createProxyAgent", () => {
        type HttpsAgent = https.Agent & {
            defaultPort: number | undefined,
            options: {
                proxy: tunnel.ProxyOptions
            },
            proxyOptions: tunnel.ProxyOptions
        };

        [
            { proxy: "http", request: "ftp", port: undefined, isProxyHttps: false },
            { proxy: "http", request: "http", port: undefined, isProxyHttps: false },
            { proxy: "hTtp", request: "https", port: 443, isProxyHttps: true },
            { proxy: "HTTPS", request: "http", port: undefined, isProxyHttps: false },
            { proxy: "https", request: "hTTps", port: 443, isProxyHttps: true }
        ].forEach(testCase => {
            it(`should return ${testCase.isProxyHttps ? "HTTPS" : "HTTP"} proxy for ${testCase.proxy.toUpperCase()} proxy server and ${testCase.request.toUpperCase()} request`, function (done) {
                const urlHost = "proxy.microsoft.com"
                const proxySettings = {
                    host: `${testCase.proxy}://${urlHost}`,
                    port: 8080
                };
                const requestUrl = `${testCase.request}://example.com`;

                const proxyAgent = createProxyAgent(requestUrl, proxySettings);

                proxyAgent.isHttps.should.equal(testCase.isProxyHttps);
                const agent = proxyAgent.agent as HttpsAgent;
                should().equal(agent.defaultPort, testCase.port);
                agent.options.proxy.host!.should.equal(urlHost);
                agent.options.proxy.port!.should.equal(proxySettings.port);
                done();
            });
        });

        it("should copy headers correctly", function (done) {
            const proxySettings = {
                host: "http://proxy.microsoft.com",
                port: 8080
            };
            const headers = new HttpHeaders({
                "User-Agent": "Node.js"
            });

            const proxyAgent = createProxyAgent("http://example.com", proxySettings, headers);

            const agent = proxyAgent.agent as HttpsAgent;
            agent.proxyOptions.headers.should.contain({ "user-agent": "Node.js" });
            done();
        });
    });

    describe("createTunnel", () => {
        const defaultProxySettings = {
            host: "http://proxy.microsoft.com",
            port: 8080
        };

        type HttpsAgent = https.Agent & {
            defaultPort: number | undefined,
            options: {
                proxy: tunnel.ProxyOptions
            }
        };

        [true, false].forEach(value => {
            it(`returns HTTP agent for HTTP request and HTTP${value ? "S" : ""} proxy`, function () {
                const tunnelConfig: tunnel.HttpsOverHttpsOptions = {
                    proxy: {
                        host: defaultProxySettings.host,
                        port: defaultProxySettings.port,
                        headers: {}
                    }
                };

                const tunnel = createTunnel(false, value, tunnelConfig) as HttpsAgent;
                tunnel.options.proxy.host!.should.equal(defaultProxySettings.host);
                tunnel.options.proxy.port!.should.equal(defaultProxySettings.port);
                should().not.exist(tunnel.defaultPort);
            });
        });

        [true, false].forEach(value => {
            it(`returns HTTPS agent for HTTPS request and HTTP${value ? "S" : ""} proxy`, function () {
                const tunnelConfig: tunnel.HttpsOverHttpsOptions = {
                    proxy: {
                        host: defaultProxySettings.host,
                        port: defaultProxySettings.port,
                        headers: {}
                    }
                };

                const tunnel = createTunnel(true, value, tunnelConfig) as HttpsAgent;
                tunnel.options.proxy.host!.should.equal(defaultProxySettings.host);
                tunnel.options.proxy.port!.should.equal(defaultProxySettings.port);
                tunnel.defaultPort!.should.equal(443);
            });
        });
    });
});
