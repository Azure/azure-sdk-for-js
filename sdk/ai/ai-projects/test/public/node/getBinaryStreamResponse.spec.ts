// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import type { StreamableMethod } from "@azure-rest/core-client";
import { describe, expect, it, vi } from "vitest";
import { getBinaryStreamResponse } from "../../../src/static-helpers/serialization/get-binary-stream-response.js";

function createStreamableMethod(chunks: string[]): StreamableMethod {
  return {
    asNodeStream: vi.fn().mockResolvedValue({
      status: "400",
      headers: {},
      request: {},
      body: Readable.from(chunks),
    }),
  } as unknown as StreamableMethod;
}

const invalidObjectErrorCases: Array<[string, string[]]> = [
  ["an empty", []],
  ["a plain-text", ["bad gateway"]],
  ["an HTML", ["<html>bad gateway</html>"]],
  ["a non-object JSON", ["[]"]],
];

describe("getBinaryStreamResponse", () => {
  it("buffers and parses streamed error responses", async () => {
    const body = { error: { code: "InvalidRequest", message: "The request is invalid." } };
    const streamableMethod = createStreamableMethod([JSON.stringify(body)]);

    const response = await getBinaryStreamResponse(streamableMethod);

    expect(response.body).toEqual(body);
    expect(response.readableStreamBody).toBeUndefined();
  });

  it.each(invalidObjectErrorCases)(
    "leaves the body undefined for %s error stream",
    async (_description, chunks) => {
      const response = await getBinaryStreamResponse(createStreamableMethod(chunks));

      expect(response.body).toBeUndefined();
      expect(response.readableStreamBody).toBeUndefined();
    },
  );
});
