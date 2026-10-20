// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect } from "vitest";
import { toHttpHeadersLike } from "@azure/core-http-compat";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpOperationResponse, IHttpClient, WebResource } from "../src/index.js";
import { AnonymousCredential, BlockBlobClient } from "../src/index.js";

const CONTAINER_URL = "https://account.blob.core.windows.net/container";
const BLOB_URL = `${CONTAINER_URL}/blob`;
const MB = 1024 * 1024;
const FOUR_MB = 4 * MB;

/** What the transport saw for one request, copied when it was sent. */
interface SentRequest {
  method: string;
  comp: string | undefined;
  blobType: string | undefined;
  contentLength: number;
}

/** An error the fake service answers a request with. */
interface Failure {
  status: number;
  code: string;
}

/** A failure that can hit one block of an upload, for example when a SAS expires mid-upload. */
const AUTHENTICATION_FAILED: Failure = { status: 403, code: "AuthenticationFailed" };

/** What the service answers a block list that names a block it no longer has. */
const INVALID_BLOCK_LIST: Failure = { status: 400, code: "InvalidBlockList" };

/** Sees each request before the fake service answers it; it can hold the request or return a failure. */
type Respond = (request: WebResource) => Promise<Failure | void> | Failure | void;

function compOf(request: WebResource): string | undefined {
  return new URL(request.url).searchParams.get("comp") ?? undefined;
}

/** The block IDs one upload staged, and the IDs its block list committed. */
interface BlockIds {
  staged: string[];
  committed: string[];
}

function recordBlockIds(request: WebResource, ids: BlockIds): void {
  const comp = compOf(request);
  if (comp === "block") {
    ids.staged.push(new URL(request.url).searchParams.get("blockid") ?? "");
  } else if (comp === "blocklist") {
    ids.committed.push(
      ...Array.from(String(request.body).matchAll(/<Latest>([^<]*)<\/Latest>/g), (m) => m[1]),
    );
  }
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
 * A client whose transport answers every request with an empty 201 instead of calling the service,
 * unless `respond` returns a failure for it.
 */
function createClient(
  respond?: Respond,
  url: string = BLOB_URL,
): { client: BlockBlobClient; sent: SentRequest[] } {
  const sent: SentRequest[] = [];
  const httpClient: IHttpClient = {
    sendRequest: async (request: WebResource): Promise<HttpOperationResponse> => {
      sent.push({
        method: request.method,
        comp: compOf(request),
        blobType: request.headers.get("x-ms-blob-type"),
        // Browsers drop the header and set it from the body.
        contentLength: Number(
          request.headers.get("content-length") ?? new Blob([request.body]).size,
        ),
      });
      const failure = await respond?.(request);
      return {
        request,
        status: failure ? failure.status : 201,
        headers: toHttpHeadersLike(
          createHttpHeaders({
            etag: '"0x8DE00000000000"',
            "last-modified": "Mon, 05 Oct 2026 00:00:00 GMT",
            date: "Mon, 05 Oct 2026 00:00:00 GMT",
            "x-ms-request-id": "00000000-0000-0000-0000-000000000000",
            "x-ms-version": "2026-12-06",
            "x-ms-request-server-encrypted": "true",
            ...(failure ? { "x-ms-error-code": failure.code } : {}),
          }),
        ),
        bodyAsText: failure
          ? `<?xml version="1.0" encoding="utf-8"?><Error><Code>${failure.code}</Code><Message>Fake failure</Message></Error>`
          : "",
      };
    },
  };
  const client = new BlockBlobClient(url, new AnonymousCredential(), {
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

describe("BlockBlobClient.uploadData when it stages blocks", () => {
  it("rejects without committing or staging more blocks when a block fails", async () => {
    let blocks = 0;
    const { client, sent } = createClient((request) =>
      compOf(request) === "block" && ++blocks === 2 ? AUTHENTICATION_FAILED : undefined,
    );

    // Three 4MB blocks, staged one at a time so the third would only start after the failure.
    await expect(
      client.uploadData(new Uint8Array(3 * FOUR_MB), { concurrency: 1 }),
    ).rejects.toMatchObject({ statusCode: 403, code: "AuthenticationFailed" });

    assert.deepEqual(
      sent.map((request) => request.comp),
      ["block", "block"],
    );
  });

  it("sends a CRC64 checksum with every block", async () => {
    const checksums: Array<[string | undefined, string | undefined, string | undefined]> = [];
    const { client } = createClient((request) => {
      checksums.push([
        compOf(request),
        request.headers.get("x-ms-structured-body"),
        request.headers.get("x-ms-structured-content-length"),
      ]);
    });

    await client.uploadData(new Uint8Array(FOUR_MB + 1), {
      contentChecksumAlgorithm: "StorageCrc64",
    });

    // The blocks are staged concurrently, so they can arrive in either order.
    assert.sameDeepMembers(checksums.slice(0, 2), [
      ["block", "XSM/1.0; properties=crc64", String(FOUR_MB)],
      ["block", "XSM/1.0; properties=crc64", "1"],
    ]);
    assert.deepEqual(checksums.slice(2), [["blocklist", undefined, undefined]]);
  });

  it("fails only the upload whose block fails when two uploads overlap", async () => {
    // Hold each upload's blocks until the other upload has sent one, so the two overlap.
    const bothStarted = createGate("a", "b");
    let blocksOfA = 0;
    const a = createClient(async (request) => {
      if (compOf(request) === "block") {
        const fail = ++blocksOfA === 2;
        await bothStarted("a");
        return fail ? AUTHENTICATION_FAILED : undefined;
      }
      return undefined;
    }, `${CONTAINER_URL}/a`);
    const idsOfB: BlockIds = { staged: [], committed: [] };
    const b = createClient(async (request) => {
      recordBlockIds(request, idsOfB);
      if (compOf(request) === "block") {
        await bothStarted("b");
      }
    }, `${CONTAINER_URL}/b`);

    const results = await Promise.allSettled([
      a.client.uploadData(new Uint8Array(3 * FOUR_MB)),
      b.client.uploadData(new Uint8Array(3 * FOUR_MB)),
    ]);

    expect(results).toMatchObject([
      { status: "rejected", reason: { statusCode: 403, code: "AuthenticationFailed" } },
      { status: "fulfilled" },
    ]);
    // A never commits; B commits all three of its blocks.
    assert.notInclude(
      a.sent.map((request) => request.comp),
      "blocklist",
    );
    assert.deepEqual(
      b.sent.map((request) => request.comp),
      ["block", "block", "block", "blocklist"],
    );
    assert.sameMembers(idsOfB.committed, idsOfB.staged);
  });

  it("never mixes the blocks of two overlapping uploads to the same blob", async () => {
    // Hold each upload's blocks until the other upload has sent one, so both stage before either commits.
    const bothStarted = createGate("a", "b");
    let commits = 0;
    const respondFor =
      (upload: string, ids: BlockIds): Respond =>
      async (request) => {
        recordBlockIds(request, ids);
        if (compOf(request) === "block") {
          await bothStarted(upload);
          return undefined;
        }
        // The first commit discards the other upload's uncommitted blocks, so the second one fails.
        return ++commits === 2 ? INVALID_BLOCK_LIST : undefined;
      };
    const idsOfA: BlockIds = { staged: [], committed: [] };
    const idsOfB: BlockIds = { staged: [], committed: [] };
    const a = createClient(respondFor("a", idsOfA));
    const b = createClient(respondFor("b", idsOfB));

    const results = await Promise.allSettled([
      a.client.uploadData(new Uint8Array(FOUR_MB + 1)),
      b.client.uploadData(new Uint8Array(FOUR_MB + 1)),
    ]);

    // One upload is kept; the other fails instead of overwriting it.
    assert.sameMembers(
      results.map((result) => result.status),
      ["fulfilled", "rejected"],
    );
    expect(results.find((result) => result.status === "rejected")).toMatchObject({
      reason: { statusCode: 400, code: "InvalidBlockList" },
    });
    // Each upload stages its own block IDs and commits only those.
    assert.lengthOf(idsOfA.staged, 2);
    assert.lengthOf(idsOfB.staged, 2);
    assert.isEmpty(idsOfA.staged.filter((id) => idsOfB.staged.includes(id)));
    assert.sameMembers(idsOfA.committed, idsOfA.staged);
    assert.sameMembers(idsOfB.committed, idsOfB.staged);
  });
});
