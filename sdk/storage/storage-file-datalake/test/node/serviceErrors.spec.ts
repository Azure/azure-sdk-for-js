// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Readable } from "node:stream";
import { assert, describe, it } from "vitest";
import type { Pipeline, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, isRestError } from "@azure/core-rest-pipeline";
import { DataLakeFileClient, DataLakeFileSystemClient } from "../../src/index.js";

const FILE_SYSTEM_URL = "https://myaccount.dfs.core.windows.net/filesystem";
const REQUEST_DETAILS =
  "\nRequestId:4f6c8f4a-001f-0035-3a6b-1f3b0d000000\nTime:2026-11-17T00:00:00.0000000Z";

/**
 * Stands in for the service after signing: answers every request with the given error. It hands the
 * body over the way the HTTP client does: as a stream when the request asks to stream that status,
 * otherwise as text.
 */
function answerWith(
  client: object,
  status: number,
  errorCode: string,
  contentType: string,
  body: string,
): void {
  const pipeline: Pipeline = (client as any).storageClientContext.pipeline;
  pipeline.addPolicy(
    {
      name: "fakeServicePolicy",
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        const response: PipelineResponse = {
          request,
          status,
          headers: createHttpHeaders({ "content-type": contentType, "x-ms-error-code": errorCode }),
        };
        if (
          request.streamResponseStatusCodes?.has(Number.POSITIVE_INFINITY) ||
          request.streamResponseStatusCodes?.has(status)
        ) {
          response.readableStreamBody = Readable.from([Buffer.from(body)]);
        } else {
          response.bodyAsText = body;
        }
        return response;
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
  it("carry the service's message for an XML error from the blob endpoint", async () => {
    const message = `The specified blob does not exist.${REQUEST_DETAILS}`;
    const client = new DataLakeFileSystemClient(FILE_SYSTEM_URL);
    answerWith(
      client,
      404,
      "BlobNotFound",
      "application/xml",
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>${message}</Message></Error>`,
    );

    const error = await getError(client.undeletePath("directory/file", "1"));

    assert.equal(error.message, message);
    assert.equal(error.code, "BlobNotFound");
    assert.equal(error.statusCode, 404);
    assert.equal(error.details.errorCode, "BlobNotFound");
  });

  it("carry the service's message and details for a read", async () => {
    const message = `The specified blob does not exist.${REQUEST_DETAILS}`;
    const client = new DataLakeFileClient(`${FILE_SYSTEM_URL}/directory/file`);
    answerWith(
      client,
      404,
      "BlobNotFound",
      "application/xml",
      `<?xml version="1.0" encoding="utf-8"?><Error><Code>BlobNotFound</Code><Message>${message}</Message></Error>`,
    );

    const error = await getError(client.read());

    assert.equal(error.message, message);
    assert.equal(error.code, "BlobNotFound");
    assert.include(error.details, { code: "BlobNotFound", message, errorCode: "BlobNotFound" });
  });

  it("keep the service's message for a JSON error", async () => {
    const message = `The specified path does not exist.${REQUEST_DETAILS}`;
    const client = new DataLakeFileClient(`${FILE_SYSTEM_URL}/directory/file`);
    answerWith(
      client,
      404,
      "PathNotFound",
      "application/json",
      JSON.stringify({ error: { code: "PathNotFound", message } }),
    );

    const error = await getError(client.create());

    assert.equal(error.message, message);
    assert.equal(error.code, "PathNotFound");
    assert.deepEqual(error.details.error, { code: "PathNotFound", message });
  });
});
