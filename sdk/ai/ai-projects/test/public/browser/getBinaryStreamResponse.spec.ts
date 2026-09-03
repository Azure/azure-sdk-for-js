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

describe("getBinaryStreamResponse", () => {
  it("buffers and parses streamed error responses", async () => {
    const body = { error: { code: "InvalidRequest", message: "The request is invalid." } };
    const response = await getBinaryStreamResponse(createStreamableMethod(JSON.stringify(body)));

    expect(response.body).toEqual(body);
    expect(response.blobBody).toBeUndefined();
  });

  it.each([
    ["an empty", ""],
    ["a non-JSON", "<html>bad gateway</html>"],
    ["a non-object JSON", "[]"],
  ])("leaves the body undefined for %s error stream", async (_description, bodyText) => {
    const response = await getBinaryStreamResponse(createStreamableMethod(bodyText));

    expect(response.body).toBeUndefined();
    expect(response.blobBody).toBeUndefined();
  });
});
