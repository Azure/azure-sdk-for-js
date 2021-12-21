// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeaders } from "../../src/httpHeaders";
import { RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { WebResource } from "../../src/webResource";
import { assert } from "chai";
import { ndJsonPolicy } from "../../src/policies/ndJsonPolicy";

describe("NdJsonPolicy", function () {
  const returnOk = {
    sendRequest: async (request: WebResource) => {
      return {
        request,
        status: 200,
        headers: new HttpHeaders(),
      };
    },
  };

  const emptyPolicyOptions = new RequestPolicyOptions();

  it("Formats arrays correctly", async function () {
    const factory = ndJsonPolicy();
    const policy = factory.create(returnOk, emptyPolicyOptions);
    const request = new WebResource();
    request.body = JSON.stringify([{ a: 1 }, { b: 2 }, { c: 3 }]);
    const result = await policy.sendRequest(request);
    assert.strictEqual(result.request.body, `{"a":1}\n{"b":2}\n{"c":3}\n`);
  });
});
