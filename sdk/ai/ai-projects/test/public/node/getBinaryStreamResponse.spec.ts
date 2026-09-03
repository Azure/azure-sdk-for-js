// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import type { StreamableMethod } from "@azure-rest/core-client";
import { describe, expect, it, vi } from "vitest";
import { getBinaryStreamResponse } from "../../../src/static-helpers/serialization/get-binary-stream-response.js";

describe("getBinaryStreamResponse", () => {
  it("buffers and parses streamed error responses", async () => {
    const body = { error: { code: "InvalidRequest", message: "The request is invalid." } };
    const streamableMethod = {
      asNodeStream: vi.fn().mockResolvedValue({
        status: "400",
        headers: {},
        request: {},
        body: Readable.from([JSON.stringify(body)]),
      }),
    } as unknown as StreamableMethod;

    const response = await getBinaryStreamResponse(streamableMethod);

    expect(response.body).toEqual(body);
    expect(response.readableStreamBody).toBeUndefined();
  });
});
