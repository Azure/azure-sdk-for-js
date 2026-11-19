// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { assert, describe, it } from "vitest";
import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, isRestError, RestError } from "@azure/core-rest-pipeline";
import {
  AnonymousCredential,
  BlobBatchClient,
  BlobClient,
  BlockBlobClient,
  ContainerClient,
  newPipeline,
} from "../../src/index.js";

const ACCOUNT = "https://myaccount.blob.core.windows.net";
const CONTAINER_URL = `${ACCOUNT}/container`;
const BLOB_URL = `${CONTAINER_URL}/blob`;
const NOT_FOUND_MESSAGE =
  "The specified blob does not exist.\nRequestId:4f6c8f4a-001e-0035-3a6b-1f3b0d000000\nTime:2026-11-17T00:00:00.0000000Z";

function errorXml(code: string, message: string, extra: string = ""): string {
  return `<?xml version="1.0" encoding="utf-8"?><Error><Code>${code}</Code><Message>${message}</Message>${extra}</Error>`;
}

/** What the fake service answers to one attempt. */
interface Answer {
  status: number;
  headers?: Record<string, string>;
  body?: string;
  /** The connection drops while the body is read. */
  cut?: boolean;
}

/** The statuses a request the fake service received asked to stream at that moment. */
interface Sent {
  streamedStatuses?: Set<number>;
}

/** The assert message of the precondition that an error body reaches the policies as a stream. */
const STREAMED = "the error body is streamed";

const NOT_FOUND: Answer = {
  status: 404,
  headers: { "x-ms-error-code": "BlobNotFound" },
  body: errorXml("BlobNotFound", NOT_FOUND_MESSAGE),
};

const CONTAINER_NOT_FOUND: Answer = {
  status: 404,
  headers: { "x-ms-error-code": "ContainerNotFound" },
  body: errorXml("ContainerNotFound", "The specified container does not exist."),
};

/**
 * Stands in for the service after signing. Each attempt gets the next answer (the last one repeats),
 * and a body is handed over the way the HTTP client does: as a stream when the request asks to
 * stream that status, otherwise as text. A cut body fails as it does there: the stream errors, or
 * reading it as text throws the client's `PARSE_ERROR`.
 */
function answerWith(client: object, ...answers: Answer[]): Sent[] {
  const sent: Sent[] = [];
  const pipeline: Pipeline = (client as any).storageClientContext.client.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        const streamedStatuses = request.streamResponseStatusCodes;
        sent.push({ streamedStatuses: streamedStatuses && new Set(streamedStatuses) });
        const answer = answers[Math.min(sent.length, answers.length) - 1];
        const response: PipelineResponse = {
          request,
          status: answer.status,
          headers: createHttpHeaders({ "content-type": "application/xml", ...answer.headers }),
        };
        if (answer.body !== undefined && request.method !== "HEAD") {
          if (
            streamedStatuses?.has(Number.POSITIVE_INFINITY) ||
            streamedStatuses?.has(answer.status)
          ) {
            response.readableStreamBody = answer.cut
              ? new Readable({
                  read() {
                    this.destroy(new Error("aborted"));
                  },
                })
              : Readable.from([Buffer.from(answer.body)]);
          } else if (answer.cut) {
            throw new RestError("Error reading response as text: aborted", {
              code: RestError.PARSE_ERROR,
            });
          } else {
            response.bodyAsText = answer.body;
          }
        }
        return response;
      },
    },
    { afterPhase: "Sign" },
  );
  return sent;
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

async function readText(stream: NodeJS.ReadableStream): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks).toString();
}

describe("Service errors", () => {
  it("carry the service's message for an XML error", async () => {
    const client = new BlobClient(BLOB_URL);
    answerWith(client, NOT_FOUND);

    const error = await getError(client.setMetadata({ key: "value" }));

    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.equal(error.code, "BlobNotFound");
    assert.equal(error.statusCode, 404);
    assert.include(error.details, {
      code: "BlobNotFound",
      message: NOT_FOUND_MESSAGE,
      errorCode: "BlobNotFound",
    });
  });

  it("carry the service's message, details and body for a download", async () => {
    const client = new BlobClient(BLOB_URL);
    const sent = answerWith(client, NOT_FOUND);

    const error = await getError(client.download());

    assert.isTrue(sent[0].streamedStatuses?.has(Number.POSITIVE_INFINITY), STREAMED);
    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.equal(error.code, "BlobNotFound");
    assert.include(error.details, {
      code: "BlobNotFound",
      message: NOT_FOUND_MESSAGE,
      errorCode: "BlobNotFound",
    });
    assert.equal(error.response.bodyAsText, (NOT_FOUND as { body: string }).body);
  });

  it("carry the service's message for a query", async () => {
    const client = new BlockBlobClient(BLOB_URL);
    const sent = answerWith(client, NOT_FOUND);

    const error = await getError(client.query("select * from BlobStorage"));

    assert.isTrue(sent[0].streamedStatuses?.has(Number.POSITIVE_INFINITY), STREAMED);
    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.include(error.details, { code: "BlobNotFound", message: NOT_FOUND_MESSAGE });
  });

  it("carry the service's message for a failed batch", async () => {
    const client = new BlobBatchClient(CONTAINER_URL);
    const sent = answerWith(client, CONTAINER_NOT_FOUND);

    const error = await getError(client.deleteBlobs([BLOB_URL], new AnonymousCredential()));

    assert.isTrue(sent[0].streamedStatuses?.has(Number.POSITIVE_INFINITY), STREAMED);
    assert.equal(error.message, "The specified container does not exist.");
    assert.include(error.details, {
      code: "ContainerNotFound",
      message: "The specified container does not exist.",
      errorCode: "ContainerNotFound",
    });
  });

  it("carry the service's message for a blob listing", async () => {
    const client = new ContainerClient(CONTAINER_URL);
    const sent = answerWith(client, CONTAINER_NOT_FOUND);

    const error = await getError(client.listBlobsFlat().byPage().next());

    assert.isTrue(sent[0].streamedStatuses?.has(Number.POSITIVE_INFINITY), STREAMED);
    assert.equal(error.message, "The specified container does not exist.");
    assert.include(error.details, {
      code: "ContainerNotFound",
      message: "The specified container does not exist.",
      errorCode: "ContainerNotFound",
    });
  });

  it("keep the status in the message when the response has no body", async () => {
    const client = new BlobClient(BLOB_URL);
    answerWith(client, NOT_FOUND);

    const error = await getError(client.getProperties());

    assert.equal(error.message, "Unexpected status code: 404");
    assert.equal(error.code, "BlobNotFound");
  });

  it("explain a service version the account doesn't support, and keep the other fields", async () => {
    const client = new BlobClient(BLOB_URL);
    answerWith(client, {
      status: 400,
      headers: { "x-ms-error-code": "InvalidHeaderValue" },
      body: errorXml(
        "InvalidHeaderValue",
        "The value for one of the HTTP headers is not in the correct format.",
        "<HeaderName>x-ms-version</HeaderName><HeaderValue>3025-01-01</HeaderValue>",
      ),
    });

    const error = await getError(client.download());

    assert.match(
      error.message,
      /^The provided service version is not enabled on this storage account\./,
    );
    assert.match(
      error.details.message,
      /^The provided service version is not enabled on this storage account\./,
    );
    assert.equal(error.code, "InvalidHeaderValue");
    assert.include(error.details, { HeaderName: "x-ms-version", HeaderValue: "3025-01-01" });
    assert.deepEqual(error.details.additionalProperties, {
      HeaderName: "x-ms-version",
      HeaderValue: "3025-01-01",
    });
  });

  it("leave the error alone when the body isn't a storage error", async () => {
    const page = "<html><body><h2>Bad Request - Invalid URL</h2></body></html>";
    const client = new BlobClient(BLOB_URL);
    answerWith(client, { status: 400, headers: { "content-type": "text/html" }, body: page });

    const error = await getError(client.download());

    assert.equal(error.message, "Unexpected status code: 400");
    assert.equal(error.statusCode, 400);
    assert.isUndefined(error.code);
  });

  it("retry a 503 whose body is cut, and read the error of the last attempt", async () => {
    const client = new BlobClient(
      BLOB_URL,
      newPipeline(new AnonymousCredential(), {
        retryOptions: { maxTries: 2, retryDelayInMs: 1, maxRetryDelayInMs: 1 },
      }),
    );
    const sent = answerWith(
      client,
      {
        status: 503,
        headers: { "x-ms-error-code": "ServerBusy" },
        body: errorXml("ServerBusy", "The server is busy."),
        cut: true,
      },
      NOT_FOUND,
    );

    const error = await getError(client.download());

    assert.equal(error.message, NOT_FOUND_MESSAGE);
    assert.lengthOf(sent, 2);
  });

  it("keep the status of a 503 whose body is cut on the last attempt", async () => {
    const client = new BlobClient(
      BLOB_URL,
      newPipeline(new AnonymousCredential(), { retryOptions: { maxTries: 1 } }),
    );
    answerWith(client, {
      status: 503,
      headers: { "x-ms-error-code": "ServerBusy" },
      body: errorXml("ServerBusy", "The server is busy."),
      cut: true,
    });

    const error = await getError(client.download());

    assert.equal(error.statusCode, 503);
    assert.equal(error.code, "ServerBusy");
  });

  it("leave a successful download streamed", async () => {
    const client = new BlobClient(BLOB_URL);
    answerWith(client, {
      status: 200,
      headers: {
        "content-type": "application/octet-stream",
        "content-length": "5",
        etag: '"0x8DE0000000000000"',
        "last-modified": "Tue, 17 Nov 2026 00:00:00 GMT",
        "x-ms-blob-type": "BlockBlob",
      },
      body: "hello",
    });

    const response = await client.download();

    assert.equal(await readText(response.readableStreamBody!), "hello");
  });
});
