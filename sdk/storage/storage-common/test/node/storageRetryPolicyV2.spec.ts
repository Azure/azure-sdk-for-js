// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import * as http from "node:http";
import type { AddressInfo } from "node:net";
import { Readable } from "node:stream";
import { finished } from "node:stream/promises";
import { ReadableStream } from "node:stream/web";
import type { PipelineResponse } from "@azure/core-rest-pipeline";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
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

  it("frees the connection of a response it retries for the next attempt", async () => {
    let connections = 0;
    let attempts = 0;
    const server = http.createServer((req, res) => {
      req.resume();
      attempts++;
      const busy = attempts === 1;
      const body = busy ? "<Error><Code>ServerBusy</Code></Error>" : "content";
      res.writeHead(busy ? 503 : 200, { "content-length": Buffer.byteLength(body) });
      res.end(body);
    });
    // A connection held by an unread body is only freed when the server closes it.
    server.keepAliveTimeout = 60_000;
    server.on("connection", () => connections++);
    await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", resolve));
    // With one socket, the retry can only start once the dropped response frees it.
    const agent = new http.Agent({ keepAlive: true, maxSockets: 1 });
    const transport = createDefaultHttpClient();
    const localRequest = createPipelineRequest({
      url: `http://127.0.0.1:${(server.address() as AddressInfo).port}/container/blob`,
      allowInsecureConnection: true,
      agent,
      // Downloads stream the body of every status, so the 503 arrives unread.
      streamResponseStatusCodes: new Set([Number.POSITIVE_INFINITY]),
    });

    const sending = storageRetryPolicy(retryOptions).sendRequest(localRequest, (r) =>
      transport.sendRequest(r),
    );
    sending.catch(() => undefined);
    let timer: ReturnType<typeof setTimeout> | undefined;
    try {
      const response = await Promise.race([
        sending,
        new Promise<never>((_resolve, reject) => {
          timer = setTimeout(
            () => reject(new Error("The retry never got the connection back.")),
            2000,
          );
        }),
      ]);
      assert.equal(response.status, 200);
      const chunks: Buffer[] = [];
      for await (const chunk of response.readableStreamBody!) {
        chunks.push(chunk as Buffer);
      }
      assert.equal(Buffer.concat(chunks).toString(), "content");
      assert.equal(attempts, 2);
      assert.equal(connections, 1, "the retry must reuse the connection");
    } finally {
      clearTimeout(timer);
      agent.destroy();
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    }
  });

  it("retries when the body of a response it retries fails while draining", async () => {
    const drainError = new Error("The connection was reset while the body was read.");
    const droppedBody = new Readable({
      read() {
        this.destroy(drainError);
      },
    });
    const responses: PipelineResponse[] = [
      { request, status: 503, headers: createHttpHeaders(), readableStreamBody: droppedBody },
      { request, status: 200, headers: createHttpHeaders() },
    ];

    const response = await storageRetryPolicy(retryOptions).sendRequest(request, async () =>
      responses.shift()!,
    );

    assert.equal(response.status, 200);
    assert.strictEqual(droppedBody.errored, drainError);
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
