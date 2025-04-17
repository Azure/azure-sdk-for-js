// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as process from "node:process";
import { describe, it, assert, vi, afterEach } from "vitest";
import {
  type ProxySettings,
  type SendRequest,
  createPipelineRequest,
  getDefaultProxySettings,
  proxyPolicy,
  type Agent,
  type PipelineRequest,
} from "../../src/index.js";

interface ProxyAgent extends Agent {
  proxy: URL;
}

function getProxyUrlForRequest(request: PipelineRequest): URL {
  const proxyAgent = request.agent as ProxyAgent;
  if (!proxyAgent) {
    throw new Error(`Expected request for ${request.url} to have agent set`);
  }
  if (proxyAgent.proxy) {
    return proxyAgent.proxy;
  }
  throw new Error(`Expected agent ${proxyAgent} to have a proxy property`);
}

describe("proxyPolicy (node)", function () {
  it("Sets proxy settings on the request", function () {
    const proxySettings: ProxySettings = {
      host: "https://proxy.example.com",
      port: 8080,
    };
    const policy = proxyPolicy(proxySettings);

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    const next = vi.fn<SendRequest>();

    policy.sendRequest(request, next);

    assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
    assert.strictEqual(
      getProxyUrlForRequest(request).toString(),
      "https://proxy.example.com:8080/",
    );
  });

  it("Doesn't override existing request proxy settings", function () {
    const proxySettings: ProxySettings = {
      host: "https://proxy.example.com",
      port: 8080,
    };
    const policy = proxyPolicy(proxySettings);

    const requestProxySettings: ProxySettings = {
      host: "https://proxy2.example.com",
      port: 8080,
    };

    const request = createPipelineRequest({
      url: "https://bing.com",
      proxySettings: requestProxySettings,
    });

    const next = vi.fn<SendRequest>();

    policy.sendRequest(request, next);

    assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
    assert.strictEqual(
      getProxyUrlForRequest(request).toString(),
      "https://proxy2.example.com:8080/",
    );
  });

  describe("getDefaultProxySettings", function () {
    it("Parses a url without a port", function () {
      const proxyUrl = "https://proxy.example.com";
      const settings = getDefaultProxySettings(proxyUrl);
      assert.strictEqual(settings?.host, proxyUrl);
      assert.strictEqual(settings?.port, 80);
    });

    it("Parses a url with a port", function () {
      const proxyUrl = "https://proxy.example.com";
      const port = 8080;
      const proxyUrlWithPort = `${proxyUrl}:${port}`;
      const settings = getDefaultProxySettings(proxyUrlWithPort);
      assert.strictEqual(settings?.host, proxyUrl);
      assert.strictEqual(settings?.port, port);
    });

    it("Parses urls with authentication", function () {
      const settings = getDefaultProxySettings("https://user:password@proxy.example.com:8080");
      assert.strictEqual(settings?.host, "https://proxy.example.com");
      assert.strictEqual(settings?.port, 8080);
      assert.strictEqual(settings?.username, "user");
      assert.strictEqual(settings?.password, "password");
    });

    describe("loading from the environment", function () {
      const proxyVars = ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"];

      afterEach(function () {
        for (const variable of proxyVars) {
          delete process.env[variable];
        }
      });

      it("Prefers HTTPS", function () {
        const httpProxy = "http://proxy.example.com";
        const httpsProxy = "https://proxy.example.com";
        process.env["HTTPS_PROXY"] = httpsProxy;
        process.env["HTTP_PROXY"] = httpProxy;
        const settings = getDefaultProxySettings();
        assert.strictEqual(settings?.host, httpsProxy);
      });

      it("Loads from each variable correctly", function () {
        const proxyUrl = "https://proxy.example.com";
        for (const variable of proxyVars) {
          process.env[variable] = proxyUrl;
          const settings = getDefaultProxySettings();
          assert.strictEqual(settings?.host, proxyUrl);
          delete process.env[variable];
        }
      });
    });
  });
});
