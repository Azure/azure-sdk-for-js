// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { toRestOperationOptions } from "../../src/utils/operationOptionsAdapter.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { assert, describe, expect, it, vi } from "vitest";

describe("toRestOperationOptions", () => {
  it("maps customHeaders to headers and prefers canonical headers", () => {
    const result = toRestOperationOptions({
      requestOptions: {
        customHeaders: {
          "x-legacy": "legacy",
          "x-shared": "legacy",
        },
        headers: {
          "x-current": "current",
          "x-shared": "current",
        },
      },
    });

    assert.deepEqual(result.requestOptions?.headers, {
      "x-legacy": "legacy",
      "x-current": "current",
      "x-shared": "current",
    });
  });

  it("rejects unsupported legacy operation options", () => {
    expect(() =>
      toRestOperationOptions({
        serializerOptions: { xml: {} },
      }),
    ).toThrow("serializerOptions is not supported");
    expect(() =>
      toRestOperationOptions({
        requestOptions: { shouldDeserialize: false },
      }),
    ).toThrow("requestOptions.shouldDeserialize is not supported");
  });

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
