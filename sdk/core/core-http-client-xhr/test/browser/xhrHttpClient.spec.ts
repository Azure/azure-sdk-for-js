// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert, describe, beforeEach, afterEach, it, vi } from "vitest";
import { createXhrHttpClient } from "../../src/xhrHttpClient.js";
import { createPipelineRequest } from "@azure/core-rest-pipeline";

describe("XhrHttpClient", function () {
  beforeEach(function () {
    vi.useFakeTimers();
  });

  afterEach(function () {
    vi.clearAllMocks();
    if (vi.isFakeTimers()) {
      vi.useRealTimers();
    }
  });

  it("TODO: migrate tests to vitest", async function () {
    const client = createXhrHttpClient();
    const request = createPipelineRequest({ url: "https://example.com" });
    assert.ok(request);
    assert.ok(client);
  });
});
