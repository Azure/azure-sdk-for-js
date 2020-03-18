// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import "chai/register-should";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import { compressPolicy, CompressPolicy } from "../../src/policies/compressPolicy";
import { HttpOperationResponse } from '../../src/coreHttp';

describe("CompressPolicy (node)", function() {

  function responseOf(r: WebResource): HttpOperationResponse {
    return {
      request: r,
      status: 404,
      headers: new HttpHeaders(undefined)
    }
  }
  const verifyCompressEnabledPolicy = {
    sendRequest: async(request: WebResource) => {
      request.compress!.should.equal(true);
      return Promise.resolve(responseOf(request))
    }
  };

  const verifyCompressDisabledPolicy = {
    sendRequest: async(request: WebResource) => {
      request.compress!.should.equal(false);
      return Promise.resolve(responseOf(request))
    }
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  describe("for Node.js", function() {

    it("sets compress options enable: true through factory by default", async function() {
      const factory = compressPolicy();
      const policy = factory.create(verifyCompressEnabledPolicy, emptyPolicyOptions) as CompressPolicy;
      const request = new WebResource();
      await policy.sendRequest(request);
    });

    it("factory passes correct compress options", async function() {
      const factory = compressPolicy({ enable: false });
      const policy = factory.create(verifyCompressDisabledPolicy, emptyPolicyOptions) as CompressPolicy;
      const request = new WebResource();
      await policy.sendRequest(request);
    });
    it("sets correct compress options through constructor", async function() {
      const policy = new CompressPolicy(verifyCompressDisabledPolicy, emptyPolicyOptions, { enable: false });
      const request = new WebResource();
      await policy.sendRequest(request);
    });

    it("should assign compress option to the web request", async () => {
      const policy = new CompressPolicy(verifyCompressDisabledPolicy, emptyPolicyOptions, { enable: false });
      const request = new WebResource();
      await policy.sendRequest(request);
    });
  });
});
