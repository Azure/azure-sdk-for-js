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
    "rejects non-SSE responses (%s) and cancels both client streams",
    async (contentType) => {
      for (const protocol of [false, true]) {
        const cancel = vi.fn();
        const stream = new ReadableStream<Uint8Array>({ cancel });
        vi.stubGlobal(
          "fetch",
          vi
            .fn()
            .mockResolvedValue(
              new Response(stream, { status: 200, headers: { "content-type": contentType } }),
            ),
        );
        const result = protocol
          ? new ProtocolKnowledgeBaseRetrievalClient(
              "https://example.search.windows.net",
              new AzureKeyCredential("key"),
              "base",
            ).retrieveStream({ intents: [{ type: "semantic", search: "status" }] })
          : getSseStream(
              getClient("https://example.search.windows.net")
                .pathUnchecked("/knowledgebases/base")
                .get(),
            );
        await expect(result).rejects.toMatchObject({ statusCode: 200 });
        expect(cancel).toHaveBeenCalledOnce();
        expect(stream.locked).toBe(false);
      }
    },
  );

  it("streams typed protocol events and stops at completion", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        createResponse(
          200,
          [
            `event: activity.completed\ndata: ${JSON.stringify({
              id: 1,
              type: "graphSearch",
              startedAt: "2026-11-01T00:00:00Z",
              completedAt: "2026-11-01T00:00:01Z",
              elapsedMs: 1000,
            })}\n\n`,
            'event: response.completed\ndata: {"statusCode":206,"response":{"response":[]}}\n\n',
            'event: retrieval.started\ndata: {"requestId":"unexpected"}\n\n',
          ].join(""),
        ),
      ),
    );
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
    if (activity.event === "activity.completed") {
      expect(activity.data.startedAt).toEqual(new Date("2026-11-01T00:00:00Z"));
      expect(activity.data.elapsedMs).toBe(1000);
    }
  });

  it.each(["", "   ", "{ invalid"])("preserves malformed JSON HTTP error body %j", async (body) => {
    vi.stubGlobal(
      "fetch",
      vi
        .fn()
        .mockResolvedValue(
          new Response(body, { status: 404, headers: { "content-type": "application/json" } }),
        ),
    );
    const client = new ProtocolKnowledgeBaseRetrievalClient(
      "https://example.search.windows.net",
      new AzureKeyCredential("key"),
      "base",
    );
    await expect(
      client.retrieveStream({
        intents: [{ type: "semantic", search: "status" }],
      }),
    ).rejects.toMatchObject({ statusCode: 404, response: { status: 404 }, name: "RestError" });
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
