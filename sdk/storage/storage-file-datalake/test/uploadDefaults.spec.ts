// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert } from "vitest";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../src/index.js";
import { AnonymousCredential, DataLakeFileClient } from "../src/index.js";

const FILE_URL = "https://account.dfs.core.windows.net/filesystem/file";
const MB = 1024 * 1024;
const EIGHT_MB = 8 * MB;

/** The status the service answers each upload step with. */
const STATUS_BY_STEP: Record<string, number> = { create: 201, append: 202, flush: 200 };

/** What the transport saw for one request, copied when it was sent. */
interface SentRequest {
  method: string;
  step: string;
  position: number | undefined;
  contentLength: number;
}

/** A client whose transport answers create, append and flush with success instead of calling the service. */
function createClient(): { client: DataLakeFileClient; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      const query = new URL(request.url).searchParams;
      const step = query.has("resource") ? "create" : (query.get("action") ?? "");
      const position = query.get("position");
      sent.push({
        method: request.method,
        step,
        position: position === null ? undefined : Number(position),
        // Browsers drop the header and set it from the body.
        contentLength: Number(
          request.headers.get("content-length") ??
            (request.body ? new Blob([request.body]).size : 0),
        ),
      });
      return {
        request,
        status: STATUS_BY_STEP[step],
        headers: toHttpHeadersLike(
          createHttpHeaders({
            etag: '"0x8DE00000000000"',
            "last-modified": "Mon, 05 Oct 2026 00:00:00 GMT",
            date: "Mon, 05 Oct 2026 00:00:00 GMT",
            "x-ms-request-id": "00000000-0000-0000-0000-000000000000",
            "x-ms-version": "2026-06-06",
            "x-ms-request-server-encrypted": "true",
          }),
        ),
        bodyAsText: "",
      };
    },
  };
  const client = new DataLakeFileClient(FILE_URL, new AnonymousCredential(), {
    httpClient,
    retryOptions: { maxTries: 1 },
  });
  return { client, sent };
}

const CREATE: SentRequest = {
  method: "PUT",
  step: "create",
  position: undefined,
  contentLength: 0,
};

function append(position: number, contentLength: number): SentRequest {
  return { method: "PATCH", step: "append", position, contentLength };
}

function flush(position: number): SentRequest {
  return { method: "PATCH", step: "flush", position, contentLength: 0 };
}

describe("DataLakeFileClient.upload default single-upload threshold", () => {
  it("uploads 8MB in one append", async () => {
    const { client, sent } = createClient();

    await client.upload(new Uint8Array(EIGHT_MB));

    assert.deepEqual(sent, [CREATE, append(0, EIGHT_MB), flush(EIGHT_MB)]);
  });

  it("appends 8MB + 1 byte as an 8MB chunk and a 1-byte chunk", async () => {
    const { client, sent } = createClient();

    await client.upload(new Uint8Array(EIGHT_MB + 1));

    // The chunks are appended concurrently, so they can arrive in either order.
    const appends = sent.slice(1, -1).sort((a, b) => (a.position ?? 0) - (b.position ?? 0));
    assert.deepEqual(
      [sent[0], ...appends, sent[sent.length - 1]],
      [CREATE, append(0, EIGHT_MB), append(EIGHT_MB, 1), flush(EIGHT_MB + 1)],
    );
  });

  it("uploads 8MB + 1 byte in one append when singleUploadThreshold is 100MB", async () => {
    const { client, sent } = createClient();

    await client.upload(new Uint8Array(EIGHT_MB + 1), { singleUploadThreshold: 100 * MB });

    assert.deepEqual(sent, [CREATE, append(0, EIGHT_MB + 1), flush(EIGHT_MB + 1)]);
  });

  it("still uploads 6MB in one append when only chunkSize is set", async () => {
    const { client, sent } = createClient();

    await client.upload(new Uint8Array(6 * MB), { chunkSize: 2 * MB });

    assert.deepEqual(sent, [CREATE, append(0, 6 * MB), flush(6 * MB)]);
  });
});
