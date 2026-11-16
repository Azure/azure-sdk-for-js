// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it, vi } from "vitest";
import { createHttpHeaders, createPipelineRequest } from "../../../src/index.js";
import { createXhrHttpClient } from "../../../src/xhrHttpClient.js";

describe("XhrHttpClient", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("rejects the Expect header", async () => {
    const request = createPipelineRequest({
      url: "https://localhost",
      headers: createHttpHeaders({ Expect: "100-continue" }),
    });

    await expect(createXhrHttpClient().sendRequest(request)).rejects.toThrow(
      "The Expect header is not supported by the XHR HttpClient.",
    );
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
