// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  type SendRequest,
  createPipelineRequest,
  decompressResponsePolicy,
} from "../../src/index.js";
import { describe, it, assert, vi } from "vitest";

describe("decompressResponsePolicy (node)", function () {
  it("Sets the expected flag on the request", function () {
    const policy = decompressResponsePolicy();

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    assert.isFalse(request.headers.has("Accept-Encoding"), "acceptEncoding is set.");

    const next = vi.fn<SendRequest>();

    policy.sendRequest(request, next);

    assert.deepStrictEqual(next.mock.calls, [[request]], "next called with request");
    assert.strictEqual(request.headers.get("Accept-Encoding"), "gzip,deflate");
  });
});
