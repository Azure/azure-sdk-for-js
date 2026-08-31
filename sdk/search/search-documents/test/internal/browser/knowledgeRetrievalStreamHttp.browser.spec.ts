// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient } from "@azure-rest/core-client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { getSseStream } from "#platform/sseHelper";
import {
  deserializeRetrievalStream,
  type KnowledgeBaseRetrievalStreamEvent,
} from "../../../src/knowledgeRetrievalClient.js";

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

  it("streams typed events from a browser response", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        createResponse(
          200,
          [
            `event: retrieval.started\ndata: ${JSON.stringify({
              requestId: "request-1",
              knowledgeBaseName: "base",
              outputMode: "extractiveData",
              reasoningEffort: { kind: "auto" },
            })}\n\n`,
            `event: response.completed\ndata: ${JSON.stringify({
              statusCode: 200,
              response: { response: [] },
            })}\n\n`,
          ].join(""),
        ),
      ),
    );
    const client = getClient("https://example.search.windows.net");

    const events: KnowledgeBaseRetrievalStreamEvent[] = [];
    const stream = await getSseStream(client.pathUnchecked("/knowledgebases/base").get());
    for await (const event of deserializeRetrievalStream(stream)) {
      events.push(event);
    }

    expect(events.map((event) => event.event)).toEqual(["retrieval.started", "response.completed"]);
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
