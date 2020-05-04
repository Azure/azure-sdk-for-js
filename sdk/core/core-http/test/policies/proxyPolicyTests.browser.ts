// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { should } from "chai";
import { ProxySettings } from "../../src/serviceClient";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import { ProxyPolicy, getDefaultProxySettings } from "../../src/policies/proxyPolicy";

describe("ProxyPolicy (browser)", function() {
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

  describe("for browser", () => {
    it("should throw an Error while constructing object", () => {
      const construct = (): ProxyPolicy =>
        new ProxyPolicy(emptyRequestPolicy, emptyPolicyOptions, proxySettings);
      construct.should.throw();
    });
  });
});

describe("getDefaultProxySettings", () => {
  describe("for browser", () => {
    [undefined, "http://proxy.microsoft.com", "https://proxy.azure.com:8080"].forEach(
      (proxyUrl) => {
        it(`should return undefined for ${proxyUrl}`, () => {
          const proxySettings = getDefaultProxySettings(proxyUrl);
          should().not.exist(proxySettings);
        });
      }
    );
  });
});
