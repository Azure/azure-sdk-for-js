// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { getEventListeners } from "node:events";
import { PassThrough, Readable } from "node:stream";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../../src/index.js";
import { AnonymousCredential, ShareFileClient } from "../../src/index.js";

/** A client whose transport answers every request with an empty 201 instead of calling the service. */
function createClient(): { client: ShareFileClient; sent: string[] } {
  const sent: string[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      sent.push(new URL(request.url).searchParams.get("comp") ?? "create");
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
  const client = new ShareFileClient(
    "https://account.file.core.windows.net/share/file",
    new AnonymousCredential(),
    { httpClient, retryOptions: { maxTries: 1 } },
  );
  return { client, sent };
}

describe("ShareFileClient.uploadStream", () => {
  it("throws a RangeError before it creates the file when bufferSize or maxBuffers isn't valid, and still takes a fractional bufferSize", async () => {
    const { client, sent } = createClient();

    for (const [bufferSize, maxBuffers] of [
      [{} as number, 2],
      ["1024" as unknown as number, 2],
      [NaN, 2],
      [0.5, 2],
      [1024, 0],
      [1024, {} as number],
    ]) {
      await expect(
        client.uploadStream(Readable.from([Buffer.alloc(1024, 1)]), 1024, bufferSize, maxBuffers),
      ).rejects.toThrow(RangeError);
    }
    assert.isEmpty(sent);

    // A fractional bufferSize worked before (rounded down) and still does.
    await client.uploadStream(Readable.from([Buffer.alloc(2048, 1)]), 2048, 1024.5, 2);
    assert.deepEqual(sent, ["create", "range", "range"]);
  });

  it("rejects with an AbortError when aborted while the source stream is paused", async () => {
    const { client, sent } = createClient();
    const source = new PassThrough();
    const abortController = new AbortController();

    const upload = client.uploadStream(source, 1024, 1024, 2, {
      abortSignal: abortController.signal,
    });
    source.pause();
    await vi.waitFor(() => assert.isAbove(source.listenerCount("data"), 0));
    abortController.abort();

    await expect(upload).rejects.toMatchObject({ name: "AbortError" });
    assert.deepEqual(sent, ["create"]);
    assert.lengthOf(getEventListeners(abortController.signal, "abort"), 0);
  });
});
