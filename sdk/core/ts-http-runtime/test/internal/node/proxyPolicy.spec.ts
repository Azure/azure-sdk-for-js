// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import process from "node:process";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { describe, it, assert, vi, afterEach } from "vitest";
import type { Agent, PipelineRequest } from "../../../src/index.js";
import { type ProxySettings, type SendRequest, createPipelineRequest } from "../../../src/index.js";
import { getDefaultProxySettings, proxyPolicy } from "../../../src/policies/internal.js";
import { globalNoProxyList, loadNoProxy } from "../../../src/policies/proxyPolicy.js";

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
  it("Sets proxy settings on the request", async function () {
    const proxySettings: ProxySettings = {
      host: "https://proxy.example.com",
      port: 8080,
    };
    const policy = proxyPolicy(proxySettings);

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    const next = vi.fn<SendRequest>();

    await policy.sendRequest(request, next);

    assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
    assert.strictEqual(
      getProxyUrlForRequest(request).toString(),
      "https://proxy.example.com:8080/",
    );
  });

  it("Doesn't override existing request proxy settings", async function () {
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

    await policy.sendRequest(request, next);

    assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
    assert.strictEqual(
      getProxyUrlForRequest(request).toString(),
      "https://proxy2.example.com:8080/",
    );
  });

  it("Doesn't assign proxy settings to request when NO_PROXY contains a match of host name", async function () {
    const saved = process.env["NO_PROXY"];
    try {
      process.env["NO_PROXY"] = ".proxytest.com, test.com";
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());

      const proxySettings: ProxySettings = {
        host: "https://proxy.example.com",
        port: 8080,
      };
      const policy = proxyPolicy(proxySettings);

      const request = createPipelineRequest({
        url: "https://proxytest.com",
      });

      const next = vi.fn<SendRequest>();

      await policy.sendRequest(request, next);

      assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "https://www.proxytest.com";
      await policy.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://test.proxytest.com";
      await policy.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://test.proxytest.com/path1";
      await policy.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://test.proxytest.com/path2";
      await policy.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://abcproxytest.com";
      await policy.sendRequest(request, next);
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );

      request.proxySettings = undefined;
      request.agent = undefined;
      request.url = "http://test.com";
      await policy.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://www.test.com";
      await policy.sendRequest(request, next);
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );
    } finally {
      process.env["NO_PROXY"] = saved;
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());
    }
  });

  it("should prefer custom no-proxy-list over cached global no-proxy-list", async function () {
    const saved = process.env["NO_PROXY"];
    try {
      process.env["NO_PROXY"] = "proxytest.com, test.com";
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());

      const proxySettings: ProxySettings = {
        host: "https://proxy.example.com",
        port: 8080,
      };

      const policy1 = proxyPolicy(proxySettings, { customNoProxyList: ["test.com"] });
      const next = vi.fn<SendRequest>();

      const request = createPipelineRequest({
        url: "https://proxytest.om",
      });
      await policy1.sendRequest(request, next);
      assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );

      request.url = "https://test.com";
      request.proxySettings = undefined;
      request.agent = undefined;
      await policy1.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://another.com";
      request.proxySettings = undefined;
      await policy1.sendRequest(request, next);
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );

      const policy2 = proxyPolicy(proxySettings, { customNoProxyList: ["proxytest.com"] });
      request.url = "http://test.com";
      request.proxySettings = undefined;
      request.agent = undefined;
      await policy2.sendRequest(request, next);
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );

      request.url = "http://proxytest.com";
      request.proxySettings = undefined;
      request.agent = undefined;
      await policy2.sendRequest(request, next);
      assert.isUndefined(request.proxySettings);
      assert.isUndefined(request.agent);

      request.url = "http://fourth.com";
      request.proxySettings = undefined;
      request.agent = undefined;
      await policy2.sendRequest(request, next);
      assert.strictEqual(
        getProxyUrlForRequest(request).toString(),
        "https://proxy.example.com:8080/",
      );
    } finally {
      process.env["NO_PROXY"] = saved;
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());
    }
  });

  it("reuses a single proxy agent for concurrent requests", async function () {
    const policy = proxyPolicy({ host: "https://proxy.example.com", port: 8080 });
    const next = vi.fn<SendRequest>();
    const requests = [1, 2, 3].map(() => createPipelineRequest({ url: "https://bing.com" }));

    await Promise.all(requests.map((request) => policy.sendRequest(request, next)));

    assert.isDefined(requests[0].agent);
    assert.strictEqual(requests[1].agent, requests[0].agent);
    assert.strictEqual(requests[2].agent, requests[0].agent);
  });

  it("doesn't override a custom agent", async function () {
    const policy = proxyPolicy({ host: "https://proxy.example.com", port: 8080 });
    const next = vi.fn<SendRequest>();
    const agent = {} as Agent;
    const request = createPipelineRequest({ url: "https://bing.com" });
    request.agent = agent;

    await policy.sendRequest(request, next);

    assert.strictEqual(request.agent, agent);
  });

  it("loads and uses the CommonJS build when require(esm) is disabled", function () {
    const packageRoot = fileURLToPath(new URL("../../../", import.meta.url));
    const script = `
      const { proxyPolicy } = require("./dist/commonjs/policies/internal.js");
      const { createPipelineRequest } = require("./dist/commonjs/index.js");
      (async () => {
        const policy = proxyPolicy({ host: "http://proxy.example.com", port: 8080 });
        const results = [];
        for (const url of ["https://example.com", "http://example.com"]) {
          const request = createPipelineRequest({ url });
          await policy.sendRequest(request, async () => undefined);
          results.push(request.agent.constructor.name + " " + request.agent.proxy.href);
        }
        console.log(JSON.stringify(results));
      })().catch((e) => { console.error(e); process.exit(1); });
    `;

    const output = execFileSync(
      process.execPath,
      ["--no-experimental-require-module", "-e", script],
      { cwd: packageRoot, encoding: "utf8" },
    );

    assert.deepStrictEqual(JSON.parse(output), [
      "HttpsProxyAgent http://proxy.example.com:8080/",
      "HttpProxyAgent http://proxy.example.com:8080/",
    ]);
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
