// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { PassThrough, Readable } from "node:stream";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../../src/index.js";
import { AnonymousCredential, DataLakeFileClient } from "../../src/index.js";

/** The status the service answers each upload step with. */
const STATUS_BY_STEP: Record<string, number> = { create: 201, append: 202, flush: 200 };

function stepOf(request: WebResource): string {
  const query = new URL(request.url).searchParams;
  return query.has("resource") ? "create" : (query.get("action") ?? "");
}

/** A client whose transport answers create, append and flush with success instead of calling the service. */
function createClient(): { client: DataLakeFileClient; sent: string[] } {
  const sent: string[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      const step = stepOf(request);
      sent.push(step);
      return {
        request,
        status: STATUS_BY_STEP[step],
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
  const client = new DataLakeFileClient(
    "https://account.dfs.core.windows.net/filesystem/file",
    new AnonymousCredential(),
    { httpClient, retryOptions: { maxTries: 1 } },
  );
  return { client, sent };
}

describe("DataLakeFileClient.uploadStream", () => {
  it("checks chunkSize and maxConcurrency before it creates the file and accepts a numeric chunkSize string", async () => {
    const { client, sent } = createClient();

    for (const chunkSize of [{} as number, 1.5]) {
      await expect(
        client.uploadStream(Readable.from([Buffer.alloc(1024, 1)]), { chunkSize }),
      ).rejects.toThrow(/chunkSize/);
    }
    await expect(
      client.uploadStream(Readable.from([Buffer.alloc(1024, 1)]), {
        maxConcurrency: {} as number,
      }),
    ).rejects.toThrow(/maxConcurrency/);
    assert.isEmpty(sent);

    // A numeric string worked before and still does.
    await client.uploadStream(Readable.from([Buffer.alloc(1024, 1)]), {
      chunkSize: "512" as unknown as number,
    });
    assert.deepEqual(sent, ["create", "append", "append", "flush"]);
  });

  it("rejects with an AbortError when aborted while the source stream is paused", async () => {
    const { client, sent } = createClient();
    const source = new PassThrough();
    const abortController = new AbortController();

    const upload = client.uploadStream(source, { abortSignal: abortController.signal });
    source.pause();
    await vi.waitFor(() => assert.isAbove(source.listenerCount("data"), 0));
    abortController.abort();

    await expect(upload).rejects.toMatchObject({ name: "AbortError" });
    assert.deepEqual(sent, ["create"]);
  });
});
