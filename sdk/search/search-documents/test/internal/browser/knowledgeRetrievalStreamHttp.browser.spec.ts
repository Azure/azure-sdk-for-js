// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { getClient } from "@azure-rest/core-client";
import { AzureKeyCredential } from "@azure/core-auth";
import { afterEach, describe, expect, it, vi } from "vitest";
import { KnowledgeBaseRetrievalClient as ProtocolKnowledgeBaseRetrievalClient } from "../../../src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.js";
import { getSseStream } from "#platform/sseHelper";
import { deserializeRetrievalStream } from "../../../src/knowledgeRetrievalClient.js";
import type { KnowledgeBaseRetrievalStreamEvent } from "../../../src/knowledgeBaseModels.js";

function createResponse(status: number, body: string): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(body));
      controller.close();
    },
  });
  return new Response(stream, {
    status,
    headers: { "content-type": status === 200 ? "text/event-stream" : "application/json" },
  });
}

describe("knowledge retrieval stream browser transport", () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it.each(["application/json", "text/plain", ""])(
    "rejects a non-SSE convenience response (%s) and cancels its stream",
    async (contentType) => {
      const cancel = vi.fn();
      const stream = new ReadableStream<Uint8Array>({
        cancel,
      });
      vi.stubGlobal(
        "fetch",
        vi
          .fn()
          .mockResolvedValue(
            new Response(stream, { status: 200, headers: { "content-type": contentType } }),
          ),
      );
      const client = getClient("https://example.search.windows.net");
      await expect(
        getSseStream(client.pathUnchecked("/knowledgebases/base").get()),
      ).rejects.toMatchObject({ statusCode: 200 });
      expect(cancel).toHaveBeenCalledOnce();
      expect(stream.locked).toBe(false);
    },
  );

  it("continues to parse a non-success streaming response body", async () => {
    const cancel = vi.fn();
    const responseBody = JSON.stringify({
      error: { code: "NotFound", message: "Knowledge base not found" },
    });
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new TextEncoder().encode(responseBody));
        controller.close();
      },
      cancel,
    });
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(stream, { status: 404, headers: { "content-type": "application/json" } }),
        ),
    );
    const client = getClient("https://example.search.windows.net");

    await expect(
      getSseStream(client.pathUnchecked("/knowledgebases/base").get()),
    ).rejects.toMatchObject({ statusCode: 404, code: "NotFound" });
    expect(cancel).not.toHaveBeenCalled();
  });

  it("streams typed events from the protocol browser client", async () => {
    const fetch = vi.fn().mockResolvedValue(
      createResponse(
        200,
        [
          `event: activity.completed\ndata: ${JSON.stringify({
            id: 1,
            type: "searchIndex",
            startedAt: "2026-10-01T00:00:00Z",
            completedAt: "2026-10-01T00:00:01Z",
          })}\n\n`,
          `event: response.completed\ndata: ${JSON.stringify({
            statusCode: 200,
            response: { response: [] },
          })}\n\n`,
          `event: retrieval.started\ndata: {"requestId":"unexpected"}\n\n`,
        ].join(""),
      ),
    );
    vi.stubGlobal("fetch", fetch);
    const client = new ProtocolKnowledgeBaseRetrievalClient(
      "https://example.search.windows.net",
      new AzureKeyCredential("key"),
      "base",
    );

    const events: KnowledgeBaseRetrievalStreamEvent[] = [];
    for await (const event of await client.retrieveStream({
      intents: [{ type: "semantic", search: "status" }],
    })) {
      events.push(event);
    }

    expect(events.map((event) => event.event)).toEqual([
      "activity.completed",
      "response.completed",
    ]);
    const activity = events[0];
    expect(activity.event).toBe("activity.completed");
    if (activity.event === "activity.completed") {
      expect(activity.data.startedAt).toEqual(new Date("2026-10-01T00:00:00Z"));
      expect(activity.data.completedAt).toEqual(new Date("2026-10-01T00:00:01Z"));
    }
    expect(fetch).toHaveBeenCalledOnce();
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

  it("preserves streamed errors from the raw protocol client", async () => {
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
    const client = new ProtocolKnowledgeBaseRetrievalClient(
      "https://example.search.windows.net",
      new AzureKeyCredential("key"),
      "base",
    );

    await expect(
      client.retrieveStream({ intents: [{ type: "semantic", search: "status" }] }),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: "NotFound",
      message: "Knowledge base not found",
    });
  });
});
