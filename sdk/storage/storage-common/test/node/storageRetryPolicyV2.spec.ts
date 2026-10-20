// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { ReadableStream } from "node:stream/web";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders, createPipelineRequest } from "@azure/core-rest-pipeline";
import { storageRetryPolicy } from "../../src/policies/StorageRetryPolicyV2.js";

describe("storageRetryPolicy", () => {
  const request = createPipelineRequest({
    url: "https://myaccount.blob.core.windows.net/container/blob",
  });
  const retryOptions = { retryDelayInMs: 1, maxRetryDelayInMs: 1 };

  it("drains the streamed body of a response it retries, not the one it returns", async () => {
    const droppedBody = Readable.from([Buffer.from("<Error><Code>ServerBusy</Code></Error>")]);
    const returnedBody = Readable.from([Buffer.from("content")]);
    const success: PipelineResponse = {
      request,
      status: 200,
      headers: createHttpHeaders(),
      readableStreamBody: returnedBody,
    };
    const responses: PipelineResponse[] = [
      { request, status: 503, headers: createHttpHeaders(), readableStreamBody: droppedBody },
      success,
    ];

    const response = await storageRetryPolicy(retryOptions).sendRequest(request, async () =>
      responses.shift()!,
    );

    assert.strictEqual(response, success);
    assert.isNull(returnedBody.readableFlowing);
    assert.isTrue(droppedBody.readableFlowing);
    await finished(droppedBody);
  });

  it("cancels the web stream body of a response it retries", async () => {
    let cancelled = false;
    const droppedBody = new ReadableStream<Uint8Array>({
      cancel() {
        cancelled = true;
      },
    });
    const responses: PipelineResponse[] = [
      { request, status: 500, headers: createHttpHeaders(), browserStreamBody: droppedBody },
      { request, status: 200, headers: createHttpHeaders() },
    ];

    const response = await storageRetryPolicy(retryOptions).sendRequest(request, async () =>
      responses.shift()!,
    );

    assert.equal(response.status, 200);
    assert.isTrue(cancelled);
  });
});
