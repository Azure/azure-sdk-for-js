// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expectTypeOf } from "vitest";
import type { HttpClient, HttpHeaders, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest,
  createPipelineFromOptions,
  createHttpHeaders,
} from "@azure/core-rest-pipeline";

describe("HttpsPipeline", function () {
  it("assert pipeline response shape", async function () {
    const p = createEmptyPipeline();
    p.addPolicy({
      name: "test",
      sendRequest: async (request) => {
        return {
          headers: {} as HttpHeaders,
          status: 0 as number,
          request,
          bodyAsText: "" as string,
          readableStreamBody: {} as NodeJS.ReadableStream,
          blobBody: {} as Promise<Blob>,
          browserStreamBody: {} as ReadableStream<Uint8Array<ArrayBufferLike>>,
        };
      },
    });
    expectTypeOf(
      await p.sendRequest(
        createDefaultHttpClient(),
        createPipelineRequest({ url: "https://example.com" }),
      ),
    ).toEqualTypeOf<PipelineResponse>();
  });

  describe("requestOverrides", function () {
    it("is undefined by default", async function () {
      const testHttpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.strictEqual(request.requestOverrides, undefined);
          return {
            request,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };

      const pipeline = createPipelineFromOptions({});
      const request = createPipelineRequest({ url: "https://example.com" });
      await pipeline.sendRequest(testHttpClient, request);
    });

    it("sets and overrides request properties", async function () {
      const testHttpClient: HttpClient = {
        sendRequest: async (request) => {
          assert.deepEqual(request.requestOverrides?.timeout, 1);
          assert.deepEqual(request.requestOverrides?.priority, "low");
          const updated = {
            ...request,
            ...request.requestOverrides,
          };
          return {
            request: updated,
            headers: createHttpHeaders(),
            status: 200,
          };
        },
      };

      const pipeline = createPipelineFromOptions({});
      pipeline.addPolicy({
        name: "test",
        sendRequest: async (request, next) => {
          request.requestOverrides = { timeout: 1, priority: "low" };
          return next(request);
        },
      });
      const request = createPipelineRequest({ url: "https://example.com" });
      request.timeout = 0;

      const response = await pipeline.sendRequest(testHttpClient, request);
      assert.strictEqual(response.request.timeout, 1);
      assert.strictEqual((response.request as any).priority, "low");
    });
  });
});
