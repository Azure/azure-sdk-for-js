// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { SendRequest, createPipelineRequest, decompressResponsePolicy } from "../../src";

describe("decompressResponsePolicy (node)", function () {
  it("Sets the expected flag on the request", function () {
    const policy = decompressResponsePolicy();

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    assert.isFalse(request.headers.has("Accept-Encoding"), "acceptEncoding is set.");

    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    policy.sendRequest(request, next);

    assert.isTrue(next.calledOnceWith(request), "next called with request");
    assert.strictEqual(request.headers.get("Accept-Encoding"), "gzip,deflate");
  });
});
