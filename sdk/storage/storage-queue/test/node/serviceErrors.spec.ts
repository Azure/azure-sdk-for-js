// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, isRestError } from "@azure/core-rest-pipeline";
import { QueueClient } from "../../src/index.js";

const QUEUE_URL = "https://myaccount.queue.core.windows.net/queue";
const NOT_FOUND_MESSAGE =
  "The specified queue does not exist.\nRequestId:4f6c8f4a-0003-0035-3a6b-1f3b0d000000\nTime:2026-11-17T00:00:00.0000000Z";

function errorXml(code: string, message: string): string {
  return `<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code><Message>${message}</Message></Error>`;
}

interface Answer {
  status: number;
  body: string;
  errorCode: string;
}

/** Stands in for the service after signing: answers every request with the given error. */
function answerWith(client: QueueClient, answer: Answer): void {
  const pipeline: Pipeline = (client as any).storageClientContext.queuesClient.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        return {
          request,
          status: answer.status,
          headers: createHttpHeaders({
            "content-type": "application/xml",
            "x-ms-error-code": answer.errorCode,
          }),
          bodyAsText: answer.body,
        };
      },
    },
    { afterPhase: "Sign" },
  );
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
    const client = new QueueClient(QUEUE_URL);
    answerWith(client, {
      status: 404,
      errorCode: "QueueNotFound",
      body: errorXml("QueueNotFound", NOT_FOUND_MESSAGE),
    });

    const error = await getError(client.getProperties());

    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.equal(error.code, "QueueNotFound");
    assert.equal(error.statusCode, 404);
    assert.include(error.details, {
      code: "QueueNotFound",
      message: NOT_FOUND_MESSAGE,
      errorCode: "QueueNotFound",
    });
  });
});
