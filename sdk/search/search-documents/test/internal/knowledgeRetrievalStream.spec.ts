// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { deserializeRetrievalStream } from "../../src/knowledgeRetrievalClient.js";
import type { KnowledgeBaseRetrievalStreamEvent } from "../../src/knowledgeBaseModels.js";

async function* toStream(
  messages: { event: string; data: string }[],
): AsyncIterable<{ event: string; data: string }> {
  for (const message of messages) {
    yield message;
  }
}

async function collect(
  messages: { event: string; data: string }[],
): Promise<KnowledgeBaseRetrievalStreamEvent[]> {
  const events: KnowledgeBaseRetrievalStreamEvent[] = [];
  for await (const event of deserializeRetrievalStream(toStream(messages))) {
    events.push(event);
  }
  return events;
}

describe("knowledge retrieval stream", () => {
  it("deserializes the retrieval started event", async () => {
    const [event] = await collect([
      {
        event: "retrieval.started",
        data: JSON.stringify({
          requestId: "request-1",
          knowledgeBaseName: "base",
          outputMode: "answerSynthesis",
          reasoningEffort: { kind: "auto" },
        }),
      },
    ]);

    assert.equal(event.event, "retrieval.started");
    assert.deepEqual(event.data, {
      requestId: "request-1",
      knowledgeBaseName: "base",
      outputMode: "answerSynthesis",
      reasoningEffort: { kind: "auto" },
    });
  });

  it("converts activity timestamps and diagnostics", async () => {
    const events = await collect([
      {
        event: "activity.started",
        data: JSON.stringify({
          id: 1,
          type: "searchIndex",
          startedAt: "2026-08-01T00:00:00Z",
          knowledgeSourceName: "ks",
        }),
      },
      {
        event: "activity.completed",
        data: JSON.stringify({
          id: 1,
          type: "searchIndex",
          startedAt: "2026-08-01T00:00:00Z",
          completedAt: "2026-08-01T00:00:01Z",
          elapsedMs: 1000,
          imageServing: {
            servedImages: [{ imageId: "image-1", imagePath: "/images/1", sizeBytes: 42 }],
          },
          queryHintProcessing: {
            generatedBoost: "manual",
            generatedFilter: "category eq 'manual'",
          },
        }),
      },
    ]);

    assert.equal(events[0].event, "activity.started");
    assert.deepEqual(
      (events[0].data as { startedAt: Date }).startedAt,
      new Date("2026-08-01T00:00:00Z"),
    );

    assert.equal(events[1].event, "activity.completed");
    const completed = events[1].data as {
      startedAt?: Date;
      completedAt?: Date;
      elapsedInMs?: number;
      imageServing?: { servedImages?: unknown[] };
      queryHintProcessing?: { generatedFilter?: string };
    };
    assert.deepEqual(completed.startedAt, new Date("2026-08-01T00:00:00Z"));
    assert.deepEqual(completed.completedAt, new Date("2026-08-01T00:00:01Z"));
    assert.equal(completed.elapsedInMs, 1000);
    assert.equal(completed.imageServing?.servedImages?.length, 1);
    assert.equal(completed.queryHintProcessing?.generatedFilter, "category eq 'manual'");
  });

  it("deserializes answer and reference completion events", async () => {
    const events = await collect([
      {
        event: "answer.completed",
        data: JSON.stringify({
          messageIndex: 0,
          message: { role: "assistant", content: [{ type: "text", text: "answer" }] },
        }),
      },
      {
        event: "references.completed",
        data: JSON.stringify([
          {
            id: "reference-1",
            type: "searchIndex",
            activitySource: 1,
            citationUrl: "https://example.search.windows.net/indexes('idx')/docs('1')",
          },
        ]),
      },
    ]);

    assert.equal(events[0].event, "answer.completed");
    assert.equal(
      events[0].event === "answer.completed" ? events[0].data.messageIndex : undefined,
      0,
    );
    assert.equal(events[1].event, "references.completed");
    assert.equal(events[1].event === "references.completed" ? events[1].data.length : 0, 1);
  });

  it.each([
    {
      name: "response.completed",
      terminalEvent: {
        event: "response.completed",
        data: JSON.stringify({
          statusCode: 206,
          response: { response: [{ role: "assistant", content: [] }] },
        }),
      },
    },
    {
      name: "error",
      terminalEvent: {
        event: "error",
        data: JSON.stringify({ error: { code: "Failed", message: "retrieval failed" } }),
      },
    },
  ])("stops and closes the source after $name", async ({ terminalEvent }) => {
    let sourceClosed = false;
    let eventAfterTerminalRead = false;

    async function* source(): AsyncIterable<{ event: string; data: string }> {
      try {
        yield terminalEvent;
        eventAfterTerminalRead = true;
        yield {
          event: "retrieval.started",
          data: JSON.stringify({ requestId: "unexpected" }),
        };
      } finally {
        sourceClosed = true;
      }
    }

    const events: KnowledgeBaseRetrievalStreamEvent[] = [];
    for await (const event of deserializeRetrievalStream(source())) {
      events.push(event);
    }

    assert.equal(events.length, 1);
    assert.equal(events[0].event, terminalEvent.event);
    assert.isFalse(eventAfterTerminalRead);
    assert.isTrue(sourceClosed);
  });

  it("skips empty payloads and ignores unknown events", async () => {
    const events = await collect([
      { event: "end", data: "" },
      { event: "some.future.event", data: "not-json" },
    ]);
    assert.isEmpty(events);
  });

  it("rejects malformed JSON event payloads", async () => {
    await expect(collect([{ event: "retrieval.started", data: "not-json" }])).rejects.toThrow(
      SyntaxError,
    );
  });
});
