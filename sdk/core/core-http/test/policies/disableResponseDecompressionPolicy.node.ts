// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import "chai/register-should";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import {
  disableResponseDecompressionPolicy,
  DisableResponseDecompressionPolicy
} from "../../src/policies/disableResponseDecompressionPolicy";
import { HttpOperationResponse } from "../../src/coreHttp";

describe("DisableResponseDecompressionPolicy (node)", function() {
  function responseOf(r: WebResource): HttpOperationResponse {
    return {
      request: r,
      status: 404,
      headers: new HttpHeaders(undefined)
    };
  }
  const verifyDecompressionDisabledPolicy = {
    sendRequest: async (request: WebResource) => {
      request.decompressResponse!.should.equal(false);
      return Promise.resolve(responseOf(request));
    }
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  describe("for Node.js", function() {
    it("factory passes correct option", async function() {
      const factory = disableResponseDecompressionPolicy();
      const policy = factory.create(
        verifyDecompressionDisabledPolicy,
        emptyPolicyOptions
      ) as DisableResponseDecompressionPolicy;
      const request = new WebResource();
      await policy.sendRequest(request);
    });
    it("sets correct option through constructor", async function() {
      const policy = new DisableResponseDecompressionPolicy(
        verifyDecompressionDisabledPolicy,
        emptyPolicyOptions
      );
      const request = new WebResource();
      await policy.sendRequest(request);
    });

    it("should assign option to the web request", async () => {
      const policy = new DisableResponseDecompressionPolicy(
        verifyDecompressionDisabledPolicy,
        emptyPolicyOptions
      );
      const request = new WebResource();
      await policy.sendRequest(request);
    });
  });
});
