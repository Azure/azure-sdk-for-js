// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, vi } from "vitest";
import {
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  userAgentPolicy,
} from "../../../src/index.js";

describe("userAgentPolicy - edge cases", function () {
  it("does not overwrite an existing User-Agent header", async function () {
    const policy = userAgentPolicy();
    const request = createPipelineRequest({ url: "https://example.com" });
    request.headers.set("User-Agent", "custom-agent");
    const next = vi.fn<SendRequest>();
    next.mockImplementation(async (req) => ({
      headers: createHttpHeaders(),
      request: req,
      status: 200,
    }));
    await policy.sendRequest(request, next);
    assert.equal(request.headers.get("User-Agent"), "custom-agent");
  });

  it("sets User-Agent header when not present", async function () {
    const policy = userAgentPolicy({ userAgentPrefix: "my-prefix" });
    const request = createPipelineRequest({ url: "https://example.com" });
    const next = vi.fn<SendRequest>();
    next.mockImplementation(async (req) => ({
      headers: createHttpHeaders(),
      request: req,
      status: 200,
    }));
    await policy.sendRequest(request, next);
    const ua = request.headers.get("User-Agent");
    assert.isDefined(ua);
    assert.isTrue(ua!.startsWith("my-prefix"));
  });
});
