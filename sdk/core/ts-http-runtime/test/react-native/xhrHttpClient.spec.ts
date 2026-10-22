// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { createHttpHeaders } from "../../src/httpHeaders.js";
import { createPipelineRequest } from "../../src/pipelineRequest.js";
import { createXhrHttpClient } from "../../src/xhrHttpClient.js";

describe("XhrHttpClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects Expect from request headers when overrides replace headers", async () => {
    const xhr = vi.fn();
    vi.stubGlobal("XMLHttpRequest", xhr);
    const request = createPipelineRequest({
      url: "https://localhost",
      method: "POST",
      headers: createHttpHeaders({ Expect: "100-continue" }),
      requestOverrides: { headers: {} },
    });

    await expect(createXhrHttpClient().sendRequest(request)).rejects.toThrow(
      "The Expect header is not supported by the XHR HttpClient.",
    );
    expect(xhr).not.toHaveBeenCalled();
  });
});
