// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import type { SendRequest } from "../../src/index.js";
import { createPipelineRequest, decompressResponsePolicy } from "../../src/index.js";

describe("decompressResponsePolicy (node)", function () {
  it("Sets the expected flag on the request", function () {
    const policy = decompressResponsePolicy();

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    assert.isFalse(request.headers.has("Accept-Encoding"), "acceptEncoding is set.");

    const next = vi.fn<SendRequest>();
    policy.sendRequest(request, next);

    expect(next).toBeCalledWith(request);
    assert.strictEqual(request.headers.get("Accept-Encoding"), "gzip,deflate");
  });
});
