// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient } from "@azure-rest/core-client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSseStream } from "#platform/sseHelper";

function createResponse(status: number, body: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, { status });
}

describe("knowledge retrieval stream browser transport", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("preserves streamed JSON preflight errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        createResponse(
          404,
          JSON.stringify({
            error: { code: "NotFound", message: "Knowledge base not found" },
          }),
        ),
      ),
    );
    const client = getClient("https://example.search.windows.net");

    await expect(
      getSseStream(client.pathUnchecked("/knowledgebases/base").get()),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: "NotFound",
      message: "Knowledge base not found",
    });
  });
});
