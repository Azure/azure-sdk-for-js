// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { describe, it, assert, expect, vi } from "vitest";
import { SendRequest, createPipelineRequest, decompressResponsePolicy } from "../../src/index.js";

describe("decompressResponsePolicy (node)", function () {
  it("Sets the expected flag on the request", function () {
    const policy = decompressResponsePolicy();

    const request = createPipelineRequest({
      url: "https://bing.com",
    });

    assert.isFalse(request.headers.has("Accept-Encoding"), "acceptEncoding is set.");

    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    policy.sendRequest(request, next);

    expect(next).toBeCalledWith(request);
    assert.strictEqual(request.headers.get("Accept-Encoding"), "gzip,deflate");
  });
});
