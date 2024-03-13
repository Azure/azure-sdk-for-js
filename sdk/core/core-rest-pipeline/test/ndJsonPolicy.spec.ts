// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  type PipelineResponse,
  type SendRequest,
  createHttpHeaders,
  createPipelineRequest,
  ndJsonPolicy,
} from "../src/index.js";
import { describe, it, assert, vi } from "vitest";

describe("NdJsonPolicy", function () {
  it("Formats arrays correctly", async function () {
    const request = createPipelineRequest({
      url: "https://bing.com",
    });
    request.body = JSON.stringify([{ a: 1 }, { b: 2 }, { c: 3 }]);
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = ndJsonPolicy();

    const result = await policy.sendRequest(request, next);
    assert.strictEqual(result.request.body, `{"a":1}\n{"b":2}\n{"c":3}\n`);
  });
});
