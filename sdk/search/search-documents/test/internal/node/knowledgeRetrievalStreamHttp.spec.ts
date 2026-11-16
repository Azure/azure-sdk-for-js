// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { AzureKeyCredential } from "../../../src/index.js";
import { KnowledgeBaseRetrievalClient as ProtocolKnowledgeBaseRetrievalClient } from "../../../src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.js";
import { KnowledgeRetrievalClient } from "../../../src/knowledgeRetrievalClient.js";
import type { KnowledgeBaseRetrievalStreamEvent } from "../../../src/knowledgeBaseModels.js";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import { Readable } from "node:stream";

function createClient(
  sendRequest: (request: PipelineRequest) => Promise<PipelineResponse>,
): KnowledgeRetrievalClient {
  return new KnowledgeRetrievalClient(
    "https://example.search.windows.net",
    "base",
    new AzureKeyCredential("key"),
    {
      additionalPolicies: [
        {
          position: "perCall",
          policy: { name: "mock-response", sendRequest },
        },
      ],
    },
  );
}

function createProtocolClient(
  sendRequest: (request: PipelineRequest) => Promise<PipelineResponse>,
): ProtocolKnowledgeBaseRetrievalClient {
  return new ProtocolKnowledgeBaseRetrievalClient(
    "https://example.search.windows.net",
    new AzureKeyCredential("key"),
    "base",
    {
      additionalPolicies: [{ position: "perCall", policy: { name: "mock-response", sendRequest } }],
    },
  );
}

describe("knowledge retrieval stream HTTP transport", () => {
  it.each(["application/json", "text/plain", undefined])(
    "rejects a non-SSE response (%s) and closes both client streams",
    async (contentType) => {
      for (const factory of [createClient, createProtocolClient]) {
        const body = new Readable({ read() {} });
        const client = factory(async (request) => ({
          request,
          status: 200,
          headers: createHttpHeaders(contentType ? { "content-type": contentType } : {}),
          readableStreamBody: body,
        }));
        await expect(
          client.retrieveStream({
            intents: [{ type: "semantic", search: "status" }],
          }),
        ).rejects.toMatchObject({ statusCode: 200 });
        assert.isTrue(body.destroyed);
        assert.isTrue(body.readableFlowing !== true);
      }
    },
  );

  it.each(["response.completed", "error"])(
    "streams typed protocol events and closes before yielding %s",
    async (terminalEvent) => {
      const requests: PipelineRequest[] = [];
      const body = Readable.from([
        Buffer.from(
          [
            `event: activity.completed\ndata: ${JSON.stringify({
              id: 1,
              type: "searchIndex",
              startedAt: "2026-11-01T00:00:00Z",
              completedAt: "2026-11-01T00:00:01Z",
              elapsedMs: 1000,
              queryHintProcessing: { generatedFilter: "category eq 'manual'" },
            })}\n\n`,
            `event: ${terminalEvent}\ndata: ${JSON.stringify(
              terminalEvent === "error"
                ? { error: { code: "Failed", message: "retrieval failed" } }
                : { statusCode: 206, response: { response: [] } },
            )}\n\n`,
            `event: retrieval.started\ndata: {"requestId":"unexpected"}\n\n`,
          ].join(""),
        ),
      ]);
      const client = createProtocolClient(async (request) => {
        requests.push(request);
        return {
          request,
          status: 200,
          headers: createHttpHeaders({ "content-type": "text/event-stream; charset=utf-8" }),
          readableStreamBody: body,
        };
      });
      const controller = new AbortController();
      const events: KnowledgeBaseRetrievalStreamEvent[] = [];
      for await (const event of await client.retrieveStream(
        { intents: [{ type: "semantic", search: "status" }] },
        {
          querySourceAuthorization: "search",
          queryWorkIQSourceAuthorization: "workiq",
          abortSignal: controller.signal,
        },
      )) {
        if (event.event === terminalEvent) assert.isTrue(body.destroyed);
        events.push(event);
      }
      assert.deepEqual(
        events.map((event) => event.event),
        ["activity.completed", terminalEvent],
      );
      const completed = events[0];
      if (completed.event === "activity.completed") {
        assert.deepEqual(completed.data.startedAt, new Date("2026-11-01T00:00:00Z"));
        assert.equal(completed.data.elapsedMs, 1000);
      }
      assert.equal(requests[0].abortSignal, controller.signal);
      assert.equal(requests[0].headers.get("accept"), "text/event-stream");
      assert.equal(requests[0].headers.get("x-ms-query-source-authorization"), "search");
      assert.equal(requests[0].headers.get("x-ms-query-work-iq-source-authorization"), "workiq");
      assert.include(requests[0].url, "api-version=2026-11-01-preview");
    },
  );

  it("reports malformed protocol event data and closes the stream", async () => {
    const body = Readable.from([Buffer.from("event: retrieval.started\ndata: not-json\n\n")]);
    const client = createProtocolClient(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "text/event-stream" }),
      readableStreamBody: body,
    }));
    await expect(async () => {
      for await (const event of await client.retrieveStream({
        intents: [{ type: "semantic", search: "status" }],
      })) {
        assert.fail(`Unexpected event: ${event.event}`);
      }
    }).rejects.toThrow('Unable to deserialize event "retrieval.started".');
    assert.isTrue(body.destroyed);
  });

  it("closes protocol streaming when iteration ends early", async () => {
    const body = Readable.from([
      Buffer.from(
        'event: retrieval.started\ndata: {"requestId":"first","reasoningEffort":{"kind":"auto"}}\n\n',
      ),
    ]);
    const client = createProtocolClient(async (request) => ({
      request,
      status: 200,
      headers: createHttpHeaders({ "content-type": "text/event-stream" }),
      readableStreamBody: body,
    }));
    for await (const event of await client.retrieveStream({
      intents: [{ type: "semantic", search: "status" }],
    })) {
      assert.equal(event.event, "retrieval.started");
      break;
    }
    assert.isTrue(body.destroyed);
  });

  it.each(["", "   ", "{ invalid"])(
    "preserves HTTP errors for malformed JSON body %j",
    async (text) => {
      for (const factory of [createClient, createProtocolClient]) {
        const client = factory(async (request) => ({
          request,
          status: 404,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          readableStreamBody: Readable.from([Buffer.from(text)]),
        }));
        await expect(
          client.retrieveStream({
            intents: [{ type: "semantic", search: "status" }],
          }),
        ).rejects.toMatchObject({ statusCode: 404, response: { status: 404 }, name: "RestError" });
      }
    },
  );

  it("streams typed events through the public HTTP client", async () => {
    const requests: PipelineRequest[] = [];
    const payload = [
      `event: retrieval.started\ndata: ${JSON.stringify({
        requestId: "request-1",
        knowledgeBaseName: "base",
        outputMode: "extractiveData",
        reasoningEffort: { kind: "auto" },
      })}\n\n`,
      `event: response.completed\ndata: ${JSON.stringify({
        statusCode: 206,
        response: { response: [] },
      })}\n\n`,
    ];
    const client = createClient(async (request) => {
      requests.push(request);
      return {
        request,
        status: 200,
        headers: createHttpHeaders({ "content-type": "text/event-stream" }),
        readableStreamBody: Readable.from([Buffer.from(payload.join(""))]),
      };
    });

    const events: KnowledgeBaseRetrievalStreamEvent[] = [];
    for await (const event of await client.retrieveStream(
      { intents: [{ type: "semantic", search: "status" }] },
      { queryWorkIQSourceAuthorization: "assertion" },
    )) {
      events.push(event);
    }

    assert.deepEqual(
      events.map((event) => event.event),
      ["retrieval.started", "response.completed"],
    );
    assert.include(requests[0].url, "api-version=2026-11-01-preview");
    assert.equal(requests[0].headers.get("accept"), "text/event-stream");
    assert.equal(requests[0].headers.get("x-ms-query-work-iq-source-authorization"), "assertion");
  });

  it("rejects JSON preflight errors before returning an event iterator", async () => {
    const client = createClient(async (request) => ({
      request,
      status: 404,
      headers: request.headers,
      readableStreamBody: Readable.from([
        Buffer.from(
          JSON.stringify({ error: { code: "NotFound", message: "Knowledge base not found" } }),
        ),
      ]),
    }));

    await expect(
      client.retrieveStream({ intents: [{ type: "semantic", search: "status" }] }),
    ).rejects.toMatchObject({
      statusCode: 404,
      code: "NotFound",
      message: "Knowledge base not found",
    });
  });

  it("preserves streamed errors from the raw protocol client", async () => {
    const client = new ProtocolKnowledgeBaseRetrievalClient(
      "https://example.search.windows.net",
      new AzureKeyCredential("key"),
      "base",
      {
        additionalPolicies: [
          {
            position: "perCall",
            policy: {
              name: "mock-response",
              async sendRequest(request): Promise<PipelineResponse> {
                return {
                  request,
                  status: 404,
                  headers: request.headers,
                  readableStreamBody: Readable.from([
                    Buffer.from(
                      JSON.stringify({
                        error: { code: "NotFound", message: "Knowledge base not found" },
                      }),
                    ),
                  ]),
                };
              },
            },
          },
        ],
      },
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
