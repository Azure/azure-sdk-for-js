// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { PassThrough, Readable } from "node:stream";
import { AbortError } from "@azure/abort-controller";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../../src/index.js";
import { AnonymousCredential, BlockBlobClient } from "../../src/index.js";

const MB = 1024 * 1024;

function compOf(request: WebResource): string | undefined {
  return new URL(request.url).searchParams.get("comp") ?? undefined;
}

/**
 * A client whose transport answers every request with an empty 201 instead of calling the service.
 * Requests that `hold` picks stay open until they are aborted; `aborted` counts those.
 */
function createClient(hold?: (request: WebResource) => boolean): {
  client: BlockBlobClient;
  sent: Array<string | undefined>;
  aborted: () => number;
} {
  const sent: Array<string | undefined> = [];
  let aborted = 0;
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      sent.push(compOf(request));
      if (hold?.(request)) {
        await new Promise<void>((_resolve, reject) => {
          request.abortSignal?.addEventListener("abort", () => {
            aborted++;
            reject(new AbortError("The operation was aborted."));
          });
        });
      }
      return {
        request,
        status: 201,
        headers: toHttpHeadersLike(
          createHttpHeaders({
            etag: '"0x8DE00000000000"',
            "last-modified": "Mon, 05 Oct 2026 00:00:00 GMT",
            "x-ms-request-id": "00000000-0000-0000-0000-000000000000",
            "x-ms-request-server-encrypted": "true",
          }),
        ),
        bodyAsText: "",
      };
    },
  };
  const client = new BlockBlobClient(
    "https://account.blob.core.windows.net/container/blob",
    new AnonymousCredential(),
    { httpClient, retryOptions: { maxTries: 1 } },
  );
  return { client, sent, aborted: () => aborted };
}

describe("BlockBlobClient.uploadStream", () => {
  it("throws a RangeError without sending anything when an object is passed as bufferSize", async () => {
    const { client, sent } = createClient();

    await expect(
      client.uploadStream(Readable.from([Buffer.alloc(1024, 1)]), {} as number),
    ).rejects.toThrow(RangeError);

    assert.isEmpty(sent);
  });

  it("rejects with an AbortError when aborted while the source stream is paused", async () => {
    const { client, sent } = createClient();
    const source = new PassThrough();
    const abortController = new AbortController();

    const upload = client.uploadStream(source, 4 * MB, 2, { abortSignal: abortController.signal });
    source.pause();
    await vi.waitFor(() => assert.isAbove(source.listenerCount("data"), 0));
    abortController.abort();

    await expect(upload).rejects.toMatchObject({ name: "AbortError" });
    assert.isEmpty(sent);
  });

  it("cancels the blocks in flight and doesn't commit after an abort", async () => {
    const { client, sent, aborted } = createClient((request) => compOf(request) === "block");
    const abortController = new AbortController();

    // Three 1MB blocks with two buffers: two blocks are in flight and the third waits for a buffer.
    const upload = client.uploadStream(Readable.from([Buffer.alloc(3 * MB, 1)]), MB, 2, {
      abortSignal: abortController.signal,
    });
    await vi.waitFor(() => assert.lengthOf(sent, 2));
    abortController.abort();

    await expect(upload).rejects.toMatchObject({ name: "AbortError" });
    assert.equal(aborted(), 2, "the blocks in flight should be cancelled");
    assert.deepEqual(sent, ["block", "block"]);
  });
});
