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

const rawErrorCases: Array<[string, string[], string]> = [
  ["an empty", [], ""],
  ["a plain-text", ["bad gateway"], "bad gateway"],
  ["an HTML", ["<html>bad gateway</html>"], "<html>bad gateway</html>"],
];

describe("getBinaryStreamResponse", () => {
  it("buffers and parses streamed error responses", async () => {
    const body = { error: { code: "InvalidRequest", message: "The request is invalid." } };
    const streamableMethod = createStreamableMethod([JSON.stringify(body)]);

    const response = await getBinaryStreamResponse(streamableMethod);

    expect(response.body).toEqual(body);
    expect(response.readableStreamBody).toBeUndefined();
  });

  it.each(rawErrorCases)(
    "preserves %s error stream as text",
    async (_description, chunks, text) => {
      const response = await getBinaryStreamResponse(createStreamableMethod(chunks));

      expect(response.body).toBe(text);
      expect(response.readableStreamBody).toBeUndefined();
    },
  );

  it("preserves parsed non-object JSON values", async () => {
    const response = await getBinaryStreamResponse(createStreamableMethod(["[]"]));

    expect(response.body).toEqual([]);
  });
});
