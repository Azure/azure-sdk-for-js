// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { assert, describe, it } from "vitest";
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

  it("converts activity timestamps to dates", async () => {
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
      elapsedMs?: number;
    };
    assert.deepEqual(completed.startedAt, new Date("2026-08-01T00:00:00Z"));
    assert.deepEqual(completed.completedAt, new Date("2026-08-01T00:00:01Z"));
    assert.equal(completed.elapsedMs, 1000);
  });

  it("deserializes the terminal response completed event", async () => {
    const [event] = await collect([
      {
        event: "response.completed",
        data: JSON.stringify({
          statusCode: 200,
          response: { response: [{ role: "assistant", content: [] }] },
        }),
      },
    ]);

    assert.equal(event.event, "response.completed");
    assert.equal((event.data as { statusCode: number }).statusCode, 200);
  });

  it("deserializes the error event", async () => {
    const [event] = await collect([
      {
        event: "error",
        data: JSON.stringify({
          error: { code: "Failed", message: "retrieval failed" },
        }),
      },
    ]);

    assert.equal(event.event, "error");
    assert.equal(
      (event.data as { error?: { message?: string } }).error?.message,
      "retrieval failed",
    );
  });

  it("skips empty payloads and ignores unknown events", async () => {
    const events = await collect([
      { event: "end", data: "" },
      { event: "some.future.event", data: "{}" },
    ]);

    assert.isEmpty(events);
  });
});
