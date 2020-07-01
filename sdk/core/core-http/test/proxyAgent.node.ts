// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { should } from "chai";
import tunnel from "tunnel";
import https from "https";

import { HttpHeaders } from "../src/coreHttp";
import { createProxyAgent, createTunnel } from "../src/proxyAgent";

describe("proxyAgent", () => {
  describe("createProxyAgent", () => {
    type HttpsAgent = https.Agent & {
      defaultPort: number | undefined;
      options: {
        proxy: tunnel.ProxyOptions;
      };
      proxyOptions: tunnel.ProxyOptions;
    };

    [
      { proxy: "http", request: "ftp", port: undefined, isProxyHttps: false },
      { proxy: "http", request: "http", port: undefined, isProxyHttps: false },
      { proxy: "hTtp", request: "https", port: 443, isProxyHttps: true },
      { proxy: "HTTPS", request: "http", port: undefined, isProxyHttps: false },
      { proxy: "https", request: "hTTps", port: 443, isProxyHttps: true }
    ].forEach((testCase) => {
      it(`should return ${
        testCase.isProxyHttps ? "HTTPS" : "HTTP"
      } proxy for ${testCase.proxy.toUpperCase()} proxy server and ${testCase.request.toUpperCase()} request`, function(done) {
        const urlHost = "proxy.microsoft.com";
        const proxySettings = {
          host: `${testCase.proxy}://${urlHost}`,
          port: 8080
        };
        const requestUrl = `${testCase.request}://example.com`;

        const proxyAgent = createProxyAgent(requestUrl, proxySettings);

        proxyAgent.isHttps.should.equal(testCase.isProxyHttps);
        const agent = proxyAgent.agent as HttpsAgent;
        should().equal(agent.defaultPort, testCase.port);
        agent.options.proxy.host.should.equal(urlHost);
        agent.options.proxy.port.should.equal(proxySettings.port);
        done();
      });
    });

    it("should copy headers correctly", function(done) {
      const proxySettings = {
        host: "http://proxy.microsoft.com",
        port: 8080
      };
      const headers = new HttpHeaders({
        "User-Agent": "Node.js"
      });

      const proxyAgent = createProxyAgent("http://example.com", proxySettings, headers);

      const agent = proxyAgent.agent as HttpsAgent;
      should().exist(agent.proxyOptions.headers);
      agent.proxyOptions.headers!.should.contain({ "user-agent": "Node.js" });
      done();
    });

    [
      { host: "host", port: 0 },
      { host: "host", port: 65535 }
    ].forEach((testCase) => {
      it(`should not throw error when being given a valid proxy settings of { host: '${testCase.host}', port: ${testCase.port} }.`, function(done) {
        const proxySettings = {
          host: testCase.host,
          port: testCase.port
        };

        const fn = function(): void {
          createProxyAgent("http://example.com", proxySettings);
        };
        fn.should.not.throw();
        done();
      });
    });

    [
      { host: "", port: 8080, expectInvalidHostError: true },
      { host: "host", port: -1, expectInvalidHostError: false },
      { host: "host", port: 65536, expectInvalidHostError: false }
    ].forEach((testCase) => {
      it(`should throw error when being given an invalid proxy settings of { host: '${testCase.host}', port: ${testCase.port} }.`, function(done) {
        const proxySettings = {
          host: testCase.host,
          port: testCase.port
        };

        const fn = function(): void {
          createProxyAgent("http://example.com", proxySettings);
        };
        fn.should.throw(
          testCase.expectInvalidHostError
            ? "Expecting a non-empty host in proxy settings."
            : "Expecting a valid port number in the range of [0, 65535] in proxy settings."
        );
        done();
      });
    });
  });

  describe("createTunnel", () => {
    const defaultProxySettings = {
      host: "http://proxy.microsoft.com",
      port: 8080
    };

    type HttpsAgent = https.Agent & {
      defaultPort: number | undefined;
      options: {
        proxy: tunnel.ProxyOptions;
      };
    };

    [true, false].forEach((value) => {
      it(`returns HTTP agent for HTTP request and HTTP${value ? "S" : ""} proxy`, function() {
        const tunnelConfig: tunnel.HttpsOverHttpsOptions = {
          proxy: {
            host: defaultProxySettings.host,
            port: defaultProxySettings.port,
            headers: {}
          }
        };

        const tunnel = createTunnel(false, value, tunnelConfig) as HttpsAgent;
        tunnel.options.proxy.host.should.equal(defaultProxySettings.host);
        tunnel.options.proxy.port.should.equal(defaultProxySettings.port);
        should().not.exist(tunnel.defaultPort);
      });
    });

    [true, false].forEach((value) => {
      it(`returns HTTPS agent for HTTPS request and HTTP${value ? "S" : ""} proxy`, function() {
        const tunnelConfig: tunnel.HttpsOverHttpsOptions = {
          proxy: {
            host: defaultProxySettings.host,
            port: defaultProxySettings.port,
            headers: {}
          }
        };

        const tunnel = createTunnel(true, value, tunnelConfig) as HttpsAgent;
        tunnel.options.proxy.host.should.equal(defaultProxySettings.host);
        tunnel.options.proxy.port.should.equal(defaultProxySettings.port);
        tunnel.defaultPort!.should.equal(443);
      });
    });
  });
});
