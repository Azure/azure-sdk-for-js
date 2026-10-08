// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../src/index.js";
import { AnonymousCredential, BlockBlobClient } from "../src/index.js";

const BLOB_URL = "https://account.blob.core.windows.net/container/blob";
const MB = 1024 * 1024;
const FOUR_MB = 4 * MB;

/** What the transport saw for one request, copied when it was sent. */
interface SentRequest {
  method: string;
  comp: string | undefined;
  blobType: string | undefined;
  contentLength: number;
}

/** A client whose transport answers every request with an empty 201 instead of calling the service. */
function createClient(): { client: BlockBlobClient; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      sent.push({
        method: request.method,
        comp: new URL(request.url).searchParams.get("comp") ?? undefined,
        blobType: request.headers.get("x-ms-blob-type"),
        // Browsers drop the header and set it from the body.
        contentLength: Number(
          request.headers.get("content-length") ?? new Blob([request.body]).size,
        ),
      });
      return {
        request,
        status: 201,
        headers: toHttpHeadersLike(
          createHttpHeaders({
            etag: '"0x8DE00000000000"',
            "last-modified": "Mon, 05 Oct 2026 00:00:00 GMT",
            date: "Mon, 05 Oct 2026 00:00:00 GMT",
            "x-ms-request-id": "00000000-0000-0000-0000-000000000000",
            "x-ms-version": "2026-12-06",
            "x-ms-request-server-encrypted": "true",
          }),
        ),
        bodyAsText: "",
      };
    },
  };
  const client = new BlockBlobClient(BLOB_URL, new AnonymousCredential(), {
    httpClient,
    retryOptions: { maxTries: 1 },
  });
  return { client, sent };
}

describe("BlockBlobClient.uploadData default single-shot threshold", () => {
  it("uploads 4MB in one Put Blob", async () => {
    const { client, sent } = createClient();

    await client.uploadData(new Uint8Array(FOUR_MB));

    assert.deepEqual(sent, [
      { method: "PUT", comp: undefined, blobType: "BlockBlob", contentLength: FOUR_MB },
    ]);
  });

  it("stages 4MB + 1 byte as a 4MB block and a 1-byte block", async () => {
    const { client, sent } = createClient();

    await client.uploadData(new Uint8Array(FOUR_MB + 1));

    assert.deepEqual(
      sent.map((request) => [request.method, request.comp]),
      [
        ["PUT", "block"],
        ["PUT", "block"],
        ["PUT", "blocklist"],
      ],
    );
    // The blocks are staged concurrently, so they can arrive in either order.
    const blockLengths = sent.slice(0, 2).map((request) => request.contentLength);
    assert.deepEqual(
      blockLengths.sort((a, b) => a - b),
      [1, FOUR_MB],
    );
  });

  it("uploads 4MB + 1 byte in one Put Blob when maxSingleShotSize is 256MB", async () => {
    const { client, sent } = createClient();

    await client.uploadData(new Uint8Array(FOUR_MB + 1), { maxSingleShotSize: 256 * MB });

    assert.deepEqual(sent, [
      { method: "PUT", comp: undefined, blobType: "BlockBlob", contentLength: FOUR_MB + 1 },
    ]);
  });

  it("still stages 4MB + 1 byte when only blockSize is set", async () => {
    const { client, sent } = createClient();

    await client.uploadData(new Uint8Array(FOUR_MB + 1), { blockSize: 8 * MB });

    assert.deepEqual(
      sent.map((request) => [request.method, request.comp]),
      [
        ["PUT", "block"],
        ["PUT", "blocklist"],
      ],
    );
    assert.strictEqual(sent[0].contentLength, FOUR_MB + 1);
  });

  it("treats concurrency 0 as the default when staging", async () => {
    const { client, sent } = createClient();

    await client.uploadData(new Uint8Array(FOUR_MB + 1), { concurrency: 0 });

    assert.deepEqual(
      sent.map((request) => request.comp),
      ["block", "block", "blocklist"],
    );
  });
});
