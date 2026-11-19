// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { assert, describe, it } from "vitest";
import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, isRestError } from "@azure/core-rest-pipeline";
import { ShareFileClient } from "../../src/index.js";

const FILE_URL = "https://myaccount.file.core.windows.net/share/directory/file";
const NOT_FOUND_MESSAGE =
  "The specified resource does not exist.\nRequestId:4f6c8f4a-001a-0035-3a6b-1f3b0d000000\nTime:2026-11-17T00:00:00.0000000Z";

function errorXml(code: string, message: string): string {
  return `<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code><Message>${message}</Message></Error>`;
}

interface Answer {
  status: number;
  headers?: Record<string, string>;
  body?: string;
}

const NOT_FOUND: Answer = {
  status: 404,
  headers: { "x-ms-error-code": "ResourceNotFound" },
  body: errorXml("ResourceNotFound", NOT_FOUND_MESSAGE),
};

/**
 * Stands in for the service after signing. It hands the body over the way the HTTP client does: as a
 * stream when the request asks to stream that status, otherwise as text. Returns the requests sent.
 */
function answerWith(client: object, answer: Answer): PipelineRequest[] {
  const requests: PipelineRequest[] = [];
  const pipeline: Pipeline = (client as any).storageClientContext.client.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        requests.push(request);
        const response: PipelineResponse = {
          request,
          status: answer.status,
          headers: createHttpHeaders({ "content-type": "application/xml", ...answer.headers }),
        };
        if (answer.body !== undefined && request.method !== "HEAD") {
          const streamed =
            request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
            request.streamResponseStatusCodes?.has(answer.status);
          if (streamed) {
            response.readableStreamBody = Readable.from([Buffer.from(answer.body)]);
          } else {
            response.bodyAsText = answer.body;
          }
        }
        return response;
      },
    },
    { afterPhase: "Sign" },
  );
  return requests;
}

async function getError(operation: Promise<unknown>): Promise<any> {
  try {
    await operation;
  } catch (error: unknown) {
    assert.isTrue(isRestError(error));
    return error;
  }
  assert.fail("The operation should have failed.");
}

describe("Service errors", () => {
  it("carry the service's message for an XML error", async () => {
    const client = new ShareFileClient(FILE_URL);
    answerWith(client, NOT_FOUND);

    const error = await getError(client.setMetadata({ key: "value" }));

    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.equal(error.code, "ResourceNotFound");
    assert.equal(error.statusCode, 404);
    assert.include(error.details, {
      code: "ResourceNotFound",
      message: NOT_FOUND_MESSAGE,
      errorCode: "ResourceNotFound",
    });
  });

  it("carry the service's message and details for a download", async () => {
    const client = new ShareFileClient(FILE_URL);
    const requests = answerWith(client, NOT_FOUND);

    const error = await getError(client.download());

    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.include(error.details, {
      code: "ResourceNotFound",
      message: NOT_FOUND_MESSAGE,
      errorCode: "ResourceNotFound",
    });
    assert.equal(error.response.bodyAsText, NOT_FOUND.body);
    // The request still asks to stream every status once it's done.
    assert.isTrue(requests[0].streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY));
  });
});
