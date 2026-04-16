// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type { CompositeMapper, FullOperationResponse } from "../../src/index.js";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { flattenResponse } from "../../src/utils.js";

describe("flattenResponse coverage", () => {
  it("should copy model properties with serializedName into array response", () => {
    const fullResponse: FullOperationResponse = {
      request: createPipelineRequest({ url: "https://example.com", method: "GET" }),
      status: 200,
      headers: createHttpHeaders(),
      parsedBody: Object.assign([1, 2, 3], { nextLink: "https://next" }),
    };
    const responseSpec = {
      bodyMapper: {
        type: {
          name: "Composite",
          modelProperties: {
            value: {
              serializedName: "",
              type: { name: "Sequence", element: { type: { name: "Number" } } },
            },
            nextLink: {
              serializedName: "nextLink",
              type: { name: "String" },
            },
          },
        },
      } as CompositeMapper,
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result.nextLink, "https://next");
  });

  it("should copy parsedHeaders into pageable array response", () => {
    const fullResponse: FullOperationResponse = {
      request: createPipelineRequest({ url: "https://example.com", method: "GET" }),
      status: 200,
      headers: createHttpHeaders(),
      parsedBody: [1, 2, 3],
      parsedHeaders: { "x-custom": "headerVal" },
    };
    const responseSpec = {
      bodyMapper: {
        type: {
          name: "Composite",
          modelProperties: {
            value: {
              serializedName: "",
              type: { name: "Sequence", element: { type: { name: "Number" } } },
            },
          },
        },
      } as CompositeMapper,
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result["x-custom"], "headerVal");
  });
});

describe("flattenResponse - Stream response", () => {
  it("should return stream properties for Stream body type", () => {
    const mockStream = { pipe: () => {} };
    const fullResponse: FullOperationResponse = {
      request: createPipelineRequest({ url: "https://example.com", method: "GET" }),
      status: 200,
      headers: createHttpHeaders(),
      readableStreamBody: mockStream as NodeJS.ReadableStream,
      parsedHeaders: { "x-header": "val" },
    };
    const responseSpec = {
      bodyMapper: {
        type: { name: "Stream" },
      },
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result.readableStreamBody, mockStream);
    assert.strictEqual(result["x-header"], "val");
  });
});
