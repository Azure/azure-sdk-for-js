// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StreamableMethod } from "@azure-rest/core-client";
import { describe, expect, it, vi } from "vitest";
import { getBinaryStreamResponse } from "../../../src/static-helpers/serialization/get-binary-stream-response-browser.mjs";

function createStreamableMethod(bodyText: string): StreamableMethod {
  return {
    asBrowserStream: vi.fn().mockResolvedValue({
      status: "400",
      headers: {},
      request: {},
      body: new Blob([bodyText]).stream(),
    }),
  } as unknown as StreamableMethod;
}

const rawErrorCases: Array<[string, string, string]> = [
  ["an empty", "", ""],
  ["a plain-text", "bad gateway", "bad gateway"],
  ["an HTML", "<html>bad gateway</html>", "<html>bad gateway</html>"],
];

describe("getBinaryStreamResponse", () => {
  it("buffers and parses streamed error responses", async () => {
    const body = { error: { code: "InvalidRequest", message: "The request is invalid." } };
    const response = await getBinaryStreamResponse(createStreamableMethod(JSON.stringify(body)));

    expect(response.body).toEqual(body);
    expect(response.blobBody).toBeUndefined();
  });

  it.each(rawErrorCases)(
    "preserves %s error stream as text",
    async (_description, bodyText, text) => {
      const response = await getBinaryStreamResponse(createStreamableMethod(bodyText));

      expect(response.body).toBe(text);
      expect(response.blobBody).toBeUndefined();
    },
  );

  it("preserves parsed non-object JSON values", async () => {
    const response = await getBinaryStreamResponse(createStreamableMethod("[]"));

    expect(response.body).toEqual([]);
  });
});
