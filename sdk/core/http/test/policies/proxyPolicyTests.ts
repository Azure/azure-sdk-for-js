// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import "chai/register-should";
import { should } from "chai";
import { ProxySettings } from "../../lib/serviceClient";
import { RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";
import { HttpHeaders } from "../../lib/httpHeaders";
import { proxyPolicy, ProxyPolicy, getDefaultProxySettings } from "../../lib/policies/proxyPolicy";
import { Constants } from "../../lib/msRest";
import { nodeDescribe, browserDescribe } from "../msAssert";

describe("ProxyPolicy", function () {
  const proxySettings: ProxySettings = {
    host: "https://example.com",
    port: 3030,
    username: "admin",
    password: "_password"
  };

  const emptyRequestPolicy = {
    sendRequest: (_: WebResource) => Promise.resolve({
      request: new WebResource(),
      status: 404,
      headers: new HttpHeaders(undefined)
    })
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  nodeDescribe("for Node.js", function () {
    it("factory passes correct proxy settings", function (done) {
      const factory = proxyPolicy(proxySettings);
      const policy = factory.create(emptyRequestPolicy, emptyPolicyOptions) as ProxyPolicy;

      policy.proxySettings.should.be.deep.equal(proxySettings);
      done();
    });


    it("sets correct proxy settings through constructor", function (done) {
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

  browserDescribe("for browser", () => {
    it("should throw an Error while constructing object", () => {
      const construct = () => new ProxyPolicy(emptyRequestPolicy, emptyPolicyOptions, proxySettings);
      construct.should.throw();
    });
  });
});

describe("getDefaultProxySettings", () => {
  const proxyUrl = "https://proxy.microsoft.com";
  const defaultPort = 80;

  nodeDescribe("for Node.js", function () {
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
        ].forEach(testCase => {
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

      ["HTTP_PROXY", "HTTPS_PROXY", "http_proxy", "https_proxy"].forEach(envVariableName => {
        it(`should should load setting from "${envVariableName}" environmental variable`, () => {
          process.env[envVariableName] = proxyUrl;
          const proxySettings: ProxySettings = getDefaultProxySettings()!;

          proxySettings.host.should.equal(proxyUrl);
          proxySettings.port.should.equal(defaultPort);
        });
      });
    });
  });

  browserDescribe("for browser", () => {
    [undefined, "http://proxy.microsoft.com", "https://proxy.azure.com:8080"].forEach(proxyUrl => {
      it(`should return undefined for ${proxyUrl}`, () => {
        const proxySettings = getDefaultProxySettings(proxyUrl);
        should().not.exist(proxySettings);
      });
    });
  });
});
