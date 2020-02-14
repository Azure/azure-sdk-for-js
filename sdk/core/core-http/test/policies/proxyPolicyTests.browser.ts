// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "chai/register-should";
import { should } from "chai";
import { ProxySettings } from "../../lib/serviceClient";
import { RequestPolicyOptions } from "../../lib/policies/requestPolicy";
import { WebResource } from "../../lib/webResource";
import { HttpHeaders } from "../../lib/httpHeaders";
import { ProxyPolicy, getDefaultProxySettings } from "../../lib/policies/proxyPolicy";

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
      const construct = () =>
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
