// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../src/index.js";
import { AnonymousCredential, DataLakeFileClient } from "../src/index.js";

const FILE_SYSTEM_URL = "https://account.dfs.core.windows.net/filesystem";
const FILE_URL = `${FILE_SYSTEM_URL}/file`;
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

/** An error the fake service answers a request with. */
interface Failure {
  status: number;
  code: string;
}

/** A failure that can hit one chunk of an upload, for example when a SAS expires mid-upload. */
const AUTHENTICATION_FAILED: Failure = { status: 403, code: "AuthenticationFailed" };

/** Sees each request before the fake service answers it; it can hold the request or return a failure. */
type Respond = (request: WebResource) => Promise<Failure | void> | Failure | void;

function stepOf(request: WebResource): string {
  const query = new URL(request.url).searchParams;
  return query.has("resource") ? "create" : (query.get("action") ?? "");
}

/** Returns `arrive(key)`, whose promise resolves once every key has arrived at least once. */
function createGate(...keys: string[]): (key: string) => Promise<void> {
  const waiting = new Set(keys);
  let open!: () => void;
  const opened = new Promise<void>((resolve) => {
    open = resolve;
  });
  return (key) => {
    waiting.delete(key);
    if (waiting.size === 0) {
      open();
    }
    return opened;
  };
}

/**
 * A client whose transport answers create, append and flush with success instead of calling the
 * service, unless `respond` returns a failure for the request.
 */
function createClient(
  respond?: Respond,
  url: string = FILE_URL,
): { client: DataLakeFileClient; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      const step = stepOf(request);
      const position = new URL(request.url).searchParams.get("position");
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
      const failure = await respond?.(request);
      return {
        request,
        status: failure ? failure.status : STATUS_BY_STEP[step],
        headers: toHttpHeadersLike(
          createHttpHeaders({
            etag: '"0x8DE00000000000"',
            "last-modified": "Mon, 05 Oct 2026 00:00:00 GMT",
            date: "Mon, 05 Oct 2026 00:00:00 GMT",
            "x-ms-request-id": "00000000-0000-0000-0000-000000000000",
            "x-ms-version": "2026-06-06",
            "x-ms-request-server-encrypted": "true",
            ...(failure ? { "x-ms-error-code": failure.code } : {}),
          }),
        ),
        bodyAsText: failure
          ? JSON.stringify({ error: { code: failure.code, message: "Fake failure" } })
          : "",
      };
    },
  };
  const client = new DataLakeFileClient(url, new AnonymousCredential(), {
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

describe("DataLakeFileClient.upload when it appends chunks", () => {
  it("rejects without flushing or appending more chunks when a chunk fails", async () => {
    let appends = 0;
    const { client, sent } = createClient((request) =>
      stepOf(request) === "append" && ++appends === 2 ? AUTHENTICATION_FAILED : undefined,
    );

    // Three 8MB chunks, appended one at a time so the third would only start after the failure.
    await expect(
      client.upload(new Uint8Array(3 * EIGHT_MB), { maxConcurrency: 1 }),
    ).rejects.toMatchObject({ statusCode: 403, code: "AuthenticationFailed" });

    assert.deepEqual(sent, [CREATE, append(0, EIGHT_MB), append(EIGHT_MB, EIGHT_MB)]);
  });

  it("sends a CRC64 checksum with every chunk", async () => {
    const checksums: Array<[string, string | undefined, string | undefined]> = [];
    const { client } = createClient((request) => {
      checksums.push([
        stepOf(request),
        request.headers.get("x-ms-structured-body"),
        request.headers.get("x-ms-structured-content-length"),
      ]);
    });

    await client.upload(new Uint8Array(EIGHT_MB + 1), { contentChecksumAlgorithm: "StorageCrc64" });

    assert.deepEqual(checksums[0], ["create", undefined, undefined]);
    // The chunks are appended concurrently, so they can arrive in either order.
    assert.sameDeepMembers(checksums.slice(1, 3), [
      ["append", "XSM/1.0; properties=crc64", String(EIGHT_MB)],
      ["append", "XSM/1.0; properties=crc64", "1"],
    ]);
    assert.deepEqual(checksums.slice(3), [["flush", undefined, undefined]]);
  });

  it("fails only the upload whose chunk fails when two uploads overlap", async () => {
    // Hold each upload's appends until the other upload has sent one, so the two overlap.
    const bothStarted = createGate("a", "b");
    let appendsOfA = 0;
    const a = createClient(async (request) => {
      if (stepOf(request) === "append") {
        const fail = ++appendsOfA === 2;
        await bothStarted("a");
        return fail ? AUTHENTICATION_FAILED : undefined;
      }
      return undefined;
    }, `${FILE_SYSTEM_URL}/a`);
    const b = createClient(async (request) => {
      if (stepOf(request) === "append") {
        await bothStarted("b");
      }
    }, `${FILE_SYSTEM_URL}/b`);

    const results = await Promise.allSettled([
      a.client.upload(new Uint8Array(EIGHT_MB + 1)),
      b.client.upload(new Uint8Array(EIGHT_MB + 1)),
    ]);

    expect(results).toMatchObject([
      { status: "rejected", reason: { statusCode: 403, code: "AuthenticationFailed" } },
      { status: "fulfilled" },
    ]);
    // A never flushes; B appends both of its chunks and flushes all of its data.
    assert.notInclude(
      a.sent.map((request) => request.step),
      "flush",
    );
    const appendsOfB = b.sent.slice(1, -1).sort((x, y) => (x.position ?? 0) - (y.position ?? 0));
    assert.deepEqual(
      [b.sent[0], ...appendsOfB, b.sent[b.sent.length - 1]],
      [CREATE, append(0, EIGHT_MB), append(EIGHT_MB, 1), flush(EIGHT_MB + 1)],
    );
  });
});
