// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { disableResponseDecompressionPolicy, createPipelineRequest, SendRequest } from "../../src";

describe("disableResponseDecompressionPolicy (node)", function() {
  it("Sets the expected flag on the request", function() {
    const policy = disableResponseDecompressionPolicy();

    const request = createPipelineRequest({
      url: "https://bing.com"
    });

    assert.isFalse(request.skipDecompressResponse, "skipDecompressResponse is not set.");

    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    policy.sendRequest(request, next);

    assert.isTrue(next.calledOnceWith(request), "next called with request");
    assert.isTrue(request.skipDecompressResponse, "skipDecompressResponse is set.");
  });
});
