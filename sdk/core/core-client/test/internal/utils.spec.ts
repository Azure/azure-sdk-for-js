// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import type {
  CompositeMapper,
  FullOperationResponse,
  OperationResponseMap,
} from "../../src/index.js";
import type { NodeReadableStream } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { flattenResponse } from "../../src/utils.js";

const defaultRequest = () => createPipelineRequest({ url: "https://example.com", method: "GET" });

describe("flattenResponse", () => {
  for (const { name, value } of [
    { name: "Boolean", value: false },
    { name: "Boolean", value: true },
    { name: "Number", value: 0 },
    { name: "Number", value: 42 },
    { name: "String", value: "" },
    { name: "String", value: "hello" },
    { name: "DateTime", value: new Date("2026-01-01T00:00:00Z") },
    { name: "UnixTime", value: new Date("2026-01-01T00:00:00Z") },
    { name: "ByteArray", value: new Uint8Array() },
    { name: "ByteArray", value: new Uint8Array([1, 2]) },
  ] as const) {
    for (const parsedHeaders of [undefined, {}, { requestId: "request-id" }]) {
      it(`should preserve nullable ${name} body ${String(value)} with headers ${JSON.stringify(parsedHeaders)}`, () => {
        const fullResponse: FullOperationResponse = {
          request: defaultRequest(),
          status: 200,
          headers: createHttpHeaders(),
          parsedBody: value,
          parsedHeaders,
        };
        const responseSpec: OperationResponseMap = {
          bodyMapper: { nullable: true, type: { name } },
        };
        const result = flattenResponse(fullResponse, responseSpec);
        assert.deepStrictEqual(result, { ...parsedHeaders, body: value });
      });
    }
  }

  it("should copy model properties with serializedName into array response", () => {
    const fullResponse: FullOperationResponse = {
      request: defaultRequest(),
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
      } satisfies CompositeMapper,
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result.nextLink, "https://next");
  });

  it("should copy parsedHeaders into array response", () => {
    const fullResponse: FullOperationResponse = {
      request: defaultRequest(),
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
      } satisfies CompositeMapper,
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result["x-custom"], "headerVal");
  });
});

describe("flattenResponse - Stream response", () => {
  it("should return stream properties for Stream body type", () => {
    const mockStream = { pipe: () => {} } as unknown as NodeReadableStream;
    const fullResponse: FullOperationResponse = {
      request: defaultRequest(),
      status: 200,
      headers: createHttpHeaders(),
      readableStreamBody: mockStream,
      parsedHeaders: { "x-header": "val" },
    };
    const responseSpec: OperationResponseMap = {
      bodyMapper: {
        type: { name: "Stream" },
      },
    };
    const result = flattenResponse(fullResponse, responseSpec) as Record<string, unknown>;
    assert.strictEqual(result.readableStreamBody, mockStream);
    assert.strictEqual(result["x-header"], "val");
  });
});
