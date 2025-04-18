// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expectTypeOf } from "vitest";
import type { HttpHeaders, PipelineResponse } from "../src/index.js";
import {
  createDefaultHttpClient,
  createEmptyPipeline,
  createPipelineRequest,
} from "../src/index.js";

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
});
