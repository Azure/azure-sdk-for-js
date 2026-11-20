// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, it } from "vitest";
import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, isRestError } from "@azure/core-rest-pipeline";
import { AnonymousCredential, BlobClient, newPipeline } from "../../src/index.js";

const BLOB_URL = "https://myaccount.blob.core.windows.net/container/blob";

function errorXml(code: string, message: string): string {
  return `<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code><Message>${message}</Message></Error>`;
}

/** What the fake service answers to one attempt. */
interface Answer {
  status: number;
  headers?: Record<string, string>;
  body: string;
  /** The connection drops while the body is read. */
  cut?: boolean;
}

/**
 * Stands in for the service after signing. Each attempt gets the next answer (the last one repeats),
 * with the body as a stream, the way the browser's HTTP client hands over the response of a download.
 * Returns the statuses each request asked to stream when it was sent.
 */
function answerWith(client: object, ...answers: Answer[]): Array<Set<number> | undefined> {
  const streamedStatuses: Array<Set<number> | undefined> = [];
  const pipeline: Pipeline = (client as any).storageClientContext.client.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        const statuses = request.streamResponseStatusCodes;
        streamedStatuses.push(statuses && new Set(statuses));
        const answer = answers[Math.min(streamedStatuses.length, answers.length) - 1];
        return {
          request,
          status: answer.status,
          headers: createHttpHeaders({ "content-type": "application/xml", ...answer.headers }),
          browserStreamBody: answer.cut
            ? new ReadableStream<Uint8Array>({
                pull: (controller) => controller.error(new TypeError("network error")),
              })
            : new Response(answer.body).body!,
        };
      },
    },
    { afterPhase: "Sign" },
  );
  return streamedStatuses;
}

async function getError(operation: Promise<unknown>): Promise<any> {
  try {
    await operation;
  } catch (error: unknown) {
    assert.isTrue(isRestError(error), String(error));
    return error;
  }
  assert.fail("The operation should have failed.");
}

describe("Service errors in the browser", () => {
  const notFound: Answer = {
    status: 404,
    headers: { "x-ms-error-code": "BlobNotFound" },
    body: errorXml("BlobNotFound", "The specified blob does not exist."),
  };
  const busyAndCut: Answer = {
    status: 503,
    headers: { "x-ms-error-code": "ServerBusy" },
    body: errorXml("ServerBusy", "The server is busy."),
    cut: true,
  };

  it("carry the service's message for a download", async () => {
    const client = new BlobClient(BLOB_URL);
    const streamedStatuses = answerWith(client, notFound);

    const error = await getError(client.download());

    assert.isTrue(streamedStatuses[0]?.has(Number.POSITIVE_INFINITY), "the error body is streamed");
    assert.equal(error.message, "The specified blob does not exist.");
    assert.equal(error.code, "BlobNotFound");
    assert.include(error.details, {
      code: "BlobNotFound",
      message: "The specified blob does not exist.",
    });
    assert.equal(error.response.bodyAsText, notFound.body);
    assert.isUndefined(error.response.browserStreamBody, "the read stream is dropped");
  });

  it("keep the status of a download whose error body isn't a storage error", async () => {
    const client = new BlobClient(BLOB_URL);
    answerWith(client, {
      status: 400,
      headers: { "content-type": "text/html" },
      body: "<html><body><h2>Bad Request - Invalid URL</h2></body></html>",
    });

    const error = await getError(client.download());

    assert.equal(error.statusCode, 400);
    assert.equal(error.message, "Unexpected status code: 400");
  });

  it("retry a 503 whose body is cut", async () => {
    const client = new BlobClient(
      BLOB_URL,
      newPipeline(new AnonymousCredential(), {
        retryOptions: { maxTries: 2, retryDelayInMs: 1, maxRetryDelayInMs: 1 },
      }),
    );
    answerWith(client, busyAndCut, notFound);

    const error = await getError(client.download());

    assert.equal(error.message, "The specified blob does not exist.");
  });

  it("keep the status when the last attempt's body is cut, leaving no rejected promise behind", async () => {
    const unhandled: unknown[] = [];
    const onRejection = (event: PromiseRejectionEvent): void => {
      unhandled.push(event.reason);
    };
    globalThis.addEventListener("unhandledrejection", onRejection);
    try {
      const client = new BlobClient(
        BLOB_URL,
        newPipeline(new AnonymousCredential(), { retryOptions: { maxTries: 1 } }),
      );
      answerWith(client, busyAndCut);

      const error = await getError(client.download());
      // The browser reports a rejection nobody handled in a later task.
      await new Promise((resolve) => setTimeout(resolve, 50));

      assert.equal(error.statusCode, 503);
      assert.equal(error.code, "ServerBusy");
      assert.deepEqual(unhandled, []);
    } finally {
      globalThis.removeEventListener("unhandledrejection", onRejection);
    }
  });
});
