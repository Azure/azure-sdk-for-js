// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { AzureKeyCredential } from "../../../src/index.js";
import { KnowledgeBaseRetrievalClient as ProtocolKnowledgeBaseRetrievalClient } from "../../../src/knowledgeBaseRetrieval/knowledgeBaseRetrievalClient.js";
import { KnowledgeRetrievalClient } from "../../../src/knowledgeRetrievalClient.js";
import type { KnowledgeBaseRetrievalStreamEvent } from "../../../src/knowledgeBaseModels.js";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
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

describe("knowledge retrieval stream HTTP transport", () => {
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
        headers: request.headers,
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
    assert.include(requests[0].url, "api-version=2026-08-01-preview");
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
