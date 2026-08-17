// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { toRestOperationOptions } from "../../src/internal/operationOptions.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert, describe, expect, it, vi } from "vitest";

describe("toRestOperationOptions", () => {
  it("preserves the legacy error position without populating flatResponse", () => {
    const onResponse = vi.fn();
    const result = toRestOperationOptions({ onResponse });
    const error = new Error("request failed");
    const rawResponse = {
      headers: createHttpHeaders(),
      request: createPipelineRequest({ url: "https://example.org" }),
      status: 500,
    };

    result.onResponse?.(rawResponse, error, error);

    expect(onResponse).toHaveBeenCalledOnce();
    assert.isUndefined(onResponse.mock.calls[0][1]);
    assert.equal(onResponse.mock.calls[0][2], error);
  });
});
