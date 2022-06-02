// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import {
  ProxySettings,
  SendRequest,
  createPipelineRequest,
  getDefaultProxySettings,
  proxyPolicy,
} from "../../src";
import {
  getProxyAgentOptions,
  globalNoProxyList,
  loadNoProxy,
} from "../../src/policies/proxyPolicy";

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

    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    policy.sendRequest(request, next);

    assert.isTrue(next.calledOnceWith(request), "next called with request");
    assert.strictEqual(request.proxySettings, proxySettings);
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

    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    policy.sendRequest(request, next);

    assert.isTrue(next.calledOnceWith(request), "next called with request");
    assert.strictEqual(request.proxySettings, requestProxySettings);
  });

  it("Doesn't assign proxy settings to request when NO_PROXY contains a match of host name", function () {
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

      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

      policy.sendRequest(request, next);

      assert.isTrue(next.calledOnceWith(request), "next called with request");
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "https://www.proxytest.com";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://test.proxytest.com";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://test.proxytest.com/path1";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://test.proxytest.com/path2";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://abcproxytest.com";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, proxySettings);

      request.proxySettings = undefined;
      request.url = "http://test.com";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://www.test.com";
      policy.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, proxySettings);
    } finally {
      process.env["NO_PROXY"] = saved;
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());
    }
  });

  it("should prefer custom no-proxy-list over cached global no-proxy-list", function () {
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
      const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

      const request = createPipelineRequest({
        url: "https://proxytest.om",
      });
      policy1.sendRequest(request, next);
      assert.isTrue(next.calledOnceWith(request), "next called with request");
      assert.strictEqual(request.proxySettings, proxySettings);

      request.url = "https://test.com";
      request.proxySettings = undefined;
      policy1.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://another.com";
      request.proxySettings = undefined;
      policy1.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, proxySettings);

      const policy2 = proxyPolicy(proxySettings, { customNoProxyList: ["proxytest.com"] });
      request.url = "http://test.com";
      request.proxySettings = undefined;
      policy2.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, proxySettings);

      request.url = "http://proxytest.com";
      request.proxySettings = undefined;
      policy2.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, undefined);

      request.url = "http://fourth.com";
      request.proxySettings = undefined;
      policy2.sendRequest(request, next);
      assert.strictEqual(request.proxySettings, proxySettings);
    } finally {
      process.env["NO_PROXY"] = saved;
      globalNoProxyList.splice(0, globalNoProxyList.length);
      globalNoProxyList.push(...loadNoProxy());
    }
  });

  it("getProxyAgentOptions from proxy settings having both username and password", function () {
    const proxySettings: ProxySettings = {
      host: "https://proxy.example.com",
      port: 8080,
      username: "user",
      password: "pass",
    };
    const options = getProxyAgentOptions(
      proxySettings,
      createPipelineRequest({ url: "https://example.org" })
    );
    assert.strictEqual(options.auth, "user:pass");
  });

  it("getProxyAgentOptions from proxy settings having username but no password", function () {
    const proxySettings: ProxySettings = {
      host: "https://proxy.example.com",
      port: 8080,
      username: "user",
    };
    const options = getProxyAgentOptions(
      proxySettings,
      createPipelineRequest({ url: "https://example.org" })
    );
    assert.strictEqual(options.auth, "user");
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
