// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { should } from "chai";
import { ProxySettings } from "../../src/serviceClient";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import { proxyPolicy, ProxyPolicy, getDefaultProxySettings } from "../../src/policies/proxyPolicy";
import { Constants } from "../../src/coreHttp";

describe("ProxyPolicy (node)", function() {
  const proxySettings: ProxySettings = {
    host: "https://example.com",
    port: 3030,
    username: "admin",
    password: "_password"
  };

  const emptyRequestPolicy = {
    sendRequest: (_: WebResource) =>
      Promise.resolve({
        request: new WebResource(),
        status: 404,
        headers: new HttpHeaders(undefined)
      })
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  describe("for Node.js", function() {
    it("factory passes correct proxy settings", function(done) {
      const factory = proxyPolicy(proxySettings);
      const policy = factory.create(emptyRequestPolicy, emptyPolicyOptions) as ProxyPolicy;

      policy.proxySettings.should.be.deep.equal(proxySettings);
      done();
    });

    it("sets correct proxy settings through constructor", function(done) {
      const policy = new ProxyPolicy(emptyRequestPolicy, emptyPolicyOptions, proxySettings);
      policy.proxySettings.should.be.deep.equal(proxySettings);
      done();
    });

    it("should assign proxy settings to the web request", async () => {
      const policy = new ProxyPolicy(emptyRequestPolicy, emptyPolicyOptions, proxySettings);
      const request = new WebResource();

      await policy.sendRequest(request);

      request.proxySettings!.should.be.deep.equal(proxySettings);
    });

    it("should not override proxy settings to the web request", async () => {
      const policy = new ProxyPolicy(emptyRequestPolicy, emptyPolicyOptions, proxySettings);
      const request = new WebResource();
      const requestSpecificProxySettings = { host: "http://overriden.host", port: 80 };
      request.proxySettings = requestSpecificProxySettings;

      await policy.sendRequest(request);

      request.proxySettings!.should.be.deep.equal(requestSpecificProxySettings);
    });
  });
});

describe("getDefaultProxySettings", () => {
  const proxyUrl = "https://proxy.microsoft.com";
  const defaultPort = 80;

  describe("for Node.js", function() {
    it("should return settings with passed address", () => {
      const proxySettings: ProxySettings = getDefaultProxySettings(proxyUrl)!;
      proxySettings.host.should.equal(proxyUrl);
    });

    it("should return settings with default port", () => {
      const proxySettings: ProxySettings = getDefaultProxySettings(proxyUrl)!;
      proxySettings.port.should.equal(defaultPort);
    });

    it("should return settings with passed port", () => {
      const port = 3030;
      const proxyUrl = "prot://proxy.microsoft.com";
      const proxyUrlWithPort = `${proxyUrl}:${port}`;
      const proxySettings: ProxySettings = getDefaultProxySettings(proxyUrlWithPort)!;
      proxySettings.host.should.equal(proxyUrl);
      proxySettings.port.should.equal(port);
    });

    [
      {
        proxyUrl: "prot://user:pass@proxy.microsoft.com",
        proxyUrlWithoutAuth: "prot://proxy.microsoft.com",
        username: "user",
        password: "pass"
      },
      {
        proxyUrl: "prot://user@proxy.microsoft.com",
        proxyUrlWithoutAuth: "prot://proxy.microsoft.com",
        username: "user",
        password: undefined
      },
      {
        proxyUrl: "prot://:pass@proxy.microsoft.com",
        proxyUrlWithoutAuth: "prot://proxy.microsoft.com",
        username: undefined,
        password: "pass"
      },
      {
        proxyUrl: "prot://proxy.microsoft.com",
        proxyUrlWithoutAuth: "prot://proxy.microsoft.com",
        username: undefined,
        password: undefined
      },
      {
        proxyUrl: "user:pass@proxy.microsoft.com",
        proxyUrlWithoutAuth: "proxy.microsoft.com",
        username: "user",
        password: "pass"
      },
      {
        proxyUrl: "proxy.microsoft.com",
        proxyUrlWithoutAuth: "proxy.microsoft.com",
        username: undefined,
        password: undefined
      }
    ].forEach((testCase) => {
      it(`should return settings with passed proxyUrl : ${testCase.proxyUrl}`, () => {
        const proxySettings: ProxySettings = getDefaultProxySettings(testCase.proxyUrl)!;
        proxySettings.host.should.equal(testCase.proxyUrlWithoutAuth);
        if (testCase.username) {
          proxySettings.username!.should.equal(testCase.username);
        }
        if (testCase.password) {
          proxySettings.password!.should.equal(testCase.password);
        }
      });
    });

    describe("with loadEnvironmentProxyValue", () => {
      beforeEach(() => {
        delete process.env[Constants.HTTP_PROXY];
        delete process.env[Constants.HTTPS_PROXY];
        delete process.env[Constants.HTTP_PROXY.toLowerCase()];
        delete process.env[Constants.HTTPS_PROXY.toLowerCase()];
      });

      it("should return undefined when no proxy passed and environment variable is not set", () => {
        const proxySettings: ProxySettings | undefined = getDefaultProxySettings();
        should().not.exist(proxySettings);
      });

      it("should load settings from environment variables when no proxyUrl passed", () => {
        const proxyUrl = "http://proxy.azure.com";
        process.env[Constants.HTTP_PROXY] = proxyUrl;
        const proxySettings: ProxySettings = getDefaultProxySettings()!;

        proxySettings.host.should.equal(proxyUrl);
        proxySettings.port.should.equal(defaultPort);
      });

      describe("should prefer HTTPS proxy over HTTP proxy", () => {
        [
          { name: "lower case", func: (envVar: string) => envVar.toLowerCase() },
          { name: "upper case", func: (envVar: string) => envVar.toUpperCase() }
        ].forEach((testCase) => {
          it(`with ${testCase.name}`, () => {
            const httpProxy = "http://proxy.microsoft.com";
            const httpsProxy = "https://proxy.azure.com";
            process.env[testCase.func(Constants.HTTP_PROXY)] = httpProxy;
            process.env[testCase.func(Constants.HTTPS_PROXY)] = httpsProxy;

            const proxySettings: ProxySettings = getDefaultProxySettings()!;
            proxySettings.host.should.equal(httpsProxy);
            proxySettings.port.should.equal(defaultPort);
          });
        });

        it("should prefer HTTPS proxy over HTTP proxy", () => {
          const httpProxy = "http://proxy.microsoft.com";
          const httpsProxy = "https://proxy.azure.com";
          process.env[Constants.HTTP_PROXY] = httpProxy;
          process.env[Constants.HTTPS_PROXY] = httpsProxy;

          const proxySettings: ProxySettings = getDefaultProxySettings()!;
          proxySettings.host.should.equal(httpsProxy);
          proxySettings.port.should.equal(defaultPort);
        });
      });

      ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"].forEach((envVariableName) => {
        it(`should should load setting from "${envVariableName}" environmental variable`, () => {
          process.env[envVariableName] = proxyUrl;
          const proxySettings: ProxySettings = getDefaultProxySettings()!;

          proxySettings.host.should.equal(proxyUrl);
          proxySettings.port.should.equal(defaultPort);
        });
      });
    });
  });
});
